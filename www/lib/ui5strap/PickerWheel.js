/*
 * 
 * UI5Strap
 *
 * ui5strap.PickerWheel
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
				[ "ui5strap/library", "ui5strap/ControlBase" ],
				function(ulib, ControlBase) {

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
										
										vertical : {
											type : "boolean",
											defaultValue : false
										},
										
										mode : {
											type : "ui5strap.PickerWheelMode",
											defaultValue : ui5strap.PickerWheelMode.Mode3D
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

						this.rotation = Math.round(this.rotation / this.theta)
								* this.theta;

						this.transform();
					};

					Wheel3D.prototype.transform = function() {
						this.element.style[_transformProperty] = 'translateZ(-'
								+ this.radius + 'px) ' + this.rotateFn + '('
								+ this.rotation + 'deg)';
					};
					
					Wheel3D.prototype.toIndex = function(newIndex){
						this.rotation = _getRotationFromIndex(this, newIndex);
						this.transform();
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
						
						this.rotation = Math.round(this.rotation / this.theta)
						* this.theta;

						this.transform();
					};

					Wheel2D.prototype.transform = function() {
						for (i = 0; i < this.panelCount; i++) {
							panel = this.element.children[i];
							angle = this.theta * i;
							
							var ang = (angle + 90 + this.rotation)  / 180,
								vis = (ang < 0 ? Math.floor(ang) % 2 === 0 : Math.ceil(ang) % 2 === 1);
							
							panel.style.visibility =  vis ? 'visible' : 'hidden';
							
							if(vis){
								var cos = Math.cos(ang * Math.PI);
								
								//panel.style.zIndex 
								
								if(!this.isVertical){
									cos = cos * -1;
								}
								
								var newTransform = this.rotateFn + "("
								+ ( cos * this.radius)   + "px)";
								
								newTransform += " scale(" + (1 - Math.abs(cos) * 0.33) + ")";
								
								panel.style[_transformProperty] = newTransform;
							}
						}
						
					};
					
					Wheel2D.prototype.toIndex = function(newIndex){
						this.rotation = _getRotationFromIndex(this, newIndex);
						this.transform();
					};
					
					/*
					 * Configuration
					 */
					
					PickerWheel.TAP_LIMIT = 200;

					PickerWheel.RELEASE_LIMIT = 100;
					
					PickerWheel.TIME_STEPS = 3;
					
					PickerWheel.DECCEL = 0.96;
					
					//Minimum rotation in degrees to trigger acceleration
					PickerWheel.MIN_ACCEL_ROTATION = 1.7;
					
					PickerWheel.STOP_TH = 0.01;
					
					PickerWheel.TIME_RES = 20;
					
					PickerWheel.THRES = 0.5;
					
					
					PickerWheel.C_SPEED_HIGH = 20;
					PickerWheel.C_SPEED_LOW = 15;

					PickerWheelProto.modern = window.requestAnimationFrame;

					/**
					 * 
					 */
					PickerWheelProto.init = function() {
						this._$currentSelectedPanel = null;
						this._inactive = false;
						//this._isSpinning = false;
						this._cSpeed = PickerWheel.C_SPEED_HIGH;
						
						this._timer = null;
					};
					
					PickerWheelProto._getStyleClassRoot = function(){
						//TODO Adapt style classes according to flag
						var styleClass = " " 
					    		+ (this.getVertical() ? 'ui5strapPickerWheel-ver' : 'ui5strapPickerWheel-hor');
					    
						styleClass += " ui5strapPickerWheel-mode-" + this.getMode();
						
						
					    if(-1 === this.getSelectedIndex() || !this.getEnabled()){ 
					    	styleClass += ' disabled';
					    	this._inactive = true;
					    }
					    
					    return styleClass;
					}
					
					/*
					 * START after Rendering
					 */

					/**
					 * Returns the computed value for a css property.
					 * 
					 * @Public
					 */
					PickerWheelProto.getComputedStyle = function(strCssRule) {
						var oElm = this.$()[0], strValue = "";

						if (document.defaultView
								&& document.defaultView.getComputedStyle) {
							strValue = document.defaultView.getComputedStyle(
									oElm, "").getPropertyValue(strCssRule);
						} else if (oElm.currentStyle) {
							strCssRule = strCssRule.replace(/\-(\w)/g,
									function(strMatch, p1) {
										return p1.toUpperCase();
									});
							strValue = oElm.currentStyle[strCssRule];
						}

						return strValue;
					};

					/**
					 * Checks whether the pixel value for the container width is
					 * already available.
					 * 
					 * @Private
					 */
					var _checkVisibility = function(_this, callback) {
						if (!_this.getDomRef()) {
							throw new Error("Cannot update graph.");
						}
						var width = _this.getComputedStyle(_this.getVertical() ? 'height' : 'width');
						// We want to find out whether we can get the width of
						// container in pixels.
						// This is needed if the width of the container is
						// specified in percent.
						// Its takes a short moment until the CSS is rendered.
						if (-1 !== width.indexOf('px')) {
							callback && callback();
						} else {
							_this._checkVisibilityCounter++;

							if (_this._checkVisibilityCounter > 5) {
								jQuery.sap.log
										.error("Cannot update graph: container width could not be obtained.");
								return;
							}

							jQuery.sap.log
									.debug("Graph container is not visible yet...");

							_this._checkVisibilityTimeout = window.setTimeout(
									function() {
										_checkVisibility(_this, callback);
									}, 100);
						}
					};

					/**
					 * Waits until the pixel value for the container width is
					 * available.
					 * 
					 * @Protected
					 */
					PickerWheelProto._waitForRendering = function(callback) {
						this._checkVisibilityCounter = 0;
						window.clearTimeout(this._checkVisibilityTimeout);

						_checkVisibility(this, callback);
					};

					/**
					 * 
					 */
					PickerWheelProto.onAfterRendering = function() {
						var _this = this,
							mode = this.getMode();
						
						this._waitForRendering(function() {
							_this.$().find('.ui5strapPickerWheel-inner')
									.removeClass('ui5strap-hidden');

							if(_this.getPanels().length == 0){
								return;
							}
							
							_this._$wheelContainer = _this.$().find('.ui5strapPickerWheel-wheel');
							
							if(mode === ulib.PickerWheelMode.Mode3D){
								_this._carousel = new Wheel3D(_this._$wheelContainer[0]);
							}
							else if(mode === ulib.PickerWheelMode.Mode2D){
								_this._carousel = new Wheel2D(_this._$wheelContainer[0]);
							}
							
							_this.refresh();
						});

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

						this._carousel.modify(isVertical, this.getPanels().length, this._segmentWidth);

						if(0 !== this.getSelectedIndex()){
							this._carousel.toIndex(this.getSelectedIndex());
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
					PickerWheelProto.getMouseX = function(ev) {
						if ("changedTouches" in ev) {
							return ev.changedTouches[0].pageX;
						}
						return ev.pageX;
					};

					/**
					 * 
					 */
					PickerWheelProto.getMouseY = function(ev) {
						if ("changedTouches" in ev) {
							return ev.changedTouches[0].pageY;
						}
						return ev.pageY;
					};

					/**
					 * 
					 */
					PickerWheelProto.ontouchstart = function(ev) {
						this._touchStartTime = Date.now();
						
						this._timer && window.clearInterval(this._timer);

						this._mouseXStart = this.getVertical() ? -this.getMouseY(ev) : this.getMouseX(ev);
						
						this._mouseXMove = null;
						this._rotationDirection = null;
						
						this._touchStartRotation = this._carousel.rotation;

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
					 * 
					 */
					PickerWheelProto.ontouchmove = function(ev) {
						if (!this._mouseXStart)
							return;
						
						this._touchMoveTime = Date.now();
						
						var mouseXMove = this.getVertical() ? -this.getMouseY(ev) : this.getMouseX(ev),
						newRotationDirection = null,
						newRotation = this._touchStartRotation
						- 1 // TODO 
						* ((this._mouseXStart - mouseXMove) / this._segmentWidth * this._carousel.theta);

						
						if(null !== this._mouseXMove){
							var dx2 = mouseXMove - this._mouseXMove;
							if(dx2 !== 0){
								newRotationDirection = dx2 / Math.abs(dx2);
							}
						}
						
						this._mouseXMove = mouseXMove;
						
						if(null !== newRotationDirection){
							if (null !== this._rotationDirection && newRotationDirection !== this._rotationDirection) {
								this._rotations = [];
								this._times = [];
								this._touchStartTime = this._touchMoveTime;
							}
	
							this._rotationDirection = newRotationDirection;
						}
						
						this._rotations.push(newRotation);
						this._times.push(this._touchMoveTime);
						
						this._carousel.rotation = newRotation;
						this._carousel.transform();
					};

					/**
					 * 
					 */
					PickerWheelProto.ontouchend = function(ev) {
						if (!this._mouseXStart)
							return;
						
						//Set MouseXStart again to null to prevent false events
						this._mouseXStart = null;
						
						var touchEndTime = Date.now(),
							_this = this,
							timeDelta = this._times[this._times.length-1] - this._times[Math.max(0, this._times.length- PickerWheel.TIME_STEPS)],
							rotationDelta = this._rotations[this._rotations.length - 1] - this._rotations[Math.max(0, this._rotations.length - PickerWheel.TIME_STEPS)],
							
							releaseTime = touchEndTime - this._touchMoveTime;
						
						//rotationDelta = Math.round((_this._carousel.rotation + rotationDelta) / _this._carousel.theta) * _this._carousel.theta - _this._carousel.rotation;
						
						var t = 0;
						if (releaseTime < PickerWheel.RELEASE_LIMIT
								&& Math.abs(rotationDelta) >= PickerWheel.MIN_ACCEL_ROTATION) {
								var velocity = rotationDelta / timeDelta;
								this._timer = window.setInterval(function() {
									t += PickerWheel.TIME_RES;
									
									_this._carousel.rotation += velocity * PickerWheel.TIME_RES;
									_this._carousel.transform();
									
									if (Math.abs(velocity) <= PickerWheel.STOP_TH) {
										window.clearInterval(_this._timer);
										_this._timer = null;
										_this._stopDragging(_this._carousel.rotation, rotationDelta);
										
										return;
									}
									
									velocity = velocity * PickerWheel.DECCEL;
									
								}, PickerWheel.TIME_RES);

								return;
						}
						
						if (touchEndTime - this._touchStartTime < PickerWheel.TAP_LIMIT) {
							var $srcElement = jQuery(ev.target);
							if ($srcElement
									.hasClass('.ui5strapPickerWheel-pointer')) {
								this._onSelectionChange(this.getSelectedIndex());
								
								return;

							} else{ 
								
								$srcElement = $srcElement
								.closest('.ui5strapPickerWheel-panel');
								if ($srcElement && $srcElement.length > 0) {

									var oldIndex = this.getSelectedIndex();
									this.setSelectedIndex($srcElement.data('index'));
									
									this._onSelectionChange(oldIndex);
	
									return;
								}
							}
						}

						this._stopDragging(this._carousel.rotation, rotationDelta);
					};

					/**
					 * 
					 */
					PickerWheelProto.ontouchcancel = function(ev) {
						this._stopDragging(this._carousel.rotation, 0);
					};
					
					/**
					 * 
					 */
					PickerWheelProto._stopDragging = function(rotation, dir) {
						var oldIndex = this.getSelectedIndex();
						var oldSpeed = this._cSpeed;
						this._cSpeed = PickerWheel.C_SPEED_LOW;
						console.log(this._getWheelIndex(rotation, dir));
						this.setSelectedIndex(this._getWheelIndex(rotation, dir));
						this._cSpeed = oldSpeed;
						this._onSelectionChange(oldIndex);
					};

					/*
					 * END Touch handling
					 */
					
					PickerWheelProto.setMode = function(newMode, suppress) {
						if(sap.ui.Device.browser.msie){
							newMode = ulib.PickerWheelMode.Mode2D;
						}
						
						this.setProperty('mode', newMode, suppress);
					};
					
					/**
					 * 
					 */
					PickerWheelProto.setSelectedIndex = function(newIndex, suppress) {
						this.setProperty('selectedIndex', newIndex, true);

						if (this.getDomRef()) {
							var _this = this,
								targetRotation = _getRotationFromIndex(this._carousel, newIndex),
								rotationDelta = targetRotation - this._carousel.rotation,
								s0 = _this._carousel.rotation,
								cSpeed = this._cSpeed,
								v0 = rotationDelta / (PickerWheel.TIME_RES * (cSpeed - 2.125)),
								t = 0,
								i = 1;
							
							this._timer && window.clearInterval(this._timer);
							
							if(Math.abs(rotationDelta) < 1 ){
								_this._carousel.rotation = targetRotation; 
								_this._carousel.transform();
								_this._setSelectedPanelActive();
								
								return;
							}
							
							this._timer = window.setInterval(function() {
								
								
								if (i === cSpeed) {
									_this._carousel.rotation = targetRotation; 
									_this._carousel.transform();
									
									window.clearInterval(_this._timer);
									_this._timer = null;
									
									_this._setSelectedPanelActive();
									
									return;
								}
								else{
									
									var tAdd = PickerWheel.TIME_RES;
									if(i == _this._cSpeed - 2){
										tAdd *= 0.5;
									}
									else if(i== _this._cSpeed - 1){
										tAdd *= 0.25;
									}
									
									_this._carousel.rotation += v0 * tAdd;
									_this._carousel.transform();
									
									
								}
								
								i++;
							}, PickerWheel.TIME_RES);
						}
					};

					/**
					 * 
					 */
					PickerWheelProto._onSelectionChange = function(oldIndex) {
						
						if(this._inactive){
							this.$().removeClass('disabled');
							this._inactive = false;
						}
						
						if (oldIndex !== this.getSelectedIndex()) {
							this.fireSelectionChange({
								"oldIndex" : oldIndex
							});
						}
						
					};
					
					/**
					 * 
					 */
					PickerWheelProto._getWheelIndex = function(rotation, dir) {
						var index = rotation
								/ this._carousel.theta, th = Math.abs(index);

						th = th - Math.floor(th);

						if (index < 0) {
							return th > PickerWheel.THRES ? -Math
									.floor(index) : -Math.ceil(index);
						} else {
							return th < PickerWheel.THRES ? -Math
									.floor(index) : -Math.ceil(index);
						}
					};

					/**
					 * 
					 */
					PickerWheelProto._$getPanel = function(wheelIndex) {
						wheelIndex = wheelIndex
								% (this._carousel.panelCount);

						if (wheelIndex < 0) {
							wheelIndex = this._carousel.panelCount
									+ wheelIndex;
						}

						return jQuery('#' + this.getId() + '---panel-'
								+ wheelIndex);
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
							if(this.getMode() === ulib.PickerWheelMode.Mode2D){
								this._carousel.rotation += 0.0001;
								this._carousel.transform();
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
					
					PickerWheelProto.getSelection = function(selectionGroup){
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(-1 == selectedIndex || 0 === panels.length){
							return [];
						}
						
						return [panels[selectedIndex]];
					};
					
					PickerWheelProto.isInSelection = function(itemsToSelect, selectionGroup){
						if(jQuery.isArray(itemsToSelect)){
							itemsToSelect = itemsToSelect[0];
						}
						
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(-1 == selectedIndex || 0 === panels.length){
							return false;
						}
						
						return itemsToSelect === panels[itemsToSelect]; 
					};
					
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
					
					PickerWheelProto.addSelection = function(itemsToSelect, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.removeSelection = function(itemsToSelect, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.toggleSelection = function(itemsToSelect, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * Index
					 */
					
					PickerWheelProto.getSelectionIndex = function(selectionGroup){
						var selectedIndex = this.getSelectedIndex();
						
						if(-1 === selectedIndex){
							return [];
						}
						
						return [selectedIndex];
					};
					
					PickerWheelProto.isInSelectionIndex = function(indices, selectionGroup){
						if(jQuery.isArray(indices)){
							indices = indices[0];
						}
						
						var selectedIndex = this.getSelectedIndex();
						
						if(-1 === selectedIndex){
							return false;
						}
						
						return indices === this.getSelectedIndex(); 
					};
					
					PickerWheelProto.setSelectionIndex = function(indices, selectionGroup){
						if(jQuery.isArray(indices)){
							indices = indices[0];
						}
						
						this.setSelectedIndex(indices);
					};
					
					PickerWheelProto.addSelectionIndex = function(indices, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.removeSelectionIndex = function(indices, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.toggleSelectionIndex = function(indices, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * Custom Data
					 */
					
					PickerWheelProto.getSelectionCustomData = function(dataKey, selectionGroup){
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(-1 == selectedIndex || 0 === panels.length){
							return [];
						}
						
						return [panels[selectedIndex].data(dataKey)];
					};
					
					PickerWheelProto.isInSelectionByCustomData = function(dataKey, values, selectionGroup){
						if(jQuery.isArray(values)){
							values = values[0];
						}
						
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels();
						
						if(-1 == selectedIndex || 0 === panels.length){
							return false;
						}
						
						//TODO use == here? How to handle null/undefined?
						//Currently values must be a string if the data value is defined in the view.
						return values === panels[itemsToSelect].data(dataKey); 
					};
					
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
					
					PickerWheelProto.addSelectionByCustomData = function(dataKey, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.removeSelectionByCustomData = function(dataKey, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.toggleSelectionByCustomData = function(dataKey, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					/*
					 * Property
					 */
					
					PickerWheelProto.getSelectionProperty = function(propertyName, selectionGroup){
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels(),
							methodName = 'get' + jQuery.sap.charToUpperCase(propertyName);
						
						if(-1 == selectedIndex || 0 === panels.length){
							return [];
						}
						
						return [panels[selectedIndex][methodName]()];
					};
					
					PickerWheelProto.isInSelectionByProperty = function(propertyName, values, selectionGroup){
						if(jQuery.isArray(values)){
							values = values[0];
						}
						
						var selectedIndex = this.getSelectedIndex(),
							panels = this.getPanels(),
							methodName = 'get' + jQuery.sap.charToUpperCase(propertyName);
						
						if(-1 == selectedIndex || 0 === panels.length){
							return false;
						}
						
						//TODO use == here? How to handle null/undefined?
						//Currently values must be a string if the data value is defined in the view.
						return values === panels[itemsToSelect][methodName](); 
					};
					
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
					
					PickerWheelProto.addSelectionByProperty = function(propertyName, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
					PickerWheelProto.removeSelectionByProperty = function(propertyName, values, selectionGroup){
						throw new Error('This Control does not support multiple selections!');
					};
					
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