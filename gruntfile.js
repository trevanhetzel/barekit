module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
        /**
         * Sass
         */
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        /**
         * Autoprefixer
         */
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css/'
            }
        },

        /**
         * RequireJS
         */
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js",
                    mainConfigFile: "js/bare-ninja.js",
                    name: "bare-ninja",
                    out: "js/bare-ninja.min.js"
                }
            }
        },

        /**
         * Watch
         */
        watch: {
            css: {
                files: [
                    'css/bare-ninja.scss',
                    'css/global/*.scss',
                    'css/layout/*.scss',
                    'css/module/*.scss'
                ],
                tasks: [ 'sass:dist', 'autoprefixer' ],
                options: { nospawn: true }
            }
        }
    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Register Tasks
    grunt.registerTask('default', [ 'sass', 'autoprefixer', 'requirejs' ]);

};