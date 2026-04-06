// /app/api/add-product/route.js
import fs from 'fs';
import path from 'path';

// Define the path to the partnersData.js file
const filePath = path.join(process.cwd(), 'data', 'partnersData.js');

// Helper function to convert the file content into a JavaScript object
function getPartnersData() {
  const data = fs.readFileSync(filePath, 'utf-8');
  const dataWithoutExport = data.replace('export default ', '');
  return eval(dataWithoutExport);
}

// Helper function to write updated data back to the file
function writePartnersData(updatedData) {
  const fileContent = `const partnersData = ${JSON.stringify(updatedData, null, 2)};\n\nexport default partnersData;`;
  fs.writeFileSync(filePath, fileContent);
}

export async function POST(req) {
  const { partnerId, product } = await req.json(); // The product and partner ID will be sent in the request body

  try {
    const partnersData = getPartnersData();

    // Find the partner to update
    const partner = partnersData.find(p => p.id === partnerId);
    if (!partner) {
      return new Response('Partner not found', { status: 404 });
    }

    // Add the new product to the partner's products array
    product.id = Date.now().toString(); // Generate a unique ID for the product
    partner.products.push(product);

    // Write the updated data back to the file
    writePartnersData(partnersData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
