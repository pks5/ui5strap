/*
 * 
 * UI5Strap
 *
 * Frame Controller for the Liberty Platform
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *
 * ATTENTION: NEVER CHANGE THIS FILE!
 *
 */

(function(){

	jQuery.sap.declare("ui5strap.AppFrame");
	
	sap.ui.base.Object.extend("ui5strap.AppFrame");

	var AppFrame = ui5strap.AppFrame,
		AppFrameProto = AppFrame.prototype;

	/*
	*
	* STATIC FIELDS & METHODS
	*
	*/

	/*
	*
	* PRIVATE METHODS
	*
	*/

	/*
	* @Private
	*/
	var _createPrivateProperties = function(_this){
		/*
		* Configuration
		*/
		var _config = null;

		/*
		* @Public
		*/
		_this.setConfig = function(newConfig){
			_config = newConfig;
		};

		/*
		* @Public
		*/
		_this.getConfig = function(){
			return _config;
		};

		/*
		* The app that owns this frame
		*/
		var _owner = null;

		/*
		* @Public
		*/
		_this.setOwner = function(newOwner){
			_owner = newOwner;
		};

		/*
		* @Public
		*/
		_this.getOwner = function(){
			return _owner;
		};

		/*
		* @Public
		*/
		_this.getApp = function(){
			return _owner;
		};
	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/*
	 * Must be explicitely called from outside
	 * @PostConstruct
	 * @Public
	 */
	AppFrameProto.init = function(){
		_createPrivateProperties(this);
	
		this._pageCache = {};

		this._targetStatus = {};

		this.vTargets = {};
	};

	AppFrameProto.initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug('[FR] Show initial frame content...');

		var frameOptions = this.getConfig().getFrame();

		var initialViews = frameOptions.initialViews;

		var callI = initialViews.length;

		var complete = function(){
			//jQuery.sap.log.debug(callI + '/' + initialViews.length);

			callI--;
			if(callI === 0){
				callback && callback();
			}
		}

		for(var i = 0; i < initialViews.length; i++){
			this.gotoPage(initialViews[i], complete);
		}
	};


	/*
	 * Places the frame's NavContainer in the dom
	 * @Public
	 */
	AppFrameProto.placeAt = function(domId){
		return this.getNavContainer().placeAt(domId);
	};

	/*
	* Override this method as a SINGLETON
	* @Public
	*/
	AppFrameProto.getNavContainer = function(){
		if(!this._navContainer){
			var frameConfig = this.getConfig().getFrame(),
				navContainerOptions = {};
			

			if('navContainerOptions' in frameConfig){
				navContainerOptions = frameConfig.navContainerOptions;
			}

			//TODO pass navContainer options from frame config
			jQuery.sap.require("ui5strap.NavContainerStandard");
			this._navContainer = new ui5strap.NavContainerStandard(navContainerOptions);
		}

		return this._navContainer;
	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	*/
	AppFrameProto.getCurrentPage = function (target) {
		return this.getNavContainer().getAggregation(target);
	};

	/*
	* Returns whether the frame supports the specified target
	* @Public
	*/
	AppFrameProto.hasTarget = function(target) {
		return target in this.getNavContainer().getAggregations();
	}
	
	AppFrameProto.clearTarget = function(target, callback) {
		this.getNavContainer().toPage(
			null,
			target,
			'transition-slide',
			callback
		);
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
		var viewConfig = this.getConfig().getViewData(viewDef.viewName),
			viewOptions = {};
		
		if(null === viewConfig){
			viewConfig = {};
		}

		jQuery.extend(viewOptions, viewConfig, viewDef);

		if(!viewOptions.viewName || !viewOptions.target || !viewOptions.type){
			throw new Error('Page data must contain at least "viewName", "type", and "target" attributes.');
		}

		var viewConstructor = {};

		jQuery.extend(viewConstructor, viewOptions);

		if(!("viewData" in viewConstructor)){
			viewConstructor.viewData = {};
		}

		viewConstructor.viewData.app = this.getOwner();
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

			viewConstructor.id = this.getApp().createControlId(pageId);
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
			target = viewConstructor.target;
		
		var oPage = this.createPage(viewConstructor);

		if(viewConstructor.vTarget){
			this.vTargets[target] = oPage;
		
			return;
		}

		//Set target busy
		jQuery.sap.log.debug('[FR][' + target + '] now busy');
		this._targetStatus[target] = true;

		//Change NavContainer to page
		this.getNavContainer().toPage(
			oPage, 
			target, 
			viewConstructor.transition,
			function(){
				//Set target available
				delete _this._targetStatus[target];
				jQuery.sap.log.debug('[FR][' + target + "] available");
				
				//Trigger callback
				callback && callback();
			}
		);
		
	};

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		this.toPage(this.validatePage(viewDef), callback);
	};

}());