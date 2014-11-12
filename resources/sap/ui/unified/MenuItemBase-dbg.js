/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.MenuItemBase.
jQuery.sap.declare("sap.ui.unified.MenuItemBase");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.core.Element");


/**
 * Constructor for a new MenuItemBase.
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
 * <li>{@link #getEnabled enabled} : boolean (default: true)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getStartsSection startsSection} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getSubmenu submenu} <strong>(default aggregation)</strong> : sap.ui.unified.Menu</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.ui.unified.MenuItemBase#event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.core.Element#constructor sap.ui.core.Element}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Provides the standard properties for menu items.
 * @extends sap.ui.core.Element
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.unified.MenuItemBase
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Element.extend("sap.ui.unified.MenuItemBase", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"visible" : {type : "boolean", group : "Behavior", defaultValue : true},
		"startsSection" : {type : "boolean", group : "Behavior", defaultValue : false}
	},
	defaultAggregation : "submenu",
	aggregations : {
		"submenu" : {type : "sap.ui.unified.Menu", multiple : false}
	},
	events : {
		"select" : {}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.MenuItemBase with name <code>sClassName</code> 
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
 * @name sap.ui.unified.MenuItemBase.extend
 * @function
 */

sap.ui.unified.MenuItemBase.M_EVENTS = {'select':'select'};


/**
 * Getter for property <code>enabled</code>.
 * 
 * Disabled items have different colors, depending on customer settings.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.ui.unified.MenuItemBase#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#setEnabled
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * 
 * Invisible controls are not rendered.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.ui.unified.MenuItemBase#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#setVisible
 * @function
 */


/**
 * Getter for property <code>startsSection</code>.
 * 
 * If set to true, a divider is displayed before the item
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>startsSection</code>
 * @public
 * @name sap.ui.unified.MenuItemBase#getStartsSection
 * @function
 */

/**
 * Setter for property <code>startsSection</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bStartsSection  new value for property <code>startsSection</code>
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#setStartsSection
 * @function
 */


/**
 * Getter for aggregation <code>submenu</code>.<br/>
 * Aggregation of a menu item's sub menu.
 * 
 * <strong>Note</strong>: this is the default aggregation for MenuItemBase.
 * @return {sap.ui.unified.Menu}
 * @public
 * @name sap.ui.unified.MenuItemBase#getSubmenu
 * @function
 */


/**
 * Setter for the aggregated <code>submenu</code>.
 * @param {sap.ui.unified.Menu} oSubmenu
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#setSubmenu
 * @function
 */
	

/**
 * Destroys the submenu in the aggregation 
 * named <code>submenu</code>.
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#destroySubmenu
 * @function
 */


/**
 * Event is fired when an item is selected. The event is also available for items having a sub menu.
 * A mouse click or space bar click on a sub menu item fires the event.
 *
 * @name sap.ui.unified.MenuItemBase#select
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.unified.MenuItemBase} oControlEvent.getParameters.item Represents the current item
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'select' event of this <code>sap.ui.unified.MenuItemBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.ui.unified.MenuItemBase</code>.<br/> itself. 
 *  
 * Event is fired when an item is selected. The event is also available for items having a sub menu.
 * A mouse click or space bar click on a sub menu item fires the event.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.unified.MenuItemBase</code>.<br/> itself.
 *
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#attachSelect
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'select' event of this <code>sap.ui.unified.MenuItemBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.MenuItemBase#detachSelect
 * @function
 */

/**
 * Fire event select to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'item' of type <code>sap.ui.unified.MenuItemBase</code> Represents the current item</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.unified.MenuItemBase} <code>this</code> to allow method chaining
 * @protected
 * @name sap.ui.unified.MenuItemBase#fireSelect
 * @function
 */


// Start of sap\ui\unified\MenuItemBase.js
sap.ui.unified.MenuItemBase.prototype.init = function(){
   // do something for initialization...
};

/**
 * @param {object} oRenderManager
 * @param {object} oItem
 * @param {object} oMenu
 * @protected
 */
sap.ui.unified.MenuItemBase.prototype.render = function(oRenderManager, oItem, oMenu){
	// Subclasses have to override this: Called when the item is rendered
	var rm = oRenderManager;
	rm.write("<li");
	rm.writeElementData(oItem);
	rm.write("><div style=\"white-space:nowrap;display:inline-block;padding:1px;color:black;\" id=\""+this.getId()+"-txt\">");
	rm.write(oItem.getId());
	if(this.getSubmenu()){
		rm.write("&nbsp;&nbsp;->");
	}
	rm.write("</div></li>");
};

/** 
 * @param {boolean} bHovered
 * @param {object} oMenu
 * @protected
 */
sap.ui.unified.MenuItemBase.prototype.hover = function(bHovered, oMenu){
	// Subclasses have to override this: Called when the item is hovered
	this.$("txt").attr("style", bHovered ? "white-space:nowrap;display:inline-block;padding:1px;color:red;" : "white-space:nowrap;display:inline-block;padding:1px;color:black;");
};

/** 
 * @param {boolean} bOpened
 * @protected
 */
sap.ui.unified.MenuItemBase.prototype.onSubmenuToggle = function(bOpened){
	// Subclasses may override this: Called when the items submenu is opend or closed
	this.$().toggleClass("sapUiMnuItmSubMnuOpen", bOpened);
};

/**
 * @protected
 */
sap.ui.unified.MenuItemBase.prototype.onAfterRendering = function(){
	// Subclasses may override this: Called after the item is rendered
};



sap.ui.unified.MenuItemBase.prototype.onmouseover = function(oEvent){
	var oParent = this.getParent();
	if(oParent && oParent instanceof sap.ui.unified.Menu && this.getTooltip() instanceof sap.ui.core.TooltipBase){
		//TooltipBase stops the event propagation
		oParent.onmouseover(oEvent);
	}
};