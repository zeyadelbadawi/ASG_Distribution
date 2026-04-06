import fs from 'fs';
import path from 'path';

const storageDir = path.join(process.cwd(), 'storage'); // Directory for storing JSON file
const filePath = path.join(storageDir, 'gallery.json'); // Path to the gallery.json file

// Function to write data to the JSON file
const writeGalleryData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Gallery data saved successfully.');
    } catch (error) {
        console.error('Error writing gallery data:', error);
        throw new Error('Failed to write gallery data.');
    }
};

// Export the POST method
export async function POST(req) {
    try {
        const newOrder = await req.json(); // Receive the new order from the client

        // Validate the incoming data
        if (!Array.isArray(newOrder)) {
            return new Response(JSON.stringify({ message: 'Invalid data format' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Write the updated order to the JSON file
        writeGalleryData(newOrder);

        return new Response(JSON.stringify({ message: 'Gallery order updated successfully!' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating gallery order:', error);
        return new Response(JSON.stringify({ message: `Error updating gallery order: ${error.message}` }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
