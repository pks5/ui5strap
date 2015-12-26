/*
 * 
 * UI5Strap
 *
 * ui5strap.AppComponent
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
 
sap.ui.define(['./library', 'sap/ui/base/Object'], function(library, ObjectBase){

	var AppComponent = ObjectBase.extend("ui5strap.AppComponent", {
		"constructor" : function(app, options){
			ObjectBase.apply(this);
			
			this.app = app;
			this.options = options;
			this.controls = {};
		}
	}),
	AppComponentProto = AppComponent.prototype;

	AppComponentProto.init = function(){};
	
	AppComponentProto.registerControls = function(controls){
		var keys = Object.keys(controls);
		for(var i = 0; i < keys.length; i++){
			var key = keys[i];
			this.controls[key] = controls[key];
		}
	};
	
	AppComponentProto.getControl = function(controlKey){
		return this.controls[controlKey];
	};

	/**
	 * TODO Should we keep this getter?
	 */
	AppComponentProto.getApp = function(){
		return this.app;
	};

	/*
	 * TODO Should we enable this getter?
	AppComponentProto.getOptions = function(){
		return this.options;
	};
	*/

	//Return Module Constructor
	return AppComponent;
});