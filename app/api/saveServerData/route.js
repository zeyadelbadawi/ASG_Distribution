// app/api/saveServerData/route.js

import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

// Define the file path for services.json
const filePath = path.join(process.cwd(), 'public', 'services.json');

// Helper function to read services.json
async function readServices() {
    try {
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading services.json:', error);
        throw new Error('Failed to read data');
    }
}

// Helper function to write to services.json
async function writeServices(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Data successfully written to services.json');
    } catch (error) {
        console.error('Error writing to services.json:', error);
        throw new Error('Failed to save data');
    }
}

export async function POST(request) {
    try {
        const newServiceData = await request.json();
        const services = await readServices();
        services.push(newServiceData);
        await writeServices(services);
        return NextResponse.json({ message: 'Service data saved successfully!' });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const newServiceData = await request.json();
        const { searchParams } = new URL(request.url);
        const index = parseInt(searchParams.get('index'), 10);

        const services = await readServices();

        if (index >= 0 && index < services.length) {
            services[index] = newServiceData;
            await writeServices(services);
            return NextResponse.json({ message: 'Service data updated successfully!' });
        } else {
            return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error processing PUT request:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const index = parseInt(searchParams.get('index'), 10);

        const services = await readServices();

        if (index >= 0 && index < services.length) {
            services.splice(index, 1);
            await writeServices(services);
            return NextResponse.json({ message: 'Service data deleted successfully!' });
        } else {
            return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error processing DELETE request:', error);
        return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
    }
}
