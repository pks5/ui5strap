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

			this._pageCache = {};

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
	 * Called by init
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

	AppFrameProto._initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug('[FR] Show initial frame content...');

		var _this = this,
			frameOptions = this.options,
			initialViews = frameOptions.initialViews,
			callI = initialViews.length;

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
	
	AppFrameProto.clearTarget = function(target, callback) {
		this.control.toPage(
			null,
			target,
			'transition-slide',
			callback
		);
	};

	AppFrameProto.updatePage = function(page, parameters){
		var controller = page.getController();
		if(controller && "onUpdate" in controller){
			jQuery.sap.log.debug('[FR] Trigger event "update" for page "' + page.getId() + '"');
		
			controller.onUpdate({ parameters : parameters });
		}
	};

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

	AppFrameProto.validatePage = function(viewDef){
		var viewConfig = this.app.config.getViewData(viewDef.viewName),
			viewOptions = {};
		
		if(null === viewConfig){
			viewConfig = {};
		}

		jQuery.extend(viewOptions, viewConfig, viewDef);

		if(!viewOptions.viewName || !viewOptions.target || !viewOptions.type){
			throw new Error('Page data must contain at least "viewName", "type", and "target" attributes.');
		}

		if(viewOptions.target in this.oTargets){
			var overrideTarget = this.oTargets[viewOptions.target];
			delete this.oTargets[viewOptions.target];
			return this.validatePage(overrideTarget);
			
		}

		var viewConstructor = {};

		jQuery.extend(viewConstructor, viewOptions);

		if(!("viewData" in viewConstructor)){
			viewConstructor.viewData = {};
		}

		viewConstructor.viewData.app = this.app;
		viewConstructor.viewData.options = viewOptions;
		viewConstructor.viewData.config = viewConfig;
		viewConstructor.viewData.def = viewDef;

		return viewConstructor;
	};

	/*
	 * Create a new page
	 */
	AppFrameProto.createPage = function(viewConstructor){
		//id specified
		if("id" in viewConstructor){
			var pageId = viewConstructor.id;
			var cachedPage = this._pageCache[pageId];

			if(cachedPage){

				cachedPage.getViewData().def = viewConstructor.viewData.def;

				return cachedPage;
			}

			viewConstructor.id = this.app.createControlId(pageId);
		}

		var page = new sap.ui.view(viewConstructor);

		if(viewConstructor.styleClass){
			page.addStyleClass(viewConstructor.styleClass);
		}
			
		this._pageCache[pageId] = page;
		
		return page;
	};

	/*
	 * Shows a page defined by given data
	 * @Public
	 */
	AppFrameProto.toPage = function (viewConstructor, callback) {
		var _this = this,
			target = viewConstructor.target,
			oPage = this.createPage(viewConstructor);

		if(viewConstructor.vTarget){
			this.vTargets[target] = oPage;
		
			return;
		}

		if (viewConstructor.writeHistory && this.app.config.data.app.history) {
			jQuery.sap.history.addHistory(target, viewConstructor.viewData.def, viewConstructor.bookmarkable, viewConstructor.virtual);
		}

		//Set target busy
		jQuery.sap.log.debug('[FR][' + target + '] TARGET BUSY');
		this._targetStatus[target] = true;

		this.updatePage(oPage, viewConstructor.parameters);

		//Change NavContainer to page
		this.control.toPage(
			oPage, 
			target, 
			viewConstructor.transition,
			function(){
				//Set target available
				delete _this._targetStatus[target];
				jQuery.sap.log.debug('[FR][' + target + "] TARGET AVAILABLE");
				
				//Trigger callback
				callback && callback();
			}
		);
		
	};

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		var viewData = this.validatePage(viewDef);
		
		this.toPage(viewData, callback);
	};

}());