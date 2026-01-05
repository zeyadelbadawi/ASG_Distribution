import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const formData = await request.json()
    const { name, phone, email, company, message, type } = formData

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
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

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
    console.error("Error submitting to Google Sheets:", error)
    return NextResponse.json({ error: "Failed to submit form. Please try again." }, { status: 500 })
  }
}
