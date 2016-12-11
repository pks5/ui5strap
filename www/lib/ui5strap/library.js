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

sap.ui.define([ 'jquery.sap.global', 'sap/ui/Device', 'sap/ui/core/library',
		'jquery.sap.mobile' ], function(jQuery, Device, coreLib, jqm) {

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
	 * @name ui5strap
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * @public
	 */
	sap.ui.getCore().initLibrary(
			{
				name : "ui5strap",

				version : "0.11.6-SNAPSHOT",

				dependencies : [ "sap.ui.core", "pks.ui5strap.core" ],

				types : [ "ui5strap.Alignment", "ui5strap.BarType", "ui5strap.BSAlignment", 
				          "ui5strap.BSPlacement", "ui5strap.BSSeverity", "ui5strap.BSSize",
				          "ui5strap.BSTriggerMode", "ui5strap.ButtonType", "ui5strap.ButtonGroupType",
				          "ui5strap.CarouselOverflow", "ui5strap.CheckboxType", "ui5strap.ContainerType",
				          "ui5strap.DropdownMenuHostUpdate", "ui5strap.FormMethod",
				          "ui5strap.FormSeverity", "ui5strap.FormType", "ui5strap.HeadingType",
				          "ui5strap.IconType", "ui5strap.IconSize", "ui5strap.IconTransform",
				          "ui5strap.ImageType", "ui5strap.ImageShape", "ui5strap.ListType",
				          "ui5strap.ListGroupMode", "ui5strap.LinkType", "ui5strap.NavBarType",
				          "ui5strap.NavBarPosition",  "ui5strap.NavType", "ui5strap.PickerWheelMode",
				          "ui5strap.Placement", "ui5strap.RadioButtonType",
				          "ui5strap.SelectBoxType", "ui5strap.Severity", "ui5strap.Size",
				          "ui5strap.TextAlignment", "ui5strap.TextInputFormat", "ui5strap.TextInputType",
				          "ui5strap.TextType", "ui5strap.TriggerMode"],

				interfaces : [ "pks.ui5strap.bs3.IBar",
						"pks.ui5strap.bs3.IColumn", "pks.ui5strap.bs3.IDropdownMenuHost",
						"pks.ui5strap.bs3.IInputGroupAddon", "pks.ui5strap.bs3.IInputGroup",
						"pks.ui5strap.bs3.IInputGroupControl",
						"pks.ui5strap.bs3.IInputGroupButton"
						 ],

				controls : [ "ui5strap.Alert", "ui5strap.Bar",
						"ui5strap.Breadcrumb", "ui5strap.Break",
						"ui5strap.Button", "ui5strap.ButtonDropdown",
						"ui5strap.ButtonGroup", "ui5strap.ButtonToolbar",
						"ui5strap.Carousel", "ui5strap.Checkbox",
						"ui5strap.Clearfix", "ui5strap.Col",
						"ui5strap.Container", "ui5strap.Form",
						"ui5strap.FormGroup", "ui5strap.Heading",
						"ui5strap.Icon", "ui5strap.Image",
						"ui5strap.InputGroup", "ui5strap.Jumbotron",
						"ui5strap.Line", "ui5strap.Link", "ui5strap.List",
						"ui5strap.ListDropdownItem",
						"ui5strap.ListDropdownMenu", "ui5strap.ListGroup",
						"ui5strap.ListGroupItem", "ui5strap.ListItem",
						"ui5strap.ListLinkItem", "ui5strap.ListMedia",
						"ui5strap.ListMediaItem", "ui5strap.ListNavItem",
						"ui5strap.Modal", "ui5strap.Nav", "ui5strap.NavBar",
						"ui5strap.Page", "ui5strap.Pager",
						"ui5strap.Pagination", "ui5strap.Panel",
						"ui5strap.PanelGroup", "ui5strap.Paragraph",
						"ui5strap.PickerWheel", "ui5strap.Popover",
						"ui5strap.Progress", "ui5strap.ProgressBar",
						"ui5strap.RadioButton", "ui5strap.Row",
						"ui5strap.SelectBox", "ui5strap.StaticOverlay",
						"ui5strap.TabContainer", "ui5strap.Table",
						"ui5strap.Text", "ui5strap.TextInput",
						"ui5strap.Thumbnail", "ui5strap.ToggleButton",
						"ui5strap.Tooltip", "ui5strap.Well" ],

				elements : [ "ui5strap.Item", "ui5strap.TableCell",
						"ui5strap.TableRow" ]
			});

	var ui5strapBs3Lib = ui5strap;

	/*
	 * -------
	 * 
	 * Support
	 * 
	 * -------
	 */

	// Legacy
	// TODO remove
	ui5strapBs3Lib.support = {
		"touch" : sap.ui.Device.support.touch
	};

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
		jQuery(this).one(ui5strap.support.transition.end, function() {
			called = true
		});

		var callback = function() {
			if (!called)
				jQuery($el).trigger(ui5strap.support.transition.end);
		};

		setTimeout(callback, duration);

		return this;
	};

	/*
	 * END Bootstrap Transition End Legacy
	 */

	/*
	 * -----------
	 * 
	 * START Types
	 * 
	 * -----------
	 */

	/*
	 * Alignment Used for align block elements
	 */
	ui5strapBs3Lib.Alignment = {
		Default : "Default",
		PullLeft : "PullLeft",
		PullRight : "PullRight",
		CenterBlock : "CenterBlock",

		// Deprecated
		NavBar : "NavBar",
		NavBarLeft : "NavBarLeft",
		NavBarRight : "NavBarRight"
	};

	/*
	 * BarMenuType
	 */
	ui5strapBs3Lib.BarType = {
		Default : "Default",
		Fluid : "Fluid"
	}

	// Bootstrap CSS mapping
	ui5strapBs3Lib.BSAlignment = {
		PullLeft : "pull-left",
		PullRight : "pull-right",
		CenterBlock : "center-block",

		// Deprecated
		NavBarLeft : "navbar-left",
		NavBarRight : "navbar-right"
	};

	// Bootstrap CSS mapping
	ui5strapBs3Lib.BSPlacement = {
		Top : "top",
		Left : "left",
		Bottom : "bottom",
		Right : "right",

		AutoTop : "auto top",
		AutoLeft : "auto left",
		AutoBottom : "auto bottom",
		AutoRight : "auto right"
	};

	ui5strapBs3Lib.BSSeverity = {
		Default : "default",
		Primary : "primary",
		Success : "success",
		Warning : "warning",
		Info : "info",
		Danger : "danger"
	};

	ui5strapBs3Lib.BSSize = {
		ExtraSmall : "xs",
		Small : "sm",
		Medium : "md",
		Large : "lg"
	};

	ui5strapBs3Lib.BSTriggerMode = {
		Click : "click",
		Hover : "hover",
		Focus : "focus",
		Manual : "manual"
	};

	/*
	 * ButtonType TODO check this
	 */
	ui5strapBs3Lib.ButtonType = {
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
	ui5strapBs3Lib.ButtonGroupType = {
		Default : "Default",
		Justified : "Justified",
		Vertical : "Vertical"
	};

	/**
	 * CarouselOverflow defines how you see overflowing content in Carousel
	 * controls.
	 */
	ui5strapBs3Lib.CarouselOverflow = {
		Default : "Default",
		Visible : "Visible",
		Hidden : "Hidden",
		Covered : "Covered"
	};

	/*
	 * CheckboxType Only used by ui5strapBs3Lib.Checkbox
	 */
	ui5strapBs3Lib.CheckboxType = {
		Default : "Default",
		Block : "Block",
		Inline : "Inline"
	};

	/*
	 * ContainerType Only used by ui5strapBs3Lib.Container
	 */
	ui5strapBs3Lib.ContainerType = {
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

	ui5strapBs3Lib.DropdownMenuHostUpdate = {
		None : "None",
		Text : "Text",
		Data : "Data",
		TextAndData : "TextAndData"
	};

	/*
	 * FormMethod Only used by ui5strapBs3Lib.Form
	 */
	ui5strapBs3Lib.FormMethod = {
		None : "None",
		Default : "Default",
		POST : "POST",
		GET : "GET",
		PUT : "PUT"
	};

	/*
	 * FormSeverity Only used by ui5strapBs3Lib.Form
	 */
	ui5strapBs3Lib.FormSeverity = {
		Success : "Success",
		Warning : "Warning",
		Error : "Error",
		None : "None"
	};

	/*
	 * FormType Only used by ui5strapBs3Lib.Form
	 */
	ui5strapBs3Lib.FormType = {
		Default : "Default",
		Horizontal : "Horizontal",
		Inline : "Inline"
	};

	/*
	 * HeadingType TODO check this
	 */
	ui5strapBs3Lib.HeadingType = {
		Default : "Default",
		PageHeader : "PageHeader",
		ListGroupItemHeading : "ListGroupItemHeading",
		MediaHeading : "MediaHeading"
	};

	/*
	 * IconType Only used by ui5strapBs3Lib.Icon
	 */
	ui5strapBs3Lib.IconType = {
		Default : "Default",
		FormFeedback : "FormFeedback"
	};

	/*
	 * IconSize Only used by ui5strapBs3Lib.Icon
	 */
	ui5strapBs3Lib.IconSize = {
		Default : "Default",
		Large : "Large",
		X2 : "X2",
		X3 : "X3",
		X4 : "X4",
		X5 : "X5"
	};

	/*
	 * IconTransform Only used by ui5strapBs3Lib.Icon
	 */
	ui5strapBs3Lib.IconTransform = {
		Default : "Default",
		Rotate90 : "Rotate90",
		Rotate180 : "Rotate180",
		Rotate270 : "Rotate270",
		FlipHorizontal : "FlipHorizontal",
		FlipVertical : "FlipVertical"
	};

	/*
	 * ImageShape Only used by ui5strapBs3Lib.Image
	 */
	ui5strapBs3Lib.ImageShape = {
		Default : "Default",
		Rounded : "Rounded",
		Circle : "Circle",
		Thumbnail : "Thumbnail"
	};

	ui5strapBs3Lib.ImageType = {
		Default : "Default",
		MediaObject : "MediaObject",
		Responsive : "Responsive"
	};

	/*
	 * ListType
	 */
	ui5strapBs3Lib.ListType = {
		Unordered : "Unordered",
		Ordered : "Ordered"
	};

	ui5strapBs3Lib.ListGroupMode = {
		Default : "Default",
		Navigation : "Navigation"
	};

	/*
	 * LinkType
	 */
	ui5strapBs3Lib.LinkType = {
		Default : "Default",

		// Deprecated
		Thumbnail : "Thumbnail"
	};

	/*
	 * NavBarType Only used by ui5strapBs3Lib.NavBar
	 */
	ui5strapBs3Lib.NavBarType = {
		Default : "Default",
		None : "None"
	};

	/*
	 * NavBarPosition Only used by ui5strapBs3Lib.NavBar
	 */
	ui5strapBs3Lib.NavBarPosition = {
		Default : "Default",
		FixedTop : "FixedTop",
		FixedBottom : "FixedBottom",
		StaticTop : "StaticTop"
	};

	/*
	 * NavType Only used by ui5strapBs3Lib.Nav
	 */
	ui5strapBs3Lib.NavType = {
		Tabs : "Tabs",
		Pills : "Pills",
		PillsStacked : "PillsStacked",
		PillsJustified : "PillsJustified",
		TabsJustified : "TabsJustified",
		Default : "Default"
	};

	ui5strapBs3Lib.PickerWheelMode = {
		Mode3D : "Mode3D",
		Mode2D : "Mode2D"
	};

	/*
	 * Placement Used by Popover and Tooltip controls
	 */
	ui5strapBs3Lib.Placement = {
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

	/*
	 * RadioButtonType Only used by ui5strapBs3Lib.RadioButton
	 */
	ui5strapBs3Lib.RadioButtonType = {
		Default : "Default",
		Block : "Block",
		Inline : "Inline"
	};

	/*
	 * SelectBoxType Only used by ui5strapBs3Lib.SelectBox
	 */
	ui5strapBs3Lib.SelectBoxType = {
		Default : "Default",
		FormControl : "FormControl"
	};

	/*
	 * Severity
	 */
	ui5strapBs3Lib.Severity = {
		Default : "Default",
		Primary : "Primary",
		Success : "Success",
		Warning : "Warning",
		Info : "Info",
		Danger : "Danger",
		None : "None"
	};

	/*
	 * Size
	 */
	ui5strapBs3Lib.Size = {
		ExtraSmall : "ExtraSmall",
		Small : "Small",
		Medium : "Medium",
		Large : "Large",
		Default : "Default"
	};

	/*
	 * TextAlignment
	 */
	ui5strapBs3Lib.TextAlignment = {
		Default : "Default",

		Left : "Left",
		Right : "Right",
		Center : "Center",
		Justify : "Justify"
	};

	/*
	 * TextInputFormat Only used by ui5strapBs3Lib.TextInput
	 */
	ui5strapBs3Lib.TextInputFormat = {
		Default : "Default",
		Plain : "Plain",
		Html : "Html",
		Email : "Email",
		Date : "Date"
	}

	/*
	 * TextInputType Only used by ui5strapBs3Lib.TextInput
	 */
	ui5strapBs3Lib.TextInputType = {
		Default : "Default",
		FormControl : "FormControl"
	};

	/*
	 * TextType
	 */
	ui5strapBs3Lib.TextType = {
		Default : "Default",
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
	 * TriggerMode Used by Popovers
	 */
	ui5strapBs3Lib.TriggerMode = {
		Click : "Click",
		Hover : "Hover",
		Focus : "Focus",
		Manual : "Manual"
	};

	/*
	 * --------- END Types ---------
	 */

	// End of library
	return ui5strap;

});