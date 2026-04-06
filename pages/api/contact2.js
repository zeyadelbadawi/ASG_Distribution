export default async function handler(req, res) {
    console.log('API call initiated');

    if (req.method === 'POST') {
        try {
            console.log('Request body:', req.body);

            const response = await fetch('https://api.getresponse.com/v3/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': '8m3h0nxg8o3p2psekftpvhs1rcpz4gqe',
                },
                body: JSON.stringify(req.body),
            });

            console.log('GetResponse raw response:', response);

            // Check if there's a body before parsing it
            let data = null;
            if (response.headers.get('content-length') !== '0' && response.headers.get('content-type').includes('application/json')) {
                data = await response.json();
            } else {
                console.log('No response body');
            }

            // Log the parsed response data
            if (data) {
                console.log('GetResponse parsed response:', data);
            }

            // Check if the response was successful
            if (response.ok) {
                res.status(response.status).json(data || { message: 'Request accepted' });
            } else {
                console.error('GetResponse returned an error:', data);
                res.status(response.status).json(data || { error: 'Request failed without a specific error message' });
            }
        } catch (error) {
            console.error('Error during API call to GetResponse:', error);
            res.status(500).json({ error: 'Failed to connect to GetResponse' });
        }
    } else {
        console.log('Invalid method used:', req.method);
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    console.log('API call completed');
}
