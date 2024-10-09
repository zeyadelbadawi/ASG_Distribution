import fs from 'fs';
import path from 'path';

// Define the storage paths for the JSON file and images
const storageDir = path.join(process.cwd(), 'storage');
const filePath = path.join(storageDir, 'serverDataVendor.json');
const imageStorageDir = path.join('C:\\Users\\ASG\\Downloads\\lockdown-security-cctv-react-next-js-template-2024-07-25-10-26-46-utc\\lockdown pack\\lockdown\\public\\assets\\images\\blog');

export async function POST(req) {
  try {
    // Get form data using formData instead of JSON
    const formData = await req.formData();
    console.log('Form data received:', formData); // Log form data to check its content

    let { id, date, title, category, comments, description } = Object.fromEntries(formData.entries());

    // Handle image upload
    const image = formData.get('image');
    let imageUrl = ''; 

    if (image && image.size > 0) {
      try {
        if (!fs.existsSync(imageStorageDir)) {
          fs.mkdirSync(imageStorageDir, { recursive: true });
          console.log('Created image storage directory:', imageStorageDir);
        }

        const imagePath = path.join(imageStorageDir, image.name);
        const arrayBuffer = await image.arrayBuffer();
        await fs.promises.writeFile(imagePath, Buffer.from(arrayBuffer));

        imageUrl = image.name;
        console.log('Image uploaded successfully:', imageUrl);
      } catch (imageError) {
        console.error('Error uploading image:', imageError);
        throw new Error('Failed to upload image.');
      }
    }

    // Construct the blog data object
    const blog = {
      id,
      date,
      title,
      description,
      category,
      comments,
      imageUrl,
    };
    console.log('Constructed blog object:', blog); // Log the constructed blog object

    // Ensure the storage directory exists
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir);
      console.log('Created storage directory:', storageDir);
    }

    // Read existing blog data
    let blogs = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      blogs = JSON.parse(fileData);
      console.log('Read existing blogs:', blogs);
    }

    // Add the new blog data to the list
    blogs.push(blog);

    // Write updated blog data to the file
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));
    console.log('Blog data saved successfully.');

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
    const category = formData.get('category') || existingData.category;
    const comments = formData.get('comments') || existingData.comments;
    let imageUrl = existingData.imageUrl; // Default to existing image URL

    // Handle image upload (only update if a new image is provided)
    const image = formData.get('image');
    if (image && image.size > 0) {
      if (!fs.existsSync(imageStorageDir)) {
        fs.mkdirSync(imageStorageDir, { recursive: true });
      }

      const imagePath = path.join(imageStorageDir, image.name);
      const arrayBuffer = await image.arrayBuffer();
      await fs.promises.writeFile(imagePath, Buffer.from(arrayBuffer));

      imageUrl = image.name; // Update the image URL if a new image is uploaded
    }

    // Construct the updated blog data object
    const blog = {
      id,
      date,
      title,
      description,
      category,
      comments,
      imageUrl,
    };

    // Update the blog data at the specified index
    blogs[index] = blog;

    // Write updated blog data to the file
    fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2));

    return new Response(JSON.stringify({ message: 'Data updated successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating server data:', error);
    return new Response(JSON.stringify({ message: 'Error updating server data.' }), {
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

    return new Response(JSON.stringify({ message: 'Data deleted successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting server data:', error);
    return new Response(JSON.stringify({ message: 'Error deleting server data.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function GET() {
  try {
    // Check if the file exists
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
    console.error('Error fetching server data:', error);
    return new Response(JSON.stringify({ message: 'Error fetching server data.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
