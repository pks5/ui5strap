/*
 * 
 * UI5Prod
 *
 * Grunt file for building jsdoc.
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
			
			cleanDocs : {
				src : [oProdConfig.folderLibDocs]
			}
		},
		
		jsdoc : {
	        createDocs : {
	        	src: [oProdConfig.folderLibDev + "**/*.js"],
	            dest: oProdConfig.folderLibDocsApi
	        }
	    }
		
	});

	//Load the plugins.
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks('grunt-jsdoc');
	
	/*
	 * START Define Tasks
	 */
	
	//Clean releases in docs.
	grunt.registerTask("cleanup", [ "clean:cleanDocs" ]);
	
	grunt.registerTask("default", [ "clean:cleanDocs", "jsdoc:createDocs" ]);
	
	/*
	 * END Define Tasks
	 */
};