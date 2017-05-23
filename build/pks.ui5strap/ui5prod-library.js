/*
 * 
 * UI5Prod
 *
 * Grunt file for building UI5 libraries.
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://pksoftware.de
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

var ui5prodShared = require("./ui5prod-shared.js");

module.exports = function(grunt) {
	
	"use strict";
	
	var oPackage = grunt.file.readJSON("package.json"),
		oProdConfig = ui5prodShared.getProdConfig(oPackage.ui5prod),
		sSubPathLib = oProdConfig.subPathLib,
		sLibraries = sSubPathLib,
		aSubLibraries = oProdConfig.subLibraries;
	
		if(aSubLibraries.length){
			sLibraries += "/*";
		}
	
	
	// Project configuration.
	grunt.initConfig({
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			cleanFoldersAllMinPre : {
				src : [ oProdConfig.folderLibAll,
				        oProdConfig.folderLibMin,
				        oProdConfig.folderLibPre]
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
				cwd : oProdConfig.folderLibDev,
				src : [ '**' ],
				dest : oProdConfig.folderLibAll
			},

			/*
			 * Creates a duplicate of all javascript files in ui5chart_all and replaces .js by -dbg.js
			 * This creates the all library that contains minified and debug javascript files, themes and the less files.
			 */
			createDebugScriptsInAll : {
				expand : true,
				cwd : oProdConfig.folderLibAll,
				src : [ '**/*.js', '!**/library-preload.js' ],
				dest : oProdConfig.folderLibAll,

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
				cwd : oProdConfig.folderLibAll,
				src : [ '**', '!**/*-dbg.js', //'!library-preload.js',
						'!**/*.less' ],
				dest : oProdConfig.folderLibMin
			},
			
			/*
			 * Copies all files from ui5chart_all to ui5chart_pre except javascript and less files.
			 * This creates the preload library that contains themes and preload files only.
			 */
			copyAllToPre : {
				expand : true,
				cwd : oProdConfig.folderLibAll,
				src : [ '**', '!**/*.js', '!**/*.less', "**/library-preload.js" ],
				dest : oProdConfig.folderLibPre
			}
		},
		
		/*
		 * Creates the library preload file(s) in ui5chart_all
		 */
		openui5_preload : {
			createPreloadFileInAll : {
				options : {
					resources : [{ 
						cwd : oProdConfig.folderLibAll,
						prefix : sSubPathLib
					}],
					dest : oProdConfig.folderLibAll,
					
					compress : true
				},
				
				libraries : sLibraries
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
					cwd : oProdConfig.folderLibAll,
					src : [ '**/*.js', '!*-dbg.js', '!library-preload.js', '!*_min.js', '!*.min.js' ],
					dest : oProdConfig.folderLibAll,
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