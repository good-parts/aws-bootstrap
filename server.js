const { hostname } = require('os');
const https = require('https');
const fs = require('fs');

const STACK_NAME = process.env.STACK_NAME || "Unknown Stack";
const httpsPort = 8443;
const httpsKey = '../keys/key.pem'
const httpsCert = '../keys/cert.pem'

if (fs.existsSync(httpsKey) && fs.existsSync(httpsCert)) {
    console.log('Starting https server')
    const message = `Hello HTTPS World from ${hostname()} in ${STACK_NAME}\n`;
    const options = { key: fs.readFileSync(httpsKey), cert: fs.readFileSync(httpsCert) };
    const server = https.createServer(options, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(message);
    });
    server.listen(httpsPort, hostname, () => {
        console.log(`Server running at http://${hostname()}:${httpsPort}/`);
    });
} else {
    console.log('Could not find certificate/key')
}
