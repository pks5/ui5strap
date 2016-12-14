/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.AppSystem
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

/*
 * TODO Refactor to "pks.ui5strap.viewer.SystemApp"
 */

 sap.ui.define(['./library', './App'], function(ui5strapViewerLib, App){
	 
	 "use strict";
	 
	 /**
		 * Constructor for a new AppSystem instance.
		 * 
		 * @param {pks.ui5strap.viewer.AppConfig} oAppConfig - App configuration.
		 * @param {pks.ui5strap.viewer.ViewerBase} oViewer - Viewer instance that loaded this app.
		 * 
		 * @class
		 * App module for system apps.
		 * @extends pks.ui5strap.viewer.App
		 * 
		 * @author Jan Philipp Knoeller
		 * @version 0.11.6
		 * 
		 * @constructor
		 * @public
		 * @alias pks.ui5strap.viewer.AppSystem
		 * 
		 */
	 var AppSystem = App.extend("pks.ui5strap.viewer.AppSystem", /** @lends pks.ui5strap.viewer.AppSystem.prototype */{
		 /**
			 * @constructs
			 */
		 "constructor" : function(config, viewer){
			App.call(this, config, viewer);

			this.getViewer = function(){
				return viewer;
			};
		}
	});

	//Return Module Constructor
	return AppSystem;
});