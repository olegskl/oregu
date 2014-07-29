/* A simple static file server on port 8000 */

/*jslint node: true */
'use strict';

var path = require('path'),
    express = require('express'),
    compression = require('compression'),
    serveStatic = require('serve-static'),
    publicDir = path.join(__dirname, 'public'),
    oneDay = 86400000, // 86400 seconds, 24 hours
    port = 8000;

/**
 * Middleware to set compatibility headers for Internet Explorer.
 * Basically tells IE to use the latest version possible.
 * @param  {Object}    request  Request object.
 * @param  {Object}    response Response object.
 * @param  {Function}  next     Next middleware in queue.
 * @return {Undefined}
 */
function compatibilityHeaders(request, response, next) {
    response.setHeader('X-UA-Compatible', 'IE=edge');
    next();
}

express()
    .use(compatibilityHeaders)
    .use(compression())
    .use(serveStatic(publicDir, {maxAge: oneDay}))
    .listen(port);
