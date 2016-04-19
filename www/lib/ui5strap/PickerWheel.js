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
											defaultValue : sap.ui.Device.browser.msie ? ulib.PickerWheelMode.Mode2D : ulib.PickerWheelMode.Mode3D
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

					PickerWheel.RELEASE_LIMIT = 75;
					
					PickerWheel.TIME_STEPS = 5;
					
					PickerWheel.DECCEL = 0.96; //Decceleration
					
					//Minimum rotation in degrees to trigger acceleration
					PickerWheel.MIN_ACCEL_ROTATION = 1.7;
					
					PickerWheel.STOP_TH = 0.01; //Stop Speed
					
					PickerWheel.TIME_RES = 20; //50 Frames per second
					
					PickerWheel.THRES = 0.5;
					
					
					PickerWheel.C_SPEED_HIGH = 20;
					PickerWheel.C_SPEED_LOW = 15;

					PickerWheelProto.modern = window.requestAnimationFrame;

					/**
					 * 
					 */
					PickerWheelProto.init = function() {
						this._$currentSelectedPanel = null;
						this._cSpeed = PickerWheel.C_SPEED_HIGH;
						
						this._timer = null;
					};
					
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
					}
					
					/*
					 * START after Rendering
					 */

					/**
					 * 
					 */
					PickerWheelProto.onAfterRendering = function() {
						var _this = this,
							mode = this.getMode();
						
						this._waitForRendering(
								this.getVertical() ? 'height' : 'width',
								function() {
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
						if(!this.getEnabled()){
							return;
						}
						
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
						
						this._tmpTouchMoveTime = Date.now();
						
						if(this._tmpTouchMoveTime - this._touchStartTime < PickerWheel.TIME_RES / 2){
							//jQuery.sap.log.info("Skipped");
							return;
						}
						
						this._touchMoveTime = this._tmpTouchMoveTime;
						
						this._tmpMouseXMove = this.getVertical() ? -this.getMouseY(ev) : this.getMouseX(ev);
						this._tmpNewRotationDirection = null;
						
						this._tmpNewRotation = this._touchStartRotation
						- 1 // TODO 
						* ((this._mouseXStart - this._tmpMouseXMove) / this._segmentWidth * this._carousel.theta);

						
						if(null !== this._mouseXMove){
							this._tmpMoveDelta = this._tmpMouseXMove - this._mouseXMove;
							
							if(this._tmpMoveDelta !== 0){
								this._tmpNewRotationDirection = this._tmpMoveDelta / Math.abs(this._tmpMoveDelta);
							}
						}
						
						this._mouseXMove = this._tmpMouseXMove;
						
						if(null !== this._tmpNewRotationDirection){
							if (null !== this._rotationDirection && this._tmpNewRotationDirection !== this._rotationDirection) {
								this._rotations = [];
								this._times = [];
								this._touchStartTime = this._touchMoveTime;
							}
	
							this._rotationDirection = this._tmpNewRotationDirection;
						}
						
						this._rotations.push(this._tmpNewRotation);
						this._times.push(this._touchMoveTime);
						
						this._carousel.rotation = this._tmpNewRotation;
						this._carousel.transform();
					};

					/**
					 * 
					 */
					PickerWheelProto.ontouchend = function(ev) {
						if (!this._mouseXStart)
							return;
						
						var _this = this,
							touchEndTime = Date.now(),
							mouseXEnd = this.getVertical() ? -this.getMouseY(ev) : this.getMouseX(ev);
						
						//Set MouseXStart again to null to prevent false events
						this._mouseXStart = null;
						
						if(this._mouseXMove){
							
							var moveLength = this._rotations.length,
								rotationDelta = this._rotations[moveLength - 1] - this._rotations[Math.max(0, moveLength - PickerWheel.TIME_STEPS)],
								releaseTime = touchEndTime - this._touchMoveTime;
							
							if (releaseTime < PickerWheel.RELEASE_LIMIT
									&& Math.abs(rotationDelta) >= PickerWheel.MIN_ACCEL_ROTATION) {
									
									var timeDelta = this._times[moveLength - 1] - this._times[Math.max(0, moveLength - PickerWheel.TIME_STEPS)],
										velocity = rotationDelta / timeDelta;
									
									this._timer = window.setInterval(function() {
										_this._carousel.rotation += velocity * PickerWheel.TIME_RES;
										_this._carousel.transform();
										
										if (Math.abs(velocity) <= PickerWheel.STOP_TH) {
											window.clearInterval(_this._timer);
											_this._timer = null;
											_this._stopDragging();
											
											return;
										}
										
										velocity = velocity * PickerWheel.DECCEL;
										
									}, PickerWheel.TIME_RES);
	
									return;
							}
						
						
						}
						
						if (touchEndTime - this._touchStartTime < PickerWheel.TAP_LIMIT 
								&& (!this._mouseXMove || Math.abs(mouseXEnd - this._mouseXStart) < 3)) {
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
							oldActive = this.getActive(),
							oldSpeed = this._cSpeed;
						
						this._cSpeed = PickerWheel.C_SPEED_LOW;
						this.setActive(true);
						this.setSelectedIndex(this._getWheelIndex(this._carousel.rotation));
						
						this._cSpeed = oldSpeed;
						
						this._onSelectionChange(oldIndex, oldActive);
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
						if (this.getDomRef()) {
							this.setProperty('selectedIndex', newIndex, true);
							var _this = this,
								targetRotation = _getRotationFromIndex(this._carousel, newIndex),
								rotationDelta = targetRotation - this._carousel.rotation,
								s0 = _this._carousel.rotation,
								cSpeed = this._cSpeed,
								v0 = rotationDelta / (PickerWheel.TIME_RES * (cSpeed - 2.125)),
								t = 0,
								i = 1;
							
							this._timer && window.clearInterval(this._timer);
							
							/*
							if(Math.abs(rotationDelta) < 1 ){
								_this._carousel.rotation = targetRotation; 
								_this._carousel.transform();
								_this._setSelectedPanelActive();
								
								return;
							}
							*/
							
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
						else{
							this.setProperty('selectedIndex', newIndex, suppress);
						}
					};
					
					PickerWheelProto.setActive = function(newActive, suppress) {
						if (this.getDomRef()) {
							this.setProperty('active', newActive, true);
							
							this.$().toggleClass('active', this.getEnabled() && this.getActive());
						}
						else{
							this.setProperty('active', newActive, suppress);
						}
					};
					
					PickerWheelProto.setEnabled = function(newEnabled, suppress) {
						if (this.getDomRef()) {
							this.setProperty('enabled', newEnabled, true);
							
							this.$().toggleClass('disabled', !this.getEnabled());
						}
						else{
							this.setProperty('enabled', newEnabled, suppress);
						}
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
					
					PickerWheelProto._getRealIndex = function(wheelIndex){
						wheelIndex = wheelIndex
								% (this._carousel.panelCount);
		
						if (wheelIndex < 0) {
							wheelIndex = this._carousel.panelCount
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
						
						if(0 === panels.length){
							return [];
						}
						
						return [panels[this._getRealIndex(selectedIndex)]];
					};
					
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
						if(0 === panels.length){
							return [];
						}
						
						return [this.getSelectedIndex()];
					};
					
					PickerWheelProto.isInSelectionIndex = function(indices, selectionGroup){
						if(jQuery.isArray(indices)){
							indices = indices[0];
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
						
						if(0 === panels.length){
							return [];
						}
						
						return [panels[this._getRealIndex(selectedIndex)].data(dataKey)];
					};
					
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
						
						if(0 === panels.length){
							return [];
						}
						
						return [panels[this._getRealIndex(selectedIndex)][methodName]()];
					};
					
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