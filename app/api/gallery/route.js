import fs from 'fs';
import path from 'path';

const storageDir = path.join(process.cwd(), 'storage'); // Directory for storing JSON file
const filePath = path.join(storageDir, 'gallery.json'); // Path to the gallery.json file
const imageStorageDir = path.join(process.cwd(), 'public/assets/images/gallery'); // Path for image storage

// Ensure the storage directory and gallery.json file exist
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
    console.log('Created storage directory:', storageDir);
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8'); // Initialize gallery.json with an empty array
    console.log('Created gallery.json file with an empty array.');
}

// Function to read and parse the JSON file
const readGalleryData = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading gallery data:', error);
        throw new Error('Failed to read gallery data.');
    }
};

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

// POST: Add new image
export async function POST(req) {
    try {
        const formData = await req.formData();
        let { id } = Object.fromEntries(formData.entries());

        // Handle image upload
        const image = formData.get('image');
        let imageUrl = ''; // Initialize with an empty string

        if (image && image.size > 0) {
            try {
                if (!fs.existsSync(imageStorageDir)) {
                    fs.mkdirSync(imageStorageDir, { recursive: true });
                    console.log('Created image storage directory:', imageStorageDir);
                }

                const imagePath = path.join(imageStorageDir, image.name);
                const arrayBuffer = await image.arrayBuffer();
                await fs.promises.writeFile(imagePath, Buffer.from(arrayBuffer));

                // Update imageUrl to include the relative path
                imageUrl = `/assets/images/gallery/${image.name}`;
                console.log('Image uploaded successfully. Updated imageUrl:', imageUrl);
            } catch (imageError) {
                console.error('Error uploading image:', imageError);
                throw new Error('Failed to upload image.');
            }
        }

        // Construct the blog data object
        const blog = {
            id,
            imageUrl,
        };

        // Read existing gallery data
        let blogs = readGalleryData();

        // Add the new blog data to the list
        blogs.push(blog);

        // Write updated gallery data to the file
        writeGalleryData(blogs);

        return new Response(JSON.stringify({ message: 'Data saved successfully!' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in POST method:', error);
        return new Response(JSON.stringify({ message: `Error saving server data: ${error.message}` }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// PUT: Update existing image
export async function PUT(req) {
    try {
        const index = parseInt(new URL(req.url).searchParams.get('index'));
        const formData = await req.formData();

        // Read existing gallery data
        let blogs = readGalleryData();

        // Get the existing data at the specified index
        const existingData = blogs[index];
        const id = formData.get('id') || existingData.id;
        let imageUrl = existingData.imageUrl;

        // Handle image upload (only update if a new image is provided)
        const image = formData.get('image');
        if (image && image.size > 0) {
            try {
                if (!fs.existsSync(imageStorageDir)) {
                    fs.mkdirSync(imageStorageDir, { recursive: true });
                    console.log('Created image storage directory:', imageStorageDir);
                }

                const imagePath = path.join(imageStorageDir, image.name);
                const arrayBuffer = await image.arrayBuffer();
                await fs.promises.writeFile(imagePath, Buffer.from(arrayBuffer));

                // Update imageUrl to include the relative path
                imageUrl = `/assets/images/gallery/${image.name}`;
                console.log('Image uploaded successfully:', imageUrl);
            } catch (imageError) {
                console.error('Error uploading image:', imageError);
                throw new Error('Failed to upload image.');
            }
        }

        // Construct the updated blog data object
        const blog = {
            id,
            imageUrl,
        };

        // Update the blog data at the specified index
        blogs[index] = blog;

        // Write updated gallery data to the file
        writeGalleryData(blogs);

        return new Response(JSON.stringify({ message: 'Data updated successfully!' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in PUT method:', error);
        return new Response(JSON.stringify({ message: `Error updating server data: ${error.message}` }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// DELETE: Delete an image
export async function DELETE(req) {
    try {
        const index = parseInt(new URL(req.url).searchParams.get('index'));

        // Read existing gallery data
        let blogs = readGalleryData();

        // Remove the blog data at the specified index
        blogs.splice(index, 1);

        // Write updated gallery data to the file
        writeGalleryData(blogs);

        return new Response(JSON.stringify({ message: 'Data deleted successfully!' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in DELETE method:', error);
        return new Response(JSON.stringify({ message: `Error deleting server data: ${error.message}` }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// GET: Fetch gallery data
export async function GET() {
    try {
        let blogs = readGalleryData();

        return new Response(JSON.stringify(blogs), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in GET method:', error);
        return new Response(JSON.stringify({ message: 'Error fetching server data.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// POST: Handle sorting
export async function sort(req) {
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
