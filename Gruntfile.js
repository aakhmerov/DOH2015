module.exports = function (grunt) {
    grunt.loadTasks('dev/tasks');
    var _ = grunt.util._;
    var path = require('path');
    var config = _.extend({},
        require('load-grunt-config')(grunt, {
            configPath: path.join(__dirname, 'dev/tasks/options'),
            loadGruntTasks: false,
            init: false
        })
    );
    grunt.initConfig(config);

    grunt.registerTask('default', ['jshint','less']);
    grunt.registerTask('serve', ['less', 'react', 'webpack', 'configureProxies:server', 'connect', 'watch']);
    grunt.registerTask('backend', ['server_stub']);
};
