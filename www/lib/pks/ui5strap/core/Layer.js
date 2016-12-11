/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.Layer
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
				function(ui5strapCoreLib) {
					
					"use strict";
					
					/*
					 * -----
					 * 
					 * Layer
					 * 
					 * -----
					 */

					/**
					 * @Package
					 * @Public
					 */
					var Layer = {
						layers : {}
					};

					/**
					 * Registers a new layer
					 * 
					 * @Public
					 */
					Layer.register = function(layerId, $layer) {
						if (this.layers[layerId]) {
							throw new Error('Layer ' + layerId
									+ ' already registered.');
						}

						$layer = $layer || jQuery('#' + layerId);
						if ($layer.length === 0) {
							jQuery.sap.log.error("Layer " + layerId
									+ " does not exist.");

							return false;
						}

						if (!$layer.hasClass('ui5strap-layer')) {
							throw new Error(
									"Cannot register layer '"
											+ layerId
											+ "': layers must have the css class 'ui5strap-layer'.");
						}

						this.layers[layerId] = {
							id : layerId,
							visible : !$layer.hasClass('ui5strap-hidden'),
							$domElement : $layer
						}

						return true;
					};

					/**
					 * @Public
					 * @Static
					 */
					Layer.get = function(layerId) {
						return this.layers[layerId];
					};

					/**
					 * @Public
					 * @Static
					 */
					Layer.unregister = function(layerId) {
						delete this.layers[layerId];
					};

					/**
					 * @Public
					 * @Static
					 */
					Layer.isVisible = function(layerId) {
						return this.layers[layerId]
								&& this.layers[layerId].visible;
					};

					/**
					 * @Public
					 * @Static
					 */
					Layer.setVisible = function(layerId, visible, callback,
							bSuppressTransition) {

						var layer = this.layers[layerId], $layer = layer.$domElement;

						if (!layer || visible == layer.visible) {
							// If the layer is not defined or its already
							// visible/invisible, just call the callback
							callback && callback();
							return;
						}

						layer.visible = visible;

						if (layer.busy) {
							// Apply Css immediately if the layer is busy but a
							// new request comes in
							if (visible) {
								$layer
										.removeClass("ui5strap-invisible ui5strap-hidden");
							} else {
								$layer
										.addClass("ui5strap-invisible ui5strap-hidden");
							}

							// Call the existing callback
							layer.busy(null);

							callback && callback();

							return;
						}

						// Prepare Layer for transition
						if (visible) {
							$layer.removeClass("ui5strap-hidden");

							if (!bSuppressTransition) {
								$layer.addClass("ui5strap-invisible");
							}
						} else {
							// Explicit set layer visible
							// TODO Do we need this?
							$layer
									.removeClass("ui5strap-hidden ui5strap-invisible");
						}

						var triggered = false, transTimeout = null, transCallback = function(
								ev) {
							if (triggered) {
								return;
							}

							window.clearTimeout(transTimeout);

							triggered = true;

							if (null === ev) {
								// Callack executed by another instance
								jQuery.sap.log
										.warning("Transition of layer "
												+ layer.id
												+ " has been canceled by another instance.");
							} else {
								// Callback executed either by transition end
								// event or timout

								if (!visible) {
									$layer.addClass("ui5strap-hidden")
											.removeClass("ui5strap-invisible");
								}

								if (!ev) {
									jQuery.sap.log
											.warning("Layer '"
													+ layerId
													+ "' transition-end event failed - timeout triggered.");
								}
							}

							delete layer.busy;

							callback && callback();
						};

						layer.busy = transCallback;

						if (bSuppressTransition) {
							transCallback();
						} else {
							// Start Transition
							ui5strapCoreLib.polyfill
									.requestAnimationFrame(function() {
										// Transition end event
										$layer
												.one(
														ui5strapCoreLib.polyfill.transitionEndEvent,
														transCallback);

										// Start transition
										ui5strapCoreLib.polyfill
												.requestAnimationFrame(function() {
													// Transition timeout
													transTimeout = window
															.setTimeout(
																	transCallback,
																	ui5strapCoreLib.options.layerTimeout);

													$layer
															.toggleClass(
																	"ui5strap-invisible",
																	!visible);

												});
									});
						}
					};

					return Layer;
				});