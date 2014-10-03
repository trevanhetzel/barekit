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

        concat: {
            dist: {
                src: [
                    'src/prefix.js',
                    'src/modules/core.js',
                    'src/modules/accordion.js',
                    'src/modules/dropdown-nav.js',
                    'src/modules/modal.js',
                    'src/modules/off-canvas.js',
                    'src/modules/tabs.js',
                    'src/modules/toggle.js',
                    'src/suffix.js'
                ],
                dest: 'js/barekit.js',
            }
        },

        /**
         * Uglify
         */
        uglify: {
            modules: {
                files: {
                    'js/barekit.min.js': [
                        'js/barekit.js'
                    ]
                }
            }
        },


        /**
         * Watch
         */
        watch: {
            css: {
                files: [
                    'css/sass/barekit.scss',
                    'css/sass/global/*.scss',
                    'css/sass/layout/*.scss',
                    'css/sass/module/*.scss'
                ],
                tasks: ['sass:dist', 'autoprefixer'],
                options: { nospawn: true }
            },
            uglify: {
                files: ['js/modules/*.js'],
                tasks: ['js']
            }
        },
        qunit: {
            all: ['spec/**/*.html']
        }
    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('js', [ 'concat', 'uglify' ]);
    grunt.registerTask('test', [ 'js', 'qunit' ]);

    // Register Tasks
    grunt.registerTask('default', [ 'sass', 'autoprefixer', 'js' ]);

};