/*
 * 
 * UI5Strap Core Library
 *
 * pks.ui5strap.core.library
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
				[ 'jquery.sap.global', 
				  'sap/ui/Device', 
				  'sap/ui/core/library',
				  'jquery.sap.mobile'
				],
				function(
					jQuery, 
					Device, 
					coreLib, 
					jqm
				) {
					
					"use strict";
					
					/*
					 * ---------------
					 * 
					 * Declare Library
					 * 
					 * ---------------
					 */

					/**
					 * The ui5strap library.
					 *
					 * @namespace
					 * @name pks.ui5strap.core
					 * @author Jan Philipp Knoeller
					 * @version 1.0.2-SNAPSHOT
					 * @public
					 */
					sap.ui.getCore().initLibrary(
							{
								name : "pks.ui5strap.core",

								version : "1.0.2-SNAPSHOT",

								dependencies : [ "sap.ui.core" ],

								types : [ 
								          "pks.ui5strap.core.ContentPlacement",
								          "pks.ui5strap.core.PlainListType",
								          "pks.ui5strap.core.SelectionMode",
								          "pks.ui5strap.core.TrailHtml", 
								          "pks.ui5strap.core.TransitionSpeed", 
								          "pks.ui5strap.core.Visibility" ],

								interfaces : ["pks.ui5strap.core.IItemsProvider", "pks.ui5strap.core.INavigator",
												"pks.ui5strap.core.ISelectionProvider",
												"pks.ui5strap.core.ISelectableItem", "pks.ui5strap.core.IText"],

								controls : [
								      "pks.ui5strap.core.LineBreak",
								      "pks.ui5strap.core.ListBase",
								      "pks.ui5strap.core.ListItemBase",
								      "pks.ui5strap.core.NavContainer",
								      "pks.ui5strap.core.PlainList",
								      "pks.ui5strap.core.PlainListItem",
								      "pks.ui5strap.core.ScrollContainer",
								      "pks.ui5strap.core.ThematicBreak"
								],

								elements : []
							});
					
					var ui5strapCoreLib = pks.ui5strap.core,
						mPolyfill = {},
						fnTestRequirements = function() {
							if (!Object.keys) {
								jQuery.sap.log
										.error('Object.keys is not supported by the browser!');
								return false;
							}
	
							return true;
						};

					if (!fnTestRequirements()) {
						throw new Error(
								"<h4>We are sorry!</h4>"
										+ "<p>You're browser / device is not supported by Ui5Strap yet.</p>"
										+ "<p>Please use one of following browsers:</p>"
										+ "<ul>" + "<li>Chrome 26+</li>"
										+ "<li>Firefox 10+</li>"
										+ "<li>Safari 5+</li>"
										+ "<li>Internet Explorer 9+</li>"
										+ "</ul>");
					}

					
					/*
					 * START Options
					 */
					ui5strapCoreLib.options = {
						transitionTimeout : 2000,
						
						layerTimeout : 1000,
						
						intervalWaitForCss : 100,
						timeoutWaitForCss : 10000
					};
					
					/*
					 * END Options
					 */
					
					/*
					 * START Polyfill
					 */
					
					//Visibility API
					if (typeof document.hidden !== "undefined") { 
						mPolyfill.visibilityProperty = "hidden";
						mPolyfill.visibilityChange = "visibilitychange";
					} else if (typeof document.msHidden !== "undefined") {
						mPolyfill.visibilityProperty = "msHidden";
						mPolyfill.visibilityChange = "msvisibilitychange";
					} else if (typeof document.webkitHidden !== "undefined") {
						mPolyfill.visibilityProperty = "webkitHidden";
						mPolyfill.visibilityChange = "webkitvisibilitychange";
					}
					
					//Transition End
					var _transitionEndEvents = {
						'transition' : 'transitionend',
						'WebkitTransition' : 'webkitTransitionEnd',
						'MozTransition' : 'transitionend',
						'OTransition' : 'otransitionend'
					}, elem = document.createElement('div');

					for ( var t in _transitionEndEvents) {
						if (typeof elem.style[t] !== 'undefined') {
							mPolyfill.transitionEndEvent = _transitionEndEvents[t];
							break;
						}
					}
					
					//Request Animation Frame
					var _fnRequestAnimationFrame = (function() {
						return window.requestAnimationFrame
								|| window.webkitRequestAnimationFrame
								|| window.mozRequestAnimationFrame
								|| function(callback) {
									// For Browsers that do not support
									// requestAnimationFrame
									window.setTimeout(callback, 1000 / 30);
								};
					})();

					/**
					 * Request animation polyfill.
					 */
					mPolyfill.requestAnimationFrame = function(callback) {
						_fnRequestAnimationFrame.call(window, callback);
					};
					
					/**
					 * Returns whether the browser document is hiddden.
					 */
					mPolyfill.isDocumentHidden = function(){
						return mPolyfill.visibilityProperty ? document[mPolyfill.visibilityProperty] : false;
					};
					
					ui5strapCoreLib.polyfill = mPolyfill;
					
					/*
					 * END Polyfill
					 */
					
					/*
					 * ContentPlacement Defines where to place the rendering of the content
					 * aggregation. Used when there are both properties and aggregation that
					 * produces output.
					 */
					ui5strapCoreLib.ContentPlacement = {
						Start : "Start",
						End : "End"
					};
					
					/*
					 * ListType
					 */
					ui5strapCoreLib.PlainListType = {
						Unordered : "Unordered",
						Ordered : "Ordered"
					};

					
					/*
					 * SelectionMode Used by pks.ui5strapBs3Lib.core.ListBase
					 */
					ui5strapCoreLib.SelectionMode = {
						None : "None",
						Single : "Single",
						SingleToggle : "SingleToggle",
						Multiple : "Multiple"
					};
					
					/*
					 * TrailHtml Used by inline Controls
					 */
					ui5strapCoreLib.TrailHtml = {
						"None" : "None",
						"Space" : "Space",
						"DoubleSpace" : "DoubleSpace",
						"Break" : "Break"
					};

					
					
					/*
					 * TransitionSpeed
					 */
					ui5strapCoreLib.TransitionSpeed = {
						Slow : "Slow",
						Normal : "Normal",
						Fast : "Fast"
					};

					/*
					 * Visibility
					 */
					ui5strapCoreLib.Visibility = {
						Default : "Default",
						Visible : "Visible",
						VisibleUp : "VisibleUp",
						Hidden : "Hidden",
						HiddenUp : "HiddenUp"
					};
					
					// End of library
					return ui5strapCoreLib;

				});