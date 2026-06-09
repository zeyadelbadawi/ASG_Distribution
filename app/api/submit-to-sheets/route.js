import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(request) {
  // Hardcoded credentials
  const CLIENT_EMAIL = "website-form-submissions@asg-distry.iam.gserviceaccount.com"
  const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDbC8XgB/PLftj
NjQ4HB1vBWSbvavLFds3yd7EyguyXi06Vg0dmB2CEMTlGtAYyfHqJpAIl2TDqso2
bxEDTcudRXl46zBWtQI4QuTeXmOXnc8OOLEHkEfp2Yk21KX10yKTpb0BTblO0Xq+
Dh+stZsQJTk+J55DZaw2pTgBeF9szzs9sv3AxaGAEobf0fbGJXr+jLmk+zHj7dYt
/2rDVFSkcfrIen2T1tgD4f4l+YLK4nTSz5SAUSMRncs92pU1aEsGsaIyCW1u1b1g
bRhk8Zzf8kUEXv1K9JUD8xkPmxDBKGYfXDKWQ0HW27yYStR+cEDiMoaSFLywewjz
ADQ2RsJfAgMBAAECggEASlKx0lFDR8toKYJq99ARjbDSY70OQk3MsvoOxG9HZY4V
y3MAx/mbd2UjTTMWY+ciH3iNHQdfJl+lSnCRWt1SjDzpBwkDuGZdMsKWQtBJNlep
cPI0ufiwsQqv+e+EMusa4maNbJp/2K8o7HF4sHndQJW3oKD2uxFHHv1VQJHkUQAQ
Py2rsK4AGRCL2iRZxbzxyJD4nuT2aCpB4V7IdbtBgNJp10PAlTmjieXdzzntP3yk
XwBLV5oUGe5TWQuI88VTHSZc4Kj1RMyzyWbpyeZ9VaBSmoDXD4WsZeMiQNaOQvNh
E+IQi39PjHXCEzNkgM4/wzbD9aJdXStsLxy8KCIgeQKBgQD9qLhb8v3gu1FixtCw
+ZMolelaRvFHDaBFUmOfFnZWDNvAxzNsMxubj21E45wu01TvONnsGhEQvVx5Mn7Z
/rSZ+8lY/xQpfaujGgsCgzYF+G66Q/EFgpBsYFT0h34dMsNcE1JF/D31nR4GJ2Il
7D0rwXeANJv3EGe3TpF79jQ7fQKBgQDFOeC1ucFgimjdPhc+KB5EQrXo0A8u4+UM
smUv/CknZbPMuhMBtxDIv6o6MrRL3o4Gz9f9/1e6c7MzTM4eC+vP/nRJfyYNb/U7
lQUCaQRdtHtQDkcbjWNeZAvVYpXjoZrTw1nLwpTkvTwxNV/eElH4pwQZk+S6fxu8
wurHMhdECwKBgAKDDjhS4rK8CCVLRLvL7Ook+eeb9j2249Rr6XKk3U0i2XZCQr8a
jnZu6C0bd+t6ykeIL5hH9c1NosHMfzcXb6Bqvuazt/ZlOTLnSh6fQAS1HhuYGqXs
UhPQrGazhMszOn4J7vGketSY1rhG4ZDwkvaA9vb9DmJW9j/5djVdDc1dAoGBAK4D
wyCUJOrpNF0Ay8Er5IiV06r26G6W5SGuxVjxQ95e/aVFCEAbJdP6SFfRJQNL+kRI
XmrdQKpiK1q4CaS5H/cEq9WtOgXhIp7PfPwDbLbA54xbDKJivaoq28YKlfWiQNlX
I4OEy5qG3PUOAugNggXCVvu6YbWrMO37jOr0Z1LBAoGBAPJbn0j0NDbtQWJe7zMj
deAe6IXDcHfaWhCpHMMDHU0pNrxixV9LvEVpwU2GKi1Nfne4ysfyFFES6/S7jOGd
vPmm2sS9el97og2SoJFRBtJt3aP5Dh7wTmjx5oYtYuxVpNmDJI02eNkbgsbbZZCA
Q7shvPdald8b7asNmRZfow0q
-----END PRIVATE KEY-----`
  const SPREADSHEET_ID = "1tR4YP3XDmcM6UKvkZXgML_Ef7Ip79kkTJ306z703x1g"

  console.log("[v0] === API REQUEST STARTED ===")
  console.log("[v0] Hardcoded credentials loaded")
  console.log("[v0] CLIENT_EMAIL:", CLIENT_EMAIL ? "✓ Set" : "✗ Missing")
  console.log("[v0] PRIVATE_KEY:", PRIVATE_KEY ? "✓ Set" : "✗ Missing")
  console.log("[v0] SPREADSHEET_ID:", SPREADSHEET_ID ? "✓ Set" : "✗ Missing")

  // Check if required credentials are set
  if (!CLIENT_EMAIL || !PRIVATE_KEY || !SPREADSHEET_ID) {
    console.log("[v0] Configuration Error - Missing credentials")
    return NextResponse.json(
      { error: "Server configuration incomplete." },
      { status: 500 },
    )
  }

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
        private_key: PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const spreadsheetId = SPREADSHEET_ID

    const rangeName = type === "newsletter" ? "Disty Newsletter" : "Quote"
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
