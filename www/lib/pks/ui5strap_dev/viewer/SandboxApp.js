/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.SandboxApp
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
 * TODO Refactor to "pks.ui5strap.viewer.SandboxApp"
 */

 sap.ui.define(['./library', './AppBase', './Sandbox'], function(ui5strapViewerLib, AppBase, Sandbox){
	 
	 "use strict";
	 
	 /**
		 * Constructor for a new SandboxApp instance.
		 * 
		 * @param {pks.ui5strap.viewer.AppConfig} oAppConfig - App configuration.
		 * @param {pks.ui5strap.viewer.ViewerBase} oViewer - Viewer instance that loaded this app.
		 * 
		 * @class
		 * App module for creating sandbox apps.
		 * @extends pks.ui5strap.viewer.AppBase
		 * 
		 * @author Jan Philipp Knoeller
		 * @version 1.0.2-SNAPSHOT
		 * 
		 * @constructor
		 * @public
		 * @alias pks.ui5strap.viewer.SandboxApp
		 * 
		 */
	 var SandboxApp = AppBase.extend("pks.ui5strap.viewer.SandboxApp", /** @lends pks.ui5strap.viewer.SandboxApp.prototype */{
		 /**
			 * @constructs
			 */
		 "constructor" : function(config, viewer){
			AppBase.call(this, config, viewer);
			
			this._sandboxControl = new Sandbox();
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.SandboxApp.prototype
	 */
	SandboxAppProto = SandboxApp.prototype;

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/
	
	 /**
	  * Creates the App's Root Control.
	  */
	SandboxAppProto._createRootControl = function(callback){
		callback && callback(this._sandboxControl);
	}; 

	/*
	* ----------------------------------------------------------
	* --------------------- Event Handlers ---------------------
	* ----------------------------------------------------------
	*/

	/**
	* Triggered when an app message is sent to this app
	* @public
	*/
	SandboxAppProto.onMessage = function(oEvent){
		AppBase.prototype.onMessage.call(this, oEvent);
		
		var appMessage = oEvent.getParameters();
		
		if(this.config.data.app.propagateMessages){
			//Pass Message to IFrame Content
			this._sandboxControl.sendMessage(appMessage, '*');
		}
	};

	SandboxAppProto.onFirstShow = function(){
		AppBase.prototype.onFirstShow.call(this);

		this._sandboxControl.setSrc(this.config.data.app.appURL);
	};

	//Return Module Constructor
	return SandboxApp;
});