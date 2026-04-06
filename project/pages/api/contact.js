// export default async function handler(req, res) {
//     // Log the start of the API call
//     console.log('API call initiated');

//     if (req.method === 'POST') {
//         try {
//             // Log the request body to check if it's correct
//             console.log('Request body:', req.body);

//             // Log that we're about to send the request to GetResponse
//             console.log('Sending request to GetResponse...');

//             const response = await fetch('https://api.getresponse.com/v3/contacts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Auth-Token': `api-key 8m3h0nxg8o3p2psekftpvhs1rcpz4gqe`, // Add the 'api-key' prefix
//                 },
//                 body: JSON.stringify(req.body),
//             });

//             // Log the raw response from GetResponse
//             console.log('GetResponse raw response:', response);

//             // Parse the response data
//             const data = await response.json();

//             // Log the parsed response data
//             console.log('GetResponse parsed response:', data);

//             // Check if the response was successful
//             if (response.ok) {
//                 res.status(response.status).json(data);
//             } else {
//                 // Log if there's an issue with the response status
//                 console.error('GetResponse returned an error:', data);
//                 res.status(response.status).json(data);
//             }
//         } catch (error) {
//             // Log any error that occurs during the API call
//             console.error('Error during API call to GetResponse:', error);
//             res.status(500).json({ error: 'Failed to connect to GetResponse' });
//         }
//     } else {
//         // Log that the method is not allowed
//         console.log('Invalid method used:', req.method);
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }

//     // Log the end of the API call
//     console.log('API call completed');
// }
