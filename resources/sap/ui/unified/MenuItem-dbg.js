/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.MenuItem.
jQuery.sap.declare("sap.ui.unified.MenuItem");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.unified.MenuItemBase");


/**
 * Constructor for a new MenuItem.
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
 * <li>{@link #getText text} : string (default: '')</li>
 * <li>{@link #getIcon icon} : sap.ui.core.URI (default: '')</li></ul>
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
 * Smallest unit in the menu hierarchy. An item can be a direct part of a menu bar, of a menu, or of a sub menu.
 * @extends sap.ui.unified.MenuItemBase
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.unified.MenuItem
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.unified.MenuItemBase.extend("sap.ui.unified.MenuItem", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"text" : {type : "string", group : "Appearance", defaultValue : ''},
		"icon" : {type : "sap.ui.core.URI", group : "Appearance", defaultValue : ''}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.MenuItem with name <code>sClassName</code> 
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
 * @name sap.ui.unified.MenuItem.extend
 * @function
 */


/**
 * Getter for property <code>text</code>.
 * 
 * Item text
 *
 * Default value is <code>''</code>
 *
 * @return {string} the value of property <code>text</code>
 * @public
 * @name sap.ui.unified.MenuItem#getText
 * @function
 */

/**
 * Setter for property <code>text</code>.
 *
 * Default value is <code>''</code> 
 *
 * @param {string} sText  new value for property <code>text</code>
 * @return {sap.ui.unified.MenuItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItem#setText
 * @function
 */


/**
 * Getter for property <code>icon</code>.
 * 
 * Icon to be displayed
 *
 * Default value is <code>''</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>icon</code>
 * @public
 * @name sap.ui.unified.MenuItem#getIcon
 * @function
 */

/**
 * Setter for property <code>icon</code>.
 *
 * Default value is <code>''</code> 
 *
 * @param {sap.ui.core.URI} sIcon  new value for property <code>icon</code>
 * @return {sap.ui.unified.MenuItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItem#setIcon
 * @function
 */


// Start of sap\ui\unified\MenuItem.js
jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.core.IconPool.getIconInfo("", ""); //Ensure Icon Font is loaded

sap.ui.unified.MenuItem.prototype.render = function(oRenderManager, oItem, oMenu, oInfo){
	var rm = oRenderManager;
	var oSubMenu = oItem.getSubmenu();
	rm.write("<li ");
	rm.writeAttribute("class", "sapUiMnuItm" + (oMenu.checkEnabled(oItem) ? "" : " sapUiMnuItmDsbl"));
	if(oItem.getTooltip_AsString()) {
		rm.writeAttributeEscaped("title", oItem.getTooltip_AsString());
	}
	rm.writeElementData(oItem);

	// ARIA
	if(oInfo.bAccessible){
		rm.writeAttribute("role", "menuitem");
		rm.writeAttribute("aria-labelledby", oMenu.getId()+" "+this.getId()+"-txt "+this.getId()+"-scuttxt");
		rm.writeAttribute("aria-disabled", !oMenu.checkEnabled(oItem));
		rm.writeAttribute("aria-posinset", oInfo.iItemNo);
		rm.writeAttribute("aria-setsize", oInfo.iTotalItems);
		if (oSubMenu) {
			rm.writeAttribute("aria-haspopup", true);
			rm.writeAttribute("aria-owns", oSubMenu.getId());
		}
	}

	// Left border
	rm.write("><div class=\"sapUiMnuItmL\"></div>");

	// icon/check column
	rm.write("<div class=\"sapUiMnuItmIco\">");
	if (oItem.getIcon()) {
		rm.writeIcon(oItem.getIcon());
	}
	rm.write("</div>");

	// Text column
	rm.write("<div id=\""+this.getId()+"-txt\" class=\"sapUiMnuItmTxt\">");
	rm.writeEscaped(oItem.getText());
	rm.write("</div>");

	// Shortcut column
	rm.write("<div id=\""+this.getId()+"-scuttxt\" class=\"sapUiMnuItmSCut\"></div>");

	// Submenu column
	rm.write("<div class=\"sapUiMnuItmSbMnu\">");
	if(oSubMenu) {
		rm.write("<div class=\"sapUiIconMirrorInRTL\"></div>");
	}
	rm.write("</div>");

	// Right border
	rm.write("<div class=\"sapUiMnuItmR\"></div>");

	rm.write("</li>");
};

/**
 * @protected
 */
sap.ui.unified.MenuItem.prototype.hover = function(bHovered, oMenu){
	this.$().toggleClass("sapUiMnuItmHov", bHovered);
};