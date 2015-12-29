/*
 * 
 * UI5Strap
 *
 * ui5strap.ResponsiveTransition
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
				[ './library' ],
				function(library) {

					/**
					 * Converts old transition strings into new ones.
					 * 
					 * @deprecated
					 * @Private
					 */
					var _deprecatedTransitionsConvert = function($trans) {
						var $newTrans = "";
						if ($trans === 'transition-zoom')
							$newTrans = 'zoom-in';
						else if ($trans === 'transition-zoom2')
							$newTrans = 'zoom-out';

						else if ($trans === 'transition-flip')
							$newTrans = 'flip-horizontal-ccw';
						else if ($trans === 'transition-slide')
							$newTrans = 'slide-rtl';
						else
							$newTrans = $trans.substring(11);

						jQuery.sap.log.warning("Transition deprecated: '"
								+ $trans + "'. Please use instead: "
								+ $newTrans);
						return $newTrans;
					};

					/**
					 * Constructs a responsive Transition (experimental)
					 * 
					 * @Constructor
					 * @Public
					 */
					var ResponsiveTransition = function(data) {
						this._data = data;

						var transString = "", transSpeed = data.transitionSpeed;

						if (data.transitionAll) {
							if (data.transitionAll.indexOf("transition-") === 0) {

								data.transitionAll = _deprecatedTransitionsConvert(data.transitionAll);
							}
							transString = "ui5strap-trans-all-type-"
									+ data.transitionAll;
						} else {
							transString += data.transitionExtraSmall ? "ui5strap-trans-xs-type-"
									+ data.transitionExtraSmall
									: "ui5strap-trans-xs-type-none";
							transString += data.transitionSmall ? " ui5strap-trans-sm-type-"
									+ data.transitionSmall
									: " ui5strap-trans-sm-type-none";
							transString += data.transitionMedium ? " ui5strap-trans-md-type-"
									+ data.transitionMedium
									: " ui5strap-trans-md-type-none";
							transString += data.transitionLarge ? " ui5strap-trans-lg-type-"
									+ data.transitionLarge
									: " ui5strap-trans-lg-type-none";

							if (transString === "ui5strap-trans-xs-type-none ui5strap-trans-sm-type-none ui5strap-trans-md-type-none ui5strap-trans-lg-type-none") {
								transString = "ui5strap-trans-all-type-none";
							}
						}

						this._skip = !ui5strap.support.transitionEndEvent
								|| transString === "ui5strap-trans-all-type-none";

						this._transitions = transString;

						if (transSpeed && transitionSpeed !== "normal") {
							this._transitions += " ui5strap-transition-speed-"
									+ transSpeed;
						}

						this._prepared = false;
						this._executed = false;
						this._canceled = false;

						this._finished = false;
						this._nextFinished = false;
						this._currentFinished = false;
						this._firstFinished = null;

						this._events = {
							current : [],
							next : [],
							first : [],
							last : []
						};

						this.on = function(event, callback) {
							if (("current" === event && this._currentFinished)
									|| ("next" === event && this._nextFinished)
									|| ("first" === event && this._firstFinished)
									|| ("last" === event && this._finished)) {
								callback();
							}

							this._events[event].push(callback);
						};

						var _runEvent = function(_this, event) {
							for (var i = 0; i < _this._events[event].length; i++) {
								_this._events[event][i]();
							}
							_this._events[event] = [];
						};

						/**
						 * Should always be surrounded by a RAF.
						 * 
						 * @Public
						 */
						this.prepare = function() {
							if (this._prepared || this._executed) {
								throw new Error(
										'Cannot prepare transition: already prepared or executed!');
							}

							if (this._canceled) {
								return;
							}

							this._prepared = true;

							if (this._skip) {
								// Transition skipped
								// We still need to remove the hidden flag from
								// the next dom element.
								this._data.$next
										&& this._data.$next
												.removeClass('ui5strap-hidden');

								return;
							}

							// Prepare DOM elements
							this._data.$current
									&& this._data.$current
											.addClass(this._transitions
													+ ' '
													+ 'ui5strap-transition-current');
							this._data.$next
									&& this._data.$next
											.addClass(
													this._transitions
															+ ' '
															+ 'ui5strap-transition-next')
											.removeClass('ui5strap-hidden');
						};
						
						this.madeChanges = function(){
							return this._prepared;
						};

						/**
						 * Should always be surrounded by a RAF.
						 * 
						 * @Public
						 */
						this.execute = function(callbackCurrent, callbackNext) {
							var _this = this;

							if (this._executed) {
								throw new Error(
										'Cannot execute responsive transition: already executed!');
							}

							this._executed = true;

							var _finallyCurrent = function() {
								if (_this._currentFinished) {
									jQuery.sap.log
											.warning('[TRANS#'
													+ _this._data.id
													+ ' ('
													+ _this._transitions
													+ ')] Hiding page caused a timeout.');

									return;
								}

								_this._currentFinished = true;

								if (_this._nextFinished
										|| !_this._events.next.length) {
									_this._finished = true;
								}

								if (!_this._firstFinished) {
									_this._firstFinished = "current";
								}

								// Clear timeout for current page, if any
								window.clearTimeout(_this._currentTimout);

								if ("current" === _this._firstFinished) {
									_runEvent(_this, "first");
								}

								// Callback for current page
								callbackCurrent && callbackCurrent.call(_this);

								_runEvent(_this, "current");

								if (_this._finished) {
									_runEvent(_this, "last");
								}
							}, _finallyNext = function() {
								if (_this._nextFinished) {
									jQuery.sap.log
											.warning('[TRANS#'
													+ _this._data.id
													+ ' ('
													+ _this._transitions
													+ ')] Showing page caused a timeout.');

									return;
								}
								_this._nextFinished = true;
								if (_this._currentFinished
										|| !_this._events.current.length) {
									_this._finished = true;
								}

								if (!_this._firstFinished) {
									_this._firstFinished = "next";
								}

								// Clear timeout for next page, if any
								window.clearTimeout(_this._nextTimout);

								if ("next" === _this._firstFinished) {
									_runEvent(_this, "first");
								}

								// Callback for next page
								callbackNext && callbackNext.call(_this);

								_runEvent(_this, "next");

								if (_this._finished) {
									_runEvent(_this, "last");
								}
							};

							// Check if transition is skipped or canceled.
							if (this._skip || this._canceled || !this._prepared) {
								// Transition skipped
								jQuery.sap.log.debug("[TRANS#" + _this._data.id
										+ "] Transition skipped: '"
										+ _this._transitions + "'");

								_finallyCurrent();
								_finallyNext();
							} else {
								// Execute transition
								jQuery.sap.log.debug("[TRANS#" + this._data.id
										+ "] Executing '" + _this._transitions
										+ "'");

								// Current DOM element
								if (this._data.$current) {
									this._currentTimout = window.setTimeout(
											_finallyCurrent,
											ui5strap.options.transitionTimeout);

									this._data.$current
											.one(
													ui5strap.support.transitionEndEvent,
													_finallyCurrent);
								}

								// Next DOM element
								if (this._data.$next) {
									this._nextTimout = window.setTimeout(
											_finallyNext,
											ui5strap.options.transitionTimeout);

									this._data.$next
											.one(
													ui5strap.support.transitionEndEvent,
													_finallyNext);
								}

								// Now set the classes to start the transitions
								this._data.$current
										&& this._data.$current
												.addClass('ui5strap-transition-current-out');
								this._data.$next
										&& this._data.$next
												.removeClass('ui5strap-transition-next');
							}

						};

						this.cancel = function() {
							this._canceled = true;
						};

					};

					return ResponsiveTransition;
				});