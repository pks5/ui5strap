/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Panel.
jQuery.sap.declare("sap.m.Panel");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Panel.
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
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getHeaderText headerText} : string</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize (default: 'auto')</li>
 * <li>{@link #getExpandable expandable} : boolean (default: false)</li>
 * <li>{@link #getExpanded expanded} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getContent content} <strong>(default aggregation)</strong> : sap.ui.core.Control[]</li>
 * <li>{@link #getHeaderToolbar headerToolbar} : sap.m.Toolbar</li>
 * <li>{@link #getInfoToolbar infoToolbar} : sap.m.Toolbar</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.Panel#event:expand expand} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The Panel control is a container for controls with a solid background and a header text.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.16
 * @name sap.m.Panel
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.Panel", { metadata : {

	library : "sap.m",
	properties : {
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"headerText" : {type : "string", group : "Data", defaultValue : null},
		"width" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : '100%'},
		"height" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : 'auto'},
		"expandable" : {type : "boolean", group : "Appearance", defaultValue : false},
		"expanded" : {type : "boolean", group : "Appearance", defaultValue : false}
	},
	defaultAggregation : "content",
	aggregations : {
		"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}, 
		"headerToolbar" : {type : "sap.m.Toolbar", multiple : false}, 
		"infoToolbar" : {type : "sap.m.Toolbar", multiple : false}
	},
	events : {
		"expand" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.Panel with name <code>sClassName</code> 
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
 * @name sap.m.Panel.extend
 * @function
 */

sap.m.Panel.M_EVENTS = {'expand':'expand'};


/**
 * Getter for property <code>visible</code>.
 * Is the control visible
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.Panel#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#setVisible
 * @function
 */


/**
 * Getter for property <code>headerText</code>.
 * Sets the header text
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>headerText</code>
 * @public
 * @name sap.m.Panel#getHeaderText
 * @function
 */

/**
 * Setter for property <code>headerText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sHeaderText  new value for property <code>headerText</code>
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#setHeaderText
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * The Panel width
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.Panel#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#setWidth
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * The Panel height
 *
 * Default value is <code>auto</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.m.Panel#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is <code>auto</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#setHeight
 * @function
 */


/**
 * Getter for property <code>expandable</code>.
 * Is the control expandable
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>expandable</code>
 * @public
 * @since 1.22
 * @name sap.m.Panel#getExpandable
 * @function
 */

/**
 * Setter for property <code>expandable</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bExpandable  new value for property <code>expandable</code>
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.22
 * @name sap.m.Panel#setExpandable
 * @function
 */


/**
 * Getter for property <code>expanded</code>.
 * If expandable, this property indicates is the state is expanded or not. If expanded, then infoToolbar (if available) and content is rendered; if expanded is false, then only the headerText/headerToolbar is rendered.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>expanded</code>
 * @public
 * @since 1.22
 * @name sap.m.Panel#getExpanded
 * @function
 */

/**
 * Setter for property <code>expanded</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bExpanded  new value for property <code>expanded</code>
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.22
 * @name sap.m.Panel#setExpanded
 * @function
 */


/**
 * Getter for aggregation <code>content</code>.<br/>
 * Content for the Panel
 * 
 * <strong>Note</strong>: this is the default aggregation for Panel.
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.m.Panel#getContent
 * @function
 */


/**
 * Inserts a content into the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *          oContent the content to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the content should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the content is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the content is inserted at 
 *             the last position        
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#insertContent
 * @function
 */

/**
 * Adds some content <code>oContent</code> 
 * to the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content to add; if empty, nothing is inserted
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#addContent
 * @function
 */

/**
 * Removes an content from the aggregation named <code>content</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContent the content to remove or its index or id
 * @return {sap.ui.core.Control} the removed content or null
 * @public
 * @name sap.m.Panel#removeContent
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>content</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Panel#removeAllContent
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Control</code> in the aggregation named <code>content</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Panel#indexOfContent
 * @function
 */
	

/**
 * Destroys all the content in the aggregation 
 * named <code>content</code>.
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Panel#destroyContent
 * @function
 */


/**
 * Getter for aggregation <code>headerToolbar</code>.<br/>
 * Header can be used as a Toolbar to add extra controls for user interactions.
 * Note: This aggregation overwrites "headerText" property.
 * 
 * @return {sap.m.Toolbar}
 * @public
 * @since 1.16
 * @name sap.m.Panel#getHeaderToolbar
 * @function
 */


/**
 * Setter for the aggregated <code>headerToolbar</code>.
 * @param {sap.m.Toolbar} oHeaderToolbar
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Panel#setHeaderToolbar
 * @function
 */
	

/**
 * Destroys the headerToolbar in the aggregation 
 * named <code>headerToolbar</code>.
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Panel#destroyHeaderToolbar
 * @function
 */


/**
 * Getter for aggregation <code>infoToolbar</code>.<br/>
 * InfoBar is placed below the header and can be used to show extra information to the user.
 * 
 * @return {sap.m.Toolbar}
 * @public
 * @since 1.16
 * @name sap.m.Panel#getInfoToolbar
 * @function
 */


/**
 * Setter for the aggregated <code>infoToolbar</code>.
 * @param {sap.m.Toolbar} oInfoToolbar
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Panel#setInfoToolbar
 * @function
 */
	

/**
 * Destroys the infoToolbar in the aggregation 
 * named <code>infoToolbar</code>.
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Panel#destroyInfoToolbar
 * @function
 */


/**
 * Indicates that the panel will expand or collapse
 *
 * @name sap.m.Panel#expand
 * @event
 * @since 1.22
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {boolean} oControlEvent.getParameters.expand If the panel will expand, this is true. If the panel will collapse, this is false.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'expand' event of this <code>sap.m.Panel</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Panel</code>.<br/> itself. 
 *  
 * Indicates that the panel will expand or collapse
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Panel</code>.<br/> itself.
 *
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.22
 * @name sap.m.Panel#attachExpand
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'expand' event of this <code>sap.m.Panel</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 * @since 1.22
 * @name sap.m.Panel#detachExpand
 * @function
 */

/**
 * Fire event expand to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'expand' of type <code>boolean</code> If the panel will expand, this is true. If the panel will collapse, this is false.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @protected
 * @since 1.22
 * @name sap.m.Panel#fireExpand
 * @function
 */


// Start of sap\m\Panel.js
sap.m.Panel.prototype.init = function() {
};

/**
 * Sets the width of the panel.
 * 
 * @param {sap.ui.core.CSSSize}
 *          sWidth the width of the panel as CSS size
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 */
sap.m.Panel.prototype.setWidth = function(sWidth) {
	this.setProperty("width", sWidth, true); // don't rerender
	var oDomRef = this.getDomRef();
	if (oDomRef) {
		oDomRef.style.width = sWidth;
	}
	return this;
};

/**
 * Sets the height of the panel.
 * 
 * @param {sap.ui.core.CSSSize}
 *          sHeight the height of the panel as CSS size
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 */
sap.m.Panel.prototype.setHeight = function(sHeight) {
	this.setProperty("height", sHeight, true); // don't rerender
	var oDomRef = this.getDomRef();
	if (oDomRef) {
		oDomRef.style.height = sHeight;
	}
	return this;
};

/**
 * Sets the expandable property of the control.
 * 
 * @param {boolean}
 *          bExpandable defining whether control "expandable" - if yes infoToolbar (if available) and content can be
 *          collapsed/expanded
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 */
sap.m.Panel.prototype.setExpandable = function(bExpandable) {
	this.setProperty("expandable", bExpandable, false); // rerender since we set certain css classes

	if (bExpandable && !this.oIconCollapsed) {
		jQuery.sap.require("sap.ui.core.IconPool");

		// we use only one icon (for collapsed) which is then rotated in css
		var sCollapsedIconURI = sap.ui.core.IconPool.getIconURI("navigation-right-arrow");
		var that = this;
		var oIconCollapsed = sap.ui.core.IconPool.createControlByURI({
			id : that.getId() + "-CollapsedImg",
			src : sCollapsedIconURI
		}).addStyleClass("sapMPanelExpandableIcon").attachPress(function(oEvent) {
			that.setExpanded(!that.getExpanded());
		});

		// make sure it is focusable
		oIconCollapsed.setDecorative(false);

		this.oIconCollapsed = oIconCollapsed;
	}

	return this;
};

/**
 * Sets the expanded property of the control.
 * 
 * @param {boolean}
 *          bExpanded defining whether control is expanded or not
 * @return {sap.m.Panel} <code>this</code> to allow method chaining
 * @public
 */
sap.m.Panel.prototype.setExpanded = function(bExpanded) {

	// should not toggle if nothing changed
	if (bExpanded === this.getExpanded()) {
		return;
	}

	this.setProperty("expanded", bExpanded, true); // do not rerender !

	if (!this.getExpandable()) {
		return;
	}

	var $this = this.$();
	$this.find(".sapMPanelExpandableIcon").toggleClass("sapMPanelExpandableIconExpanded");

	// need empty object as parameter to toggle since otherwise duration is set to 0
	$this.find(".sapMPanelExpandablePart").slideToggle({});

	// for controlling the visibility of the border 
	 $this.find(".sapMPanelWrappingDiv").toggleClass("sapMPanelWrappingDivExpanded");

	this.fireExpand({
		expand : bExpanded
	});

	return this;
};

sap.m.Panel.prototype.onAfterRendering = function() {

	var $this = this.$();

	if (this.getExpandable())
		if (this.getExpanded()) {
			// this is relevant when we create Panel specifying the expanded property as 'constructor parameter'
			$this.find(".sapMPanelWrappingDiv").addClass("sapMPanelWrappingDivExpanded");
		} else {
			// hide those parts which are collapsible (w/o animation, otherwise initial loading doesn't look good ...)
			$this.find(".sapMPanelExpandablePart").hide();
		}

};

sap.m.Panel.prototype.exit = function() {
	if (this.oIconCollapsed) {
		this.oIconCollapsed.destroy();
		delete this.oIconCollapsed;
	}
};

/**
 * Get the icon representing the collapsed state
 * 
 * @return {sap.ui.core.Icon} the icon representing the collapsed state
 * @private
 */
sap.m.Panel.prototype._getIcon = function() {
	return this.oIconCollapsed;
};
