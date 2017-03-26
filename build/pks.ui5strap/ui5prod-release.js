/*
 * 
 * UI5Prod
 *
 * Grunt file for release.
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://pksoftware.de
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * ALL RIGHTS RESERVED
 * 
 */

var ui5prodShared = require("./ui5prod-shared.js");

module.exports = function(grunt) {
	
	"use strict";
	
	var oPackage = grunt.file.readJSON("package.json"),
	oProdConfig = ui5prodShared.getProdConfig(oPackage.ui5prod);
	
	// Project configuration.
	grunt.initConfig({
		
		/*
		 * Deletes all generated libraries.
		 */
		clean : {
			options : {
				force : true
			},
			
			cleanLocalRelease : {
				src : [oProdConfig.pathToLocalReleaseRoot]
			},
			
			cleanReleaseTarget : {
				src : [oProdConfig.folderReleaseTargetFullVersion,
				       oProdConfig.folderReleaseTargetMinVersion,
				       oProdConfig.folderReleaseTargetLibMin,
				       oProdConfig.folderReleaseTargetLibDocs]
			}
		},
		
		/*
		 * File copy.
		 */
		copy : {
			/*
			 * Copies all files needed for FULL Release to the release folder.
			 */
			copyFullVersionToLocalRelease : {
				expand : true,
				cwd : oProdConfig.pathToRoot,
				src : [
				       
				       "bin/**",
				       "!bin/*-release.sh",
				       
				       "build/**",
				       "!build/*/*-release.js",
				       
				       "server/**",
				       
				       "www/apps/ui5charts-demo/**",
				       
				       oProdConfig.subPathWwwDocs + "/" + oProdConfig.libraryName + "/**", 
				       
				       oProdConfig.subPathWwwLib + "/" + oProdConfig.subPathLibDev + "/**", 
				       oProdConfig.subPathWwwLib + "/" + oProdConfig.subPathLibAll + "/**",
				       oProdConfig.subPathWwwLib + "/" + oProdConfig.subPathLibMin + "/**",
				       oProdConfig.subPathWwwLib + "/" + oProdConfig.subPathLibPre + "/**",
				       
				       "!**/node_modules/**",
				       "!*.log"
				],
				dest : oProdConfig.folderLocalReleaseFullVersion
			},
			
			/*
			 * Copies all files needed for DEMO Release to the release folder.
			 */
			copyMinVersionToLocalRelease : {
				expand : true,
				cwd : oProdConfig.pathToRoot,
				src : [
				       "bin/package.json",
				       "bin/install.sh",
				       "bin/update.sh",
				       "bin/run-web.sh",
				       
				       "server/**",
				       
				       "www/apps/ui5charts-demo/**",
				       
				       oProdConfig.subPathWwwDocs + "/" + oProdConfig.libraryName + "/**",
				       
				       oProdConfig.subPathWwwLib + "/" + oProdConfig.subPathLibMin + "/**",
				       oProdConfig.subPathWwwLib + "/" + oProdConfig.subPathLibPre + "/**",
				       
				       "!**/node_modules/**",
				       "!*.log"],
				dest : oProdConfig.folderLocalReleaseMinVersion
			},
			
			copyFullVersionToReleaseTarget : {
				src : oProdConfig.fileLocalReleaseFullVersion,
				dest : oProdConfig.fileReleaseTargetFullVersion
			},
			
			copyMinVersionToReleaseTarget : {
				src : oProdConfig.fileLocalReleaseMinVersion,
				dest : oProdConfig.fileReleaseTargetMinVersion
			},
			  
			copyLibMinToReleaseTarget: {
				expand : true,
				cwd : oProdConfig.folderLocalReleaseLibMin,
				src : ["**"],
				dest : oProdConfig.folderReleaseTargetLibMin
			},
			
			copyLibDocsToReleaseTarget: {
				expand : true,
				cwd : oProdConfig.folderLibDocs,
				src : ['**'],
				dest : oProdConfig.folderReleaseTargetLibDocs
			}
		},
		
		/*
		 * Compresses the release folders
		 */
		
		compress: {
			  compressFullVersion: {
			    options: {
			    	archive: oProdConfig.fileLocalReleaseFullVersion
			    },
			    expand: true,
			    cwd: oProdConfig.folderLocalReleaseFullVersion,
			    src: ["**/*"],
			    dest: "/"
			  },
			  
			  compressMinVersion: {
			    options: {
			    	archive: oProdConfig.fileLocalReleaseMinVersion
			    },
			    expand: true,
			    cwd: oProdConfig.folderLocalReleaseMinVersion,
			    src: ["**/*"],
			    dest: "/"
			  }
		}

	});

	//Load the plugins.
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-compress");
	
	/*
	 * START Define Tasks
	 */
	
	//Clean release folder.
	grunt.registerTask("cleanup", [ "clean:cleanLocalRelease" ]);
	
	//Creates a release
	grunt.registerTask(
			"buildLocalRelease", 
			[
			 "clean:cleanLocalRelease", 
			 "copy:copyFullVersionToLocalRelease", 
			 "copy:copyMinVersionToLocalRelease", 
			 "compress:compressFullVersion", 
			 "compress:compressMinVersion"
			]
	);
	
	//Clean releases in docs.
	grunt.registerTask("cleanupReleaseTarget", [ "clean:cleanReleaseTarget" ]);
	
	//Creates the releases in docs.
	grunt.registerTask(
			"buildReleaseTarget",
			[ 
			"clean:cleanReleaseTarget", 
			"copy:copyFullVersionToReleaseTarget", 
			"copy:copyMinVersionToReleaseTarget", 
			"copy:copyLibMinToReleaseTarget",
			"copy:copyLibDocsToReleaseTarget"
			]
	);
	
	//Creates a complete release.
	grunt.registerTask(
			"default",
			[
			 "clean:cleanLocalRelease",
			 "copy:copyFullVersionToLocalRelease",
			 "copy:copyMinVersionToLocalRelease",
			 "compress:compressFullVersion",
			 "compress:compressMinVersion",
			 "clean:cleanReleaseTarget",
			 "copy:copyFullVersionToReleaseTarget",
			 "copy:copyMinVersionToReleaseTarget",
			 "copy:copyLibMinToReleaseTarget",
			 "copy:copyLibDocsToReleaseTarget"
			]
	);
	
	/*
	 * END Define Tasks
	 */
};