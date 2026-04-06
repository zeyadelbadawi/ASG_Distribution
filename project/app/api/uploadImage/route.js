import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        console.log('Upload API called');

        // Get the uploaded file from the request
        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            console.error('No file uploaded');
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Log the file information
        console.log('File received:', file.name, file.size, file.type);

        // Define the upload path - using the provided path
        const uploadDir = path.join(
            process.cwd(),
            'public',
            'assets',
            'images',
            'resources'
        );
        const filePath = path.join(uploadDir, file.name);

        // Check if the directory exists; if not, create it
        if (!fs.existsSync(uploadDir)) {
            console.log('Directory does not exist. Creating:', uploadDir);
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save the file to the specified directory
        const buffer = Buffer.from(await file.arrayBuffer());

        try {
            fs.writeFileSync(filePath, buffer);
            console.log('File written to:', filePath);
        } catch (writeError) {
            console.error('Error writing file:', writeError);
            return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
        }

        // Return the new image URL to be saved in the JSON file
        return NextResponse.json({ imageUrl: `/assets/images/resources/${file.name}` });
    } catch (error) {
        console.error('Error in upload API:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
