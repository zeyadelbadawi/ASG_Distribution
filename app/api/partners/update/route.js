import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'partnersData.js');

// Update the partnersData.js file
export async function POST(request) {
    const updatedPartners = await request.json();

    const newContent = `
// /data/partnersData.js
const partnersData = ${JSON.stringify(updatedPartners, null, 4)};

export default partnersData;
`;

    try {
        // Overwrite the existing file with the new data
        fs.writeFileSync(filePath, newContent);
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating file', error }, { status: 500 });
    }
}
