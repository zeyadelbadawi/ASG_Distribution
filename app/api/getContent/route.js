import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const contentPath = path.join(
            process.cwd(),
            'storage',
            'content.json'
        );
        const content = fs.readFileSync(contentPath, 'utf8');
        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const contentPath = path.join(
            process.cwd(),
            'storage',
            'content.json'
        );
        const newContent = await request.json();

        // Write the new content to the JSON file
        fs.writeFileSync(contentPath, JSON.stringify(newContent, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
