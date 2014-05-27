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

	jQuery.sap.declare("ui5strap.LibertyFrame");
	
	sap.ui.base.Object.extend("ui5strap.LibertyFrame");

	var LibertyFrame = ui5strap.LibertyFrame,
		LibertyFrameProto = LibertyFrame.prototype;

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
	LibertyFrameProto.init = function(){
		_createPrivateProperties(this);
	
		this._pageCache = {};

		this._targetStatus = {};
	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	LibertyFrameProto.showInitialContent = function(){
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
	LibertyFrameProto.placeAt = function(domId){
		return this.getNavContainer().placeAt(domId);
	};

	/*
	* Override this method as a SINGLETON
	* @Public
	*/
	LibertyFrameProto.getNavContainer = function(){
		alert('Please override the method "ui5strap.LibertyFrame.getNavContainer" as SINGLETON in your NavContainer!');
	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	*/
	LibertyFrameProto.getCurrentPage = function (target) {
		return this.getNavContainer().getAggregation(target);
	};

	LibertyFrameProto.isBusy = function(target){
		if(this._targetStatus[target]){
			return true;
		}

		return false;
	};

	LibertyFrameProto.validatePage = function(data){
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
	LibertyFrameProto.toPage = function (viewData, callback) {
		var _this = this;
		
		this._targetStatus[viewData.target] = true;

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
	LibertyFrameProto.gotoPage = function (data, callback) {
		var viewData = this.validatePage(data);
		this.toPage(viewData, callback);
	};

}());