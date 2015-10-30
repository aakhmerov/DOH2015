module.exports = function (grunt) {
    return {
        server: {
            options: {
                port: 9000,
                base: './',
                keepalive: false,
                open: 'http://localhost:9000',
                protocol: 'http',
                middleware: function (connect, options) {
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }
                    var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];
                    options.base.forEach(function (base) {
                        middlewares.push(connect.static(base));
                    });
                    var directory = options.directory || options.base[options.base.length - 1];
                    middlewares.push(connect.directory(directory));
                    return middlewares;
                }
            },
            proxies: [
                {
                    context: '/scorecompass-api',
                    host: 'localhost',
                    port: 9005,
                    https: true,
                    xforward: false
                }
            ]
        }
    };
};
