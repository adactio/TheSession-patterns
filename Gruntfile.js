module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/global-min.css': 'assets/scss/global.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/global.css': 'assets/scss/global.scss'
                }
            }
        },
        sass_globbing: {
            build: {
                files: {
                   'assets/scss/_components.scss': 'src/components/**/*.scss',
                }
            }
        },
        concat: {
            dist: {
                src: ['assets/js/*.js', 'src/components/**/*.js'],
                dest: 'public_html/js/global.js'
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: {
                    'public/js/global-min.js': 'public/js/global.js'
                }
            }
        },
        jshint: {
            beforeconcat: ['assets/js/*.js', 'src/components/**/*.js'],
            afterconcat: ['public/js/global.js']
        },
        watch: {
            css: {
                files: ['assets/scss/**/*.scss', 'src/components/**/*.scss'],
                tasks: ['sass_globbing', 'sass'],
                options: {}
            },
            scripts: {
                files: ['assets/js/**/*.js', 'src/components/**/*.js'],
                tasks: ['jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-sass-globbing');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass_globbing', 'sass', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify']);

};
