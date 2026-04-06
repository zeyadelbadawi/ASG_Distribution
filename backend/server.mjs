import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';  // ES module import for node-fetch
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

app.post('/api/contacts', async (req, res) => {
    const requestBody = req.body;

    try {
        const response = await fetch('https://api.getresponse.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': `api-key ${process.env.GETRESPONSE_API_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            // Safely attempt to parse the JSON response
            const text = await response.text();  // Read the response as text
            const data = text ? JSON.parse(text) : {};  // Parse if not empty
            res.status(200).json(data);
        } else {
            const errorData = await response.json().catch(() => null); // Handle possible empty response
            res.status(response.status).json({ message: errorData?.message || "An error occurred" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
