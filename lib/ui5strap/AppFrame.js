/*
 * 
 * UI5Strap
 *
 * ui5strap.AppFrame
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

	jQuery.sap.declare("ui5strap.AppFrame");
	jQuery.sap.require("ui5strap.AppComponent");
	
	ui5strap.AppComponent.extend("ui5strap.AppFrame", {
		"constructor" : function(app, options){
			ui5strap.AppComponent.call(this, app, options);

			this._targetStatus = {};

			this.vTargets = {};

			this.oTargets = {};

			this.initialized = false;
		}
	});

	var AppFrame = ui5strap.AppFrame,
		AppFrameProto = AppFrame.prototype;

	/*
	 * Must be explicitely called from outside
	 * @PostConstruct
	 * @Public
	 */
	AppFrameProto.init = function(){
		
		this.control = this._createControl();
		this._initHistory();

		//Check if old version
		if(this.getNavContainer || this._initControl){
			throw new Error("The method 'ui5strap.AppFram.prototype.getNavContainer' has been removed. Please override the method 'ui5strap.AppFram.prototype._createControl', and return your new NavContainer instance there.");
		}

	};

	AppFrameProto.getControl = function(){
		return this.control;
	};

	/*
	* @deprecated
	*/
	AppFrameProto.getConfig = function(){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.getConfig is deprecated and will be removed soon.");
		return this.app.config;
	};

	/*
	 * Creates the control that represents this AppFrame
	 * @Protected
	 */
	AppFrameProto._createControl = function(){
		//Init default NavContainer
		var frameConfig = this.options,
			navContainerOptions = {},
			navContainerModule = "ui5strap.NavContainerStandard";
		

		if('navContainerOptions' in frameConfig){
			navContainerOptions = frameConfig.navContainerOptions;
		}

		if('navContainer' in frameConfig){
			navContainerModule = frameConfig.navContainer;
		}

		jQuery.sap.require(navContainerModule);
		var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);
		if(!NavContainerConstructor){
			throw new Error('Invalid NavContainer: ' + navContainerModule);
		}
		return new NavContainerConstructor(navContainerOptions);
	};

	/*
	* Inits History for navigation handling in browsers.
	*/
	AppFrameProto._initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug('[FR] SHOW INITIAL CONTENT');

		var _this = this,
			initialViews = this.options.initialViews,
			callI = 0;

		var complete = function(){
			//jQuery.sap.log.debug(callI + '/' + initialViews.length);

			callI--;
			if(callI === 0){
				//jQuery.sap.log.debug('[FR] Initial frame content loaded. Executing callbacks...');

				if(!_this.initialized){
					_this.initialized = true;
				}

				callback && callback();
			}
		}

		if(!initialViews || initialViews.length === 0){
			callI = 1;
			complete();
			return;
		}

		callI = initialViews.length;

		for(var i = 0; i < initialViews.length; i++){
			var initialViewData = jQuery.extend({}, initialViews[i]);
			if(!_this.initialized){
				initialViewData.transition = 'no-transition';
			}
			this.gotoPage(initialViewData, complete);
		}

	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	*/
	AppFrameProto.getCurrentPage = function (target) {
		return this.control.targets[target];
	};

	/*
	* Returns whether the frame supports the specified target
	* @Public
	*/
	AppFrameProto.hasTarget = function(target) {
		return target in this.control.targets;
	}
	
	/*
	* Returns whether a target is busy
	* @Public
	*/
	AppFrameProto.isBusy = function(target){
		if(this._targetStatus[target]){
			return true;
		}

		return false;
	};

	/*
	 * Shows a page defined by given data
	 * @Public
	 */
	AppFrameProto.toPage = function (viewConfig, callback) {
		//TODO use default target of navcontainer?
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}

		var _this = this,
			target = viewConfig.target,
			oPage = this.app.createView(viewConfig);

		//Only add this page to a vTarget. Pages in vTargets are not seen by the user.
		if(viewConfig.vTarget){
			jQuery.sap.log.debug('[FR] VIRTUALLY NAVIGATE {' + target + '}');
			this.vTargets[target] = oPage;
		
			return;
		}

		//Set target busy
		jQuery.sap.log.debug(' + [FR] BUSY {' + target + '}');
		this._targetStatus[target] = true;

		//Trigger onUpdate events
		this.control.updateTarget(viewConfig.target, oPage, viewConfig.parameters);

		//Change NavContainer to page
		this.control.toPage(
			oPage, 
			target, 
			viewConfig.transition,
			function toPage_complete(){
				
				//Set target available
				delete _this._targetStatus[target];
				jQuery.sap.log.debug(' + [FR] AVAILABLE {' + target + "}");
				
				//Trigger callback
				callback && callback();
			
			}
		);
		
		return oPage;
	};

	/*
	* Get the viewConfig based on a definition object. Def object must contain "viewName" attribute!
	*/
	AppFrameProto.getViewConfig = function(viewDef){
		var viewConfig = this.app.config.getViewConfig(viewDef);

		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = this.control.defaultTarget;
		}

		//Override targets
		var target = viewConfig.target;
		if(target in this.oTargets){
			var overrideTarget = this.oTargets[target];
			delete this.oTargets[target];
			viewConfig = this.app.config.getViewConfig(overrideTarget);
		}

		return viewConfig;
	};

	AppFrameProto.validatePage = function(viewDef){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.validatePage is deprecated and will be removed soon! Use getViewConfig instead.");
		return this.getViewConfig(viewDef);
	};

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		return this.toPage(this.getViewConfig(viewDef), callback);
	};

}());