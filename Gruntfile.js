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
        watch: {
            css: {
                files: ['assets/scss/**/*.scss', 'src/components/**/*.scss'],
                tasks: ['sass_globbing', 'sass'],
                options: {}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-sass-globbing');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass_globbing', 'sass']);

};
