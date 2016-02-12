module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            target: ['app/js/lib/TypingDelay.js', 'app/js/streamy2.js', 'app/js/twitch-api.js']
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['app/fonts/*'],
                    dest: 'build/app/fonts/',
                    filter: 'isFile'
                }, {
                    src: 'app/index.html',
                    dest: 'build/app/index.html'
                }, ]
            },
        },
        babel: {
            options: {
                sourceMap: false
            },
            build: {
                files: {
                    'app/js/es5-streamy2.js': 'app/js/streamy2.js',
                    'app/js/es5-twitch-api.js': 'app/js/twitch-api.js',
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            js_build: {
                src: ['app/js/lib/*.js', 'app/js/vendor/*.js', 'app/js/es5-twitch-api.js', 'app/js/**/es5-streamy2.js'],
                dest: 'build/app/js/<%= pkg.name %>.js'
            },
            css_build: {
                src: ['app/css/**/*.css'],
                dest: 'build/app/css/<%= pkg.name %>.css'
            },
        },
        less: {
            target: ['app/css/styles.less'],
            build: {
                files: {
                    // compilation.css  :  source.less
                    "app/css/styles.css": "app/css/styles.less"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            js_build: {
                files: {
                    'build/app/js/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
                }
            }
        },
        watch: {
            js: {
                files: ['<%= eslint.target %>'],
                tasks: ['eslint', 'babel']
            },
            css: {
                files: ['<%= less.target %>'],
                tasks: ['less']
            }
        },
    });
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('all', ['watch, eslint, babel, copy, concat, uglify, less']);
};
