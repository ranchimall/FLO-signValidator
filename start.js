const Server = require('./src/Server');
const port = process.argv[2] || 8080;

const serve = new Server(port);