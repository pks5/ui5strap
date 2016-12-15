/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.ConsoleApp
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
 * TODO Refactor to "ui5strap.ConsoleApp"
 */

 sap.ui.define(['./library', './AppBase', './Console'], function(ui5strapViewerLib, AppBase, Console){
	 
	 "use strict";
	 
	 /**
		 * Constructor for a new ConsoleApp instance.
		 * 
		 * @param {pks.ui5strap.viewer.AppConfig} oAppConfig - App configuration.
		 * @param {pks.ui5strap.viewer.ViewerBase} oViewer - Viewer instance that loaded this app.
		 * 
		 * @class
		 * App module for creating console apps.
		 * @extends pks.ui5strap.viewer.AppBase
		 * 
		 * @author Jan Philipp Knoeller
		 * @version 0.11.6
		 * 
		 * @constructor
		 * @public
		 * @alias pks.ui5strap.viewer.ConsoleApp
		 * 
		 */
	 var ConsoleApp = AppBase.extend("pks.ui5strap.viewer.ConsoleApp"),
	 /**
		 * @alias pks.ui5strap.viewer.ConsoleApp.prototype
		 */
		ConsoleAppProto = ConsoleApp.prototype;

	/*
	* ------------------------------------------------
	* --------------------- FLOW ---------------------
	* ------------------------------------------------
	*/
	
	/*
	* Init app specific logging
	* @protected
	*/
	ConsoleAppProto._initLog = function(){
		
		var _this = this;

		this.log = {

			debug : function (message) {
				_this.console && _this.console.debug(message, _this.getId());
				jQuery.sap.log.debug("[APPLOG] " + message);
			},

			warning : function (message) { 
				_this.console && _this.console.warning(message, _this.getId());
				jQuery.sap.log.warning("[APPLOG] " + message);
			},

			error : function (message) {
				_this.console && _this.console.error(message, _this.getId());
				jQuery.sap.log.error("[APPLOG] " + message);
			},

			info : function (message) {
				_this.console && _this.console.info(message, _this.getId());
				jQuery.sap.log.info("[APPLOG] " + message);
			},

			fatal : function (message) {
				_this.console && _this.console.fatal(message, _this.getId());
				jQuery.sap.log.fatal("[APPLOG] " + message);
			}

		};
	};

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/

	/**
	 * Creates the root control of this app.
	 * @Override
	 */
	ConsoleAppProto._createRootControl = function(callback){
		if(!this.console){
			this.console = new Console();
			this.console.setCurrentLog(this.getId());
			this.console.setLogLevel(this.config.data.app.logLevel);
		}
		
		callback && callback(this.console);
	}; 

	//Return Module Constructor
	return ConsoleApp;
});