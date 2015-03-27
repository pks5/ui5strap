/*
 * 
 * UI5Strap
 *
 * ui5strap.ViewerBase
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
	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.ViewerBase');

	jQuerySap.require('ui5strap.library');

	sap.ui.base.Object.extend('ui5strap.ViewerBase', {
		"constructor" : function(options){
			sap.ui.base.Object.apply(this);

			this.options = options || {};

			//Device Log Level
			if(!this.options.logLevel){
				this.options.logLevel = 0;
			}

			//Error to Browser
			if(!this.options.errorToBrowser){
				this.options.errorToBrowser = false;
			}

			if(!this.options.pathToServletRoot){
				this.options.pathToServletRoot = '.';
			}

			if(!this.options.pathToThemeRoot){
				this.options.pathToThemeRoot = './theme';
			}

			if(!this.options.container){
				//Default container dom id
				this.options.container = "ui5strap-body";
			}

			if(!this.options.overlay){
				//Default overlay dom id
				this.options.overlay = "ui5strap-overlay";
			}

			if(!this.options.app){
				//Default app config location
				this.options.app = "./app/app.json";
			}
		}
	});

	var ViewerBaseProto = ui5strap.ViewerBase.prototype;

	ViewerBaseProto.init = function(){
		ui5strap.Layer.register('ui5strap-loader');
  		ui5strap.Layer.register('ui5strap-splash');
  
		this._initOverlay();
	};

	ViewerBaseProto.start = function(callback){
		throw new Error("Please inherit ui5strap.ViewerBase.prototype.start in your Viewer instance.");
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Global Overlay ---------------------------------
	* ----------------------------------------------------------------------
	*/

	/*
	* Inititalzes the overlay
	*/
	ViewerBaseProto._initOverlay = function(){
		var _this = this;
		
		ui5strap.Layer.register(this.options.overlay);

		this.overlayControl = new ui5strap.NavContainer();
		this.overlayControl.placeAt(this.options.overlay + '-content');

		jQuery('#' + this.options.overlay + '-backdrop').on('tap', function onTap(event){
			_this.hideOverlay();
		});
	};

	/*
	* Returns whether the overlay layer is visible
	* @public
	*/
	ViewerBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.options.overlay);
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	ViewerBaseProto.showOverlay = function(viewDataOrControl, callback){
		var _this = this,
			overlayControl = this.overlayControl;
		
		ui5strap.Layer.setVisible(this.options.overlay, true, function(){
			if(viewDataOrControl instanceof sap.ui.core.Control){
				//Control is directly injected into the frame
				overlayControl.toPage(viewDataOrControl, "content", 'transition-slide', callback);
			}
			else{ 
				//viewDataOrControl is a data object
				if("appId" in viewDataOrControl){
					var viewApp = _this.getLoadedSapplication(viewDataOrControl.appId);
					if(null === viewApp){
						throw new Error('Invalid app: ' + viewDataOrControl.appId);
					}
					//View from a app
					viewApp.includeStyle(function includeStyle_complete(){
						viewConfig = viewApp.config.getViewConfig(viewDataOrControl); 

						overlayControl.toPage(viewApp.createView(viewConfig), 'content', 'transition-slide', function(){
							viewApp.isVisibleInOverlay = true;

							viewApp.onShowOverlay({ 
								view : viewDataOrControl, 
								viewConfig : viewConfig
							});
							
							callback && callback();	
						});
					});
				}
				else{
					overlayControl.toPage(viewDataOrControl, 'content', 'transition-slide', callback);
				}
			}
		});
	};

	/*
	* Hides the overlay layer
	* @public
	*/
	ViewerBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			page = overlayControl.targets["content"];
		
		overlayControl.toPage(null, 'content', transitionName || 'transition-slide', function toPage_complete(){
			ui5strap.Layer.setVisible(_this.options.overlay, false, function(){
				if(page instanceof sap.ui.core.mvc.View){
					var pageViewData = page.getViewData();
					if("app" in pageViewData){
						pageViewData.app.isVisibleInOverlay = false;
						pageViewData.app.onHideOverlay(); 
						_this.removeStyle(pageViewData.app);
					}
				}

				callback && callback();
			});
		});	
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Browser Flow  ----------------------------------
	* ----------------------------------------------------------------------
	*/

	/*
	*	Changes the browser URL to an (external) url
	* @param url The URL to browse to
	*/
	ViewerBaseProto.exitViewer =  function(url){
		window.location.href = url; 
	};	

	
}());
