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


	_createPrivateProperties = function(_this){
		var config = null;

		_this.setConfig = function(newConfig){
			config = newConfig;
		};

		_this.getConfig = function(){
			return config;
		};
	};


	/*
	 * called by constructor
	 */
	LibertyFrameProto.init = function(){
		_createPrivateProperties(this);
	};

	LibertyFrameProto.showInitialContent = function(){
		var frameOptions = this.getConfig().getFrame();

		var initialViews = frameOptions.initialViews;

		for(var i = 0; i < initialViews.length; i++){
			this.setPage(initialViews[i]);
		}
	};


	/*
	 * places this frame in dom
	 */
	LibertyFrameProto.placeAt = function(domId){
		return this.getNavContainer().placeAt(domId);
	};

	LibertyFrameProto.getNavContainer = function(){
		alert('Please override getNavContainer');
	};

	/*
	 * adds a page to the internal cache
	 */
	var _addPageToCache = function(frame, pageProperties){
		if(!("id" in pageProperties)){
			return new sap.ui.view(pageProperties);
		}

		var pageId = pageProperties.id;
		
		if(frame._pages[pageId]){
			return frame._pages[pageId];
		}

		var page = new sap.ui.view(pageProperties);
			
		this._pages[pageId] = page;
		
		return page;
	};

	/*
	 * shows a page defined by given data
	 */
	LibertyFrameProto.setPage = function (data) {

		var viewData = this.getConfig().getViewData(data.viewName);
		
		if(null === viewData){
			viewData = {};
		}

		jQuery.extend(viewData, data);

		var page = _addPageToCache(this, viewData);
		
		this.getNavContainer().setPage(page, viewData.target, 'transition' in viewData ? viewData.transition : 'transition-slide');
		
		/*
		// write browser history
		if (historyPath && data.writeHistory) {
			var bookmarkable = false;
			jQuery.sap.history.addHistory(historyPath, data, bookmarkable);
		}
		*/
	};

	

	/*
	
	LibertyFrameProto._registerNavHandlers = function(){
		var oBus = sap.ui.getCore().getEventBus();
		
		oBus.subscribe("nav", "to", jQuery.proxy(this._navTo, this));
		oBus.subscribe("nav", "back", jQuery.proxy(this._navBack, this));
	};

	LibertyFrameProto._initHistory = function () {

		_self = this;
		jQuery.sap.require("jquery.sap.history");
		jQuery.sap.history({
			routes : [
				{
					path : HISTORY_PATH_MASTER,
					handler : function (params, navType) {
						
						if (navType === jQuery.sap.history.NavType.Back) {
								
							}
						params.writeHistory = false;
						_self._navTo("nav", "to", params);
					}
				},
				{
					path : HISTORY_PATH_DETAIL,
					handler : function (params, navType) {
						
						if (navType === jQuery.sap.history.NavType.Back) {
								
							}
						params.writeHistory = false;
						_self._navTo("nav", "to", params);
					}
				}
			],
			defaultHandler : function (navType) {

				if (navType === jQuery.sap.history.NavType.Back) {
					
				}
				console.log("route");
			}
		});
	};

	*/
}());