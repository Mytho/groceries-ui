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
                    'src/js/groceries/*.controller.js'
                ],
                dest: 'build/groceries.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n'
            },
            groceries: {
                files: {
                    'src/js/groceries.min.js': ['<banner>', 'build/groceries.js']
                }
            }
        },
        watch: {
            js: {
                files: ['Gruntfile.js', 'src/js/groceries/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', function() {
        grunt.task.run(['concat', 'uglify']);
    });
};
