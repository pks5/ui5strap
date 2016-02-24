/*
 * 
 * UI5Strap
 *
 * ui5strap.library
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
				  'jquery.sap.mobile',
				  "sap/ui/base/Object",
				  "sap/ui/base/EventProvider",
				  "sap/ui/base/ManagedObject",
				  "sap/ui/core/Element",
				  "sap/ui/core/Control",
				  "sap/ui/model/json/JSONModel",
				  "sap/ui/core/mvc/View"
				],
				function(
					jQuery, 
					Device, 
					coreLib, 
					jqm,
					BaseObject,
					EventProvider,
					ManagedObject,
					BaseElement,
					BaseControl,
					JSONModel,
					BaseView
				) {
					
					"use strict";
					
					/**
					 * 
					 * Test system requirements
					 * 
					 * @Private
					 * @Static
					 */
					var _testRequirements = function() {
						if (!Object.keys) {
							jQuery.sap.log
									.error('Object.keys is not supported by the browser!');
							return false;
						}

						return true;
					};

					if (!_testRequirements()) {
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
					 * ---------------
					 * 
					 * Declare Library
					 * 
					 * ---------------
					 */

					// Register Ui5Strap as library
					sap.ui.getCore().initLibrary(
							{
								name : "ui5strap",

								version : "0.10.4-SNAPSHOT",

								dependencies : [ "sap.ui.core" ],

								types : [ "ui5strap.Size", "ui5strap.Severity",
										"ui5strap.Visibility",
										"ui5strap.TriggerMode",
										"ui5strap.TrailHtml",
										"ui5strap.ContentPlacement",
										"ui5strap.Placement",
										"ui5strap.Alignment",
										"ui5strap.TextAlignment",
										"ui5strap.TextType",
										"ui5strap.ListType",
										"ui5strap.LinkType",
										"ui5strap.HeadingType",
										"ui5strap.ButtonType",
										"ui5strap.ButtonGroupType",
										"ui5strap.IconType",
										"ui5strap.IconSize",
										"ui5strap.IconTransform",
										"ui5strap.BsAction",
										"ui5strap.FormSeverity",
										"ui5strap.FormType",
										"ui5strap.TextInputType",
										"ui5strap.SelectBoxType",
										"ui5strap.TextInputFormat",
										"ui5strap.CheckboxType",
										"ui5strap.RadioButtonType",
										"ui5strap.FormMethod",
										"ui5strap.NavBarType",
										"ui5strap.NavBarPosition",
										"ui5strap.NavType",
										"ui5strap.SelectionMode",
										"ui5strap.ContainerType",
										"ui5strap.ImageShape" ],

								interfaces : [ "ui5strap.IColumn",
										"ui5strap.IBar" ],

								controls : [ "ui5strap.Alert",
										"ui5strap.Badge",
										"ui5strap.Breadcrumb",
										"ui5strap.Break", "ui5strap.Button",
										"ui5strap.ButtonDropdown",
										"ui5strap.ButtonGroup",
										"ui5strap.ButtonToolbar",
										"ui5strap.Carousel",
										"ui5strap.Checkbox",
										"ui5strap.Clearfix", "ui5strap.Col",
										"ui5strap.Container", "ui5strap.Form",
										"ui5strap.FormGroup",
										"ui5strap.Heading", "ui5strap.Icon",
										"ui5strap.Image",
										"ui5strap.InputGroup",
										"ui5strap.Jumbotron", "ui5strap.Label",
										"ui5strap.Line", "ui5strap.Link",
										"ui5strap.List", "ui5strap.ListBase",
										"ui5strap.ListDropdownItem",
										"ui5strap.ListDropdownMenu",
										"ui5strap.ListGroup",
										"ui5strap.ListGroupItem",
										"ui5strap.ListItemBase",
										"ui5strap.ListItem",
										"ui5strap.ListLinkItem",
										"ui5strap.ListMedia",
										"ui5strap.ListMediaItem",
										"ui5strap.ListNavItem",
										"ui5strap.Modal", "ui5strap.Nav",
										"ui5strap.NavBar",
										"ui5strap.NavContainer",
										"ui5strap.NavContainerStandard",
										"ui5strap.PageHeader",
										"ui5strap.Pager",
										"ui5strap.Pagination",
										"ui5strap.Panel",
										"ui5strap.PanelGroup",
										"ui5strap.Paragraph",
										"ui5strap.Popover",
										"ui5strap.Progress",
										"ui5strap.ProgressBar",
										"ui5strap.RadioButton", "ui5strap.Row",
										"ui5strap.ScrollContainer",
										"ui5strap.SelectBox",
										"ui5strap.Sidebar",
										"ui5strap.TabContainer",
										"ui5strap.Table", "ui5strap.Text",
										"ui5strap.TextInput",
										"ui5strap.Thumbnail",
										"ui5strap.Tooltip", "ui5strap.Well" ],

								elements : [ "ui5strap.Item",
										"ui5strap.TableColumn",
										"ui5strap.TableRow" ]
							});
					
					/*
					 * -------
					 * 
					 * Wrapper
					 * 
					 * -------
					 */
					
					//JQuery
					ui5strap.$ = jQuery;
					
					//Device
					ui5strap.Device = Device;
					
					// Object
					ui5strap.Object = BaseObject;
					
					ui5strap.EventProvider = EventProvider;

					// Managed Object
					ui5strap.ManagedObject = ManagedObject;

					// Element
					ui5strap.Element = BaseElement;

					// Control
					ui5strap.Control = BaseControl;

					// JSONModel
					ui5strap.JSONModel = JSONModel;

					// View
					ui5strap.View = BaseView;
					
					/*
					 * -------
					 * 
					 * Options
					 * 
					 * -------
					 */

					// @deprecated
					var tapSupport = Device.support.touch;

					ui5strap.options = {
						enableTapEvents : tapSupport,
						enableClickEvents : !tapSupport,
						transitionTimeout : 2000,
						layerTimeout : 1000
					};

					/*
					 * -------
					 * 
					 * Support
					 * 
					 * -------
					 */

					ui5strap.support = {
						"touch" : sap.ui.Device.support.touch
					};

					var _transitionEndEvents = {
						'transition' : 'transitionend',
						'WebkitTransition' : 'webkitTransitionEnd',
						'MozTransition' : 'transitionend',
						'OTransition' : 'otransitionend'
					}, elem = document.createElement('div');

					for ( var t in _transitionEndEvents) {
						if (typeof elem.style[t] !== 'undefined') {
							ui5strap.support.transitionEndEvent = _transitionEndEvents[t];
							break;
						}
					}

					/*
					 * Bootstrap Transition End Legacy
					 */

					// CSS TRANSITION SUPPORT (Shoutout:
					// http://www.modernizr.com/)
					// ============================================================
					var _bootstrapTransitionEnd = function() {
						var el = document.createElement('bootstrap');

						var transEndEventNames = {
							'WebkitTransition' : 'webkitTransitionEnd',
							'MozTransition' : 'transitionend',
							'OTransition' : 'oTransitionEnd otransitionend',
							'transition' : 'transitionend'
						};

						for ( var name in transEndEventNames) {
							if (el.style[name] !== undefined) {
								return {
									end : transEndEventNames[name]
								};
							}
						}

						return false; // explicit for ie8 ( ._.)
					};

					ui5strap.support.transition = _bootstrapTransitionEnd();

					// http://blog.alexmaccaw.com/css-transitions
					jQuery.fn.emulateTransitionEnd = function(duration) {
						var called = false, $el = this;
						jQuery(this).one(ui5strap.support.transition.end,
								function() {
									called = true
								});

						var callback = function() {
							if (!called)
								jQuery($el).trigger(
										ui5strap.support.transition.end);
						};

						setTimeout(callback, duration);

						return this;
					};

					/*
					 * END Bootstrap Transition End Legacy
					 */

					/*
					 * -------
					 * 
					 * Polyfill
					 * 
					 * -------
					 */
					ui5strap.polyfill = {};

					var _requestAnimFrame = (function() {
						return window.requestAnimationFrame
								|| window.webkitRequestAnimationFrame
								|| window.mozRequestAnimationFrame
								|| function(callback) {
									// For Browsers that do not support
									// requestAnimationFrame
									window.setTimeout(callback, 1000 / 30);
								};
					})();

					ui5strap.polyfill.requestAnimationFrame = function(callback) {
						_requestAnimFrame.call(window, callback);
					};

					/*
					 * -----------
					 * 
					 * START Types
					 * 
					 * -----------
					 */

					/*
					 * Size
					 */
					ui5strap.Size = {
						ExtraSmall : "ExtraSmall",
						Small : "Small",
						Medium : "Medium",
						Large : "Large",
						Default : "Default"
					};

					ui5strap.BSSize = {
						ExtraSmall : "xs",
						Small : "sm",
						Medium : "md",
						Large : "lg"
					};

					/*
					 * TransitionSpeed
					 */
					ui5strap.TransitionSpeed = {
						Slow : "Slow",
						Normal : "Normal",
						Fast : "Fast"
					};

					/*
					 * Severity
					 */
					ui5strap.Severity = {
						Default : "Default",
						Primary : "Primary",
						Success : "Success",
						Warning : "Warning",
						Info : "Info",
						Danger : "Danger",
						None : "None"
					};

					ui5strap.BSSeverity = {
						Default : "default",
						Primary : "primary",
						Success : "success",
						Warning : "warning",
						Info : "info",
						Danger : "danger"
					};

					/*
					 * Visibility
					 */
					ui5strap.Visibility = {
						Default : "Default",
						Visible : "Visible",
						VisibleUp : "VisibleUp",
						Hidden : "Hidden",
						HiddenUp : "HiddenUp"
					};

					/**
					 * CarouselOverflow defines how you see overflowing content
					 * in Carousel controls.
					 */
					ui5strap.CarouselOverflow = {
						Default : "Default",
						Visible : "Visible",
						Hidden : "Hidden",
						Covered : "Covered"
					};

					/*
					 * TriggerMode Used by Popovers
					 */
					ui5strap.TriggerMode = {
						Click : "Click",
						Hover : "Hover",
						Focus : "Focus",
						Manual : "Manual"
					};

					ui5strap.BSTriggerMode = {
						Click : "click",
						Hover : "hover",
						Focus : "focus",
						Manual : "manual"
					};

					/*
					 * TrailHtml Used by inline Controls
					 */
					ui5strap.TrailHtml = {
						"None" : "None",
						"Space" : "Space",
						"DoubleSpace" : "DoubleSpace",
						"Break" : "Break"
					};

					/*
					 * ContentPlacement Defines where to place the rendering of
					 * the content aggregation. Used when there are both
					 * properties and aggregation that produces output.
					 */
					ui5strap.ContentPlacement = {
						Start : "Start",
						End : "End"
					};

					/*
					 * Placement Used by Popover and Tooltip controls
					 */
					ui5strap.Placement = {
						None : "None",
						Default : "Default",

						Top : "Top",
						Left : "Left",
						Bottom : "Bottom",
						Right : "Right",

						AutoTop : "AutoTop",
						AutoLeft : "AutoLeft",
						AutoBottom : "AutoBottom",
						AutoRight : "AutoRight"
					};

					// Bootstrap CSS mapping
					ui5strap.BSPlacement = {
						Top : "top",
						Left : "left",
						Bottom : "bottom",
						Right : "right",

						AutoTop : "auto top",
						AutoLeft : "auto left",
						AutoBottom : "auto bottom",
						AutoRight : "auto right"
					};

					/*
					 * Alignment Used for align block elements
					 */
					ui5strap.Alignment = {
						Default : "Default",
						PullLeft : "PullLeft",
						PullRight : "PullRight",
						CenterBlock : "CenterBlock",

						// Deprecated
						NavBar : "NavBar",
						NavBarLeft : "NavBarLeft",
						NavBarRight : "NavBarRight",
						Sidebar : "Sidebar"
					};

					// Bootstrap CSS mapping
					ui5strap.BSAlignment = {
						PullLeft : "pull-left",
						PullRight : "pull-right",
						CenterBlock : "center-block",

						// Deprecated
						NavBarLeft : "navbar-left",
						NavBarRight : "navbar-right"
					};

					/*
					 * TextType
					 */
					ui5strap.TextType = {
						Default : "Default",
						Phrasing : "Phrasing",
						Strong : "Strong",
						Blockquote : "Blockquote",
						Quote : "Quote",
						Preformatted : "Preformatted",
						Emphasized : "Emphasized",
						Code : "Code",
						Paragraph : "Paragraph",
						HelpBlock : "HelpBlock",
						FormStatic : "FormStatic",
						Small : "Small",
						Lead : "Lead",
						Abbreviation : "Abbreviation",
						Label : "Label",
						Badge : "Badge"
					};

					/*
					 * TextAlignment
					 */
					ui5strap.TextAlignment = {
						Default : "Default",

						Left : "Left",
						Right : "Right",
						Center : "Center",
						Justify : "Justify"
					};

					/*
					 * ListType
					 */
					ui5strap.ListType = {
						Unordered : "Unordered",
						Ordered : "Ordered"
					};

					ui5strap.ListGroupMode = {
						Default : "Default",
						Navigation : "Navigation"
					};
					
					ui5strap.DropdownMenuHostUpdate = {
							None : "None",
							Text : "Text",
							Data : "Data",
							TextAndData : "TextAndData"
					};

					/*
					 * LinkType
					 */
					ui5strap.LinkType = {
						Default : "Default",

						// Deprecated
						Thumbnail : "Thumbnail"
					};

					/*
					 * HeadingType TODO check this
					 */
					ui5strap.HeadingType = {
						Default : "Default",
						PageHeader : "PageHeader",
						ListGroupItemHeading : "ListGroupItemHeading",
						MediaHeading : "MediaHeading"
					};

					/*
					 * ButtonType TODO check this
					 */
					ui5strap.ButtonType = {
						Default : "Default",
						Button : "Button",
						Block : "Block",
						Link : "Link",

						// @deprecated
						Close : "Close",
						Icon : "Icon"
					};

					/*
					 * ButtonGroupType Used by ButtonGroup
					 */
					ui5strap.ButtonGroupType = {
						Default : "Default",
						Justified : "Justified",
						Vertical : "Vertical"
					};

					/*
					 * IconType Only used by ui5strap.Icon
					 */
					ui5strap.IconType = {
						Default : "Default",
						FormFeedback : "FormFeedback"
					};

					/*
					 * IconSize Only used by ui5strap.Icon
					 */
					ui5strap.IconSize = {
						Default : "Default",
						Large : "Large",
						X2 : "X2",
						X3 : "X3",
						X4 : "X4",
						X5 : "X5"
					};

					/*
					 * IconTransform Only used by ui5strap.Icon
					 */
					ui5strap.IconTransform = {
						Default : "Default",
						Rotate90 : "Rotate90",
						Rotate180 : "Rotate180",
						Rotate270 : "Rotate270",
						FlipHorizontal : "FlipHorizontal",
						FlipVertical : "FlipVertical"
					};

					/*
					 * BsAction adds a special class to a control that is used
					 * by Bootstrap's JavaScript. This is the most bad way to
					 * create dynamic behaviour. Use Actions instead.
					 * 
					 * @deprecated Will be removed in future releases.
					 */
					ui5strap.BsAction = {
						None : "None",
						DismissModal : "DismissModal",
						ToggleNavbar : "ToggleNavbar",
						ToggleSidenav : "ToggleSidenav"
					};

					/*
					 * FormSeverity Only used by ui5strap.Form
					 */
					ui5strap.FormSeverity = {
						Success : "Success",
						Warning : "Warning",
						Error : "Error",
						None : "None"
					};

					/*
					 * FormType Only used by ui5strap.Form
					 */
					ui5strap.FormType = {
						Default : "Default",
						Horizontal : "Horizontal",
						Inline : "Inline"
					};

					/*
					 * TextInputType Only used by ui5strap.TextInput
					 */
					ui5strap.TextInputType = {
						Default : "Default",
						FormControl : "FormControl"
					};

					/*
					 * TextInputFormat Only used by ui5strap.TextInput
					 */
					ui5strap.TextInputFormat = {
						Default : "Default",
						Plain : "Plain",
						Html : "Html",
						Email : "Email",
						Date : "Date"
					}

					/*
					 * SelectBoxType Only used by ui5strap.SelectBox
					 */
					ui5strap.SelectBoxType = {
						Default : "Default",
						FormControl : "FormControl"
					};

					/*
					 * CheckboxType Only used by ui5strap.Checkbox
					 */
					ui5strap.CheckboxType = {
						Default : "Default",
						Block : "Block",
						Inline : "Inline"
					};

					/*
					 * RadioButtonType Only used by ui5strap.RadioButton
					 */
					ui5strap.RadioButtonType = {
						Default : "Default",
						Block : "Block",
						Inline : "Inline"
					};

					/*
					 * FormMethod Only used by ui5strap.Form
					 */
					ui5strap.FormMethod = {
						None : "None",
						Default : "Default",
						POST : "POST",
						GET : "GET",
						PUT : "PUT"
					};

					/*
					 * NavBarType Only used by ui5strap.NavBar
					 */
					ui5strap.NavBarType = {
						Default : "Default",
						None : "None"
					};

					/*
					 * NavBarPosition Only used by ui5strap.NavBar
					 */
					ui5strap.NavBarPosition = {
						Default : "Default",
						FixedTop : "FixedTop",
						FixedBottom : "FixedBottom",
						StaticTop : "StaticTop"
					};

					/*
					 * NavType Only used by ui5strap.Nav
					 */
					ui5strap.NavType = {
						Tabs : "Tabs",
						Pills : "Pills",
						PillsStacked : "PillsStacked",
						PillsJustified : "PillsJustified",
						TabsJustified : "TabsJustified",
						Default : "Default"
					};

					/*
					 * BarNavContainerMode
					 */
					ui5strap.BarNavContainerMode = {
						Intrude : "Intrude",
						Extrude : "Extrude",
						Overlay : "Overlay",
						IntrudeFixed : "IntrudeFixed",
						ExtrudeFixed : "ExtrudeFixed",
						OverlayFixed : "OverlayFixed"
					};

					/*
					 * BarNavContainerPlacement
					 */
					ui5strap.BarNavContainerPlacement = {
						Left : "Left",
						Top : "Top",
						Right : "Right",
						Bottom : "Bottom"
					};

					/*
					 * BarMenuType
					 */
					ui5strap.BarMenuType = {
						Default : "Default",
						ListHorizontal : "ListHorizontal",
						ListVertical : "ListVertical",
						ButtonsHorizontal : "ButtonsHorizontal",
						ButtonsVertical : "ButtonsVertical"
					}

					/*
					 * BarMenuType
					 */
					ui5strap.BarType = {
						Default : "Default",
						Fluid : "Fluid"
					}

					/*
					 * SelectionMode Used by ui5strap.ListBase
					 */
					ui5strap.SelectionMode = {
						None : "None",
						Single : "Single",
						SingleToggle : "SingleToggle",
						Multiple : "Multiple"
					};

					/*
					 * ContainerType Only used by ui5strap.Container
					 */
					ui5strap.ContainerType = {
						// Plain HTML <div>
						Default : "Default",

						// Bootstrap "container" & "container-fluid"
						Fluid : "Fluid",

						// Bootstrap styles
						Website : "Website",
						Jumbotron : "Jumbotron",
						Well : "Well",
						WellLarge : "WellLarge",
						PageHeader : "PageHeader",

						// Deprecated
						FluidInset : "FluidInset"
					};

					/*
					 * ImageShape Only used by ui5strap.Image
					 */
					ui5strap.ImageShape = {
						Default : "Default",
						Rounded : "Rounded",
						Circle : "Circle",
						Thumbnail : "Thumbnail"
					};

					ui5strap.ImageType = {
						Default : "Default",
						MediaObject : "MediaObject",
						Responsive : "Responsive"
					};
					
					/*
					 * ---------
					 * END Types
					 * ---------
					 */

					/*
					 * ---------
					 * 
					 * Shorthand
					 * 
					 * ---------
					 */

					/**
					 * Create a Controller instance with Action support. TODO
					 * remove ui5strap.App dependency from here?
					 * 
					 * @Public
					 * @Static
					 * @deprecated
					 */
					ui5strap.controller = function(controllerName,
							controllerImpl) {
						jQuery.sap.log
								.warning("ui5strap.controller is deprecated. Please extend ui5strap.ActionController instead.");

						jQuery.sap.require('ui5strap.AppBase');

						ui5strap.AppBase.blessController(controllerImpl);

						return sap.ui
								.controller(controllerName, controllerImpl);
					};

					/*
					 * -----------
					 * 
					 * Transitions
					 * 
					 * -----------
					 */

					/**
					 * Constructs a Transition
					 * 
					 * @Constructor
					 * @deprecated use ui5strap.ResponsiveTransition instead.
					 */
					ui5strap.Transition = function(transitionName,
							$currentRoot, $nextRoot, transitionId) {
						jQuery.sap.log
								.warning("ui5strap.Transition is deprecated. Please use ui5strap.ResponsiveTransition instead.");
						this.$current = $currentRoot;
						this.$next = $nextRoot;

						this._prepared = false;
						this._executed = false;

						var transitionClass = transitionName, transitionTimeout = ui5strap.options.transitionTimeout, transitionEndEvent = ui5strap.support.transitionEndEvent;

						/**
						 * Should always be surrounded by a RAF.
						 */
						this.prepare = function() {
							if (this._prepared || this._executed) {
								throw new Error(
										'Cannot prepare transition: already prepared or executed!');
							}

							this._prepared = true;

							if (!transitionName) {
								return;
							}

							this.$current
									&& this.$current.addClass(transitionClass
											+ ' ' + transitionClass
											+ '-current');
							this.$next
									&& this.$next
											.addClass(
													transitionClass + ' '
															+ transitionClass
															+ '-next')
											.removeClass('ui5strap-hidden');
						};

						/**
						 * Should always be surrounded by a RAF.
						 */
						this.execute = function(currentRootCallback,
								nextRootCallback) {
							var _this = this;

							if (!this._prepared) {
								throw new Error(
										'Cannot execute transition: not prepared!');
							}

							if (this._executed) {
								throw new Error(
										'Cannot execute transition: already executed!');
							}

							this._executed = true;
							this._neca = false;
							this._cuca = false;

							if (transitionName && transitionEndEvent) {
								jQuery.sap.log.debug('[TRANSITION#'
										+ transitionId + '] ' + transitionName);

								if (currentRootCallback && this.$current) {
									var _currentTimout = window
											.setTimeout(
													function() {
														if (_this._cuca) {
															return;
														}
														_this._cuca = true;
														jQuery.sap.log
																.warning('[TRANSITION#'
																		+ transitionId
																		+ '] Transition "'
																		+ transitionName
																		+ '" of hiding page caused a timeout.');
														currentRootCallback
																.call(_this);
													}, transitionTimeout);

									this.$current
											.one(
													transitionEndEvent,
													function() {
														if (_this._cuca) {
															return;
														}
														_this._cuca = true;
														window
																.clearTimeout(_currentTimout);
														currentRootCallback
																.call(_this);
													});
								}

								if (nextRootCallback && this.$next) {
									var _nextTimout = window
											.setTimeout(
													function() {
														if (_this._neca) {
															return;
														}
														_this._neca = true;
														jQuery.sap.log
																.warning('[TRANSITION#'
																		+ transitionId
																		+ '] Transition "'
																		+ transitionName
																		+ '" of showing page caused a timeout.');
														nextRootCallback
																.call(_this);
													}, transitionTimeout);

									this.$next
											.one(
													transitionEndEvent,
													function() {
														if (_this._neca) {
															return;
														}
														_this._neca = true;
														window
																.clearTimeout(_nextTimout);
														nextRootCallback
																.call(_this);
													});
								}

								this.$current
										&& this.$current
												.addClass(transitionClass
														+ '-current-out');
								this.$next
										&& this.$next
												.removeClass(transitionClass
														+ '-next');
							} else {
								jQuery.sap.log
										.debug('[TRANSITION#'
												+ transitionId
												+ '] No Transition ('
												+ transitionName
												+ ') or transition end event not supported.');

								// TODO is it needed to remove ui5strap-hidden
								// class here and make a RAF?
								this.$next
										&& this.$next
												.removeClass('ui5strap-hidden');

								ui5strap.polyfill
										.requestAnimationFrame(function() {
											currentRootCallback
													&& currentRootCallback
															.call(_this);
											nextRootCallback
													&& nextRootCallback
															.call(_this);
										});
							}

						};

					};

					

					

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
					ui5strap.Layer = {
						layers : {}
					};

					/**
					 * Registers a new layer
					 * 
					 * @Public
					 */
					ui5strap.Layer.register = function(layerId, $layer) {
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
					ui5strap.Layer.get = function(layerId) {
						return this.layers[layerId];
					};

					/**
					 * @Public
					 * @Static
					 */
					ui5strap.Layer.unregister = function(layerId) {
						delete this.layers[layerId];
					};

					/**
					 * @Public
					 * @Static
					 */
					ui5strap.Layer.isVisible = function(layerId) {
						return this.layers[layerId]
								&& this.layers[layerId].visible;
					};

					/**
					 * @Public
					 * @Static
					 */
					ui5strap.Layer.setVisible = function(layerId, visible,
							callback) {

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
							if(visible){
								$layer.removeClass("ui5strap-invisible ui5strap-hidden");
							}
							else{
								$layer.addClass("ui5strap-invisible ui5strap-hidden");
							}

							// Call the existing callback
							layer.busy(null);

							callback && callback();

							return;
						}

						//Prepare Layer for transition
						if (visible) {
							$layer.removeClass("ui5strap-hidden").addClass("ui5strap-invisible");
						}
						else{
							//TODO Should we enable this?
							$layer.removeClass("ui5strap-hidden ui5strap-invisible");
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
									$layer.addClass("ui5strap-hidden").removeClass("ui5strap-invisible");
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

						// Start Transition
						ui5strap.polyfill.requestAnimationFrame(function() {
							// Transition end event
							$layer.one(ui5strap.support.transitionEndEvent,
									transCallback);

							// Start transition
							ui5strap.polyfill.requestAnimationFrame(function() {
								// Transition timeout
								transTimeout = window.setTimeout(transCallback,
										ui5strap.options.layerTimeout);
								
								$layer.toggleClass("ui5strap-invisible", !visible);
								
							});
						});
					};

					/*
					 * -----
					 * 
					 * Utils
					 * 
					 * -----
					 */

					/**
					 * @Package
					 */
					ui5strap.Utils = {};

					/**
					 * Builds dynamic setters from a list of html tag attributes.
					 * @Public
					 */
					ui5strap.Utils.dynamicAttributes = function(controlProto,
							attributeNames) {
						for (var i = 0; i < attributeNames.length; i++) {
							ui5strap.Utils.dynamicAttribute(controlProto,
									attributeNames[i]);
						}
					};

					/**
					 * Builds a dynamic setter from a html tag attribute.
					 * @Public
					 */
					ui5strap.Utils.dynamicAttribute = function(controlProto,
							attributeName) {
						controlProto['set'
								+ jQuery.sap.charToUpperCase(attributeName, 0)] = function(
								newValue, suppressInvalidate) {
							ui5strap.Utils.updateAttribute(this, attributeName,
									newValue, suppressInvalidate);
						};
					};

					/**
					 * Builds dynamic setters from a list of html tag attributes.
					 * @Public
					 */
					ui5strap.Utils.updateAttribute = function(oControl,
							attributeName, newValue, suppressInvalidate) {
						if (oControl.getDomRef()) {
							oControl.$().attr(attributeName, newValue);
							oControl.setProperty(attributeName, newValue, true);
						} else {
							oControl.setProperty(attributeName, newValue, suppressInvalidate);
						}
					};

					// @deprecated
					ui5strap.Utils.dynamicClass = function(controlProto,
							propertyName, valueMapping) {
						controlProto['set'
								+ jQuery.sap.charToUpperCase(propertyName, 0)] = function(
								newValue, suppressInvalidate) {
							ui5strap.Utils.updateClass(this, this.$(),
									propertyName, newValue, valueMapping,
									suppressInvalidate);
						};
					};

					// @deprecated
					ui5strap.Utils.updateClass = function(oControl, $target,
							propertyName, newValue, valueMapping,
							suppressInvalidate) {
						if (oControl.getDomRef()) {
							var oldValue = oControl['get'
									+ jQuery.sap.charToUpperCase(propertyName,
											0)]();
							if (oldValue in valueMapping) {
								$target.removeClass(valueMapping[oldValue]);
							}
							if (newValue in valueMapping) {
								$target.addClass(valueMapping[newValue]);
							}

							oControl.setProperty(propertyName, newValue, true);
						} else {
							oControl.setProperty(propertyName, newValue,
									suppressInvalidate);
						}
					};

					// @deprecated
					ui5strap.Utils.dynamicText = function(controlProto) {
						controlProto.setText = function(newText,
								suppressInvalidate) {
							// console.log(newText, suppressInvalidate);
							ui5strap.Utils.updateText(this, this.$(), newText,
									suppressInvalidate);
						};
					};

					// @deprecated
					ui5strap.Utils.updateText = function(oControl, $target,
							newText, suppressInvalidate) {
						if (oControl.getDomRef()
								&& oControl.getContent().length === 0) {
							//Check if text needs to be parsed
							if(oControl.getParse && oControl.getParse()){
								$target.html(ui5strap.RenderUtils.parseText(newText));
							}
							else{
								$target.text(newText);
							}
							//Set property value without rerendering
							oControl.setProperty('text', newText, true);
						} else {
							//Default setter behaviour
							oControl.setProperty('text', newText,
									suppressInvalidate);
						}
					};

					/**
					 * @Static
					 * @Public
					 * @deprecated Use jQuery.sap.getObject instead.
					 */
					ui5strap.Utils.getObject = function(packageString, levelsUp) {
						if (!levelsUp) {
							levelsUp = 0;
						}

						var classParts = packageString.split('.');
						if (!(classParts[0] in window)) {
							return;
						}

						var constructor = window[classParts[0]];

						for (var i = 1; i < classParts.length - levelsUp; i++) {
							if (!(classParts[i] in constructor)) {
								return;
							}
							constructor = constructor[classParts[i]];
						}

						return constructor;
					};

					/**
					 * @Static
					 * @Public
					 */
					ui5strap.Utils.createObject = function(packageString) {
						var Constructor = this.getObject(packageString);
						return new Constructor();
					};

					/**
					 * @Static
					 * @Public
					 */
					ui5strap.Utils.queryToObject = function(query) {
						var vars = query.split('&'), obj = {};

						for (var i = 0; i < vars.length; i++) {
							var pair = vars[i].split('=');
							obj[pair[0]] = pair[1];
						}

						return obj;
					};

					/**
					 * @Static
					 * @Public
					 */
					ui5strap.Utils.parseIContent = function(iContent) {
						var iContentType = typeof iContent;

						if (iContentType === 'string') {
							if (jQuery.sap.startsWith(iContent, "?")) {
								return ui5strap.Utils.queryToObject(iContent
										.slice(1));
							}
						}

						return iContent;
					};

					/**
					 * @Static
					 * @Public
					 */
					ui5strap.Utils.qualifyURL = function(url) {
						var a = document.createElement('a');
						a.href = url;
						return a.href;
					};

					/**
					 * @Static
					 * @Public
					 */
					ui5strap.Utils.urlOrigin = function(url) {
						var a = document.createElement('a');
						a.href = url;

						var origin = a.protocol + "//" + a.host;
					};

					/**
					 * Transfers a property propagation from one to an other
					 * control.
					 * 
					 * @Public
					 * @Static
					 */
					ui5strap.Utils.addPropertyPropagation = function(
							fromControl, toControl) {
						toControl.oPropagatedProperties = fromControl
								._getPropertiesToPropagate();

						if (toControl.hasModel()) {
							toControl.updateBindingContext(false, true,
									undefined, true);
							toControl.updateBindings(true, null); // TODO
							// could be
							// restricted
							// to models
							// that
							// changed
							toControl.propagateProperties(true);
						}
					};

					/**
					 * Finds the closest parent control of type TargetType.
					 * 
					 * @Public
					 * @Static
					 */
					ui5strap.Utils.findClosestParentControl = function(control,
							TargetType) {
						var parentControl = control, maxDepth = 20, i = 0;
						while (parentControl && !(parentControl instanceof TargetType)) {
							parentControl = parentControl.getParent()
							i++;
							if (i >= maxDepth) {
								jQuery.sap.log
										.warning("Cannot find parent control: max depth reached.");
								parentControl = null;
							}
						}

						return parentControl;
					};

					/*
					 * ---------
					 * 
					 * Rendering
					 * 
					 * ---------
					 */

					/**
					 * @Package
					 * @Public
					 */
					ui5strap.RenderUtils = {};

					/**
					 * Renders title content, used in Panel
					 * 
					 * @Public
					 * @Static
					 */
					ui5strap.RenderUtils.renderTitleContent = function(rm,
							oControl, text) {
						var content = oControl.getTitleContent(), contentPlacement = oControl
								.getTitleContentPlacement(), text = text
								|| oControl.getTitle();

						if (contentPlacement === ui5strap.ContentPlacement.End) {
							rm.writeEscaped(text);
						}

						for (var i = 0; i < content.length; i++) {
							rm.renderControl(content[i]);
						}

						if (contentPlacement === ui5strap.ContentPlacement.Start) {
							rm.writeEscaped(text);
						}
					};

					/**
					 * parse map
					 */
					ui5strap.RenderUtils.parseMap = {
						'[strong]' : '<strong>',
						'[/strong]' : '</strong>',
						'[em]' : '<em>',
						'[/em]' : '</em>',
						'[small]' : '<small>',
						'[/small]' : '</small>',
						'[span]' : '<span>',
						'[/span]' : '</span>'
					};

					/**
					 * Parses BBCode inside text
					 * 
					 * @Public
					 * @Static
					 */
					ui5strap.RenderUtils.parseText = function(text) {
						return text
								.replace(
										/\[\/?strong\]|\[\/?em\]|\[\/?small\]|\[\/?span\]/gi,
										function(matched) {
											return ui5strap.RenderUtils.parseMap[matched];
										});
					};

					/**
					 * Default rendering for controls that have both text
					 * property and content aggregation
					 * 
					 * @Public
					 * @Static
					 */
					ui5strap.RenderUtils.renderContent = function(rm, oControl) {
						var content = oControl.getContent(), contentPlacement = oControl
								.getContentPlacement(), text = oControl.getText
								&& oControl.getText(), parse = oControl.getParse && oControl.getParse();

						if (contentPlacement === ui5strap.ContentPlacement.End) {
							if (parse) {
								rm.write(ui5strap.RenderUtils.parseText(text));
							} else {
								rm.writeEscaped(text);
							}
						}

						for (var i = 0; i < content.length; i++) {
							rm.renderControl(content[i]);
						}

						if (contentPlacement === ui5strap.ContentPlacement.Start) {
							if (parse) {
								rm.write(ui5strap.RenderUtils.parseText(text));
							} else {
								rm.writeEscaped(text);
							}
						}
					};

					/**
					 * Trail mapping
					 */
					ui5strap.RenderUtils.trailHtml = {
						Space : ' ',
						DoubleSpace : '&nbsp; ',
						Break : '<br />'
					};

					/**
					 * Renders the trail after inline controls
					 */
					ui5strap.RenderUtils.renderTrail = function(rm, oControl,
							text) {
						var trail = oControl.getTrail();

						if (trail !== ui5strap.TrailHtml.None) {
							rm.write(this.trailHtml[trail]);
						}
					};

					/**
					 * @deprecated
					 */
					ui5strap.RenderUtils.alignment = function(rm, oControl,
							navbarClass, sidebarClass) {
						jQuery.sap.log.warning("ui5strap.RenderUtils.alignment is deprecated. Use PositionSupport instead.");
						
						var align = oControl.getAlign(), Alignment = ui5strap.Alignment;

						if (align !== Alignment.Default) {
							rm.addClass(ui5strap.BSAlignment[align]);
						}

						/*
						 * This are special options for Button, ButtonGroup, Nav
						 * and Form to show properly inside NavBar controls
						 * 
						 * @deprecated
						 */
						if (typeof navbarClass === 'string') {
							if (align === Alignment.NavBar
									|| align === Alignment.NavBarLeft
									|| align === Alignment.NavBarRight) {
								jQuery.sap.log
										.warning("Using Alignment.NavBar* options is deprecated.");
								rm.addClass(navbarClass);
							}
						}

						/*
						 * This are special options for Nav controls to show
						 * properly inside Sidebar controls
						 * 
						 * @deprecated
						 */
						if (typeof sidebarClass === 'string') {
							if (align === Alignment.Sidebar) {
								jQuery.sap.log
										.warning("Using Alignment.Sidebar options is deprecated.");
								rm.addClass(sidebarClass);
							}
						}
					};

					/**
					 * Responsive visibility
					 * 
					 * @Public
					 * @deprecated
					 */
					ui5strap.RenderUtils.visibility = function(rm, oControl) {
						jQuery.sap.log.warning("ui5strap.RenderUtils.visibility is deprecated! Use BaseSupport instead.");
						
						var visibility = visibilityExtraSmall = oControl
								.getVisibilityExtraSmall(), visibilitySmall = oControl
								.getVisibilitySmall(), visibilityMedium = oControl
								.getVisibilityMedium(), visibilityLarge = oControl
								.getVisibilityLarge(), Visibility = ui5strap.Visibility;

						var resultHidden = [ "", "", "", "" ], inheritHide = false;

						// Visibility for EXTRA_SMALL screens
						if (visibilityExtraSmall === Visibility.Visible) {
							// Visible on EXTRA_SMALL
							resultHidden[0] = "";
							inheritHide = false;
						} else if (inheritHide
								|| visibilityExtraSmall === Visibility.Hidden) {
							// Hidden on EXTRA_SMALL
							resultHidden[0] = "ui5strap-hide-xs";
							inheritHide = true;
						}

						// Visibility for SMALL screens
						if (visibilitySmall === Visibility.Visible) {
							// Visible on SMALL
							resultHidden[1] = "";
							inheritHide = false;
						} else if (inheritHide
								|| visibilitySmall === Visibility.Hidden) {
							// Hidden on SMALL
							resultHidden[1] = "ui5strap-hide-sm";
							inheritHide = true;
						}

						// Visibility for MEDIUM screens
						if (visibilityMedium === Visibility.Visible) {
							// Visible on MEDIUM
							resultHidden[2] = "";
							inheritHide = false;
						} else if (inheritHide
								|| visibilityMedium === Visibility.Hidden) {
							// Hidden on MEDIUM
							resultHidden[2] = "ui5strap-hide-md";
							inheritHide = true;
						}

						// Visibility for LARGE screens
						if (visibilityLarge === Visibility.Visible) {
							// Visible on LARGE
							resultHidden[3] = "";
						} else if (inheritHide
								|| visibilityLarge === Visibility.Hidden) {
							// Hidden on LARGE
							resultHidden[3] = "ui5strap-hide-lg";
						}

						resultHidden = resultHidden.join(" ");
						rm.addClass(resultHidden);

					};

					/*
					 * ------
					 * 
					 * Script
					 * 
					 * ------
					 */
					ui5strap.ScriptBlock = function() {
						this._pending = {};
						this._order = [];
						this._pendingRequests = 0;
						this._buffer = '';

						var _this = this;

						/**
						 * @Private
						 */
						var _successCallback = function(response, callback) {
							_this._pending[this.url]["script"] = response;

							_this._pendingRequests--;

							if (0 === _this._pendingRequests) {
								for (var i = 0; i < _this._order.length; i++) {
									if (!_this._order[i].script) {
										throw new Error(
												'Could not append script to buffer: '
														+ _this._order[i].url);
									}
									_this._buffer = _this._buffer.concat(
											"\n;\n", _this._order[i].script);
								}

								_this._pending = {};
								_this._order = [];

								callback && callback();
							}
						};

						/**
						 * @Public
						 */
						this.load = function(scripts, callback) {
							if (0 < this._pendingRequests
									|| this._order.length > 0) {
								throw new Error(
										'Could not load scripts: requests still pending.');
							}

							this._pendingRequests = scripts.length;

							for (var i = 0; i < this._pendingRequests; i++) {
								var scriptUrl = scripts[i], scriptData = {
									"index" : i,
									"url" : scriptUrl,
									"script" : null
								};

								this._pending[scriptUrl] = scriptData;
								this._order.push(scriptData);

								jQuery.ajax({
									url : scriptUrl,
									dataType : "text",
									success : function(response) {
										_successCallback.call(this, response,
												callback);
									},
									error : function() {
										throw new Error(
												'Could not load script: '
														+ scriptUrl);
									}
								});
							}
						};

						/**
						 * @Public
						 */
						this.execute = function(useEval) {
							if ('' === this._buffer) {
								return false;
							}
							var returnValue = null;
							if (true === useEval) {
								returnValue = eval.call(window, this._buffer);
							} else {
								returnValue = (new Function(this._buffer))(); // .call(window);
							}
							this._buffer = '';

							return returnValue;
						};
					};

					/*
					 * -------
					 * 
					 * Require
					 * 
					 * -------
					 */

					/**
					 * Require one or more JavaScript Module, evaluated as one
					 * large script block.
					 * 
					 * @deprecated
					 */
					ui5strap.require = function(modules, callback) {
						var _this = this;

						if (typeof modules === 'string') {
							modules = [ modules ];
						}

						jQuery.sap.log.debug('[LIBRARY] require '
								+ modules.join(', '));

						var loadModules = [];
						for (var i = 0; i < modules.length; i++) {
							var moduleName = modules[i], scriptUrl = jQuery.sap
									.getModulePath(moduleName)
									+ '.js';

							if (!jQuery.sap.getObject(moduleName)) {
								loadModules.push(scriptUrl);
							}
						}

						if (loadModules.length === 0) {
							callback && callback();
						} else {
							var scriptBlock = new ui5strap.ScriptBlock();
							scriptBlock.load(loadModules, function() {
								scriptBlock.execute();

								callback && callback();
							});
						}

					};

					/*
					 * ----------
					 * 
					 * Read Files
					 * 
					 * ----------
					 */

					/**
					 * Read a text file via GET
					 */
					ui5strap.readTextFile = function(url, dataType, success,
							error) {
						jQuery.ajax({
							"dataType" : "json",
							"url" : url,
							"success" : success,
							"error" : error
						});
					};

					// End of library
					return ui5strap;

				});

/*
 * var _timeMarks = {}, _addTimeMark = function(scope, group, markName){ var
 * label = scope + "--" + group, tm = _timeMarks[label];
 * 
 * if(!tm){ tm = []; _timeMarks[label] = tm; }
 * 
 * if(window.performance && performance.now){ tm.push([markName,
 * performance.now()]); } else{ tm.push([markName, (new Date()).getTime()]); }
 * 
 * if(tm.length > 1){ var l1 = tm[tm.length-2], l2 = tm[tm.length-1];
 * jQuery.sap.log.info( label + " [" + l1[0] + "] -> [" + l2[0] + "] : " +
 * (l2[1] - l1[1]) + " millies." ); } };
 */