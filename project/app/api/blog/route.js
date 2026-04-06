import fs from 'fs';
import path from 'path';

const storageDir = path.join(process.cwd(), 'storage'); // Directory for storing JSON file
const filePath = path.join(storageDir, 'blog.json'); // Path to the blog.json file
const imageStorageDir = path.join(process.cwd(), 'public/assets/images/blog'); // Adjusted path for image storage

// Ensure the storage directory and blog.json file exist
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
    console.log('Created storage directory:', storageDir);
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8'); // Initialize blog.json with an empty array
    console.log('Created blog.json file with an empty array.');
}

// API handler functions
export async function POST(req) {
  try {
    // Get form data
    const formData = await req.formData();
    let { id, date, title, category, comments, description, description2, reviews } = Object.fromEntries(formData.entries());

    // Handle single image upload
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
        imageUrl = `/assets/images/blog/${image.name}`;
        console.log('Image uploaded successfully. Updated imageUrl:', imageUrl);
      } catch (imageError) {
        console.error('Error uploading image:', imageError);
        throw new Error('Failed to upload image.');
      }
    } else {
      console.log('No image provided or image size is zero.');
    }

    // Handle multiple image uploads
    let multiImageUrls = [];
    for (let entry of formData.entries()) {
      if (entry[0].startsWith('multiImage')) {
        const multiImage = entry[1];
        if (multiImage && multiImage.size > 0) {
          try {
            const multiImagePath = path.join(imageStorageDir, multiImage.name);
            const arrayBuffer = await multiImage.arrayBuffer();
            await fs.promises.writeFile(multiImagePath, Buffer.from(arrayBuffer));

            // Store the image URL in the array
            multiImageUrls.push(`/assets/images/blog/${multiImage.name}`);
          } catch (multiImageError) {
            console.error('Error uploading multiple images:', multiImageError);
            throw new Error('Failed to upload multiple images.');
          }
        }
      }
    }

    reviews = reviews ? reviews.split(',') : []; // Convert reviews string into an array

    // Construct the blog data object
    const blog = {
      id,
      date,
      title,
      description,
      description2, // New field
      category,
      comments,
      reviews, // Store as an array
      imageUrl, // Single image URL
      multiImageUrls // Array of multiple image URLs
    };

    console.log('Constructed blog object:', blog);

    // Read existing blog data
    let blogs = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        blogs = JSON.parse(fileData);
      } catch (jsonError) {
        console.error('Error parsing existing blog data:', jsonError);
        throw new Error('Invalid JSON format in blog.json file.');
      }
    }

    // Add the new blog data to the list
    blogs.push(blog);

    // Write updated blog data to the file
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
    console.log('Blog data saved successfully. Final imageUrl:', imageUrl);

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

export async function PUT(req) {
  try {
    const index = parseInt(new URL(req.url).searchParams.get('index'));
    const formData = await req.formData();

    // Read existing blog data
    let blogs = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      blogs = JSON.parse(fileData);
    }

    // Get the existing data at the specified index
    const existingData = blogs[index];
    const id = formData.get('id') || existingData.id;
    const date = formData.get('date') || existingData.date;
    const title = formData.get('title') || existingData.title;
    const description = formData.get('description') || existingData.description;
    const description2 = formData.get('description2') || existingData.description2; // New field
    const category = formData.get('category') || existingData.category;
    const comments = formData.get('comments') || existingData.comments;
    const reviews = formData.get('reviews') || existingData.reviews; // New field
    let imageUrl = existingData.imageUrl;
    let multiImageUrls = existingData.multiImageUrls || []; // Initialize for multiple images

    // Handle single image upload (only update if a new image is provided)
    const image = formData.get('image');
    if (image && image.size > 0) {
      try {
        const imagePath = path.join(imageStorageDir, image.name);
        const arrayBuffer = await image.arrayBuffer();
        await fs.promises.writeFile(imagePath, Buffer.from(arrayBuffer));
        imageUrl = `/assets/images/blog/${image.name}`;
      } catch (imageError) {
        console.error('Error uploading image:', imageError);
        throw new Error('Failed to upload image.');
      }
    }

    // Handle multiple image uploads (only update if new images are provided)
    multiImageUrls = [];
    for (let entry of formData.entries()) {
      if (entry[0].startsWith('multiImage')) {
        const multiImage = entry[1];
        if (multiImage && multiImage.size > 0) {
          try {
            const multiImagePath = path.join(imageStorageDir, multiImage.name);
            const arrayBuffer = await multiImage.arrayBuffer();
            await fs.promises.writeFile(multiImagePath, Buffer.from(arrayBuffer));
            multiImageUrls.push(`/assets/images/blog/${multiImage.name}`);
          } catch (multiImageError) {
            console.error('Error uploading multiple images:', multiImageError);
            throw new Error('Failed to upload multiple images.');
          }
        }
      }
    }

    const updatedReviews = formData.get('reviews') ? formData.get('reviews').split(',') : existingData.reviews; // Convert reviews string into an array

    // Construct the updated blog data object
    const blog = {
      id,
      date,
      title,
      description,
      description2, // New field
      category,
      comments,
      reviews: updatedReviews, // Use the newly processed reviews
      imageUrl,
      multiImageUrls // Array of multiple image URLs
    };

    // Update the blog data at the specified index
    blogs[index] = blog;

    // Write updated blog data to the file
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
    console.log('Blog data updated successfully.');

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

export async function DELETE(req) {
  try {
    const index = parseInt(new URL(req.url).searchParams.get('index'));

    // Read existing blog data
    let blogs = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      blogs = JSON.parse(fileData);
    }

    // Remove the blog data at the specified index
    blogs.splice(index, 1);

    // Write updated blog data to the file
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
    console.log('Blog data deleted successfully.');

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

export async function GET() {
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const blogs = JSON.parse(fileData);

      return new Response(JSON.stringify(blogs), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
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
