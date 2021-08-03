const http = require('http');
const floCrypto = require('./floCrypto');

module.exports = function startServer(port) {
    const httpServer = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (req.method === "GET")
            res.end("");
        else if (req.method === "POST") {
            //POST: All data processing (required JSON input)
            let data = '';
            req.on('data', chunk => data += chunk);
            req.on('end', () => {
                //process verification
                let result = {};
                try {
                    var d = JSON.parse(data);
                    if (!floCrypto.validateAddr(d.floID))
                        result.success = 0;
                    else if (floCrypto.getFloID(d.pubKey) !== d.floID)
                        result.success = 0;
                    else if (!floCrypto.verifySign(d.message, d.sign, d.pubKey))
                        result.success = 0;
                    else
                        result.success = 1;
                } catch (error) {
                    result.success = 0;
                } finally {
                    res.end(JSON.stringify(result));
                };
            });
        };
    });
    httpServer.listen(port, (err) => {
        if (!err)
            console.log(`Server running at port ${port}`);
    });
    Object.defineProperty(this, "port", {
        get: () => port
    });
    Object.defineProperty(this, "http", {
        get: () => httpServer
    });
};