module.exports = {

    appTitle: 'Hackathon Starter',

    port: normalizePort(process.env.PORT || 8080),

    db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/hackathon-starter'

};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
