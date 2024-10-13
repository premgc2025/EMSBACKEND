// api/hello.js

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Main logic of your function
    res.json({ message: 'Hello World' });
}
