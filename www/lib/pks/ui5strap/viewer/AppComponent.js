/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.AppComponent
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
 
sap.ui.define(['./library', 'sap/ui/base/Object'], function(ui5strapViewerLib, ObjectBase){

	"use strict";
	
	/**
	 * Constructor for a new AppComponent instance.
	 * 
	 * @param {pks.ui5strap.viewer.AppBase} [oApp] - The app this component belongs to.
	 * @param {object} [mSettings] - Settings for this component.
	 * 
	 * @class
	 * Base class for ui5strap app components.
	 * @extends sap.ui.base.Object
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.AppComponent
	 * 
	 */
	var AppComponent = ObjectBase.extend("pks.ui5strap.viewer.AppComponent", /** @lends pks.ui5strap.viewer.AppComponent.prototype */{
		/**
		 * @constructs
		 */
		"constructor" : function(){
			ObjectBase.apply(this);
			
			if(arguments[1]){ 
				this.app = arguments[0];
				this.options = arguments[1];
			}
			else if(arguments[0]){
				this.options = arguments[0];
				this.app = this.options.app;
			}
			
			if(!this.app || !this.options){
				throw new Error("AppComponent constructor must have either 1 or 2 arguments.");
			}
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.AppComponent.prototype
	 */
	AppComponentProto = AppComponent.prototype;

	AppComponentProto.init = function(){};
	
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