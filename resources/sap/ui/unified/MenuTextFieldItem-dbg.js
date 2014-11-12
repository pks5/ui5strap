/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.MenuTextFieldItem.
jQuery.sap.declare("sap.ui.unified.MenuTextFieldItem");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.unified.MenuItemBase");


/**
 * Constructor for a new MenuTextFieldItem.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getLabel label} : string</li>
 * <li>{@link #getIcon icon} : sap.ui.core.URI</li>
 * <li>{@link #getValue value} : string</li>
 * <li>{@link #getValueState valueState} : sap.ui.core.ValueState (default: sap.ui.core.ValueState.None)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.unified.MenuItemBase#constructor sap.ui.unified.MenuItemBase}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Menu item which contains an text field. This menu item is e.g. helpful for filters.
 * The aggregation 'submenu' (inherited from parent class) is not supported for this type of menu item.
 * @extends sap.ui.unified.MenuItemBase
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.unified.MenuTextFieldItem
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.unified.MenuItemBase.extend("sap.ui.unified.MenuTextFieldItem", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"label" : {type : "string", group : "Appearance", defaultValue : null},
		"icon" : {type : "sap.ui.core.URI", group : "Appearance", defaultValue : null},
		"value" : {type : "string", group : "Misc", defaultValue : null},
		"valueState" : {type : "sap.ui.core.ValueState", group : "Appearance", defaultValue : sap.ui.core.ValueState.None}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.MenuTextFieldItem with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.unified.MenuTextFieldItem.extend
 * @function
 */


/**
 * Getter for property <code>label</code>.
 * The label of the contained text field.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>label</code>
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#getLabel
 * @function
 */

/**
 * Setter for property <code>label</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sLabel  new value for property <code>label</code>
 * @return {sap.ui.unified.MenuTextFieldItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#setLabel
 * @function
 */


/**
 * Getter for property <code>icon</code>.
 * Icon to be displayed.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>icon</code>
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#getIcon
 * @function
 */

/**
 * Setter for property <code>icon</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sIcon  new value for property <code>icon</code>
 * @return {sap.ui.unified.MenuTextFieldItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#setIcon
 * @function
 */


/**
 * Getter for property <code>value</code>.
 * Value of the contained text field.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>value</code>
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#getValue
 * @function
 */

/**
 * Setter for property <code>value</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sValue  new value for property <code>value</code>
 * @return {sap.ui.unified.MenuTextFieldItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#setValue
 * @function
 */


/**
 * Getter for property <code>valueState</code>.
 * Visualizes warnings or errors.
 *
 * Default value is <code>None</code>
 *
 * @return {sap.ui.core.ValueState} the value of property <code>valueState</code>
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#getValueState
 * @function
 */

/**
 * Setter for property <code>valueState</code>.
 *
 * Default value is <code>None</code> 
 *
 * @param {sap.ui.core.ValueState} oValueState  new value for property <code>valueState</code>
 * @return {sap.ui.unified.MenuTextFieldItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#setValueState
 * @function
 */


// Start of sap\ui\unified\MenuTextFieldItem.js
jQuery.sap.require("sap.ui.unified.MenuItemBase");
jQuery.sap.require("sap.ui.core.ValueStateSupport");

(function() {

/**
 * Called by the Menu renderer when the item should be rendered.
 * @private
 */
sap.ui.unified.MenuTextFieldItem.prototype.render = function(oRenderManager, oItem, oMenu, oInfo){
	var rm = oRenderManager,
		bIsEnabled = oMenu.checkEnabled(oItem),
		itemId = oItem.getId();
	
	rm.write("<li "); 
	rm.writeAttribute("class", "sapUiMnuItm sapUiMnuTfItm" + (oMenu.checkEnabled(oItem) ? "" : " sapUiMnuItmDsbl"));
	rm.writeElementData(oItem);
	
	// ARIA
	if(oInfo.bAccessible){
		rm.writeAttribute("role", "menuitem");
		rm.writeAttribute("aria-labelledby", oMenu.getId()+" "+itemId+"-txt "+itemId+"-scuttxt");
		rm.writeAttribute("aria-disabled", !bIsEnabled);
		rm.writeAttribute("aria-posinset", oInfo.iItemNo);
		rm.writeAttribute("aria-setsize", oInfo.iTotalItems);
	}
	
	// Left border
	rm.write("><div class=\"sapUiMnuItmL\"></div>");
	
	// icon/check column 
	rm.write("<div class=\"sapUiMnuItmIco\">");
	if (oItem.getIcon()) {
		rm.writeIcon(oItem.getIcon());
	}
	rm.write("</div>");
	
	// Text filed column 
	rm.write("<div id=\""+itemId+"-txt\" class=\"sapUiMnuItmTxt\">");
	rm.write("<label id=\""+itemId+"-lbl\" for=\""+itemId+"-tf\" class=\"sapUiMnuTfItemLbl\">");
	rm.writeEscaped(oItem.getLabel() || "");
	rm.write("</label>");
	rm.write("<div id=\""+itemId+"-str\" class=\"sapUiMnuTfItmStretch\"></div>"); // Helper to strech the width if needed
	rm.write("<div class=\"sapUiMnuTfItemWrppr\">");
	rm.write("<input id=\""+itemId+"-tf\" tabindex=\"-1\" role=\"textbox\" aria-multiline=\"false\" aria-autocomplete=\"none\"");
	rm.writeAttributeEscaped("value", oItem.getValue() || "");
	rm.writeAttribute("class", bIsEnabled ? "sapUiMnuTfItemTf sapUiMnuTfItemTfEnbl" : "sapUiMnuTfItemTf sapUiMnuTfItemTfDsbl");	
	if(!bIsEnabled){
		rm.writeAttribute("disabled", "disabled");		
	}
	rm.write("></input></div></div>");
	
	// Right border
	rm.write("<div class=\"sapUiMnuItmR\"></div>");

	rm.write("</li>");
};


/**
 * Called by the Menu renderer when the item is hovered.
 * @private
 */
sap.ui.unified.MenuTextFieldItem.prototype.hover = function(bHovered, oMenu){
	this.$().toggleClass("sapUiMnuItmHov", bHovered);
	
	if(bHovered && oMenu.checkEnabled(this)){
		var that = this;
		function focusTF() { that.$("tf").focus(); };
		
		if(sap.ui.Device.browser.internet_explorer && sap.ui.Device.browser.version == 8){
			setTimeout(focusTF, 0);
		}else{
			focusTF();
		}
	}
};


/**
 * Called by the Menu renderer after the item is rendered.
 * @private
 */
sap.ui.unified.MenuTextFieldItem.prototype.onAfterRendering = function(){
	this._adaptSizes();
	this.setValueState(this.getValueState());	
};


//************ Event Handling *************


sap.ui.unified.MenuTextFieldItem.prototype.onsapup = function(oEvent){
	this.getParent().focus();
	this.getParent().onsapprevious(oEvent);
};


sap.ui.unified.MenuTextFieldItem.prototype.onsapdown = function(oEvent){
	this.getParent().focus();
	this.getParent().onsapnext(oEvent);
};


sap.ui.unified.MenuTextFieldItem.prototype.onsaphome = function(oEvent){
	if(this._checkCursorPosForNav(false)){
		this.getParent().focus();
		this.getParent().onsaphome(oEvent);
	}
};


sap.ui.unified.MenuTextFieldItem.prototype.onsapend = function(oEvent){
	if(this._checkCursorPosForNav(true)){
		this.getParent().focus();
		this.getParent().onsapend(oEvent);
	}
};


sap.ui.unified.MenuTextFieldItem.prototype.onsapescape = function(oEvent){
	this.getParent().onsapescape(oEvent);
};


sap.ui.unified.MenuTextFieldItem.prototype.onkeydown = function(oEvent){
	oEvent.stopPropagation(); //Avoid bubbling key events to the Menu -> Events are only selectively forwarded
};


sap.ui.unified.MenuTextFieldItem.prototype.onclick = function(oEvent){
	if(!sap.ui.Device.system.desktop && this.getParent().checkEnabled(this)){
		this.focus();
	}
	oEvent.stopPropagation();
};


sap.ui.unified.MenuTextFieldItem.prototype.onsapenter = function(oEvent){
	var sValue = this.$("tf").val();
	this.setValue(sValue);
	this.getParent().selectItem(this);
	oEvent.preventDefault();
	oEvent.stopPropagation();
};


// ************ Overridden API functions *************

/**
 * Getter for aggregation <code>submenu</code>.<br/>
 * Aggregation of a menu item's sub menu.
 * 
 * @return {sap.ui.unified.Menu}
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#getSubmenu
 * @deprecated The aggregation 'submenu' (inherited from parent class) is not supported for this type of menu item.
 * @function
 */
 
/**
 * Destroys the submenu in the aggregation 
 * named <code>submenu</code>.
 * @return {sap.ui.unified.MenuTextFieldItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#destroySubmenu
 * @deprecated The aggregation 'submenu' (inherited from parent class) is not supported for this type of menu item.
 * @function
 */

/**
 * Setter for the aggregated <code>submenu</code>.
 * @param {sap.ui.unified.Menu} oSubmenu
 * @return {sap.ui.unified.MenuTextFieldItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuTextFieldItem#setSubmenu
 * @deprecated The aggregation 'submenu' (inherited from parent class) is not supported for this type of menu item.
 * @function
 */
sap.ui.unified.MenuTextFieldItem.prototype.setSubmenu = function(oMenu){
	jQuery.sap.log.warning("The aggregation 'submenu' is not supported for this type of menu item.", "", "sap.ui.unified.MenuTextFieldItem");
	return this;
};


sap.ui.unified.MenuTextFieldItem.prototype.setLabel = function(sLabel){
	this.setProperty("label", sLabel, true);
	this.$("lbl").text(sLabel);
	this._adaptSizes();
	return this;
};


sap.ui.unified.MenuTextFieldItem.prototype.setValue = function(sValue){
	this.setProperty("value", sValue, true);
	this.$("tf").val(sValue);
	//this._adaptSizes();
	return this;
};


sap.ui.unified.MenuTextFieldItem.prototype.setValueState = function(sValueState){
	this.setProperty("valueState", sValueState, true);
	var $tf = this.$("tf");
	$tf.toggleClass("sapUiMnuTfItemTfErr", sValueState == sap.ui.core.ValueState.Error);
	$tf.toggleClass("sapUiMnuTfItemTfWarn", sValueState == sap.ui.core.ValueState.Warning);
	var sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(this, this.getTooltip_AsString());
	this.$().attr("title", sTooltip ? sTooltip : "");
	return this;
};


//************ Private Helpers *************


sap.ui.unified.MenuTextFieldItem.prototype.getFocusDomRef = function () {
	var $FocusRef = this.$("tf");
	return $FocusRef.length ? $FocusRef.get(0) : null;
};


sap.ui.unified.MenuTextFieldItem.prototype._adaptSizes = function(){
	var $tf = this.$("tf");
	var $lbl = this.$("lbl");
	var offsetLeft = $lbl.length ? $lbl.get(0).offsetLeft : 0;
	
	if(sap.ui.getCore().getConfiguration().getRTL()){
		$tf.parent().css({"width": "auto", "right": (this.$().outerWidth(true) - offsetLeft + ($lbl.outerWidth(true) - $lbl.outerWidth()))+"px"});
	}else{
		$tf.parent().css({"width": "auto", "left": (offsetLeft + $lbl.outerWidth(true))+"px"});
	}
};


sap.ui.unified.MenuTextFieldItem.prototype._checkCursorPosForNav = function(bForward) {
	var bRtl = sap.ui.getCore().getConfiguration().getRTL();
	var bBack = bForward ? bRtl : !bRtl;
	var $input = this.$("tf");
	var iPos = $input.cursorPos();
	var iLen = $input.val().length;
	if(bRtl){
		iPos = iLen-iPos;
	}
	if((!bBack && iPos != iLen) || (bBack && iPos != 0)){
		return false;
	}
	return true;
};


}());
