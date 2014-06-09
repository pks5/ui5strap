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
	};

	/*
	 * Creates a view by given date and adds it to the internal cache.
	 * If the page has not explicit id set, the view is not cached.
	 * @Private
	 */
	var _addPageToCache = function(_this, pageProperties){
		if(!("id" in pageProperties)){
			return new sap.ui.view(pageProperties);
		}

		var pageId = pageProperties.id;
		
		if(_this._pageCache[pageId]){
			return _this._pageCache[pageId];
		}

		var page = new sap.ui.view(pageProperties);
			
		_this._pageCache[pageId] = page;
		
		return page;
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
	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(){
		jQuery.sap.log.debug('Show initial frame content...');

		var frameOptions = this.getConfig().getFrame();

		var initialViews = frameOptions.initialViews;

		for(var i = 0; i < initialViews.length; i++){
			this.gotoPage(initialViews[i]);
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
				frameOptions = {};

			//if('options' in )
			//TODO pass navContainer options from frame config
			jQuery.sap.require("ui5strap.NavContainerStandard");
			this._navContainer = new ui5strap.NavContainerStandard( { options : 'sidebar' });
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

	AppFrameProto.validatePage = function(data){
		var viewData = this.getConfig().getViewData(data.viewName);
		
		if(null === viewData){
			viewData = {};
		}

		jQuery.extend(viewData, data);

		if(!viewData.viewName || !viewData.target || !viewData.type){
			throw new Error('Page data must contain at least "viewName", "type", and "target" attributes.');
		}

		return viewData;
	};

	/*
	 * Shows a page defined by given data
	 * @Protected
	 */
	AppFrameProto.toPage = function (viewData, callback) {
		var _this = this;
		
		this._targetStatus[viewData.target] = true;

		if(!("viewData" in viewData)){
			viewData.viewData = {};
		}

		viewData.viewData.app = this.getOwner();
		viewData.viewData.options = viewData;
		viewData.viewData.config = viewData; 

		this.getNavContainer().toPage(
			_addPageToCache(this, viewData), 
			viewData.target, 
			viewData.transition,
			function(){
				delete _this._targetStatus[viewData.target];
				jQuery.sap.log.debug('Finished transitions on target ' + viewData.target);
				
				callback && callback();
			}
		);
		
	};

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (data, callback) {
		var viewData = this.validatePage(data);
		this.toPage(viewData, callback);
	};

}());