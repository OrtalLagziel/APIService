module.exports = function(grunt) {
  'use strict';

  // Configurable paths
  var config = {
    livereload: 35729,
    src: 'src',
    test: 'test',
    dist: 'dist'
  };

  // Livereload setup
  var lrSnippet = require('connect-livereload')({port: config.livereload});
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*'
          ]
        }]
      }
    },

    delta: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      less: {
        files: ['<%= config.src %>/**/*.less'],
        tasks: ['less:dist']
      },
      app: {
        files: [
          '<%= config.src %>/**/*.html',
          '{.tmp,<%= config.src %>}/**/*.css',
          '{.tmp,<%= config.src %>}/**/*.js'
        ],
        options: {
          livereload: config.livereload
        }
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'karma:unit']
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, config.src)
            ];
          }
        }
      }
    },

    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },

      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= config.src %>/**/*.js']
      },

      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        moduleName: 'templates-<%= pkg.name %>'
      },
      unit: {
        singleRun: true
      }
    },

    ngAnnotate: {
        dist: {
            files: [
                {
                    '<%= config.dist %>/<%= pkg.name %>.js': [
                        '<%= config.src %>/ModuleDefinition.js',
                        '<%= config.src %>/**/*.js',
                        '!<%= config.src %>/**/*PO.js'
                    ]
                }
            ]
        }
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= config.dist %>/<%= pkg.name %>-templates.js', '<%= config.dist %>/<%= pkg.name %>.js'],
        dest: '<%= config.dist %>/<%= pkg.name %>.js'
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          src: ['<%= config.dist %>/<%= pkg.name %>.css'],
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        sourceMap: true
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
      }
    },

    bump: {
        options: {
          files: ['package.json', 'bower.json'],
          updateConfigs: ['pkg'],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['package.json', 'bower.json'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin',
          gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
          globalReplace: false,
          prereleaseName: false,
          metadata: '',
          regExp: false
        }
      }
  });

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'ngAnnotate:dist',
    'concat:dist',
    'uglify:dist',
    'cssmin:dist'
  ]);

  grunt.registerTask('release', [
    'build',
    'bump'
  ]);

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['build', 'delta']);

  grunt.registerTask('default', ['build']);

};
