'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                seperator: ''
            },
            groceries: {
                src: [
                    'src/js/groceries/module.js',
                    'src/js/groceries/config.js',
                    'src/js/groceries/directives/*.js',
                    'src/js/groceries/services/*.js',
                    'src/js/groceries/controllers/*.js'
                ],
                dest: 'build/groceries.js'
            }
        },
        cssmin: {
            groceries: {
                src: ['src/css/groceries.css'],
                dest: 'src/css/groceries.min.css'
            }
        },
        jshint: {
            options: {
                globalstrict: true,
                globals: {
                    afterEach: true,
                    angular: true,
                    beforeEach: true,
                    describe: true,
                    expect: true,
                    inject: true,
                    it: true,
                    module: true,
                    spyOn: true
                }
            },
            before: ['Gruntfile.js', 'karma.conf.js', 'tests/**/*.js', 'src/js/groceries/**/*.js']
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            watch: {
                singleRun: false
            }
        },
        ngconstant: {
            options: {
                wrap: '(function(){\n\'use strict\';\n\n{%= __ngModule %}\n\n})();',
                name: 'groceries.config',
                dest: 'src/js/groceries/config.js'
            },
            production: {
                constants: {
                    CONFIG: {
                        backend: 'https://groceries-api.herokuapp.com'
                    }
                }
            },
            development: {
                constants: {
                    CONFIG: {
                        backend: 'http://83.68.18.42:8002'
                    }
                }
            }
        },
        shell: {
            options: {
                stderr: false
            },
            httpd: {
                command: 'python -m http.server 8001'
            }
        },
        uglify: {
            options: {
                banner: '/*! Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n'
            },
            groceries: {
                files: {
                    'src/js/groceries.min.js': ['<banner>', 'build/groceries.js']
                }
            }
        },
        watch: {
            js: {
                files: ['Gruntfile.js', 'karma.conf.js', 'tests/**/*.js', 'src/js/groceries/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            },
            css: {
                files: ['src/css/groceries.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', function() {
        grunt.task.run(['ngconstant:production', 'jshint', 'concat', 'uglify']);
    });

    grunt.registerTask('httpd', function() {
        grunt.task.run(['ngconstant:development', 'jshint', 'concat', 'uglify', 'shell:httpd']);
    });
};
