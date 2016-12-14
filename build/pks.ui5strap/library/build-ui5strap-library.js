module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		pathToLibRoot : "../../../www/lib/",
		libraryName : "pks/ui5strap",
		
		suffixDev : "_dev",
		suffixAll : "_all",
		suffixMin : "_min",
		suffixPre : "_pre",
		
		libraryAll : "<%= libraryName %><%= suffixAll %>",
		
		folderDev : "<%= pathToLibRoot %><%= libraryName %>/", //"<%= pathToLibRoot %><%= libraryName %><%= suffixDev %>/",
		
		folderAll : "<%= pathToLibRoot %><%= libraryName %><%= suffixAll %>/",
		folderMin : "<%= pathToLibRoot %><%= libraryName %><%= suffixMin %>/",
		folderPre : "<%= pathToLibRoot %><%= libraryName %><%= suffixPre %>/",
		
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			cleanFoldersAllMinPre : {
				src : [ "<%= folderAll %>",
				        "<%= folderMin %>",
				        "<%= folderPre %>"]
			}
		},
		
		/*
		 * File copy.
		 */
		copy : {
			/*
			 * Copies all files from ui5chart_dev to ui5chart_all.
			 */
			copyDevToAll : {
				expand : true,
				cwd : "<%= folderDev %>",
				src : [ '**' ],
				dest : "<%= folderAll %>"
			},

			/*
			 * Creates a duplicate of all javascript files in ui5chart_all and replaces .js by -dbg.js
			 * This creates the all library that contains minified and debug javascript files, themes and the less files.
			 */
			createDebugScriptsInAll : {
				expand : true,
				cwd : "<%= folderAll %>",
				src : [ '**/*.js' ],
				dest : "<%= folderAll %>",

				rename : function(dest, src) {
					return dest + src.replace('.js', '-dbg.js');
				}
			},
			
			/*
			 * Copies all files from ui5chart_all to ui5chart_min except debug, less and preload files.
			 * This creates the min library that contains themes and minified javascript files only.
			 */
			copyAllToMin : {
				expand : true,
				cwd : "<%= folderAll %>",
				src : [ '**', '!*-dbg.js', //'!library-preload.js',
						'!**/*.less' ],
				dest : "<%= folderMin %>"
			},
			
			/*
			 * Copies all files from ui5chart_all to ui5chart_pre except javascript and less files.
			 * This creates the preload library that contains themes and preload files only.
			 */
			copyAllToPre : {
				expand : true,
				cwd : "<%= folderAll %>",
				src : [ '**', '!*.js', '!**/*.less', "library-preload.js" ],
				dest : "<%= folderPre %>"
			}
		},
		
		/*
		 * Creates the library preload file(s) in ui5chart_all
		 */
		openui5_preload : {
			createPreloadFileInAll : {
				options : {
					resources : "<%= pathToLibRoot %>",
					dest : "<%= pathToLibRoot %>",
					compress : true
				},
				libraries : "<%= libraryAll %>"
			}
		},

		/*
		 * Uglifies all javascript files in ui5chart_all except debug files.
		 */ 
		uglify : {
			options : {
				compress : true
			},

			uglifyScriptsInAll : {
				files : [ {
					expand : true,
					cwd : "<%= folderAll %>",
					src : [ '**/*.js', '!*-dbg.js' ],
					dest : "<%= folderAll %>",
					ext : '.js'
				} ]
			}
		}

	});

	//Load the plugins.
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');
	
	/*
	 * START Define Tasks
	 */
	
	//Delete all, min and preload libs
	grunt.registerTask('cleanup', [ 'clean:cleanFoldersAllMinPre' ]);
	
	//Create all, min and preload libs
	grunt.registerTask('default', [ 'clean:cleanFoldersAllMinPre', 'copy:copyDevToAll',
			'openui5_preload:createPreloadFileInAll', 'copy:createDebugScriptsInAll', 'uglify:uglifyScriptsInAll',
			'copy:copyAllToMin', 'copy:copyAllToPre' ]);
	
	/*
	 * END Define Tasks
	 */
};