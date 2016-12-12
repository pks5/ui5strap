/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.ResponsiveTransition
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
				[ './library'],
				function(ui5strapCoreLib) {
					
					"use strict";
					
					/**
					 * Constructor for a new ResponsiveTransition instance.
					 * 
					 * @param {object} mData - Initial settings.
					 * 
					 * @class
					 * Class that provides responsive transition support.
					 * 
					 * @author Jan Philipp Knoeller
					 * @version 0.11.6
					 * 
					 * @constructor
					 * @public
					 * @alias pks.ui5strap.core.ResponsiveTransition
					 * 
					 */
					var ResponsiveTransition = function(mData) {
						this._mData = mData;

						var sTransClasses = "", transSpeed = mData.transitionSpeed;

						if (mData.transitionAll) {
							sTransClasses = "ui5strap-trans-all-type-"
									+ mData.transitionAll;
						} else {
							sTransClasses += mData.transitionExtraSmall ? "ui5strap-trans-xs-type-"
									+ mData.transitionExtraSmall
									: "ui5strap-trans-xs-type-none";
							sTransClasses += mData.transitionSmall ? " ui5strap-trans-sm-type-"
									+ mData.transitionSmall
									: " ui5strap-trans-sm-type-none";
							sTransClasses += mData.transitionMedium ? " ui5strap-trans-md-type-"
									+ mData.transitionMedium
									: " ui5strap-trans-md-type-none";
							sTransClasses += mData.transitionLarge ? " ui5strap-trans-lg-type-"
									+ mData.transitionLarge
									: " ui5strap-trans-lg-type-none";

							if (sTransClasses === "ui5strap-trans-xs-type-none ui5strap-trans-sm-type-none ui5strap-trans-md-type-none ui5strap-trans-lg-type-none") {
								sTransClasses = "ui5strap-trans-all-type-none";
							}
						}

						this._mStatus = {
							skipped : false,
							prepared : false,
							executed : false,
							canceled : false,
							firstFinished : false,
							currentFinished : false,
							nextFinished : false,
							lastFinished : false,
							finished : false
						};
						
						this._mStatus.skipped = !ui5strapCoreLib.polyfill.transitionEndEvent
								|| sTransClasses === "ui5strap-trans-all-type-none";

						if (transSpeed && transSpeed !== "normal") {
							sTransClasses += " ui5strap-transition-speed-"
									+ transSpeed;
						}
						
						this._sTransClasses = sTransClasses;

						this._mEvents = {
							current : [],
							next : [],
							first : [],
							last : []
						};
					};
					
					ResponsiveTransition.prototype = {};
					
					var ResponsiveTransitionProto = ResponsiveTransition.prototype;
					
					ResponsiveTransitionProto.on = function(event, callback) {
						if (("current" === event && this._mStatus.currentFinished)
								|| ("next" === event && this._mStatus.nextFinished)
								|| ("first" === event && this._mStatus.firstFinished)
								|| ("last" === event && this._mStatus.finished)) {
							callback();
						}

						this._mEvents[event].push(callback);
					};
					
					ResponsiveTransitionProto.prepare = function() {
						var mStatus = this._mStatus,
							mData = this._mData;
						
						if (mStatus.prepared || mStatus.executed) {
							throw new Error(
									'Cannot prepare transition: already prepared or executed!');
						}

						if (!mStatus.skipped && !mStatus.canceled) {
							var $oNext = mData.$next,
								$oCurrent = mData.$current,
								sTransClasses = this._sTransClasses;
							
							// Prepare DOM elements
							$oCurrent
									&& $oCurrent.addClass(sTransClasses
													+ ' '
													+ 'ui5strap-transition-current');
							$oNext
									&& $oNext
											.addClass(
													sTransClasses
															+ ' '
															+ 'ui5strap-transition-next')
											.removeClass('ui5strap-hidden');
							
							mStatus.prepared = true;
						}
					};
					
					ResponsiveTransitionProto.cancel = function() {
						this._mStatus.canceled = true;
					};
					
					ResponsiveTransitionProto.getData = function(){
						return this._mData;
					};
					
					ResponsiveTransitionProto.getStatus = function(){
						return this._mStatus;
					};
					
					ResponsiveTransitionProto.runEvent = function(sEventName) {
						for (var i = 0; i < this._mEvents[sEventName].length; i++) {
							this._mEvents[sEventName][i]();
						}
						this._mEvents[sEventName] = [];
					};
					
					ResponsiveTransitionProto.finishCurrent = function(){
						var mStatus = this._mStatus,
							mData = this._mData;
						
						if (mStatus.currentFinished) {
							jQuery.sap.log
									.warning("Transition timeout.");

							return;
						}

						// Clear timeout for current page, if any
						window.clearTimeout(this._currentTimout);
						
						//First
						if (!mStatus.firstFinished) {
							this.runEvent("first");
							
							mStatus.firstFinished = "current";
						}

						//Current
						this.runEvent("current");
						
						mStatus.currentFinished = true;
						
						//Last
						var bFinished = mStatus.nextFinished || !mData.$next;
						
						if (bFinished) {
							this.runEvent("last");
							
							mStatus.finished = true;
						}
					};
					
					ResponsiveTransitionProto.finishNext = function(){
						var mStatus = this._mStatus,
							mData = this._mData;
						
						if (mStatus.nextFinished) {
							jQuery.sap.log
							.warning("Transition timeout.");
							
							return;
						}
						
						// Clear timeout for next page, if any
						window.clearTimeout(this._nextTimout);
						
						//First
						if (!mStatus.firstFinished) {
							this.runEvent("first");
							
							mStatus.firstFinished = "next";
						}

						//Next
						this.runEvent("next");
						mStatus.nextFinished = true;
						
						var bFinished = mStatus.currentFinished || !mData.$current;
						
						if (bFinished) {
							this.runEvent("last");
							
							mStatus.finished = true;
						}
					};
					
					/**
					 * Should always be surrounded by a RAF.
					 * 
					 * @Public
					 */
					ResponsiveTransitionProto.execute = function() {
						var _this = this,
							mStatus = this._mStatus,
							mData = this._mData,
							$oNext = mData.$next,
							$oCurrent = mData.$current;

						if (mStatus.executed) {
							throw new Error(
									'Cannot execute responsive transition: already executed!');
						}
						
						// Check if transition is skipped or canceled.
						if (mStatus.skipped || mStatus.canceled) {
							
							jQuery.sap.log
							.warning("Transition skipped or canceled.");
							
							this.finishCurrent();
							this.finishNext();
							
						} else {
							jQuery.sap.log
							.warning("Executing transition.");
							
							// Current DOM element
							if ($oCurrent) {
								var fnFinishCurrent = function(){
									_this.finishCurrent();
								};
								
								this._currentTimout = window.setTimeout(
										fnFinishCurrent,
										ui5strapCoreLib.options.transitionTimeout);

								$oCurrent
										.one(
												ui5strapCoreLib.polyfill.transitionEndEvent,
												fnFinishCurrent);
							}

							// Next DOM element
							if ($oNext) {
								var fnFinishNext = function(){
									_this.finishNext();
								};
								
								this._nextTimout = window.setTimeout(
										fnFinishNext,
										ui5strapCoreLib.options.transitionTimeout);

								$oNext
										.one(
												ui5strapCoreLib.polyfill.transitionEndEvent,
												fnFinishNext);
							}

							// Now set the classes to start the transitions
							$oCurrent
									&& $oCurrent
											.addClass('ui5strap-transition-current-out');
							$oNext
									&& $oNext
											.removeClass('ui5strap-transition-next');
						}
						
						mStatus.executed = true;
						
					};
					
					return ResponsiveTransition;
				});