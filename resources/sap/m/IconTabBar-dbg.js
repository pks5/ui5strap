/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.IconTabBar.
jQuery.sap.declare("sap.m.IconTabBar");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new IconTabBar.
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
 * <li>{@link #getShowSelection showSelection} : boolean (default: true)</li>
 * <li>{@link #getExpandable expandable} : boolean (default: true)</li>
 * <li>{@link #getExpanded expanded} : boolean (default: true)</li>
 * <li>{@link #getSelectedKey selectedKey} : string</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getUpperCase upperCase} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.m.IconTab[]</li>
 * <li>{@link #getContent content} : sap.ui.core.Control[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.IconTabBar#event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.IconTabBar#event:expand expand} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A tab bar with large icons
 * @extends sap.ui.core.Control
 * @implements sap.m.ObjectHeaderContainer
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.IconTabBar
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.IconTabBar", { metadata : {

	interfaces : [
		"sap.m.ObjectHeaderContainer"
	],
	library : "sap.m",
	properties : {
		"showSelection" : {type : "boolean", group : "Misc", defaultValue : true, deprecated: true},
		"expandable" : {type : "boolean", group : "Misc", defaultValue : true},
		"expanded" : {type : "boolean", group : "Misc", defaultValue : true},
		"selectedKey" : {type : "string", group : "Data", defaultValue : null},
		"visible" : {type : "boolean", group : "Behavior", defaultValue : true},
		"upperCase" : {type : "boolean", group : "Appearance", defaultValue : false}
	},
	aggregations : {
		"items" : {type : "sap.m.IconTab", multiple : true, singularName : "item"}, 
		"content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}, 
		"_header" : {type : "sap.m.IconTabHeader", multiple : false, visibility : "hidden"}
	},
	events : {
		"select" : {}, 
		"expand" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.IconTabBar with name <code>sClassName</code> 
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
 * @name sap.m.IconTabBar.extend
 * @function
 */

sap.m.IconTabBar.M_EVENTS = {'select':'select','expand':'expand'};


/**
 * Getter for property <code>showSelection</code>.
 * Defines whether the current selection should be visualized
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showSelection</code>
 * @public
 * @deprecated Since version 1.15.0. 
 * Regarding to changes of this control this property is not needed anymore.
 * @name sap.m.IconTabBar#getShowSelection
 * @function
 */

/**
 * Setter for property <code>showSelection</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowSelection  new value for property <code>showSelection</code>
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.15.0. 
 * Regarding to changes of this control this property is not needed anymore.
 * @name sap.m.IconTabBar#setShowSelection
 * @function
 */


/**
 * Getter for property <code>expandable</code>.
 * Defines if the tabs can be collapsed and expanded
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>expandable</code>
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#getExpandable
 * @function
 */

/**
 * Setter for property <code>expandable</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bExpandable  new value for property <code>expandable</code>
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#setExpandable
 * @function
 */


/**
 * Getter for property <code>expanded</code>.
 * Indicates if the actual tab is expanded or not
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>expanded</code>
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#getExpanded
 * @function
 */

/**
 * Setter for property <code>expanded</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bExpanded  new value for property <code>expanded</code>
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#setExpanded
 * @function
 */


/**
 * Getter for property <code>selectedKey</code>.
 * Key of the selected item.
 * 
 * If the key has no corresponding aggregated item, no changes will apply.
 * If duplicate keys exists the first item matching the key is used.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>selectedKey</code>
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#getSelectedKey
 * @function
 */

/**
 * Setter for property <code>selectedKey</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sSelectedKey  new value for property <code>selectedKey</code>
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#setSelectedKey
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Invisible controls are not rendered
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#setVisible
 * @function
 */


/**
 * Getter for property <code>upperCase</code>.
 * Determines whether the text of the icon tab filter (not the count) is uppercased.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>upperCase</code>
 * @public
 * @since 1.22
 * @name sap.m.IconTabBar#getUpperCase
 * @function
 */

/**
 * Setter for property <code>upperCase</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bUpperCase  new value for property <code>upperCase</code>
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.22
 * @name sap.m.IconTabBar#setUpperCase
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * The items displayed in the IconTabBar
 * 
 * @return {sap.m.IconTab[]}
 * @public
 * @name sap.m.IconTabBar#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.m.IconTab}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.m.IconTab}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.m.IconTab} vItem the item to remove or its index or id
 * @return {sap.m.IconTab} the removed item or null
 * @public
 * @name sap.m.IconTabBar#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.IconTab[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.IconTabBar#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.m.IconTab</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.IconTab}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.IconTabBar#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#destroyItems
 * @function
 */


/**
 * Getter for aggregation <code>content</code>.<br/>
 * The contents displayed below the IconTabBar.
 * If there are multiple contents, they are rendered after each other. The developer has to manage to display the right one or use the content aggregation inside the IconTabFilter (which will be displayed instead if it is set).
 * 
 * @return {sap.ui.core.Control[]}
 * @public
 * @name sap.m.IconTabBar#getContent
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
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#insertContent
 * @function
 */

/**
 * Adds some content <code>oContent</code> 
 * to the aggregation named <code>content</code>.
 *
 * @param {sap.ui.core.Control}
 *            oContent the content to add; if empty, nothing is inserted
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#addContent
 * @function
 */

/**
 * Removes an content from the aggregation named <code>content</code>.
 *
 * @param {int | string | sap.ui.core.Control} vContent the content to remove or its index or id
 * @return {sap.ui.core.Control} the removed content or null
 * @public
 * @name sap.m.IconTabBar#removeContent
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>content</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Control[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.IconTabBar#removeAllContent
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
 * @name sap.m.IconTabBar#indexOfContent
 * @function
 */
	

/**
 * Destroys all the content in the aggregation 
 * named <code>content</code>.
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#destroyContent
 * @function
 */


/**
 * This event will be fired when an item is selected.
 *
 * @name sap.m.IconTabBar#select
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.m.IconTabFilter} oControlEvent.getParameters.item The selected item.
 * @param {string} oControlEvent.getParameters.key The key of the selected item.
 * @param {sap.m.IconTabFilter} oControlEvent.getParameters.selectedItem This parameter is deprecated since 1.15.0! Please use parameter "item" instead.
 * @param {string} oControlEvent.getParameters.selectedKey This parameter is deprecated since 1.15.0! Please use parameter "key" instead.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'select' event of this <code>sap.m.IconTabBar</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.IconTabBar</code>.<br/> itself. 
 *  
 * This event will be fired when an item is selected.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.IconTabBar</code>.<br/> itself.
 *
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#attachSelect
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'select' event of this <code>sap.m.IconTabBar</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.IconTabBar#detachSelect
 * @function
 */

/**
 * Fire event select to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'item' of type <code>sap.m.IconTabFilter</code> The selected item.</li>
 * <li>'key' of type <code>string</code> The key of the selected item.</li>
 * <li>'selectedItem' of type <code>sap.m.IconTabFilter</code> This parameter is deprecated since 1.15.0! Please use parameter "item" instead.</li>
 * <li>'selectedKey' of type <code>string</code> This parameter is deprecated since 1.15.0! Please use parameter "key" instead.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.IconTabBar#fireSelect
 * @function
 */


/**
 * Indicates that the tab will expand or collapse
 *
 * @name sap.m.IconTabBar#expand
 * @event
 * @since 1.15.0
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {boolean} oControlEvent.getParameters.expand If the tab will expand, this is true.
 * @param {boolean} oControlEvent.getParameters.collapse If the tab will collapse, this is true.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'expand' event of this <code>sap.m.IconTabBar</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.IconTabBar</code>.<br/> itself. 
 *  
 * Indicates that the tab will expand or collapse
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.IconTabBar</code>.<br/> itself.
 *
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#attachExpand
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'expand' event of this <code>sap.m.IconTabBar</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @public
 * @since 1.15.0
 * @name sap.m.IconTabBar#detachExpand
 * @function
 */

/**
 * Fire event expand to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'expand' of type <code>boolean</code> If the tab will expand, this is true.</li>
 * <li>'collapse' of type <code>boolean</code> If the tab will collapse, this is true.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.IconTabBar} <code>this</code> to allow method chaining
 * @protected
 * @since 1.15.0
 * @name sap.m.IconTabBar#fireExpand
 * @function
 */


// Start of sap\m\IconTabBar.js
/**
 * Sets the expanded flag and toggles the expand/collapse animation if the control is already rendered
 * @overwrite
 * @public
 * @param {boolean} bExpanded new parameter value
 * @return {sap.m.IconTabBar} this pointer for chaining
 */
sap.m.IconTabBar.prototype.setExpanded = function (bExpanded) {
	// set internal property
	this.setProperty("expanded", bExpanded, true);

	// toggle animation if control is already rendered
	if (this.$().length) {
		this._toggleExpandCollapse(bExpanded);
	}
	return this;
};

/**
 * Sets the expandable flag without rerendering
 * @overwrite
 * @public
 * @param {boolean} bExpandable new parameter value
 * @return {sap.m.IconTabBar} this pointer for chaining
 */
sap.m.IconTabBar.prototype.setExpandable = function (bExpandable) {
	// set internal property
	this.setProperty("expandable", bExpandable, true);
	return this;
};

/**
 * Rerenders only shown content of the IconTabBar.
 * @private
 * @param oContent content which should be rendered.
 */
sap.m.IconTabBar.prototype._rerenderContent = function(oContent) {
	var $content = this.$("content");
	if (oContent && ($content.length > 0)) {
		var rm = sap.ui.getCore().createRenderManager();
		for (var i = 0; i < oContent.length; i++) {
			rm.renderControl(oContent[i]);
		}
		rm.flush($content[0]);
		rm.destroy();
	}
};

/**
 * Opens and closes the content Container
 *
 * @param {boolean|undefined} bExpanded the new state of the container. If not specified, it will use the property expanded
 * @private
 * @return {sap.m.IconTabBar} this pointer for chaining
 */
sap.m.IconTabBar.prototype._toggleExpandCollapse = function(bExpanded) {
	var $content = this.$("content");

	// use inverted control state if not specified by parameter
	if (bExpanded === undefined) {
		bExpanded = !this.getExpanded();
	}
	
	// TODO: do this in header now
	// manage selection state
	if (this._getIconTabHeader().oSelectedItem) {
		this._getIconTabHeader().oSelectedItem.$().toggleClass("sapMITBSelected", bExpanded);
	}

	// show animation (keep track of active animations to avoid flickering of controls)
	this._iAnimationCounter = (this._iAnimationCounter === undefined ? 1 : ++this._iAnimationCounter);
	if (bExpanded) { // expanding
		if (this._getIconTabHeader().oSelectedItem) {
			if (this.$("content").children().length === 0) { //content is not rendered yet
				//if item has own content, this content is shown
				var oSelectedItemContent = this._getIconTabHeader().oSelectedItem.getContent();
				if (oSelectedItemContent.length > 0) {
					this._rerenderContent(oSelectedItemContent);
				//if item has not own content, general content of the icontabbar is shown
				} else {
					this._rerenderContent(this.getContent());
				}
			}
			$content.stop(true, true).slideDown('400', jQuery.proxy(this.onTransitionEnded, this, bExpanded));
			this.$("containerContent").toggleClass("sapMITBContentClosed", !bExpanded);
		}
	} else { // collapsing
		this.$("contentArrow").hide();
		$content.stop(true, true).slideUp('400', jQuery.proxy(this.onTransitionEnded, this, bExpanded));
	}

	// update property (if we have a selected item) and fire event
	if (!bExpanded || this._getIconTabHeader().oSelectedItem) {
		this.setProperty("expanded", bExpanded, true);
	}
	this.fireExpand({
		expand: bExpanded,
		collapse: !bExpanded
	});

	return this;
};

/**
 * Function is executed when the expand/collapse animation is finished to adjust the UI.
 *
 * @param {boolean} bExpanded the new state of the container. Passed in 
 * @private
 * @return {sap.m.IconTabBar} this pointer for chaining
 */
sap.m.IconTabBar.prototype.onTransitionEnded = function(bExpanded) {
	var $content = this.$("content"),
		$container = this.$("containerContent"),
		$arrow = this.$("contentArrow");

	// if multiple animations are triggered, this function is executed multiple times in the end, so we need to ignore all except the last call
	if (this._iAnimationCounter === 1) {
		$container.toggleClass("sapMITBContentClosed", !bExpanded);
		if (bExpanded) { // expanding
			$arrow.show();
			$content.css("display", "block");
		} else { // collapsing
			$arrow.hide();
			$content.css("display", "none");
		}
	}
	// reduce animation counter
	this._iAnimationCounter = (this._iAnimationCounter > 0 ? --this._iAnimationCounter : 0);
	return this;
};


/* =========================================================== */
/*           end: event handlers                               */
/* =========================================================== */

/**
 * lazy initializes the iconTabHeader aggregation
 */
sap.m.IconTabBar.prototype._getIconTabHeader = function () {
	var oControl = this.getAggregation("_header");

	if (!oControl) {
		oControl = new sap.m.IconTabHeader(this.getId() + "--header", {
		});
		this.setAggregation("_header", oControl, true);
	}
	return oControl;
};

/* =========================================================== */
/*           begin: reflectors for header properties           */
/* =========================================================== */

/**
 * Reflector for the internal header's showSelection property
 * @overwrite
 * @public
 * @param {boolean} bValue the new value
 * @returns {this} this pointer for chaining
 */
sap.m.IconTabBar.prototype.setShowSelection = function (bValue) {
	this._getIconTabHeader().setShowSelection(bValue);
	return this;
};

/**
 * Reflector for the internal header's showSelection property
 * @overwrite
 * @public
 * @returns {boolean} the current property value
 */
sap.m.IconTabBar.prototype.getShowSelection = function () {
	return this._getIconTabHeader().getShowSelection();
};

/**
 * Reflector for the internal header's selectedKey property
 * @overwrite
 * @public
 * @param {string} sValue the new value
 * @returns {this} this pointer for chaining
 */
sap.m.IconTabBar.prototype.setSelectedKey = function (sValue) {
	this._getIconTabHeader().setSelectedKey(sValue);
	return this;
};

/**
 * Reflector for the internal header's selectedKey property
 * @overwrite
 * @public
 * @returns {string} the current property value
 */
sap.m.IconTabBar.prototype.getSelectedKey = function () {
	return this._getIconTabHeader().getSelectedKey();
};

/**
 * Reflector for the internal header's selectedItem
 * Sets the selected item, updates the UI, and fires the select event
 * @overwrite
 * @private
 * @param {sap.m.IconTabFilter} oItem the item to be selected
 * @return {sap.m.IconTabHeader} this pointer for chaining
 */
sap.m.IconTabBar.prototype.setSelectedItem = function(oItem, bAPIchange) {
	return this._getIconTabHeader().setSelectedItem(oItem, bAPIchange);
};

/* =========================================================== */
/*           end: reflectors for header properties             */
/* =========================================================== */

/* =========================================================== */
/*           begin: forward aggregation  methods to header     */
/* =========================================================== */

/*
 * Forwards a function call to a managed object based on the aggregation name.
 * If the name is items, it will be forwarded to the list, otherwise called locally
 * @private
 * @param {string} sFunctionName the name of the function to be called
 * @param {string} sAggregationName the name of the aggregation asociated
 * @returns {mixed} the return type of the called function
 */
sap.m.IconTabBar.prototype._callMethodInManagedObject = function (sFunctionName, sAggregationName) {
	var aArgs = Array.prototype.slice.call(arguments),
		oHeader;

	if (sAggregationName === "items") {
		// apply to the internal header control
		oHeader = this._getIconTabHeader();
		return oHeader[sFunctionName].apply(oHeader, aArgs.slice(1));
	} else {
		// apply to this control
		return sap.ui.base.ManagedObject.prototype[sFunctionName].apply(this, aArgs.slice(1));
	}
};

/**
 * Forwards aggregations with the name of items to the internal list.
 * @overwrite
 * @public
 * @param {string} sAggregationName the name for the binding
 * @param {object} oBindingInfo the configuration parameters for the binding
 * @returns {this} this pointer for chaining
 */
sap.m.IconTabBar.prototype.bindAggregation = function () {
	var args = Array.prototype.slice.call(arguments);

	// propagate the bind aggregation function to list
	this._callMethodInManagedObject.apply(this, ["bindAggregation"].concat(args));
	return this;
};

sap.m.IconTabBar.prototype.validateAggregation = function (sAggregationName, oObject, bMultiple) {
	return this._callMethodInManagedObject("validateAggregation", sAggregationName, oObject, bMultiple);
};

sap.m.IconTabBar.prototype.setAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("setAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.IconTabBar.prototype.getAggregation = function (sAggregationName, oDefaultForCreation) {
	return this._callMethodInManagedObject("getAggregation", sAggregationName, oDefaultForCreation);
};

sap.m.IconTabBar.prototype.indexOfAggregation = function (sAggregationName, oObject) {
	return this._callMethodInManagedObject("indexOfAggregation", sAggregationName, oObject);
};

sap.m.IconTabBar.prototype.insertAggregation = function (sAggregationName, oObject, iIndex, bSuppressInvalidate) {
	this._callMethodInManagedObject("insertAggregation", sAggregationName, oObject, iIndex, bSuppressInvalidate);
	return this;
};

sap.m.IconTabBar.prototype.addAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("addAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.IconTabBar.prototype.removeAggregation = function (sAggregationName, oObject, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAggregation", sAggregationName, oObject, bSuppressInvalidate);
};

sap.m.IconTabBar.prototype.removeAllAggregation = function (sAggregationName, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAllAggregation", sAggregationName, bSuppressInvalidate);
};

sap.m.IconTabBar.prototype.destroyAggregation = function (sAggregationName, bSuppressInvalidate) {
	this._callMethodInManagedObject("destroyAggregation", sAggregationName, bSuppressInvalidate);
	return this;
};

sap.m.IconTabBar.prototype.getBinding = function (sAggregationName) {
	return this._callMethodInManagedObject("getBinding", sAggregationName);
};


sap.m.IconTabBar.prototype.getBindingInfo = function (sAggregationName) {
	return this._callMethodInManagedObject("getBindingInfo", sAggregationName);
};

sap.m.IconTabBar.prototype.getBindingPath = function (sAggregationName) {
	return this._callMethodInManagedObject("getBindingPath", sAggregationName);
};

/* =========================================================== */
/*           end: forward aggregation  methods to header       */
/* =========================================================== */