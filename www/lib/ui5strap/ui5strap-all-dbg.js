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
				[ 'jquery.sap.global', 'sap/ui/Device', 'sap/ui/core/library',
						'jquery.sap.mobile' // referenced here in case the Core
				// decides to throw it out.
				],
				function(jQuery, Device) {

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

								version : "0.10.1-SNAPSHOT",

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
					 * Options
					 * 
					 * -------
					 */

					// @deprecated
					var tapSupport = sap.ui.Device.support.touch;

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
					 * -----
					 * 
					 * Types
					 * 
					 * -----
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
						Hidden : "Hidden"
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
						Multiple : "Multiple",

						// Deprecated
						SingleMaster : "SingleMaster",
						Master : "Master"

					};

					/*
					 * ContainerType Only used by ui5strap.Container
					 */
					ui5strap.ContainerType = {
						// Plain HTML <div>
						Default : "Default",

						// Plain HTML <span>
						Text : "Text",

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
					ui5strap.ResponsiveTransition = function(data) {
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

						this._skip = transString === "ui5strap-trans-all-type-none";

						this._transitions = transString;

						if (transSpeed && transitionSpeed !== "normal") {
							this._transitions += " ui5strap-transition-speed-"
									+ transSpeed;
						}

						this._prepared = false;
						this._executed = false;

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

							this._prepared = true;

							if (!ui5strap.support.transitionEndEvent
									|| this._skip) {
								this._data.$next
										&& this._data.$next
												.removeClass('ui5strap-hidden');

								return;
							}

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

						/**
						 * Should always be surrounded by a RAF.
						 * 
						 * @Public
						 */
						this.execute = function(callbackCurrent, callbackNext) {
							var _this = this;

							if (!this._prepared) {
								throw new Error(
										'Cannot execute responsive transition: not prepared!');
							}

							if (this._executed) {
								throw new Error(
										'Cannot execute responsive transition: already executed!');
							}

							this._executed = true;
							this._neca = false;
							this._cuca = false;

							if (ui5strap.support.transitionEndEvent
									&& !this._skip) {
								jQuery.sap.log.debug("[TRANS#" + this._data.id
										+ "] Executing '" + _this._transitions
										+ "'");

								if (callbackCurrent && this._data.$current) {
									var _currentTimout = window
											.setTimeout(
													function() {
														if (_this._cuca) {
															return;
														}
														_this._cuca = true;
														jQuery.sap.log
																.warning('[TRANS#'
																		+ _this._data.id
																		+ ' ('
																		+ _this._transitions
																		+ ')] Hiding page caused a timeout.');
														callbackCurrent
																.call(_this);
													},
													ui5strap.options.transitionTimeout);

									this._data.$current
											.one(
													ui5strap.support.transitionEndEvent,
													function() {
														if (_this._cuca) {
															return;
														}
														_this._cuca = true;
														window
																.clearTimeout(_currentTimout);
														callbackCurrent
																.call(_this);
													});
								}

								if (callbackNext && this._data.$next) {
									var _nextTimout = window
											.setTimeout(
													function() {
														if (_this._neca) {
															return;
														}
														_this._neca = true;
														jQuery.sap.log
																.warning('[TRANS#'
																		+ _this._data.id
																		+ ' ('
																		+ _this._transitions
																		+ ')] Showing page caused a timeout.');
														callbackNext
																.call(_this);
													},
													ui5strap.options.transitionTimeout);

									this._data.$next
											.one(
													ui5strap.support.transitionEndEvent,
													function() {
														if (_this._neca) {
															return;
														}
														_this._neca = true;
														window
																.clearTimeout(_nextTimout);
														callbackNext
																.call(_this);
													});
								}

								this._data.$current
										&& this._data.$current
												.addClass('ui5strap-transition-current-out');
								this._data.$next
										&& this._data.$next
												.removeClass('ui5strap-transition-next');
							} else {
								jQuery.sap.log.debug("[TRANS#" + _this._data.id
										+ "] Transition skipped: '"
										+ _this._transitions + "'");

								callbackCurrent && callbackCurrent.call(_this);
								callbackNext && callbackNext.call(_this);
							}

						};

					};

					/*
					 * -------
					 * 
					 * Wrapper
					 * 
					 * -------
					 */

					// Object
					ui5strap.Object = sap.ui.base.Object;

					// Managed Object
					ui5strap.ManagedObject = sap.ui.base.ManagedObject;

					// Element
					ui5strap.Element = sap.ui.core.Element;

					// Control
					ui5strap.Control = sap.ui.core.Control;

					// JSONModel
					ui5strap.JSONModel = sap.ui.model.json.JSONModel;

					// View
					ui5strap.View = sap.ui.core.mvc.View;

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
							$layer.css({
								display : visible ? 'block' : 'none',
								opacity : visible ? 1 : 0
							});

							// Call the existing callback
							layer.busy(null);

							callback && callback();

							return;
						}

						if (visible) {
							$layer.css({
								display : 'block',
								opacity : 0
							});
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
									$layer.css('display', 'none');
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
								$layer.css('opacity', visible ? 1 : 0);
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

					/*
					 * @Package
					 */
					ui5strap.Utils = {};

					// @deprecated
					ui5strap.Utils.dynamicAttributes = function(controlProto,
							attributeNames) {
						for (var i = 0; i < attributeNames.length; i++) {
							ui5strap.Utils.dynamicAttribute(controlProto,
									attributeNames[i]);
						}
					};

					// @deprecated
					ui5strap.Utils.dynamicAttribute = function(controlProto,
							attributeName) {
						controlProto['set'
								+ jQuery.sap.charToUpperCase(attributeName, 0)] = function(
								newValue) {
							ui5strap.Utils.updateAttribute(this, attributeName,
									newValue);
						};
					};

					// @deprecated
					ui5strap.Utils.updateAttribute = function(oControl,
							attributeName, newValue) {
						if (oControl.getDomRef()) {
							oControl.$().attr(attributeName, newValue);
							oControl.setProperty(attributeName, newValue, true);
						} else {
							oControl.setProperty(attributeName, newValue);
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
							$target.text(newText);
							oControl.setProperty('text', newText, true);
						} else {
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
						while (!(parentControl instanceof TargetType)) {
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
					ui5strap.RenderUtils.renderContent = function(rm, oControl,
							text, dontEscape) {
						var content = oControl.getContent(), contentPlacement = oControl
								.getContentPlacement(), text = text
								|| oControl.getText();

						if (contentPlacement === ui5strap.ContentPlacement.End) {
							if (dontEscape) {
								rm.write(text);
							} else {
								rm.writeEscaped(text);
							}
						}

						for (var i = 0; i < content.length; i++) {
							rm.renderControl(content[i]);
						}

						if (contentPlacement === ui5strap.ContentPlacement.Start) {
							if (dontEscape) {
								rm.write(text);
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
					 */
					ui5strap.RenderUtils.visibility = function(rm, oControl) {
						var visibility = oControl.getVisibility(), visibilityExtraSmall = oControl
								.getVisibilityExtraSmall(), visibilitySmall = oControl
								.getVisibilitySmall(), visibilityMedium = oControl
								.getVisibilityMedium(), visibilityLarge = oControl
								.getVisibilityLarge(), Visibility = ui5strap.Visibility;

						var resultHidden = [ "", "", "", "" ], inheritHide = false;

						// Generic visibility
						// TODO check if necccessary and working at all
						if (visibility !== Visibility.Default) {

							if (visibility === Visibility.Hidden) {
								resultHidden = [ "ui5strap-hide-xs",
										"ui5strap-hide-sm", "ui5strap-hide-md",
										"ui5strap-hide-lg" ];
								inheritHide = true;
							}
						}

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
 */;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionFunctions
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

sap.ui.define([], function(){
	
	var ActionFunctions = {};

	ActionFunctions.set = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._setParameter(paramKey, arguments[paramKey]);
			this._log.debug("{set} '" + paramKey + "' = '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.copy = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._copyParameter(paramKey, arguments[paramKey]);
			this._log.debug("{copy} '" + paramKey + "' => '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.move = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._moveParameter(paramKey, arguments[paramKey]);
			this._log.debug("{move} '" + paramKey + "' => '" + arguments[paramKey] + "'");
		}
	};
	
	ActionFunctions.data = function(args){
		if(!args.tgtParam){
			this._log.error("{func} missing argument 'tgtParam'");
		}
		var srcControl = args.srcControl;
		if(!args.srcControl){
			this._log.error("{func} missing argument 'srcControl'");
		}
		srcControl = this._getParameter(args.srcControl);
		if(!(srcControl instanceof ui5strap.Control)){
			this._log.error("{func} not an Control");
		}
		var data = args.dataKey ? srcControl.data(args.dataKey) : srcControl.data(); 
		
		this._setParameter(args.tgtParam, data);
	}; 

	ActionFunctions.not = function(arguments){
		if(!("srcParam" in arguments)){
			this._log.error("{func} missing argument 'srcParam'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			arguments.tgtParam = arguments.srcParam;
		}

		var srcParamValue = this._getParameter(arguments.srcParam);
		if(null === srcParamValue){
			this._log.error("{not} missing parameter '" + arguments.srcParam + "'");
			return false;
		}

		this._setParameter(arguments.tgtParam, !srcParamValue);
	};

	ActionFunctions["switch"] = function(arguments){
		if(!("srcParam" in arguments)){
			this._log.error("{func} missing argument 'srcParam'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			arguments.tgtParam = arguments.srcParam;
		}

		var srcParamValue = this._getParameter(arguments.srcParam);
		if(null === srcParamValue){
			this._log.error("{switch} missing parameter '" + arguments.srcParam + "'");
			return false;
		}

		var casesKeys = Object.keys(arguments.cases),
			casesKeysLength = argumentKeys.length;
		for(var i = 0; i < casesKeysLength; i++){
			var switchValue = casesKeys[i];
			if(srcParamValue === switchValue){
				this._log.debug("{switch} set '" + arguments.tgtParam + "' = '" + arguments.cases[switchValue] + "'");
				this._setParameter(arguments.tgtParam, arguments.cases[switchValue]);
				return true;
			}
		}
		if("default" in arguments){
			this._log.debug("{switch} set default '" + arguments.tgtParam + "' = '" + arguments["default"] + "'");
			this._setParameter(arguments.tgtParam, arguments["default"]);
			return true;
		}
		this._log.warning("{switch} no matching value found for parameter '" + arguments.srcParam + "'");
		return false;
	};

	ActionFunctions.jquery = function(arguments){
		if(!("selector" in arguments)){
			throw new Error("{jquery} missing argument 'selector'");
		}

		if(!("methodName" in arguments)){
			throw new Error("{jquery} missing argument 'methodName'");
		}

		if(!("methodArgs" in arguments)){
			throw new Error("{jquery} missing argument 'methodArgs'");
		}

		if(!("tgtParam" in arguments)){
			throw new Error("{jquery} missing argument 'tgtParam'");
		}

		var $el = jQuery(arguments.selector);

		if($el.size() === 0){
			return false;
		}

		if(!(arguments.methodName in $el)){
			throw new Error($el + " has no method '" + arguments.methodName + "'");
		}

		console.log(arguments);
		
		var functionArgs = [];
		
		for(var i = 0; i < arguments.methodArgs.length; i++){
			var funcArg = arguments.methodArgs[i];
			
			var srcParamValue = this._getParameter(funcArg);
			if(null === srcParamValue){
				this._log.error("{func} missing parameter '" + funcArg + "'");
				return false;
			}
			functionArgs.push(srcParamValue);
		}

		var methodResult = $el[arguments.methodName].apply($el, functionArgs);
		
		this._setParameter(arguments.tgtParam, methodResult);
	};

	ActionFunctions.func = function(arguments){
		

		if(!("funcName" in arguments)){
			this._log.error("{func} missing argument 'funcName'");
			return false;
		}

		if(!("funcArgs" in arguments)){
			this._log.error("{func} missing argument 'funcArgs'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			this._log.error("{func} missing argument 'tgtParam'");
			return false;
		}

		var functionArgs = [];
		
		for(var i = 0; i < arguments.funcArgs.length; i++){
			var funcArg = arguments.funcArgs[i];
			var srcParamValue = this._getParameter(funcArg);
			if(null === srcParamValue){
				this._log.error("{func} missing parameter '" + funcArg + "'");
				return false;
			}
			functionArgs.push(srcParamValue);
		}

		var functionRef = jQuery.coolui5.getObject(arguments.funcName);
		var functionThis = jQuery.coolui5.getObject(arguments.funcName, 1);


		var functionResult = functionRef.apply(functionThis, functionArgs);

		this._setParameter(arguments.tgtParam, functionResult);
		
		return true;
	};

	//Return Module Constructor
	return ActionFunctions;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionContext
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

sap.ui.define(['./library', './ActionFunctions'], function(library, ActionFunctions){

	/*
	* @constructor
	*/ 
	var ActionContext = ui5strap.Object.extend('ui5strap.ActionContext', {
		"constructor" : function(action){
			_init(this, action);
		}
	}),
	ActionContextProto = ActionContext.prototype;

	ActionContext.NUMBER = 0;

	ActionContext.PREFIX = "__";
	ActionContext.RESOLVE = "=";
	
	//Action Name
	ActionContext.PARAM_ACTION = 'action';
	
	//AM Modules
	ActionContext.PARAM_MODULES = 'modules';
	ActionContext.PARAM_TASKS = 'TASKS';
	ActionContext.PARAM_MODULE = 'TYPE';
	
	//Action Events
	ActionContext.PARAM_EVENTS = 'events';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'functions';
	
	ActionContext.WORKPOOL = "action";
	
	/**
	* Init log
	* @Private
	*/
	var _initLog = function(_this){
		_this._log = {
			debug : function (message) {
				_this.app.log.debug(_this + ' ' + message);
			},

			warning : function (message) {
				_this.app.log.warning(_this + ' ' + message);
			},

			error : function (message) {
				_this.app.log.error(_this + ' ' + message);
			},

			info : function (message) {
				_this.app.log.info(_this + ' ' + message);
			},

			fatal : function (message) {
				_this.app.log.fatal(_this + ' ' + message);
			}
		};
	};

	/**
	 * @PostConstruct
	* @Private
	*/
	var _init = function(_this, action){
		
		//Validate
		if(!action.app || !action.parameters || ('object' !== typeof action.parameters)){
			throw new Error("Constructor argument must contain 'app' reference and 'parameters' object.");
		}
		
		//App Reference
		_this.app = action.app;
		
		//Default parameters
		_this.defaultParameters = action.parameters;
			
		//Pool
		_this.action = _buildPool(_this.defaultParameters, [], _this);
		
		//Old Pool
		//@deprecated
		_this.parameters = _this.action;
		
		if(_this.action.DEBUG && console){
			console.log(_this);
		}
		
		//Event Source
		if(action.eventSource){
			_this.eventSource = action.eventSource;
		}
		
		//Event Parameters
		if(action.eventParameters){
			_this.eventParameters = action.eventParameters;
		}
		
		//OpenUI5 Standard Controller
		if(action.controller){
			//Add Controller reference to context
			_this.controller = action.controller;

			//View
			_this.view = action.controller.getView();

			//Make viewData available
			_this.viewData = _this.view.getViewData();
		}

		//Custom data
		if(action.data){
			//Add custom Data to context
			_this.data = action.data;
		}

		//Local Storage && Session Storage
		_this.localStorage = localStorage ? localStorage : {};
		_this.sessionStorage = sessionStorage ? sessionStorage : {};
		
		_this.window = window;
		_this.document = document;
		_this.global = window;
		_this.core = sap.ui.getCore();
		_this.jQuery = jQuery;
		_this.jQuerySap = jQuery.sap;
		
		//Number
		ActionContext.NUMBER ++;
		_this._actionNumber = ActionContext.NUMBER;

		//Call stack
		_this._callStack = [];
		
		_this._loopDir = {};

		//Init Log
		_initLog(_this);
	};
	
	/**
	 * @Constructor
	 * @Private
	 */
	var _ActionExpression = function(expression){
		this._expression = expression;
		
		this.evaluate = function(context, task){
			return context.get(task, this._expression);
		};
	};
	
	/**
	 * @Constructor
	 * @Private
	 */
	var _ActionExpressionResolveObject = function(parent, key, pointer, path){
		this._parentPointer = parent;
		this._viewName = key;
		
		var newObject = new _ActionParameterObject,
			keys = Object.keys(pointer),
			keysLength = keys.length;
		for(var i = 0; i < keysLength; i++){
			var newPath = path.slice(0);
			newPath.push(keys[i]);
		
			newObject[keys[i]] = _buildPool(pointer[keys[i]], newPath, pointer);
		}
		
		this._controlDef = newObject;
	};
	
	_ActionExpressionResolveObject.prototype = new _ActionExpression();
	
	_ActionExpressionResolveObject.prototype.evaluate = function(context, task){
		return context.resolve(task, this._controlDef);
	};
	
	
	/**
	 * @Constructor
	 * @Private
	 */
	var _ActionExpressionFindControl = function(parent, key, pointer, path){
		this._parentPointer = parent;
		this._controlName = key;
		
		var newObject = new _ActionParameterObject,
			keys = Object.keys(pointer),
			keysLength = keys.length;
		for(var i = 0; i < keysLength; i++){
			var newPath = path.slice(0);
			newPath.push(keys[i]);
		
			newObject[keys[i]] = _buildPool(pointer[keys[i]], newPath, pointer);
		}
		
		this._controlDef = newObject;
	};
	
	_ActionExpressionFindControl.prototype = new _ActionExpression();
	
	/**
	 * @Public
	 */
	_ActionExpressionFindControl.prototype.evaluate = function(context, task){
		var controlOrDef = this._controlDef;
		if(typeof controlOrDef === "object"){
			if(!(controlOrDef instanceof ui5strap.Control)){
				var mode = context.resolve(task, controlOrDef.SOURCE, true),
					moduleName = context.resolve(task, controlOrDef.TYPE, true);
				
				if(!mode || !moduleName){
					throw new Error("Please provide both 'mode' and 'type' for Control '" + this._controlName + "'");
				}
				
				jQuery.sap.require(moduleName);
				var Constructor = jQuery.sap.getObject(moduleName);
				
				if(!Constructor){
					throw new Error("'" + moduleName + "' is not a valid Control!");
				}
				
				if("New" === mode){
					var moduleSettings = context.resolve(task, controlOrDef.SETTINGS);
					controlOrDef = new Constructor(moduleSettings);
				}
				else if("Event" === mode){
					var parameter = context.resolve(task, controlOrDef.parameter);
					if(parameter){
						controlOrDef = context.eventParameters[parameter];
					}
					else{
						controlOrDef = context.eventSource;
					}
				}
				else if("Root" === mode){
					controlOrDef = context.app.getRootControl();
				}
				else if("View" === mode){
					var controlId = context.resolve(task, controlOrDef.CONTROL_ID, true),
						viewId = context.resolve(task, controlOrDef.VIEW_ID);
					
					if(controlId){
						if(!viewId){
							if(context.view){
								viewId = context.view.getId();
							}
							else{
								throw new Error("Please provide a viewId to select Control '" + this._controlName + "'!");
							}
						}
						controlOrDef = context.app.getControl(controlId, viewId);
					}
					else{
						if(context.view){
							controlOrDef = context.view;
						}
						else{
							throw new Error("Please provide a controlId to select Control '" + this._controlName + "'!");
						}
					}
				}
				else{
					throw new Error("Please provide a mode for Control '" + this._controlName + "'!" );
					
				}
				
				if(!controlOrDef){
					throw new Error("Cannot find control '" + this._controlName + "'!");
				}
				else if(!(controlOrDef instanceof Constructor)){
					throw new Error("Control '" + this._controlName + "' must be an instance of '" + moduleName + "', '" + controlOrDef + "' given!" );
				}
				
				return controlOrDef;
			}
		}
		else{
			throw new Error("CONTROLS must contain control instances only.");
		}
	};
	
	var _ActionParameterObject = function(){
		
	};
	
	/**
	 * @Static
	 * @Private
	 */
	var _buildPool = function(pointer, path, parent){
		var pointerType = typeof pointer;
		
		if(pointerType === "string"){
			var firstChar = pointer.charAt(0);
			if(firstChar === ActionContext.RESOLVE){
				return new _ActionExpression(pointer.substring(1).trim());
			}
			else if(firstChar === "\\" && pointer.charAt(1) === ActionContext.RESOLVE){
				return pointer.substring(1);
			}
			else{
				return pointer;
			}
		}
		else if(pointerType === "function"){
			throw new Error("Action parameters must not contain functions!");
		}
		else if(pointerType === "object"){
			var isArray = jQuery.isArray(pointer);
			
			if(isArray){
				//Array
				var newArray = [],
					arrayLength = pointer.length;
				for(var i = 0; i < arrayLength; i++){
					var newPath = path.slice(0);
					newPath.push(i);
					newArray[i] = _buildPool(pointer[i], newPath, pointer);
				}
				newArray._isActionArray = true;
				return newArray;
			}
			else{
				if(path.length === 3){
					var rootKey = path[1];
					if(rootKey === "CONTROLS"){
						return new _ActionExpressionFindControl(parent, path[2], pointer, path);
					}
					else if(rootKey === "VIEWS"){
						return new _ActionExpressionResolveObject(parent, path[2], pointer, path);
					}
				}
				
				//Object
				var newObject = new _ActionParameterObject(),
					keys = Object.keys(pointer),
					keysLength = keys.length;
				for(var i = 0; i < keysLength; i++){
					var newPath = path.slice(0);
					newPath.push(keys[i]);
					
					newObject[keys[i]] = _buildPool(pointer[keys[i]], newPath, pointer);
				}
				
				return newObject;
			}
		}
		else{
			return pointer;
		}
	};
	
	/**
	* Returns String representation of this context.
	* 
	* @Public
	*/
	ActionContextProto.toString = function(){
		return '[ACTION#' + this._actionNumber + ']';
	};
	
	/**
	 * @Public
	 * FIXME
	 */
	ActionContextProto.resolve = function(task, pointer, onlyString){
		if(pointer instanceof _ActionExpression){
			return pointer.evaluate(this, task);
		}
		else if(!onlyString && ("object" === typeof pointer)){
			if(pointer._isActionArray){
				for(var i = 0; i < pointer.length; i++){
					pointer[i] = this.resolve(task, pointer[i], true);
				}
			}
			else if(pointer instanceof _ActionParameterObject){
				var objectKeys = Object.keys(pointer),
					objectKeysLength = objectKeys.length;
			
				for(var i=0; i < objectKeysLength; i++){
					//Store back the value in the context
					pointer[objectKeys[i]] = this.resolve(task, pointer[objectKeys[i]], true);
				}
			}
		}
		return pointer;
	};
	
	/**
	 * @Private
	 */
	var _callParamFunction = function(_this, scope, func, paramString, task, isRoot){
		var args = null;
		if('' !== paramString){
			args = paramString.split(/,/);
		}
		else{
			args = [];
		}
		if(null === args){
			throw new Error("Cannot execute function: no parameters provided!");
		}
		
		for(var i = 0; i < args.length; i++){
			args[i] = _this.get(task, args[i].trim());
		}
		
		if(isRoot){
			args.unshift(task);
		}
		
		return func.apply(scope, args);
	};
	
	
	/**
	* Gets and evaluates a context parameter.
	* 
	* @Protected
	*/
	ActionContextProto.get = function(task, parameterKey){
		if(!parameterKey){
			throw new Error("Parameter key is required for get!");
		}
		
		//Check for conditional statement
		var qPos = parameterKey.indexOf('?');
		if(-1 !== qPos){
			var dPos = parameterKey.indexOf(':');
			if(-1 === dPos){
				throw new Error("Invalid expression: " + parameterKey);
			}
			var p1 = parameterKey.substring(0, qPos).trim(),
				p2 = parameterKey.substring(qPos + 1, dPos).trim(),
				p3 = parameterKey.substring(dPos + 1).trim();
			
			return this.get(task, p1) ? this.get(task, p2) : this.get(task, p3);
		}
		
		//Extract function parameters if any.
		var fPart = null,
			kPart = parameterKey,
			c1Pos = parameterKey.indexOf('(');
		if(-1 !== c1Pos){
			var c2Pos = parameterKey.length - 1;
			if(parameterKey.charAt(c2Pos) !== ')'){
				throw new Error("Invalid function part in " + parameterKey);
			}
			
			kPart = parameterKey.substring(0, c1Pos);
			
			if(c1Pos >= c2Pos - 1){
				fPart = "";
			}
			fPart = parameterKey.substring(c1Pos + 1, c2Pos).trim();
			
			if(kPart === ''){
				//Just brackets, no funtion
				var args = fPart.split(/,/);
				for(var i = 0; i < args.length; i++){
					this.get(task, args[i].trim());
				}
				
				return;
			}
		}
		
		//Check for relative path
		if(kPart.charAt(0) === "."){
			if(!task){
				throw new Error("Cannot resolve relative paramter without task reference!");
			}
			kPart = task.getScope() + kPart;
		}
		
		if(!kPart.match(/([a-zA-Z0-9_]+\.)*[a-zA-Z0-9_]+/)){
			throw new Error("Invalid parameter key for get: " + kPart);
		}
		
		if(this._loopDir["t_" + kPart]){
			throw new Error("Cannot access " + kPart + ": is locked by another process.");
		}
		this._loopDir["t_" + kPart] = true;
		
			
		var keyParts = kPart.split('.'),
				pointer = this,
				i=0;
			
		while(i < keyParts.length){
			var keyPart = keyParts[i];
			
			if(keyPart.charAt(0) === '_'){
				//throw new Error("Cannot access protected property '" + keyPart + "'.");
			}
			
			var prevPointer = pointer;
			pointer = pointer[keyPart];
			if(pointer){
				var functionApplied = false,
					pointerType = typeof pointer;
				
				if(i === keyParts.length - 1){
					//Last path part
					
					if(null !== fPart){
						if("function" === pointerType){
							jQuery.sap.log.info("Executing function '" + kPart + "' with arguments (" + fPart + ")");
							pointer = _callParamFunction(
										this, 
										prevPointer, 
										pointer, 
										fPart, 
										task, 
										keyParts.length === 1
							);
							functionApplied = true;
						}
						else{
							throw new Error("Cannot execute function '" + kPart + "': not a function!");
						}
					}
					
				}
				else{
					if("number" === pointerType || "boolean" === pointerType){
						//We cannot continue searching
						pointer = undefined;
						
						break;
					}
				}
				
				//Check if value contains expression
				if(pointer instanceof _ActionExpression){
					if(functionApplied){
						throw new Error("Function '" + kPart + "' must not return Action Expression!");
					}
					//Store back the value in the context
					prevPointer[keyPart] = pointer.evaluate(this, task);
				    
					pointer = prevPointer[keyPart];
				}
				
				i++;
			}
			else{
				if(i < keyParts.length - 1){
					throw new Error("'" + keyPart + "' is not defined in '" + kPart + "'");
				}
				else if(null !== fPart){
					throw new Error("Cannot execute function '" + keyPart + "': not a function!");
				}
				break;
			}
		}
		
		//console.log(kPart, fPart, pointer);
		this._loopDir["t_" + kPart] = false;
		
		return pointer;
	};
	
	/**
	 * Sets a value.
	* @Protected
	*/
	ActionContextProto.set = function(task, parameterKey, parameterValue){
		if(!parameterKey 
				|| -1 === parameterKey.indexOf('.') 
				|| -1 !== parameterKey.indexOf('(')){
			throw new Error("Invalid parameter key for set: " + parameterKey);
		}
		
		if(parameterKey.charAt(0) === "."){
			if(!task){
				throw new Error("Cannot resolve relative paramter without task reference!");
			}
			parameterKey = task.getScope() + parameterKey;
		}
		
		var keyParts = parameterKey.split('.'),
			pointer = this,
			i=0;
		
		while(i < keyParts.length){
			var keyPart = keyParts[i];
			
			if(i === keyParts.length - 1){
				if(pointer[keyPart] && ("function" === typeof pointer[keyPart])){
					//Value already exists, but its a function
					throw new Error("Cannot override parameter: '" + keyPart + "' is a function.");
				}
				//Set (or override) value
				pointer[keyPart] = parameterValue;
				
				return true;
			}
			else if(!(keyPart in pointer)){
				//Create new empty object
				//TODO if pointer[keypart] is a string we will land here too and override it!
				pointer[keyPart] = {};
			}
			
			var prevPointer = pointer;
			pointer = pointer[keyPart];
			
			if(null === pointer){
				throw new Error("Cannot write parameter: '" + keyPart + "' is null.");
			}
			else if(pointer instanceof _ActionExpression){
				//Store back the value in the context
				prevPointer[keyPart] = pointer.evaluate(this, task);
				
				pointer = prevPointer[keyPart];
			}
			
			if("object" !== typeof pointer){
				throw new Error("Cannot write parameter: '" + keyPart + "' is not an object.");
			}
			
			i++;
			
		}
		
		return false;
	};
	
	ActionContextProto["doaaa"] = function(task){
		
	};
	
	ActionContextProto.lang = {
			// !
			"not" : function(value){
					return !value;
			},
			
			// !!
			"notnot" : function(value){
				return !!value;
			},
			
			// ==
			"equal" : function(){
					if(arguments.length === 0){
						return true;
					}
					var cmp = arguments[0];
					for(var i = 1; i < arguments.length; i++){
						if(arguments[i] != cmp){
							return false;
						}
					}
					return true;
			},
			
			// !=
			"notEqual" : function(){
				if(arguments.length === 0){
					return false;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] != cmp){
						return true;
					}
				}
				return false;
			},
			
			// ===
			"same" : function(){
				if(arguments.length === 0){
					return true;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] !== cmp){
						return false;
					}
				}
				return true;
			},
			
			// !==
			"notSame" : function(){
				if(arguments.length === 0){
					return false;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] !== cmp){
						return true;
					}
				}
				return false;
			},
			
			// >
			"greaterThan" : function(v1, v2){
				return v1 > v2;
			},
			
			// <
			"lessThan" : function(v1, v2){
				return v1 < v2;
			},
			
			// >=
			"greaterEqualThan" : function(v1, v2){
				return v1 >= v2;
			},
			
			// <=
			"lessEqualThan" : function(v1, v2){
				return v1 <= v2;
			},
			
			// &&
			"and" : function(){
				var cmp = true;
				for(var i = 1; i < arguments.length; i++){
					cmp = cmp && arguments[i];
					if(!cmp){
						break;
					}
				}
				return cmp;
			},
			
			// ||
			"or" : function(){
				var cmp = false;
				for(var i = 1; i < arguments.length; i++){
					cmp = cmp || arguments[i];
					if(cmp){
						break;
					}
				}
				return cmp;
			}
			
	};
	
	/*
	 * 
	 * ------------------------------------------------
	 * ------------------------------------------------
	 * 
	 */
	
	/**
	* Apply functions
	* @deprecated
	* @private
	*/
	var _applyFunctions = function(_this, parameterKey){
		var paramFunctions = _this.get(null, parameterKey);

		if(paramFunctions){ //Expected array
			jQuery.sap.log.warning("Usage of context functions is deprecated and will be dropped.");
			var paramFunctionsLength = paramFunctions.length,
				availableFunctions = ActionFunctions;
			jQuery.sap.log.debug("CALLING " + paramFunctionsLength + " FUNCTIONS OF " + parameterKey);
				
			for( var i = 0; i < paramFunctionsLength; i++ ){
				var functionDef = paramFunctions[i],
					functionName = functionDef['function'];

				if(availableFunctions[functionName]){
					jQuery.sap.log.debug("Calling parameter function '" + functionName + "'");
					var funcResult = availableFunctions[functionName].call(_this, functionDef.args);
					if(false === funcResult){
						throw new Error("Parameter function '" + functionName + "' failed.");
					}
				}
				else{
					throw new Error('Invalid function: ' + functionName);
				}
			}
		}	

	};
	
	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._process = function(parameterScope){
		_applyFunctions(this, parameterScope + "." + ActionContext.PREFIX + ActionContext.PARAM_FUNCTIONS);
	};
	
	/**
	 * @deprecated
	 */
	ActionContextProto._getParameter = function(parameterKey, task){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._getParameter is deprecated. Use .get instead.");
		
		return this.get(task, parameterKey);
	}
	
	/**
	 * @deprecated
	 */
	ActionContextProto._setParameter = function(parameterKey, parameterValue, task){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._setParameter is deprecated. Use .set instead.");
		this.set(task, parameterKey, parameterValue);
	};
	
	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._deleteParameter = function(parameterKey){
			jQuery.sap.log.warning("ui5strap.ActionContext.prototype._deleteParameter is deprecated and will be dropped.");
			delete this.parameters[parameterKey];

			return this;
	};

	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._copyParameter = function(parameterKeySrc, parameterKeyTgt){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._copyParameter is deprecated and will be dropped.");
		var paramSrcValue = this.get(null, parameterKeySrc);
		if(null !== paramSrcValue){
			this.set(null, parameterKeyTgt, paramSrcValue);
		}

		return this;
	};

	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._moveParameter = function(parameterKeySrc, parameterKeyTgt){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._moveParameter is deprecated and will be dropped.");
		this._copyParameter(parameterKeySrc, parameterKeyTgt);
		this._deleteParameter(parameterKeySrc);

		return this;
	};

	//Return Module Constructor
	return ActionContext;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionModule
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

sap.ui.define(['./library', './ActionContext'], function(library, ActionContext){

	var ActionModule = ui5strap.Object.extend("ui5strap.ActionModule"),
		ActionModuleProto = ActionModule.prototype;

	/*
	* Name of the event that is triggered when the event is completed
	*/
	ActionModule.EVENT_COMPLETED = "completed";
	
	ActionModule.cacheable = true;
	
	/*
	* Namespace of the action module instance
	*/
	ActionModuleProto.namespace = 'task';

	/*
	* Defined parameters for this action module
	*/
	ActionModuleProto.parameters = {};

	/**
	* Initializes the action module
	* @PostConstruct
	*/
	ActionModuleProto.init = function(context, instanceDef){
		this.context = context;
		this._instanceDef = instanceDef;
		
		context._log.debug("INIT " + this);
		
		if(instanceDef.namespace){
			this.namespace = instanceDef.namespace;
		}
		else{
			//this.namespace = ActionModuleProto.namespace;
		}
		
		//Test if Namespace is valid
		if(jQuery.sap.startsWith(this.namespace, ActionContext.PREFIX)){
			throw new Error("Action namespace must not start with '" + ActionContext.PREFIX + "'!");
		}
		
		if(!context.action[this.namespace]){
			context.action[this.namespace] = {};
		}

		return this;
	};

	/**
	 * String representation of the Module
	 * @Public
	 */
	ActionModuleProto.toString = function(){
		return this._instanceDef.module + ' ' + this.context;
	};

	/**
	 * @Public
	 */
	ActionModuleProto.getScope = function(){
		return ActionContext.WORKPOOL + "." + this.namespace;
	};

	/**
	* Does same as ActionContext.prototype.get - plus type validation.
	* @Public
	*/
	ActionModuleProto.getParameter = function(paramKey, resolveAll){
		var paramDef = this.parameters[paramKey];
		
		if(!paramDef){
			throw new Error("Invalid definition for parameter '" + paramKey + "'.");
		}

		var paramDefType = paramDef.type,
			value = this.context.action[this.namespace][paramKey];
		
		if(value){
			value = this.context.resolve(this, value, !resolveAll);
		}
		
		if(('undefined' === typeof value) && ('undefined' !== typeof paramDef.defaultValue)){
			value = paramDef.defaultValue;
		}
		
		this.context.action[this.namespace][paramKey] = value;
		
		if(value && paramDefType){
			var parameterType = typeof value,
				defIsString = typeof paramDefType === 'string';
			
			if( (defIsString && parameterType !== paramDefType) || 
				(!defIsString && -1 === jQuery.inArray(parameterType, paramDefType) )
			){
				throw new Error(this + ": wrong type '" + parameterType + "' (expected: " + JSON.stringify(paramDefType) + ") for parameter '" + paramKey + "'.");
			}
		}
		
		return value;
	};
	
	/**
	 * Faster variant of ActionContext.prototype.get - only for task root paramaters!
	 * @Private
	 */
	var _expression = function(_this, parameterKey, defaultValue){
		var param = _this.context.action[_this.namespace][parameterKey];
		if(param){
			param = _this.context.resolve(_this, param, true);
		}
		
		if(('undefined' === typeof param) && ('undefined' !== typeof defaultValue)){
			param = defaultValue;
		}
		
		return param;
	};
	
	/**
	* Sets an action module specific parameter to the action context
	* @Public
	*/
	ActionModuleProto.setParameter = function(parameterKey, parameterValue){
		return this.context.set(this, "." + parameterKey, parameterValue);
	};

	/**
	* Execute the action module
	* @Public
	*/
	ActionModuleProto.execute = function(){
		this.context._log.debug("Executing Task " + this);
		
		//Apply local parameter functions
		//@deprecated
		this.context._process(this.getScope());

		//Prepare parameters
		this.prepareParameters();

		//test if parameters match conditions
		if(!_expression(this, "IF", true)){
			this.context._log.debug("Conditions did not match. Now running else tasks..." + this);
			
			this["else"]();
		}
		else{
			try{
				this.run();
				
				this.then();
			}
			catch(err){
				var errorTask = _expression(this, "ERROR");
				if(errorTask){
					ui5strap.Action.runTasks(this.context, errorTask);
				}
				else{
					throw err;
				}
			}
		}

		this.context._log.debug("Task execution completed " + this);
	};
	
	/**
	* Run the action module. Inheritants should override this method.
	* @Protected
	*/
	ActionModuleProto.run = function(){
		_expression(this, "DO");
	};
	
	ActionModuleProto.then = function(){
		ui5strap.Action.runTasks(this.context, _expression(this, "THEN"));
		
		//Exceution complete
		//@deprecated
		this.completed();
	};
	
	ActionModuleProto["else"] = function(){
		ui5strap.Action.runTasks(this.context, _expression(this, "ELSE"));
	};
	
	/*
	 * 
	 * ------------------------------------------------
	 * ------------------------------------------------
	 * 
	 */
	
	/**
	* Deletes an action module specific parameter from the action context
	* @Public
	* @deprecated
	*/
	ActionModuleProto.deleteParameter = function(parameterKey){
		return this.context._deleteParameter(this._createParameterKey(parameterKey));
	};


	
	/**
	* Creates a action module specific parameter key
	* @Protected
	* @deprecated
	*/
	ActionModuleProto._createParameterKey = function(parameterKey){
		return  this.getScope() + '.' + parameterKey;
	};	
	
	
	/**
	* Prepare the action module and parameters
	* @Protected
	* @deprecated
	*/
	ActionModuleProto.prepareParameters = function(){
		//throw new Error('Please override the prepareParameters method in action module ' + this);
	};

	/**
	 * Tries to find a control by a given scope and additional paramters
	 * @deprecated
	 */
	ActionModuleProto.findControl = function(){
		var theControl = null,
			scope = this.getParameter("scope");

		if("APP" === scope){
			var controlId = this.getParameter("controlId");
			if(controlId){
				//If controlId specified, get the control from the optional view or globally
				theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
			else{
				//By default, use the root control of the app as target control in APP scope
				theControl = this.context.app.getRootControl();
			}
		}
		else if("VIEW" === scope){ 
			if(!this.context.controller){
				throw new Error("Cannot use scope 'VIEW': no 'controller' in context!");
			}
			
			var controlId = this.getParameter("controlId"),
				currentView = this.context.controller.getView();
			
			if(controlId){
				//Find control on the current view by id
				theControl = this.context.app.getControl(controlId, currentView.getId());
			}
			else{
				//Otherwise use the root control of the view as target control in VIEW scope
				theControl = currentView.getContent()[0];
				console.log(theControl);
			}
		}
		else if("SOURCE" === scope){
			//We try to find the control from a event source
			if(!this.context.eventSource){
				throw new Error("Cannot use scope 'SOURCE': no 'eventSource' in context!");
			}
			
			theControl = this.context.eventSource;
		}
		else if("SELECTION" === scope){
			//We try to find the control from a list selection
			if(!this.context.eventSource || !this.context.eventSource.getSelectedControl){
				throw new Error("Cannot use scope 'SELECTION': no 'eventSource' in context or no selection support!");
			}

			theControl = this.context.eventSource.getSelectedControl();
		}
		else if("PARAMETER" === scope){
			var parameterKey = this.getParameter("parameterKey");
			
			//We try to find the control from a event parameter
			if(!this.context.eventParameters || !this.context.eventParameters[parameterKey]){
				throw new Error("Cannot use scope 'PARAMETER': no 'eventParameters' in context or parameter not present!");
			}
			
			theControl = this.context.eventParameters[parameterKey];
		}
		else if("CONTEXT" === scope){
			var parameterKey = this.getParameter("parameterKey"),
				theControl = this.context.get(this, parameterKey);
		}
		
		if(!theControl){
			//Either scope or controlId is invalid
			throw new Error('Could not find Control (SCOPE: ' + scope + ', PARAMETERS: ' + JSON.stringify(this.context.parameters) + ')');
		}

		return theControl;
	};
	
	/**
	 * @deprecated
	 */
	ActionModuleProto.fireEvents = function(eventName){
		ui5strap.Action.executeEventModules(this.context, this.getScope(), eventName);
	};

	/**
	* Called when the action module has been completed
	* @deprecated
	* @Protected
	*/
	ActionModuleProto.completed = function(){
		this.fireEvents(ActionModule.EVENT_COMPLETED);
	};

	//Return Module Constructor
	return ActionModule;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Action
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

sap.ui.define(['./library', './ActionContext', './ActionModule'], function(library, ActionContext, ActionModule){
	
	var Action = ui5strap.Object.extend("ui5strap.Action"),
		ActionProto = Action.prototype,
		_actionsCache = {},
		_modulesCache = {};
	
	/**
	* @Private
	* @Static
	* @deprecated
	*/
	var _getActionInstanceDef = function (context, actionModuleName){
		var instanceDef = {};

		if(typeof actionModuleName === 'string'){
			//If string, the namespace is taken from the protoype
			if(-1 === actionModuleName.indexOf(".")){
				var taskDefinition = context.action[actionModuleName];
				if(!taskDefinition){
					throw new Error("No task definition for task '" + actionModuleName + "'");
				}
				if(!taskDefinition[ActionContext.PARAM_MODULE]){
					taskDefinition[ActionContext.PARAM_MODULE] = "ui5strap.ActionModule";
				}
				instanceDef = {
					namespace : actionModuleName,
					module : taskDefinition[ActionContext.PARAM_MODULE]
				};
			}
			else{
				instanceDef = { 
						module : actionModuleName
				};
			}
		}	
		else if(typeof actionModuleName === 'object'){
			//Action Module def is an object, it can contain a custom namespace 
			instanceDef = actionModuleName;
		}
		else{
			//Action Module def is invalid
			throw new Error('Invalid action module: ' + actionModuleName);
		}

		return instanceDef;
	};
	
	/**
	* 
	* Executes an AM Module (ui5strap.ActionModule)
	* @Static
	* @Private
	*/
	var _runTaskInContext = function(context, instanceDef){
		//Set index
		instanceDef.index = context._callStack.length;
		
		//Push to callstack
		context._callStack.push(instanceDef);

		var actionModuleName = instanceDef.module;
		
		if(!instanceDef.module){
			throw new Error("No task module specified!");
		}
		
		var oActionModule = _modulesCache[actionModuleName];
		
		if(!oActionModule){
			var ActionModuleConstructor = ui5strap.Utils.getObject(actionModuleName);
			
				oActionModule = new ActionModuleConstructor();
						
			if(!(oActionModule instanceof ui5strap.ActionModule)){
				throw new Error("Error in action '" + context + "':  '" + actionModuleName +  "' must be an instance of ui5strap.ActionModule!");
			}
			
			if(!ActionModuleConstructor.cacheable){
				//_modulesCache[actionModuleName] = oActionModule;
			}
		}

		oActionModule.init(context, instanceDef).execute();
	};

	

	/**
	* Executes the action modules that are defined in the class parameter of the current context
	* @Private
	* @Static
	* FIXME
	*/
	var _execute = function(context){
		context._process(ActionContext.WORKPOOL);
		
		var actionModuleNameParameter = ActionContext.PREFIX + ActionContext.PARAM_MODULES,
			actionModuleName = context.parameters[actionModuleNameParameter];
		
		if(actionModuleName){ 
			//Expected string
			delete context.parameters[actionModuleNameParameter];
			//Old format
			Action.runTasks(context, actionModuleName);
		}
		else{  
			//New format
			actionModuleName = context.parameters[ActionContext.PARAM_TASKS];
		
			if(actionModuleName){ //Expected string
				Action.runTasks(context, actionModuleName);
			}
			else{  
				throw new Error("Invalid action '" + context + "': '" + ActionContext.PARAM_TASKS + "' attribute is missing!");
			}
			//New format end
		}
	};

	/**
	* Load an action from a json file
	* @Private
	* @Static
	*/
	Action.loadFromFile = function(actionName, callback, preload){
		if(_actionsCache[actionName]){
			callback && callback(_actionsCache[actionName].actionParameters);
			
			return;
		}
		
		var actionUrl = jQuery.sap.getModulePath(actionName) + '.action.json';
		jQuery.sap.log.debug("[ACTION] Loading '" + actionName + "' from '" + actionUrl + "'" );
		
		ui5strap.readTextFile(
				actionUrl, 
				'json', 
				function(actionParameters){
					_actionsCache[actionName] = {
							actionParameters : actionParameters,
							preload : preload
					};
					
					if(preload){
						jQuery.sap.declare(actionName);
						
						//TODO Optimize performance
						var pack = ui5strap.Utils.getObject(actionName, 1),
							parts = actionName.split(/\./);
						
						pack[parts[parts.length - 1]] = function(oEvent){
							
							//console.log(oEvent);
							
							this.getApp().runAction({
								"eventSource" : oEvent.getSource(),
								"eventParameters" : oEvent.getParameters(),
								"controller" : this,
								"parameters" : actionName
							});
						};
					}
					
					callback && callback(actionParameters);
				},
				function(data){
					throw new Error('Invalid Action: "' + actionUrl + '"');
				}
		);
	};

	/**
	* Run events
	* @Public
	* @Static
	* @deprecated
	*/
	Action.executeEventModules = function(context, parameterKey, eventName){
		var paramEvents = context.get(
				null,
				parameterKey
				+ "." 
				+ ActionContext.PREFIX 
				+ ActionContext.PARAM_EVENTS
		);

		if(paramEvents && paramEvents[eventName]){
			context._log.debug("Triggering event actions '" + eventName + "'...");

			//Execute one or multiple AM modules that are defined in the event
			Action.runTasks(context, paramEvents[eventName]);
		}
	};
	
	/**
	* Executes a list of AM Modules
	* @Public
	* @Static
	*/
	Action.runTasks = function(context, actionModulesList){
		if(!actionModulesList){
			jQuery.sap.log.debug("[ACTION] Tried to run empty task list.");
			return;
		}
		
		if(typeof actionModulesList === 'string'){
			actionModulesList = [actionModulesList];
		}

		var instanceDefs = [],
			actionModulesListLength = actionModulesList.length;
				
		for ( var i = 0; i < actionModulesListLength; i++ ) { 
			var actionInstanceDef = _getActionInstanceDef(context, actionModulesList[i]);
			
			instanceDefs.push(actionInstanceDef);
			jQuery.sap.require(actionInstanceDef.module);
		}

		var instanceDefsLength = instanceDefs.length;
		for ( var i = 0; i < instanceDefsLength; i++ ) { 
			_runTaskInContext(context, instanceDefs[i]);
		}
	};

	/**
	* Runs an action
	* @Static
	* @Public
	*/
	Action.run = function(action){
		jQuery.sap.log.debug("[ACTION] Action.run");

		var actionName = action.parameters;
		if(typeof actionName === 'string'){
			Action.loadFromFile(actionName, function loadFromFileSuccess(actionJSON){
				action.parameters = actionJSON;
				var context = new ActionContext(action);
				_execute(context);
			});
		}
		else{
			var context = new ActionContext(action);
			_execute(context);
		}
	};
	
	//Return Module Constructor
	return Action;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppConfig
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(['./library', 'sap/ui/base/Object', 'sap/ui/model/json/JSONModel'], function(library, ObjectBase, JSONModel){

	var AppConfig = ObjectBase.extend("ui5strap.AppConfig", {
		"constructor" : function(options, parameters){
			this.options = options || {};
			this.parameters = parameters || {};
			
			this.data = {};
		}
	}),
	AppConfigProto = AppConfig.prototype;

	/*
	* @deprecated
	*/
	AppConfigProto.getMenuData = function(menuId){
		if(!(menuId in this.data.menus)){
			return null;
		}
		return this.data.menus[menuId];
	};

	/*
	* Returns config information about a view
	*/
	AppConfigProto.getViewConfig = function(viewDef){
		var viewName = viewDef.viewName,
			viewConfigOrg = {},
			viewOptions = {};
		
		if(viewName in this.data.views){
			viewConfigOrg = jQuery.extend({
				viewName : viewName
			}, this.data.views[viewName]);
		}

		//The "viewOptions" contain the mix of original config and definition
		jQuery.extend(viewOptions, viewConfigOrg, viewDef);

		//The final view constructor object
		var viewConfig = {
			cache : true
		};

		jQuery.extend(viewConfig, viewOptions);

		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		//Resulting view options (= viewConfigOrg + viewDef)
		viewConfig.viewData.__ui5strap.viewOptions = viewOptions;
		
		//@deprecated
		//View configuration from app.json
		viewConfig.viewData.__ui5strap.viewConfigOrg = viewConfigOrg;
		
		//Original function parameters
		viewConfig.viewData.__ui5strap.viewDef = viewDef;

		return viewConfig;
	};

	/*
	* Returns a list of events / actions for given scope, eventName and viewName
	*/
	AppConfigProto.getEvents = function(eventGroup, eventName, viewName){
		var eventList = [],
			_configData = this.data;

		if(_configData.events 
			&& _configData.events[eventGroup] 
			&& _configData.events[eventGroup][eventName]){
			eventList = eventList.concat(_configData.events[eventGroup][eventName]);
		}
		
		if(viewName){
			var viewData = this.data.views[viewName];
			if(viewData
				&& viewData.events 
				&& viewData.events[eventGroup] 
				&& viewData.events[eventGroup][eventName]){
				
				eventList = eventList.concat(viewData.events[eventGroup][eventName]);
			
			}
		}

		return eventList;
	};

	/*
	* Processes a given option
	* @static
	*/
	AppConfig.processOption = function(optionKey, option){
		if(typeof option === 'string'){
			return option;
		}
		
		/*
		if(!option.type){
			throw new Error("Invalid option: " + optionKey);
		}
		*/

		if("URI" === option.type){
			if(!("uriParam" in option)){
				throw new Error("Missing 'uriParam' in option '" + optionKey + "'");
			}

			var uriParamValue = jQuery.sap.getUriParameters().get(option.uriParam);

			if(null === uriParamValue){
				if(true === option.required){
					throw new Error('Missing uri parameter: ' + option.uriParam);
				}
				else{
					uriParamValue = option.defaultValue;
				}
			}

			return uriParamValue;
		}

		//throw new Error('Invalid option type: ' + option.type);
		return option;
	};

	/*
	* Resolves the raw information
	*/
	AppConfigProto.resolve = function(){
		var configDataJSON = this.data,
			viewerOptions = this.options,
			appId = this.data.app.id;

		configDataJSON.iconsResolved = {};
		var iconKeys = Object.keys(configDataJSON.icons),
			iconKeysLength = iconKeys.length;
		for(var i = 0; i < iconKeysLength; i++){
			configDataJSON.iconsResolved[iconKeys[i]] = this.resolvePath(configDataJSON.icons[iconKeys[i]]);
		}

		configDataJSON.optionsResolved = jQuery.extend({}, configDataJSON.options);
		if("override" in viewerOptions && appId in viewerOptions.override){
			jQuery.extend(configDataJSON.optionsResolved, viewerOptions.override[appId]);
		}

		var optionsKeys = Object.keys(configDataJSON.optionsResolved),
			optionsKeysLength = optionsKeys.length;

		for(var i = 0; i < optionsKeysLength; i++){
			var optionKey = optionsKeys[i],
				optionValue = configDataJSON.optionsResolved[optionKey];

			if(typeof optionValue === 'object'){
				configDataJSON.optionsResolved[optionKey] = AppConfig.processOption(optionKey, optionValue);
			}
		}
	};
	
	/*
	* Resolves a path relative to app location
	*/
	AppConfigProto.resolvePath = function (path){
		//Folder that contains app.json - must end with /
		var location = this.data.app.location;

		if(typeof path === 'object'){
			//If path is an object, it should contain a "src" attribute and can contain a "package" attribute
			
			if("package" in path){
				location = jQuery.sap.getModulePath(path["package"]) + "/";
			}

			path = path["src"];
		}

		if(jQuery.sap.startsWith(path, '/')){
			//Return path relative to servlet root (context)
			return this.options.pathToServletRoot + path;
		}
		else if(
			jQuery.sap.startsWith(path, './')
			|| jQuery.sap.startsWith(path, '../')
			|| jQuery.sap.startsWith(path, 'http')
		){
			//Return relative (to html file) path unchanged
			return path;
		}
		
		return location + path;
	};

	
	
	/*
	* Validates the configuration JSON data. If mandatory properties are missing, empty ones will created.
	* @static
	*/
	AppConfig.validate = function(configDataJSON){
		if(!('app' in configDataJSON)){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}

		//Populate deprecated sapplication attribute
		configDataJSON.sapplication = configDataJSON.app;

		if(!('package' in configDataJSON.app)){
			throw new Error("Invalid app config: attribute 'app/package' is missing.");
		}

		if(!configDataJSON.app["package"].match(/(^[a-zA-Z0-9_]+)(\.[a-zA-Z0-9_]+)+$/)){
			throw new Error('Package name may only contain letters and digits and the underscore char, separated by a ".", and must have at least one sub package.');
		}

		if(!('id' in configDataJSON.app)){
			configDataJSON.app["id"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["id"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app id "' + configDataJSON.app["id"] + '": may only contain letters, digits, dots and underscores.');
		}

		if(!('namespace' in configDataJSON.app)){
			configDataJSON.app["namespace"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["namespace"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app namespace "' + configDataJSON.app["namespace"] + '": may only contain letters, digits, dots and underscores.');
		}

		if(!('type' in configDataJSON.app)){
			configDataJSON.app.type = 'STANDARD';
		}
		
		if(!("module" in configDataJSON.app)){
			configDataJSON.app.module = "ui5strap.App";
		}
		
		if(!('styleClass' in configDataJSON.app)){
			configDataJSON.app.styleClass = 'ui5strap-app-standard';
		}
		
		//App Icons
		if(!('icons' in configDataJSON)){
			configDataJSON.icons = {};
		}
		
		//App Options
		if(!('options' in configDataJSON)){
			configDataJSON.options = {};
		}
		
		//Default App Transition
		if(!('transition' in configDataJSON.app)){
			configDataJSON.app.transition = 'zoom-in';
		}
		
		//Libraries
		if(!("libraries" in configDataJSON)){
			configDataJSON.libraries = {};
		}
		
		//Views directory
		if(!("views" in configDataJSON)){
			configDataJSON.views = {};
		}
		
		//Frames
		//@deprecated
		if(!("frames" in configDataJSON)){
			configDataJSON.frames = {};
		}

		//App Components
		if(!("components" in configDataJSON)){
			configDataJSON.components = [];
		}

		//UI5 Modules to be preloaded
		if(!("modules" in configDataJSON)){
			configDataJSON.modules = [];
		}
		
		//Actions to be preloaded
		if(!("actions" in configDataJSON)){
			configDataJSON.actions = [];
		}
		
		//Models
		if(!("models" in configDataJSON)){
			configDataJSON.models = [];
		}
		
		//Custom css files
		if(!("css" in configDataJSON)){
			configDataJSON.css = [];
		}

		//Custom JavaScript libraries
		if(!("js" in configDataJSON)){
			configDataJSON.js = [];
		}
		
		//Any kind of file to be preloaded
		if(!("resources" in configDataJSON)){
			configDataJSON.resources = [];
		}
		
		//App Events
		if(!("events" in configDataJSON)){
			configDataJSON.events = {};
		}

		//Add the location of the sapp if its not specified
		//Location always should end with a slash
		if(!("location" in configDataJSON.app)){
			var sappUrlParts = configDataJSON.app.url.split('/');
			sappUrlParts[sappUrlParts.length - 1] = '';
			configDataJSON.app["location"] = sappUrlParts.join('/');
		}
	};

	/*
	* Sets the configuration data after validating.
	*/
	AppConfigProto.setData = function(newData){
		AppConfig.validate(newData);
		
		this.data = newData;
	};

	AppConfigProto.getModel = function(){
		return new JSONModel(this.data);
	};

	//Return Module Constructor
	return AppConfig;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppComponent
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
 
sap.ui.define(['./library', 'sap/ui/base/Object'], function(library, ObjectBase){

	var AppComponent = ObjectBase.extend("ui5strap.AppComponent", {
		"constructor" : function(app, options){
			ObjectBase.apply(this);
			
			this.app = app;
			this.options = options;
		}
	}),
	AppComponentProto = AppComponent.prototype;

	AppComponentProto.init = function(){

	};

	AppComponentProto.getApp = function(){
		return this.app;
	};

	/*
	AppComponentProto.getOptions = function(){
		return this.options;
	};
	*/

	//Return Module Constructor
	return AppComponent;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppFrame
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

sap.ui.define(['./library', './AppComponent'], function(library, AppComponent){

	var AppFrame = AppComponent.extend("ui5strap.AppFrame", {
		"constructor" : function(app, options){
			AppComponent.call(this, app, options);
			
			this.vTargets = {};

			this.oTargets = {};

			this.initialized = false;
		}
	}),
	AppFrameProto = AppFrame.prototype;

	/*
	 * Must be explicitely called from outside
	 * @PostConstruct
	 * @Public
	 */
	AppFrameProto.init = function(){
		var _this = this;
		
		var rootControl = this._createControl();
		
		this._initHistory();

		var oldAppShow = this.app.show;
		this.app.show = function(callback){
			oldAppShow.call(_this.app, function(firstTime){
				if(firstTime){
					_this.showInitialContent(callback);
				}
				else{
					callback && callback(firstTime);
				}
			});
			
		};
		
		this.getRootControl = function(){
			return rootControl;
		};
		
		this.app.getRootControl = function(){
			return rootControl;
		};
	};

	/*
	 * @deprecated
	 */
	AppFrameProto.getControl = function(){
		jQuery.sap.log.warning("AppFrameProto.getControl is deprecated. Use getRootControl instead.");
		return this.getRootControl();
	};

	/*
	* @deprecated
	*/
	AppFrameProto.getConfig = function(){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.getConfig is deprecated and will be removed soon.");
		return this.app.config;
	};

	/*
	 * Creates the control that represents this AppFrame
	 * @Protected
	 */
	AppFrameProto._createControl = function(){
		jQuery.sap.log.debug("AppFrameProto._createControl");
		
		//Init default NavContainer
		var frameConfig = this.options,
			app = this.app,
			navContainerModule = frameConfig.navContainer || "ui5strap.NavContainerStandard";
		
		jQuery.sap.require(navContainerModule);
		var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);
		if(!NavContainerConstructor){
			throw new Error('Invalid NavContainer: ' + navContainerModule);
		}
		
		var navContainerOptions = frameConfig.navContainerOptions || {};
		if(navContainerOptions.id){
			navContainerOptions.id = this.app.createControlId(navContainerOptions.id);
		}
		
		var rootControl = new NavContainerConstructor(navContainerOptions);
		
		if(frameConfig.events && frameConfig.events.control){
			var eKeys = Object.keys(frameConfig.events.control),
				eKeysLength = eKeys.length;
			for(var i = 0; i < eKeysLength; i++){
				var evs = frameConfig.events.control[eKeys[i]];
				
				rootControl.attachEvent(eKeys[i], { "actions" : evs }, function(oEvent, data){
					
					for(var j = 0; j < data.actions.length; j ++){
						app.runAction({
							"parameters" : data.actions[j], 
							"eventSource" : oEvent.getSource(),
							"eventParameters" : oEvent.getParameters()
						});
					}
					
					//console.log(data);
				});
			}
		}
		
		return rootControl;
	};

	/*
	* Inits History for navigation handling in browsers.
	*/
	AppFrameProto._initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug("AppFrameProto.showInitialContent");

		var _this = this,
			initialViews = this.options.initialViews,
			callI = 0;

		var complete = function(){
			callI--;
			if(callI === 0){
				if(!_this.initialized){
					_this.initialized = true;
				}

				callback && callback();
			}
		}

		if(!initialViews || initialViews.length === 0){
			callI = 1;
			complete();
			return;
		}

		callI = initialViews.length;

		for(var i = 0; i < initialViews.length; i++){
			var initialViewData = jQuery.extend({}, initialViews[i]);
			if(!_this.initialized){
				initialViewData.transition = 'transition-none';
			}
			this.navigateTo(this.getRootControl(), initialViewData, complete);
		}

	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	* @deprecated
	*/
	AppFrameProto.getCurrentPage = function (target) {
		jQuery.sap.log.warning("AppFrameProto.getCurrentPage is deprecated!");
		return this.getRootControl().getTarget(target);
	};

	/*
	* Returns whether the frame supports the specified target
	* @Public
	* @deprecated
	*/
	AppFrameProto.hasTarget = function(target) {
		jQuery.sap.log.warning("AppFrameProto.hasTarget is deprecated!");
		return this.getRootControl().hasTarget(target);
	}
	
	/*
	* Returns whether a target is busy
	* @Public
	* @deprecated
	*/
	AppFrameProto.isBusy = function(target){
		jQuery.sap.log.warning("AppFrameProto.isBusy is deprecated!");
		
		return this.getRootControl().isTargetBusy(target);
	};

	/*
	 * Shows a page defined by given data
	 * @Public
	 * @deprecated
	 */
	AppFrameProto.toPage = function (viewConfig, callback) {
		jQuery.sap.log.warning("AppFrameProto.toPage is deprecated! Use navigateTo instead!");
		return this.navigateTo(this.getRootControl(), viewConfig, callback, true);
	};

	/*
	* Get the viewConfig based on a definition object. Def object must contain "viewName" attribute!
	* @deprecated
	*/
	AppFrameProto.getViewConfig = function(viewDef){
		jQuery.sap.log.warning("AppFrameProto.getViewConfig is deprecated! Use resolveViewConfig instead!");
		var viewConfig = this.app.config.getViewConfig(viewDef);

		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = this.getRootControl().defaultTarget;
		}

		//Override targets
		var target = viewConfig.target;
		if(target in this.oTargets){
			var overrideTarget = this.oTargets[target];
			delete this.oTargets[target];
			viewConfig = this.app.config.getViewConfig(overrideTarget);
		}

		return viewConfig;
	};
	
	/*
	* Resolve the viewConfig based on a definition object. Def object must contain "viewName" attribute!
	*/
	AppFrameProto.resolveViewConfig = function(navControl, viewDef){
		var viewConfig = this.app.config.getViewConfig(viewDef);

		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = navControl.defaultTarget;
		}

		//Override targets
		var target = viewConfig.target;
		if(target in this.oTargets){
			var overrideTarget = this.oTargets[target];
			delete this.oTargets[target];
			viewConfig = this.app.config.getViewConfig(overrideTarget);
		}

		return viewConfig;
	};

	/*
	 * @deprecated
	 */
	AppFrameProto.validatePage = function(viewDef){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.validatePage is deprecated and will be removed soon! Use getViewConfig instead.");
		return this.getViewConfig(viewDef);
	};

	/*
	* @Public
	* @deprecated
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		jQuery.sap.log.warning("AppFrameProto.gotoPage is deprecated! Use navigateTo instead!");
		
		return this.navigateTo(this.getRootControl(), viewDef, callback);
	};
	
	AppFrameProto.navigateTo = function (navControl, viewConfig, callback, suppressResolve) {
		jQuery.sap.log.debug("AppFrameProto.toPage");
		
		if(!suppressResolve){
			viewConfig = this.resolveViewConfig(navControl, viewConfig);
		}
		
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}
		
		if(navControl.isBusy(viewConfig.target)){
			jQuery.sap.log.warning('[APP_FRAME] Cannot navigate: Target is busy: "' + viewConfig.target + '"');

			return false;
		}

		var _this = this,
			target = viewConfig.target,
			oPage = this.app.createView(viewConfig);

		//Only add this page to a vTarget. Pages in vTargets are not seen by the user.
		//TODO Why???
		if(viewConfig.vTarget){
			jQuery.sap.log.debug('[APP_FRAME] VIRTUALLY NAVIGATE {' + target + '}');
			this.vTargets[target] = oPage;
		
			return;
		}

		//Set target busy
		navControl.setTargetBusy(target, true);

		//Trigger onUpdate events
		navControl.updateTarget(viewConfig.target, oPage, viewConfig.parameters);

		//Change NavContainer to page
		navControl.toPage(
			oPage, 
			target, 
			viewConfig.transition,
			function toPage_complete(){
				
				//Set target available
				navControl.setTargetBusy(target, false);
				
				//Trigger callback
				callback && callback();
			}
		);
		
		return oPage;
	};

	//Return Module Constructor
	return AppFrame;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.App
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

sap.ui.define(['./library', 'sap/ui/base/Object', './Action'], function(library, ObjectBase, Action){

	var AppBase = ObjectBase.extend('ui5strap.AppBase', {
		"constructor" : function(config, viewer){
			sap.ui.base.Object.apply(this);
			
			this.config = config;

			this.components = {};

			this._pageCache = {};
			this._events = {};
			
			this.isAttached = false;
			this.isRunning = false;
			this.isVisible = false;
			this.hasFirstShow = false;
			this.hasFirstShown = false;

			this._initLog();

			this.sendMessage = function(appMessage){
				appMessage.sender = this.getId();

				viewer.sendMessage(appMessage);
			};
		}
	}),
	AppBaseProto = AppBase.prototype;

	/*
	* Init sapplication specific logging
	* @protected
	*/
	AppBaseProto._initLog = function(){
		var _this = this;
		this.log = {

			debug : function (message) {
				jQuery.sap.log.debug(_this + " " + message);
			},

			warning : function (message) {
				jQuery.sap.log.warning(_this + " " + message);
			},

			error : function (message) {
				jQuery.sap.log.error(_this + " " + message);
			},

			info : function (message) {
				jQuery.sap.log.info(_this + " " + message);
			},

			fatal : function (message) {
				jQuery.sap.log.fatal(_this + " " + message);
			}

		};
	};
	
	/**
	 * @Private
	 */
	var _createAppClass = function(_this, appClasses){
		if(_this.config.data.app.styleClass){
			appClasses += " " + _this.config.data.app.styleClass;
		}
		return appClasses;
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Events -----------------------------
	* ----------------------------------------------------------
	*/

	/**
	* Initializes the App
	* @Public
	*/
	AppBaseProto.init = function(){
		this.onInit(new sap.ui.base.Event("ui5strap.app.init", this, {}));
	};

	/**
	* Preload JavaScript libraries
	* @Private
	*/
	var _preloadJavaScript = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadJavaScript");
		
		var scripts = _this.config.data.js;
		if(scripts.length === 0){
			callback && callback.call(_this);

			return;
		}

		var files = [];
		for(var i = 0; i < scripts.length; i++){
			var jsPath = _this.config.resolvePath(scripts[i]);

			var jsKey = 'js---' + _this.getId() + '--' + jsPath;

			if(! ( jsKey in _this._runtimeData.js ) ){	
				_this._runtimeData.js[jsKey] = jsPath;

				files.push(jsPath);
			}
		}

		var scriptBlock = new ui5strap.ScriptBlock();

		scriptBlock.load(files, function(){
			scriptBlock.execute(true);

			callback && callback.call(_this);
		});
	};
	
	/**
	 * @Private
	 */
	var _preloadModels = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadModels");

		//Models
		var models = _this.config.data.models,
			callI = models.length, 
			loaded = {},
			successCallback = function(oEvent, oData){
				callI --;
				
				if(callI >= 0){
					if(oData.oModel !== loaded[oData.modelName]){
						_this.log.debug("Loaded model '" + oData.modelName + "'");
						_this.getRootControl().setModel(oData.oModel, oData.modelName);
						loaded[oData.modelName] = oData.oModel;
					}
					else{
						jQuery.sap.log.warning("Model already loaded: " + oData.modelName);
					}
				}
				
				if(callI === 0){
					//sap.ui.getCore().setModel(oModel, model['modelName']);
					callback && callback();
				}
				
				if(callI < 0){
					jQuery.sap.log.warning("Loaded additional model data: " + oData.modelName);
					//_this.getRootControl().rerender();
					//sap.ui.getCore().fireLocalizationChanged();
					console.log(sap.ui.getCore());
				}
			},
			errorCallback = function(){
				throw new Error('Cannot load model!');
			};

		if(callI === 0){
			callback && callback();
		}

		for(var i = 0; i < models.length; i++){
			var model = models[i],
				oModel = null,
				modelType = model['type'],
				modelName = model['modelName'],
				modelSrc = _this.config.resolvePath(model);

			
			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc,
					async_DEACTIVATED : true
				});
				/*
				oModel.attachRequestCompleted(
					{ 
						modelName: modelName, 
						oModel : oModel
					}, 
					successCallback
				);
				oModel.attachRequestFailed(
					{ 
						modelName: modelName, 
						modelSrc : modelSrc
					}, 
					errorCallback
				);
				*/
				successCallback(null, { 
					modelName: modelName, 
					oModel : oModel
				});
			}
			else if(modelType === 'JSON'){
				oModel = new sap.ui.model.json.JSONModel();
				oModel.attachRequestCompleted(
					{ 
						modelName: modelName, 
						oModel : oModel
					}, 
					successCallback, 
					oModel
				);
				oModel.attachRequestFailed(
					{
						modelName: modelName,
						modelSrc : modelSrc
					}, 
					errorCallback
				);
				oModel.loadData(modelSrc);
			}
			else{
				throw new Error('Invalid model type!');
			}
		}
	};
	
	/**
	 * @Private
	 */
	var _initComponent = function(_this, compConfig){
		var ComponentConstructor = jQuery.sap.getObject(compConfig.module),
			componentId = compConfig.id,
			compEvents = compConfig.events,
			methodName = 'get' + jQuery.sap.charToUpperCase(componentId),
			oComp = new ComponentConstructor(_this, compConfig);
		
		//Check if magic getter conflicts with existing method
		if(_this[methodName]){
			throw new Error("Method already exists: " + methodName);
		}
		
		//Register Component in App
		_this.components[componentId] = oComp;
		
		//Create magic getter
		_this[methodName] = function(){
			return oComp;
		};
	
		//Register Component Events
		if(compEvents){
			//Array of strings of format "scope.event"
			for(var j = 0; j < compEvents.length; j++){
				var stringParts = compEvents[j].split('.');
				if(stringParts.length === 2){
					(function(){
						var eventScope = stringParts[0],
							eventName = stringParts[1],
							eventHandlerName = 'on' + jQuery.sap.charToUpperCase(eventName);
						
						_this.registerEventAction(eventScope, eventName, function on_event(oEvent){
							oComp[eventHandlerName] && oComp[eventHandlerName](oEvent);
						});
					}());
				}
				else{
					throw new Error("Invalid Component event: " + compEvents[j]);
				}
			}
		}
		
		//Init Component
		oComp.init();
	};
	
	/**
	 * @Private
	 * 
	 */
	var _preloadComponents = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadComponents");

		//Components
		var components = _this.config.data.components,
			loadModules = [],
			compConfigs = [];
		
		for(var i = 0; i < components.length; i++){
			var compConfig = components[i];
			
			if(!compConfig.module || !compConfig.id){
				throw new Error("Cannot load component #" + i + ": module or id attribute missing!");
			}
			else if(false !== compConfig.enabled){
				jQuery.sap.require(compConfig.module);
				_initComponent(_this, compConfig);
			}
		}

		//Trigger Callback
		callback && callback();
	};
	
	/**
	* Preload Actions for faster execution
	* @Private
	*/
	var _preloadActions = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadActions");
		
		var actions = _this.config.data.actions,
			callI = actions.length;
		
		if(callI === 0){
			callback && callback.call(_this);

			return;
		}
		
		var successCallback = function(data){
			callI--;
			if(callI === 0){
				callback && callback.call(_this);
			}
		};
		
		for(var i = 0; i < actions.length; i++){
			Action.loadFromFile(actions[i], successCallback, true);
		}
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.setLanguage = function(language){
		sap.ui.getCore().getConfiguration().setLanguage(language);
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.preload = function(callback){
		jQuery.sap.log.debug("AppBaseProto.preload");
		
		this.config.resolve();

		var _this = this;
		
		_preloadJavaScript(_this, function preloadJavaScriptComplete(){
			_preloadComponents(_this, function _preloadComponentsComplete(){
				_preloadModels(_this, function _preloadModelsComplete(){
					_preloadActions(_this, callback);
				});
			});
		});
	};

	/**
	 * @Public
	 */
	AppBaseProto.load = function(callback){
		jQuery.sap.log.debug("AppBaseProto.load");

		var _this = this;
		this.preload(function(){

			_this.onLoad(new sap.ui.base.Event("ui5strap.app.load", _this, {}));

			callback && callback();
		
		});
	};

	/**
	* Start the app
	*/
	AppBaseProto.start = function(callback){
		jQuery.sap.log.debug("AppBaseProto.start");

		var _this = this;
		if(this.isRunning){
			throw new Error(this + " is already running.");
		}
		
		this.isRunning = true;

		window.addEventListener(
			"message", 
			function on_message(event){
				_this.onMessage(new sap.ui.base.Event("ui5strap.app.message", _this, event.data));
			}, 
			false
		);

		this.onStart(new sap.ui.base.Event("ui5strap.app.start", _this, {}));

		callback && callback();
	};

	/**
	 * 
	 */
	AppBaseProto.show = function(callback){
		jQuery.sap.log.debug("AppBaseProto.show");

		this.isVisible = true;
		this.onShow(new sap.ui.base.Event("ui5strap.app.show", this, {}));

		var isFirstTimeShow = !this.hasFirstShow;
		if(isFirstTimeShow){
			this.log.debug('FIRST SHOW');
		
			this.hasFirstShow = true;
			this.onFirstShow(new sap.ui.base.Event("ui5strap.app.firstShow", this, {}));
		}

		callback && callback(isFirstTimeShow);
	};

	/**
	 * 
	 */
	AppBaseProto.shown = function(callback){
		jQuery.sap.log.debug("AppBaseProto.shown");

		var _this = this;

		ui5strap.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-current');
			
			_this.onShown(new sap.ui.base.Event("ui5strap.app.shown", _this, {}));

			var isFirstTimeShown = !_this.hasFirstShown;
			if(isFirstTimeShown){
				_this.log.debug('FIRST SHOWN');
				_this.hasFirstShown = true;
				_this.onFirstShown(new sap.ui.base.Event("ui5strap.app.firstShown", _this, {}));
			}

			callback && callback(isFirstTimeShown);
		});
	};
	
	/**
	 * 
	 */
	AppBaseProto.hide = function(callback){
		jQuery.sap.log.debug("AppBaseProto.hide");
		
		this.isVisible = false;
		
		this.onHide(new sap.ui.base.Event("ui5strap.app.hide", this, {}));

		callback && callback();
	};
	
	/**
	 * 
	 */
	AppBaseProto.hidden = function(callback){
		jQuery.sap.log.debug("AppBaseProto.hidden");

		var _this = this;
		ui5strap.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-inactive ui5strap-hidden');
				
			_this.onHidden(new sap.ui.base.Event("ui5strap.app.hidden", _this, {}));

			callback && ui5strap.polyfill.requestAnimationFrame(callback);
		})
	};

	/**
	* Stop the app
	*/
	AppBaseProto.stop = function(callback){
		jQuery.sap.log.debug("AppBaseProto.stop");

		if(!this.isRunning){
			throw new Error(this + " is not running.");
		}

		this.$().remove();
		this.domRef = null;
		this.isRunning = false;

		this.onStop(new sap.ui.base.Event("ui5strap.app.stop", this, {}));

		callback && callback();
	};

	AppBaseProto.unload = function(callback){
		jQuery.sap.log.debug("AppBaseProto.unload");
		
		ui5strap.Layer.unregister(this.overlayId);
		ui5strap.Layer.unregister(this.getDomId('loader'));

		this.onUnload(new sap.ui.base.Event("ui5strap.app.unload", this, {}));

		this.destroy();

		callback && callback();
	};

	/**
	* Triggered when a message is sent to this app
	* @public
	*/
	AppBaseProto.onMessage = function(oEvent){
		//Fire the message event
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "message",
			"orgEvent" : oEvent
		});
	};
	
	/**
	* Triggered when the window is resized
	* @public
	*/
	AppBaseProto.onResize = function(oEvent){
		//Fire the resize event
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "resize",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been initialized
	* @public
	*/
	AppBaseProto.onInit = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "init",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been (pre-)loaded
	* @public
	*/
	AppBaseProto.onLoad = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "load",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been unloaded
	* @public
	*/
	AppBaseProto.onUnload = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "unload",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been started
	* @public
	*/
	AppBaseProto.onStart = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "start",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been stopped
	* @public
	*/
	AppBaseProto.onStop = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "stop",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app is going to show
	* @public
	*/
	AppBaseProto.onShow = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "show",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been shown
	* @public
	*/
	AppBaseProto.onShown = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "shown",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app is going to show for the first time
	* @public
	*/
	AppBaseProto.onFirstShow = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShow",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been shown for the first time
	* @public
	*/
	AppBaseProto.onFirstShown = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShown",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app is going to hide
	* @public
	*/
	AppBaseProto.onHide = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hide",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been hidden
	* @public
	*/
	AppBaseProto.onHidden = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hidden",
			"orgEvent" : oEvent
		});
	};

	/**
	* Run an action that is assiged to a certain event
	* @public
	*/
	AppBaseProto.runEventAction = function (eventParameters, actionGroupId){
		this.log.debug("Executing event '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
		var actionParameters = {
			"parameters" : actionGroupId
		};

		//OpenUI5 Controller
		if("controller" in eventParameters){
			actionParameters.controller = eventParameters.controller;
		}

		//Original Event
		if("orgEvent" in eventParameters){
			actionParameters.eventSource = eventParameters.orgEvent.getSource();
			actionParameters.eventParameters = eventParameters.orgEvent.getParameters();
			
		}

		this.runAction(actionParameters);
	};

	/**
	* Fires an app event. 
	* The event is either defined in the configuration, or attached to the app instance programatically.
	* @public
	*/
	AppBaseProto.fireEventAction = function(eventParameters){
		if(this.config.data.events){
			var appEvents = this.config.data.events;
			
			//Run the events that are defined in the config
			if(eventParameters.scope in appEvents){
				var events = appEvents[eventParameters.scope];

				if(eventParameters.eventName in events){
					var eventList = events[eventParameters.eventName];
					//Run the list of events
					for(var i = 0; i < eventList.length; i++){ 
						this.runEventAction(eventParameters, eventList[i]);
					}

				}

			}
		}

		//Runtime events
		if(this._events && this._events[eventParameters.scope]){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){
				var eventList = events[eventParameters.eventName];
				//Run the list of events
				for(var i = 0; i < eventList.length; i++){ 
					var actionOrFunction = eventList[i];
					if(typeof actionOrFunction === 'function'){
						//Call the registered function with original event as parameter
						this.log.debug("Executing event function '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
						actionOrFunction.call(this, eventParameters.orgEvent);
					}
					else{
						this.runEventAction(eventParameters, actionOrFunction);
					}
				}

			}
		}
	};

	/**
	* Registers an event action to this app instance
	* @public
	*/ 
	AppBaseProto.registerEventAction = function(scope, eventName, actionOrFunction){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
		
		this.log.debug("Registered event '" + eventName + "' for scope '" + scope + "'");
		this._events[scope][eventName].push(actionOrFunction);
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- App Overlay ------------------------------------
	* ----------------------------------------------------------------------
	*/
	
	/**
	* Loader
	*/
	AppBaseProto.setLoaderVisible = function(visible, callback){
		//ui5strap.Layer.setVisible('ui5strap-loader', visible, callback, option);
		ui5strap.Layer.setVisible(this.getDomId('loader'), visible, callback);
	};

	/**
	* Splash Screen
	* @notimplemented
	*/
	AppBaseProto.setSplashVisible = function(visible, callback){
		callback && callback();
		//ui5strap.Layer.setVisible('ui5strap-splash', visible, callback);
	};
	
	

	/**
	* Inititalzes the overlay
	*/
	AppBaseProto.registerOverlay = function(){
		var _this = this;
		
		this.overlayId = this.getDomId('overlay');

		if(ui5strap.Layer.get(this.overlayId)){
			this._log.warning("Layer already registered: " + this.overlayId);
			return;
		}

		ui5strap.Layer.register(this.overlayId);

		this.overlayControl = new ui5strap.NavContainer();
		//this.overlayControl.placeAt(this.overlayId);
		this.overlayControl.placeAt(this.overlayId + '-content');

		var oModels = this.getRootControl().oModels;
		//var uiArea = sap.ui.getCore().createUIArea(newPage, _this);
		for(var sName in oModels){
			//page.setModel(oModel, sName);
			this.overlayControl.setModel(oModels[sName], sName);
		};

		//jQuery('#' + this.overlayId + '-backdrop').on('tap', function onTap(event){
		//	_this.hideOverlay();
		//});
	};

	/**
	* Returns whether the overlay layer is visible
	* @public
	*/
	AppBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.overlayId);
	};

	/**
	* Shows the overlay layer
	* @public
	*/
	AppBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			navControl = this.overlayControl,
			target = "content",
			transitionName = transitionName || 'slide-ttb';
		
		//Set target busy
		navControl.setTargetBusy(target, true);
		
		if(!(viewDataOrControl instanceof ui5strap.Control)){
			var viewParameters = viewDataOrControl.parameters;
			viewDataOrControl = _this.createView(_this.config.getViewConfig(viewDataOrControl));
			
			//Trigger onUpdate events
			navControl.updateTarget(target, viewDataOrControl, viewParameters);
		}
		
		ui5strap.Layer.setVisible(this.overlayId, true, function(){
			navControl.toPage(viewDataOrControl, target, transitionName, function toPage_complete(){
				
				//Set target available
				navControl.setTargetBusy(target, false);
				
				//Trigger callback
				callback && callback();
			});
		});
	};

	/**
	* Hides the overlay layer
	* @public
	*/
	AppBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'slide-btt';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.overlayId, false, callback);
		});	
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Views ------------------------------
	* ----------------------------------------------------------
	*/

	/**
	 * Create a new page
	 */
	AppBaseProto.createView = function(viewConfig){
		
		var _this = this,
			pageId = viewConfig.id;

		//If id specified check for cache
		//Also create a new valid control id for the view
		if(pageId){
			var cachedPage = this._pageCache[pageId];
			if(viewConfig.cache){
				if(cachedPage){

					//This is not very good
					//Replace cached viewDef with new viewDef 
					cachedPage.getViewData().__ui5strap.viewDef = viewConfig.viewData.__ui5strap.viewDef;
					
					return cachedPage;
				}
			}
			else{
				if(cachedPage){
					delete this._pageCache[pageId];
					cachedPage.destroy();
					delete cachedPage;
				}
			}

			viewConfig.id = this.createControlId(pageId);
		}

		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		viewConfig.viewData.__ui5strap.app = this;

		//if(!viewConfig.viewName){
		//	throw new Error('Cannot obtain view configuration: no "viewName" specified.');
		//}
		
		viewConfig.afterInit = function(oEvent){
			alert("Event 'afterInit' called from view '" + viewConfig.viewName + "'");
		};

		//Will crash if "viewName" or "type" attribute is missing!
		var page = new sap.ui.view(viewConfig);
		
		//Add css style class
		if(viewConfig.styleClass){
			page.addStyleClass(viewConfig.styleClass);
		}
		
		if(pageId){
			//Add to page cache
			this._pageCache[pageId] = page;
		}

		return page;
	};

	/*
	* --------------------------------------------------
	* --------------------- ACTIONS --------------------
	* --------------------------------------------------
	*/

	/**
	* Execute an Action
	*/
	AppBaseProto.runAction = function(action){
		action.app = this;

		Action.run(action);
	};

	/*
	* --------------------------------------------------
	* --------------------- STORAGE --------------------
	* --------------------------------------------------
	*/
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.setLocalStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		localStorage[this.getId() + '.localStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.getLocalStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.localStorage.' + storageKey;
		
		return localStorage[storageId] ? JSON.parse(localStorage[storageId]) : null;
	};
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.setSessionStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		sessionStorage[this.getId() + '.sessionStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.getSessionStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.sessionStorage.' + storageKey;
		
		return sessionStorage[storageId] ? JSON.parse(sessionStorage[storageId]) : null;
	};

	/*
	* --------------------------------------------------
	* --------------------- MODELS ---------------------
	* --------------------------------------------------
	*/

	AppBaseProto.getLocaleString = function(languageKey){
		return this.getModelProperty(languageKey, 'i18n');
	};

	/*
	* Returns a property of a model that is assigned to the root control.
	*/
	AppBaseProto.getModelProperty = function(dataPath, modelName){
		var ressourceModel = this.getRootControl().getModel(modelName);
		if(!ressourceModel){
			return "MISSING: " + dataPath;
			//throw new Error('Invalid model name: "' + modelName + '"');
		}
		return ressourceModel.getProperty(dataPath);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controls -------------------
	* --------------------------------------------------
	*/

	/*
	* Create an control id with app namespace. If viewId is given, the controlId must be local.
	*/ 
	AppBaseProto.createControlId = function(controlId, viewId){
		var appPrefix = this.getDomId() + '---';
		if(jQuery.sap.startsWith(controlId, appPrefix)){
			if(viewId){
				throw new Error("Cannot create absolute control id: controlId is already absolute but viewId is given!");
			}
			
			//ControlID already has a app prefix, just return it.
			jQuery.sap.log.warning("Control ID '" + controlId + "' already have an app prefix.");
			
			return controlId;
		}
		
		if(viewId){
			if(jQuery.sap.startsWith(viewId, appPrefix)){
				controlId = viewId + "--" + controlId;
			}
			else{
				controlId = appPrefix + viewId + "--" + controlId;
			}
		}
		else{
			controlId = appPrefix + controlId;
		}
		
		return controlId;
	
	};
	
	AppBaseProto.extractRelativeControlId = function(controlId, viewId){
		var prefix = this.getDomId() + '---';
		
		if(viewId){
			if(jQuery.sap.startsWith(controlId, prefix)){
				//View ID is given, but control ID is already absolute.
				throw new Error("Cannot extract relative control id: controlId is absolute but viewId is given!");
			}
			
			if(jQuery.sap.startsWith(viewId, prefix)){
				//View ID is absolute (has an app prefix)
				prefix = viewId;
			}
			else{	
				//View ID is relative
				prefix += viewId + "--";
			}
		}
		else if(!jQuery.sap.startsWith(controlId, prefix)){
			//View ID is given, but control ID is already absolute.
			throw new Error("Cannot extract relative control id: controlId is not absolute!");
		}
		
		return controlId.substring(prefix.length);
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppBaseProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.createControlId(controlId, viewId));
	};

	AppBaseProto.getRootControl = function(){
		
		alert("Please inherit ui5strap.AppBase.getRootControl");
	};

	/*
	* --------------------------------------------------
	* --------------------- Object ---------------------
	* --------------------------------------------------
	*/

	AppBaseProto.hasNature = function(nature){
		return -1 !== jQuery.inArray(nature, this.config.data.app.nature);
	};

	/*
	* Returns the ID of the App
	*/
	AppBaseProto.getId = function(){
		return this.config.data.app.id;
	};
	
	/**
	 * @deprecated Will be removed!
	 */
	AppBaseProto.$ = function(){
		return jQuery(this.domRef);
	};

	/**
	* Get the id of the app defined in the config
	* @public
	* @deprecated
	*/
	AppBaseProto.getUrl = function(){
		return this.config.data.app.url;
	};

	/**
	* Returns the Dom ID of the App
	*/
	AppBaseProto.getDomId = function(subElement){
		return this.config.data.app.id.replace(/\./g, '-') + (subElement ? '---' + subElement : '');
	};

	/**
	 * @Public
	 */
	AppBaseProto.updateContainer = function(){
		if(this.domRef){
			this.domRef.className = _createAppClass(this, 'ui5strap-app ui5strap-app-next ui5strap-hidden');
			return;
		}
		
		var _this = this;
		
		//App Container
		var appContainer = document.createElement('div');
		appContainer.className = _createAppClass(this, 'ui5strap-app ui5strap-app-prepared ui5strap-hidden');
		appContainer.id = this.getDomId();
		
		//App Content
		var appContent = document.createElement('div');
		appContent.className = 'ui5strap-app-content';
		appContent.id = this.getDomId('content');
		appContainer.appendChild(appContent);

		//App Overlay
		var appOverlay = document.createElement('div');
		appOverlay.className = 'ui5strap-app-overlay ui5strap-overlay ui5strap-layer ui5strap-hidden';
		appOverlay.id = this.getDomId('overlay');

		//var appOverlayBackdrop = document.createElement('div');
		//appOverlayBackdrop.className = 'ui5strap-overlay-backdrop';
		//appOverlayBackdrop.id = this.getDomId('overlay-backdrop');
		/*
		appOverlayBackdrop.onclick = function(){
			_this.hideOverlay();
		};
		*/
		//appOverlay.appendChild(appOverlayBackdrop);

		var appOverlayContent = document.createElement('div');
		appOverlayContent.className = 'ui5strap-overlay-content';
		appOverlayContent.id = this.getDomId('overlay-content');
		appOverlay.appendChild(appOverlayContent);

		appContainer.appendChild(appOverlay);

		//App Loader
		var appLoader = document.createElement('div');
		appLoader.className = 'ui5strap-app-loader ui5strap-loader ui5strap-layer ui5strap-hidden';
		appLoader.id = this.getDomId('loader');
		appContainer.appendChild(appLoader);

		ui5strap.Layer.register(appLoader.id, jQuery(appLoader));

		//App Splash
		var appSplash = document.createElement('div');
		appSplash.className = 'ui5strap-app-splash ui5strap-layer ui5strap-hidden';
		appSplash.id = this.getDomId('splash');
		appContainer.appendChild(appSplash);

		//Cache DOM Ref
		this.domRef = appContainer;
		this.contentDomRef = appContent;
	};
	
	/**
	 * Appends the App to the DOM
	 */
	AppBaseProto.attach = function(containerEl){
		if(!this.isAttached){
			jQuery.sap.log.debug("Attaching app '" + this.getId() + "' to DOM...");
			this.isAttached = true;
			containerEl.appendChild(this.domRef);
			this.registerOverlay();
			this.getRootControl().placeAt(this.contentDomRef);
		}
	};

	/**
	* @Override
	* @Public
	*/
	AppBaseProto.toString = function(){
		return '[' + this.getId() + ']';
	};

	/**
	* Destroys the App and all of its components
	* @Override
	*/
	AppBaseProto.destroy = function(){
		//Destroy the root control first
		var rootControl = this.getRootControl();
		if(rootControl){
			rootControl.destroy();
		}

		//Finally, destroy the app object
		sap.ui.base.Object.prototype.destroy.call(this);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controller -----------------
	* --------------------------------------------------
	*/

	/**
	 * Creates an action event handler for the given event.
	 * @Private
	 * @Static
	 */
	var _createActionEventHandler = function(controllerImpl, eventName){
		var eventFunctionName = 'on' + jQuery.sap.charToUpperCase(eventName, 0),
			oldOnPageShow = controllerImpl[eventFunctionName];

		controllerImpl[eventFunctionName] = function(oEvent){ 
			var app = this.getApp();
				
			if(app){
				var view = this.getView(),
					updateEvents = app.config.getEvents('controller', eventName, view.getViewName()),
					updateEventsLength = updateEvents.length,
					viewId = view.getId();

				for(var i = 0; i < updateEventsLength; i++){
				 	var actionName = updateEvents[i];
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: '" + eventName + "') ...");
					app.runAction({
						"parameters" : actionName, 
						"controller" : this,
						"eventSource" : oEvent.getSource(),
						"eventParameters" : oEvent.getParameters()
					});
				}
			}
			
			if(oldOnPageShow){
				oldOnPageShow.call(this, oEvent);
			}
		};
	};

	/**
	 * Adds action functionality to the controller.
	* @Static
	* @Public
	*/
	AppBase.blessController = function(controllerImpl){
		
		if(!controllerImpl.actionEventHandler){
			controllerImpl.actionEventHandler = "execute";
		}
		if(!controllerImpl.actionAttribute){
			controllerImpl.actionAttribute = "action";
		}
		
		//Add getApp method if not already exists
		if(!controllerImpl.getApp){
	          controllerImpl.getApp = function(){
	              var viewData = this.getView().getViewData();
	            
	              if(!viewData || !viewData.__ui5strap || !viewData.__ui5strap.app){
	                  return null;
	              }
	              
	              return viewData.__ui5strap.app;
	          }
      	}
		
		/*
		 * All available formatters
		 */
		if(!controllerImpl.formatters){
			controllerImpl.formatters = {};
		}
		
		/**
		 * Formatter that resolves a i18n string.
		 * @Public
		 */
		controllerImpl.formatters.localeString = function(localeString){
			return this.getApp().getLocaleString(localeString);
		};
		
		/**
		 * Extracts the action names for the given event.
		 * @Private
		 * @Static
		 */
		var _getActionFromEvent = function(oEvent, customDataKey){
			var actionName = oEvent.getSource().data(customDataKey),
				actionNamesList = ui5strap.Utils.parseIContent(actionName);
			
			if(typeof actionNamesList === 'object'){
				var eventId = oEvent.getId();
				//Different actions for each event
				if(!eventId || !actionNamesList[eventId]){
					throw new Error('Cannot execute action: no action for eventId ' + eventId);
				}
				actionName = actionNamesList[eventId];
			}
			
			return actionName;
		};

		/*
		 * Old action event handler
		 * @deprecated
		 */
		controllerImpl["__execute"] = function(oEvent){
			this.getApp().runAction({
				"eventSource" : oEvent.getSource(),
				"eventParameters" : oEvent.getParameters(),
				"controller" : this,
				"parameters" : _getActionFromEvent(oEvent, "__action")
			});
		};
		
		/*
		 * New action event handler
		 */
		controllerImpl[controllerImpl.actionEventHandler] = function(oEvent){
			this.getApp().runAction({
				"eventSource" : oEvent.getSource(),
				"eventParameters" : oEvent.getParameters(),
				"controller" : this,
				"parameters" : _getActionFromEvent(oEvent, this.actionAttribute)
			});
		};

		var oldOnInit = controllerImpl.onInit;

		controllerImpl.onInit = function(oEvent){ 
			var app = this.getApp();

			if(app){
				//TODO find out if view.sViewName is reliable
				var view = this.getView(),
					initEvents = app.config.getEvents('controller', 'init', view.sViewName),
					initEventsLength = initEvents.length,
					viewId = view.getId();

				for(var i = 0; i < initEventsLength; i++){
					var actionName = initEvents[i];
					
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: 'onInit') ...");
					
					app.runAction({
						"parameters" : actionName, 
						"eventSource" : oEvent.getSource(),
						"eventParameters" : oEvent.getParameters(),
						"controller" : this
					});
				} 
			}

			//Call old onInit function
			if(oldOnInit){
				oldOnInit.call(this, oEvent);
			}
		};
		
		//Update
		_createActionEventHandler(controllerImpl, 'update');

		//PageHide
		_createActionEventHandler(controllerImpl, 'pageHide');
		
		//PageHidden
		_createActionEventHandler(controllerImpl, 'pageHidden');
		
		//PageShow
		_createActionEventHandler(controllerImpl, 'pageShow');
		
		//PageShown
		_createActionEventHandler(controllerImpl, 'pageShown');
		
	};

	//Return Module Constructor
	return AppBase;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.App
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

sap.ui.define(['./library', './AppBase', './AppConfig','./AppComponent', "sap/ui/core/mvc/HTMLView", "sap/ui/core/mvc/XMLView", "sap/ui/core/CustomData", "sap/ui/model/resource/ResourceModel", "sap/ui/model/json/JSONModel"], 
				function(library, AppBase, AppConfig, AppComponent, HTMLView, XMLView, CustomData, ResourceModel, JSONModel){

	var App = AppBase.extend('ui5strap.App', {
		"constructor" : function(config, viewer){
			AppBase.call(this, config, viewer);
			
			//Init local vars
			this._runtimeData = {
				"theme" : null,
				"css" : {},
				"js" : {}
			};

		}
	}),
	AppProto = App.prototype;

	/*
	* ------------------------------------------------
	* --------------------- Events -------------------
	* ------------------------------------------------
	*/

	/**
	* Preload resources e.g. images and json files
	* @Private
	* @Static
	*/
	var _preloadViews = function(views, callback){
		//TODO use Object.keys
		var viewsLeft = 0;
		for(var viewSrc in views){
			viewsLeft++;
		}

		if(!views || 0 === viewsLeft){
			callback && callback();
		}

		var consoleOutput = '';

		var viewCallback = function(){
			viewsLeft -- ;
			if(viewsLeft === 0){
				callback && callback();
			}
		};

		for(var viewSrc in views){
			var viewConfig = views[viewSrc];
			if(viewConfig.preload && 'HTML' === viewConfig.type){
				//We are currently only able to cache HTML views
				var viewUrl = HTMLView._getViewUrl(viewSrc);

				if(viewUrl in HTMLView._mTemplates){
					viewCallback();
				}
				else{ 
					jQuery.ajax({
							"url" : viewUrl,
							"viewSrc" : viewSrc,
							"cache" : true,
							"dataType" : "text",
							"success" : function(text){
								consoleOutput += '"' + this.viewSrc + '" ';
								
								//TODO
								//Find a better way to preload HTML views!
								HTMLView._mTemplates[this.url] = text;
								
								viewCallback();
							},
								
							"error" : viewCallback
					});	
				}
				
			}
			else{
				viewCallback();
			}
		} 
	};

	/**
	 * @Public
	 */
	AppProto.preload = function(callback){
		var _this = this;
		AppBase.prototype.preload.call(this, function(){
			_this.includeStyle(function includeStyle_complete(){
				_this.log.debug("PRELOADING VIEWS...");
				
				_preloadViews(_this.config.data.views, callback);
			});
		});
	};

	/**
	* Triggered when a view of the app is shown in the global overlay
	* @Public
	*/
	AppProto.onShowInOverlay = function(oEvent){ 
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "showOverlay",
			"orgEvent" : oEvent 
		});

	};

	/**
	* Triggered when a view of the app is hidden from the global overlay
	* @Public
	*/
	AppProto.onHideInOverlay = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hideOverlay",
			"orgEvent" : oEvent 
		});
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	/**
	* Include the style that is neccessary for this app
	* @Public
	*/
	AppProto.includeStyle = function(callback){
		var _this = this,
			configData = this.config.data,
			cssKeys = Object.keys(configData.css),
			callbackCount = cssKeys.length;

		if(configData.app.theme){ 
			this.setTheme(configData.app.theme);
		}
		
		if(callbackCount === 0){
			callback && callback.call(this);

			return;
		}

		var callbackI = 0,
			success = function(){
				callbackI++;
				if(callbackI === callbackCount){
					callback && callback.call(_this);
				}
			},
			error = function(e){
				alert('Could not load style!');
				throw e;
			};

		for(var i = 0; i < callbackCount; i++){
			var cssKey = cssKeys[i],
				cssPath = this.config.resolvePath(configData.css[cssKey]);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				this.log.debug('LOADING CSS "' + cssPath + '"');
					
				this._runtimeData.css[cssKey] = cssPath;
				
				jQuery.sap.includeStyleSheet(
						cssPath, 
						cssKey, 
						success, 
						error
				);
			}
			
			else{
				this.log.debug("Css stylesheet '" + cssPath + "' already included.");
				success();
			}
		}
	};

	/**
	 * @Public
	 */
	AppProto.removeStyle = function(){
		for(var cssKey in this._runtimeData.css){
			jQuery('link#' + cssKey).remove();
			delete this._runtimeData.css[cssKey];
			this.log.info("Css stylesheet '" + cssKey + "' removed.");
		}
	};

	/**
	* Sets the theme of the app
	* @Public
	*/
	AppProto.setTheme = function(themeName){
		this._runtimeData.theme = themeName;

		if(!themeName || "base" === themeName){
			sap.ui.getCore().applyTheme("base");
			return;
		}

		if(jQuery.sap.startsWith(themeName, "sap_")){
			sap.ui.getCore().applyTheme(themeName);
			return;
		}
		//sap.ui.getCore().setThemeRoot(themeName, );
		sap.ui.getCore().applyTheme(themeName, this.config.options.pathToThemeRoot);

		this.log.debug("Theme '" + themeName + "' set.");
	};

	/*
	* -------------------------------------------------------------
	* --------------------- Controls ------------------------------
	* -------------------------------------------------------------
	*/
	
	/**
	 * @Abstract
	 * @Public
	 */
	AppProto.getRootControl = function(){
		throw new Error('Cannot determine Root Control! Please include at least one Component that provides a Root Control.');
	};

	//Return Module Constructor
	return App;
	
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ControlBase
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

sap.ui.define(['./library', './OptionsSupport'], function(library, OptionsSupport){

	var ControlBase = ui5strap.Control.extend("ui5strap.ControlBase", {
		metadata : {

			library : "ui5strap",
			
			properties : {
				options : {
					type : "string",
					defaultValue : ""
				}
			}
		}
	}),
	ControlBaseProto = ControlBase.prototype;
	
	OptionsSupport.bless(ControlBaseProto);
	
	ControlBaseProto.getBindingContextData = function(modelName){
		var bindingContext = this.getBindingContext(modelName);
		
		return bindingContext.getModel().getProperty(bindingContext.getPath());
	};
	
	return ControlBase;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainer
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
 
sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var NavContainer = ControlBase.extend("ui5strap.NavContainer", {
		metadata : {
			library : "ui5strap",
			
			properties : {
				defaultTransition : {
					type : "string",
					defaultValue : "transition-slide"
				}
			},
			
			events : {
				pageChange : {
					parameters : {
						"target" : {type : "string"},
						"oldPage" : {type : "ui5strap.Control"}
					}
				},
				
				pageChanged : {
					parameters : {
						"target" : {type : "string"},
						"oldPage" : {type : "ui5strap.Control"}
					}
				},
				
				pageUpdate : {
					parameters : {
						"target" : {type : "string"},
						"pageParameters" : {type : "object"},
						"page" : {type : "ui5strap.Control"}
					}
				}
			}
		}
	}),
	NavContainerProto = NavContainer.prototype,
	domAttachTimeout = 50;
	
	NavContainerProto._getStyleClassPrefix = function(){
		return "navcontainer";
	};
	
	/*
	*
	* STATIC FIELDS & METHODS
	*
	*/

	/**
	* Triggers a controller event: Update, PageShow, PageShown, PageHide, PageHidden
	* @Private
	*/
	var _triggerControllerEvent = function(_this, target, oControl, eventId, eventParameters){
		var eventNameCC = jQuery.sap.charToUpperCase(eventId, 0);
		if(oControl){
			var controller = oControl;
			
			//If page is a view, use controller
			if(oControl instanceof sap.ui.core.mvc.View){
				controller = oControl.getController();
			}
			
			var funcName = 'on' + eventNameCC;
			if(controller && controller[funcName]){
				jQuery.sap.log.debug("[NC#" + _this.getId() + "] Triggering event '" + eventId + "' on target '" + target + "'");
			
				controller[funcName](new sap.ui.base.Event("ui5strap.controller." + eventId, _this, eventParameters || {}));
			}
		}
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _prepareTransition = function(_this, pageChange){
		//ui5strap.tm("APP", "NC", "PREP_TRANS");
		
		if(pageChange.transition){
			jQuery.sap.log.warning("NavContainer::_prepareTransition: Transition already prepared!");
			//There is already a Transition defined
			return false;
		}
		else{
			var changeTransitionName = pageChange.transitionName;
			if(!changeTransitionName){
				changeTransitionName = _this.getDefaultTransition();
			}
			
			//"no-transition" is deprecated, use "transition-none" instead
			if(changeTransitionName === 'no-transition'
				|| changeTransitionName === 'transition-none'){
				changeTransitionName = null;
			}
			
			var transition = new ui5strap.ResponsiveTransition({
					"transitionAll" : changeTransitionName, 
					"$current" : pageChange.$current, 
					"$next" : pageChange.$next, 
					id : 'nc-' + _this.ncType + '-' + pageChange.target
			});
				
			pageChange.transition = transition;

			transition.prepare();
			
			return true;
		}
	};


	/**
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	var _transitionCallback = function(_this, pageChange, transList){
		//ui5strap.tm("APP", "NC", "TRANS_CB");
		
		transList.callI --;
		
		var callbacksLength = transList.callbacks.length;
		if(0 === callbacksLength){
			////jQuery.sap.log.debug('[NC][' + pageChange.target + '] No transition callbacks');

			return;
		}

		if(0 === transList.callI){
			//jQuery.sap.log.debug(' + [NC] CALLBACK_0 (' + callbacksLength + ') {' + pageChange.target + '}');

			for(var i = 0; i < callbacksLength; i++){
				transList.callbacks[i]();
			}

			//pageChange 
		}
		else{
			//jQuery.sap.log.debug(' - [NC] C_' + transList.callI + ' {' + pageChange.target + '}');
		}
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		//ui5strap.tm("APP", "NC", "EXEC_TRANS");
		//jQuery.sap.log.debug(' + [NC] T3 (' + transList.callbacks.length + ') {' + pageChange.target + '}');
		
		pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				var $current = this._data.$current;
				if($current){
					$current.remove();
				}

				//If next page is null, then execute the callbacks when old page has been hidden
				if(pageChange.page === null){
					_transitionCallback(_this, pageChange, transList);
					
					_this.firePageChanged({
						target : pageChange.target,
						oldPage : pageChange.currentPage
					});
				}

				//onPageHidden event
				_triggerControllerEvent(_this, pageChange.target, pageChange.currentPage, 'pageHidden', {
					target : pageChange.target,
					newPage : pageChange.page
				});
			}, 
			function anon_transitionPreparedComplete(){
				this._data.$next.attr('class', 'navcontainer-page navcontainer-page-current');
				
				//Transition callback
				_transitionCallback(_this, pageChange, transList);

				//onPageShown event
				_triggerControllerEvent(_this, pageChange.target, pageChange.page, 'pageShown', {
					target : pageChange.target,
					oldPage : pageChange.currentPage
				});
				
				_this.firePageChanged({
					target : pageChange.target,
					oldPage : pageChange.currentPage
				});
			}
		);

	};

	/**
	* Should always be surrounded by a RAF 
	* @Private
	*/
	var _executePendingTransitions = function(_this){
		//ui5strap.tm("APP", "NC", "EXEC_PEND_TRANS");
		
		var pendingTransitionsLength = _this._pendingTransitions.length,
			transList = {
				callI : pendingTransitionsLength,
				callbacks : []
			};

		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];

			for(var j = 0; j< pageChanges.length; j++){
				if(pageChanges[j].callback){
					transList.callbacks.push(pageChanges[j].callback);
				}
			}
			
			_executeTransition(_this, pageChanges[pageChanges.length-1], transList);
		}
		
		_this._pendingTransitions = [];
		_this._targetTransitions = {};
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _preparePendingTransitions = function(_this){
		//ui5strap.tm("APP", "NC", "PREP_PEND_TRANS");
		
		var pendingTransitionsLength = _this._pendingTransitions.length,
			successAll = true;
		//jQuery.sap.log.debug(' + [NC] PREPARE ' + pendingTransitionsLength + ' PENDING TRANSITIONS'); 
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			successAll = _prepareTransition(_this, pageChanges[pageChanges.length-1]) && successAll;
		}

		return successAll;
	};

	/**
	* @Private
	*/
	var _handlePendingTransitions = function(_this){
		//ui5strap.tm("APP", "NC", "HANDLE_PEND_TRANS");
		
		if(0 === _this._pendingTransitions.length){
			
			//No pending transitions, so return.
			return;
		
		}
		
		//RAF start
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){

			if(!_preparePendingTransitions(_this)){
				//jQuery.sap.log.debug(" - [NC] CANCEL HANDLING PENDING TRANSITIONS");

				return;
			}
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				_executePendingTransitions(_this);
			});
		
		});
		//RAF end
	};

	/**
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		//ui5strap.tm("APP", "NC", "PAGE_CHANGE");
		
		var transList = {
			callI : 1,
			callbacks : []
		};
		
		if(pageChange.callback){
			transList.callbacks.push(pageChange.callback);
		}
		
		//RAF start
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){
			
			//Prepare Transition before next repaint
			_prepareTransition(_this, pageChange);
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				
				//Execute Transition before next repaint
				_executeTransition(_this, pageChange, transList);
			
			});
		
		});
		//RAF end
	};
	
	/**
	 * @Private
	 */
	var _pageChangeLater = function(_this, pageChange, override){
		//ui5strap.tm("APP", "NC", "PAGE_CHANGE_LATER");
		
		var target = pageChange.target;
		if(-1 === jQuery.inArray(target, _this._pendingTransitions)){ 
			_this._pendingTransitions.push(target);

			if(!_this._targetTransitions[target]){
				_this._targetTransitions[target] = [];
			}
		}

		if(override || _this._targetTransitions[target].length === 0){
			//jQuery.sap.log.debug(' + [NC] T1L {' + pageChange.target + '}');
			_this._targetTransitions[target].push(pageChange);
		}
		//else{
			//jQuery.sap.log.debug(' + [NC] T1S {' + pageChange.target + '}');
		//}
	};

	/**
	* @Private
	*/
	var _placePage = function(_this, target, page, isPrepared){
			//ui5strap.tm("APP", "NC", "PLACE_PAGE");
			
			//Page is null, return null
			if(!page){
				return null;
			}
		
			//Page is already present in DOM, return parent jQuery reference
			if(page.getDomRef()){
				return page.$().parent();
			}
			
			//Create dom element and jQuery wrapper
			var newPageContainer = document.createElement('div'),
				$newPageContainer = jQuery(newPageContainer),
				oModels = _this.oModels;
			
			//Set css class name for new page container
			newPageContainer.className = true === isPrepared
					? 'navcontainer-page navcontainer-page-next ui5strap-hidden'
					: 'navcontainer-page';
			
			//Create and set id for new page container
			newPageContainer.id = _this.pageDomId(target, page);
			
			//Append page container to the dom
			jQuery('#' + _this.targetPagesDomId(target)).append($newPageContainer);
			
			//Add page to new page container
			page.placeAt(newPageContainer);
			
			//jQuery.sap.log.debug(" + [NC] NEW PAGE {" + target + "} #" + page.getId());

			return $newPageContainer;
	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/**
	* @Public
	* @PostConstruct
	*/
	NavContainerProto.init = function(){
		//ui5strap.tm("APP", "NC", "INIT");
		
		this._pendingTransitions = [];
		
		this._targetTransitions = {};

		this._targetPagesCount = {};
		
		//TODO Do we need a busy flag here?
		this._targetStatus = {};

		this._initNavContainer();
	};

	/**
	* @Override
	* @Protected
	*/
	NavContainerProto._initNavContainer = function(){
		//ui5strap.tm("APP", "NC", "INIT_NC");
		
		//NavContainer type string. Should only contain letters, numbers and hyphens.
		this.ncType = "default";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
			"content" : null
		};
	};

	/**
	* Creates a dom id for a given target and page
	* @Public
	*/
	NavContainerProto.createPageDomId = function(target, page){
		if(page === null){
			return 'navcontainer-page---' + this._targetPagesCount[target];
		}

		return 'navcontainer-page---' + page.getId();
	};

	/**
	* Registers a new dom id for a given target and page
	* @Public
	*/
	NavContainerProto.pageDomId = function(target, page){
		if(!(target in this._targetPagesCount)){
			this._targetPagesCount[target] = 0;
		}
		
		this._targetPagesCount[target]++;

		return this.createPageDomId(target, page);
	};

	/*
	 * START OpenUi5 MOD
	 * Since we do not use aggregations in NavContainer, we have to care about propagation and destroying ourselves.
	 * Usually, this happens in ManagedObject.prototype.propagateProperties and ManagedObject.prototype.destroy.
	 */
	
	/**
	* @Override
	*/
	NavContainerProto.propagateProperties = function(vName){
		var oProperties = this._getPropertiesToPropagate(),
			bUpdateAll = vName === true, // update all bindings when no model name parameter has been specified
			sName = bUpdateAll ? undefined : vName,
			sTarget, oTarget, i;
	
		for (sTarget in this.targets) {
			oTarget = this.targets[sTarget];
			if (oTarget instanceof sap.ui.base.ManagedObject) {
				this._propagateProperties(vName, oTarget, oProperties, bUpdateAll, sName);
			}
		}
		
	};
	
	NavContainerProto.updateBindingContext = function(bSkipLocal, bSkipChildren, sFixedModelName, bUpdateAll){
		jQuery.sap.log.debug("UBC");
		ui5strap.ControlBase.prototype.updateBindingContext.call(this, bSkipLocal, bSkipChildren, sFixedModelName, bUpdateAll);
		
		var oModelNames = {},
			sModelName,
			oContext;

		// find models that need an context update
		if (bUpdateAll) {
			for (sModelName in this.oModels) {
				if ( this.oModels.hasOwnProperty(sModelName) ) {
					oModelNames[sModelName] = sModelName;
				}
			}
			for (sModelName in this.oPropagatedProperties.oModels) {
				if ( this.oPropagatedProperties.oModels.hasOwnProperty(sModelName) ) {
					oModelNames[sModelName] = sModelName;
				}
			}
		} else {
			oModelNames[sFixedModelName] = sFixedModelName;
		}

		/*eslint-disable no-loop-func */
		for (sModelName in oModelNames ) {
			if ( oModelNames.hasOwnProperty(sModelName) ) {
				sModelName = sModelName === "undefined" ? undefined : sModelName;

				if (!bSkipChildren) {
					var oContext = this.getBindingContext(sModelName);
					// also update context in all child elements
					for (sTarget in this.targets) {
						var oTarget = this.targets[sTarget];
						if (oTarget instanceof sap.ui.base.ManagedObject) {
							oTarget.oPropagatedProperties.oBindingContexts[sModelName] = oContext;
							oTarget.updateBindingContext(false,false,sModelName);
						}
					}
				}
			}
		}
		/*eslint-enable no-loop-func */
	};
	
	/*
	 * END OpenUi5 MOD
	 */
	
	/**
	 * Destroys targets before the current control is destroyed.
	* @Override
	*/
	NavContainerProto.exit = function(){
		for(var target in this.targets){
			if(this.targets[target]){
				var oldTarget = this.targets[target];
				this.targets[target] = null;
				
				oldTarget.destroy();
				
				delete oldTarget;
			}
		}
		//ui5strap.ControlBase.prototype.destroy.call(this, bSuppressInvalidate);
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	NavContainerProto._getStyleClassRoot = function(){
		return "navcontainer navcontainer-type-" + this.ncType;
	};
	
	/**
	 * @Public
	 * TODO Improve component ID syntax
	 */
	NavContainerProto.targetDomId = function(target){
		return 'navcontainer-target-' + target + '---' + this.getId();
	};
	
	/**
	 * @Public
	 * TODO Improve component ID syntax
	 */
	NavContainerProto.targetPagesDomId = function(target){
		return 'navcontainer-pages-' + target + '---' + this.getId();
	};

	/**
	 * @Public
	 * TODO Improve component ID syntax
	 */
	NavContainerProto.targetLayersDomId = function(target){
		return 'navcontainer-layers-' + target + '---' + this.getId();
	};
	
	/**
	 * @Protected
	 */
	NavContainerProto._getTargetClassString = function(target){
		return "navcontainer-target navcontainer-target-" + target;
	};
	
	/**
	* @Public
	*/
	NavContainerProto.updateTarget = function(target, oPage, eventParameters){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}
		
		eventParameters = eventParameters || {};
		
		if(eventParameters.target){
			throw new Error('Parameters must not contain a target attribute!');
		}
		
		_triggerControllerEvent(this, target, oPage, 'update', eventParameters);
		
		this.firePageUpdate({
			"target" : target,
			"pageParameters" : eventParameters,
			"page" : oPage
		});
		
	};
	
	/**
	 * @Public
	 */
	NavContainerProto.hasTarget = function(target){
		return target in this.targets;
	};
	
	/**
	 * @Public
	 */
	NavContainerProto.getTarget = function(target){
		return this.targets[target];
	};
	
	/**
	 * @Public
	 */
	NavContainerProto.isTargetBusy = function(target){
		return this._targetStatus[target];
	};
	
	/**
	 * @Public
	 */
	NavContainerProto.setTargetBusy = function(target, targetBusy){
		jQuery.sap.log.debug("[NC#" + this.getId() + "] Target '" + target + "' is " + (targetBusy ? 'busy' : 'available'));
		this._targetStatus[target] = targetBusy;
	};
	
	/**
	* @Public
	*/
	NavContainerProto.toPage = function(page, target, transitionName, callback){
		//ui5strap.tm("APP", "NC", "TO_PAGE");
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}
		
		jQuery.sap.log.debug("[NC#" + this.getId() + "] Navigating on target '" + target + "'");
		
		var _this = this,
			currentPage = this.targets[target];

		if(this.getDomRef() && currentPage === page){
			jQuery.sap.log.debug(' + [NC] PAGE IS CURRENT {' + target + '}');

			callback && callback();
			
			return false;
		}

		this.targets[target] = page;
		
		var changeName = '{' + target + '} '
							+ (null === currentPage ? 'None' : '#' + currentPage.getId()) 
							+ ' => '
							+ (null === page ? 'None' : '#' + page.getId())
							+ ' ("'
							+ transitionName + '")';

		var $currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			targetTransition = {
				"changeName" : changeName,
				"target" : target,
				"transitionName" : transitionName,
				"transition" : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				"callback" : callback,
				"page" : page,
				"currentPage" : currentPage
			};

		if(currentPage){
			_triggerControllerEvent(_this, target, currentPage, 'pageHide', {
				target : target,
				newPage : page
			});
		}

		if(page){
			/*
			 * START OpenUi5 MOD
			 * Since we do not use aggregations in NavContainer, we have to care about propagation ourselves.
			 * Usually, this happens in ManagedObject.prototype.setParent, but our pages have no parent set.
			 */
			ui5strap.Utils.addPropertyPropagation(this, page);
			/*
			 * END OpenUi5 MOD
			 */
			
			_triggerControllerEvent(_this, target, page, 'pageShow', {
				target : target,
				oldPage : currentPage
			});
		}
		
		_this.firePageChange({
			target : target,
			oldPage : currentPage
		});

		if(this.getDomRef()){
			jQuery.sap.log.debug("[NC#" + this.getId() + "] NavContainer already attached. Navigating now...");
			//NavContainer is already attached to DOM
			targetTransition.$next = _placePage(_this, target, page, true);
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, domAttachTimeout);
		}
		else{
			jQuery.sap.log.debug(' + [NC] NAVIGATE {' + target + '}: NavContainer not attached to DOM yet.');

			//NavContainer not attached to DOM yet
			//It will override all pending transitions on this target!
			_pageChangeLater(_this, targetTransition, true);
		}

		return true;
	};

	/**
	* @Override
	* @Public
	*/
	NavContainerProto.onBeforeRendering = function(){
		//ui5strap.tm("APP", "NC", "BEFORE_RENDERING");

		for(var target in this.targets){
			var currentPage = this.targets[target];
			if(currentPage){
				//Make sure the exising page is reattached after rerendering. If another transition is pending on this target, the new transition is overriding this.
				_pageChangeLater(this, {
					changeName : "rerender",
					target : target,
					transitionName : "transition-none",
					transition : null,
					"$current" : null,
					"$next" : null,
					callback : null,
					page : currentPage,
					currentPage : null
				}, false);
			}
	 	}
	};

	/**
	* @Override
	* @Public
	*/
	NavContainerProto.onAfterRendering = function(){ 
		//ui5strap.tm("APP", "NC", "AFTER_RENDERING");
		
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = _this._targetTransitions[_pendingTransitions[i]],
				targetTransition = targetTransitions[targetTransitions.length - 1];

			if(!targetTransition.$next){
				//There is no page reference available, so we have to create it
				targetTransition.$next = _placePage(_this, targetTransition.target, targetTransition.page, true); 
			}
			else{
				//Reappend existing reference
				jQuery('#' + _this.targetPagesDomId(targetTransition.target)).append(targetTransition.$next);
			}
		}
		
		//Dom Attach Timeout
		window.setTimeout(function anon_afterDomTimeout(){
			_handlePendingTransitions(_this);	
		}, domAttachTimeout);
		
	};

	return NavContainer;
});;/*
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
 

sap.ui.define(['./library', 'sap/ui/base/Object'], function(library, ObjectBase){
	
	var ViewerBase = ObjectBase.extend('ui5strap.ViewerBase', {
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
				//Default container dom id
				this.options.container = "ui5strap-container";
			}

			if(!this.options.overlay){
				//Default overlay dom id
				this.options.overlay = "ui5strap-overlay";
			}

			if(!this.options.app){
				//Default app config location
				this.options.app = "./app/app.json";
			}
		}
	}),
	ViewerBaseProto = ViewerBase.prototype;
	
	/**
	 * Initialzer
	 * @Public
	 */
	ViewerBaseProto.init = function(){
		//Register Loader Layer
		ui5strap.Layer.register('ui5strap-loader');
  		
		this._initOverlay();
	};

	/**
	 * @Public
	 */
	ViewerBaseProto.start = function(callback, loadCallback){
		throw new Error("Please inherit ui5strap.ViewerBase.prototype.start in your Viewer instance.");
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Global Overlay ---------------------------------
	* ----------------------------------------------------------------------
	*/

	/**
	* Inititalzes the overlay
	* @Protected
	*/
	ViewerBaseProto._initOverlay = function(){
		var _this = this;
		
		ui5strap.Layer.register(this.options.overlay);

		this.overlayControl = new ui5strap.NavContainer();
		this.overlayControl.placeAt(this.options.overlay + '-content');

		jQuery('#' + this.options.overlay + '-backdrop').on('tap', function onTap(event){
			_this.hideOverlay();
		});
	};

	/**
	* Returns whether the overlay layer is visible
	* @Public
	*/
	ViewerBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.options.overlay);
	};

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide-ttb';
		
		ui5strap.Layer.setVisible(this.options.overlay, true, function(){
			if(viewDataOrControl instanceof ui5strap.Control){
				//Control is directly injected into the frame
				overlayControl.toPage(viewDataOrControl, "content", transitionName, callback);
			}
			else{ 
				//viewDataOrControl is a data object
				if("appId" in viewDataOrControl){
					var viewApp = _this.getApp(viewDataOrControl.appId);
					if(null === viewApp){
						throw new Error('Invalid app: ' + viewDataOrControl.appId);
					}
					//View from a app
					viewApp.includeStyle(function includeStyle_complete(){
						var viewConfig = viewApp.config.getViewConfig(viewDataOrControl),
							view = viewApp.createView(viewConfig);

						overlayControl.toPage(view, 'content', transitionName, function(){
							viewApp.isVisibleInOverlay = true;

							viewApp.onShowInOverlay(new sap.ui.base.Event("ui5strap.app.showInOverlay", viewApp, { 
								view : view, 
								viewConfig : viewConfig
							}));
							
							callback && callback();	
						});
					});
				}
				else{
					//TODO How should this work here?
					overlayControl.toPage(viewDataOrControl, 'content', transitionName, callback);
				}
			}
		});
	};

	/**
	* Hides the overlay layer
	* @Public
	*/
	ViewerBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			page = overlayControl.targets["content"],
			transitionName = transitionName || 'transition-slide-btt';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.options.overlay, false, function(){
				if(page instanceof sap.ui.core.mvc.View){
					var pageViewData = page.getViewData();
					if(pageViewData.app){
						var viewApp = pageViewData.app;
						viewApp.isVisibleInOverlay = false;
						viewApp.onHideInOverlay(new sap.ui.base.Event("ui5strap.app.hideInOverlay", viewApp, {})); 
						_this.removeStyle(viewApp);
					}
				}

				callback && callback();
			});
		});	
	};
	
	/*
	* ----------------------------------------------------------------------
	* --------------------- Settings  ----------------------------------
	* ----------------------------------------------------------------------
	*/
	
	/**
	 * @Public
	 */
	ViewerBaseProto.setLanguage = function(language){
		//sap.ui.getCore().getConfiguration().setLanguage(language);
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Browser Flow  ----------------------------------
	* ----------------------------------------------------------------------
	*/

	/**
	* Changes the browser URL to an (external) url
	* @param url The URL to browse to
	* @Public
	*/
	ViewerBaseProto.exitViewer =  function(url){
		window.location.href = url; 
	};

	/**
	* Request the client's browser to switch to full screen mode
	* @Public
	*/  
	ViewerBaseProto.requestFullscreen =  function(element){
		if(typeof element === 'undefined'){
			element = document.documentElement;
		}
		if(element.requestFullscreen) {
	    	element.requestFullscreen();
	  	} else if(element.mozRequestFullScreen) {
	    	element.mozRequestFullScreen();
	  	} else if(element.webkitRequestFullscreen) {
	    	element.webkitRequestFullscreen();
	  	} else if(element.msRequestFullscreen) {
	    	element.msRequestFullscreen();
	  	}
	};

	//End ViewerBase
	
	return ViewerBase;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Viewer
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

sap.ui.define(['./library', './ViewerBase', './App', './AppConfig', './NavContainer'], 
				function(library, ViewerBase, App, AppConfig, NavContainer){
	
	var ViewerMulti = ViewerBase.extend("ui5strap.Viewer", {
		"constructor" : function(options){
			ViewerBase.call(this, options);

			this._loadedLibraries = {};
			this._loadingSapplication = null;

			this._dom = null;
			
			this._console = null;
		}
	}),
	ViewerMultiProto = ViewerMulti.prototype,
	domAttachTimeout = 50;

	//Private properties that are linked to the scope of the anonymous self executing function around this module
	//This prevents other apps from accessing data easily
	//@TODO these properties must be NON-STATIC! Currently they are STATIC.
	//@Static
	var _m_currentSapplication = null;
	var _m_loadedSapplicationsById = {};
	


	/**
	 * Initializes the ViewerMulti instance
	 * @param viewerConfigUrl Url to viewer configuration file
	 * @Public
	 */
	ViewerMultiProto.init = function(){
		ViewerBase.prototype.init.call(this);
		
		//Init methods
		//TOOO Move to Viewer base
		this._initDom();
		this._initConsole();
		this._initEvents();
	};

	/**
	* Executes a app by given sapp-url from a get parameter
	* @Public
	*/
	ViewerMultiProto.start = function(callback, loadCallback, parameters){
		jQuery.sap.log.debug("ViewerProto.start");
		
		this.init();

		var appUrl = AppConfig.processOption("app", this.options.app);

		if(null === appUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}

		this.executeApp(
			{
				"internal" : true,
				"type" : "UI5STRAP",
				"url" : appUrl,
				"parameters" : parameters
			}, 
			false, 
			callback, 
			loadCallback
		);	
	};

	/*
	* --------
	*
	* App Flow
	*
	* --------
	*/

	/**
	* Get the current (in foreground) running app
	* TODO make static?
	* @Public
	*/
	ViewerMultiProto.getApp = function(appId){
		return appId ? _m_loadedSapplicationsById[appId] : _m_currentSapplication;
	};

	/**
	 * @Public
	 */
	ViewerMultiProto.getLoadedApps = function(){
		return _m_loadedSapplicationsById;
	};

	/**
	*	Replaces the current browser content and opens a app defined in viewer config
	* @param sappId Sapplication ID
	* TODO Remove?
	*/
	ViewerMultiProto.openSapplication = function(appUrl){
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
		var appUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();

		this.exitViewer(appUrl);
	};
	
	/**
	* Loads the configuration from an URL. URL must point to a JSON file.
	* @Private
	*/
	var _loadAppConfig = function(_this, configUrl, callback){
		jQuery.ajax({
	  		"dataType": "json",
	  		"url": configUrl,
	  		"data": {},
	  		"success": function ajax_complete(configDataJSON){
	  			if(!configDataJSON.app){
					throw new Error("Invalid app configuration: attribute 'app' is missing.");
				}
	  			
	  			
	  			
	  			callback && callback(configDataJSON);
	  		},
	  		"error" : function ajax_error(){
	  			throw new Error('Could not load app config from url: ' + configUrl);
	  		}
		});
	};

	/**
	* Load, start and show an App. The appUrl must point to a valid app.json file.
	* @Public
	*/
	ViewerMultiProto.executeApp = function(appDefinition, doNotShow, callback, loadCallback){
		jQuery.sap.log.debug("ViewerProto.executeApp");
		
		var _this = this,
			appType = appDefinition.type;
		
		if(!appType){
			appType = "HTML5";
		}
		
		var ls = function loadAppConfigComplete(configDataJSON){
			configDataJSON.app.url = appDefinition.url;
			
			_this.loadApp(
				configDataJSON, 
				appDefinition.parameters,
				function loadAppComplete(appInstance){
				    loadCallback && loadCallback();
	
				    var startedCallback = function(){
						if(!doNotShow){
							_this.showApp(appInstance.getId(), null, callback);
						}
						else{
							//_this.hideLoader(callback);
							callback && callback(appInstance);
						}
					};
				
				//_this.showLoader(function(){
					if(!appInstance.isRunning){
						_this.startApp(appInstance.getId(), startedCallback);
					}
					else{
						startedCallback();
					}
				//});
	
				}
			);
		};
		
		
		if("HTML5" === appType){
			if(!appDefinition.name || !appDefinition.id || !appDefinition.package || !appDefinition.url){
				throw new Error("Cannot execute HTML5 App: at least one of required attributes missing in definition.");
			}
			
			ls({
		        "app" : {
		        	"name" : appDefinition.name,
		            "id" : appDefinition.id,
		            "package" : appDefinition.package,
		            "module" : "ui5strap.AppSandbox",
		            "appURL" : appDefinition.url,
		            "propagateMessages" : true
		        },
	            "icons" : {
	            	"default" : appDefinition.icon
	            }
			});
		}
		else if("UI5STRAP" === appType){
			if(appDefinition.internal){
				
				//Config URL provided, so load config data from there
				_loadAppConfig(this, appDefinition.url, ls);
			}
			else{
				if(!appDefinition.name || !appDefinition.id || !appDefinition.package || !appDefinition.url){
					throw new Error("Cannot execute external UI5STRAP App: at least one of required attributes missing in definition.");
				}
				
				var launcher = appDefinition.launcher;
				
				if(!launcher){
					launcher = "index.html";
				}
				
				ls({
			        "app" : {
			            "name" : appDefinition.name,
			            "id" : appDefinition.id,
			            "package" : appDefinition.package,
			            "module" : "ui5strap.AppSandbox",
			            "appURL" : launcher + "?app=" + encodeURIComponent(appDefinition.url),
			            "propagateMessages" : true
			        },
		            "icons" : {
		            	"default" : appDefinition.icon
		            }
				});
			}
		}
		else{
			throw new Error("Cannot execute App: Invalid Type!");
		}
	};
	
	/**
	 * @Private
	 */
	var _preloadLibraries = function(_this, libs, callback){
		jQuery.sap.log.debug("ViewerProto._preloadLibraries");
		
		var callI = libs.length,
			successCallback = function(){
				callI--;
				if(callI === 0){
					callback && callback();
				}
			};

		for(var i = 0; i < libs.length; i++){
			var lib = libs[i],
				libPackage = lib["package"], 
				libLocation = lib["location"];

			if(libPackage === 'ui5os' ||
				libPackage === 'ui5strap'){
				throw new Error('Do not include the libraries "ui5strap" and "ui5os" into your libraries configuration.');
			}
			
			jQuery.sap.registerModulePath(libPackage, libLocation);
			_this._loadedLibraries[libPackage] = libLocation;

			if(lib.preload){
				//Preload Controls an Elements
				var preloadLibs = [libPackage + '.library'],
					libData = sap.ui.getCore().getLoadedLibraries()[libPackage];
				
				for(var j = 0; j < libData.elements.length; j++){
					preloadLibs.push(libData.elements[j]);
				}

				for(var j = 0; j < libData.controls.length; j++){
					preloadLibs.push(libData.controls[j]);
				}
				
				jQuery.sap.require(preloadLibs);
			}
			
			successCallback();
		}
	};

	/**
	* Creates a app instance
	* @param appConfig SappConfig instance
	* @Public
	*/
	ViewerMultiProto.createApp = function(appConfig, callback){
		jQuery.sap.log.debug("ViewerProto.createApp");
		
		var configDataJSON = appConfig.data,
			appModuleName = configDataJSON.app.module,
			libraries = [],
			_this = this;

		//register the libraries
		for(var i = 0; i < configDataJSON.libraries.length; i++){
			var dependencyLib = configDataJSON.libraries[i];
			libraries.push({
				"package" : dependencyLib["package"],
				"location" : appConfig.resolvePath(dependencyLib["location"]),
				"preload" : dependencyLib.preload
			});
			
		} 

		libraries.push({ 
			"package" : configDataJSON.app["package"],
			"location" : configDataJSON.app["location"]
		});

		_preloadLibraries(this, libraries, function(){
			jQuery.sap.require(appModuleName);
			var AppConstructor = jQuery.sap.getObject(appModuleName);
			callback && callback(new AppConstructor(appConfig, _this));
		});
	};
	
	/**
	* Loads an App by a given appUrl. The appUrl must point to a valid app.json file.
	* @Public
	*/
	ViewerMultiProto.loadApp = function(configDataJSON, parameters, callback){
		jQuery.sap.log.debug("ViewerProto.loadApp");

		var _this = this,
			appConfig = new AppConfig(this.options, parameters);
		
		appConfig.setData(configDataJSON);

		//TODO log level should only affect on app level
		if("logLevel" in configDataJSON.app){
			jQuery.sap.log.setLevel(configDataJSON.app.logLevel);
		}
		
		if(_m_loadedSapplicationsById[configDataJSON.app.id]){
			return callback(_m_loadedSapplicationsById[configDataJSON.app.id]);
		}

		//Create App Instance
		_this.createApp(appConfig, function createAppComplete(appInstance){
			appInstance.init();

			_m_loadedSapplicationsById[appInstance.getId()] = appInstance;

			appInstance.load(function loadAppComplete(){
				callback && callback.call(_this, appInstance);
			});
		});
	};

	/**
	* Unloads an app
	* @Public
	*/
	ViewerMultiProto.unloadApp = function(sappId){
		jQuery.sap.log.debug("ViewerProto.unloadApp");
		
		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot unload app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			throw new Error('Cannot stop app "' + sappId + '" - app still running.');
		}
		
		appInstance.unload();
		
		delete _m_loadedSapplicationsById[sappId];

		return appInstance;
	};

	/**
	* Starts a previously loaded app.
	* @Public
	*/
	ViewerMultiProto.startApp = function(sappId, callback){
		jQuery.sap.log.debug("ViewerProto.startApp");
		
		var appInstance = this.getApp(sappId);
		
		if(null === appInstance){
			throw new Error('Cannot start app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			return appInstance;
		}

		appInstance.start(callback);
		
		return appInstance;
	};

	/**
	* Stops a previously started app.
	* @Public
	*/
	ViewerMultiProto.stopApp = function(sappId){
		jQuery.sap.log.debug("ViewerProto.stopApp");
		
		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot stop app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			throw new Error('Cannot stop app "' + sappId + '" - app is currently visible.');
		}
		
		appInstance.stop();
		
		return appInstance;
	};

	/**
	* Shows a previously started app, means bringing the app to foreground.
	* @Public
	*/
	ViewerMultiProto.showApp = function(sappId, transitionName, callback){
		jQuery.sap.log.debug("ViewerProto.showApp");
		
		if(this._loadingSapplication){
			jQuery.sap.log.warning("App '" + this._loadingSapplication + "' is currently loading."); 
			
			return;
		}

		var appInstance = this.getApp(sappId);

		if(!appInstance){
			throw new Error('Cannot show app "' + sappId + '" - app not loaded.');
		}
		
		//Check if App is running
		if(!appInstance.isRunning){
			throw new Error('Cannot show a app which is not running.');
		}

		//If App has no Root Control, or is already visible, return immeadiately
		if(!appInstance.getRootControl() || appInstance.isVisible){
			//this.hideLoader(function(){
				callback && callback(appInstance);
			//});

			return;
		}
		
		//Set Browser Title
		//TODO Is this good here?
		document.title = appInstance.config.data.app.name;
		
		//Store Previous App
		var previousSapplication = this.getApp();
		
		//Set the app as current foreground app				
		_m_currentSapplication = appInstance;
		this._loadingSapplication = appInstance;	

		//Create or Update App Container
		appInstance.updateContainer();

		var viewer = this,
			$currentRoot = previousSapplication ? previousSapplication.$() : jQuery('#ui5strap-app-initial'),
			
			//Remove current app dom after transition
			currentRootCallbackI = 0,
			currentRootCallback = function(){
				currentRootCallbackI++
				if(currentRootCallbackI < 2){
					return;
				}
	
				if(previousSapplication){
					//Previous App onHidden
					previousSapplication.hidden(function(){
						viewer.removeStyle(previousSapplication);
					});
				}
				else{
					//Remove Initial View
					$currentRoot.remove();
				}
			},
	
			//Introduce new app dom
			preparedRootCallback = function(){
				currentRootCallback();
				
				//Current App onShown
				appInstance.shown(function(){
					//Show App Completed, trigger the Callback
					callback && callback.call(appInstance);
				});
			};

		//Load app css
		appInstance.includeStyle(function includeStyle_complete(){
			
			jQuery.sap.log.debug("Attaching root to DOM...");
			
			//Append App to DOM is not yet
			appInstance.attach(viewer._dom.$root[0]);
			
			//Create new Transition
			var transition = new ui5strap.ResponsiveTransition(
					{
					"transitionAll" : transitionName || appInstance.config.data.app.transition, 
					"$current" : $currentRoot, 
					"$next" : appInstance.$(), 
					id : appInstance.getId()
					}
			);
			
			//<DOM_ATTACH_TIMEOUT>
			window.setTimeout(function setTimeout_complete(){
				
				//Previous App onHide
				previousSapplication && previousSapplication.hide();
				
				//Current App onShow
				appInstance.show(function(){
					
					//RAF start
					ui5strap.polyfill.requestAnimationFrame(function RAF1(){
						
						//Prepare Transition
						transition.prepare();
						
						//RAF
						ui5strap.polyfill.requestAnimationFrame(function RAF2(){
							
							//Hide the loader
							//viewer.hideLoader(function(){
								//Execure Transition
								transition.execute(currentRootCallback, preparedRootCallback);
							
								//Set viewer to available
								viewer._loadingSapplication = null;
							//});
							
						});

					});
					//RAF end
				});
				
			}, domAttachTimeout);
			//</DOM_ATTACH_TIMEOUT>

		});	
	};

	/**
	* Removes app specific style from the head.
	* @Public
	*/
	ViewerMultiProto.removeStyle = function(appInstance){
		if(!appInstance.isVisible && 
			!appInstance.isVisibleInOverlay && 
			!appInstance.isVisibleEmbedded){
			appInstance.removeStyle();
		}
	};

	/*
	* ------------
	*
	* App Messages
	*
	* ------------
	*/
	
	/**
	 * Sends a message to one or multiple Apps that run within this Viewer instance
	 * @Public
	 */
	ViewerMultiProto.sendMessage = function(appMessage){
		if(!appMessage 
			|| !appMessage.receiver 
			|| !appMessage.sender
			|| !appMessage.message){
			//jQuery.sap.log.error("Cannot send message: parameters are missing.");
			return;
		}
		
		var receivers = appMessage.receiver;
		if(typeof receivers === 'string'){
			receivers = [receivers];
		}
		
		for(var i = 0; i < receivers.length; i++){
			var receiverAppId = receivers[i];
			var app = this.getApp(receiverAppId);

			if(app){
				app.onMessage(new sap.ui.base.Event("ui5strap.app.message", null, appMessage));
			}
			else{
				jQuery.sap.log.error("Cannot send message to app " + receiverAppId);
			}
			
	    }

	    if(appMessage.export && self !== top){
	    	//Send the Message as Html Frame Message to the Frame parent.
	    	//TODO more precise origin control
	    	delete appMessage.export;
	    	parent.postMessage(appMessage, '*');
	    }
	};

	/*
	* -------------
	*
	* Global Loader
	*
	* -------------
	*/

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerMultiProto.showLoader = function(callback){
		ui5strap.Layer.setVisible('ui5strap-loader', true, callback);
	};

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerMultiProto.hideLoader = function(callback){
		ui5strap.Layer.setVisible('ui5strap-loader', false, callback);
	};

	/*
	* -------------
	*
	* TODO
	*
	* -------------
	*/

	/**
	* Get the console control reference
	* @public
	*/
	ViewerMultiProto.getConsole = function(){
		return this._console;
	};

	/**
	* Inititalizes the dom cache
	* @Protected
	*/
	ViewerMultiProto._initDom = function(){
		var _this = this;

		this._dom = {};

		this._dom.$body = jQuery(document.body);
		this._dom.$root = jQuery('#' + this.options.container);

		if(this._dom.$root.length === 0){
			throw new Error('Root Container not found in HTML: ' + this.options.container);
		}
	};

	

	/**
	+ Initializes the console
	* @Protected
	*/
	ViewerMultiProto._initConsole = function(){
		if(this.options.enableConsole){
			jQuery.sap.require("ui5strap.Console");
			this._console = new ui5strap.Console();
		}
	};	

	/**
	* Inititalizes the events
	* @Protected
	*/
	ViewerMultiProto._initEvents = function(){
		var _this = this;
		/*
		jQuery(document)
		
		.on('keyup', function(e) {
	      		var evtobj = window.event? window.event : e

	      		sappmaker.log.debug("Key pressed: " + evtobj.keyCode);

	      		if (evtobj.keyCode === 84){
	      			var apps = _m_loadedSapplicationsById;

	      			for(var appUrl in apps){
	      				apps[appUrl].fireEventAction({ 
							"scope" : "app",
							"eventName" : "keyUp",
							"eventData" : evtobj
						});
	      			};


	      		}
	      		else if (evtobj.keyCode === 67){
	      			if(viewer.options.enableConsole){
		      			if(viewer.isOverlayVisible()){ 
		      				viewer.hideOverlay();
		      			}
		      			else{
		      				var viewerConsole = viewer.getConsole();
		      				viewerConsole.setCurrentLog(viewer.getApp().getId());
		      				viewer.showOverlay(viewerConsole, function(){
		      						viewerConsole.flush();
		      				});
		      				
		      			}
	      			}		
	      		}
	      		else if (evtobj.keyCode === 70){
	      			viewer.requestFullscreen();
	      		}
			}
		)
		
		.on('swipeupdown', function anon_eventSwipeUpDown(eventData){

				var appInstances = _m_loadedSapplicationsById;

	      			for(var appUrl in appInstances){
	      				appInstances[appUrl].fireEventAction({ 
							"scope" : "app",
							"eventName" : "swipeUpDown",
							"eventData" : eventData
						});
	      			};
		});
		*/
		
		//Listen to Html Frame Messages
		window.addEventListener(
			"message", 
			function(event){
				var appMessage = event.data;
				if(appMessage 
					&& appMessage.receiver 
					&& appMessage.sender
					&& appMessage.message){
					
					appMessage.origin = event.origin;
					
					_this.sendMessage(appMessage);
				}
			}, 
			false
		);
		
		//Listen to Html Frame Messages
		window.addEventListener(
			"resize", 
			function(event){
				var appIds = Object.keys(_m_loadedSapplicationsById);
				for(var i = 0; i < appIds.length; i++){
					_m_loadedSapplicationsById[appIds[i]].onResize(new sap.ui.base.Event("ui5strap.app.resize", null, {}));
				}
			},
			false
		);
	};
	
	return ViewerMulti;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.RestClient
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

sap.ui.define(['./library', './AppComponent'], function(library, AppComponent){

	var RestClient = AppComponent.extend("ui5strap.RestClient", {
		"constructor" : function(app, options){
			AppComponent.call(this, app, options);
			
			this._createMethods();
		}
	}),
	RestClientProto = RestClient.prototype;

    RestClient.CONTENT_TYPE_TEXT = 'text/plain';
    RestClient.CONTENT_TYPE_XML = 'application/xml';
    RestClient.CONTENT_TYPE_JSON = 'application/json';
    RestClient.CONTENT_TYPE_FORM_URL_ENCODED = 'application/x-www-form-urlencoded';
    RestClient.CONTENT_TYPE_FORM_MULTIPART = 'multipart/form-data';

    RestClient.CHARSET_UTF8 = 'UTF-8';

    RestClient.RESPONSE_DATA_TYPE_TEXT = 'text';
    RestClient.RESPONSE_DATA_TYPE_HTML = 'html';
    RestClient.RESPONSE_DATA_TYPE_SCRIPT = 'script';
    RestClient.RESPONSE_DATA_TYPE_JSON = 'json';
    RestClient.RESPONSE_DATA_TYPE_JSONP = 'jsonp';
    RestClient.RESPONSE_DATA_TYPE_XML = 'xml';
    
    RestClientProto._createMethods = function(){
    	var methodsSettings = this.options.methods;
    	if(!methodsSettings){
    		return;
    	}
    	
    	var _this = this,
    		methods = Object.keys(methodsSettings),
    		methodsLength = methods.length;
    	
    	for(var i = 0; i < methodsLength; i++){
    		(function(){
	    		var methodName = methods[i],
	    			methodData = methodsSettings[methodName],
	    			methodType = methodData.type,
	    			path = methodData.path;
	    		
	    		if(!methodType){
	    			return;
	    		}
	    		
	    		if(!path){
	    			throw new Error("Path is required!");
	    		}
	    		
	    		var param = jQuery.extend({}, methodData);
	    		
	    		//Delete provided type
	    		delete param.type;
	    		
	    		if(methodType === "get"){
	    			_this[methodName] = function(){
	    				return this._get(this._buildParam(param, arguments));
	    			};
	    		}
	    		else if(methodType === "postWithPayload"){
	    			_this[methodName] = function(){
	    				return this._postWithPayload(this._buildParam(param, arguments));
	    			};
	    		}
	    		else if(methodType === "postUrlEncoded"){
	    			_this[methodName] = function(){
	    				return this._postUrlEncoded(this._buildParam(param, arguments));
	    			};
	    		}
	    		
    		}());
    	}
    	
    };
    
    /**
     * @Protected
     */
    RestClientProto._buildParam = function(param, args){
    	if(!param.arguments){
    		return param;
    	}
    	
    	for(var j=0; j<param.arguments.length; j++){
			var p = param.arguments[j].split("."),
				key = p[0];
    		
    		if(key === "path"){
    			if(!param.pathParameters){
    				param.pathParameters = {};
    			}
    			param.pathParameters[p[1]] = args[j];
    		}
    		else if(key === "query"){
    			if(!param.queryParameters){
    				param.queryParameters = {};
    			}
    			param.queryParameters[p[1]] = args[j];
    		}
    		else if(key === "post"){
    			if(!param.postParameters){
    				param.postParameters = {};
    			}
    			param.postParameters[p[1]] = args[j];
    		}
    		else if(key === "payload"){
    			param.payload = args[j];
    		}
    		else if(key === "success"){
    			param.success = args[j];
    		}
    		else if(key === "error"){
    			param.error = args[j];
    		}
		}
    	
    	return param;
    };
    
    /**
    * Parses a path and replaces {placeholder} with values of pathParam directory, if present.
    * @protected
    */
    RestClientProto._parsePath = function(path, pathParam){
        pathParam = pathParam || {};
        return path.replace(/\{([a-zA-Z0-9]+)\}/g, function(m0, m1){
            return pathParam[m1];
        });
    };

    /**
    * Determine the final request URL based on given options
    * @protected
    */
    RestClientProto._determineRequestURL = function(options){
        var urlBase = this.options.url;
        return (jQuery.sap.endsWith(urlBase, "/") ? urlBase : urlBase + '/') + this._parsePath(options.path, options.pathParameters);
    };
    
    /**
     * Global beforeSend
     */
    RestClientProto._beforeSend = function(xhr, options){
    	
    };
    
    /**
     * Global request headers
     */
    RestClientProto._requestHeaders = function(options){
    	return {};
    };
    
    /**
    * GET Request with Query Parameters
    * @protected 
    */
    RestClientProto._get = function(options){
    	var _this = this;
    	
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }
        
        var requestHeaders = this._requestHeaders(options);
        
        if(options.requestHeaders){
        	jQuery.extend(requestHeaders, options.requestHeaders);
        }

        jQuery.ajax({
            data: options.queryParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'GET',
            url: this._determineRequestURL(options),
            headers : requestHeaders,
            beforeSend: function (xhr) {
            	_this._beforeSend(xhr, options);
            },
            success : options.success,
            error : options.error
        });
    };

    /**
    * POST Form URL encoded
    * @protected
    */
    RestClientProto._postUrlEncoded = function(options){
    	var _this = this;
    	
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }
        
        var requestHeaders = this._requestHeaders(options);
        
        if(options.requestHeaders){
        	jQuery.extend(requestHeaders, options.requestHeaders);
        }

        var postUrl = this._determineRequestURL(options);

        if(options.queryParameters){
            postUrl += '?' + (-1 === postUrl.indexOf('?') ? '?' : '&') + jQuery.param(options.queryParameters);
        }

        jQuery.ajax({
            data: options.postParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'POST',
            url: postUrl,
            headers : requestHeaders,
            beforeSend: function (xhr) {
            	_this._beforeSend(xhr, options);
            },
            success : options.success,
            error : options.error
        });
    };

    /**
    * POST Object as JSON
    * @protected
    */
    RestClientProto._postWithPayload = function(options){
    	var _this = this;
    	
    	if(!options.requestContentType){
            options.requestContentType = RestClient.CONTENT_TYPE_JSON + '; charset=' + RestClient.CHARSET_UTF8;
        }

        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }
        
        var requestHeaders = this._requestHeaders(options);
        
        if(options.requestHeaders){
        	jQuery.extend(requestHeaders, options.requestHeaders);
        }
        
        var postUrl = this._determineRequestURL(options);

        if(options.queryParameters){
            postUrl += '?' + (-1 === postUrl.indexOf('?') ? '?' : '&') + jQuery.param(options.queryParameters);
        }

        jQuery.ajax({
            contentType: options.requestContentType,
            data: JSON.stringify(options.payload),
            dataType: options.responseDataType,
            processData: false,
            type: 'POST',
            url: postUrl,
            headers : requestHeaders,
            beforeSend: function (xhr) {
            	_this._beforeSend(xhr, options);
            },
            success : options.success,
            error : options.error
        });
    };

    //Return Module Constructor
    return RestClient;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Button
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Button = ControlBase.extend("ui5strap.Button", {
		metadata : {
			interfaces : ["ui5strap.ISelectableItem"],
			
			defaultAggregation : "content",
			library : "ui5strap",
			
			properties : { 
				type : {
					type: "ui5strap.ButtonType", 
					defaultValue: ui5strap.ButtonType.Button
				},
				text : {
					type: "string", 
					defaultValue: ""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				selectable : {
					type : "boolean",
					defaultValue : true
				},
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				
				//@deprecated
				bsAction : {
					deprecated : true,
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				align : {
					deprecated : true,
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
				
				//TODO Rename 'tap' event to 'press' sometimes
		        "tap":{}
		    }

		}
	}),
	ButtonProto = Button.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonProto._getStyleClassRoot = function(){
		var type = this.getType(),
			classAdd = "";
		if(ui5strap.ButtonType.Default !== type){
			classAdd = " " + this._getStyleClassType(type);
		}
		
		//Bootstrap classes
		if(type === ui5strap.ButtonType.Button || ui5strap.ButtonType.Block === type){
			classAdd += " btn";
			classAdd += " btn-" + ui5strap.BSSeverity[this.getSeverity()];
		    
			var size = this.getSize();
			if(ui5strap.Size.Default !== size){
				classAdd += ' btn-' + ui5strap.BSSize[size];
		    }

		    if(ui5strap.ButtonType.Block === type){
		    	classAdd += " btn-block";
			}
		}
		else if(type === ui5strap.ButtonType.Link){
			classAdd += " btn btn-link";
		}
		else if(type === ui5strap.ButtonType.Close || type === ui5strap.ButtonType.Icon){
			classAdd += " close";
		}
		
		//Selected
		if(this.getSelected()){
			classAdd + " active";
		}
		
		//Bootstrap Actions (deprecated)
		var action = this.getBsAction();
		//Navbar toggle
		//@deprecated
		if(action === ui5strap.BsAction.ToggleNavbar){
			classAdd + " btn-toggle-navbar";
		}
		//Sidenav toggle
		//@deprecated
		else if(action === ui5strap.BsAction.ToggleSidenav){
			classAdd + " btn-toggle-sidenav";
		}
		
		return this._getStyleClassPrefix() + classAdd;
	};
	
	ui5strap.Utils.dynamicAttributes(
		ButtonProto, 
		[
			"title"
		]
	);

	ui5strap.Utils.dynamicText(ButtonProto);

	ui5strap.Utils.dynamicClass(ButtonProto, 'selected', { 'true' : 'active' });
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ButtonProto._handlePress = function(oEvent) {
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		
		if (this.getEnabled()) {
			this.fireTap({});
		}
	};
	
	if(ui5strap.support.touch){	
		ButtonProto.ontap = ButtonProto._handlePress;
	}
	else{
		ButtonProto.onclick = ButtonProto._handlePress;
	}
	
	return Button;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ButtonRenderer = {};

	ButtonRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl);

		ui5strap.RenderUtils.renderContent(rm, oControl);

		rm.write("</button>");

	    ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ButtonRenderer.startRender = function(rm, oControl) {
		var size = oControl.getSize(),
			action = oControl.getBsAction(),
			title = oControl.getTitle();

		rm.write("<button");
	    
	    rm.writeControlData(oControl);
	    
	    rm.addClass(oControl._getStyleClass());
	
	    //@deprecated
	    ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');

	    rm.writeClasses();
	    
	    if('' !== title){
	    	rm.writeAttribute('title', title);
	    }
	    
		if(!oControl.getEnabled()){
			rm.writeAttribute("disabled", "disabled");
		}
		
		//Modal close button
		//@deprecated
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		
	    rm.write(">");
	};

	return ButtonRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Console
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Console = ControlBase.extend("ui5strap.Console", {
		metadata : {

			library : "ui5strap",
			properties : { 
				"logLevel" : {
					type:"int", 
					defaultValue:0
				}
			},

		}
	}),
	ConsolePrototype = Console.prototype;

	Console.LOG_DEFAULT = '__DEFAULT_LOG';
	Console.MAX_SIZE = 200;
	Console.MAX_LINES = 500;

	//Object vars
	ConsolePrototype._currentLogName = null;
	ConsolePrototype._firstLineNr = null;
	ConsolePrototype._scrollTimer = null;

	ConsolePrototype.init = function(){
		this._scrollTimer = null;

		this._firstLineNr = 0;
		this._logs = {}; 

		this.setCurrentLog(Console.LOG_DEFAULT);
	};

	ConsolePrototype.setCurrentLog = function(logName){
		this._currentLogName = logName;

		if(!(this._currentLogName in this._logs)){
			this._logs[this._currentLogName] = [];
		}

	};

	ConsolePrototype.setLogLevel = function(newLogLevel){
		this.setProperty("logLevel", newLogLevel, true);
	}; 

	ConsolePrototype.setBuffer = function(buffer){
		this._logs = buffer;
	};

	ConsolePrototype.getBuffer = function(){
		return this._logs;
	};

	Console.dateString = function(){
	    var d = new Date();
	    
	    var dateMonth = (d.getMonth() + 1);
	    if(dateMonth < 10) dateMonth = '0' + dateMonth;
	    
	    var dateDay = d.getDate();
	    if(dateDay < 10) dateDay = '0' + dateDay;

	    var dateHour = d.getHours();
	    if(dateHour < 10) dateHour = '0' + dateHour;

	    var dateMinutes = d.getMinutes();
	    if(dateMinutes < 10) dateMinutes = '0' + dateMinutes;
	    
	    var dateSeconds = d.getSeconds();
	    if(dateSeconds < 10) dateSeconds = '0' + dateSeconds;

	    return d.getFullYear() + '-' + dateMonth + '-' + dateDay + ' ' + dateHour + ':' + dateMinutes + ':' + dateSeconds;
	};

	ConsolePrototype.addLine = function(line, logType, logName){
		if(typeof logType === 'undefined' || null === logType){
			logType = 'info';
		}

		if(typeof logName === 'undefined' || null === logName){
			logName = Console.LOG_DEFAULT;
		}

		if(!(logName in this._logs)){
			this._logs[logName] = [];
		}

		this._logs[logName].push({
			"logType" : logType,
			"message" : line,
			"date" : Console.dateString()
		});

		if(null !== this._scrollTimer){
			return;
		}

		this._scrollTimer = window.setTimeout(jQuery.proxy(function(){

			

			if(logName === this._currentLogName){
					this.flush();

					this._scrollToBottom();
					
			}


			if(this._logs[logName].length > Console.MAX_SIZE){
				var toDelete = this._logs[logName].length - Console.MAX_SIZE;
				this._firstLineNr += toDelete;
				this._logs[logName].splice(0, toDelete);
			}

			this._scrollTimer = null;
		}, this), 100);	
	};

	ConsolePrototype.flush = function(){
		var logName = this._currentLogName;
		
		if(!(logName in this._logs)){
			throw new Error("Cannot flush undefined log: '" + logName + "'");
		}

		//We dont need to flush an empty log
		if(0 === this._logs[logName].length){
			return;
		}

		//console.log(this._logs, this._currentLogName);
		var $console = this.$().find('.ui5strap-console');
		if($console.size() > 0){
			var $consoleInner = $console.find('.ui5strap-console-inner');

			var startAt = 0;

			if($consoleInner.size() > 0){
				var oldLogName = $consoleInner.attr('data-log-name');

				if(oldLogName === logName){
					var lastLineNo = parseInt($consoleInner.attr('data-last-line-no'));

					if(lastLineNo >= this._firstLineNr){
						startAt = lastLineNo - this._firstLineNr + 1;
					}

					$consoleInner.detach();
				}
				else{ 
					$consoleInner.remove();
					$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + logName + '" data-log-name="' + logName + '"></div>');
					
				}
			}
			else{ 
				$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + logName + '" data-log-name="' + logName + '"></div>');
				
			}

			

			var lastLineNo = null;
			for(var i = startAt; i < this._logs[logName].length; i++){
				var line = this._logs[logName][i];
				lastLineNo = i + this._firstLineNr;
				$consoleInner.append('<div class="ui5strap-console-line ui5strap-console-line-' + line.logType  + '" data-line-no="' + lastLineNo + '">' + lastLineNo + ' ' + line.date + ' ' + line.message.replace(/\n/g, '<br />') + '</div>');
			}

			if(null !== lastLineNo){
				$consoleInner.attr('data-last-line-no', lastLineNo);
			}

			
			
			//Remove old lines
			
			var $lines = $consoleInner.find('.ui5strap-console-line');
			var i=0;
			var toDelete = $lines.size() - Console.MAX_LINES;
			while(i < toDelete){
				$lines[i].remove();
				i++;
			}

			$console.append($consoleInner);
			
		}
	};

	ConsolePrototype._scrollToBottom = function(scrollY){
		var $inner = this.$().find('.ui5strap-console');
		if($inner.size() > 0){
				$inner[0].scrollTop = scrollY ? scrollY : $inner[0].scrollHeight;
		}
	};

	ConsolePrototype.info = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.INFO){
			this.addLine(message, 'info', logName);
		}
	};

	ConsolePrototype.debug = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.DEBUG){
			this.addLine(message, 'debug', logName);
		}
	};

	ConsolePrototype.warning = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.WARNING){
			this.addLine(message, 'warning', logName);
		}
	};

	ConsolePrototype.error = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.ERROR){
			this.addLine(message, 'error', logName);
		}
	};

	ConsolePrototype.fatal = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.FATAL){
			this.addLine(message, 'fatal', logName);
		}
	};

	ConsolePrototype.onBeforeRendering = function(){
        if(this.getDomRef()){
            this._scrollTop = this.$().find('.ui5strap-console')[0].scrollTop;

            this._$controlContent = this.$().children().first().detach();
		}
	};

	ConsolePrototype.onAfterRendering = function(){
        if(null !== this._$controlContent){
            this._scrollToBottom(this._scrollTop);
			
			this.flush();

            this.$().html(this._$controlContent);

            this._$controlContent = null;
		}
        else{
            this.flush();
        }
    };
    
    return Console;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ConsoleRenderer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ConsoleRenderer = {};

	ConsoleRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-console-container");
		rm.writeClasses();
		rm.write(">");
		    
	   		rm.write("<div");
	   		rm.addClass("ui5strap-console");
	   		rm.writeClasses();
		    rm.write(">");
		    
		    rm.write("<div");
	   		rm.addClass("ui5strap-console-inner");
	   		rm.writeClasses();
		    rm.write(">");
		    
		    rm.write("</div>");
		rm.write("</div>");
		    
		rm.write("</div>");
	};

	return ConsoleRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Sandbox
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Sandbox = ControlBase.extend("ui5strap.Sandbox", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				src : {
					type : "string", 
					defaultValue : ""
				}, 
				frameName : {
					type : "string", 
					defaultValue : ""
				}
			}

		}
	}),
	SandboxProto = Sandbox.prototype;

	SandboxProto.init = function(){
		var iframe = document.createElement('iframe');
		iframe.className = 'sandbox-iframe';
		iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-pointer-lock'; //allow-popups
		iframe.id = this.getId() + '----iframe';
		this.$iframe = jQuery(iframe);
	};


	SandboxProto.setSrc = function(src){
		this.$iframe.attr('src', src);
		this.setProperty('src', src, this.getDomRef());
	};
	
	SandboxProto.goHistoryBack = function(){
		this.$iframe[0].contentWindow.history.go(-1);
	};
	
	SandboxProto.goHistoryForward = function(){
		this.$iframe[0].contentWindow.history.go(1);
	};
	
	SandboxProto.refreshContent = function(){
		this.$iframe[0].contentWindow.location.reload();
	};

	SandboxProto.setFrameName = function(frameName){
		this.$iframe.attr('frameName', frameName);
		this.setProperty('frameName', frameName, this.getDomRef());
	};

	SandboxProto.onBeforeRendering = function(){
        if(this.getDomRef()){
            this.$iframe.detach();
		}
	};

	SandboxProto.onAfterRendering = function(){
		this.$().html(this.$iframe);
	};

	SandboxProto.sendMessage = function(appMessage, targetOrigin){
		this.$iframe[0].contentWindow.postMessage(appMessage, targetOrigin);
	};
	
	return Sandbox;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.SandboxRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var SandboxRenderer = {};

	SandboxRenderer.render = function(rm, oControl) {
		 rm.write("<div");
		 rm.writeControlData(oControl);
		 rm.addClass("sandbox");
		 rm.writeClasses();
		 rm.write(">");
		 rm.write("</div>");
	};
	
	return SandboxRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Icon
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Icon = ControlBase.extend("ui5strap.Icon", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				iconSet : {
					type:"string", 
					defaultValue:"fa"
				},
				icon : {
					type:"string", 
					defaultValue:""
				},
				type : {
					type:"ui5strap.IconType",
					defaultValue:ui5strap.IconType.Default
				},
				fixedWidth : {
					type : "boolean",
					defaultValue : false
				},
				border : {
					type : "boolean",
					defaultValue : false
				},
				spin : {
					type : "boolean",
					defaultValue : false
				},
				inverse : {
					type : "boolean",
					defaultValue : false
				},
				size : {
					type : "ui5strap.IconSize",
					defaultValue : ui5strap.IconSize.Default
				},
				align : {
					type : "ui5strap.Alignment",
					defaultValue : ui5strap.Alignment.Default
				},
				transform : {
					type : "ui5strap.IconTransform",
					defaultValue : ui5strap.IconTransform.Default
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		}
	});
	
	return Icon;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.IconRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var IconRenderer = {

		sizeToClass : {
		    Large : "lg",
		    X2 : "2x",
		    X3 : "3x",
		    X4 : "4x",
		    X5 : "5x"
		  },

		 transformToClass : {
		    Rotate90 : "rotate-90",
		    Rotate180 : "rotate-180",
		    Rotate270 : "rotate-270",
		    FlipHorizontal : "flip-horizontal",
		    FlipVertical : "flip-vertical"
		  }
	};

	IconRenderer.render = function(rm, oControl) {
		var iconGroup = oControl.getIconSet(),
			size = oControl.getSize(),
			transform = oControl.getTransform(),
			severity = oControl.getSeverity(),
			prefix = iconGroup+'-',
			modPrefix = 'fa-';


		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-icon " + iconGroup);
		rm.addClass(prefix+oControl.getIcon());

		if(size !== ui5strap.IconSize.Default){
			rm.addClass(modPrefix+this.sizeToClass[size]);
		}

		if(transform !== ui5strap.IconTransform.Default){
			rm.addClass(modPrefix+this.transformToClass[transform]);
		}

		ui5strap.RenderUtils.alignment(rm, oControl);

		if(oControl.getFixedWidth()){
			rm.addClass(modPrefix+'fw')
		}

		if(oControl.getSpin()){
			rm.addClass(modPrefix+'spin')
		}

		if(oControl.getInverse()){
			rm.addClass(modPrefix+'inverse')
		}

		if(oControl.getBorder()){
			rm.addClass(modPrefix+'border')
		}

		if(ui5strap.IconType.FormFeedback === oControl.getType()){
			rm.addClass('form-control-feedback');
		}

		if(ui5strap.Severity.None !== severity){
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");
		rm.write("</span>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	return IconRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Link
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){
	
	var Link = ControlBase.extend("ui5strap.Link", {
		metadata : {

			library : "ui5strap",

			properties : { 
				
				text : {
					type:"string", 
					defaultValue : ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue : ""
				},
				
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue : ui5strap.TrailHtml.None
				},
				
				//Default functionality
				href : {
					type : "string", 
					defaultValue : ""
				},
				target  : {
					type : "string", 
					defaultValue : ""
				},	
				
				//@deprecated
				type : {
					deprecated : true,
					type : "ui5strap.LinkType",
					defaultValue : ui5strap.LinkType.Default
				},
				bsAction : {
					deprecated : true,
					type : "ui5strap.BsAction", 
					defaultValue : ui5strap.BsAction.None
				}
			},

			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			
			defaultAggregation : "content",
			
			events : {
				
				//TODO Rename 'tap' event to 'press' sometimes
		        tap : {allowPreventDefault : true}
		    }

		}
	}),
	LinkProto = Link.prototype;
	
	ui5strap.Utils.dynamicAttributes(
		LinkProto, 
		[
			"title",
			"href",
			"target"
		]
	);

	ui5strap.Utils.dynamicText(LinkProto);
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	LinkProto._handlePress = function(oEvent) {
		//if (this.getEnabled()) {
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();

			if (!this.fireTap() || !this.getHref()) {
				oEvent.preventDefault();
			}
		//} else {
		//	oEvent.preventDefault();
		//}
	};
	
	if(ui5strap.support.touch){
		LinkProto.ontap = LinkProto._handlePress;
	}
	else{
		LinkProto.onclick = LinkProto._handlePress;
	}
	
	return Link;

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.LinkRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var LinkRenderer = {

		typeToClass : {
			Thumbnail : "thumbnail"
		}
	};

	LinkRenderer.render = function(rm, oControl) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			action = oControl.getBsAction(),
			target = oControl.getTarget();
	
		rm.write("<a");
	
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
	
		rm.writeControlData(oControl);
		
		rm.addClass(oControl._getStyleClassRoot());
		
		var type = oControl.getType();
		if(ui5strap.LinkType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}
	
		if('' !== target){
			rm.writeAttribute('target', target);
		}
	
		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }
	
		rm.write(">");
		
		var text = oControl.getText(),
			parse = oControl.getParse();
	
		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
	
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write("</a>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};
	
	return LinkRenderer;
	
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Text
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Text = ControlBase.extend("ui5strap.Text", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				type : {
					type:"ui5strap.TextType", 
					defaultValue:ui5strap.TextType.Default
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				textAlign : {
					type : "ui5strap.TextAlignment",
					defaultValue : ui5strap.TextAlignment.Default
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	}),
	TextProto = Text.prototype;

	TextProto.setText = function(newText, suppressInvalidate){
		ui5strap.Utils.updateText(this, this.$(), newText, suppressInvalidate);
	};

	TextProto.setTitle = function(newTitle){
		ui5strap.Utils.updateAttribute(this, 'title', newTitle);
	};

	return Text;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.TextRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {


	var TextRenderer = {
		typeToTag : {
			Default : { 
				tagName : "span",
				className : null
			},
			Strong : {
				tagName : "strong",
				className : null
			},
			Emphasized : {
				tagName : "em",
				className : null
			},
			Paragraph : {
				tagName : "p",
				className : null
			},
			Blockquote : {
				tagName : "blockquote",
				className : null
			},
			Quote : {
				tagName : "q",
				className : null
			},
			Preformatted : {
				tagName : "pre",
				className : null
			},
			Code : {
				tagName : "code",
				className : null
			},
			Small : {
				tagName : "small",
				className : null
			},
			Lead : {
				tagName : "p",
				className : "lead"
			},
			Abbreviation : {
				tagName : "abbr",
				className : null
			},
			HelpBlock : {
				tagName : "p",
				className : "help-block"
			},
			FormStatic : {
				tagName : "p",
				className : "form-static"
			},
			Label : {
				tagName : "span",
				className : "label"
			},
			Badge : {
				tagName : "span",
				className : "badge"
			},
			
			//Deprecated
			Phrasing : {
				tagName : "span",
				className : null
			}
			
 		}

	};

	TextRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse(),
			title = oControl.getTitle(),
			textAlign = oControl.getTextAlign();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		//Text with tag
		var tagData = this.typeToTag[type];

		rm.write("<" + tagData.tagName);
		rm.writeControlData(oControl);
		
		//CSS Classes
		if(ui5strap.TextType.Label === type){
			//Severity for labels
			rm.addClass("label-" + ui5strap.BSSeverity[ui5strap.Severity.None === severity ? ui5strap.Severity.Default : severity]);
		}
		else if(ui5strap.Severity.None !== severity){
			//Severity for general text
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		
		if(ui5strap.TextAlignment.Default !== textAlign){
			rm.addClass("ui5strap-text-align-" + textAlign.toLowerCase());
		}
		
		if(tagData.className){
			rm.addClass(tagData.className);
		}
		
		rm.writeClasses();
		
		//Title
		if('' !== title){
    		rm.writeAttribute('title', title);
    	}
		
		rm.write(">");
			
			//Content
			ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write("</" + tagData.tagName + ">");

		
		
		//Trail
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	return TextRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.TextInput
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var TextInput = ControlBase.extend("ui5strap.TextInput", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type : "ui5strap.TextInputType",
					defaultValue : ui5strap.TextInputType.FormControl
				},
				format : {
					type : "ui5strap.TextInputFormat",
					defaultValue : ui5strap.TextInputFormat.Default
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				rows : {
					type: "int",
					defaultValue : 1
				},
				placeholder : {
					type:"string", 
					defaultValue:""
				},
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			},
			
			events : {
				change : {}
			}

		}
	}),
	TextInputProto = TextInput.prototype;
	
	TextInputProto.onAfterRendering = function(){
		var _this = this;
		this.$().on('change', function(){
			var newValue = _this.$().val(),
				oldValue = _this.getValue();
			
			if(newValue !== oldValue){ 
				_this.setProperty("value", newValue, true);
			}
			
			_this.fireChange({
				"oldValue" : oldValue
			});
		});
	};

	TextInputProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	TextInputProto.setValue = function(sValue, bSuppressInvalidate) {
		if(this.getDomRef()){
			this.setProperty("value", sValue, true);
			
			if (this.$().val() != sValue) {
				this.$().val(sValue);
				//this._curpos = this._$input.cursorPos();
			}
		}
		else{
			this.setProperty("value", sValue, bSuppressInvalidate);
		}
		
	};

	return TextInput;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.TextInputRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var TextInputRenderer = {};

	TextInputRenderer.render = function(rm, oControl) {
		var rows = oControl.getRows(),
			type = oControl.getType();

		if(1 === rows){
			
			rm.write("<input");
			
			rm.writeControlData(oControl);
			
			rm.writeAttribute('type', "text");

			rm.writeAttribute('placeholder', oControl.getPlaceholder());
			rm.writeAttribute('value', oControl.getValue());
			
			if(type === ui5strap.TextInputType.FormControl){
				rm.addClass('form-control');
			}
			
			if(!oControl.getEnabled()){
				rm.writeAttribute('disabled', 'disabled');
			}

			var size = oControl.getSize();
			if(ui5strap.Size.Default !== size){
				rm.addClass('input-' + ui5strap.BSSize[size]);
			}
			
			rm.writeClasses();
			rm.write("/>");

		}
		else if(1 < rows){
			rm.write("<textarea");
			
			rm.writeControlData(oControl);
			
			rm.writeAttribute('rows', rows);
			rm.writeAttribute('placeholder', oControl.getPlaceholder());
			
			if(type === ui5strap.TextInputType.FormControl){
				rm.addClass('form-control');
			}
			
			if(!oControl.getEnabled()){
				rm.writeAttribute('disabled', 'disabled');
			}

			rm.writeClasses();
			rm.write(">");
			
			rm.writeEscaped(oControl.getValue());
			
			rm.write("</textarea>");
		}

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	return TextInputRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.RadioButton
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var RadioButton = ControlBase.extend("ui5strap.RadioButton", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type:"ui5strap.RadioButtonType", 
					defaultValue:ui5strap.RadioButtonType.Block
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				groupName : {
					type : "string",
					defaultValue : ""
				},
				selected : {
					type : "boolean",
					defaultValue : false
				}
			}

		}
	}),
	RadioButtonProto = RadioButton.prototype;

	var _onChange = function(_this){
		return function(ev){
			var inputValue = _this.$checkbox.prop('checked');
			if(inputValue !== _this.getSelected()){ 
				_this.setProperty("selected", inputValue, true);
				_this.updateGroup();
			}
			
		}
	};

	RadioButtonProto.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + 'ui5strap-radio---' + this.getId());
		this.$checkbox.on('change', _onChange(this));
	};

	RadioButtonProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	RadioButtonProto.updateGroup = function() {
		var radio = this;
		jQuery('.ui5strap-radio-' + this.getGroupName()).each(function(i, o){
			var controlId = o.id.substr(17);
			if(controlId !== radio.getId()){
				sap.ui.getCore().byId(controlId).setSelected(false);
			}
		});
	};

	RadioButtonProto.setSelected = function(sValue) {
		var checkbox = this;
		sValue = this.validateProperty("selected", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
				checkbox.updateGroup();
			}


		}
//alert('test');
		
		return this;
	};
	
	return RadioButton;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.RadioButtonRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var RadioButtonRenderer = {};

	RadioButtonRenderer.render = function(rm, oControl) {
		var groupName = oControl.getGroupName(),
			type = oControl.getType(),
			typeBlock = ui5strap.RadioButtonType.Block;

		if(type === typeBlock){ 
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('radio');
			rm.writeClasses();
			rm.write(">");
		}
			
			rm.write("<label");
			if(type === ui5strap.RadioButtonType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('radio-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.RadioButtonType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', 'ui5strap-radio---' + oControl.getId());
				}
				rm.writeAttribute('type', 'radio');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeAttribute('name', groupName);
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.addClass('ui5strap-radio-' + groupName);
				rm.writeClasses();
				rm.write('/>');
					
					rm.writeEscaped(oControl.getLabel());
		
			rm.write("</label>");

		if(type === typeBlock){ 
			rm.write("</div>");
		}
	};
	
	return RadioButtonRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.SelectBox
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var SelectBox = ControlBase.extend("ui5strap.SelectBox", {
		metadata : {

			defaultAggregation : "items",

			library : "ui5strap",
			
			properties : { 
				type : {
					type: "ui5strap.SelectBoxType", 
					defaultValue: ui5strap.SelectBoxType.FormControl
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			},

			aggregations : { 
				items : {
					type : "ui5strap.Item",
					singularName: "items"
				} 
			}

		}
	}),
	SelectBoxProto = SelectBox.prototype;
	
	var _getInputValue = function(_this){
		return _this.$().val();
	};
	
	var _onChange = function(_this){
		return function(ev){
			var inputValue = _getInputValue(_this);
			if(inputValue !== _this.getValue()){ 
				_this.setProperty("value", inputValue, true);
			}
		}
	};

	SelectBoxProto.onAfterRendering = function(){
		this.$().on('change', _onChange(this));
	};

	SelectBoxProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	SelectBoxProto.setValue = function(sValue) {
		sValue = this.validateProperty("value", sValue);
		
		if (sValue != this.getValue()) {
			this.setProperty("value", sValue, true);
			if (this.getDomRef() && this.$().val() != sValue) {
				this.$().val(sValue);
				//this._curpos = this._$input.cursorPos();
			}
		}
		return this;
	};

	return SelectBox;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.SelectBoxRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var SelectBoxRenderer = {};

	SelectBoxRenderer.render = function(rm, oControl) {
		var size = oControl.getSize(),
			type = oControl.getType(),
			items = oControl.getItems();

		rm.write("<select");
		
		rm.writeControlData(oControl);
		
		if(oControl.getDisabled()){
			rm.writeAttribute('disabled', 'disabled');
		}
		if(ui5strap.Size.Default !== size){
			rm.addClass('input-' + ui5strap.BSSize[size]);
		}
		if(type === ui5strap.SelectBoxType.FormControl){
			rm.addClass('form-control');
		}
		rm.writeClasses();
		rm.write(">");

		for(var i = 0; i < items.length; i++){
			this.renderOption(rm, oControl, items[i]);
		}

		rm.write("</select>");
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	SelectBoxRenderer.renderOption = function(rm, oControl, item) {
		var itemValue = item.getValue();

			rm.write("<option");
			rm.writeAttribute("value", itemValue);
			if(oControl.getValue() === itemValue){
				rm.writeAttribute("selected", "selected");
			}
			rm.write(">");
			rm.writeEscaped(item.getText());
			rm.write("</option>");
	};

	return SelectBoxRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListItem
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var ListItem = ControlBase.extend("ui5strap.ListItem", {
		metadata : {
			interfaces : ["ui5strap.ISelectableItem"],
			
			defaultAggregation : "content",
			
			library : "ui5strap",

			properties : { 
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				selectable : {
					type : "boolean",
					defaultValue : true
				},
				text : {
					type:"string",
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				
				//@deprecated
				itemId : {
					deprecated: true,
					type:"string",
					defaultValue : ""
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	}),
	ListItemPrototype = ListItem.prototype;

	ui5strap.Utils.dynamicText(ListItemPrototype);

	//ui5strap.Utils.dynamicClass(ListItemPrototype, 'selected', { 'true' : 'active' });
	
	ListItemPrototype.setSelected = function(newSelected, suppressInvalidate){
		if(this.getDomRef()){
              if(newSelected){
                  this.$().addClass("active");
              }
              else{
                  this.$().removeClass("active");
              }
              

              this.setProperty("selected", newSelected, true);
          }
          else{
              this.setProperty("selected", newSelected, suppressInvalidate);
          }
	};
	
	return ListItem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ListItemRenderer = {};

	ListItemRenderer.render = function(rm, oControl) {
		var text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<li");
		rm.writeControlData(oControl);
		
		if(oControl.getSelected()){
			rm.addClass("active");
		}
		
		if(!oControl.getEnabled()){
			rm.addClass("disabled");
		}

		rm.writeClasses();

		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		rm.write("</li>");
	};
	
	return ListItemRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListBase
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var ListBase = ControlBase.extend("ui5strap.ListBase", {
		metadata : {
			interfaces : ["ui5strap.ISelectionProvider"],

			library : "ui5strap",
			
			properties : {
				selectionMode : {
					"type" : "ui5strap.SelectionMode",
					"defaultValue" : ui5strap.SelectionMode.None
				}
			},
			
			events:{
				selectionChange : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"}
					}
				},
				selectionChanged : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"}
					}
				},

				select : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"},
						srcControl : {type : "ui5strap.Control"}
					}
				},
				
				//TODO Rename 'tap' event to 'press' sometimes
				tap : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"},
						srcControl : {type : "ui5strap.Control"}
					}
				}

			}
		}
	}),
	ListBaseProto = ListBase.prototype,
	_defaultSelectionGroup = "selectionGroup";
	
	/**
	 * @Private
	 */
	var _changeSelection = function(_this, itemsToSelect, mode, selectionGroup){
		var items = _this._getItems(),
			changes = {
				"selected" : [],
				"deselected" : [],
				"changed" : [],
				"unchanged" : [],
			};
		
		if(!jQuery.isArray(itemsToSelect)){
			itemsToSelect = [itemsToSelect];
		}
		
		if(!selectionGroup){
			selectionGroup = _defaultSelectionGroup;
		}
		
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if(-1 !== jQuery.inArray(item, itemsToSelect)){
				//Item is subject to select / deselect
				if("replace" === mode || "add" === mode){
					if(!_this._isItemSelected(item, selectionGroup)){
						changes.selected.push(item);
						changes.changed.push(item);
						
						_this._setItemSelected(item, true, selectionGroup);
					}
					else{
						changes.unchanged.push(item);
					}
				}
				else if("remove" === mode){
					if(_this._isItemSelected(item, selectionGroup)){
						changes.deselected.push(item);
						changes.changed.push(item);
						
						_this._setItemSelected(item, false, selectionGroup);
					}
					else{
						changes.unchanged.push(item);
					}
				}
				else if("toggle" === mode){
					var selected = _this._isItemSelected(item, selectionGroup);
						
						if(!selected){
							changes.selected.push(item);
						}
						else{
							changes.deselected.push(item);
						}
						
						changes.changed.push(item);
						
						_this._setItemSelected(item, !selected, selectionGroup);
				}
			}
			else{
				//Item is no subject to select / deselect
				if("replace" === mode){
					if(_this._isItemSelected(item, selectionGroup)){
						changes.deselected.push(item);
						changes.changed.push(item);
						
						_this._setItemSelected(item, false, selectionGroup);
					}
					else{
						changes.unchanged.push(item);
					}
				}
				else if("add" === mode || "remove" === mode || "toggle" === mode){
					changes.unchanged.push(item);
				}
			}
		}
		
		if(changes.changed.length){
			_this.fireSelectionChange({ selectionChanges: changes });
		
			_this.fireSelectionChanged({ selectionChanges: changes });
		}
		
		return changes;
	};
	
	/**
	 * @Private
	 */
	var _changeSelectionIndices = function(_this, indices, mode, selectionGroup){
		var items = this._getItems();
		
		if(!jQuery.isArray(indices)){
			//Single value
			if(indices < 0 || indices >= items.length){
				throw new Error("Array out of bounds!");
			}
			
			return _changeSelection(_this, items[indices], mode, selectionGroup);
		}
		else{
			//1 dimensional array
			var itemsToSelect = [];
			for(var i=0; i<indices.length; i++){
				var index = indices[i];
				if(index < 0 || index >= items.length){
					throw new Error("Array out of bounds!");
				}
				itemsToSelect.push(items[index]);
			}
			
			return _changeSelection(_this, itemsToSelect, mode, selectionGroup);
		}
	};
	
	/**
	 * @Private
	 */
	var _changeSelectionByCustomData = function(_this, dataKey, values, mode, selectionGroup){
		var items = _this._getItems();
		
		if(!jQuery.isArray(values)){
			var selectedItem = null;
			
			for(var i = 0; i < items.length; i++){
				if(items[i].data(dataKey) === values){
					selectedItem = items[i];
					
					break;
				}
			}
			
			return _changeSelection(_this, selectedItem, mode, selectionGroup);
		}
		else{
			var itemsToSelect = [];
			
			for(var i = 0; i < items.length; i++){
				if(-1 !== jQuery.inArray(items[i].data(dataKey), values)){
					itemsToSelect.push(items[i]);
				}
			}
			
			return _changeSelection(_this, itemsToSelect, mode, selectionGroup);
		}
	};
	
	/*
	 * --------------------
	 * START implementation of ISelectionProvider interface
	 * --------------------
	 */
	
	/**
	 * Gets one or multiple selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelection = function(dimension, selectionGroup){
		var selection = this._getListSelection(selectionGroup);
		if(typeof dimension === "undefined"){
			return selection.items;
		}
		else if(0 === dimension){
			//Single value
			return selection.items.length ? selection.items[0] : null;
		}
		else if(1 === dimension){
			//1 dimensional array
			return selection.items;
		}
		else if(2 === dimension){
			//2 dimensional array
			return [selection.items];
		}
		else if(3 === dimension){
			//3 dimensional array
			return [[selection.items]];
		}
		else{
			throw new Error("Only 3 dimensions are supported by this Control.");
		}
	};
	
	/**
	 * Returns whether one or multiple items are currently part of selection.
	 * @Public
	 */
	ListBaseProto.isInSelection = function(itemsToCheck, selectionGroup){
		var inSelection = true;
		
		if(!jQuery.isArray(itemsToCheck)){
			itemsToCheck = [itemsToCheck];
		}
		
		for(var i = 0; i < itemsToCheck.length; i++){
			if(!this._isItemSelected(itemsToCheck[i], selectionGroup)){
				inSelection = false;
				break;
			}
		}
		
		return inSelection;
	};
	
	/**
	 * Tries to select one or multiple items and returns all changes.
	 * 
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "replace", selectionGroup);
	};
	
	/**
	 * Adds one or multiple items to selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "add", selectionGroup);
	};
	
	/**
	 * Removes one or multiple items from selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "remove", selectionGroup);
	};
	
	/**
	 * Toggles one or multiple items from selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.toggleSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "toggle", selectionGroup);
	};
	
	/*
	 * Index
	 */
	
	/**
	 * Gets one or multiple indices of selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelectionIndex = function(dimension, selectionGroup){
		var selection = this._getListSelection(selectionGroup);
		if(typeof dimension === "undefined"){
			return selection.indices;
		}
		else if(0 === dimension){
			//single value
			return selection.indices.length ? selection.indices[0] : undefined;
		}
		else if(1 === dimension){
			//1 dimensional array
			return selection.indices;
		}
		else if(2 === dimension){
			//2 dimensional array
			return [selection.indices];
		}
		else if(3 === dimension){
			//3 dimensional array
			return [[selection.indices]];
		}
		else{
			throw new Error("Only 3 dimensions are supported by this Control.");
		}
	};
	
	/**
	 * Returns whether one or multiple item indices are currently part of selection.
	 * @Public
	 */
	ListBaseProto.isInSelectionIndex = function(indices, selectionGroup){
		var items = _this._getItems();
		if(!jQuery.isArray(indices)){
			//Single value
			if(indices < 0 || indices >= items.length){
				throw new Error("Array out of bounds!");
			}
			
			return this.isInSelection(items[indices], selectionGroup);
		}
		else{
			var itemsToCheck = [];
			for(var i=0; i<indices.length; i++){
				var index = indices[i];
				if(index < 0 || index >= items.length){
					throw new Error("Array out of bounds!");
				}
				itemsToCheck.push(items[index]);
			}
			
			return this.isInSelection(itemsToCheck, selectionGroup);
		}
	};
	
	/**
	 * Selects one or multiple items by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "replace", selectionGroup);
	};
	
	/**
	 * Adds one or multiple items to selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "add", selectionGroup);
	};
	
	/**
	 * Removes one or multiple items from selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "remove", selectionGroup);
	};
	
	/**
	 * Toggles one or multiple items from selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.toggleSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "toggle", selectionGroup);
	};
	
	/*
	 * CustomData 
	 */
	
	/**
	 * Returns whether one or multiple items are currently part of selection. Items are selected by custom data key and possible values.
	 * @Public
	 */
	ListBaseProto.isInSelectionByCustomData = function(dataKey, values, selectionGroup){
		var items = _this._getItems();
		
		if(!jQuery.isArray(values)){
			for(var i = 0; i < items.length; i++){
				if(items[i].data(dataKey) === values){
					selectedItem = items[i];
					
					return this.isInSelection(selectedItem, selectionGroup);
				}
			}
		}
		else{
			var itemsToCheck = [];
			for(var i = 0; i < items.length; i++){
				if(-1 !== jQuery.inArray(items[i].data(dataKey), values)){
					itemsToCheck.push(items[i]);
				}
			}
			return this.isInSelection(itemsToCheck, selectionGroup);
		}
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "replace", selectionGroup);
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "add", selectionGroup);
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "remove", selectionGroup);
	};
	
	/**
	 * Toggles one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.toggleSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "toggle", selectionGroup);
	};
	
	/*
	 * Property
	 */
	
	/**
	 * Selects one or multiple items that have the given value in the specified property.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByProperty = function(propertyName, values, selectionGroup){
		throw new Error("Please implement ui5strap.ListBase.prototype.setSelectionByProperty");
	};
	
	/*
	 * ------------------
	 * END implementation of ISelectionProvider interface
	 * ------------------
	 */
	
	/*
	 * --------------------
	 * START implementation of IList interface
	 * --------------------
	 */
	/**
	 * Gets one or multiple selected items that have the given value in the specified custom data field.
	 * @Public
	 */
	ListBaseProto.getItemsByCustomData = function(dataKey, value){
		var items = this._getItems(),
			returnItems = [];
		for(var i = 0; i < items.length; i++){
			if(items[i].data(dataKey) === value){
				returnItems.push(items[i]);
			}
		}
		
		return returnItems;
	};
	
	/**
	 * Gets one or multiple selected items that have the given value in the specified property.
	 * @Public
	 */
	ListBaseProto.getItemsByProperty = function(propertyName, value){
		var items = this._getItems(),
			getter = "get" + jQuery.sap.charToUpper(propertyName, 0),
			returnItems = [];
		
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			
			if(!item[getter]){
				throw new Error("Item " + i + ": no such getter: " + getter);
			}
			
			if(item[getter]() === value){
				returnItems.push(items[i]);
			}
		}
		
		return returnItems;
	};
	
	/**
	 * @Public
	 */
	ListBaseProto.getItemIndex = function(item){
		return this.indexOfAggregation("items", item);
	};
	
	/*
	 * ------------------
	 * END implementation of IList interface
	 * ------------------
	 */
	
	/**
	 * Returns an array of selected items and their indices.
	 * 
	 * @Protected
	 */
	ListBaseProto._getListSelection = function(selectionGroup){
		if(!selectionGroup){
			selectionGroup = _defaultSelectionGroup;
		}
		
		var items = this._getItems(),
			selection = {
				indices : [],
				items : []
			};
		
		for(var i = 0; i < items.length; i++){
			if(this._isItemSelected(items[i], selectionGroup)){
				selection.items.push(items[i]);
				selection.indices.push(i);
			}
		}
		
		return selection;
	};
	
	/**
	 * Defines how to decide whether an item is selected within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._isItemSelected = function(item, selectionGroup){
		return item.getSelected();
	};
	
	/**
	 * Defines how to decide whether an item is enabled within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._isItemEnabled = function(item, selectionGroup){
		return item.getEnabled();
	};
	
	/**
	 * Defines how to decide whether an item is selectable within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._isItemSelectable = function(item, selectionGroup){
		return item.getSelectable();
	};
	
	/**
	 * Defines how to select an item within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._setItemSelected = function(item, selected, selectionGroup){
		item.setSelected(selected);
	};
	
	/**
	 * Gets the list of items. This depends on the available aggregations.
	 * @Protected
	 */
	ListBaseProto._getItems = function(){
		return this.getItems();
	};
	
	/**
	 * Defines how to find the closest item starting at any control within the item.
	 * For example, if you click a button somewhere within the list, this method finds the corresponding list item.
	 * @Protected
	 */
	ListBaseProto._findClosestItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.ListItem);
	};
	
	/**
	 * Adds additional event options.
	 * @Protected
	 */
	ListBaseProto._addEventOptions = function(eventOptions, oEvent){
		//@deprecated
		eventOptions.listItem = eventOptions.srcItem;
	};
	
	/*
	 * ----------------
	 * HANDLE UI EVENTS
	 * ----------------
	 */
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ListBaseProto._handlePress = function(oEvent){
		//console.log(oEvent.isMarked());
		
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		
		var item = this._findClosestItem(oEvent.srcControl),
			eventOptions = {
				srcControl : oEvent.srcControl,
				srcItem : item,
				srcItems : [item],
			};
				
		this._addEventOptions(eventOptions, oEvent);
		
		if(item && this._isItemEnabled(item, _defaultSelectionGroup)){
			//Item is enabled
			
			//Process selection
			var selectionMode = this.getSelectionMode();
			if(ui5strap.SelectionMode.None !== selectionMode 
					&& this._isItemSelectable(item, _defaultSelectionGroup)){
				//List allows selections and item is selectable
				
				var changes = null;
				
				if(selectionMode === ui5strap.SelectionMode.Single){
					changes = this.setSelection(item, _defaultSelectionGroup);
				}
				else if(selectionMode === ui5strap.SelectionMode.SingleToggle){
					if(this.isInSelection(item)){
						changes = this.removeSelection(item, _defaultSelectionGroup);
					}
					else{
						changes = this.setSelection(item, _defaultSelectionGroup);
					}
				}
				else if(selectionMode === ui5strap.SelectionMode.Multiple){
					changes = this.toggleSelection(item, _defaultSelectionGroup);
				}
				
				if(changes && changes.changed.length){
					eventOptions.selectionChanges = changes;
					
					//Select event is deprecated
					this.fireSelect(eventOptions);
				}
				else{
					jQuery.sap.log.debug("Event 'select' not fired: no changes in selection.");
				}
			}
			else{
				jQuery.sap.log.debug("[LIST#" + this.getId() + "] Did not select list item: List item not selectable.");
			}
			
			//TODO Rename 'tap' event to 'press' sometimes
			this.fireTap(eventOptions);
		}
		else{
			jQuery.sap.log.warning("Could not select list item: List item not found or disabled.");
		}
	};
	
	//Touchscreen
	if(ui5strap.support.touch){
		ListBaseProto.ontap = ListBaseProto._handlePress;
	}
	else{
		ListBaseProto.onclick = ListBaseProto._handlePress;
	}
	
	/*
	 * ----------
	 * DEPRECATED
	 * ----------
	 */
	
	/**
	 * Set list item selected by index
	 * @deprecated
	 */
	ListBaseProto.setSelectedIndex = function(itemIndex){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedIndex is deprecated! Use .setSelectionIndices instead.");
		
		return this.setSelectionIndices(itemIndex);
	};
 
	/**
	 * Get index of selected index
	 * @deprecated
	 */
	ListBaseProto.getSelectedIndex = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedIndex is deprecated! Use .getSelectionIndices instead.");
		
		return this.getSelectionIndices();
	};

	
	/**
	 * Set control selected by reference
	 * @deprecated
	 */
	ListBaseProto.setSelectedControl = function(item){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedControl is deprecated! Use .setSelection instead.");
	
		return this.setSelection(item);
	};
	
	/**
	 * Get selected list item control
	 * @deprecated
	 */
	ListBaseProto.getSelectedControl = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedControl is deprecated! Use .getSelection instead.");
		
		return this.getSelection();
	};
	
	/**
	 * Select by custom data value
	 * @deprecated
	 */
	ListBaseProto.setSelectedCustom = function(dataKey, value){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedCustom is deprecated! Use .setSelectionByCustomData instead.");
		
		return this.setSelectionByCustomData(dataKey, value);
	};
	
	return ListBase;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListLinkItem
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

sap.ui.define(['./library', './ListItem'], function(library, ListItem){

	var ListLinkItem = ListItem.extend("ui5strap.ListLinkItem", {
		metadata : {
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				bsAction : {
					deprecated : true,
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				title : {
					type:"string", 
					defaultValue:""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			}
		}
	}),
	ListLinkItemProto = ListLinkItem.prototype;

	ListLinkItemProto.setText = function(newText){
		ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
	};
	
	return ListLinkItem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListLinkItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var ListLinkItemRenderer = {};

	ListLinkItemRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, {});

		var text = oControl.getText(),
			parse = oControl.getParse();
	
		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
	
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		this.endRender(rm, oControl);
	};

	ListLinkItemRenderer.startRender = function(rm, oControl){
		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		this.startRenderLink(rm, oControl);
	};

	ListLinkItemRenderer.endRender = function(rm, oControl){
		rm.write('</a>');
		    
		rm.write("</li>");
	};
	
	ListLinkItemRenderer.startRenderLink = function(rm, oControl) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			target = oControl.getTarget();

		rm.write("<a");

		rm.writeAttribute('id', oControl.getId() + '---link');
		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		if('' !== target){
			rm.writeAttribute('target', target);
		}

		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

		rm.write(">");
	};
	
	return ListLinkItemRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupItem
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

sap.ui.define(['./library', './ListItem'], function(library, ListItem){

	var ListGroupItem = ListItem.extend("ui5strap.ListGroupItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				badge : {
					type:"string",
					defaultValue : ""
				},
				icon : {
					type:"string",
					defaultValue : ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				}
			}
		}
	});
	
	return ListGroupItem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ListGroupItemRenderer = {};

	ListGroupItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			icon = oControl.getIcon(),
			parent = oControl.getParent(),
			tag = parent.getListMode() === ui5strap.ListGroupMode.Default ? 'li' : 'a',
			text = oControl.getText(),
			parse = oControl.getParse(),
			severity = oControl.getSeverity();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group-item');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(ui5strap.Severity.None !== severity){
			//Severity for general text
			rm.addClass("list-group-item-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");

		if('' !== icon){
			rm.write('<span class="list-group-item-icon fa fa-' + icon + '"></span>');
		}
		
		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}
		
		
		
		ui5strap.RenderUtils.renderContent(rm, oControl);
		    
		rm.write("</"+ tag + ">");
	};
	
	return ListGroupItemRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMediaItem
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

sap.ui.define(['./library', './ListItem'], function(library, ListItem){

	var ListMediaItem = ListItem.extend("ui5strap.ListMediaItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "media",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				contentPlacement : {
					type : "ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.End
				},

				heading : {
					type : "string",
					defaultValue : ""
				}
			},
			aggregations : { 
				media : {
					multiple : false
				}
			}
		}
	}),
	ListMediaItemProto = ListMediaItem.prototype;
	
	/**
	 * TODO More efficient rerendering
	 */
	ListMediaItemProto.setText = function(newText, suppressInvalidate){
		this.setProperty('text', newText, suppressInvalidate);
	};
	
	return ListMediaItem;

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMediaItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ListMediaItemRenderer = {};

	ListMediaItemRenderer.render = function(rm, oControl) {
		var parent = oControl.getParent(),
			media = oControl.getMedia(),
			heading = oControl.getHeading(),
			tag = !(parent instanceof ui5strap.ListMedia) || parent.getContainer() ? 'div' : 'li',
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('media');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");

		if(null !== media){
			rm.write('<div class="media-left">');
				rm.renderControl(media);
			rm.write('</div>');
		}

		rm.write('<div class="media-body">');

		if('' !== heading){
			rm.write('<h4 class="media-heading">');
			rm.writeEscaped(heading);
			rm.write('</h4>');
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write('</div>');
		    
		rm.write("</"+ tag + ">");
	};
	
	return ListMediaItemRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Tooltip
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Tooltip = ControlBase.extend("ui5strap.Tooltip", {
	    metadata : {
	
	      // ---- object ----
	      defaultAggregation : "titleContent",
	      // ---- control specific ----
	      library : "ui5strap",
	      
	      properties : { 
	        
	        title : {
	          type:"string", 
	          defaultValue:""
	        },
	        
	        titleContentPlacement : {
	          type:"ui5strap.ContentPlacement",
	          defaultValue : ui5strap.ContentPlacement.Start
	        },
	
	        placement : {
	          type: "ui5strap.Placement", 
	          defaultValue: ui5strap.Placement.Right
	        },
	
	        trigger : {
	          type: "ui5strap.TriggerMode", 
	          defaultValue: ui5strap.TriggerMode.Hover
	        },
	
	        animate : {
	          type:"boolean", 
	          defaultValue:true
	        }
	
	      },
	      
	      aggregations : { 
	        titleContent : {
	          singularName: "titleContent"
	        },
	      },
	      
	      associations : {
	        source : {
	            multiple : false
	        }
	      },
	      events : {
	         shown : {},
	         hidden : {}
	      }
	
	    }
  });

  Tooltip.prototype.init = function(){
      this.sourceControl = null;
  };

  Tooltip.prototype.getSourceControl = function(){
      if(null === this.sourceControl){
        this.sourceControl = sap.ui.getCore().byId(this.getSource());
        
      }

      return this.sourceControl;
  };

  Tooltip.prototype.getSourceDomRef = function(){
      return this.getSourceControl().$();
  };

  Tooltip.prototype.onAfterRendering = function(){
    var $this = this.$(),
        _this = this;

    var tooltipOptions = {
      title : function(){
        var title = $this.find('.tooltip-data-title').html();
        var sourceControl = _this.getSourceControl();
        if('' === title && 'getTitle' in sourceControl){
             title = sourceControl.getTitle(); 
        }
        return title;
      },
      
      trigger : ui5strap.BSTriggerMode[this.getTrigger()],
      
      html : true,

      animation : _this.getAnimate()
    };

    var placement = this.getPlacement();
    if(placement !== ui5strap.Placement.None){
        if(placement !== ui5strap.Placement.Default){
          tooltipOptions.placement = ui5strap.BSPlacement[placement];
        }
        this.getSourceDomRef().tooltip(tooltipOptions);
    }

    this.getSourceDomRef().on('hidden.bs.tooltip', function(){
        _this.fireHidden();
    }).on('shown.bs.tooltip', function(){
        _this.fireShown();
    });
  };

  Tooltip.prototype.show = function(){
      this.getSourceDomRef().tooltip('show');
  };

  Tooltip.prototype.hide = function(){
      this.getSourceDomRef().tooltip('hide');
  };

  Tooltip.prototype.toggle = function(){
      this.getSourceDomRef().tooltip('toggle');
  };
  
  return Tooltip;
  
});

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * ui5strap.TooltipRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var TooltipRenderer = {};

	TooltipRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.writeAttribute("style", "display:none;");
		rm.addClass("tooltip-data");
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
			   
		rm.addClass("tooltip-data-title");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderTitleContent(rm, oControl);

		rm.write("</div>");
		rm.write("</div>");
		    
	};

	return TooltipRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMAppMessage
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMAppMessage = ActionModule.extend("ui5strap.AMAppMessage"),
		AMAppMessageProto = AMAppMessage.prototype;

	AMAppMessageProto.namespace = 'appMessage';

	AMAppMessageProto.parameters = {
		"receiver" : {
			"required" : true, 
			"type" : [ "string", "object"]
		},
		"message" : {
			"required" : true, 
			"type" : "object"
		},
		"toParent" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		}
	};

	/**
	* @Override
	*/
	AMAppMessageProto.run = function(){
		this.context.app.sendMessage(this.context.parameters[this.namespace]);
	};

	//Return Module Constructor
	return AMAppMessage;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCallControlMethod
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMCallControlMethod = ActionModule.extend("ui5strap.AMCallControlMethod"),
		AMCallControlMethodProto = AMCallControlMethod.prototype;

	/*
	* @Override
	*/
	AMCallControlMethodProto.namespace = 'callControlMethod';

	/*
	* @Override
	*/
	AMCallControlMethodProto.parameters = {
		//Required
		"funcName" : {
			"required" : true,
			"type" : "string"
		},

		//Optional
		"funcArgs" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"tgtParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},

		"controlId" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMCallControlMethodProto.run = function(){
		var funcName = this.getParameter("funcName"),
			funcArgs = this.getParameter("funcArgs"),
			tgtParam = this.getParameter("tgtParam"),
			control = this.findControl(false);
		
		if(null === funcArgs){
			funcArgs = [];
		}

		var result = control[funcName].apply(control, funcArgs);

		if(tgtParam){
			this.context.set(this, tgtParam, result);
		}

		this.context._log.debug("Calling control method '" + funcName + "' of control '" + control.getId() + "'");
	};

	//Return Module Constructor
	return AMCallControlMethod;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMChangeTheme
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMChangeTheme = ActionModule.extend("ui5strap.AMChangeTheme"),
		AMChangeThemeProto = AMChangeTheme.prototype;

	/*
	* @Override
	*/
	AMChangeThemeProto.namespace = 'changeTheme';

	/*
	* @Override
	*/
	AMChangeThemeProto.parameters = {
		"theme" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMChangeThemeProto.run = function(){
		var newTheme = this.getParameter('theme');

		var app = this.context.app;

		app.setLoaderVisible(true, function(){

			window.setTimeout(function(){
				
				app.setTheme(newTheme);

				window.setTimeout(function(){
					app.setLoaderVisible(false);
				}, 800);
				

			}, 200);

		}, 'opaque');
	};

	//Return Module Constructor
	return AMChangeTheme;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCloseOverlay
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMCloseOverlay = ActionModule.extend("ui5strap.AMCloseOverlay"),
		AMCloseOverlayProto = AMCloseOverlay.prototype;

	/*
	* @Override
	*/
	AMCloseOverlayProto.namespace = 'closeOverlay';

	/*
	* @Override
	*/
	AMCloseOverlayProto.parameters = {
			
			"transition" : {
				"required" : false, 
				"defaultValue" : "transition-slide-btt", 
				"type" : "string"
			},
			"scope" : {
				"required" : false,
				"defaultValue" : "APP",
				"type" : "string"
			}
	};

	/*
	* @Override
	*/
	AMCloseOverlayProto.run = function(){
		var _this = this,
			app = this.context.app,
			overlayParent = app;
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof ui5strap.AppSystem)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.hideOverlay(function CloseOverlayActionComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		}, this.getParameter('transition'));
	};

	/*
	* @Override
	*/
	AMCloseOverlayProto.completed = function(){

	};
	
	return AMCloseOverlay;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMDummy
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMDummy = ActionModule.extend("ui5strap.AMDummy");

	/*
	* Run the ActionModule
	* @override
	*/
	AMDummy.prototype.run = function(){};
	
	return AMDummy;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGetContextData
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMGetContextData = ActionModule.extend("ui5strap.AMGetContextData"),
		AMGetContextDataProto = AMGetContextData.prototype;

	/*
	* @Override
	*/
	AMGetContextDataProto.namespace = 'getContextData';

	/*
	* @Override
	*/
	AMGetContextDataProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGetContextDataProto.run = function(){
			var modelName = this.getParameter("modelName"),
				tgtParam = this.getParameter("tgtParam"),
				control = this.findControl();

			var bindingContext = control.getBindingContext(modelName);
			var model = bindingContext.getModel();
			var data = model.getProperty(bindingContext.getPath());

			this.context.set(this, tgtParam, data);
			//this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
	};

	return AMGetContextData;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGetCurrentPage
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMGetCurrentPage = ActionModule.extend("ui5strap.AMGetCurrentPage"),
		AMGetCurrentPageProto = AMGetCurrentPage.prototype;
	
	/*
	* @Override
	*/
	AMGetCurrentPageProto.namespace = "getCurrentPage";
	
	/*
	* @Override
	*/
	AMGetCurrentPageProto.parameters = {
		
		//Required
		"target" : {
			"required" : true, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : false, 
			"type" : "string"
		},
		
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	AMGetCurrentPageProto.run = function(){
		var target = this.getParameter("target"),
			scope = this.getParameter("scope"),
			tgtParam = this.getParameter("tgtParam");
		
		//TODO better with action conditions
		if(scope === "SOURCE" && target !== this.context.eventParameters["target"]){
			return;
		}
		
		var nc = this.findControl(),
			currentPage = nc.getTarget(target);
		
		if(tgtParam){
			this.context.set(this, tgtParam, currentPage.getId());
		}
		this.setParameter("result", currentPage.getId());
	};
	
	return AMGetCurrentPage;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGetProperty
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMGetProperty = ActionModule.extend("ui5strap.AMGetProperty"),
		AMGetPropertyProto = AMGetProperty.prototype;

	/*
	* @Override
	*/
	AMGetPropertyProto.namespace = 'getProperty';

	/*
	* @Override
	*/
	AMGetPropertyProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : false, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGetPropertyProto.run = function(){
			var propertyKey = this.getParameter("propertyName"),
				tgtParam = this.getParameter("tgtParam"),
				control = this.findControl(false),
				propertyValue = control["get" + jQuery.sap.charToUpperCase(propertyKey, 0)]();
			
			if(tgtParam){
				this.context.set(this, tgtParam, propertyValue);
			}
			
			this.setParameter("result", propertyValue);
			
			this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
	};
	
	return AMGetProperty;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGotoPage
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMGotoPage = ActionModule.extend("ui5strap.AMGotoPage"),
		AMGotoPageProto = AMGotoPage.prototype;

	/*
	* @Override
	*/
	AMGotoPageProto.namespace = "gotoPage";

	/*
	* @Override
	*/
	AMGotoPageProto.parameters = {
		//Required
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"target" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		
		"writeHistory" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"bookmarkable" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : true
		},
		"virtual" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"frameId" : {
			"required" : false,
			"type" : "string",
			"defaultValue" : "frame"
		},
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGotoPageProto.run = function(){
			var frameId = this.getParameter("frameId");
				control = this.findControl();

			var frameGetter = 'get' + jQuery.sap.charToUpperCase(frameId, 0);
			
			if(!this.context.app[frameGetter]){
				throw new Error("Cannot goto page: No such frame with component id: " + frameId);
			}
			
			this.context.app[frameGetter]().navigateTo(control, this.context.parameters[this.namespace]);
	}
	
	return AMGotoPage;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMJsAlert
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMJsAlert = ActionModule.extend("ui5strap.AMJsAlert"),
		AMJsAlertProto = AMJsAlert.prototype;

	/*
	* @Override
	*/
	AMJsAlertProto.namespace = 'alert';

	/*
	* @Override
	*/
	AMJsAlertProto.parameters = {
		"message" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMJsAlertProto.run = function(){
		alert(this.getParameter('message'));
	};
	
	return AMJsAlert;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMLoadModel
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMLoadModel = ActionModule.extend("ui5strap.AMLoadModel"),
		AMLoadModelProto = AMLoadModel.prototype;
	

	AMLoadModel.TYPE_ODATA = "ODATA";
	AMLoadModel.TYPE_JSON = "JSON";
	AMLoadModel.TYPE_RESOURCE = "RESOURCE";

	/*
	* @Override
	*/
	AMLoadModelProto.namespace = 'loadModel';

	/*
	* @Override 
	*/
	AMLoadModelProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"src" : {
			"required" : true, 
			"type" : "string"
		},
		"type" : {
			"required" : true, 
			"type" : "string"
		},

		//Optional
		"serviceId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"paramMapping" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : ["object", "string"]
		},
		"dataPath" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
		
	};

	/*
	* @Override 
	*/
	AMLoadModelProto.prepareParameters = function(){
			var serviceId = this.getParameter("serviceId");
			if(null !== serviceId){
				var service = this.context.app.getServiceData(serviceId);
				if(null === service){
					throw new Error('Invalid service: "' + serviceId + '"');
				}
				this.setParameter("src", service.url);
			}
	};

	/*
	* @Override 
	*/
	AMLoadModelProto.run = function(){ 
			var _this = this,
				modelUrl = this.context.app.config.resolvePath(this.getParameter("src"));

			var serviceMapping = this.getParameter("paramMapping");
			if(null !== serviceMapping){
				var mapping = {};
				var mappingType = typeof serviceMapping;
				if(mappingType === 'string'){
					mapping = JSON.parse('{' + serviceMapping + '}');
				}
				else if(mappingType === 'object'){
					mapping = serviceMapping;
				}	
				
				for(var paramKey in mapping){
					var replaceValue = this.context.get(this, mapping[paramKey]);
					modelUrl = modelUrl.replace("{"+paramKey+"}", replaceValue);
				}	
			}

			//TODO create option to disable anti-caching
			modelUrl += (modelUrl.indexOf('?') !== -1 ? '&' : '?') + 'rand=' + Math.random();

			var modelType = this.getParameter("type");
			var modelName = this.getParameter("modelName");
			var modelPath = this.getParameter("dataPath");
			
			jQuery.sap.log.debug("Loading view model: '" + modelUrl + "'");

			var theControl = this.findControl(true);
			
			var oModel = null;
			if(AMLoadModel.TYPE_ODATA === modelType){
				oModel = new sap.ui.model.odata.ODataModel(modelUrl);
			}
			else if(AMLoadModel.TYPE_JSON === modelType){ 
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelUrl);
			}
			else if(AMLoadModel.TYPE_RESOURCE === modelType){ 
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelUrl,
					async : true
				});
			}
			else{
				throw new Error('Invalid model type: ' + modelType);
			}

			oModel.attachRequestCompleted({}, function(){
				if(modelPath !== null){ 
					
						var data = oModel.getProperty(modelPath); 
						oModel = new sap.ui.model.json.JSONModel(data);

						if(null !== theControl){
							theControl.setModel(oModel, modelName);
						}
					
				}
				else{
					if(null !== theControl){
						theControl.setModel(oModel, modelName);
					}
				}

				_this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (type: '" + modelType + "', scope: '" + _this.getParameter("scope") + "') loaded.");
			});
	};
	
	return AMLoadModel;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMLog
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMLog = ActionModule.extend("ui5strap.AMLog"),
		AMLogProto = AMLog.prototype;

	/*
	* @Override
	*/
	AMLogProto.namespace = 'log';

	/*
	* @Override
	*/
	AMLogProto.parameters = {
		"logType" : {
			"required" : true, 
			"type" : "string"
		},
		"message" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMLogProto.run = function(){
		this.context._log[this.getParameter("logType")](this.getParameter("message"));
	};
	
	return AMLog;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMOpenApp
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMOpenApp = ActionModule.extend("ui5strap.AMOpenApp"),
		OpenAppProto = AMOpenApp.prototype;

	/*
	* @Override
	*/
	OpenAppProto.namespace = 'openApp';

	/*
	* @Override
	*/
	OpenAppProto.parameters = {
		"url" : {
			"required" : true, 
			"type" : "string"
		},
		"id" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"package" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"icon" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"name" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : ""
		},
		"launcher" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : "index.html"
		},
		"type" : {
			"required" : false, 
			"type" : "string",
			"defaultValue" : "HTML5"
		},
		"internal" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"target" : {
			"required" : false, 
			"defaultValue" : "BROWSER", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	OpenAppProto.run = function(){
		var appUrl = this.getParameter("url");

		if(!appUrl){
			throw new Error('Invalid sapplication url: ' + appUrl);
		}

		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		//TODO
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
		var sapplicationUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();
		this.setParameter("frameUrl", sapplicationUrl);
		//
		
		var viewer = this.context.app.getViewer();
		var target = this.getParameter("target");
		if("BROWSER" === target){
			//Means to redirect
			viewer.openSapplication(appUrl);
		}
		else if("VIEWER" === target){
			var _this = this;
			viewer.executeApp(
				{
					"id" : this.getParameter("id"),
					"package" : this.getParameter("package"),
					"type" : this.getParameter("type"),
					"url" : appUrl,
					"internal" : this.getParameter("internal"),
					"icon" : this.getParameter("icon"),
					"name" : this.getParameter("name"),
					"launcher" : this.getParameter("launcher")
				}, 
				false, 
				function(){
					//Notify the action module that the action is completed.
					_this.fireEvents(ActionModule.EVENT_COMPLETED);
				},
				null
			);	
		}
		
	};

	/*
	* @Override
	*/
	OpenAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};
	
	return AMOpenApp;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetListItemSelected
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMSetListItemSelected = ActionModule.extend("ui5strap.AMSetListItemSelected"),
		AMSetListItemSelectedProto = AMSetListItemSelected.prototype;
	
	/*
	* @Override
	*/
	AMSetListItemSelectedProto.namespace = "setListItemSelected";
	
	/*
	* @Override
	*/
	AMSetListItemSelectedProto.parameters = {
		
		//Required
		"itemId" : {
			"required" : true, 
			"type" : "string"
		},
		
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
	};
	
	/*
	* Run the ActionModule
	* @override
	*/
	AMSetListItemSelectedProto.run = function(){
		var itemId = this.getParameter("itemId");
		
		if(!itemId){
			return;
		}
		
		var menu = this.findControl(),
			items = menu.getItems(),
			selectedItem = null;
		
		for(var i = 0; i < items.length; i++){
			if(this.context.app.createControlId(itemId) === this.context.app.createControlId(items[i].getItemId())){
				selectedItem = items[i];
				break;
			}
		}
		
		menu.setSelection(selectedItem);
	};
	
	return AMSetListItemSelected;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetModel
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMSetModel = ActionModule.extend("ui5strap.AMSetModel"),
		AMSetModelProto = AMSetModel.prototype;

	/*
	* @Override
	*/
	AMSetModelProto.namespace = 'setModel';

	/*
	* @Override
	*/
	AMSetModelProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"defaultValue" : null, 
			"type" : "string"
		},

		//Optional
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		},
		
		"data" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"srcParam" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		}

	};

	/*
	* @Override
	*/
	AMSetModelProto.run = function(){ 
			var srcParam = this.getParameter("srcParam"),
				modelName = this.getParameter("modelName"),
				data = this.getParameter("data"),
				theControl = this.findControl(true);
			
			if(null !== srcParam){
				data = this.context.get(this, srcParam);
			}

			if(!data){
				throw new Error('Data must be an object!');
			}

			theControl.setModel(new sap.ui.model.json.JSONModel(data), modelName);

			this.context._log.debug("Model '" + modelName + "' (src param: '" + srcParam + "', scope: '" + this.getParameter("scope") + "') set.");
	};
	
	return AMSetModel;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetProperty
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMSetProperty = ActionModule.extend("ui5strap.AMSetProperty"),
		AMSetPropertyProto = AMSetProperty.prototype;

	/*
	* @Override
	*/
	AMSetPropertyProto.namespace = 'setProperty';

	/*
	* @Override
	*/
	AMSetPropertyProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"value" : {
			"required" : true, 
			"type" : ["int", "boolean", "string", "object"]
		},

		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		},

		"srcParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		}

	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMSetPropertyProto.run = function(){
			var srcParam = this.getParameter("srcParam"),
				propertyName = this.getParameter("propertyName"),
				propertyValue = this.getParameter("value"),
				control = this.findControl(),
				setter = "set" + jQuery.sap.charToUpperCase(propertyName);
			
			//Read value from another parameter
			if(null !== srcParam){
				propertyValue = this.context.get(this, srcParam);
			}
			
			if(!control[setter]){
				throw new Exception("Cannot set property: missing property '" + propertyName + "'");
			}
			
			control[setter](propertyValue);

			this.context._log.debug("[AMSetProperty]: '" + propertyName + "' = '" + propertyValue + "'");
	};
	
	return AMSetProperty;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMShowApp
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMShowApp = ActionModule.extend("ui5strap.AMShowApp"),
		ShowAppProto = AMShowApp.prototype;

	/*
	* @Override
	*/
	ShowAppProto.namespace = 'showApp';

	/*
	* @Override
	*/
	ShowAppProto.parameters = {
		"id" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	ShowAppProto.run = function(){
		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		var viewer = this.context.app.getViewer();
		var _this = this;
			viewer.showApp(
				this.getParameter("id"),
				null, 
				function(){
					//Notify the action module that the action is completed.
					_this.fireEvents(ActionModule.EVENT_COMPLETED);
				}
			);	
		
		
	};

	/*
	* @Override
	*/
	ShowAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};
	
	return AMShowApp;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMShowOverlay
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMShowOverlay = ActionModule.extend("ui5strap.AMShowOverlay"),
		AMShowOverlayProto = AMShowOverlay.prototype;

	/*
	* @Override
	*/
	AMShowOverlayProto.namespace = 'showOverlay';

	/*
	* @Override
	*/
	AMShowOverlayProto.parameters = {
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : true, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		"transition" : {
			"required" : false, 
			"defaultValue" : "transition-slide-ttb", 
			"type" : "string"
		},
		"scope" : {
			"required" : false,
			"defaultValue" : "APP",
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.run = function(){

		var _this = this,
			viewId = this.getParameter("id"),
			viewType = this.getParameter("type"),
			viewName = this.getParameter("viewName"),
			target = this.getParameter("target"),
			parameters = this.getParameter("parameters"),
			app = this.context.app,
			overlayParent = app;

		var viewOptions = {
			"appId" : app.getId(),
			"id" : viewId,
			"type" : viewType,
			"viewName" : viewName,
			"target" : target,
			"parameters" : parameters
		};
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof ui5strap.AppSystem)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.showOverlay(viewOptions, function AMShowOverlayRunComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		}, this.getParameter('transition'));
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.completed = function(){

	};
	
	return AMShowOverlay;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMToggleProperty
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMToggleProperty = ActionModule.extend("ui5strap.AMToggleProperty"),
		AMTogglePropertyProto = AMToggleProperty.prototype;

	/*
	* @Override
	*/
	AMTogglePropertyProto.namespace = 'toggleProperty';

	/*
	* @Override
	*/
	AMTogglePropertyProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},

		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}

	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMTogglePropertyProto.run = function(){
			var propertyName = this.getParameter("propertyName"),
				control = this.findControl(),
				setter = "set" + jQuery.sap.charToUpperCase(propertyName),
				getter = "get" + jQuery.sap.charToUpperCase(propertyName);
			
			if(!control[setter]){
				throw new Exception("Cannot toggle property: missing property '" + propertyName + "'");
			}
			
			var propertyValue = !control[getter]();
			control[setter](propertyValue);

			this.context._log.debug("[AMToggleProperty]: '" + propertyName + "' = '" + propertyValue + "'");
	};
	
	return AMToggleProperty;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMUnloadModel
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMUnloadModel = ActionModule.extend("ui5strap.AMUnloadModel"),
		AMUnloadModelProto = AMUnloadModel.prototype;

	/*
	* @Override
	*/
	AMUnloadModelProto.namespace = 'unloadModel';

	/*
	* @Override
	*/
	AMUnloadModelProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"parameterKey" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}

	};

	/*
	* @Override
	*/
	AMUnloadModelProto.run = function(){ 
			var theControl = this.findControl(true),
				modelName = this.getParameter("modelName");
			
			theControl.setModel(null, modelName);
			
			this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (scope: '" + this.getParameter("scope") + "') unloaded.");
	};
	
	return AMUnloadModel;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMWorker
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMWorker = ActionModule.extend("ui5strap.AMWorker"),
		AMWorkerProto = AMWorker.prototype;

	/*
	* @Override
	*/
	AMWorkerProto.namespace = 'worker';

	/*
	* @Override
	*/
	AMWorkerProto.parameters = {
		"workerName" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMWorkerProto.run = function(){
		var workerUrl = jQuery.sap.getModulePath(this.getParameter("workerName")) + '.worker.js',
			worker = new Worker(workerUrl),
			app = this.context.app,
			controller = this.context.controller;

		worker.addEventListener('message', function(e) {
			
			if(!(typeof(e.data) === 'object') || !("type" in e.data)){
				throw new Error('Invalid worker message: ' + JSON.stringify(e.data));
			}
			
			var messageType = e.data.type;
			if('ACTION' === messageType){

				var actionParameters = {
					"parameters" : e.data.message, 
					"app" : app,
					"controller" : controller  
				};
				
				ui5strap.Action.run(actionParameters);
			}

		}, false);

		worker.postMessage('START');
	};
	
	return AMWorker;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionController
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

sap.ui.define(['./library', './AppBase', 'sap/ui/core/mvc/Controller'], function(library, AppBase, Controller){

	var controllerImpl = {};
	
	AppBase.blessController(controllerImpl);

	//Return Module Constructor
	return Controller.extend("ui5strap.ActionController", controllerImpl);

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Alert
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Alert = ControlBase.extend("ui5strap.Alert", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}, 
        animate : {
          type:"boolean", 
          defaultValue:true
        }, 
        visible : {
          type:"boolean", 
          defaultValue:true
        },
        closable : {
          type : "boolean",
          defaultValue : false
        },
        contentPlacement : {
          type:"ui5strap.ContentPlacement",
          defaultValue : ui5strap.ContentPlacement.Start
        },
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.Info
				}
			},
			aggregations : { 
        closeButton : {
          type : "ui5strap.Button",
          multiple : false
        },
				content : {
					singularName: "content"
				} 
			},
      events : {
        closed : {

        }
      }

		}
	}),
	AlertProto = Alert.prototype;

  ui5strap.Utils.dynamicText(AlertProto);

  AlertProto.init = function(){
  
  }

  var _setCloseButton = AlertProto.setCloseButton;

  AlertProto.setCloseButton = function(closeButton, suppressInvalidate){
      var _this = this;
      if(null !== closeButton){
        closeButton.attachEvent('tap', {}, function(oEvent){
          _this.close();
        });
      }

      _setCloseButton.call(this, closeButton, suppressInvalidate);
  };

  AlertProto.onBeforeRendering = function(){
      if(this.getClosable() && this.getCloseButton() === null){
          this.setCloseButton(new ui5strap.Button({ type : ui5strap.ButtonType.Close, content : [ new ui5strap.Icon({ icon : "times", iconSet : "fa" }) ] }));
      }
  };

  AlertProto.onAfterRendering = function(){
        if(this.getVisible()){
              this.$().addClass('in');
        }
  };

  AlertProto.setVisible = function(visible){
      if(this.getDomRef()){
          if(visible){
              this.$().addClass('in');
          }
          else{
              this.$().removeClass('in');
          }
          this.setProperty('visible', visible, true);
      }
      else{
         this.setProperty('visible', visible);
      }
  };

  AlertProto.close = function(){
    var $alert = this.$(),
      _this = this;
    $alert.removeClass('in')

    function removeElement() {
      _this.fireClosed({});
      _this.destroy();
    }

    $.support.transition && $alert.hasClass('fade') ?
      $alert
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  };
  
  return Alert;

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.AlertRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var AlertRenderer = {};

	AlertRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("alert alert-" + ui5strap.BSSeverity[oControl.getSeverity()] + (oControl.getAnimate() ? " fade" : ''));
		rm.writeClasses();
		rm.write(">");

		var closeButton = oControl.getCloseButton();
		if(null !== closeButton && oControl.getClosable()){
			rm.renderControl(closeButton);
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);

		rm.write("</div>");

	};
	
	return AlertRenderer;
	
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppConsole
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

 sap.ui.define(['./library', './AppBase', './Console'], function(library, AppBase, Console){

	 var AppConsole = AppBase.extend("ui5strap.AppConsole"),
		AppConsoleProto = AppConsole.prototype;

	/*
	* ------------------------------------------------
	* --------------------- FLOW ---------------------
	* ------------------------------------------------
	*/
	
	/*
	* Init app specific logging
	* @protected
	*/
	AppConsoleProto._initLog = function(){
		
		var _this = this;

		this.log = {

			debug : function (message) {
				_this.console && _this.console.debug(message, _this.getId());
				jQuery.sap.log.debug("[APPLOG] " + message);
			},

			warning : function (message) { 
				_this.console && _this.console.warning(message, _this.getId());
				jQuery.sap.log.warning("[APPLOG] " + message);
			},

			error : function (message) {
				_this.console && _this.console.error(message, _this.getId());
				jQuery.sap.log.error("[APPLOG] " + message);
			},

			info : function (message) {
				_this.console && _this.console.info(message, _this.getId());
				jQuery.sap.log.info("[APPLOG] " + message);
			},

			fatal : function (message) {
				_this.console && _this.console.fatal(message, _this.getId());
				jQuery.sap.log.fatal("[APPLOG] " + message);
			}

		};
	};

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/

	/**
	 * Returns the root control of this app.
	 * @Override
	 */
	AppConsoleProto.getRootControl = function(){
		if(!this.console){
			this.console = new Console();
			this.console.setCurrentLog(this.getId());
			this.console.setLogLevel(this.config.data.app.logLevel);
		}
		return this.console;
	}; 

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	/**
	 * Includes the style that is needed for this app.
	 * @Override
	 */
	AppConsoleProto.includeStyle = function(callback){
		callback && callback();
	};

	/**
	 * Removes the style that is needed for this app.
	 * @Override
	 */
	AppConsoleProto.removeStyle = function(){

	};

	//Return Module Constructor
	return AppConsole;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.App
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

 sap.ui.define(['./library', './AppBase', './Sandbox'], function(library, AppBase, Sandbox){

	 var AppSandbox = AppBase.extend("ui5strap.AppSandbox", {
		"constructor" : function(config, viewer){
			AppBase.call(this, config, viewer);
			
			this._sandboxControl = new Sandbox();
		}
	}),
	AppSandboxProto = AppSandbox.prototype;

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/
	
	AppSandboxProto.getRootControl = function(){
		return this._sandboxControl;
	}; 

	/*
	* ----------------------------------------------------------
	* --------------------- Event Handlers ---------------------
	* ----------------------------------------------------------
	*/

	/**
	* Triggered when an app message is sent to this app
	* @public
	*/
	AppSandboxProto.onMessage = function(oEvent){
		AppBase.prototype.onMessage.call(this, oEvent);
		
		var appMessage = oEvent.getParameters();
		
		if(this.config.data.app.propagateMessages){
			//Pass Message to IFrame Content
			this._sandboxControl.sendMessage(appMessage, '*');
		}
	};

	AppSandboxProto.onFirstShow = function(){
		AppBase.prototype.onFirstShow.call(this);

		this._sandboxControl.setSrc(this.config.data.app.appURL);
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	AppSandboxProto.includeStyle = function(callback){
		callback && callback();
	};

	AppSandboxProto.removeStyle = function(){};

	//Return Module Constructor
	return AppSandbox;
});;/*
 * 
 * Ui5OS
 * 
 * AppSystem
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

 sap.ui.define(['./library', './App'], function(library, App){

	 var AppSystem = App.extend("ui5strap.AppSystem", {
		"constructor" : function(config, viewer){
			App.call(this, config, viewer);

			this.getViewer = function(){
				return viewer;
			};
		}
	});

	//Return Module Constructor
	return AppSystem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Badge
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Badge = ControlBase.extend("ui5strap.Badge", {
		metadata : {
			deprecated : true,
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}
			}
		}
	});
	
	return Badge;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.BadgeRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BadgeRenderer = {};

	BadgeRenderer.render = function(rm, oControl) {
		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("badge");
		rm.writeClasses();
		rm.write(">");
		
		rm.writeEscaped(oControl.getText());
		
		rm.write("</span>");

	};

	return BadgeRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Bar
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){
	
	var Bar = ControlBase.extend("ui5strap.Bar", {
		metadata : {
			interfaces : ["ui5strap.IBar"],
			
			"library" : "ui5strap",
			
			"properties" : {
				type : {
					type:"ui5strap.BarType", 
					defaultValue: ui5strap.BarType.Fluid
				},
				"inverse" : {
					type:"boolean", 
					defaultValue: false
				},
				"fullHeight" : {
					type:"boolean", 
					defaultValue: true
				}
			},
			
			"aggregations" : {
				"content":{
					"singularName" : "content"
				},
				
				//@deprecated
				"left" : {
					deprecated : true,
					"singularName" : "left"
				},
				"middle" : {
					deprecated : true,
					"singularName" : "middle"
				}, 
				"right" : {
					deprecated : true,
					"singularName" : "right"
				}  
			},
			
			"defaultAggregation" : "content"
		}
	}),
	BarProto = Bar.prototype; 

	/**
	 * @Protected
	 * @Override
	 */
	BarProto._getStyleClassRoot = function(){
		return "ui5strapBar ui5strapBar-type-" + this.getType() 
				+ (this.getInverse() ? ' ui5strapBar-flag-styleInverse' : ' ui5strapBar-flag-styleDefault')
				+ (this.getFullHeight() ? ' ui5strapBar-flag-fullHeight' : '');
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	BarProto._getStyleClassPart = function(partName){
		var partClassName = ControlBase.prototype._getStyleClassPart.call(this, partName);
		if("inner" === partName && this.getType() === ui5strap.BarType.Fluid){
			partClassName += " container-fluid";
		}
		return partClassName;
	};
	
	return Bar;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroup
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var BarMenu = ListBase.extend("ui5strap.BarMenu", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				
				//TODO rename to zoom
				zoomExtraSmall : {
					type:"int",
					defaultValue : 0
				},
				
				//TODO rename to zoomSmallUp
				zoomSmall : {
					type : "int",
					defaultValue : 0
				},
				
				//TODO rename to zoomMediumUp
				zoomMedium : {
					type : "int",
					defaultValue : 0
				},
				
				//TODO rename to zoomLargeUp
				zoomLarge : {
					type : "int",
					defaultValue : 0
				},
				
				//TODO add zoomExtraLarge on Bootstrap 4 Upgrade
				
				//TODO rename to type
				typeExtraSmall : {
					type : "ui5strap.BarMenuType",
					defaultValue : ui5strap.BarMenuType.ListVertical
				},
				
				//TODO rename to typeSmallUp
				typeSmall : {
					type : "ui5strap.BarMenuType",
					defaultValue : ui5strap.BarMenuType.Default
				},
				
				//TODO rename to typeMediumUp
				typeMedium : {
					type : "ui5strap.BarMenuType",
					defaultValue : ui5strap.BarMenuType.Default
				},
				
				//TODO rename to typeLargeUp
				typeLarge : {
					type : "ui5strap.BarMenuType",
					defaultValue : ui5strap.BarMenuType.Default
				}
				
				//TODO add typeExtraLarge on Bootstrap 4 Upgrade
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.BarMenuItem",
					singularName: "item"
				} 
			}

		}
	}),
	BarMenuProto = BarMenu.prototype;
	
	return BarMenu;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.BarMenuItem
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

sap.ui.define(['./library', './ListItem'], function(library, ListItem){

	var BarMenuItem = ListItem.extend("ui5strap.BarMenuItem", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				icon : {
					type:"string",
					defaultValue : ""
				}
			},
			
			defaultAggregation : "content"
		}
	}),
	BarMenuItemProto = BarMenuItem.prototype;
	
	/**
	 * TODO More efficient rerendering
	 */
	BarMenuItemProto.setText = function(newText, suppressInvalidate){
		this.setProperty('text', newText, suppressInvalidate);
	};
	
	return BarMenuItem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.BarMenuItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BarMenuItemRenderer = {};

	BarMenuItemRenderer.render = function(rm, oControl) {
		var icon = oControl.getIcon(),
			text = oControl.getText(),
			parse = oControl.getParse(),
			content = oControl.getContent(),
	        contentPlacement = oControl.getContentPlacement();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
		
		rm.write("<li");
		rm.writeControlData(oControl);
		rm.addClass('u5sl-barmenu-item');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");
		
		if(contentPlacement === ui5strap.ContentPlacement.Start){
	    	for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
	    }

		if(icon){
			rm.write('<span class="u5sl-barmenu-item-icon fa fa-' + icon + '"></span>');
		}
		
		if(text){
			rm.write('<span class="u5sl-barmenu-item-text">');
			rm.writeEscaped(text);
			rm.write('</span>');
		}
		
		if(contentPlacement === ui5strap.ContentPlacement.End){
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
        }

		rm.write("</li>");
	};
	
	return BarMenuItemRenderer;
	
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.BarMenuRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BarMenuRenderer = {};

	BarMenuRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			zoomExtraSmall = oControl.getZoomExtraSmall(),
			zoomSmall = oControl.getZoomSmall(),
			zoomMedium = oControl.getZoomMedium(),
			zoomLarge = oControl.getZoomLarge(),
			typeExtraSmall = oControl.getTypeExtraSmall(),
			typeSmall = oControl.getTypeSmall(),
			typeMedium = oControl.getTypeMedium(),
			typeLarge = oControl.getTypeLarge();
		
		var classes = "u5sl-barmenu";
		if(oControl.getInverse()){
			classes += " ui5sl-barmenu-flag-inverse";
		}
		if(typeExtraSmall === ui5strap.BarMenuType.Default){
			classes += ' u5sl-barmenu-flag-type-xs-listvertical';
		}
		else{
			classes += ' u5sl-barmenu-flag-type-xs-' + typeExtraSmall.toLowerCase();
		}
		classes += ' u5sl-barmenu-flag-type-sm-' + typeSmall.toLowerCase();
		classes += ' u5sl-barmenu-flag-type-md-' + typeMedium.toLowerCase();
		classes += ' u5sl-barmenu-flag-type-lg-' + typeLarge.toLowerCase();
		
		//Zoom
		if(zoomExtraSmall !== 0){
			classes += ' u5sl-barmenu-flag-zoom-xs-' + (zoomExtraSmall < 0 ? 'm' : 'p') + Math.abs(zoomExtraSmall);
		}
		if(zoomSmall !== 0){
			classes += ' u5sl-barmenu-flag-zoom-sm-' + (zoomSmall < 0 ? 'm' : 'p') + Math.abs(zoomSmall);
		}
		if(zoomMedium !== 0){
			classes += ' u5sl-barmenu-flag-zoom-md-' + (zoomMedium < 0 ? 'm' : 'p') + Math.abs(zoomMedium);
		}
		if(zoomLarge !== 0){
			classes += ' u5sl-barmenu-flag-zoom-lg-' + (zoomLarge < 0 ? 'm' : 'p') + Math.abs(zoomLarge);
		}
		
		rm.write("<ul");
		rm.writeControlData(oControl);
		rm.addClass(classes);
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</ul>");
	};
	
	return BarMenuRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerStandard
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

sap.ui.define(['./library', './NavContainer'], function(library, NavContainer){

	var BarNavContainer = NavContainer.extend("ui5strap.BarNavContainer", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				barVisible : {
					type : "boolean",
					defaultValue : true
				},
				
				//Bar Mode DOES NOT inherit from smaller sizes
				//TODO add barMode for all sizes?
				
				barModeExtraSmall : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				barModeSmall : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				barModeMedium : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				barModeLarge : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				//TODO add barModeExtraLarge on Bootstrap 4 Upgrade
				
				//Bar Size DOES inherit from smaller sizes
				//TODO rename to barSize
				barSizeExtraSmall : {
					type : "int",
					defaultValue : 1
				},
				//TODO rename to barSizeSmallUp
				barSizeSmall : {
					type : "int",
					defaultValue : -1
				},
				//TODO rename to barSizeMediumUp
				barSizeMedium : {
					type : "int",
					defaultValue : -1
				},
				//TODO rename to barSizeLargeUp
				barSizeLarge : {
					type : "int",
					defaultValue : -1
				},
				//TODO Add barSizeExtraLarge on Bootstrap 4 Upgrade
				
				//Bar placement DOES NOT inherit from smaller sizes
				//TODO add barPlacement for all sizes?
				
				barPlacementExtraSmall : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				barPlacementSmall : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				barPlacementMedium : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				barPlacementLarge : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				//TODO add barPlacementExtraLarge on Bootstrap 4 Upgrade
				
				//Bar Transition DOES NOT inherit from smaller sizes
				//TODO add barTransition for all sizes?
				
				barTransitionExtraSmall : {
					type : "string",
					defaultValue : ""
				},
				barTransitionSmall : {
					type : "string",
					defaultValue : ""
				},
				barTransitionMedium : {
					type : "string",
					defaultValue : ""
				},
				barTransitionLarge : {
					type : "string",
					defaultValue : ""
				},
				//TODO add barTransitionExtraLarge on Bootstrap 4 Upgrade
				
				barTransitionSpeed : {
					type : "ui5strap.TransitionSpeed",
					defaultValue : ui5strap.TransitionSpeed.Normal
				}
				
			},
			
			events : {
				barChanged : {}
			}

		},

		//Use default NavContainerRenderer
		renderer : "ui5strap.NavContainerRenderer"
	}),
	BarNavContainerProto = BarNavContainer.prototype;
	
	/**
	* @Override
	* @Protected
	*/
	BarNavContainerProto._initNavContainer = function(){
		//NavContainer type string
		this.ncType = "bar";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
				
				"content" : null,
				"bar" : null
		};
	};
	
	BarNavContainerProto._getBarTransitionByPlacement = function(placement){
		var transition = "none none";
		if(placement === ui5strap.BarNavContainerPlacement.Left){
			transition = "slide-ltr slide-rtl";
		}
		else if(placement === ui5strap.BarNavContainerPlacement.Top){
			transition = "slide-ttb slide-btt";
		}
		else if(placement === ui5strap.BarNavContainerPlacement.Right){
			transition = "slide-rtl slide-ltr";
		}
		else if(placement === ui5strap.BarNavContainerPlacement.Bottom){
			transition = "slide-btt slide-ttb";
		}
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionExtraSmall = function(){
		var transition = this.getBarTransitionExtraSmall();
		
		if(!transition){
			//Get transition by placement
			transition = this._getBarTransitionByPlacement(this.getBarPlacementExtraSmall());
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionSmall = function(){
		var transition = this.getBarTransitionSmall();
		
		if(!transition){
			if(-1 < this.getBarSizeSmall()){
				//Get transition by placement
				transition = this._getBarTransitionByPlacement(this.getBarPlacementSmall());
			}
			else{
				//Get Transition from extra small
				transition = this._getBarTransitionExtraSmall();
			}
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionMedium = function(){
		var transition = this.getBarTransitionMedium();
		
		if(!transition){
			if(-1 < this.getBarSizeMedium()){
				//Get transition by placement
				transition = this._getBarTransitionByPlacement(this.getBarPlacementMedium());
			}
			else{
				//Get Transition from small
				transition = this._getBarTransitionSmall();
			}
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionLarge = function(){
		var transition = this.getBarTransitionLarge();
		
		if(!transition){
			if(-1 < this.getBarSizeLarge()){
				//Get transition by placement
				transition = this._getBarTransitionByPlacement(this.getBarPlacementLarge());
			}
			else{
				//Get Transition from medium
				transition = this._getBarTransitionMedium();
			}
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransition = function(transition, newBarVisible){
		transition = transition.split(/ /);
		if(transition.length > 2){
			throw new Error("Transition string cannot contain more than 2 transitions!");
		}
		if(transition.length === 1){
			transition.push(transition[0]);
		}
		
		return newBarVisible ? transition[0] : transition[1];
	};
	
	BarNavContainerProto.setBarVisible = function(newBarVisible, suppressInvalidate){
		if(this.getDomRef()){
			jQuery.sap.log.debug("Setting barVisible to " + newBarVisible);
			
			var isBarVisible = this.getBarVisible();
			
			if(!this._barTransitionBusy && isBarVisible !== newBarVisible){
				this.setProperty('barVisible', newBarVisible, true);
				
				this._barTransitionBusy = true;
				
				var _this = this,
					$target = jQuery('#' + this.targetDomId('bar')),
					transition = new ui5strap.ResponsiveTransition(
						{
							"transitionExtraSmall" : this._getBarTransition(this._getBarTransitionExtraSmall(), newBarVisible),
							"transitionSmall" : this._getBarTransition(this._getBarTransitionSmall(), newBarVisible),
							"transitionMedium" : this._getBarTransition(this._getBarTransitionMedium(), newBarVisible),
							"transitionLarge" : this._getBarTransition(this._getBarTransitionLarge(), newBarVisible),
							"transitionSpeed" : this.getBarTransitionSpeed().toLowerCase(),
							"$current" : newBarVisible ? null : $target, 
							"$next" : newBarVisible ? $target : null , 
							"id" : 'bar-navcontainer-bar-change'
						}
					),
					transitionComplete = function (){
						_this._barTransitionBusy = false;
						
						if(_this.getBarVisible()){
							_this.$().removeClass("navcontainer-flag-bar-hidden");
						}
						else{
							_this.$().addClass("navcontainer-flag-bar-hidden");
						}
							
						$target.attr('class', _this._getTargetClassString('bar'));
							
						_this.fireBarChanged();
						
						jQuery.sap.log.debug("[BarNavContainer] Transition complete.")
					};
				
				//RAF start
				ui5strap.polyfill.requestAnimationFrame(function RAF1(){
					
					//Prepare Transition
					transition.prepare();
					
					//RAF
					ui5strap.polyfill.requestAnimationFrame(function RAF2(){
						//Execure Transition
						transition.execute(transitionComplete, transitionComplete);
						
						if(newBarVisible){
							_this.$().removeClass("navcontainer-flag-bar-hide");
						}
						else{
							_this.$().addClass("navcontainer-flag-bar-hide");
						}
					});
	
				});
			}
			//RAF end
		}
		else{
			this.setProperty('barVisible', newBarVisible, suppressInvalidate);
		}
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	BarNavContainerProto._getStyleClassRoot = function(){
		var classes = "navcontainer navcontainer-type-" + this.ncType,
			modeExtraSmall = this.getBarModeExtraSmall(),
			modeSmall = this.getBarModeSmall(),
			modeMedium = this.getBarModeMedium(),
			modeLarge = this.getBarModeLarge();
			placementExtraSmall = this.getBarPlacementExtraSmall(),
			placementSmall = this.getBarPlacementSmall(),
			placementMedium = this.getBarPlacementMedium(),
			placementLarge = this.getBarPlacementLarge();
			columnsExtraSmall = this.getBarSizeExtraSmall(),
			columnsSmall = this.getBarSizeSmall(),
			columnsMedium = this.getBarSizeMedium(),
			columnsLarge = this.getBarSizeLarge(),
			transitionSpeed = this.getBarTransitionSpeed();
		
		//Transition Speed
		//Applies for all sizes
		if(transitionSpeed !== ui5strap.TransitionSpeed.Normal){
			classes += " ui5strap-transition-speed-" + transitionSpeed.toLowerCase();
		}
			
		//SIZE_EXTRA_SMALL
		if(-1 < columnsExtraSmall){
	      classes += " navcontainer-flag-col-xs-" + columnsExtraSmall;
	      classes += " navcontainer-flag-placement-xs-" + placementExtraSmall.toLowerCase();
	      classes += " navcontainer-flag-mode-xs-" + modeExtraSmall.toLowerCase();
	    }
		
		//SIZE_SMALL
	    if(-1 < columnsSmall){
	      classes += " navcontainer-flag-col-sm-" + columnsSmall;
	      classes += " navcontainer-flag-placement-sm-" + placementSmall.toLowerCase();
	      classes += " navcontainer-flag-mode-sm-" + modeSmall.toLowerCase();
	    }
	    
	    //SIZE_MEDIUM
	    if(-1 < columnsMedium){
		  classes += " navcontainer-flag-col-md-" + columnsMedium;
		  classes += " navcontainer-flag-placement-md-" + placementMedium.toLowerCase();
		  classes += " navcontainer-flag-mode-md-" + modeMedium.toLowerCase();
		  
		}
	    
	    //SIZE_LARGE
	    if(-1 < columnsLarge){
	      classes += " navcontainer-flag-col-lg-" + columnsLarge;
	      classes += " navcontainer-flag-placement-lg-" + placementLarge.toLowerCase();
	      classes += " navcontainer-flag-mode-lg-" + modeLarge.toLowerCase();
	    }
		
	    //TODO add columnsExtraLarge on BOOTSTRAP_4 Upgrade
		
		if(!this.getBarVisible()){
			classes += " navcontainer-flag-bar-hide navcontainer-flag-bar-hidden";
		}
		
		return classes;
	};
	
	BarNavContainerProto._getTargetClassString = function(target){
		if(target === "bar"){
			return this.getBarVisible() 
				? 'navcontainer-target navcontainer-target-bar' 
				: 'navcontainer-target navcontainer-target-bar ui5strap-hidden';
		}
		else if(target === "content"){
			
		}
		
		return ui5strap.NavContainer.prototype._getTargetClassString.call(this, target);
	}
	
	return BarNavContainer;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.BarRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BarRenderer = {
			typeToTag : {
				Default : {
					typeClassName : "ui5strapBar-type-default",
					containerClassName : ""
				},
				Fluid : {
					typeClassName : "ui5strapBar-type-fluid",
					containerClassName : "container-fluid"
				}
				
			}
	};

	BarRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
	 	
			contentLeft = oControl.getLeft(),
		 	contentMiddle = oControl.getMiddle(),
			contentRight = oControl.getRight();
		

		rm.write("<div");
		rm.writeControlData(oControl);
		
		rm.addClass(oControl._getStyleClassRoot());
		rm.addClass(oControl._getStyleClassOptions());
		
		rm.writeClasses();
		rm.write(">");

			rm.write("<div");
			rm.addClass(oControl._getStyleClassPart("inner"));
			rm.writeClasses();
			rm.write(">");
			  
			//Middle
			//@deprecated
			if(contentMiddle.length > 0){     
				rm.write("<div");
				rm.addClass("ui5strapBar-contentMiddle");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentMiddle.length; i++){ 
					rm.renderControl(contentMiddle[i]);
				}
				rm.write("</div>");
			}
			
			//Left
			//@deprecated
			if(contentLeft.length > 0){     
				rm.write("<div");
				rm.addClass("uui5strapBar-contentLeft");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentLeft.length; i++){ 
					rm.renderControl(contentLeft[i]);
				}
				rm.write("</div>");
			}
	
			//Content
			if(content.length > 0){     
				for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
				}
			}
			   
			//Right
			//@deprecated
			if(contentRight.length > 0){     
				rm.write("<div");
				rm.addClass("ui5strapBar-contentRight");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentRight.length; i++){ 
					rm.renderControl(contentRight[i]);
				}
				rm.write("</div>");
			}   
			    
			rm.write("</div>");    
		rm.write("</div>");
	};
	
	return BarRenderer;
	
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Breadcrumb
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var Breadcrumb = ListBase.extend("ui5strap.Breadcrumb", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}
			
		}
	}),
	BreadcrumbProto = Breadcrumb.prototype;
	
	return Breadcrumb;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.BreadcrumbRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BreadcrumbRenderer = {};
	
	BreadcrumbRenderer.render = function(rm, oControl) {
		var items = oControl.getItems();
	
		rm.write("<ol");
		rm.writeControlData(oControl);
		rm.addClass('breadcrumb');
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</ol>");
	};

	return BreadcrumbRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Break
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Break = ControlBase.extend("ui5strap.Break", {
		metadata : {

			library : "ui5strap",
			
		}
	});
	
	return Break;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.BreakRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BreakRenderer = {};

	BreakRenderer.render = function(rm, oControl) {
		rm.write("<br />");
	};
	
	return BreakRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonDropdown
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

sap.ui.define(['./library', './Button'], function(library, Button){

	var ButtonDropdown = Button.extend("ui5strap.ButtonDropdown", {
		metadata : {

			// ---- object ----
			defaultAggregation : "menu",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				dropup : {
					type:"boolean", 
					defaultValue:false
				},
				split : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				} 
			}

		}
	}),
	ButtonDropdownProto = ui5strap.ButtonDropdown.prototype;

	ButtonDropdownProto.setText = function(newText){
		if(this.getMenu() === null){
			if(this.getDomRef() && this.getContent().length === 0){
              jQuery('#' + this.getId() + '---' + (this.getSplit() ? 'button' : 'toggle')).text(newText);
              this.setProperty('text', newText, true);
          	}
	          else{
	              this.setProperty('text', newText);
	          }
		}
		else{
			this.setProperty('text', newText);
		}
	};

	ButtonDropdownProto.setSelected = function(newValue){ 
        ui5strap.Utils.updateClass(this, jQuery('#' + this.getId() + '---' + (this.getSplit() ? 'button' : 'toggle')), "selected", newValue, { 'true' : 'active' });
    };
/*
	ButtonDropdownProto.onAfterRendering = function(){
		this.$().dropdown();
	};	
*/
	
	ButtonDropdownProto.open = function(){
		this.$().addClass('open');
	};
	
	ButtonDropdownProto.close = function(){
		this.$().removeClass('open');
	};

	ButtonDropdownProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ButtonDropdownProto._handlePress = function(oEvent){
		oEvent.setMarked();
		
		var $target = jQuery(oEvent.target);
		if(!this.getSplit() || $target.hasClass('dropdown-toggle') || $target.hasClass('caret')){
			this.$().toggleClass('open');
		}
		else{
			this.fireTap();
		}
	};
	
	return ButtonDropdown;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonDropdownRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ButtonDropdownRenderer = {};

	ButtonDropdownRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu(),
			split = oControl.getSplit();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("btn-group");
		if(oControl.getDropup()){
			rm.addClass('dropup');
		}
		rm.writeClasses();
		rm.write(">");

		this.startRender(rm, oControl, !split);

	    this.renderContent(rm, oControl);

	    rm.write("</button>");

	    if(split){
		    this.startRender(rm, oControl, true);

		    rm.write(' <span class="caret"></span>');

		    rm.write("</button>");
		}

	    if(null !== menu){
			rm.renderControl(menu);
		}
		
		rm.write("</div>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};
	
	ButtonDropdownRenderer.startRender = function(rm, oControl, tog) {
		var size = oControl.getSize(),
			action = oControl.getBsAction(),
			title = oControl.getTitle();

		rm.write("<button");
	    
	    rm.writeAttribute('id', oControl.getId() + '---' + ( tog ? 'toggle' : 'button') );

    	if(tog && action !== ui5strap.BsAction.ToggleDropdown){ 
	    	rm.addClass("dropdown-toggle");
	    }
	    
	    rm.addClass(oControl._getStyleClass());
	
	    //@deprecated
	    ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');

	    rm.writeClasses();
	    
	    if('' !== title){
	    	rm.writeAttribute('title', title);
	    }
	    
		if(!oControl.getEnabled()){
			rm.writeAttribute("disabled", "disabled");
		}
		
		//Modal close button
		//@deprecated
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		
	    rm.write(">");
	};

	ButtonDropdownRenderer.renderContent = function(rm, oControl) {
		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		if(!oControl.getSplit()){
			rm.write(' <span class="caret"></span>');
		}
	};
	
	return ButtonDropdownRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroup
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ButtonGroup = ListBase.extend("ui5strap.ButtonGroup", {
		metadata : {

			defaultAggregation : "buttons",
				
			library : "ui5strap",

			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				type : {
					type: "ui5strap.ButtonGroupType", 
					defaultValue: ui5strap.ButtonGroupType.Default
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "button"
				} 
			},

			events:{
				select : {
					parameters : {
						listItem : {type : "ui5strap.Button"},
						button : {type : "ui5strap.Button"},
						srcControl : {type : "ui5strap.Control"}
					}
				},
				tap : {
					parameters : {
						listItem : {type : "ui5strap.Button"},
						button : {type : "ui5strap.Button"},
						srcControl : {type : "ui5strap.Control"}
					}
				}
		    }
		}
	}),
	ButtonGroupProto = ButtonGroup.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._getItems = function(){
		return this.getButtons();
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._findClosestItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.Button);
	};
	
	/**
	 * @Public
	 * @Override
	 */
	ButtonGroupProto.getItemIndex = function(item){
		return this.indexOfAggregation("buttons", item);
	};
	
	/**
	 * Adds additional event options.
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._addEventOptions = function(eventOptions, oEvent){
		//@deprecated
		eventOptions.button = eventOptions.srcItem;
	};
	
	return ButtonGroup;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroupRenderer
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

sap.ui.define(['jquery.sap.global', './Button'], function(jQuery, Button) {

	var ButtonGroupRenderer = {
		typeToClass : {
			Default : "btn-group",
			Justified : "btn-group btn-group-justified",
			Vertical : "btn-group-vertical"
		}
	};
	
	ButtonGroupRenderer.render = function(rm, oControl) {
		var size = oControl.getSize(),
			type = oControl.getType(),
			buttons = oControl.getButtons();
	
		rm.write("<div");
		rm.writeControlData(oControl);
	
		rm.addClass(this.typeToClass[type]);
		
		if(ui5strap.Size.Default !== size){
			rm.addClass('btn-group-' + ui5strap.BSSize[size]);
		}
	
		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');
	
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < buttons.length; i++){
			var button = buttons[i];
			if(type === ui5strap.ButtonGroupType.Justified && button instanceof Button){
				rm.write('<div class="btn-group">');
				rm.renderControl(button);
				rm.write("</div>");
			}
			else{
				rm.renderControl(button);
			}
		}
		
		rm.write("</div>");
	
	};
	
	return ButtonGroupRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonToolbar
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var ButtonToolbar = ControlBase.extend("ui5strap.ButtonToolbar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "buttonGroups",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
					
			aggregations : { 
				"buttonGroups" : {
					type : "ui5strap.ButtonGroup",
					singularName: "buttonGroups"
				} 
			}
		}
	});
	
	return ButtonToolbar;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonToolbarRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var ButtonToolbarRenderer = {};
	
	ButtonToolbarRenderer.render = function(rm, oControl) {
		var buttons = oControl.getButtonGroups();
	
		rm.write("<div");
		rm.writeControlData(oControl);
	
		rm.addClass('btn-toolbar');
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < buttons.length; i++){
			rm.renderControl(buttons[i]);
		}
		
		rm.write("</div>");
	};
	
	return ButtonToolbarRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Carousel
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Carousel = ControlBase.extend("ui5strap.Carousel", {
		metadata : {

			defaultAggregation : "items",
			
			library : "ui5strap",
			
			//Properties
			properties : { 
				index : {
					type:"int", defaultValue : 0
				},
		        swipe : {
		            type:"boolean", defaultValue : true
		        },
				controls : {
					type:"boolean", defaultValue : true
				},
				pagination : {
					type:"boolean", defaultValue : true
				},
		        innerAlign : {
			        type: "ui5strap.Alignment",
			        defaultValue : ui5strap.Alignment.CenterBlock
		        },
		        innerOverflow : {
		            type: "ui5strap.CarouselOverflow",
		            defaultValue : ui5strap.CarouselOverflow.Visible
		        },
		        label : {
		            type:"string", defaultValue : ""
		        },
		        
		        //Columns DO inherit from smaller sizes
		        //TODO rename to columns
		        columnsExtraSmall : {
		            type:"int", defaultValue:-1
		        },
		        //TODO rename to columnsSmallUp
		        columnsSmall : {
		            type:"int", defaultValue:-1
		        },
		        //TODO rename to columnsMediumUp
		        columnsMedium : {
		            type:"int", defaultValue:-1
		        },
		        //TODO rename to columnsLargeUp
		        columnsLarge : {
		            type:"int", defaultValue:-1
		        },
		        //TODO add columnsExtraLarge on Bootstrap 4 Upgrade
		        
		        speed : {
		            type:"float", defaultValue : 0.5
		        },
		        cycle : {
		            type:"boolean",
		            defaultValue : false
		        },
		        interval : {
		            type:"int", defaultValue : 0
		        }
			},
			
			//Aggregations
			aggregations : {

				"items" : {},
				"content" : {}

			},
			
			//Events
			events : {
				
				//TODO rename to pageChange & pageChanged
				"change" : {},
				"changed" : {}
			}

		}
	}),
	CarouselProto = Carousel.prototype;

  /**
   * @Private
   */
  var _setInterval = function(_this, newInterval){
      if(_this.timer){
            window.clearInterval(_this.timer);
       }

       if(!newInterval){
          return;
       }

       this.timer = window.setInterval(function(){
          _this.nextPage(newIndex);
       }, newInterval);
  };

  /**
   * @Private
   */
  var _findPart = function(_this, partId, index){
      var idString = '#' + _this.getId()+ '--carousel-' + partId;
      if(index >= 0){
        idString += '-' + index;
      }
      return _this.$().find(idString);
  };

  /**
   * @Public
   * @Override
   */
  CarouselProto.init = function(){
		this.items = [];

    if(!ui5strap.support.transitionEndEvent){
      throw new Error('ui5strap.Carousel requires "transitionEndEvent" support.');
    }
  };

  /**
   * @Protected
   */
  CarouselProto._cssClasses = function(){
      var cssClasses = "carousel carousel-advanced",
      newIndex = this.getIndex(),
      columsMedium = this.getColumnsMedium(),
      columsLarge = this.getColumnsLarge(),
      columsSmall = this.getColumnsSmall(),
      columsExtraSmall = this.getColumnsExtraSmall();

      cssClasses += this.getCycle() ? " carousel-cycle" : " carousel-ends";
      
    if(0 < columsMedium){
      cssClasses += " carousel-md-" + columsMedium;
    }
    if(0 < columsLarge){
      cssClasses += " carousel-lg-" + columsLarge;
    }
    if(0 < columsSmall){
      cssClasses += " carousel-sm-" + columsSmall;
    }
    if(0 < columsExtraSmall){
      cssClasses += " carousel-xs-" + columsExtraSmall;
    }

    cssClasses += " carousel-overflow-" + this.getInnerOverflow().toLowerCase();
    cssClasses += " carousel-align-" + ui5strap.BSAlignment[this.getInnerAlign()];
       cssClasses += " carousel-current-" + newIndex;
      if(newIndex === 0){
        cssClasses += " carousel-current-first";
      }
      if(newIndex === this.items.length-1){
        cssClasses += " carousel-current-last";
      }

      return cssClasses;
  };

  /**
   * @Public
   * @Override
   */
	CarouselProto.onAfterRendering = function(){
	    var _this = this,
	    itemsLength = this.getItems().length;
	
	    //Store lane reference
			this.$lane = _findPart(this, 'lane');
	
	    if(ui5strap.support.transitionEndEvent){
	        this.$lane.on(ui5strap.support.transitionEndEvent, function(){
	            _this.fireChanged({});
	        });
	    }
	
	    this.pagination = [];
	    this.items = [];
	
	    for(var i = 0; i < itemsLength; i++){
	          this.pagination.push(_findPart(this, 'indicator', i));
	          this.items.push(_findPart(this, 'item', i));
	    }
	
	    this._refreshLabel();
	    
	    _setInterval(this, this.getInterval());
	};

  /**
   * @Public
   * @Override
   */	
  CarouselProto.setInterval = function(newInterval, noRefresh){
  
      if(!this.getDomRef()){ 
          this.setProperty('interval', newInterval, noRefresh);
      }
      else{
          _setInterval(this, newInterval);
          this.setProperty('interval', newInterval, true);
      }
  };

  /**
   * @Public
   * @Override
   */
  CarouselProto.setIndex = function(newIndex, suppressInvalidate){
  
    if(!this.getDomRef()){ 
      this.setProperty('index', newIndex, suppressInvalidate);
    }
    else{

      if(newIndex < 0 || newIndex >= this.items.length){
        return false;
      }
      
      var oldIndex = this.getIndex();

      //Set the property
      this.setProperty('index', newIndex, true);

      //Refresh Pagination
      if(this.getPagination()){
          this.pagination[oldIndex].removeClass('active');
          this.pagination[newIndex].addClass('active');
      }
      
      //Refresh CSS Classes
      for(var i = 0; i < this.items.length; i++){
          var newClass = null;
          
          if(i === newIndex){
            newClass = 'carousel-item active carousel-pos-0';
          }
          else{
            newClass = 'carousel-item carousel-pos-' + (i - newIndex);
          }
          
          this.items[i].attr('class', newClass);
      }
      
      this._refreshLabel();
      
      var rootClasses = this._cssClasses();
      if(this.aCustomStyleClasses){
    	  rootClasses += ' ' + this.aCustomStyleClasses.join(' ');
      }
      
      //Refresh carousel class
      this.$().attr("class", rootClasses);
      
      //Move the lane
      this.$lane.css('left',  (-newIndex * 100) + '%');

      //Fire change event
      this.fireChange({ 
        oldIndex : oldIndex
      });
    }
  };

  /**
  * Refreshes the label
  * @Protected
  */
  CarouselProto._refreshLabel = function(){
      var label = this.getLabel();
      if("" !== label){
        label = this.items.length > 0 ? label.replace("[index]", this.getIndex()).replace("[number]", this.getIndex() + 1).replace("[count]", this.items.length) : '';
        _findPart(this, 'label').html(label);
      }
  };

  /**
  * Change to next page
  * @Public
  */
  CarouselProto.nextPage = function(){
      var newIndex = this.getIndex()+1;
      if(this.getCycle() && newIndex >= this.items.length){
          newIndex = 0;
      }
      this.setIndex(newIndex);
  }; 

  /**
  * Change to previous page
  * @Public
  */
  CarouselProto.previousPage = function(){
      var newIndex = this.getIndex()-1;
      if(this.getCycle() && newIndex < 0){
          newIndex = this.items.length - 1;
      }
      this.setIndex(newIndex);
  };
  
  /**
   * @Public
   * @Override
   */
  CarouselProto.onswipeleft = function(){
      if(this.getSwipe()){ 
        this.nextPage();
      }
  };

  /**
   * @Public
   * @Override
   */
  CarouselProto.onswiperight = function(){
      if(this.getSwipe()){ 
        this.previousPage();
      }
  };
  
  /**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
  CarouselProto._handlePress = function(oEvent){
	  //Mark the event so parent Controls know that event has been handled already
	  oEvent.setMarked();
	  
	  	var $target = jQuery(oEvent.target);
	    if(this.getControls()){
		      if($target.hasClass('carousel-control-prev')){
		        this.previousPage();
		      }
		      else if($target.hasClass('carousel-control-next')){
		        this.nextPage();
		      }
	    }
	
	    if(this.getPagination()){
		      if($target.hasClass('carousel-indicator')){
		        this.setIndex(parseInt($target.attr('data-slide-to')));
		      }
	    }
  };

  if(ui5strap.support.touch){
	    CarouselProto.ontap = CarouselProto._handlePress;
	}
	else{
		CarouselProto.onclick = CarouselProto._handlePress;
	}

  return Carousel;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.CarouselRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var CarouselRenderer = {};

	CarouselRenderer.render = function(rm, oControl) {
		var speed = oControl.getSpeed(),
			items = oControl.getItems(),
			itemsLength = items.length,
			carouselId = oControl.getId(),
			currentIndex = oControl.getIndex();
		 	
	 	rm.write("<div");
	    rm.writeControlData(oControl);
	    rm.addClass(oControl._cssClasses());
	    rm.writeClasses();
	    rm.write(">");

	    	rm.write("<div id='" + oControl.getId() + "--carousel-inner'");
		    rm.addClass("carousel-inner");
		    rm.writeClasses();
		    rm.write(">");

			    rm.write("<div id='" + oControl.getId() + "--carousel-lane'");
			    rm.addClass("carousel-lane");
			    rm.writeAttribute('style', 'width:' + (itemsLength * 100) + '%; left: ' + (-currentIndex * 100)+ '%; -webkit-transition: left ' + speed + 's; -moz-transition: left ' + speed + 's; -o-transition: left ' + speed + 's; transition: left ' + speed + 's;');
			    rm.writeClasses();
			    rm.write(">");

			    var itemWidth = 100 / itemsLength;
			    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<div id='" + oControl.getId() + "--carousel-item-" + i + "'");
					    rm.addClass("carousel-item");
					    
					    if(i === currentIndex){
							rm.addClass("active");
						}
						rm.addClass("carousel-pos-" + (i - currentIndex));
						rm.writeAttribute('style', 'left:' + (i * itemWidth) + '%; width: ' + itemWidth + '%');
						rm.writeClasses();
					    rm.write(">");
					    rm.renderControl(items[i]);
					    
					    rm.write("</div>");
			    }
			    
				rm.write("</div>");

			rm.write("</div>"); //End carousel-inner
		    
		    if(oControl.getInnerOverflow() === ui5strap.Visibility.Covered){
			    rm.write("<div id='" + oControl.getId() + "--carousel-cover-prev'");
			    rm.addClass("carousel-cover carousel-cover-prev");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");

			    rm.write("<div id='" + oControl.getId() + "--carousel-cover-next'");
			    rm.addClass("carousel-cover carousel-cover-next");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");
			}

			if(oControl.getControls()){ 
		    	    rm.write("<a");
				    rm.addClass("left carousel-control carousel-control-prev");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-left carousel-control-prev"></span>');
				    rm.write("</a>");
			}

			if("" !== oControl.getLabel()){ 
			    rm.write("<div id='" + oControl.getId() + "--carousel-label'");
			    rm.addClass("carousel-label");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");
			}

			if(oControl.getControls()){
				    rm.write("<a");
				    rm.addClass("right carousel-control carousel-control-next");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-right carousel-control-next"></span>');
				    rm.write("</a>");
			}
				
			if(oControl.getPagination()){ 
				    rm.write("<ol id='" + oControl.getId() + "--carousel-indicators'");
				    rm.addClass("carousel-indicators");
				    rm.writeClasses();
				    rm.write(">");
				    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<li id='" + oControl.getId() + "--carousel-indicator-" + i + "'");
			    		rm.addClass("carousel-indicator");
			    		if(i === currentIndex){
					    	rm.addClass("active");
						}
						rm.writeAttribute('data-slide-to', i);
						rm.writeClasses();
					    rm.write(">");
						rm.write("</li>");
					}
				    rm.write("</ol>");
			}

		var content = oControl.getContent(),
			contentLength = content.length;
		for(var i = 0; i < contentLength; i++){
			rm.renderControl(content[i]);
		}
		rm.write("</div>");
	};
	
	return CarouselRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Checkbox
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Checkbox = ControlBase.extend("ui5strap.Checkbox", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type:"ui5strap.CheckboxType", 
					defaultValue:ui5strap.CheckboxType.Block
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				selected : {
					type : "boolean",
					defaultValue : false
				}
			}

		}
	}),
	CheckboxProto = Checkbox.prototype;

	var _onChange = function(_this){
		return function(ev){
			var inputValue = _this.$checkbox.prop('checked');
			if(inputValue !== _this.getSelected()){ 
				_this.setProperty("selected", inputValue, true);
			}
		}
	};

	CheckboxProto.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + this.getId() + '---checkbox');
		this.$checkbox.on('change', _onChange(this));
	};

	CheckboxProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	CheckboxProto.setSelected = function(sValue) {
		sValue = this.validateProperty("selected", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
			}
		}
		return this;
	};
	
	return Checkbox;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.CheckboxRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var CheckboxRenderer = {};

	CheckboxRenderer.render = function(rm, oControl) {
		var type = oControl.getType(),
			typeBlock = ui5strap.CheckboxType.Block;

		if(type === typeBlock){
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('checkbox');
			rm.writeClasses();
			rm.write(">");
		}
		

			rm.write("<label");
			if(type === ui5strap.CheckboxType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('checkbox-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.CheckboxType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', oControl.getId() + '---checkbox');
				}
				rm.writeAttribute('type', 'checkbox');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeClasses();
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.write('/>');
				
					rm.writeEscaped(oControl.getLabel());

			rm.write("</label>");

		if(type === typeBlock){
			rm.write("</div>");
		}
	};
	
	return CheckboxRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Clearfix
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	return ControlBase.extend("ui5strap.Clearfix", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			library : "ui5strap",
			
			properties : { 
				visibilityExtraSmall : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilitySmall : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilityMedium : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilityLarge : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				}
				
			}

		}
	});

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ClearfixRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ClearfixRenderer = {};

	var ClearfixRenderer.render = function(rm, oControl) {
		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('clearfix');
		
		var visibilityMedium = oControl.getVisibilityMedium(),
			visibilityLarge = oControl.getVisibilityLarge(),
			visibilitySmall = oControl.getVisibilitySmall(),
			visibilityExtraSmall = oControl.getVisibilityExtraSmall(),
			defaultVisibility = ui5strap.Visibility.Default,
			visible = ui5strap.Visibility.Visible,
			hidden = ui5strap.Visibility.Hidden;


		if(defaultVisibility !== visibilityMedium){
			if(visibilityMedium === visible){
				rm.addClass('visible-md');
			}
			if(visibilityMedium === hidden){
				rm.addClass('hidden-md');
			}
		}
		if(defaultVisibility !== visibilityLarge){
			if(visibilityLarge === visible){
				rm.addClass('visible-lg');
			}
			if(visibilityLarge === hidden){
				rm.addClass('hidden-lg');
			}
		}
		if(defaultVisibility !== visibilitySmall){
			if(visibilitySmall === visible){
				rm.addClass('visible-sm');
			}
			if(visibilitySmall === hidden){
				rm.addClass('hidden-sm');
			}
		}
		if(defaultVisibility !== visibilityExtraSmall){
			if(visibilityExtraSmall === visible){
				rm.addClass('visible-xs');
			}
			if(visibilityExtraSmall === hidden){
				rm.addClass('hidden-xs');
			}
		}

		rm.writeClasses();
		rm.write(">");
		
		rm.write("</div>");
	};

	return ClearfixRenderer;
	
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Col
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Col = ControlBase.extend("ui5strap.Col", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			
			library : "ui5strap",
			
			properties : { 
				//Size DOES inherit from smaller sizes
				//TODO rename to size
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeSmallUp
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeMediumUp
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeLargeUp
				columnsLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add sizeExtraLarge on Bootstrap 4 Upgrade
				
				//Offset DOES inherit from smaller sizes
				//TODO rename to offset
				offsetExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to offsetSmallUp
				offsetSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to offsetMediumUp
				offsetMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to offsetLargeUp
				offsetLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add offsetExtraLarge on Bootstrap 4 Upgrade
				
				//Pull DOES inherit from smaller sizes
				//TODO rename to pull
				pullExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pullSmallUp
				pullSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pullMediumUp
				pullMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pullLargeUp
				pullLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add pullExtraLarge on Bootstrap 4 Upgrade
				
				//Push DOES inherit from smaller sizes
				//TODO rename to push
				pushExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pushSmallUp
				pushSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pushMediumUp
				pushMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pushLargeUp
				pushLarge : {
					type:"int", defaultValue:-1
				}
				//TODO add pushExtraLarge on Bootstrap 4 Upgrade
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			},
			
			defaultAggregation : "content"

		} // END metadata
	});
	
	return Col;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ColRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ColRenderer = {};

	ColRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");
		rm.writeControlData(oControl);
		var columsMedium = oControl.getColumnsMedium(),
			columsLarge = oControl.getColumnsLarge(),
			columsSmall = oControl.getColumnsSmall(),
			columsExtraSmall = oControl.getColumnsExtraSmall();

		if(0 < columsMedium){
			rm.addClass("col-md-" + columsMedium);
		}
		if(0 < columsLarge){
			rm.addClass("col-lg-" + columsLarge);
		}
		if(0 < columsSmall){
			rm.addClass("col-sm-" + columsSmall);
		}
		if(0 < columsExtraSmall){
			rm.addClass("col-xs-" + columsExtraSmall);
		}

		var offsetMedium = oControl.getOffsetMedium(),
			offsetLarge = oControl.getOffsetLarge(),
			offsetSmall = oControl.getOffsetSmall(),
			offsetExtraSmall = oControl.getOffsetExtraSmall();

		if(0 < offsetMedium){
			rm.addClass("col-md-offset-" + offsetMedium);
		}
		if(0 < offsetLarge){
			rm.addClass("col-lg-offset-" + offsetLarge);
		}
		if(0 < offsetSmall){
			rm.addClass("col-sm-offset-" + offsetSmall);
		}
		if(0 < offsetExtraSmall){
			rm.addClass("col-xs-offset-" + offsetExtraSmall);
		}

		var pullMedium = oControl.getPullMedium(),
			pullLarge = oControl.getPullLarge(),
			pullSmall = oControl.getPullSmall(),
			pullExtraSmall = oControl.getPullExtraSmall();

		if(0 < pullMedium){
			rm.addClass("col-md-pull-" + pullMedium);
		}
		if(0 < pullLarge){
			rm.addClass("col-lg-pull-" + pullLarge);
		}
		if(0 < pullSmall){
			rm.addClass("col-sm-pull-" + pullSmall);
		}
		if(0 < pullExtraSmall){
			rm.addClass("col-xs-pull-" + pullExtraSmall);
		}

		var pushMedium = oControl.getPushMedium(),
			pushLarge = oControl.getPushLarge(),
			pushSmall = oControl.getPushSmall(),
			pushExtraSmall = oControl.getPushExtraSmall();

		if(0 < pushMedium){
			rm.addClass("col-md-push-" + pushMedium);
		}
		if(0 < pushLarge){
			rm.addClass("col-lg-push-" + pushLarge);
		}
		if(0 < pushSmall){
			rm.addClass("col-sm-push-" + pushSmall);
		}
		if(0 < pushExtraSmall){
			rm.addClass("col-xs-push-" + pushExtraSmall);
		}

		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};
	
	return ColRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Container
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Container = ControlBase.extend("ui5strap.Container", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
					type : {
						type:"ui5strap.ContainerType", 
						defaultValue: ui5strap.ContainerType.Default
					},
					
					severity : {
						type: "ui5strap.Severity", 
						defaultValue: ui5strap.Severity.None
					},
					
					align : {
						type : "ui5strap.Alignment",
						defaultValue : ui5strap.Alignment.Default
					},
					
					html : {
						type : "string",
						defaultValue : ""
					},
					
					fullHeight : {
						type : "boolean",
						defaultValue : false
					},
					
					//Visibility DOES inherit from smaller sizes
					//TODO remove visibility since it does same as visibilityExtraSmall
					visibility : {
						deprecated : true,
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityExtraSmall : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilitySmall : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityMedium : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityLarge : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					}
					//TODO add visibilityExtraLarge on Bootstrap 4 Upgrade
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			
			defaultAggregation : "content"
			
		} //END metadata
	}),
	ContainerProto = Container.prototype;
	
	ContainerProto._typeData = {
		Default : {
			tagName : "div",
			className : ""
		},
		Text : {
			tagName : "span",
			className : ""
		},
		
		//Bootstrap Components
		Fluid : {
			tagName : "div",
			className : "container-fluid"
		},
		Website : {
			tagName : "div",
			className : "container"
		},
		Jumbotron : {
			tagName : "div",
			className : "jumbotron"
		},
		Well : {
			tagName : "div",
			className : "well"
		},
		WellLarge : {
			tagName : "div",
			className : "well well-lg"
		},
		PageHeader : {
			tagName : "div",
			className : "page-header"
		},
		
		
		
		//Deprecated
		FluidInset : {
			tagName : "div",
			className : "container-fluid"
		}
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ContainerProto._getStyleClassRoot = function(){
		var type = this.getType(),
			styleClass = this._getStyleClassPrefix() 
						+ " " + this._getStyleClassType(type)
						+ " " + this._typeData[type].className,
			
			severity = this.getSeverity();
		
		if(ui5strap.Severity.None !== severity){
			styleClass += " bg-" + ui5strap.BSSeverity[severity];
		}
		
		return styleClass;
	};
	
	//Return Module Constructor
	return Container;
	
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ContainerRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ContainerRenderer = {};

	ContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			tagData = oControl._typeData[oControl.getType()],
			html = oControl.getHtml();

		rm.write("<" + tagData.tagName);
		rm.writeControlData(oControl);
		
		rm.addClass(oControl._getStyleClass());
		
		ui5strap.RenderUtils.visibility(rm, oControl);

		ui5strap.RenderUtils.alignment(rm, oControl);

		rm.writeClasses();
		rm.write(">");
		
		//Render plain HTML
		html && rm.write(html);
		
		//Render Content
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</" + tagData.tagName + ">");
	};

	//Return Module Constructor
	return ContainerRenderer;
	
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Controller
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

sap.ui.define(['./library', './AppBase', 'sap/ui/core/mvc/Controller'], function(library, AppBase, Controller){

	var controllerImpl = {};
	
	AppBase.blessController(controllerImpl);

	//Return Module Constructor
	return Controller.extend("ui5strap.Controller", controllerImpl);

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ElementBase
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

sap.ui.define(['./library', './OptionsSupport'], function(library, OptionsSupport){

	var ElementBase = ui5strap.Element.extend("ui5strap.ElementBase", {
		metadata : {

			library : "ui5strap",
			
			properties : {
				options : {
					type : "string",
					defaultValue : ""
				}
			}
		}
	}),
	ElementBaseProto = ElementBase.prototype;
	
	OptionsSupport.bless(ElementBaseProto);
	
	ElementBaseProto.getBindingContextData = function(modelName){
		var bindingContext = this.getBindingContext(modelName);
		
		return bindingContext.getModel().getProperty(bindingContext.getPath());
	};
	
	return ElementBase;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Form
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Form = ControlBase.extend("ui5strap.Form", {
		metadata : {

			defaultAggregation : "content",
			
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.FormType", 
					defaultValue:ui5strap.FormType.Default
				},
				action : {
					type:"string", 
					defaultValue:""
				},
				method : {
					type:"ui5strap.FormMethod", 
					defaultValue:ui5strap.FormMethod.None
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events : {
				submit : {

				}
			}

		}
	}),
	FormProto = Form.prototype;

	FormProto.onAfterRendering = function(){
		var _this = this;
		this.$().on('submit', function(){
			_this.fireSubmit({});
			if(_this.getMethod() === ui5strap.FormMethod.None){
				return false;
			}
		});
	};
	
	return Form;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.FormGroup
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var FormGroup = ControlBase.extend("ui5strap.FormGroup", {
		metadata : {

			defaultAggregation : "controls",
			
			library : "ui5strap",

			properties : { 
				severity : {
					type:"ui5strap.FormSeverity", 
					defaultValue:ui5strap.FormSeverity.None
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				feedback : {
					type:"boolean",
					defaultValue : false
				},
				labelExtraSmall : {
					type:"int", defaultValue:0
				},
				labelSmall : {
					type:"int", defaultValue:0
				},
				labelMedium : {
					type:"int", defaultValue:0
				},
				labelLarge : {
					type:"int", defaultValue:0
				}
			},
			aggregations : { 
				controls : {
					multiple : true,
					singularName : "control"
				}
			}

		}
	});

	return FormGroup;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.FormGroupRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var FormGroupRenderer = {

		severityToClass : {
			Success : "success",
			Warning : "warning",
			Error : "error"
		}
	};

	FormGroupRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			hasFeedback = oControl.getFeedback(),
			label = oControl.getLabel(),
			formControls = oControl.getControls();

			if(formControls.length === 0){
				throw new Error('You need to define at least one formControl.');
			}

		rm.write("<div");
		
		rm.writeControlData(oControl);

		rm.addClass('form-group');
		
		if(ui5strap.FormSeverity.None !== severity){
			rm.addClass('has-' + this.severityToClass[severity]);
		}
		
		if(hasFeedback){
			rm.addClass('has-feedback');
		}

		rm.writeClasses();
		rm.write(">");
		
		if('' !== label){
			rm.write("<label");
			rm.addClass("control-label");
			rm.writeAttribute('for', formControls[0].getId());

			var columsMedium = oControl.getLabelMedium(),
					columsLarge = oControl.getLabelLarge(),
					columsSmall = oControl.getLabelSmall(),
					columsExtraSmall = oControl.getLabelExtraSmall();

				if(0 !== columsMedium){
					rm.addClass("col-md-" + columsMedium);
				}
				if(0 !== columsLarge){
					rm.addClass("col-lg-" + columsLarge);
				}
				if(0 !== columsSmall){
					rm.addClass("col-sm-" + columsSmall);
				}
				if(0 !== columsExtraSmall){
					rm.addClass("col-xs-" + columsExtraSmall);
				}
			

			rm.writeClasses();
			rm.write(">");
			rm.writeEscaped(label);
			rm.write("</label>");
		}

		for(var i = 0; i < formControls.length; i++){ 
			var formControl = formControls[i];
			rm.renderControl(formControl);
		}
		
		
		rm.write("</div> ");
	};
	
	return FormGroupRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.FormRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var FormRenderer = {

		typeToClass : {
			"Horizontal" : 'form-horizontal',
			"Inline" : 'form-inline',
		}
	};

	FormRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			action = oControl.getAction(),
			method = oControl.getMethod(),
			type = oControl.getType();

		rm.write("<form");
		
		rm.writeControlData(oControl);
		rm.writeAttribute('role', 'form');
		if('' !== action){
			rm.writeAttribute('action', action);
		}
		if(ui5strap.FormMethod.Default !== method && ui5strap.FormMethod.None !== method){
			rm.writeAttribute('method', method);
		}
		if(ui5strap.FormType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-form');

		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</form>");
	};
	
	return FormRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Heading
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Heading = ControlBase.extend("ui5strap.Heading", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type: "string", 
					defaultValue: ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				level : {
					type: "int", 
					defaultValue: 3
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				
				type : {
					deprecated : true,
					type: "ui5strap.HeadingType", 
					defaultValue: ui5strap.HeadingType.Default
				}
				
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	}),
	HeadingProto = Heading.prototype;
	
	Heading._typeToClass = {
		"PageHeader" : 'page-header',
		'ListGroupItemHeading' : 'list-group-item-heading',
		'MediaHeading' : 'media-heading'
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	HeadingProto._getStyleClassRoot = function(){
		var type = this.getType(),
			classAdd = "";
		if(ui5strap.HeadingType.Default !== type){
			classAdd = " " + Heading._typeToClass[type] + " " + this._getStyleClassType(type);
		}
		
		return this._getStyleClassPrefix() + classAdd;
	};
	
	ui5strap.Utils.dynamicText(HeadingProto);
	
	return Heading;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.HeadingRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var HeadingRenderer = {};

	HeadingRenderer.render = function(rm, oControl) {
		var level = oControl.getLevel(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
			
		rm.write("<h" + level + ' class="' + oControl._getStyleClass() + '"');
		rm.writeControlData(oControl);
		rm.write(">");
		    
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		    
		rm.write("</h" + level + ">");
	};
	
	return HeadingRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Image
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Image = ControlBase.extend("ui5strap.Image", {
		metadata : {

			library : "ui5strap",
			properties : { 
				src : {
					type:"string", 
					defaultValue:""
				},
				mpath : {
					type:"string", 
					defaultValue:""
				},
				ext : {
					type : "string",
					defaultValue : "jpg"
				},
				
				responsive : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				alt : {
					type:"string", 
					defaultValue:""
				},
				width: {
					type:"int",
					defaultValue:-1
				},
				height: {
					type:"int",
					defaultValue:-1
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				shape: {
					type:"ui5strap.ImageShape",
					defaultValue:ui5strap.ImageShape.Default
				},
				
				//@deprecated
				type: {
					deprecated : true,
					type:"ui5strap.ImageType",
					defaultValue:ui5strap.ImageType.Default
				}
			}

		}
	});
	
	return Image;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ImageRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ImageRenderer = {
		shapeToClass : {
			Rounded : 'img-rounded',
			Circle : 'img-circle',
			Thumbnail : 'img-thumbnail'
		},
		typeToClass : {
			MediaObject : "media-object",
			Responsive : "img-responsive"
		}
	};

	ImageRenderer.render = function(rm, oControl) {
		var src = oControl.getSrc(),
			mpath = oControl.getMpath(),
			mext = oControl.getExt(),

			width = oControl.getWidth(),
			height = oControl.getHeight(),
			shape = oControl.getShape(),
			type = oControl.getType(),
			title = oControl.getTitle();

		if(mpath){
			src = jQuery.sap.getModulePath(mpath, '.' + mext);
		}

		rm.write("<img");
		rm.writeControlData(oControl);
		if(oControl.getResponsive()){
			jQuery.sap.log.debug("The property 'reponsive' is deprecated. Please use 'type' with 'Responsive' instead.");
			rm.addClass('img-responsive');
		}
		if(this.shapeToClass[shape]){
			rm.addClass(this.shapeToClass[shape]);
		}
		if(this.typeToClass[type]){
			rm.addClass(this.typeToClass[type]);
		}
		rm.writeClasses();
		
		if('' !== src){
			rm.writeAttribute('src', src);
		}
		if('' !== title){
			rm.writeAttribute('title', title);
		}
		if(-1 !== width){
			rm.writeAttribute('width', width);
		}
		if(-1 !== height){
			rm.writeAttribute('height', height);
		}
		rm.writeAttribute('alt', oControl.getAlt());
		
		rm.write("/>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};
	
	return ImageRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.InputGroup
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var InputGroup = ControlBase.extend("ui5strap.InputGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				}
			},
			aggregations : { 
				content : {
					
				} 
			}

		}
	});
	
	return InputGroup;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.InputGroupRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var InputGroupRenderer = {};

	InputGroupRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('input-group');

		if(ui5strap.Size.Default !== size){
			rm.addClass('input-group-' + ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");

		var contentLength = content.length; 

		if(contentLength > 3){
			throw new Error('Not more than 3 controls allowed within an imput group!');
		}
		    
		for(var i = 0; i < contentLength; i++){ 
			var item = content[i],
				validAddonPosition = i === 0 || i === content.length - 1,
				addonClass = null;
			
			if(item instanceof ui5strap.TextInput || item instanceof ui5strap.SelectBox){

			}
			else if(validAddonPosition){
				if(item instanceof ui5strap.Button){
					addonClass = 'input-group-btn';
				}
				else if(item instanceof ui5strap.Text ||
						item instanceof ui5strap.Icon ||
						item instanceof ui5strap.Checkbox || 
						item instanceof ui5strap.RadioButton){
					addonClass = 'input-group-addon';
				}
				else{
					throw new Error('Control is not a valid input group addon!');
				}
			}
			else{
				throw new Error('Control is not allowed witin InputGroup!');
			}

			if(null !== addonClass){
				rm.write('<span class="' + addonClass + '">');
				rm.renderControl(item);
				rm.write("</span>");
			}
			else{
				rm.renderControl(item);
			}
		}
		    
		rm.write("</div>");
	};
	
	return InputGroupRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Item
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Item = ui5strap.Element.extend("ui5strap.Item", {
		metadata : {

			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				text : {
					type:"string",
					defaultValue:""
				},
				value : {
					type:"string",
					defaultValue:""
				}
			}

		}
	});
	
	return Item;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Jumbotron
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Jumbotron = ControlBase.extend("ui5strap.Jumbotron", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});
	
	return Jumbotron;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.JumbotronRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var JumbotronRenderer = {};

	JumbotronRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");

		rm.writeControlData(oControl);
		rm.addClass('jumbotron')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};

		rm.write("</div>");
	};
	
	return JumbotronRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Label
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Label = ControlBase.extend("ui5strap.Label", {
		metadata : {
			deprecated : true,
			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}, 
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.Info
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		}
	});
	
	return Label;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.LabelRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var LabelRenderer = {};

	LabelRenderer.render = function(rm, oControl) {
		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("label label-" + ui5strap.BSSeverity[oControl.getSeverity()] );
		rm.writeClasses();
		rm.write(">");
		
		rm.writeEscaped(oControl.getText());
		
		rm.write("</span>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};
	
	return LabelRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Line
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	return ControlBase.extend("ui5strap.Line", {
		metadata : {

			library : "ui5strap",
			
		}
	});

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.LineRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var LineRenderer = {};

	LineRenderer.render = function(rm, oControl) {
		rm.write("<hr");
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(" />");
	};
	
	return LineRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.List
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var List = ListBase.extend("ui5strap.List", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				type : {
					type:"ui5strap.ListType", 
					defaultValue:ui5strap.ListType.Unordered
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListProto = List.prototype;
	
	return List;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownItem
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

sap.ui.define(['./library', './ListLinkItem'], function(library, ListItem){

	var ListDropdownItem = ListLinkItem.extend("ui5strap.ListDropdownItem", {
		metadata : {
			library : "ui5strap",

			defaultAggregation : "menu",
			
			properties : {
				selectable : {
					type : "boolean",
					defaultValue : false
				}
			},

			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				}
			}
		}
	}),
	ListDropdownItemProto = ListDropdownItem.prototype;

	ListDropdownItemProto.setText = function(newText){
		if(this.getMenu() === null){
			ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};

	ListDropdownItemProto.open = function(){
		this.$().addClass('open');
	};
	
	ListDropdownItemProto.close = function(){
		this.$().removeClass('open');
	};

	ListDropdownItemProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ListDropdownItemProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		
		this.$().toggleClass('open');
	};

	//Registering Event Handler
	//TODO Desktop / Mobile Test!!!
	if(ui5strap.support.touch){
		ListDropdownItemProto.ontap = ListDropdownItemProto._handlePress;
	}
	else{
		ListDropdownItemProto.onclick = ListDropdownItemProto._handlePress;
	}
	
	return ListDropdownItem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var ListDropdownItemRenderer = {};

	ListDropdownItemRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu();

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.addClass('dropdown');
		rm.writeClasses();
		rm.write(">");

		this.startRenderLink(rm, oControl);
		
		this.renderContent(rm, oControl);

		rm.write('</a>');
		
		if(null !== menu){
			rm.renderControl(menu);
		}

		rm.write("</li>");
	};

	ListDropdownItemRenderer.renderContent = function(rm, oControl){
		var text = oControl.getText(),
			parse = oControl.getParse();
	
		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
	
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		rm.write(' <span class="caret"></span>');
	};
	
	ListDropdownItemRenderer.startRenderLink = function(rm, oControl) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			target = oControl.getTarget();

		rm.write("<a");

		rm.writeAttribute('id', oControl.getId() + '---link');
		rm.addClass("dropdown-toggle");
	    
		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		if('' !== target){
			rm.writeAttribute('target', target);
		}

		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

		rm.write(">");
	};
	
	return ListDropdownItemRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenu
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ListDropdownMenu = ListBase.extend("ui5strap.ListDropdownMenu", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : {
				updateMasterText : {
					type : "boolean",
					defaultValue : false
				}
			},
	
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListDropdownMenuProto = ListDropdownMenu.prototype;
	
	ListDropdownMenuProto.setMasterSelected = function(listItem){ 
		ui5strap.ListBase.prototype.setMasterSelected.call(this, listItem);
		
		var parent = this.getParent(),
			grandParent = parent.getParent(),
			updateText = false;

		if(grandParent instanceof ui5strap.ButtonGroup){
			grandParent.setSelectedControl(parent, this);

			updateText = this.getUpdateMasterText();
		}
		else if(parent instanceof ui5strap.ButtonDropdown){
			parent.setSelected(true);

			updateText = this.getUpdateMasterText();
		}
		else if(grandParent instanceof ui5strap.ListBase){
			updateText = this.getUpdateMasterText();
		}
		
		if(updateText){
				var selectedText = listItem.getText();
				if(selectedText === ''){
					var listItemContent = listItem.getContent();
					if(listItemContent.length > 0){
						//TODO define "textual" interface
						if('getText' in listItemContent[0]){
							selectedText = listItemContent[0].getText();
						}
					}
				}

				if(selectedText !== ''){
					parent.setText(selectedText);
				}
			}
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 * @Override
	 */
	ListDropdownMenuProto._handlePress = function(oEvent){
		ui5strap.ListBase.prototype._handlePress.call(this, oEvent);

		var parent = this.getParent();
		if("close" in parent){
			parent.close();
		}
	};

	if(ui5strap.support.touch){
		ListDropdownMenuProto.ontap = ListDropdownMenuProto._handlePress;
	}
	else{
		ListDropdownMenuProto.onclick = ListDropdownMenuProto._handlePress;
	}
	
	return ListDropdownMenu;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenuRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ListDropdownMenuRenderer = {};
	
	ListDropdownMenuRenderer.render = function(rm, oControl) {
		var items = oControl.getItems();
	
		rm.write("<ul");
		rm.writeControlData(oControl);
		rm.addClass("dropdown-menu");
		rm.writeClasses();
		rm.writeAttribute("role", "menu");
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</ul>");
	};
	
	return ListDropdownMenuRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroup
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ListGroup = ListBase.extend("ui5strap.ListGroup", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				listMode : {
					type:"ui5strap.ListGroupMode", 
					defaultValue : ui5strap.ListGroupMode.Default
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListGroupItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListGroupProto = ui5strap.ListGroup.prototype;
	
	return ListGroup;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ListGroupRenderer = {};

	ListGroupRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			tag = oControl.getListMode() === ui5strap.ListGroupMode.Default ? 'ul' : 'div';
		

		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group');
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</" + tag + ">");
	};
	
	return ListGroupRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMedia
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var ListMedia = ListBase.extend("ui5strap.ListMedia", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListMediaItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListMediaProto = ListMedia.prototype;
	
	return ListMedia;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMediaRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ListMediaRenderer = {};

	ListMediaRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			tag = oControl.getContainer() ? 'div' : 'ul';
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('media-list');
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</" + tag + ">");
	};
	
	return ListMediaRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListNavItem
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

sap.ui.define(['./library', './ListLinkItem'], function(library, ListItem){

	var ListNavItem = ListLinkItem.extend("ui5strap.ListNavItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				badge : {
					type:"string",
					defaultValue : ""
				}
			}
		}
	});
	
	return ListNavItem;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListNavItemRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var ListNavItemRenderer = {};

	ListNavItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge();

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		this.startRenderLink(rm, oControl);
		
		var text = oControl.getText(),
			parse = oControl.getParse();
	
		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
	
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}

		rm.write('</a>');
		    
		rm.write("</li>");
	};
	
	ListNavItemRenderer.startRenderLink = function(rm, oControl, options) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			target = oControl.getTarget();

		rm.write("<a");

		rm.writeAttribute('id', oControl.getId() + '---link');
		

		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		if('' !== target){
			rm.writeAttribute('target', target);
		}

		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

		rm.write(">");
	};
	
	return ListNavItemRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var ListRenderer = {};
	
	ListRenderer.render = function(rm, oControl) {
		var items = oControl.getItems();
	
		var tagName = 'ul';
		if(oControl.getType() === ui5strap.ListType.Ordered){
			tagName = 'ol';
		}
	
		rm.write("<" + tagName);
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</" + tagName + ">");
	};
	
	return ListRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Modal
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Modal = ControlBase.extend("ui5strap.Modal", {
		metadata : {
			deprecated : true,
			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				animate : {
          type:"boolean", 
          defaultValue:true
        },
        backdrop : {
          type:"boolean", 
          defaultValue:false
        }
			},
			aggregations : { 
				header : {
					singularName: "header"
				},
				body : {
					singularName: "body"
				},
				footer : {
					singularName: "footer"
				}
			},
      events : {
         shown : {},
         hidden : {}
      }

		}
	});

	ui5strap.Modal.prototype.onAfterRendering = function(){
    var _this = this,
        $modal = this.$(),
        modalOptions = {
          show : false,
          backdrop: this.getBackdrop()
        };

    window.setTimeout(function(){
        jQuery(document.body).append($modal.detach());
        
        $modal
          .modal(modalOptions)
          .on('hidden.bs.modal', function(){
              _this.fireHidden();
          })
          .on('shown.bs.modal', function(){
              _this.fireShown();
          });
    }, 250);
  };

	ui5strap.Modal.prototype.show = function(){
		this.$().modal('show');
	};

  ui5strap.Modal.prototype.hide = function(){
    this.$().modal('hide');
  };

  ui5strap.Modal.prototype.toggle = function(){
    this.$().modal('toggle');
  };

  return Modal;
});

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * ui5strap.ModalRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ModalRenderer = {};

	ModalRenderer.render = function(rm, oControl) {
		var header = oControl.getHeader(),
			body = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('modal' + (oControl.getAnimate() ? ' fade' : ''));
		rm.writeClasses();
		rm.write(">");
		
			rm.write('<div class="modal-dialog">');
			rm.write('<div class="modal-content">');

			if(header.length > 0){
				rm.write('<div class="modal-header">');
				for(var i = 0; i < header.length; i++){ 
					rm.renderControl(header[i]);
				}
				rm.write("</div>");
			}

			if(body.length > 0){
				rm.write('<div class="modal-body">');
				for(var i = 0; i < body.length; i++){ 
					rm.renderControl(body[i]);
				}
				rm.write("</div>");
			}

			if(footer.length > 0){
				rm.write('<div class="modal-footer">');
				for(var i = 0; i < footer.length; i++){ 
					rm.renderControl(footer[i]);
				}
				rm.write("</div>");
			}
			
			rm.write("</div>");
			rm.write("</div>");
		rm.write("</div>");
	};
	
	return ModalRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Nav
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var Nav = ListBase.extend("ui5strap.Nav", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				type : {
					type:"ui5strap.NavType", 
					defaultValue:ui5strap.NavType.Default
				},
				
				//@deprecated
				align : {
					deprecated : true,
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		}
	}),
	NavProto = ui5strap.Nav.prototype;
	
	NavProto._getStyleClassPrefix = function(){
		return "nav";
	};

	return Nav;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavBar
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var NavBar = ControlBase.extend("ui5strap.NavBar", {
		metadata : {
			deprecated : true,
			
			// ---- object ----
			defaultAggregation : "collapse",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.NavBarType", 
					defaultValue:ui5strap.NavBarType.Default
				},
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				fluid : {
					type:"boolean", 
					defaultValue:false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				position : {
					type:"ui5strap.NavBarPosition", 
					defaultValue: ui5strap.NavBarPosition.Default
				}
			},

			aggregations : { 
				
				collapse : {
					singularName: "collapse"
				},

				brand : {
					multiple : false,
					type : "ui5strap.Link"
				},

				contentLeft : {
					
				},

				content : {

				},

				contentRight : {
					
				}
			}

		}
	}),
	NavBarProto = ui5strap.NavBar.prototype;

	NavBarProto.getCollapseId = function(){
		return this.getId() + '---collapse';
	};

	NavBarProto.setCollapsed = function(newCollapsed){
		if(newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#' + this.getCollapseId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!$.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!$.support.transition) return complete.call(this)

    			$collapse
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])

			}


			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}

		return this;
	};

	NavBarProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
	};
	
	return NavBar;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavBarRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var NavBarRenderer = {

		positionToClass : {
			FixedTop : "navbar-fixed-top",
			FixedBottom : "navbar-fixed-bottom",
			StaticTop : "navbar-static-top"
		},

		typeToClass : {
			Default : "navbar-default"
		}

	};

	NavBarRenderer.render = function(rm, oControl) {
		var brand = oControl.getBrand(),
			contentLeft = oControl.getContentLeft(),
			content = oControl.getContent(),
			contentRight = oControl.getContentRight(),
			position = oControl.getPosition(),
			type = oControl.getType(),
			collapse = oControl.getCollapse();

		var collapseId = oControl.getCollapseId();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("navbar");
		
		if(ui5strap.NavBarType.None !== type){
			rm.addClass(this.typeToClass[type]);
		}

		if(oControl.getInverse()){
			rm.addClass('navbar-inverse');
		}

		if(ui5strap.NavBarPosition.Default !== position){
			rm.addClass(this.positionToClass[position]);
		}

		if(contentLeft.length > 0){
			
		}

		if(contentRight.length > 0){
			
		}

		rm.writeClasses();
		rm.write(">");
		
		//Container
		rm.write("<div");
		rm.addClass(oControl.getFluid() ? "container-fluid" : "container");
		rm.writeClasses();
		rm.write(">");


		if(contentLeft.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-left');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentLeft.length; i++){ 
		    	rm.renderControl(contentLeft[i]);
		    }
		    rm.write("</div>");
		}

		if(contentRight.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-right');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentRight.length; i++){ 
		    	rm.renderControl(contentRight[i]);
		    };
		    rm.write("</div>");
		}

		if(null !== brand){

			rm.write("<div");
			rm.addClass("navbar-header");
			rm.writeClasses();
			rm.write(">");

			
			brand.addStyleClass('navbar-brand')
			rm.renderControl(brand);
			

			rm.write("</div>");

		}


		if(content.length > 0){
			rm.write("<div");
			rm.addClass("navbar-content");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < content.length; i++){ 
		    	rm.renderControl(content[i]);
		    };
		    rm.write("</div>");
		}



		if(collapse.length > 0){
			//Collapse
			rm.write("<div id='" + collapseId + "'");
			rm.addClass("collapse navbar-collapse");
			rm.writeClasses();
			rm.write(">");

		    for(var i = 0; i < collapse.length; i++){ 
		    	rm.renderControl(collapse[i]);
		    };
		
			//End collapse
			rm.write("</div>");
		}

		

		//End container
		rm.write("</div>");

		//End control
		rm.write("</div>");
	};
	
	return NavBarRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var NavContainerRenderer = {};

	NavContainerRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl);

		for(var target in oControl.targets){
			this.renderTarget(rm, oControl, target);
		}

		this.endRender(rm, oControl);
		
		jQuery.sap.log.debug("[NC#" + oControl.getId() + "] RENDERED");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.startRender = function(rm, oControl) {
			rm.write("<!-- NavContainer START -->");
			rm.write('<div');
		    rm.writeControlData(oControl);
		    
		    rm.addClass(oControl._getStyleClassRoot());
		    rm.addClass(oControl._getStyleClassOptions());
		    rm.writeClasses();
		    
		    rm.write(">");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.renderTarget = function (rm, oControl, target) {
			rm.write("<!-- NavContainer target '" + target + "' START -->");
			rm.write('<div id="' + oControl.targetDomId(target) + '"');
			
			/*
			 * Adds 3 css classes:
			 * 
			 * navcontainer-target
			 * navcontainer-TYPE-target-TARGET
			 * 
			 * while TYPE and TARGET are replaced by the provided values
			 */
			rm.addClass(oControl._getTargetClassString(target));
			
			rm.writeClasses();
			rm.write(">");
	
				//Pages container
				rm.write('<div id="' + oControl.targetPagesDomId(target) + '"');
					rm.addClass('navcontainer-pages');
					rm.writeClasses();
				rm.write("></div>");
				
				//Layers container
				rm.write('<div id="' + oControl.targetLayersDomId(target) + '"');
					rm.addClass('navcontainer-layers');
					rm.writeClasses();
					rm.write(">");
				rm.write("</div>");

			rm.write("</div>");
			rm.write("<!-- NavContainer target '" + target + "' END -->");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.endRender = function(rm) {
		 	rm.write("</div>");
		 	rm.write("<!-- NavContainer END -->");
	};

	return NavContainerRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerStandard
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

sap.ui.define(['./library', './NavContainer'], function(library, NavContainer){

	var NavContainerStandard = NavContainer.extend("ui5strap.NavContainerStandard", {
		metadata : {

			library : "ui5strap",
			
		},

		//Use default NavContainerRenderer
		renderer : "ui5strap.NavContainerRenderer"
	}),
	NavContainerStandardProto = NavContainerStandard.prototype;

	/**
	* @Override
	* @Protected
	*/
	NavContainerStandardProto._initNavContainer = function(){
		//NavContainer type string
		//Resulting css class is "navcontainer navcontainer-standard"
		this.ncType = "standard";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
			"content" : null,
			"sidebar" : null,
			"navbar" : null
		};
	};
	
	return NavContainerStandard;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var NavRenderer = {
		typeToClass : {
			Default : "nav-default",
			Tabs : "nav-tabs",
			Pills : "nav-pills",
			PillsStacked : "nav-pills nav-stacked",
			PillsJustified : "nav-pills nav-justified",
			TabsJustified : "nav-tabs nav-justified"
		}
	
	};
	
	NavRenderer.render = function(rm, oControl) {
		var type = oControl.getType(),
			items = oControl.getItems();
	
		rm.write("<ul");
		
		rm.writeControlData(oControl);
	
		rm.addClass('nav');
		rm.addClass(this.typeToClass[type]);
		rm.addClass(oControl._getStyleClassOptions());
		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-nav', 'sidebar-nav');
	
		rm.writeClasses();
		
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</ul>");
	};
	
	return NavRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ODataClient
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

sap.ui.define(['./library', './RestClient'], function(library, RestClient){

	var ODataClient = RestClient.extend("ui5strap.ODataClient"),
		ODataClientProto = ODataClient.prototype;
    
    ODataClientProto.init = function(){
        ui5strap.RestClient.prototype.init.call(this);

        this._initModel();
    };

    ODataClientProto._initModel = function(){
        var oModel = new sap.ui.model.odata.ODataModel(this.options.url + "eventdata.xsodata", true);

        oModel.attachRequestFailed(null, function(){
            throw new Error('OModel request failed!');
        });

        oModel.attachParseError(null, function(){
            throw new Error('OModel parse error!');
        });

        this._oModel = oModel;
    };

    ODataClientProto.getModel = function(){
        return this._oModel;
    };

    ODataClientProto.navigate = function(path, callback){
        //jQuery.sap.log.debug('Navigate binding context...');

        var _this = this;
        this._oModel.createBindingContext(path, null, null, function(context){
            _this._navigationContext = context;
            callback && callback(context);
        });
    };

    ODataClientProto.getNavigationContext = function(){
        return this._navigationContext;
    };

    ODataClientProto._read = function(options){
        this._oModel.read(this._parsePath(options.path, options.pathParameters), {
            "urlParameters" : options.queryParameters,
            "context" : options.context,
            "success" : options.success,
            "error" : options.error
        });
    };
    
    //Return Module Constructor
	return ODataClient;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.OptionsSupport
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

sap.ui.define(['./library'], function(library){
	
	var OptionsSupport = {};
	
	OptionsSupport.bless = function(obj){
		/**
		 * @Protected
		 */
		obj._getIdPart = function(){
			if(arguments.legnth === 0){
				throw new Error("Please provide at least one argument for ui5strap.ControlBase.prototype._getIdPart!");
			}
			var args = jQuery.makeArray(arguments);
			return this.getId() + "___" + args.join('-');
		};
		
		/**
		 * @Protected
		 */
		obj._$getPart = function(){
			return jQuery('#' + this._getIdPart.apply(this, arguments));
		};
		
		/**
		 * @Protected
		 */
		obj._getStyleClassPrefix = function(){
			return this.getMetadata().getElementName().replace(/\./g, '');
		};
		
		/**
		 * @Protected
		 */
		obj._getStyleClassRoot = function(){
			return this._getStyleClassPrefix();
		};
		
		/**
		 * @Protected
		 */
		obj._getStyleClassPart = function(partName){
			return this._getStyleClassPrefix() + "-" + partName;
		};
		
		/**
		* @Protected
		*/
		obj._getStyleClassType = function(type, typeKey){
			return 	this._getStyleClassPrefix() + "-" + (typeKey || "type") + "-" + type;
		};
		
		/**
		* @Protected
		*/
		obj._getStyleClassFlag = function(flag){
			return 	this._getStyleClassPrefix() + "-flag-" + flag;
		};
		
		/**
		* @Public
		* @Override
		* TODO avoid overriding of user provided css classes
		*/
		obj.setOptions = function(newOptions){
			if(this.getDomRef()){
				this.setProperty('options', newOptions, true);
				this._updateStyleClass();
			}
			else{
				this.setProperty('options', newOptions);
			}
		};
		
		/**
		* @Protected
		*/
		obj._getStyleClassOptions = function(){
			var options = this.getOptions(),
				classes = '';
		    
			if(options){
		    	options = options.split(' ');
		    	for(var i = 0; i < options.length; i++){
		    		classes += ' ' + this._getStyleClassPrefix() + '-option-' + options[i];
		    	}
		    }
			
			return classes;
		};
		
		obj._getStyleClass = function(){
			return this._getStyleClassRoot() + " " + this._getStyleClassOptions();	
		};
		
		/**
		* @Protected
		*/
		obj._updateStyleClass = function(){
			var currentClassesString = '',
				options = this.getOptions();
			
			var classes = this.$().attr('class').split(' ');
			for(var i = 0; i < classes.length; i++){
				var cClass = classes[i];
				if(cClass && cClass.indexOf(this._getStyleClassPrefix() + '-option-') !== 0){
					currentClassesString += ' ' + cClass;
				}
				
			}
			
			if(options){
		    	options = options.split(' ');
		    	for(var i = 0; i < options.length; i++){
		    		currentClassesString += ' ' + this._getStyleClassPrefix() + '-option-' + options[i];
		    	}
		    }
		
			this.$().attr('class', currentClassesString.trim());
		};
		
		

		/**
		* @Public
		*/
		obj.setOptionsEnabled = function(options){
			var currentOptions = [],
				cOptions = this.getOptions();
			
			if(cOptions){
				currentOptions = cOptions.split(' ');
			}
			
			for(var optionName in options){
				var optionIndex = jQuery.inArray(optionName, currentOptions),
					optionEnabled = options[optionName];

				if(optionEnabled && -1 === optionIndex
					|| !optionEnabled && -1 !== optionIndex){
					
					if(optionEnabled){
						currentOptions.push(optionName);
					}
					else{
						currentOptions.splice(optionIndex, 1);
					}
					
					this.onOptionChange(optionName, optionEnabled);
				}
			}
			this.setOptions(currentOptions.join(' '));
		};

		/**
		* @Public
		*/
		obj.isOptionEnabled = function(optionName){
			return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
		};
		
		obj.setOptionEnabled = function(optionName, optionEnabled){
			var options = {};
			
			options[optionName] = optionEnabled;
			
			this.setOptionsEnabled(options);
		};
		
		/**
		* @Public
		*/
		obj.toggleOption = function(optionName){
			this.setOptionEnabled(optionName, !this.isOptionEnabled(optionName));
		};
		
		/**
		* @Public
		*/
		obj.onOptionChange = function(optionName, optionEnabled){};
	};
	
	return OptionsSupport;
	
}, true);
	;/*
 * 
 * UI5Strap
 *
 * ui5strap.Page
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){
	
	var Page = ControlBase.extend("ui5strap.Page", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				
			},
			aggregations : { 
				head : {
					multiple : false
				},
				body : {
					singularName: "body"
				},
				footer : {
					multiple : false
				}
			}

		}
	}),
	PageProto = Page.prototype;

	return Page;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.PageHeader
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var PageHeader = ControlBase.extend("ui5strap.PageHeader", {metadata : {
		deprecated : true,
		library : "ui5strap",
		
		properties : { 
			text : {
				type:"string", 
				defaultValue:""
			},
			subText : {
				type:"string", 
				defaultValue:""
			},
			lead : {
				type:"string", 
				defaultValue:""
			}
		},
		
		aggregations : {}

	}});
	
	return PageHeader;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.PageHeaderRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

    var PageHeaderRenderer = {};

    PageHeaderRenderer.render = function(rm, oControl) {
        var lead = oControl.getLead();

        rm.write("<div");
        rm.writeControlData(oControl);
        rm.addClass("page-header");
        rm.writeClasses();
        rm.write(">");
        
        rm.write("<h1>");
        
        rm.writeEscaped(oControl.getText());
        
        var subText = oControl.getSubText();
        if('' !== subText){
        	rm.write("<small>");
        	rm.writeEscaped(subText);
        	rm.write("</small>");
        }
        
        rm.write("</h1>");
        
        if('' !== lead){
             rm.write("<p class='lead'>")
             rm.writeEscaped(lead);
             rm.write('</p>');
        }
        
        rm.write("</div>");

        
    };

    return PageHeaderRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.PageRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var PageRenderer = {};

	PageRenderer.render = function(rm, oControl) {
		var head = oControl.getHead(),
			content = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		
		rm.addClass('ui5strapPage');
		if(head){
			rm.addClass('ui5strapPage-flag-withHead');
		}
		if(footer){
			rm.addClass('ui5strapPage-flag-withFooter');
		}
		rm.writeClasses();
		rm.write(">");
		
		if(head){
			rm.write("<div class='ui5strapPage-head'>");
			rm.renderControl(head);
			rm.write("</div>");
		}

		rm.write("<div class='ui5strapPage-body'>");
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		rm.write("</div>");

		if(footer){
			rm.write("<div class='ui5strapPage-footer'>");
			rm.renderControl(footer);
			rm.write("</div>");
		}

		rm.write("</div>");
	};
	
	return PageRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Pager
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Pager = ControlBase.extend("ui5strap.Pager", {
		metadata : {

			// ---- control specific ----
			library : "ui5strap",
			
			properties : {
				aligned : {
					type : "boolean",
					defaultValue : false
				},
				disabledPrevious : {
					type : "boolean",
					defaultValue : false
				},
				disabledNext : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				previous : {
					type : "ui5strap.Link",
					multiple:false
				}, 
				next : {
					type : "ui5strap.Link",
					multiple:false
				}
				
			}

		}
	});
	
	return Pager;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.PagerRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var PagerRenderer = {};

	PagerRenderer.render = function(rm, oControl) {
		var previous = oControl.getPrevious(),
			next = oControl.getNext(),
			spread = oControl.getAligned();

		rm.write('<ul class="pager"');
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		rm.write('<li');
		if(spread){
			rm.addClass('previous');
		}
		if(oControl.getDisabledPrevious()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(previous);
		rm.write('</li>');
		
		rm.write('<li');
		if(spread){
			rm.addClass('next');
		}
		if(oControl.getDisabledNext()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(next);
		rm.write('</li>');
		

		rm.write("</ul>");

	};
	
	return PagerRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Pagination
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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var Pagination = ListBase.extend("ui5strap.Pagination", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}
		}
	}),
	PaginationProto = Pagination.prototype;
	
	return Pagination;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.PaginationRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var PaginationRenderer = {};

	PaginationRenderer.render = function(rm, oControl) {
		var items = oControl.getItems();
	
		rm.write("<ul");
		rm.writeControlData(oControl);
		rm.addClass('pagination');
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</ul>");
	};

	return PaginationRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Panel
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Panel = ControlBase.extend("ui5strap.Panel", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				title : {
					type:"string", defaultValue:""
				},
				titleContentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				collapse : {
					type : "boolean",
					defaultValue : false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				text : {
					type:"string", defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				titleContent : {
					singularName: "titleContent"
				},
				content : {
					singularName: "content"
				} 
			},
			events : {
				
				//TODO Add panelCollapse events
			}

		}
	}),
	PanelProto = ui5strap.Panel.prototype;

	PanelProto.setCollapsed = function(newCollapsed){
		if(!this.getCollapse() || newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#panel-collapse---' + this.getId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!$.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!$.support.transition) return complete.call(this)

    			$collapse
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])

			}


			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}

		return this;
	};

	PanelProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	PanelProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		
		var $target = jQuery(oEvent.target);
		if($target.hasClass('panel-heading') || $target.parent().hasClass('panel-heading')){
			var parent = this.getParent();
			if(parent instanceof ui5strap.PanelGroup){
				parent.setSelectedControl(this);
			}
			else{ 
				this.toggle();
			}
		}
	};

	//Registering Event Handler
	//TODO Desktop / Mobile Test!!!
	if(ui5strap.support.touch){
		PanelProto.ontap = PanelProto._handlePress;
	}
	else{
		PanelProto.onclick = PanelProto._handlePress;
	}
	
	return Panel;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelGroup
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var PanelGroup = ControlBase.extend("ui5strap.PanelGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "panels",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
			
			aggregations : { 
				panels : {
					type : "ui5strap.Panel",
					singularName: "panel"
				}
			}

		}
	});

	PanelGroup.prototype.setSelectedControl = function(panel){
		var panels = this.getPanels();
		for(var i = 0; i < panels.length; i++){
			var panelI = panels[i];
			if(panelI.getCollapse()){
				if(panelI !== panel){
					panelI.setCollapsed(true);
				}
				else{
					panelI.setCollapsed(!panelI.getCollapsed());
				}
			}
		}
	};
	
	return PanelGroup;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelGroupRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var PanelGroupRenderer = {};

	PanelGroupRenderer.render = function(rm, oControl) {
		var panels = oControl.getPanels();

		rm.write("<div");

		rm.writeControlData(oControl);
		rm.addClass('panel-group')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < panels.length; i++){ 
			rm.renderControl(panels[i]);
		};

		rm.write("</div>");
	};

	return PanelGroupRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var PanelRenderer = {};

	PanelRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			collapse = oControl.getCollapse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("panel");
		
		if(collapse){
			rm.addClass('panel-collapsible');
		}
		
		if(ui5strap.Severity.None !== severity){
			rm.addClass("panel-" + ui5strap.BSSeverity[severity]);
		}
		
		rm.writeClasses();
		rm.write(">");
		
		if(oControl.getTitle() || oControl.getTitleContent().length){
			rm.write("<div");
			rm.addClass("panel-heading");
			rm.writeClasses();
			rm.write(">");
			
			ui5strap.RenderUtils.renderTitleContent(rm, oControl);

			rm.write("</div>");
		}
		
		if(collapse){
			rm.write('<div id="panel-collapse---' + oControl.getId()+'"');
			rm.addClass("panel-collapse collapse");
			if(!oControl.getCollapsed()){
				rm.addClass('in');
			}
			rm.writeClasses();
			rm.write(">");
		}

		rm.write("<div");
		rm.addClass("panel-body");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");
		
		if(collapse){
			rm.write("</div>");
		}
		
		rm.write("</div>");
	};

	return PanelRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Paragraph
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Paragraph = ControlBase.extend("ui5strap.Paragraph", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.End
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				textAlign : {
					type : "ui5strap.TextAlignment",
					defaultValue : ui5strap.TextAlignment.Default
				},
				formStatic : {
					type : "boolean",
					defaultValue:false
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	ui5strap.Utils.dynamicText(Paragraph.prototype);
	
	return Paragraph;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ParagraphRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ParagraphRenderer = {};

	ParagraphRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity(),
			text = oControl.getText(),
			parse = oControl.getParse(),
			textAlign = oControl.getTextAlign();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<p");
		
		rm.writeControlData(oControl);
		if(oControl.getFormStatic()){
			rm.addClass('form-control-static');
		}
		if(ui5strap.Severity.None !== severity){
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		if(ui5strap.TextAlignment.Default !== textAlign){
			rm.addClass("ui5strap-text-align-" + textAlign.toLowerCase());
		}
		rm.writeClasses();
		rm.write(">");
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write("</p>");
	};

	return ParagraphRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Popover
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

sap.ui.define(['./library', './Tooltip'], function(library, Tooltip){

	var Popover = Tooltip.extend("ui5strap.Popover", {
    metadata : {

      // ---- object ----
      defaultAggregation : "content",
      // ---- control specific ----
      library : "ui5strap",
      
      properties : {
         trigger : {
            type: "ui5strap.TriggerMode", 
            defaultValue: ui5strap.TriggerMode.Click
        },
        text : {
          type:"string", defaultValue:""
        },
        contentPlacement : {
          type:"ui5strap.ContentPlacement",
          defaultValue : ui5strap.ContentPlacement.Start
        }
      },

      aggregations : { 
        content : {singularName: "content"},
      }

    }
  });

  Popover.lastShownInstance = null;

  Popover.prototype.onAfterRendering = function(){
    var $this = this.$(),
        _this = this;

    var popoverOptions = {
      animation : this.getAnimate(),

      title : function(){
        return $this.find('.popover-data-title').html();
      },
      content : function(){
        return $this.find('.popover-data-content').html();
      },
      
      trigger : ui5strap.BSTriggerMode[this.getTrigger()],
      html : true
    };

    var placement = this.getPlacement();
    if(placement !== ui5strap.Placement.None){
        if(placement !== ui5strap.Placement.Default){
          popoverOptions.placement = ui5strap.BSPlacement[placement];
        }
        this.getSourceDomRef().popover(popoverOptions);
    }

    this.getSourceDomRef().on('hidden.bs.popover', function(){
        _this.fireHidden();
    }).on('shown.bs.popover', function(){
        _this.fireShown();
    });
  };

  Popover.prototype.show = function(){
    var lastShownInstance = Popover.lastShownInstance;
    if(null !== lastShownInstance && lastShownInstance !== this){
        lastShownInstance.hide();
    }

    Popover.lastShownInstance = this;
    this.getSourceDomRef().popover('show');
  };

  Popover.prototype.hide = function(){
      this.getSourceDomRef().popover('hide');
  };

  Popover.prototype.toggle = function(){
      this.getSourceDomRef().popover('toggle');
  };
 
  return Popover;
});

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * ui5strap.PopoverRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var PopoverRenderer = {};

	PopoverRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.writeAttribute("style", "display:none;");
		rm.addClass("popover-data");
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
			   
		rm.addClass("popover-data-title");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderTitleContent(rm, oControl);

		rm.write("</div>");


		rm.write("<div");
		  
		rm.addClass("popover-data-content");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");

		rm.write("</div>");
		    
	};

	return PopoverRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Progress
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Progress = ControlBase.extend("ui5strap.Progress", {
		metadata : {

			// ---- object ----
			defaultAggregation : "bars",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				animate : {
					type:"boolean", 
					defaultValue:false
				},
				striped : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				bars : {
					type : "ui5strap.ProgressBar",
					singularName: "bar"
				} 
			}
		}
	}),
	ProgressProto = Progress.prototype;

	ProgressProto.getFirstBar = function(){
		var bars = this.getBars();
		if(bars.length === 0){
			return null;
		}
		return bars[0];
	};

	return Progress;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ProgressBar
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var ProgressBar = ControlBase.extend("ui5strap.ProgressBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				value : {
					type:"int", 
					defaultValue:0
				}, 
				minValue : {
					type:"int", 
					defaultValue:0
				},
				maxValue : {
					type:"int", 
					defaultValue:100
				},  
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.None
				},
				labelFormat : {
					type:"string", 
					defaultValue:""
				}
			}
		}
	}),
	ProgressBarProto = ui5strap.ProgressBar.prototype;

	ProgressBarProto.setValue = function(newValue){
		if(this.getDomRef()){
			if(newValue > this.getMaxValue() || newValue < this.getMinValue()){
				throw new Error('Value out of bounds.');
			}

			this.setProperty('value', newValue, true);
			this.$().css('width', this.getProgress() + '%');
			
		}
		else{
			this.setProperty('value', newValue);
		}
	};

	ProgressBarProto.getProgress = function(){
		var percentage = ( this.getValue() - this.getMinValue() ) / ( this.getMaxValue() - this.getMinValue() ) * 100;
		return Math.round(percentage * 100) / 100;
	};
	
	return ProgressBar;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ProgressBarRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ProgressBarRenderer = {};

	ProgressBarRenderer.render = function(rm, oControl) {
		var type = oControl.getSeverity(),
			labelFormat = oControl.getLabelFormat(),
			value = oControl.getValue(),
			maxValue = oControl.getMaxValue(),
			minValue = oControl.getMinValue(),
			percentage = oControl.getProgress();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('progress-bar')
		
		if(ui5strap.Severity.None !== type){
			rm.addClass('progress-bar-' + ui5strap.BSSeverity[type]);
		}

		rm.writeAttribute('style', 'width:' + percentage + '%');

		rm.writeClasses();
		rm.write(">");
		
			if('' !== labelFormat){
				rm.write(
					labelFormat
					.replace('[val]', value)
					.replace('[min]', minValue)
					.replace('[max]', maxValue)
					.replace('[left]', maxValue - value)
					.replace('[progress]', percentage));
			}

		rm.write("</div>");
	};

	return ProgressBarRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.ProgressRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ProgressRenderer = {};

	ProgressRenderer.render = function(rm, oControl) {
		var items = oControl.getBars();

		rm.write("<div");
		rm.writeControlData(oControl);

		rm.addClass('progress');
		
		if(oControl.getAnimate()){
			rm.addClass('active');
		}
		if(oControl.getStriped()){
			rm.addClass('progress-striped');
		}
		
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</div>");
	};

	return ProgressRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Row
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Row = ControlBase.extend("ui5strap.Row", {
		metadata : {

			// ---- object ----
			defaultAggregation : "columns",
			
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				
				
			},
			
			aggregations : { 
				columns : {
					type : "ui5strap.IColumn"
				}
			}

		}
	});

	return Row;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.RowRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var RowRenderer = {};

	RowRenderer.render = function(rm, oControl) {
		var content = oControl.getColumns();
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("row");
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};
	
	return RowRenderer;

}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ScrollContainer
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var ScrollContainer = ControlBase.extend("ui5strap.ScrollContainer", {
		
		metadata : {

			library : "ui5strap",

			properties : { 
				vertical : {
					type:"boolean", 
					defaultValue:false
				},
				horizontal : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			
			defaultAggregation : "content"
		}
	
	}),
	ScrollContainerProto = ScrollContainer.prototype;
	
	/**
	 * @Override
	 */
	ScrollContainerProto.onBeforeRendering = function(){
		if(this.getDomRef()){
			this._scrollTop = this.getDomRef().scrollTop;
		}
		else{
			this._scrollTop =  null;
		}
	};

	/**
	 * @Override
	 */
	ScrollContainerProto.onAfterRendering = function(){
		if(this._scrollTop){
			this.getDomRef().scrollTop = this._scrollTop;
		}
	};
	
	//Return Module Constructor
	return ScrollContainer;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ScrollContainerRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ScrollContainerRenderer = {};

	ScrollContainerRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		
		rm.addClass(oControl._getStyleClassRoot());
		
		if(oControl.getHorizontal()){
			rm.addClass(oControl._getStyleClassFlag("horizontal"));
		}
		
		if(oControl.getVertical()){
			rm.addClass(oControl._getStyleClassFlag("vertical"));
		}
		
		rm.writeClasses();
		rm.write(">");
		
		var content = oControl.getContent();
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");

	};
	
	//Return Module Constructor
	return ScrollContainerRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Sidebar
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Sidebar = ControlBase.extend("ui5strap.Sidebar", {
		metadata : {
			deprecated : true,
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				"inverse" : {
					type:"boolean", 
					defaultValue:false
				},
				"padding" : {
					type:"boolean", 
					defaultValue:true
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});
	
	return Sidebar;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.SidebarRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var SidebarRenderer = {};

	SidebarRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			inverse = oControl.getInverse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('sidebar ' + (inverse ? 'sidebar-inverse' : 'sidebar-default'));
		if(oControl.getPadding()){
			rm.addClass('sidebar-with-padding');
		}
		rm.writeClasses();
		rm.write(">");
		

		rm.write("<div");
		rm.addClass('sidebar-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};

		rm.write("</div>");

		rm.write("</div>");
	};

	return SidebarRenderer;
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Overlay
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){
	
	var StaticOverlay = ControlBase.extend("ui5strap.StaticOverlay", {
		metadata : {

			library : "ui5strap",
			defaultAggregation : "content",
			
			properties : { 
				backdrop : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : {
				content : {
					multiple : true
				}
			},
			
			events : {
				close : {
					
				}
			}
		}
	}),
	StaticOverlayProto = StaticOverlay.prototype;
	
	StaticOverlayProto.onBeforeRendering = function(oEvent){
		if(this.getBackdrop()){
			this._$backdrop && this._$backdrop.off('click');
			delete(this._$backdrop);
		}
	};
	
	StaticOverlayProto.onAfterRendering = function(oEvent){
		if(this.getBackdrop()){
			var _this = this;
			this._$backdrop = this.$().find('#' + this.getId() + '--backdrop').on('click', function(){
				_this.fireClose({});
			});
		}
	};
	
	StaticOverlayProto.addContent = function(oObject, bSuppressInvalidate){
		this.addAggregation("content", oObject, bSuppressInvalidate);
		oObject.addStyleClass('modal-dialog');
	};
	
	return StaticOverlay;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.OverlayRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var StaticOverlayRenderer = {};

	StaticOverlayRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(oControl._getStyleClassRoot());
		rm.writeClasses();
		rm.write(">");
		
		if(oControl.getBackdrop()){
			rm.write('<div class="ui5strapStaticOverlay-backdrop" id="' + oControl.getId() + '--backdrop"></div>');
		}
		
		for(var i = 0; i < content.length; i++){
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");

	};

	return StaticOverlayRenderer;
	
}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.TabContainer
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var TabContainer = ControlBase.extend("ui5strap.TabContainer", {
		metadata : {
			interfaces : ["ui5strap.ISelectionProvider"],

			// ---- object ----
			defaultAggregation : "panes",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
				selectedIndex : {
					type : "int",
					defaultValue : 0
				},
				
				transition : {
					type : "string",
					defaultValue : "fade"
				},
				
				animate : {
					deprecated : true,
			        type:"boolean", 
			        defaultValue:true
			    },
				"listenTo" : {
					deprecated : true,
					type : "string",
					defaultValue : "select",
					bindable : false
				},
				"customAssociation" : {
					deprecated : true,
					type : "string",
					defaultValue : "",
					bindable : false
				}
			},
			
			aggregations : { 
				panes : {
					singularName: "pane"
				}
			},
			
			"associations" : {
				"source" : {
					"deprecated" : true,
					"type" : "ui5strap.ISelectionProvider",
					multiple : false
				}
			}

		}
	}),
	TabContainerProto = ui5strap.TabContainer.prototype;
	
	/**
	 * @Public
	 */
	TabContainerProto.onBeforeRendering= function(){
  		var _this = this;
  		
  		if(!this.sourceControl){
  			jQuery.sap.log.warning("Usage of ui5strap.TabContainer.prototype.getSource is deprecated. Please use actions instead.")
			this.sourceControl = sap.ui.getCore().byId(this.getSource());
		    
			this.sourceControl.attachEvent(this.getListenTo(), {}, function(oEvent){
				
				_this.synchronize();
				
			});

			this.synchronize();
		}
	};
	
	/**
	 * @Public
	 * @deprecated
	 */
	TabContainerProto.synchronize = function(){
  		var customAssociation = this.getCustomAssociation();
  		if(!customAssociation){
			this.setSelectedIndex(this.sourceControl.getSelectionIndex(0), true);
		}
		else{
			var panes = this.getPanes();
			
			for(var i = 0; i < panes.length; i++){
				if(this.sourceControl.getSelection().data(customAssociation) === panes[i].data(customAssociation)){
					this.setSelectedIndex(i, true);
					break;
				}
			}
		}
	};
	
	

	
	
	/**
	 * @Public
	 */
	TabContainerProto.showSelectedPane = function($next){
		var _this = this,
			$current = this.$().find('> .active'),
			transition = new ui5strap.ResponsiveTransition(
				{
					"$current" : $current, 
					"$next" : $next, 
					"id" : 'tab-container-page-change',
					"transitionAll" : this.getTransition()
				}
			),
			transitionNextComplete = function (){
				$next.attr("class", "tab-pane active");
			},
			transitionCurrentComplete = function (){
				$current.attr("class", "tab-pane ui5strap-hidden");
			};
		
		//RAF start
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){
			
			//Prepare Transition
			transition.prepare();
			
			$next.addClass("active");
			
			//RAF
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				//Execure Transition
				transition.execute(transitionCurrentComplete, transitionNextComplete);
			});
	
		});
	};

	/**
	 * @Public
	 * @Override
	 */
	TabContainerProto.setSelectedIndex = function(newIndex, suppressInvalidate){
		if(this.getDomRef()){
			
			this.setProperty('selectedIndex', newIndex, true);

			this.showSelectedPane(this.$().find('.tab-pane').eq(newIndex));
		}
		else{
			this.setProperty('selectedIndex', newIndex, suppressInvalidate);
		}
	};
	
	/*
	 * ----------
	 * DEPRECATED
	 * ----------
	 */
	
	/**
	 * @Public
	 * @deprecated
	 */
	TabContainerProto.getSelectedControl = function(){
		return this.getPanes()[this.getSelectedIndex()];
	};

	/**
	 * @Public
	 * @deprecated
	 */
	TabContainerProto.setSelectedControl = function(pane, suppressInvalidate){
		var panes = this.getPanes();
		
		for(var i = 0; i < panes.length; i++){
			if(panes[i].getId() === pane.getId()){
				this.setSelectedIndex(i, suppressInvalidate);
				break;
			}
		}
	};

	return TabContainer;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.TabContainerRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var TabContainerRenderer = {};

	TabContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getPanes(),
			selectedIndex = oControl.getSelectedIndex(),
			customAssociation = oControl.getCustomAssociation();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('tab-content u5sl-tab-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			var item = content[i];
			
			rm.write('<div role="tabpanel"');
			
			rm.writeAttribute('data-pane-index', i);
			if(customAssociation){
				rm.writeAttribute('data-pane-key', item.data(customAssociation));
			}
			rm.addClass('tab-pane');
			if(selectedIndex > -1 && i === selectedIndex){
				rm.addClass('active');
			}
			else{
				rm.addClass('ui5strap-hidden');
			}
			rm.writeClasses();
			rm.write(">");
			
			rm.renderControl(item);

			rm.write("</div>");
		};

		rm.write("</div>");
	};
	
	return TabContainerRenderer;

}, true);;/*
 * 
 * UI5Strap
 *
 * ui5strap.Table
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Table = ControlBase.extend("ui5strap.Table", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				striped : {
					type : "boolean",
					defaultValue : false
				},
				bordered : {
					type : "boolean",
					defaultValue : false
				},
				condensed : {
					type : "boolean",
					defaultValue : false
				},
				hover : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				head : {
					type : "ui5strap.TableRow",
					multiple : false
				}, 
				body : {
					type : "ui5strap.TableRow"
				} 
			}

		}
	});
	
	return Table;

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.TableColumn
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

sap.ui.define(['./library', './ElementBase'], function(library, ElementBase){

	var TableColumn = ElementBase.extend("ui5strap.TableColumn", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				text : {
					"type": "string", 
					"defaultValue": ""
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

	return TableColumn;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.TableRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
	var TableRenderer = {};
	
	TableRenderer.render = function(rm, oControl) {
		 rm.write("<table");
		    rm.writeControlData(oControl);
		    rm.addClass("table");
		    if(oControl.getCondensed()){
		    	rm.addClass('table-condensed');
		    }
		    if(oControl.getBordered()){
		    	rm.addClass('table-bordered');
		    }
		    if(oControl.getStriped()){
		    	rm.addClass('table-striped');
		    }
		    if(oControl.getHover()){
		    	rm.addClass('table-hover');
		    }
		    rm.writeClasses();
		    rm.write(">");
		    
		    var head = oControl.getHead();
	
		    if(null !== head){
		    	this.renderRow(rm, oControl, head, true);
		    }
	
		   	var rows = oControl.getBody();
	
		    for(var i = 0; i < rows.length; i++){
		    	this.renderRow(rm, oControl, rows[i]);
		    }
	
		rm.write("</table>");
	};

	TableRenderer.renderRow = function(rm, oControl, row, isHeader) {

		var columns = row.getColumns(),
			columnsLength = columns.length,
			severity = row.getSeverity();

		rm.write("<tr");
	    if(ui5strap.Severity.None !== severity){
			rm.addClass(ui5strap.BSSeverity[severity]);
		}
	    rm.writeClasses();
	    rm.write(">");

	    for(var i = 0; i < columnsLength; i++){
		    this.renderColumn(rm, oControl, columns[i], i, isHeader);
		}

	    rm.write("</tr>");

	};

	TableRenderer.renderColumn = function(rm, oControl, col, i, isHeader) {
		var tagName = isHeader ? 'th' : 'td';
		rm.write("<" + tagName);
		    
		    rm.writeClasses();
		    rm.write(">");
		    
		    var text = col.getText();
		    rm.writeEscaped(text);
	
		    var content = col.getContent();
	
		    for(var i = 0; i < content.length; i++){
		    	rm.renderControl(content[i]);
		    }
		rm.write("</" + tagName + ">");
	}

	return TableRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.TableRow
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

sap.ui.define(['./library', './ElementBase'], function(library, ElementBase){

	var TableRow = ElementBase.extend("ui5strap.TableRow", {
		metadata : {
	
			// ---- object ----
			defaultAggregation : "columns",
			// ---- control specific ----
			library : "ui5strap",
	
			properties : {
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				}
			},
	
			aggregations : { 
				"columns" : {
					type : "ui5strap.TableColumn"
				} 
			}
	
		}
	});
	
	return TableRow;

});;/*
 * 
 * UI5Strap
 *
 * ui5strap.Thumbnail
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Thumbnail = ControlBase.extend("ui5strap.Thumbnail", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				
			},
			aggregations : { 
				image : {
					type : "ui5strap.Image",
					multiple : false
				},
				content : {
					singularName: "content"
				}
			}

		}
	});
	
	return Thumbnail;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.ThumbnailRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var ThumbnailRenderer = {};

	ThumbnailRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			image = oControl.getImage();



		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('thumbnail');
		
		rm.writeClasses();
		rm.write(">");
		
		if(null !== image){
			rm.renderControl(image);
		}
		
		rm.write('<div class="caption">');
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div></div>");
	};

	return ThumbnailRenderer;
}, true);
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Well
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Well = ControlBase.extend("ui5strap.Well", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type : "ui5strap.Size",
					defaultValue:ui5strap.Size.Default
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	ui5strap.Utils.dynamicText(Well.prototype);
	
	return Well;
});;/*
 * 
 * UI5Strap
 *
 * ui5strap.WellRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var WellRenderer = {};

	WellRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();

		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass("well");
		if(ui5strap.Size.Default !== size){
			rm.addClass("well-" + ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");
		
		var text = oControl.getText();
		text && rm.writeEscaped(text);
		
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};

	return WellRenderer;
}, true);
