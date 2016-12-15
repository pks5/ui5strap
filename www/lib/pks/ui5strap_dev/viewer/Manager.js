/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.Manager
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
 
sap.ui.define(['./library', './AppComponent'], function(ui5strapViewerLib, AppComponent){

	"use strict";
	
	/**
	 * Constructor for a new Manager instance.
	 * 
	 * @param {pks.ui5strap.viewer.AppBase} [oApp] - The app this component belongs to.
	 * @param {object} [mSettings] - Settings for this component.
	 * 
	 * @class
	 * App component for creating services / managers.
	 * @extends pks.ui5strap.viewer.AppComponent
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.Manager
	 * 
	 */
	var Manager = AppComponent.extend("pks.ui5strap.viewer.Manager", /** @lends pks.ui5strap.viewer.Manager.prototype */{
		"constructor" : function(app, options){
			AppComponent.call(this, app, options);
			
			this.controls = {};
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.Manager.prototype
	 */
	ManagerProto = Manager.prototype;

	ManagerProto.registerControls = function(){
		if(1 === arguments.length){
			var controls = arguments[0],
				ids = Object.keys(controls);
			for(var i = 0; i < ids.length; i++){
				var controlId = ids[i];
				this.controls[controlId] = controls[controlId];
			}
	    }
		else{
			var view = arguments[0].getView(),
				ids = arguments[1];
			for(var i = 0; i < ids.length; i++){
				var controlId = ids[i];
				this.controls[controlId] = view.byId(controlId);
			}
		}
	};
	
	ManagerProto.getControl = function(controlKey){
		return this.controls[controlKey];
	};

	//Return Module Constructor
	return Manager;
});