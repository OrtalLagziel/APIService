// Karma configuration

module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['jasmine'],

    plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher',
        'karma-junit-reporter',
        'karma-html-reporter',
        'karma-ng-html2js-preprocessor',
        'karma-coverage'
    ],

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'src/ModuleDefinition.js',
      'src/**/*.js',
      'src/**/*.html',
      'test/testUtils.js',
      'test/spec/**/*.js'
    ],

    preprocessors: {
      'src/**/*.html': 'ng-html2js',
      'src/**/!(*spec|*PO).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: config.moduleName
    },

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['progress', 'junit', 'html', 'coverage'],

    junitReporter: {
      outputDir: 'reports',
      outputFile: 'junit/TESTS-xunit.xml',
      useBrowserName: false
    },

  htmlReporter: {
      outputDir: 'reports', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: true, // simply replaces spaces with _ for files/dirs


      // experimental
      preserveDescribeNesting: false, // folded suites stay folded
      foldAll: false // reports start folded (only with preserveDescribeNesting)
  },

coverageReporter: {
    dir: 'reports',
    reporters: [{
            type: 'html',
            subdir: 'coverage/report-html'
        }, {
            type: 'lcov',
            subdir: 'coverage/report-lcov'
        },

        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        {
            type: 'cobertura',
            subdir: 'coverage/.',
            file: 'cobertura.xml'
        }, {
            type: 'text'
                //subdir: 'coverage/.',
                //file: 'text.txt'
        }
        /*
        {
          type: 'text-summary',
          subdir: 'coverage/.',
          file: 'text-summary.txt'
        }
        */
    ]
},

    // web server port
    port: 8080,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    //logLevel = LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
