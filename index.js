// index.js
const sls = require('serverless-http');
const binaryMimeTypes = require('./config/binaryMimeTypes');

const server = require('./server/server');

const dev = process.env.NODE_ENV !== 'production';

if (dev === true) {
    server.listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at http://localhost:4000'));
    return;
}

module.exports.server = sls(server, {
    binary: binaryMimeTypes,
});