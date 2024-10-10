import { promises as fs } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const GET = { config: { api: { bodyParser: false } } };


export async function POST(req) {
  try {
    const formData = await req.formData(); // Use Next.js to parse FormData
    const file = formData.get('file'); // Get the file from the form

    if (!file) {
      return new NextResponse(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define the upload path
    const uploadDir = join(process.cwd(), 'public/assets/images/resources');
    const filePath = join(uploadDir, file.name);

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file to the desired path
    await fs.writeFile(filePath, buffer);

    // Return the relative file path for the client
    const relativeFilePath = `/assets/images/resources/${file.name}`;

    return new NextResponse(
      JSON.stringify({ success: true, filePath: relativeFilePath }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new NextResponse(JSON.stringify({ error: 'File upload failed' }), { status: 500 });
  }
}
