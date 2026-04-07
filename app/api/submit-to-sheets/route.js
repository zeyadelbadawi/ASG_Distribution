import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request) {
  // Hardcoded credentials
  const CLIENT_EMAIL = "website-form-submissions@asg-distry.iam.gserviceaccount.com"
  const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+sKzRwGBc6EkG
KQNF1dHHJSJqYGMGFmvNbk5pXJFYJkYWyLF4S4D1tPg8VD3K4GqY7a9xJB5H3JxE
y6C4JsxT3V7gW5Q8nK0J8oN7KJqFqJz1vQ8dQ3G9YqZ4sN8pQ9rK0L9kO8mN9pR5
sO9qR0rK1mP9lP8nM9oQ6rL2mQcNnS9oRcoLvTsN/f7U7T3x+gZ8W0WF/fZU7T1z
+gZ8W0Wp++gR9YNqGqG7A5S9U8u2q3X2vHwRB8hU8XwEhK3O4R9rN3N2oL3sG3fX
Y7Z2L9zX3z0z2ZqZz1PW9xBU7VxH3dPt1VBhU0EbKKqJz5K0rN2pUnJmVhN7kPKY
a5j8aUNDAoGBAO9Ew5U8zZ0xJj5L6pYTcVBe8FvQT2nVnZsXuKc7s5j4Y0eQwL1e
KqKXrM5eT9e+w3L8O1xL0v7FzM1G9VzR7qM2UaS7KuC6xQhA8J0L8L8Y0m/s1p1T
xwL1Q3G8gK3bQ5vX1CQjDZ4R3FVmGd8Q5I8nD1E0rKIE9pJ4aJ1f0KZLAkEA0kDW
8pzJ3x8pI4K5cVJ9pYzC0G7X1vwNkjI1oJ5nK5qN7vV2aU+q/dO+Z5d6W6L1pWD2
lK0oTjVU7eV9uN8zT3G1G6k9P6B3sZ5qQ7e0+x3UkxsXxbCVPQJBAOtL+JzwBjxx
Kq7vC0M+cX5+sK3H8r+J5Q4Y3JhZ2qO6x9Q3P5uL9U4T3E0R+OzT5qKuEsx9d0Uo
98tYJ60CQQCz6LPLfj8xVJvU8oI8vT5Q7b8O1m9rK3R1U4aD9p+H7N0tDQxnCKFq
EQw9+VzqKpGQ0QW2T+DZGd9Dn+uT
-----END PRIVATE KEY-----`
  const SPREADSHEET_ID = "1u7M51HbwlFPImKfPo9UXpoMXRax9gEDHnvvhbEZK4tg"

  console.log("[v0] === API REQUEST STARTED ===")
  console.log("[v0] Using hardcoded credentials")
  console.log("[v0] CLIENT_EMAIL:", CLIENT_EMAIL ? "✓ Set" : "✗ Missing")
  console.log("[v0] PRIVATE_KEY:", PRIVATE_KEY ? "✓ Set" : "✗ Missing")
  console.log("[v0] SPREADSHEET_ID:", SPREADSHEET_ID ? "✓ Set" : "✗ Missing")

  try {
    console.log("[v0] Parsing form data...")
    const formData = await request.json()
    const { name, phone, email, company, message, type } = formData
    console.log("[v0] Form data received:", { name, email, type })

    if (type === "newsletter") {
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 })
      }
    } else if (!name || !phone || !email || !company || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Set up Google Sheets authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = SPREADSHEET_ID

    const rangeName = type === "newsletter" ? "Newsletter" : "Quote"
    const headerRange = `${rangeName}!A1:F1`

    // Check if the target sheet exists, if not create it
    try {
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
      const sheetExists = spreadsheet.data.sheets.some((s) => s.properties.title === rangeName)

      if (!sheetExists) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{ addSheet: { properties: { title: rangeName } } }],
          },
        })
      }
    } catch (e) {
      console.error(`[v0] Error checking/creating ${rangeName}:`, e)
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: headerRange,
    })

    const existingData = response.data.values || []

    if (existingData.length === 0) {
      const headers =
        type === "newsletter"
          ? ["Timestamp", "Email", "Status"]
          : ["Timestamp", "Name", "Phone", "Email", "Company", "Message"]

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: headerRange,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [headers],
        },
      })

      // Get sheetId for formatting
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
      const sheetId = spreadsheet.data.sheets.find((s) => s.properties.title === rangeName)?.properties.sheetId || 0

      // Format header row (bold and freeze)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: headers.length,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
                    textFormat: { bold: true },
                    horizontalAlignment: "CENTER",
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: sheetId,
                  gridProperties: { frozenRowCount: 1 },
                },
                fields: "gridProperties.frozenRowCount",
              },
            },
          ],
        },
      })
    }

    // Prepare the data to append
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    const values =
      type === "newsletter" ? [[timestamp, email, "Subscribed"]] : [[timestamp, name, phone, email, company, message]]

    // Append data to the sheet
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${rangeName}!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    })

    // Get sheetId again for formatting wrapping
    const spreadsheetForFormat = await sheets.spreadsheets.get({ spreadsheetId })
    const sheetIdForFormat =
      spreadsheetForFormat.data.sheets.find((s) => s.properties.title === rangeName)?.properties.sheetId || 0

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheetIdForFormat,
                startColumnIndex: 0,
                endColumnIndex: values[0].length,
              },
              cell: {
                userEnteredFormat: {
                  wrapStrategy: "WRAP",
                },
              },
              fields: "userEnteredFormat.wrapStrategy",
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: sheetIdForFormat,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: values[0].length,
              },
            },
          },
        ],
      },
    })

    return NextResponse.json({ message: "Form submitted successfully!" }, { status: 200 })
  } catch (error) {
    console.log("[v0] === CATCH ERROR TRIGGERED ===")
    console.error("[v0] Full Error Object:", error)
    console.error("[v0] Error Message:", error?.message)
    console.error("[v0] Error Stack:", error?.stack)
    return NextResponse.json({ error: "Failed to submit form. Please check server logs." }, { status: 500 })
  }
}
