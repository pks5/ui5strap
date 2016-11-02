/**
 * 
 * Ui5OS
 * 
 * ui5os.controls.HomeScreen
 * 
 * Author: Jan Philipp Koeller
 * 
 * Copyright (c) 2013 Philipp Knoeller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

sap.ui.define(['ui5strap/ControlBase'], function(ControlBase){
	var HomeScreen = ControlBase.extend("com.ui5strap.apps.home.controls.HomeScreen", {
		metadata : {

			defaultAggregation : "icons",
			
			library : "ui5os",
			
			properties : { 
				"iconAnimation" : {
					type : "string", 
					group : "Misc", 
					defaultValue : "explode"
				}
			},
			
			events : {
				
			},
			
			aggregations : {
				"icons" : {
					type : "com.ui5strap.apps.home.controls.HomeScreenIcon", 
					singularName: "icons", 
					multiple : true
				}
			}

		}
	}),
	HomeScreenProto = HomeScreen.prototype;

	/**
	 * Returns the style class prefix for this control.
	 * @override
	 */
	HomeScreenProto._getStyleClassPrefix = function(){
		return "ui5strapHomeScreen";
	};
	
	/**
	 * Initializer
	 */
	HomeScreenProto.init = function(){
		this._minColumnCount = 4;
		this._maxColumnCount = 8;

		this._minTileWidth = 80;
		this._orgTileHeight = 88; //Icon Tile Height (60 icon, 28 title)
		this._iconWidth = 60;
		this._maxTileWidth = 120;
		
		this._$homeScreen = null;
	};
	
	

	/**
	 * @override
	 */
	HomeScreenProto.ontouchstart = function(oEvent){
		this._timeTouchStart = Date.now();
		
		this._holdTimer = window.setTimeout(jQuery.proxy(function anon_holdTimer(){
			this._holdTimer = null;
			this.setShaking(true);
		}, this), 2000);
	};

	/**
	 * @override
	 */
	HomeScreenProto.ontouchend = function(){
		if(null === this._timeTouchStart){
			return;
		}

		window.clearTimeout(this._holdTimer);
		this._holdTimer = null;
		
		var touchDuration = Date.now() - this._timeTouchStart;

		//this.setShaking(false);

		this._timeTouchStart = null; 

		if(500 > touchDuration){
			this.setShaking(false);
		}
	};
	
	/**
	 * @private
	 */
	var _updateGrid = function(_this){
		var containerWidth = _this._$homeScreen.width(),
			containerHeight = _this._$homeScreen.height();
		
		if(0 === containerWidth || 100 === containerWidth){
			throw new Error('Container width is not available!');
		}
		
		jQuery.sap.log.info("Container Width is {}. Now updating grid.", containerWidth);
		
		var tilesPerRow = Math.floor(containerWidth / _this._minTileWidth);

		if(tilesPerRow > _this._maxColumnCount){
			tilesPerRow = _this._maxColumnCount;
		}

		if(tilesPerRow < _this._minColumnCount){
			tilesPerRow = _this._minColumnCount;
		}

		var newWidth = Math.floor(containerWidth / tilesPerRow);
		
		if(newWidth > _this._maxTileWidth){
			newWidth = _this._maxTileWidth;
		}
			
		var newHeight = _this._orgTileHeight + (newWidth - _this._iconWidth) / 2;
		
		_this.$().find('.ui5strapHomeScreenIcon').each(jQuery.proxy(function(i, o){ 
			var css = { 
				"width" : newWidth + 'px',
				"height" : newHeight + "px",
				"left" : ((i % tilesPerRow) * newWidth ) + 'px',
				"top" : (Math.floor(i / tilesPerRow) * newHeight) + 'px'
			};
			
			jQuery(o).css(css);
		}, _this));
	};
	
	/**
	 * Updates the Home Screen Grid
	 */
	HomeScreenProto.updateGrid = function(callback){
		jQuery.sap.log.info("Updating HomeScreen Grid...");
		
		var _this = this;
		this._waitForCss(
			function() {
				_updateGrid(_this);
				
				callback && callback();
			},
			30000
		);
	};
	
	/**
	 * Shows the Icons
	 */
	HomeScreenProto.showIcons = function(){
		if(this._transitionTriggered){
			jQuery.sap.log.debug("Transition already triggered.");
			return;
		}
		
		jQuery.sap.log.debug("Showing icons..");
		if(!this.getDomRef()){
			this._showIconsAfterRendering = true;
		}
		else{
			this._showIconsAfterRendering = false;
			this._transitionTriggered = true;
			this._$homeScreen.addClass('ui5strapHomeScreen-flag-TransitionStart');
		}
	};

	/**
	 * 
	 */
	HomeScreenProto.setShaking = function(shaking){
		if(shaking){
			this._$homeScreen.addClass('ui5strapHomeScreen-flag-EditMode');
		}
		else{
			this._$homeScreen.removeClass('ui5strapHomeScreen-flag-EditMode');
		}
		this._isShaking = shaking;
	};
	
	/**
	 * @override
	 */
	HomeScreenProto.onBeforeRendering = function(){
		this._$homeScreen = null;
		window.clearTimeout(this._afterRenderingTimeout);
	}; 

	/**
	 * @override
	 */
	HomeScreenProto.onAfterRendering = function(){
		jQuery.sap.log.info("HomeScreen rendered.");
		
		this._$homeScreen = this.$().find('.ui5strapHomeScreen-inner');

		var _this = this;
		this.updateGrid(
			function(){
				if(_this._showIconsAfterRendering){
					_this._showIconsAfterRendering = false;
					
					window.setTimeout(function(){
						_this.showIcons();
					}, 50);
				}
			}
		);
			
	};

	return HomeScreen;
});