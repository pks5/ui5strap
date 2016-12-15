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
	 * @name pks.ui5strap.bs3
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * @public
	 */
	sap.ui.getCore().initLibrary(
			{
				name : "pks.ui5strap.bs3",

				version : "0.11.6-SNAPSHOT",

				dependencies : [ "sap.ui.core", "pks.ui5strap.core" ],

				types : [ "pks.ui5strap.bs3.Alignment", "pks.ui5strap.bs3.BarType", "pks.ui5strap.bs3.BSAlignment", 
				          "pks.ui5strap.bs3.BSPlacement", "pks.ui5strap.bs3.BSSeverity", "pks.ui5strap.bs3.BSSize",
				          "pks.ui5strap.bs3.BSTriggerMode", "pks.ui5strap.bs3.ButtonType", "pks.ui5strap.bs3.ButtonGroupType",
				          "pks.ui5strap.bs3.CarouselOverflow", "pks.ui5strap.bs3.CheckboxType", "pks.ui5strap.bs3.ContainerType",
				          "pks.ui5strap.bs3.DropdownMenuHostUpdate", "pks.ui5strap.bs3.FormMethod",
				          "pks.ui5strap.bs3.FormSeverity", "pks.ui5strap.bs3.FormType", "pks.ui5strap.bs3.HeadingType",
				          "pks.ui5strap.bs3.IconType", "pks.ui5strap.bs3.IconSize", "pks.ui5strap.bs3.IconTransform",
				          "pks.ui5strap.bs3.ImageType", "pks.ui5strap.bs3.ImageShape", 
				          "pks.ui5strap.bs3.ListGroupMode", "pks.ui5strap.bs3.LinkType", "pks.ui5strap.bs3.NavBarType",
				          "pks.ui5strap.bs3.NavBarPosition",  "pks.ui5strap.bs3.NavType", "pks.ui5strap.bs3.PickerWheelMode",
				          "pks.ui5strap.bs3.Placement", "pks.ui5strap.bs3.RadioButtonType",
				          "pks.ui5strap.bs3.SelectBoxType", "pks.ui5strap.bs3.Severity", "pks.ui5strap.bs3.Size",
				          "pks.ui5strap.bs3.TextAlignment", "pks.ui5strap.bs3.TextInputFormat", "pks.ui5strap.bs3.TextInputType",
				          "pks.ui5strap.bs3.TextType", "pks.ui5strap.bs3.TriggerMode"],

				interfaces : [ "pks.ui5strap.bs3.IBar",
						"pks.ui5strap.bs3.IColumn", "pks.ui5strap.bs3.IDropdownMenuHost",
						"pks.ui5strap.bs3.IInputGroupAddon", "pks.ui5strap.bs3.IInputGroup",
						"pks.ui5strap.bs3.IInputGroupControl",
						"pks.ui5strap.bs3.IInputGroupButton"
						 ],

				controls : [ "pks.ui5strap.bs3.Alert", "pks.ui5strap.bs3.Bar",
						"pks.ui5strap.bs3.Breadcrumb",
						"pks.ui5strap.bs3.Button", "pks.ui5strap.bs3.ButtonDropdown",
						"pks.ui5strap.bs3.ButtonGroup", "pks.ui5strap.bs3.ButtonToolbar",
						"pks.ui5strap.bs3.Carousel", "pks.ui5strap.bs3.Checkbox",
						"pks.ui5strap.bs3.Clearfix", "pks.ui5strap.bs3.Col",
						"pks.ui5strap.bs3.Container", "pks.ui5strap.bs3.Form",
						"pks.ui5strap.bs3.FormGroup", "pks.ui5strap.bs3.Heading",
						"pks.ui5strap.bs3.Icon", "pks.ui5strap.bs3.Image",
						"pks.ui5strap.bs3.InputGroup", "pks.ui5strap.bs3.Jumbotron",
						"pks.ui5strap.bs3.Link", 
						"pks.ui5strap.bs3.ListDropdownItem",
						"pks.ui5strap.bs3.DropdownMenu", "pks.ui5strap.bs3.ListGroup",
						"pks.ui5strap.bs3.ListGroupItem", 
						"pks.ui5strap.bs3.ListLinkItem", "pks.ui5strap.bs3.MediaList",
						"pks.ui5strap.bs3.MediaListItem", "pks.ui5strap.bs3.NavItem",
						"pks.ui5strap.bs3.Modal", "pks.ui5strap.bs3.Nav", "pks.ui5strap.bs3.NavBar",
						"pks.ui5strap.bs3.Page", "pks.ui5strap.bs3.Pager",
						"pks.ui5strap.bs3.Pagination", "pks.ui5strap.bs3.Panel",
						"pks.ui5strap.bs3.PanelGroup", "pks.ui5strap.bs3.Paragraph",
						"pks.ui5strap.bs3.PickerWheel", "pks.ui5strap.bs3.Popover",
						"pks.ui5strap.bs3.Progress", "pks.ui5strap.bs3.ProgressBar",
						"pks.ui5strap.bs3.RadioButton", "pks.ui5strap.bs3.Row",
						"pks.ui5strap.bs3.SelectBox", "pks.ui5strap.bs3.StaticOverlay",
						"pks.ui5strap.bs3.TabContainer", "pks.ui5strap.bs3.Table",
						"pks.ui5strap.bs3.Text", "pks.ui5strap.bs3.TextInput",
						"pks.ui5strap.bs3.Thumbnail", "pks.ui5strap.bs3.ToggleButton",
						"pks.ui5strap.bs3.Tooltip", "pks.ui5strap.bs3.Well" ],

				elements : [ "pks.ui5strap.bs3.TableCell",
						"pks.ui5strap.bs3.TableRow" ]
			});

	var ui5strapBs3Lib = pks.ui5strap.bs3;

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

	ui5strapBs3Lib.support.transition = _bootstrapTransitionEnd();

	// http://blog.alexmaccaw.com/css-transitions
	jQuery.fn.emulateTransitionEnd = function(duration) {
		var called = false, $el = this;
		jQuery(this).one(ui5strapBs3Lib.support.transition.end, function() {
			called = true
		});

		var callback = function() {
			if (!called)
				jQuery($el).trigger(ui5strapBs3Lib.support.transition.end);
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
	return ui5strapBs3Lib;

});