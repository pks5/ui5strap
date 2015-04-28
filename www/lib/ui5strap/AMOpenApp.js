/*
 * 
 * UI5Strap
 *
 * ui5strap.AMOpenApp
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

(function(){

	jQuery.sap.declare("ui5strap.AMOpenApp");
	
	jQuery.sap.require("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule;

	ActionModule.extend("ui5strap.AMOpenApp");

	var OpenAppProto = ui5strap.AMOpenApp.prototype;

	/*
	* @Override
	*/
	OpenAppProto.namespace = 'openApp';

	/*
	* @Override
	*/
	OpenAppProto.parameters = {
		"appUrl" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : false, 
			"defaultValue" : "BROWSER", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	OpenAppProto.run = function(){
		
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

		var appUrl = this.getParameter("appUrl");

		if(!appUrl){
			throw new Error('Invalid sapplication url: ' + appUrl);
		}

		var sapplicationUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();

		this.setParameter("frameUrl", sapplicationUrl);

		if(!(this.context.app instanceof ui5strap.AppSystem)){
			console.log(this.context.app);
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		var sappViewer = this.context.app.getViewer();
		var target = this.getParameter("target");
		if("BROWSER" === target){
			//Means to redirect
			sappViewer.openSapplication(appUrl);
		}
		else if("VIEWER" === target){
			var _this = this;
			sappViewer.executeApp(appUrl, false, function(){
				//Notify the action module that the action is completed.
				_this.fireEvents(ActionModule.EVENT_COMPLETED);
			});	
		}
		
	};

	/*
	* @Override
	*/
	OpenAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};

}());