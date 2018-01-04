'use strict';


module.exports = function (grunt) {


    var baseDir = '../../svgs', // <-- Set to your SVG base directory
        svgFolder = baseDir + "/" + grunt.option('svgFolder') || new Date().getTime(),
        svgGlob = '**/*.svg', // <-- Glob to match your SVG files
        timestamp = grunt.option('timestamp') || new Date().getTime(),
        css_Prefix = (grunt.option('cssPrefix') || 'icon') + '-',
        svg_shape_padding = grunt.option('padding') || 2,
        outRoot = '../../releases',
        outDir = outRoot + '/sprite_' + timestamp, // <-- Main output directory
        config = {
            shape: {
                spacing: {
                    padding: svg_shape_padding
                }
            },
            mode: {
                css: {
                    bust: false,
                    dest: 'style',
                    inline: false,
                    layout: "packed",
                    sprite: "svg/icons.svg",
                    //prefix: cssPrefix,
                    render: {
                        less: {
                            template: 'template/template-less.mustache',
                            dest: 'less/icons.less'
                        }
                    },
                    example: {
                        template: 'template/template-html.mustache',
                        dest: '../icons.html'
                    }
                    /*example : true*/
                }
            },
            variables: {
                cssPath: 'style/icons.css',
                svgPath: 'svg/icons.svg',
                cssPrefix: css_Prefix,
                svg_shape_padding: svg_shape_padding
            }
        },
        lessConfig = {
            production: {
                //options: {
                //    modifyVars: {
                //        yellow: '#ffdd00'
                //    }
                //},
                expand: true, // set to true to enable options following options:
                cwd: outDir + "/style/less/", // all sources relative to this path
                src: "*.less", // source folder patterns to match, relative to cwd
                dest: outDir + "/style/", // destination folder path prefix
                ext: ".css"
            }
        };

    var compressConfig = {
        main: {
            options: {
                mode: 'zip',
                archive: outRoot + '/sprite_' + timestamp + '.zip'
            },
            expand: true,
            cwd: outDir,
            src: ['**/*'],
            dest: outDir
        }
    };


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        svg_sprite: {
            custom: {
                cwd: svgFolder,
                dest: outDir,
                src: [svgGlob],
                options: config
            }
        },

        less: lessConfig,

        compress: compressConfig
    });

    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['svg_sprite', 'less', 'compress']);
};
