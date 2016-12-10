/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.ex.PickerWheel
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui
		.define(
				[ "./library", "pks/ui5strap/core/library", "pks/ui5strap/core/ControlBase", "pks/ui5strap/core/Utils" ],
				function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, Utils) {
					"use strict";
					
					/**
					 * Constructor for a new PickerWheel instance.
					 * 
					 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
					 * @param {object} [mSettings] Initial settings for the new control
					 * 
					 * @class
					 * Control for creating picker wheels.
					 * @extends pks.ui5strap.core.ControlBase
					 * 
					 * @author Jan Philipp Knoeller
					 * @version 0.11.6
					 * 
					 * @constructor
					 * @public
					 * @alias ui5strap.PickerWheel
					 * 
					 */
					var PickerWheel = ControlBase.extend(
							"ui5strap.PickerWheel", {
								metadata : {

									library : "ui5strap",
									
									properties : {
										selectedIndex : {
											type : 'int',
											defaultValue : 0
										},
										
										enabled : {
											type : 'boolean',
											defaultValue : true
										},
										
										active : {
											type : 'boolean',
											defaultValue : false
										},
										
										vertical : {
											type : "boolean",
											defaultValue : false
										},
										
										mode : {
											type : "ui5strap.PickerWheelMode",
											defaultValue : sap.ui.Device.browser.msie ? ui5strapBs3Lib.PickerWheelMode.Mode2D : ui5strapBs3Lib.PickerWheelMode.Mode3D
										}
										
										
									},
									
									aggregations : {
										"panels" : {
											type : "sap.ui.core.Control",
											singularName : "panel"
										}
									},
									
									defaultAggregation : "panels",
									
									events : {
										"selectionChange" : {}
									}

								}
							}), PickerWheelProto = PickerWheel.prototype;

					//TODO vendor prefix detection
					var _transformProperty = 'transform';

					var _transformNames = {
							'transform' : 'transform',
							'WebkitTransform' : 'webkitTransform',
							'MozTransform' : 'MozTransform',
							'OTransform' : 'OTransform'
						}, elem = document.createElement('div');

						for ( var t in _transformNames) {
							if (typeof elem.style[t] !== 'undefined') {
								_transformProperty = _transformNames[t];
								break;
							}
						}	
						
					/*
					 * Wheel3D
					 */
						
					var _getRotationFromIndex = function(_wheel, newIndex){
						if(isNaN(newIndex)){
							jQuery.sap.log.error("Invalid index!");
							return _wheel.rotation;
						}
						
						var oldRotation = _wheel.rotation,
							newRotation = -newIndex * _wheel.theta,
							dif = (newRotation - oldRotation) % 360,
							difAlt = dif > 0 ? dif - 360 : dif + 360,
									targetAdd = Math.abs(dif) > Math
										.abs(difAlt) ? difAlt : dif;
									
							return oldRotation + targetAdd;
					};	
						
					var Wheel3D = function(el) {
						this.element = el;
						
						this.theta = 0;
						this.rotation = 0;
						
						this.panelCount = 0;
					};

					Wheel3D.prototype.modify = function(isVertical, newPanelCount, newPanelSize) {
						this.panelCount = newPanelCount;
						this.theta = 360 / this.panelCount;
						this.panelSize = newPanelSize;
						
						
						this.rotateFn = isVertical ? 'rotateX' : 'rotateY';
						
						this.radius = Math.round((this.panelSize / 2)
								/ Math.tan(Math.PI / this.panelCount));

						var panel, angle, i;
						for (i = 0; i < this.panelCount; i++) {
							panel = this.element.children[i];
							angle = this.theta * i;
							panel.style.opacity = 1;
							panel.style[_transformProperty] = this.rotateFn + '('
									+ angle + 'deg) translateZ(' + this.radius
									+ 'px)';
						}

						this.rotate(Math.round(this.rotation / this.theta)
								* this.theta);
					};

					Wheel3D.prototype.rotate = function(newRotation) {
						this.rotation = newRotation;
						this.element.style[_transformProperty] = 'translateZ(-'
								+ this.radius + 'px) ' + this.rotateFn + '('
								+ newRotation + 'deg)';
					};
					
					Wheel3D.prototype.toIndex = function(newIndex){
						this.rotate(_getRotationFromIndex(this, newIndex));
					};

					
					/*
					 * Carousel 2D
					 */
					
					var Wheel2D = function(el) {
						this.element = el;
						
						this.theta = 0;
						this.rotation = 0;
						
						this.panelCount = 0;
					};

					Wheel2D.prototype.modify = function(isVertical, newPanelCount, newPanelSize) {
						this.panelCount = newPanelCount;
						this.panelSize = newPanelSize;
						this.theta = 360 / this.panelCount;
						
						this.isVertical = isVertical;
						
						
						this.radius = Math.round((this.panelSize / 2)
								/ Math.tan(Math.PI / this.panelCount));
						
						this.rotateFn = isVertical ? 'translateY' : 'translateX';
						
						this.rotate(Math.round(this.rotation / this.theta)
								* this.theta);
					};

					Wheel2D.prototype.rotate = function(newRotation) {
						this.rotation = newRotation;
						
						var isVertical = this.isVertical,
							radius = this.radius,
							theta = this.theta,
							panels = this.element.children,
							panelCount = this.panelCount,
							rotateFn = this.rotateFn,
							transProperty = _transformProperty,
							i, panel, ang, vis, cos, panelStyle;
						
						for (i = 0; i < panelCount; i++) {
							panelStyle = panels[i].style;
							
							ang = (theta * i + 90 + newRotation)  / 180;
							
							vis = (ang < 0 ? Math.floor(ang) % 2 === 0 : Math.ceil(ang) % 2 === 1);
							
							panelStyle.visibility =  vis ? 'visible' : 'hidden';
							
							if(vis){
								cos = Math.cos(ang * Math.PI) * (isVertical ? 1 : -1);
								
								panelStyle[transProperty] = rotateFn + "("
								+ ( cos * radius) + "px) scale(" + (1 - Math.abs(cos) * 0.33333) + ")";
							}
						}
					};
					
					Wheel2D.prototype.toIndex = function(newIndex){
						this.rotate(_getRotationFromIndex(this, newIndex));
					};
					
					/*
					 * Configuration
					 */
					
					//Milliseconds to recognize a tap
					PickerWheel.TAP_LIMIT = 200;

					//Milliseconds to recognize an acceleration
					PickerWheel.RELEASE_LIMIT = 75;
					
					//Steps to be used to calculate acceleration
					PickerWheel.TIME_STEPS = 5;
					
					//Minimum movement in pixels to trigger acceleration
					PickerWheel.MIN_PIXEL_ROTATION = 3;
					
					//50 Frames per second
					PickerWheel.TIME_RESOLUTION = 20;
					
					//Threshold for panel selection relative to panel size
					PickerWheel.THRESHOLD = 0.5;
					
					//Deceleration of the wheel
					PickerWheel.DECELERATION = 0.96;
					
					//Wheel stops when reaching this speed
					PickerWheel.STOP_SPEED = 0.01;
					
					//Frames to use when tapping the wheel (slower is faster)
					PickerWheel.TARGET_FRAMES_TAP = 20;
					
					//Frames to use when the wheel is stopping (slower is faster)
					PickerWheel.TARGET_FRAMES_STOP = 15;

					/**
					 * Initializes the PickerWheel control.
					 */
					PickerWheelProto.init = function() {
						this._$currentSelectedPanel = null;
						this._targetFrames = PickerWheel.TARGET_FRAMES_TAP;
						
						this._timer = null;
					};
					
					/**
					 * Called before destruction.
					 */
					PickerWheelProto.exit = function() {
						this._$currentSelectedPanel = null;
						
						this._timer && window.clearInterval(this._timer);
						this._timer = null;
						
						this._touchStartTime = null;
						
						this._rotations = null;
						this._times = null;
						
						this._wheel = null;
					};
					
					PickerWheelProto._getStyleClassPrefix = function(){
						return "ui5strapPickerWheel";
					};
					
					/**
					 * @override
					 */
					PickerWheelProto._getStyleClassRoot = function(){
						var styleClass = " " 
					    		+ (this.getVertical() ? 'ui5strapPickerWheel-flag-Vertical' : 'ui5strapPickerWheel-flag-Horizontal');
					    
						styleClass += " ui5strapPickerWheel-mode-" + this.getMode();
						
						
					    if(!this.getEnabled()){ 
					    	styleClass += ' disabled';
					    }
					    else if(this.getActive()){ 
					    	styleClass += ' active';
					    }
					    
					    return styleClass;
					};
					
					/*
					 * START after Rendering
					 */
					
					PickerWheelProto._isCssReady = function(oDomRef){
						var $oDomRef = jQuery(oDomRef);
						return this.getVertical() 
						? -1 !== Utils.getComputedStyle(oDomRef, "height").indexOf("px") && $oDomRef.width() > 0
						: -1 !== Utils.getComputedStyle(oDomRef, "width").indexOf("px") && $oDomRef.height() > 0;
					};

					/**
					 * @override
					 */
					PickerWheelProto.onAfterRendering = function() {
						var _this = this,
							mode = this.getMode();
						
						this._waitForCss(
							function() {
								_this.$().find('.ui5strapPickerWheel-inner')
										.removeClass('ui5strap-hidden');
	
								if(_this.getPanels().length == 0){
									return;
								}
								
								_this._$wheelContainer = _this.$().find('.ui5strapPickerWheel-wheel');
								
								if(mode === ui5strapBs3Lib.PickerWheelMode.Mode3D){
									_this._wheel = new Wheel3D(_this._$wheelContainer[0]);
								}
								else if(mode === ui5strapBs3Lib.PickerWheelMode.Mode2D){
									_this._wheel = new Wheel2D(_this._$wheelContainer[0]);
								}
								
								_this.refresh();
							}
						);

					};
					
					/**
					 * 
					 */
					PickerWheelProto.refresh = function() {
						jQuery.sap.log.debug('Refreshing picker width...');
						
						var isVertical = this.getVertical();
						
						this._segmentWidth = isVertical ? this.$().find(
						'.ui5strapPickerWheel-inner').height() : this.$().find(
								'.ui5strapPickerWheel-inner').width();

						this._wheel.modify(isVertical, this.getPanels().length, this._segmentWidth);

						if(0 !== this.getSelectedIndex()){
							this._wheel.toIndex(this.getSelectedIndex());
						}
						
						//Highlight selected panel
						this._setSelectedPanelActive();
					};
					
					/*
					 * END after Rendering
					 */

					/*
					 * START Touch handling
					 */
					
					/**
					 * 
					 */
					var _getMousePosition = function(_this, ev){
						return _this.getVertical() ? (ev.changedTouches ? -ev.changedTouches[0].pageY : -ev.pageY) : 
								(ev.changedTouches ? ev.changedTouches[0].pageX : ev.pageX);
					};

					/**
					 * @override
					 */
					PickerWheelProto.ontouchstart = function(ev) {
						if(!this.getEnabled()){
							return;
						}
						
						this._touchStartTime = Date.now();
						
						this._timer && window.clearInterval(this._timer);
						this._timer = null;

						this._mousePosStart = _getMousePosition(this, ev);
						
						this._mousePosMove = null;
						this._rotationDirection = null;
						this._lastRecPos = 0;
						
						this._touchStartRotation = this._wheel.rotation;

						this._rotations = [this._touchStartRotation];
						this._times = [this._touchStartTime];

						/*
						if(this._isSpinning){
							this._isSpinning = false;
							this.$()
								.removeClass('ui5strapPickerWheel-flag-Spinning');
						}
						*/
						
						if (null !== this._$currentSelectedPanel) {
							this._$currentSelectedPanel
									.removeClass('active');
							this._$currentSelectedPanel = null;
						}
					};

					/**
					 * @override
					 */
					PickerWheelProto.ontouchmove = function(ev) {
						if (!this._mousePosStart)
							return;
						
						var tmpTouchMoveTime = Date.now(),
							tmpMouseXMove = _getMousePosition(this, ev),
							lastMousePosMove = this._mousePosMove;
						
						/*
						if(tmpTouchMoveTime - this._touchStartTime < PickerWheel.TIME_RESOLUTION){
							console.log("SKIP");
							return;
						}
						*/
						
						
						if(tmpMouseXMove !== lastMousePosMove){
							var wheel = this._wheel,
								lastRecPos = this._lastRecPos,
								tmpNewRotation = this._touchStartRotation
									- (this._mousePosStart - tmpMouseXMove) / this._segmentWidth * wheel.theta;
						
							if(null !== lastMousePosMove){
								var tmpMoveDelta = tmpMouseXMove - lastMousePosMove;
								
								if(tmpMoveDelta !== 0){
									var tmpNewRotationDirection = tmpMoveDelta / Math.abs(tmpMoveDelta),
										currentRotationDirection = this._rotationDirection; 
									
									if (null !== currentRotationDirection  
											&& tmpNewRotationDirection !== currentRotationDirection) {
										this._rotations = [];
										this._times = [];
										lastRecPos = 0;
										
										this._touchStartTime = tmpTouchMoveTime;
									}
			
									this._rotationDirection = tmpNewRotationDirection;
								}
							}
							
							this._touchMoveTime = tmpTouchMoveTime;
							this._mousePosMove = tmpMouseXMove;
							
							this._rotations[lastRecPos] = tmpNewRotation;
							this._times[lastRecPos] = tmpTouchMoveTime;
							
							this._lastRecPos = lastRecPos + 1;
							//console.log(tmpNewRotation, this._touchStartRotation, this._wheel.rotation);
							wheel.rotate(tmpNewRotation);
						}
					};

					/**
					 * 
					 */
					PickerWheelProto.ontouchend = function(ev) {
						if (!this._mousePosStart)
							return;
						
						var _this = this,
							touchEndTime = Date.now(),
							mousePosEnd = _getMousePosition(this, ev),
							moveDelta = Math.abs(mousePosEnd - this._mousePosStart),
							moveLength = this._rotations.length;
						
						//Set MouseXStart again to null to prevent false events
						this._mousePosStart = null;
						
						if(this._mousePosMove && moveLength > 1){
							
							var rotationDelta = this._rotations[moveLength - 1] - this._rotations[Math.max(0, moveLength - PickerWheel.TIME_STEPS)],
								releaseTime = touchEndTime - this._touchMoveTime;
							
							if (releaseTime < PickerWheel.RELEASE_LIMIT
									&& moveDelta >= PickerWheel.MIN_PIXEL_ROTATION) {
									
									var timeDelta = this._times[moveLength - 1] - this._times[Math.max(0, moveLength - PickerWheel.TIME_STEPS)],
										velocity = rotationDelta / timeDelta;
									
									this._timer && window.clearInterval(this._timer);
									this._timer = window.setInterval(function() {
										_this._wheel.rotate(_this._wheel.rotation + velocity * PickerWheel.TIME_RESOLUTION);
										
										if (Math.abs(velocity) <= PickerWheel.STOP_SPEED) {
											window.clearInterval(_this._timer);
											_this._timer = null;
											_this._stopDragging();
											
											return;
										}
										
										velocity = velocity * PickerWheel.DECELERATION;
										
									}, PickerWheel.TIME_RESOLUTION);
	
									return;
							}
						
						
						}
						
						if (touchEndTime - this._touchStartTime < PickerWheel.TAP_LIMIT 
								&& (!this._mousePosMove || moveDelta < PickerWheel.MIN_PIXEL_ROTATION)) {
							var $srcElement = jQuery(ev.target)
								.closest('.ui5strapPickerWheel-panel');
							if ($srcElement && $srcElement.length > 0) {

								var oldIndex = this.getSelectedIndex(),
									oldActive = this.getActive();
								
								this.setActive(true);
								this.setSelectedIndex($srcElement.data('index'));
								
								this._onSelectionChange(oldIndex, oldActive);
							}
							else{
								var oldActive = this.getActive();
								
								this.setActive(true);
								this._onSelectionChange(this.getSelectedIndex(), oldActive);
							}
							
							return;
						}

						this._stopDragging();
					};

					/**
					 * 
					 */
					PickerWheelProto.ontouchcancel = function(ev) {
						this._stopDragging();
					};
					
					/**
					 * 
					 */
					PickerWheelProto._stopDragging = function() {
						var oldIndex = this.getSelectedIndex(),
							oldActive = this.getActive();
						
						this._targetFrames = PickerWheel.TARGET_FRAMES_STOP;
						
						this.setActive(true);
						this.setSelectedIndex(this._getWheelIndex(this._wheel.rotation));
						
						this._targetFrames = PickerWheel.TARGET_FRAMES_TAP;
						
						this._onSelectionChange(oldIndex, oldActive);
					};

					/*
					 * END Touch handling
					 */
					
					/**
					 * @override
					 */
					PickerWheelProto.setMode = function(newMode, suppress) {
						if(sap.ui.Device.browser.msie){
							newMode = ui5strapBs3Lib.PickerWheelMode.Mode2D;
						}
						
						this.setProperty('mode', newMode, suppress);
					};
					
					/**
					 * @override
					 */
					PickerWheelProto.setSelectedIndex = function(newIndex, suppress) {
						if(isNaN(newIndex))
							jQuery.sap.log.error("Invalid index!");
						
						if (this.getDomRef()) {
							this.setProperty('selectedIndex', newIndex, true);
							var _this = this,
								targetRotation = _getRotationFromIndex(this._wheel, newIndex),
								rotationDelta = targetRotation - this._wheel.rotation,
								s0 = _this._wheel.rotation,
								targetFrames = this._targetFrames,
								v0 = rotationDelta / (PickerWheel.TIME_RESOLUTION * (targetFrames - 2.125)),
								t = 0,
								i = 1;
							
							this._timer && window.clearInterval(this._timer);
							
							/*
							if(Math.abs(rotationDelta) < 1 ){
								_this._wheel.rotate(targetRotation);
								_this._setSelectedPanelActive();
								
								return;
							}
							*/
							
							this._timer = window.setInterval(function() {
								
								
								if (i === targetFrames) {
									_this._wheel.rotate(targetRotation);
									
									window.clearInterval(_this._timer);
									_this._timer = null;
									
									_this._setSelectedPanelActive();
									
									return;
								}
								else{
									
									var tAdd = PickerWheel.TIME_RESOLUTION;
									if(i == targetFrames - 2){
										tAdd *= 0.5;
									}
									else if(i== targetFrames - 1){
										tAdd *= 0.25;
									}
									
									_this._wheel.rotate(_this._wheel.rotation + v0 * tAdd);
									
									
								}
								
								i++;
							}, PickerWheel.TIME_RESOLUTION);
						}
						else{
							this.setProperty('selectedIndex', newIndex, suppress);
						}
						
						return this;
					};
					
					/**
					 * @override
					 */
					PickerWheelProto.setActive = function(newActive, suppress) {
						if (this.getDomRef()) {
							this.setProperty('active', newActive, true);
							
							this.$().toggleClass('active', this.getEnabled() && this.getActive());
						}
						else{
							this.setProperty('active', newActive, suppress);
						}
						
						return this;
					};
					
					/**
					 * @override
					 */
					PickerWheelProto.setEnabled = function(newEnabled, suppress) {
						if (this.getDomRef()) {
							this.setProperty('enabled', newEnabled, true);
							
							this.$().toggleClass('disabled', !this.getEnabled());
						}
						else{
							this.setProperty('enabled', newEnabled, suppress);
						}
						
						return this;
					};
					
					/**
					 * 
					 */
					PickerWheelProto._onSelectionChange = function(oldIndex, oldActive) {
						if (oldIndex !== this.getSelectedIndex() || oldActive !== this.getActive()) {
							this.fireSelectionChange({
								oldIndex : oldIndex,
								oldActive : oldActive
							});
						}
						
					};
					
					/**
					 * 
					 */
					PickerWheelProto._getWheelIndex = function(rotation) {
						var index = rotation
								/ this._wheel.theta, th = Math.abs(index);

						th = th - Math.floor(th);

						if (index < 0) {
							return th > PickerWheel.THRESHOLD ? -Math
									.floor(index) : -Math.ceil(index);
						} else {
							return th < PickerWheel.THRESHOLD ? -Math
									.floor(index) : -Math.ceil(index);
						}
					};
					
					PickerWheelProto._getRealIndex = function(wheelIndex){
						wheelIndex = wheelIndex
								% (this._wheel.panelCount);
		
						if (wheelIndex < 0) {
							wheelIndex = this._wheel.panelCount
									+ wheelIndex;
						}
						
						return wheelIndex;
					};

					/**
					 * 
					 */
					PickerWheelProto._$getPanel = function(wheelIndex) {
						return jQuery('#' + this.getId() + '---panel-'
								+ this._getRealIndex(wheelIndex));
					};
					
					PickerWheelProto._getPanel = function(wheelIndex){
						return this.getPanels()[this._getRealIndex(wheelIndex)];
					};
					
					/**
					 * 
					 */
					PickerWheelProto._setSelectedPanelActive = function() {
						var $oldPanel = this._$currentSelectedPanel, 
								$newPanel = this._$getPanel(this.getSelectedIndex());
	
						if (null !== $oldPanel) {
							$oldPanel
									.removeClass('active');
						}

						if($newPanel !== this._$currentSelectedPanel){
							$newPanel.addClass('active');
							
							//WebKit Bugfix "Hanging Active Panel"
							if(this.getMode() === ui5strapBs3Lib.PickerWheelMode.Mode2D){
								this._wheel.rotate(this._wheel.rotation + 0.0001);
							}
							
							this._$currentSelectedPanel = $newPanel;
						}
						
						
					};
					
					/*
					 * --------------------
					 * START implementation of ISelectionProvider interface
					 * --------------------
					 */
					
					
					
					/*
					 * Index
					 */
					
					/**
					 * 
					 */
					PickerWheelProto.getSelection = function(selectionGroup){
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(0 === panels.length){
							return [];
						}
						
						return [panels[this._getRealIndex(selectedIndex)]];
					};
					
					/**
					 * 
					 */
					PickerWheelProto.isInSelection = function(itemsToSelect, selectionGroup){
						if(jQuery.isArray(itemsToSelect)){
							itemsToSelect = itemsToSelect[0];
						}
						
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(0 === panels.length){
							return false;
						}
						
						return itemsToSelect === panels[this._getRealIndex(selectedIndex)]; 
					};
					
					/**
					 * 
					 */
					PickerWheelProto.setSelection = function(itemsToSelect, selectionGroup){
						if(jQuery.isArray(itemsToSelect)){
							itemsToSelect = itemsToSelect[0];
						}
						
						var panels = this.getPanels();
						for(var i=0; i < panels.length; i++){
							if(panels[i] === itemsToSelect){
								this.setSelectedIndex(i);
								break;
							}
						}
					};
					
					/**
					 * 
					 */
					PickerWheelProto.addSelection = function(itemsToSelect, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.removeSelection = function(itemsToSelect, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.toggleSelection = function(itemsToSelect, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * Index
					 */
					
					/**
					 * 
					 */
					PickerWheelProto.getSelectionIndex = function(selectionGroup){
						if(0 === panels.length){
							return [];
						}
						
						return [this.getSelectedIndex()];
					};
					
					/**
					 * 
					 */
					PickerWheelProto.isInSelectionIndex = function(indices, selectionGroup){
						if(jQuery.isArray(indices)){
							indices = indices[0];
						}
						
						return indices === this.getSelectedIndex(); 
					};
					
					/**
					 * 
					 */
					PickerWheelProto.setSelectionIndex = function(indices, selectionGroup){
						if(jQuery.isArray(indices)){
							indices = indices[0];
						}
						
						this.setSelectedIndex(indices);
					};
					
					/**
					 * 
					 */
					PickerWheelProto.addSelectionIndex = function(indices, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.removeSelectionIndex = function(indices, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.toggleSelectionIndex = function(indices, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * Custom Data
					 */
					
					/**
					 * 
					 */
					PickerWheelProto.getSelectionCustomData = function(dataKey, selectionGroup){
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(0 === panels.length){
							return [];
						}
						
						return [panels[this._getRealIndex(selectedIndex)].data(dataKey)];
					};
					
					/**
					 * 
					 */
					PickerWheelProto.isInSelectionByCustomData = function(dataKey, values, selectionGroup){
						if(jQuery.isArray(values)){
							values = values[0];
						}
						
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(0 === panels.length){
							return false;
						}
						
						//TODO use == here? How to handle null/undefined?
						//Currently values must be a string if the data value is defined in the view.
						return values === panels[this._getRealIndex(selectedIndex)].data(dataKey); 
					};
					
					/**
					 * 
					 */
					PickerWheelProto.setSelectionByCustomData = function(dataKey, values, selectionGroup){
						if(jQuery.isArray(values)){
							values = values[0];
						}
						
						var panels = this.getPanels();
						for(var i=0; i < panels.length; i++){
							//TODO use == here? How to handle null/undefined?
							//Currently values must be a string if the data value is defined in the view.
							if(panels[i].data(dataKey) === values){
								this.setSelectedIndex(i);
								break;
							}
						}
					};
					
					/**
					 * 
					 */
					PickerWheelProto.addSelectionByCustomData = function(dataKey, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.removeSelectionByCustomData = function(dataKey, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.toggleSelectionByCustomData = function(dataKey, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * Property
					 */
					
					/**
					 * 
					 */
					PickerWheelProto.getSelectionProperty = function(propertyName, selectionGroup){
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels(),
							methodName = 'get' + jQuery.sap.charToUpperCase(propertyName);
						
						if(0 === panels.length){
							return [];
						}
						
						return [panels[this._getRealIndex(selectedIndex)][methodName]()];
					};
					
					/**
					 * 
					 */
					PickerWheelProto.isInSelectionByProperty = function(propertyName, values, selectionGroup){
						if(jQuery.isArray(values)){
							values = values[0];
						}
						
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels(),
							methodName = 'get' + jQuery.sap.charToUpperCase(propertyName);
						
						if(0 === panels.length){
							return false;
						}
						
						//TODO use == here? How to handle null/undefined?
						//Currently values must be a string if the data value is defined in the view.
						return values === panels[this._getRealIndex(selectedIndex)][methodName](); 
					};
					
					/**
					 * 
					 */
					PickerWheelProto.setSelectionByProperty = function(propertyName, values, selectionGroup){
						if(jQuery.isArray(values)){
							values = values[0];
						}
						
						var panels = this.getPanels(),
							methodName = 'get' + jQuery.sap.charToUpperCase(propertyName);
						for(var i=0; i < panels.length; i++){
							//TODO use == here? How to handle null/undefined?
							//Currently values must be a string if the data value is defined in the view.
							if(panels[i][methodName]() === values){
								this.setSelectedIndex(i);
								break;
							}
						}
					};
					
					/**
					 * 
					 */
					PickerWheelProto.addSelectionByProperty = function(propertyName, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.removeSelectionByProperty = function(propertyName, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/**
					 * 
					 */
					PickerWheelProto.toggleSelectionByProperty = function(propertyName, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * --------------------
					 * END implementation of ISelectionProvider interface
					 * --------------------
					 */
					
					//Return Constructor
					return PickerWheel;

				});