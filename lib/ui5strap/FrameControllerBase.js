/*
 * 
 * UI5Strap
 *
 * Frame Controller Base
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
 */

(function(){

	jQuery.sap.declare("ui5strap.FrameControllerBase");
	
	sap.ui.base.Object.extend("ui5strap.FrameControllerBase");

	var FrameControllerBase = ui5strap.FrameControllerBase,
		FrameControllerBaseProto = FrameControllerBase.prototype;

	
	/*
	 * called by constructor
	 */
	FrameControllerBaseProto.init = function(frameOptions){
		this.options = frameOptions;

		//this._initHistory();
	};

	FrameControllerBaseProto.showInitialContent = function(){
		var initialViews = this.options.initialViews;

		for(var target in initialViews){
			var pageData = jQuery.extend({}, initialViews[target]);
			
			pageData.target = target;

			this.setPage(pageData);
		}
	};


	/*
	 * places this frame in dom
	 */
	FrameControllerBaseProto.placeAt = function(domId){
		return this.getNavContainer().placeAt(domId);
	};

	FrameControllerBaseProto.getNavContainer = function(){
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
	FrameControllerBaseProto.setPage = function (data) {

		var viewData = liberty.getViewer().getApp().getConfig().getViewData(data.viewName);
		
		if(null === viewData){
			viewData = {};
		}

		jQuery.extend(viewData, data);

		var page = _addPageToCache(this, viewData);
		
		this.getNavContainer().setPage(page, viewData.target, 'transition' in viewData ? viewData.transition : 'transition-slide');
		
		
		var menuIndex = -1;

		for(var i=0; i<this.options.menu.length; i++){
			if(viewData.viewName === this.options.menu[i].viewName){
				menuIndex = i;
				break;
			}
		}

		if(menuIndex !== -1){
			this.nav.setSelectedIndex(menuIndex);
		}
		else{
			this.nav.setSelectedItem(null);
		}
		

		/*
		// write browser history
		if (historyPath && data.writeHistory) {
			var bookmarkable = false;
			jQuery.sap.history.addHistory(historyPath, data, bookmarkable);
		}
		*/
	};

	

	/*
	
	FrameControllerBaseProto._registerNavHandlers = function(){
		var oBus = sap.ui.getCore().getEventBus();
		
		oBus.subscribe("nav", "to", jQuery.proxy(this._navTo, this));
		oBus.subscribe("nav", "back", jQuery.proxy(this._navBack, this));
	};

	FrameControllerBaseProto._initHistory = function () {

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