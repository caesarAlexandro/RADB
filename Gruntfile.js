'use strict';
// Code here will be linted with JSHint.
/* jshint camelcase:false */

var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/**/*.hbs']
                }
            }
        },
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            autoprefixer: {
                files: ['<%= yeoman.app %>/styles/less/**/*.less'],
                tasks: ['less:default', 'injector']
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/**/*.{ejs,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            },
            styles: {
                files: ['styles/less/**/*.less'],
                tasks: ['less'],
                options: {}
            },
            handlebars: {
                files: ['<%= yeoman.app %>/scripts/**/*.hbs'],
                tasks: ['handlebars']
            },
            test: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test:true']
            },
            images: {
                files: ['<%= yeoman.app %>/assets/**/*.jpg,*.png'],
                tasks: ['responsive_images:transform']
                
            } 
        },
        less: {
            default: {
                options: { 
                    strictMath: true 
                },
                files: {
                    '<%= yeoman.app %>/styles/css/main.css': '<%= yeoman.app %>/styles/less/main.less'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/common/search.js',
                '!<%= yeoman.app %>/main.js'
            ]
        },
        jscs: {
            config: '.jscs',
            src: '<%= yeoman.app %>/scripts/**/*.js',
        },
        injector: {
            serve: {
                options: {},
                localDependencies: {
                    files: {
                        '<%= yeoman.app %>/index.html': ['styles/css/{,*/}*.css'],
                    }
                }
            },
            dist: {
                options: {},
                localDependencies: {
                    files: {
                        '<%= yeoman.dist %>/index.html': ['styles/css/{,*/}*.css'],
                    }
                }
            }
        },
        plato: {
            reporter: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc'),
                    exclude: /\.template\.js$/ // exclude component templates 
                },
                files: {
                    'reports': ['<%= yeoman.app %>/scripts/**/*.js', '<%= yeoman.app %>/test/spec/*']
                }
            }
        },
        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'test'),
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        mocha: {
            all: {
                options: {
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    dir: 'dist',
                    appDir: 'app',
                    baseUrl: 'scripts',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    removeCombined: true,
                    findNestedDependencies: true,
                    optimize: 'uglify',
                    modules: [{
                            name: 'main'
                    }]
                        /*baseUrl: '<%= yeoman.app %>/scripts',
                        optimize: 'none',
                        paths: {
                            'templates': '../../.tmp/scripts/templates',
                            'jquery': '../../<%= yeoman.app %>/vendor/jquery/dist/jquery',
                            'underscore': '../../<%= yeoman.app %>/vendor/lodash/dist/lodash',
                            'backbone': '../../<%= yeoman.app %>/vendor/backbone/backbone'
                        },
                        // TODO: Figure out how to make sourcemaps work with grunt-usemin
                        // https://github.com/yeoman/grunt-usemin/issues/30
                        //generateSourceMaps: true,
                        // required to support SourceMaps
                        // http://requirejs.org/docs/errors.html#sourcemapcomments
                        preserveLicenseComments: false,
                        useStrict: true,
                        wrap: true
                        //uglify2: {} // https://github.com/mishoo/UglifyJS2*/
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                    ]
                }, {
                    src: 'node_modules/apache-server-configs/dist/.htaccess',
                    dest: '<%= yeoman.dist %>/.htaccess'
                }]
            },
            imagesRed: {
                expand: true,
                dest: '<%= yeoman.app %>/assets/img/original',
                cwd: 'assets/red/img/',
                src: '**'
            },
            imagesCountry: {
                expand: true,
                dest: '<%= yeoman.app %>/assets/img/original',
                cwd: 'assets/country/img/',
                src: '**'
            },
            all: {
                expand: true,
                dest: '<%= yeoman.app %>/assets/img/original',
                cwd: 'assets/both/img/',
                src: '**'
            },
            originals: 
            {
                expand: true,
                dest: '<%= yeoman.app %>/assets/img/',
                cwd: '<%= yeoman.app %>/assets/img/original',
                src: '**/*'
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                    ]
                }
            }
        },
        responsive_images: {
          transform: {
            options: {              
                sizes: [
                    {
                        name: 'thumb',
                        width: 370,
                        height: 200,
                        aspectRatio: false
                    },
                    {
                        name: 'sm',
                        width: 640,
                        quality: 60
                    },
                    {
                        name: 'md',
                        width: 1024
                    },
                    {
                        name: 'info',
                        width: 1500,
                        height: 550,
                        aspectRatio: false
                    },
                    {
                        name: 'header',
                        width: 1400,
                        height: 300,
                        aspectRatio: false
                    },
                    {
                        name: 'lg',
                        width: 1400,
                        quality: 80
                    },
                    {
                        name: 'lg',
                        width: 1400,
                        suffix: '_x2',
                        quality: 80
                    }
                ],
                engine: 'im',
                newFilesOnly: true
            },
            files: [{
                  expand: true,
                  src: ['**/*.{jpg,gif,png}'],
                  dot: true,
                  cwd: '<%= yeoman.app %>/assets/img/original/',
                  dest: '<%= yeoman.app %>/assets/img/'
            }]
          },
          dist: {
            options: {              
                sizes: [
                    {
                        name: 'thumb',
                        width: 370,
                        height: 200,
                        aspectRatio: false
                    },
                    {
                        name: 'sm',
                        width: 640,
                        quality: 60
                    },
                    {
                        name: 'large',
                        width: 640
                    },
                    {
                        name: 'large',
                        width: 1024,
                        suffix: '_x2',
                        quality: 60
                    }
                ],
                engine: 'im'
            },
            files: [{
                  expand: true,
                  src: ['**/*.{jpg,gif,png}'],
                  dot: true,
                  cwd: '<%= yeoman.app %>/assets/img/',
                  dest: '<%= yeoman.dist %>/assets/img/'
            }]
          }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        var serveTask = [
            'clean:server',
            'createDefaultTemplate',
            'copy:all',
            'responsive_images:transform',
            'copy:originals',
            'handlebars',
            'injector:serve',
            'less:default',
            'connect:livereload',
            'jshint',
            'jscs',
            'open:server',
            'watch'
        ];
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }
        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'handlebars',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }
        if (target === 'country') {
            serveTask[2] = 'copy:imagesCountry';
            serveTask[5] = 'less:country';
            return grunt.task.run(serveTask);
        }
        return grunt.task.run(serveTask);
    });

    grunt.registerTask('test', function (isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
                'clean:server',
                'createDefaultTemplate',
                'handlebars',
                'connect:test',
                'mocha',
                'watch'
            ];

        if (!isConnected) {
            return grunt.task.run(testTasks);
        } else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('build', function (target) {
        var buildTasks = [
            'responsive_images:transform',
            'copy:all',            
            'clean:dist',
            'createDefaultTemplate',
            'handlebars',
            'less:default',
            'jshint',
            'jscs',
            'requirejs',
            'injector:dist',
            'useminPrepare',
            'imagemin',
            'htmlmin',
            'concat',
            'cssmin',
            'uglify',
            'copy:dist',
            'rev',
            'usemin'
        ];
        if (target === 'country') {
            buildTasks[0] = 'copy:imagesCountry';
            return grunt.task.run(buildTasks);
        }
        return grunt.task.run(buildTasks);
    });

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
