/*
 * 
 * UI5Prod
 *
 * Grunt file for building UI5 Themes.
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
		sThemeSourceFile = "themes/*/library.source.less",
		aThemes = [ {
			expand : true,
			cwd : oProdConfig.folderLibDev,
			src : sThemeSourceFile,
			dest : oProdConfig.folderLibDev
		} ],
		aSubLibraries = oProdConfig.subLibraries;
	
	for(var i = 0; i < aSubLibraries.length; i++){
		var sSubLibrary = aSubLibraries[i];
		aThemes.push({
			expand : true,
			cwd : oProdConfig.folderLibDev + sSubLibrary,
			src : sThemeSourceFile,
			dest : oProdConfig.folderLibDev + sSubLibrary
		})
	}
	
	// Configuration
	grunt.initConfig({

		openui5_theme : {

			options : {
				compiler : {
					compress : true
				}
			},

			buildThemes : {
				files : aThemes
			}

		}

	});

	// Load OpenUI5 NPM Tasks
	grunt.loadNpmTasks("grunt-openui5");

	// Define Tasks
	grunt.registerTask("default", [ "openui5_theme:buildThemes" ]);
};