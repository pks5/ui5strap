/*
 * 
 * UI5Strap
 *
 * ui5strap.App
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
 * TODO Refactor to "ui5strap.SandboxApp"
 */

 sap.ui.define(['./library', './AppBase', './Sandbox'], function(library, AppBase, Sandbox){

	 var AppSandbox = AppBase.extend("ui5strap.AppSandbox", {
		"constructor" : function(config, viewer){
			AppBase.call(this, config, viewer);
			
			this._sandboxControl = new Sandbox();
		}
	}),
	AppSandboxProto = AppSandbox.prototype;

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/
	
	AppSandboxProto.getRootControl = function(){
		return this._sandboxControl;
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
	AppSandboxProto.onMessage = function(oEvent){
		AppBase.prototype.onMessage.call(this, oEvent);
		
		var appMessage = oEvent.getParameters();
		
		if(this.config.data.app.propagateMessages){
			//Pass Message to IFrame Content
			this._sandboxControl.sendMessage(appMessage, '*');
		}
	};

	AppSandboxProto.onFirstShow = function(){
		AppBase.prototype.onFirstShow.call(this);

		this._sandboxControl.setSrc(this.config.data.app.appURL);
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	AppSandboxProto.includeStyle = function(callback){
		callback && callback();
	};

	AppSandboxProto.removeStyle = function(){};

	//Return Module Constructor
	return AppSandbox;
});