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
				this.options.container = "ui5strap-body";
			}

			if(!this.options.app){
				this.options.app = "./app/app.json";
			}

			this.overlay = null;
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
		var _this = this,
			$overlay = jQuery('#ui5strap-overlay');
		
		this.overlay = {
			$domElement : $overlay,
			orgClass : $overlay.attr('class'),
			control : new ui5strap.NavContainer(),
			transitionShow : new ui5strap.Transition("transition-fade", null, $overlay, "transition-show-overlay"),
			transitionHide : new ui5strap.Transition("transition-fade", $overlay, null, "transition-hide-overlay")
		}

		ui5strap.Layer.register('ui5strap-overlay');

		this.overlay.control.placeAt('ui5strap-overlay-content');

		jQuery('#ui5strap-overlay-backdrop').on('tap', function anon_overlayCloseTap(){
			_this.hideOverlay();
		});
	};

	/*
	* Returns whether the overlay layer is visible
	* @public
	*/
	ViewerBaseProto.isOverlayVisible = function(){
		return this.overlay.visible;
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	ViewerBaseProto.showOverlay = function(viewDataOrControl, callback, overlayType){
		this.overlay.visible = true;
		this.overlay.$domElement.addClass('ui5strap-overlay-' + (overlayType || 'default'));

		var _this = this,
			overlayControl = this.overlay.control,
			transition = this.overlay.transitionShow;
		
		//requestAnimationFrame(function RAF1(){
		//	transition.prepare();
		//	requestAnimationFrame(function RAF2(){ 
		//		transition.execute(null, function execute_complete(){
			ui5strap.Layer.setVisible('ui5strap-overlay', true, function(){
					if(viewDataOrControl instanceof sap.ui.core.Control){
						//Control is directly injected into the frame
						overlayControl.toPage(viewDataOrControl, "content", 'transition-slide');
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

								overlayControl.toPage(viewApp.createView(viewConfig), 'content', 'transition-slide');
								
								viewApp.isVisibleInOverlay = true;

								viewApp.onShowOverlay({ 
									view : viewDataOrControl, 
									viewConfig : viewConfig
								});

							});
						}
						else{
							overlayControl.toPage(viewDataOrControl, 'content', 'transition-slide');
						}
					}
				});
		//	});
		//});


		
	};

	/*
	* Hides the overlay layer
	* @public
	*/
	ViewerBaseProto.hideOverlay = function(callback){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		this.overlay.visible = false;

		var _this = this;

		var overlayControl = this.overlay.control;
		var page = overlayControl.targets["content"];

		
		var transition = this.overlay.transitionHide;
		var $overlay = this.overlay.$domElement;
		var overlay = this.overlay;

		overlayControl.toPage(null, 'content', 'transition-slide', function toPage_complete(){
			
			//requestAnimationFrame(function RAF1(){
			//	transition.prepare();
			//	requestAnimationFrame(function RAF2(){
			//		transition.execute(
			//			function execute_complete(){
			
							$overlay.attr('class', overlay.orgClass);
			ui5strap.Layer.setVisible('ui5strap-overlay', false, function(){
							if(page instanceof sap.ui.core.mvc.View){
								var pageViewData = page.getViewData();
								if("app" in pageViewData){
									pageViewData.app.isVisibleInOverlay = false;
									pageViewData.app.onHideOverlay(); 
									_this.removeStyle(pageViewData.app);
								}
							}

							callback && callback();
						//}, 
						//null
					//);
				//});
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
