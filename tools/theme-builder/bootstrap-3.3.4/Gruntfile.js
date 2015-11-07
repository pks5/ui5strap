/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var npmShrinkwrap = require('npm-shrinkwrap');
  var generateGlyphiconsData = require('./grunt/bs-glyphicons-data-generator.js');
  var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
  var getLessVarsData = function () {
    var filePath = path.join(__dirname, 'less/variables.less');
    var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    var parser = new BsLessdocParser(fileContent);
    return { sections: parser.parseFile() };
  };
  var generateRawFiles = require('./grunt/bs-raw-files-generator.js');
  var generateCommonJSModule = require('./grunt/bs-commonjs-generator.js');
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

  Object.keys(configBridge.paths).forEach(function (key) {
    configBridge.paths[key].forEach(function (val, i, arr) {
      arr[i] = path.join('./docs/assets', val);
    });
  });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
    jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist'

    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      core: {
        src: 'js/*.js'
      },
      test: {
        options: {
          jshintrc: 'js/tests/unit/.jshintrc'
        },
        src: 'js/tests/unit/*.js'
      },
      assets: {
        src: ['docs/assets/js/src/*.js', 'docs/assets/js/*.js', '!docs/assets/js/*.min.js']
      }
    },

    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      core: {
        src: '<%= jshint.core.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: '<%= jshint.assets.src %>'
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      core: {
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      customize: {
        src: configBridge.paths.customizerJs,
        dest: 'docs/assets/js/customize.min.js'
      },
      docsJs: {
        src: configBridge.paths.docsJs,
        dest: 'docs/assets/js/docs.min.js'
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: 'js/tests/index.html'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: '../templates/base.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      
      
      compileThemeBase: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: '../templates/base/base.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      compileThemeUi5strapDefault: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: '../templates/ui5strap_default/ui5strap_default.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      compileThemeUi5strapMyTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: '../templates/<%= pkg.ui5strap.myTheme %>/<%= pkg.ui5strap.myTheme %>.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      
      
      compileTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>-theme.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
        },
        src: 'less/theme.less',
        dest: 'dist/css/<%= pkg.name %>-theme.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      theme: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>-theme.css'
      },
      docs: {
        src: ['docs/assets/css/anchor.css', 'docs/assets/css/src/docs.css']
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css'
      ],
      examples: [
        'docs/examples/**/*.css'
      ],
      docs: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: 'docs/assets/css/src/docs.css'
      }
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      },
      minifyTheme: {
        src: 'dist/css/<%= pkg.name %>-theme.css',
        dest: 'dist/css/<%= pkg.name %>-theme.min.css'
      },
      docs: {
        src: [
          'docs/assets/css/src/pygments-manni.css',
          'docs/assets/css/src/anchor.css',
          'docs/assets/css/src/docs.css'

        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'dist/css/*.css'
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: '**/*.css',
        dest: 'docs/examples/'
      },
      docs: {
        src: 'docs/assets/css/src/docs.css',
        dest: 'docs/assets/css/src/docs.css'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'dist/'
      },
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/dist/'
      },
      


      ui5ThemeBaseCssLibrary: {
        src : 'dist/css/<%= pkg.name %>.min.css',
        dest : '<%= pkg.ui5strap.themeBaseDir %>library.css'
      },
      ui5ThemeBaseCssLibraryFonts: {
        expand: true,
        src : 'fonts/*',
        dest : '<%= pkg.ui5strap.themeBaseDir %>'
      },
      ui5ThemeBaseCssLibraryFontsFA: {
        expand : true,
        cwd : '../font-awesome-4.3.0/fonts/',
        src : ['*'],
        dest : '<%= pkg.ui5strap.themeBaseDir %>fonts/'
      },
      ui5ThemeBaseCssLibraryDebug: {
        src : 'dist/css/<%= pkg.name %>.css',
        dest : '<%= pkg.ui5strap.themeBaseDir %>library-dbg.css'
      },
      


      ui5ThemeUi5strapDefaultCssLibrary: {
        src : 'dist/css/<%= pkg.name %>.min.css',
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.defaultTheme %>/library.css'
      },
      ui5ThemeUi5strapDefaultCssLibraryFonts: {
        expand: true,
        src : 'fonts/*',
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.defaultTheme %>/'
      },
      ui5ThemeUi5strapDefaultCssLibraryFontsFA: {
        expand : true,
        cwd : '../font-awesome-4.3.0/fonts/',
        src : ['*'],
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.defaultTheme %>/fonts/'
      },
      ui5ThemeUi5strapDefaultCssLibraryDebug: {
        src : 'dist/css/<%= pkg.name %>.css',
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.defaultTheme %>/library-dbg.css'
      },
      ui5ThemeUi5strapDefaultCssLibrarySAP: {
        src : 'dist/css/<%= pkg.name %>.min.css',
        dest : '<%= pkg.ui5strap.themeSapBluecrystalDir %>library.css'
      },
      ui5ThemeUi5strapDefaultCssLibrarySAPFonts: {
        expand: true,
        src : 'fonts/*',
        dest : '<%= pkg.ui5strap.themeSapBluecrystalDir %>'
      },
      ui5ThemeUi5strapDefaultCssLibrarySAPFontsFA: {
        expand : true,
        cwd : '../font-awesome-4.3.0/fonts/',
        src : ['*'],
        dest : '<%= pkg.ui5strap.themeSapBluecrystalDir %>fonts/'
      },
      ui5ThemeUi5strapDefaultCssLibrarySAPDebug: {
        src : 'dist/css/<%= pkg.name %>.css',
        dest : '<%= pkg.ui5strap.themeSapBluecrystalDir %>library-dbg.css'
      },
      


      ui5ThemeUi5strapMyThemeCssLibrary: {
        src : 'dist/css/<%= pkg.name %>.min.css',
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.myTheme %>/library.css'
      },
      ui5ThemeUi5strapMyThemeCssLibrarySapUiCore: {
        expand : true,
        cwd : '<%= pkg.ui5strap.themeSapUiCoreFolder %>ui5strap_default/',
        src : ['**'],
        dest : '<%= pkg.ui5strap.themeSapUiCoreFolder %><%= pkg.ui5strap.myTheme %>/'
      },
      ui5ThemeUi5strapMyThemeCssLibrarySapUiCommons: {
        expand : true,
        cwd : '<%= pkg.ui5strap.themeSapUiCommonsFolder %>ui5strap_default/',
        src : ['**'],
        dest : '<%= pkg.ui5strap.themeSapUiCommonsFolder %><%= pkg.ui5strap.myTheme %>/'
      },
      ui5ThemeUi5strapMyThemeCssLibrarySapUiLayout: {
        expand : true,
        cwd : '<%= pkg.ui5strap.themeSapUiLayoutFolder %>ui5strap_default/',
        src : ['**'],
        dest : '<%= pkg.ui5strap.themeSapUiLayoutFolder %><%= pkg.ui5strap.myTheme %>/'
      },
      ui5ThemeUi5strapMyThemeCssLibrarySapM: {
        expand : true,
        cwd : '<%= pkg.ui5strap.themeSapMFolder %>ui5strap_default/',
        src : ['**'],
        dest : '<%= pkg.ui5strap.themeSapMFolder %><%= pkg.ui5strap.myTheme %>/'
      },
      ui5ThemeUi5strapMyThemeCssLibraryFonts: {
        expand: true,
        src : 'fonts/*',
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.myTheme %>/'
      },
      ui5ThemeUi5strapMyThemeCssLibraryFontsFA: {
        expand : true,
        cwd : '../font-awesome-4.3.0/fonts/',
        src : ['*'],
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.myTheme %>/fonts/'
      },
      ui5ThemeUi5strapMyThemeCssLibraryDebug: {
        src : 'dist/css/<%= pkg.name %>.css',
        dest : '<%= pkg.ui5strap.themeFolder %><%= pkg.ui5strap.myTheme %>/library-dbg.css'
      }



    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      options: {
        config: '_config.yml'
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    jade: {
      options: {
        pretty: true,
        data: getLessVarsData
      },
      customizerVars: {
        src: 'docs/_jade/customizer-variables.jade',
        dest: 'docs/_includes/customizer-variables.html'
      },
      customizerNav: {
        src: 'docs/_jade/customizer-nav.jade',
        dest: 'docs/_includes/nav/customize.html'
      }
    },

    htmllint: {
      options: {
        ignore: [
          'Attribute "autocomplete" not allowed on element "button" at this point.',
          'Attribute "autocomplete" not allowed on element "input" at this point.',
          'Element "img" is missing required attribute "src".'
        ]
      },
      src: '_gh_pages/**/*.html'
    },

    watch: {
      src: {
        files: '<%= jshint.core.src %>',
        tasks: ['jshint:src', 'qunit', 'concat']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'less'
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          throttled: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/js/tests/index.html?hidepassed'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
        }
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    },

    compress: {
      main: {
        options: {
          archive: 'bootstrap-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'bootstrap-<%= pkg.version %>-dist'
          }
        ]
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll:docs', 'htmllint']);

  var runSubset = function (subset) {
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
  };
  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0';
  };

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core') &&
      // Skip core tests if this is a Savage build
      process.env.TRAVIS_REPO_SLUG !== 'twbs-savage/bootstrap') {
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'csslint:dist', 'test-js', 'docs']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      // Skip HTML5 validator on Travis when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html');
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-js-unit') &&
      // Skip Sauce on Travis when [skip sauce] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);
  grunt.registerTask('test-js', ['jshint:core', 'jshint:test', 'jshint:grunt', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify:core', 'commonjs']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'usebanner', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);

  /*
  * Ui5Strap Theme Builder
  */

  //
  grunt.registerTask('dist-css-theme', ['autoprefixer:core', 'usebanner', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme']);

  //base
  grunt.registerTask('make-theme-base', ['clean:dist', 'less:compileThemeBase', 'dist-css-theme', 'copy:fonts', 'copy:ui5ThemeBaseCssLibraryFonts', 'copy:ui5ThemeBaseCssLibraryFontsFA','copy:ui5ThemeBaseCssLibrary', 'copy:ui5ThemeBaseCssLibraryDebug']);
  //ui5strap_default
  //This theme is used as theme for the Ui5Strap library when using theme sap_bluecrystal
  grunt.registerTask('make-theme-default', ['clean:dist', 'less:compileThemeUi5strapDefault', 'dist-css-theme', 'copy:fonts', 'copy:ui5ThemeUi5strapDefaultCssLibraryFonts', 'copy:ui5ThemeUi5strapDefaultCssLibraryFontsFA','copy:ui5ThemeUi5strapDefaultCssLibrary', 'copy:ui5ThemeUi5strapDefaultCssLibraryDebug', 'copy:ui5ThemeUi5strapDefaultCssLibrarySAPFonts', 'copy:ui5ThemeUi5strapDefaultCssLibrarySAPFontsFA','copy:ui5ThemeUi5strapDefaultCssLibrarySAP', 'copy:ui5ThemeUi5strapDefaultCssLibrarySAPDebug']);
  //My Theme
  grunt.registerTask('make-theme-my', ['clean:dist', 'less:compileThemeUi5strapMyTheme', 'dist-css-theme', 'copy:fonts', 'copy:ui5ThemeUi5strapMyThemeCssLibraryFonts', 'copy:ui5ThemeUi5strapMyThemeCssLibraryFontsFA', 'copy:ui5ThemeUi5strapMyThemeCssLibrary', 'copy:ui5ThemeUi5strapMyThemeCssLibraryDebug', 'copy:ui5ThemeUi5strapMyThemeCssLibrarySapUiCore', 'copy:ui5ThemeUi5strapMyThemeCssLibrarySapUiCommons', 'copy:ui5ThemeUi5strapMyThemeCssLibrarySapUiLayout', 'copy:ui5ThemeUi5strapMyThemeCssLibrarySapM']);
  
  /*
  * END Ui5Strap Theme Builder
  */

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'test']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');

  grunt.registerTask('build-glyphicons-data', function () { generateGlyphiconsData.call(this, grunt); });

  // task for building customizer
  grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
  grunt.registerTask('build-customizer-html', 'jade');
  grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function () {
    var banner = grunt.template.process('<%= banner %>');
    generateRawFiles(grunt, banner);
  });

  grunt.registerTask('commonjs', 'Generate CommonJS entrypoint module in dist dir.', function () {
    var srcFiles = grunt.config.get('concat.bootstrap.src');
    var destFilepath = 'dist/js/npm.js';
    generateCommonJSModule(grunt, srcFiles, destFilepath);
  });

  // Docs task.
  grunt.registerTask('docs-css', ['autoprefixer:docs', 'autoprefixer:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:docs']);
  grunt.registerTask('lint-docs-css', ['csslint:docs', 'csslint:examples']);
  grunt.registerTask('docs-js', ['uglify:docsJs', 'uglify:customize']);
  grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
  grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'build-glyphicons-data', 'build-customizer']);

  grunt.registerTask('prep-release', ['jekyll:github', 'compress']);

  // Task for updating the cached npm packages used by the Travis build (which are controlled by test-infra/npm-shrinkwrap.json).
  // This task should be run and the updated file should be committed whenever Bootstrap's dependencies change.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () {
    var done = this.async();
    npmShrinkwrap({ dev: true, dirname: __dirname }, function (err) {
      if (err) {
        grunt.fail.warn(err);
      }
      var dest = 'test-infra/npm-shrinkwrap.json';
      fs.renameSync('npm-shrinkwrap.json', dest);
      grunt.log.writeln('File ' + dest.cyan + ' updated.');
      done();
    });
  });
};
