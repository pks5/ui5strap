/*
 * 
 * UI5Strap
 *
 * AppFrame
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
		this._initControl();
		this._initHistory();
	};

	/*
	 * Creates the control that represents this AppFrame
	 * @Protected
	 */
	AppFrameProto._initControl = function(){
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
		this.control = new NavContainerConstructor(navContainerOptions);
	};

	/*
	* Inits History for navigation handling in browsers.
	*/
	AppFrameProto._initHistory = function(){

	};

	/*
	* @deprecated
	*/
	AppFrameProto.getConfig = function(){
		return this.app.config;
	};
	
	/*
	* @deprecated
	*/
	AppFrameProto.getNavContainer = function(){
		return this.control;
	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug('[FR] Show initial frame content...');

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
				initialViewData.transition = 'none';
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
	* Clears a target, means setting page to null
	* @deprecated Use toPage with null instead
	*/
	AppFrameProto.clearTarget = function(target, callback) {
		this.control.toPage(
			null,
			target,
			'transition-slide',
			callback
		);
	};

	/*
	* Returns whether a target is busy
	* @Public
	* @deprecated
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
			this.vTargets[target] = oPage;
		
			return;
		}

		//Write history entry for back/forward navigation in browser / using javascript.
		if (viewConfig.writeHistory && this.app.config.data.app.history) {
			jQuery.sap.history.addHistory(target, viewConfig.viewData.def, viewConfig.bookmarkable, viewConfig.virtual);
		}

		//Set target busy
		jQuery.sap.log.debug('[FR][' + target + '] TARGET BUSY');
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
				jQuery.sap.log.debug('[FR][' + target + "] TARGET AVAILABLE");
				
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

	/*
	* @deprecated Use getViewConfig instead
	*/
	AppFrameProto.validatePage = AppFrameProto.getViewConfig; 

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		return this.toPage(this.getViewConfig(viewDef), callback);
	};

}());