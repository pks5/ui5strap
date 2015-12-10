/*
 * 
 * UI5Strap
 *
 * ui5strap.AMShowApp
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMShowApp = ActionModule.extend("ui5strap.AMShowApp"),
		ShowAppProto = AMShowApp.prototype;

	/*
	* @Override
	*/
	ShowAppProto.namespace = 'showApp';

	/*
	* @Override
	*/
	ShowAppProto.parameters = {
		"id" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	ShowAppProto.run = function(){
		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		var viewer = this.context.app.getViewer();
		var _this = this;
			viewer.showApp(
				this.getParameter("id"),
				null, 
				function(){
					//Notify the action module that the action is completed.
					_this.fireEvents(ActionModule.EVENT_COMPLETED);
				}
			);	
		
		
	};

	/*
	* @Override
	*/
	ShowAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};
	
	return AMShowApp;
});