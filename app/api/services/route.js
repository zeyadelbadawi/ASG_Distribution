import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.resolve('C:/Users/ASG/Downloads/lockdown-security-cctv-react-next-js-template-2024-07-25-10-26-46-utc/lockdown pack/lockdown/storage/services.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read file' });
            return;
        }
        try {
            const services = JSON.parse(data);
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: 'Failed to parse JSON' });
        }
    });
}
