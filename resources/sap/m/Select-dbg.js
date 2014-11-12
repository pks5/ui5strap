/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Select.
jQuery.sap.declare("sap.m.Select");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Select.
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
 * <li>{@link #getName name} : string</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getEnabled enabled} : boolean (default: true)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: 'auto')</li>
 * <li>{@link #getMaxWidth maxWidth} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getSelectedKey selectedKey} : string</li>
 * <li>{@link #getSelectedItemId selectedItemId} : string</li>
 * <li>{@link #getIcon icon} : sap.ui.core.URI</li>
 * <li>{@link #getType type} : sap.m.SelectType (default: sap.m.SelectType.Default)</li>
 * <li>{@link #getAutoAdjustWidth autoAdjustWidth} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} <strong>(default aggregation)</strong> : sap.ui.core.Item[]</li></ul>
 * </li>
 * <li>Associations
 * <ul>
 * <li>{@link #getSelectedItem selectedItem} : string | sap.ui.core.Item</li></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.Select#event:change change} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The select control provides a menu of predefined items that allows users to select an item.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.Select
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.Select", { metadata : {

	publicMethods : [
		// methods
		"isOpen", "close", "getItemByKey", "getFirstItem", "getLastItem", "getItemAt", "getEnabledItems"
	],
	library : "sap.m",
	properties : {
		"name" : {type : "string", group : "Misc", defaultValue : null},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : 'auto'},
		"maxWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'},
		"selectedKey" : {type : "string", group : "Data", defaultValue : null},
		"selectedItemId" : {type : "string", group : "Misc", defaultValue : null},
		"icon" : {type : "sap.ui.core.URI", group : "Appearance", defaultValue : null},
		"type" : {type : "sap.m.SelectType", group : "Appearance", defaultValue : sap.m.SelectType.Default},
		"autoAdjustWidth" : {type : "boolean", group : "Appearance", defaultValue : false}
	},
	defaultAggregation : "items",
	aggregations : {
		"items" : {type : "sap.ui.core.Item", multiple : true, singularName : "item", bindable : "bindable"}, 
		"picker" : {type : "sap.ui.core.Control", multiple : false, visibility : "hidden"}
	},
	associations : {
		"selectedItem" : {type : "sap.ui.core.Item", multiple : false}
	},
	events : {
		"change" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.Select with name <code>sClassName</code> 
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
 * @name sap.m.Select.extend
 * @function
 */

sap.m.Select.M_EVENTS = {'change':'change'};


/**
 * Getter for property <code>name</code>.
 * The name to be used in the HTML code (e.g. for HTML forms that send data to the server via submit).
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>name</code>
 * @public
 * @name sap.m.Select#getName
 * @function
 */

/**
 * Setter for property <code>name</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sName  new value for property <code>name</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#setName
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Determines whether the control is visible or not.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.Select#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#setVisible
 * @function
 */


/**
 * Getter for property <code>enabled</code>.
 * Determines whether the user can change the selected value.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.m.Select#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#setEnabled
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Defines the width of the select input. The default width of a select control depends on the width of the widest option/item in the list. This value can be provided in %, em, px… and all CSS units.
 * Note: The width will be ignored if the "autoAdjustWidth" property is set to true.
 *
 * Default value is <code>auto</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.Select#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>auto</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#setWidth
 * @function
 */


/**
 * Getter for property <code>maxWidth</code>.
 * Defines the maximum width. This value can be provided in %, em, px… and all CSS units
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>maxWidth</code>
 * @public
 * @name sap.m.Select#getMaxWidth
 * @function
 */

/**
 * Setter for property <code>maxWidth</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sMaxWidth  new value for property <code>maxWidth</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#setMaxWidth
 * @function
 */


/**
 * Getter for property <code>selectedKey</code>.
 * Key of the selected item. If the key has no corresponding aggregated item, no changes will apply. If duplicate keys exists the first item matching the key is used.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>selectedKey</code>
 * @public
 * @since 1.11
 * @name sap.m.Select#getSelectedKey
 * @function
 */

/**
 * Setter for property <code>selectedKey</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sSelectedKey  new value for property <code>selectedKey</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @since 1.11
 * @name sap.m.Select#setSelectedKey
 * @function
 */


/**
 * Getter for property <code>selectedItemId</code>.
 * Id of the selected item. If the id has no corresponding aggregated item, no changes will apply.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>selectedItemId</code>
 * @public
 * @since 1.12
 * @name sap.m.Select#getSelectedItemId
 * @function
 */

/**
 * Setter for property <code>selectedItemId</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sSelectedItemId  new value for property <code>selectedItemId</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @since 1.12
 * @name sap.m.Select#setSelectedItemId
 * @function
 */


/**
 * Getter for property <code>icon</code>.
 * The URI to the icon that will be displayed only when using the “IconOnly” type.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>icon</code>
 * @public
 * @since 1.16
 * @name sap.m.Select#getIcon
 * @function
 */

/**
 * Setter for property <code>icon</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sIcon  new value for property <code>icon</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Select#setIcon
 * @function
 */


/**
 * Getter for property <code>type</code>.
 * Type of a select. Possibles values "Default", "IconOnly".
 *
 * Default value is <code>Default</code>
 *
 * @return {sap.m.SelectType} the value of property <code>type</code>
 * @public
 * @since 1.16
 * @name sap.m.Select#getType
 * @function
 */

/**
 * Setter for property <code>type</code>.
 *
 * Default value is <code>Default</code> 
 *
 * @param {sap.m.SelectType} oType  new value for property <code>type</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Select#setType
 * @function
 */


/**
 * Getter for property <code>autoAdjustWidth</code>.
 * If set to true, the width of the select input is determined by the selected item’s content.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>autoAdjustWidth</code>
 * @public
 * @since 1.16
 * @name sap.m.Select#getAutoAdjustWidth
 * @function
 */

/**
 * Setter for property <code>autoAdjustWidth</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bAutoAdjustWidth  new value for property <code>autoAdjustWidth</code>
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Select#setAutoAdjustWidth
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * Items of the Item control.
 * 
 * <strong>Note</strong>: this is the default aggregation for Select.
 * @return {sap.ui.core.Item[]}
 * @public
 * @name sap.m.Select#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.core.Item} vItem the item to remove or its index or id
 * @return {sap.ui.core.Item} the removed item or null
 * @public
 * @name sap.m.Select#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Item[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Select#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Item</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Item}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Select#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#destroyItems
 * @function
 */


/**
 * Binder for aggregation <code>items</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#bindItems
 * @function
 */

/**
 * Unbinder for aggregation <code>items</code>.
 *
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#unbindItems
 * @function
 */


/**
 * Retrieves the selected item from the aggregation named <code>items</code>.
 *
 * @return {string} Id of the element which is the current target of the <code>selectedItem</code> association, or null
 * @public
 * @name sap.m.Select#getSelectedItem
 * @function
 */

/**
 * Retrieves the selected item from the aggregation named <code>items</code>.
 *
 * @param {string | sap.ui.core.Item} vSelectedItem 
 *    Id of an element which becomes the new target of this <code>selectedItem</code> association.
 *    Alternatively, an element instance may be given.
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#setSelectedItem
 * @function
 */


	
/**
 * Occurs when the user changes the selected item.
 *
 * @name sap.m.Select#change
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.core.Item} oControlEvent.getParameters.selectedItem The selected item.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'change' event of this <code>sap.m.Select</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Select</code>.<br/> itself. 
 *  
 * Occurs when the user changes the selected item.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Select</code>.<br/> itself.
 *
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#attachChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'change' event of this <code>sap.m.Select</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Select#detachChange
 * @function
 */

/**
 * Fire event change to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItem' of type <code>sap.ui.core.Item</code> The selected item.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Select} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Select#fireChange
 * @function
 */


/**
 * Whether the control's Pop-up is open. It returns true when the control's Pop-up is currently open, this includes opening and closing animations, otherwise it returns false.
 *
 * @name sap.m.Select#isOpen
 * @function
 * @type boolean
 * @public
 * @since 1.16
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Closes the Control's Pop-up.
 *
 * @name sap.m.Select#close
 * @function
 * @type sap.m.Select
 * @public
 * @since 1.16
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Retrieves the item with the given key from the aggregation named items.
 * If duplicate keys exists the first item matching the key is returned.
 *
 * @name sap.m.Select#getItemByKey
 * @function
 * @param {string} sKey
 *         An item key that identifies the item to retrieve.
 * @type sap.ui.core.Item
 * @public
 * @since 1.16
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Retrieves the first item from the aggregation named items.
 *
 * @name sap.m.Select#getFirstItem
 * @function
 * @type sap.ui.core.Item
 * @public
 * @since 1.16
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Retrieves the last item from the aggregation named items.
 *
 * @name sap.m.Select#getLastItem
 * @function
 * @type sap.ui.core.Item
 * @public
 * @since 1.16
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Retrieves the item from the aggregation named items at the given 0-based index.
 *
 * @name sap.m.Select#getItemAt
 * @function
 * @param {int} iIndex
 *         Index of the item to return.
 * @type sap.ui.core.Item
 * @public
 * @since 1.16
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Retrieves the enabled items from the aggregation named items.
 *
 * @name sap.m.Select#getEnabledItems
 * @function
 * @type sap.ui.core.Item[]
 * @public
 * @since 1.22.0
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


// Start of sap\m\Select.js
jQuery.sap.require("sap.ui.core.EnabledPropagator");
jQuery.sap.require("sap.m.SelectRenderer");
jQuery.sap.require("sap.m.InputBase");
jQuery.sap.require("sap.m.Bar");
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.Popover");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.core.IconPool.insertFontFaceStyle();
sap.ui.core.EnabledPropagator.apply(sap.m.Select.prototype, [true]);

/* =========================================================== */
/* Private methods and properties                              */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* Private methods                                             */
/* ----------------------------------------------------------- */

/**
 * Retrieves the first enabled item from the aggregation named <code>items</code>.
 *
 * @param {array} [aItems]
 * @returns {sap.ui.core.Item | null}
 * @private
 * @name sap.m.Select#findFirstEnabledItem
 * @function
 */
sap.m.Select.prototype.findFirstEnabledItem = function(aItems) {
	aItems = aItems || this.getItems();

	for (var i = 0; i < aItems.length; i++) {
		if (aItems[i].getEnabled()) {
			return aItems[i];
		}
	}

	return null;
};

/**
 * Retrieves the last enabled item from the aggregation named <code>items</code>.
 *
 * @param {array} [aItems]
 * @returns {sap.ui.core.Item | null}
 * @private
 * @name sap.m.Select#findLastEnabledItem
 * @function
 */
sap.m.Select.prototype.findLastEnabledItem = function(aItems) {
	aItems = aItems || this.getItems();
	return this.findFirstEnabledItem(aItems.reverse());
};

/**
 * Sets the selected item by its index.
 *
 * @param {int} iIndex
 * @private
 * @name sap.m.Select#setSelectedIndex
 * @function
 */
sap.m.Select.prototype.setSelectedIndex = function(iIndex, _aItems /* only for internal usage */) {
	var oItem;
	_aItems = _aItems || this.getItems();

	// constrain the new index
	iIndex = (iIndex > _aItems.length - 1) ? _aItems.length - 1 : Math.max(0, iIndex);

	oItem = _aItems[iIndex];

	if (oItem) {

		this.setSelection(oItem, { suppressInvalidate: true });
	}
};

/**
 * Get the selected item in the List.
 *
 * @returns {sap.m.StandardListItem}
 * @private
 * @name sap.m.Select#_getSelectedListItem
 * @function
 */
sap.m.Select.prototype._getSelectedListItem = function() {
	var oItem = this.getSelectedItem();
	return (oItem && oItem.data(sap.m.SelectRenderer.CSS_CLASS + "ListItem")) || null;
};

/**
 * Scrolls an item into the visual viewport.
 *
 * @private
 * @name sap.m.Select#scrollToItem
 * @function
 */
sap.m.Select.prototype.scrollToItem = function(oListItem) {
	var oPicker = this.getPicker(),
		oPickerDomRef = oPicker.getDomRef("cont"),
		oListItemDomRef = oListItem && oListItem.getDomRef();

	if (!oPicker || !oPickerDomRef || !oListItemDomRef) {
		return;
	}

	var iPickerScrollTop = oPickerDomRef.scrollTop,
		iListItemOffsetTop = oListItemDomRef.offsetTop,
		iPickerHeight = jQuery(oPickerDomRef).height(),
		iListItemHeight = jQuery(oListItemDomRef).height();

	if (iPickerScrollTop > iListItemOffsetTop) {

		// scroll up
		oPickerDomRef.scrollTop = iListItemOffsetTop;

	// bottom edge of item > bottom edge of viewport
	} else if ((iListItemOffsetTop + iListItemHeight) > (iPickerScrollTop + iPickerHeight)) {

		// scroll down, the item is partly below the viewport of the List
		oPickerDomRef.scrollTop = Math.ceil(iListItemOffsetTop + iListItemHeight - iPickerHeight);
	}
};

/**
 * Sets the text value of the Select field.
 *
 * @param {string} sValue
 * @private
 * @name sap.m.Select#setValue
 * @function
 */
sap.m.Select.prototype.setValue = function(sValue) {
	var $Label = this.$().children("." + sap.m.SelectRenderer.CSS_CLASS + "Label");

	if ($Label && $Label.length) {
		$Label.text(sValue);
	}
};

/**
 * Map an item type of sap.ui.core.Item to an item type of sap.m.StandardListItem.
 *
 * @param {sap.ui.core.Item} oItem
 * @returns {sap.m.StandardListItem | null}
 * @private
 * @name sap.m.Select#_mapItemToListItem
 * @function
 */
sap.m.Select.prototype._mapItemToListItem = function(oItem) {

	if (!oItem) {
		return null;
	}

	var CSS_CLASS = sap.m.SelectRenderer.CSS_CLASS,
		sListItem = CSS_CLASS + "Item",
		sListItemEnabled = oItem.getEnabled() ? "Enabled" : "Disabled",
		sListItemSelected = (oItem === this.getSelectedItem()) ? sListItem + "Selected" : "";

	var oListItem = new sap.m.StandardListItem().addStyleClass(sListItem + " " + sListItem + sListItemEnabled + " " + sListItemSelected);
	oListItem.setTitle(oItem.getText());
	oListItem.setType(oItem.getEnabled() ? sap.m.ListType.Active : sap.m.ListType.Inactive);
	oListItem.setTooltip(oItem.getTooltip());
	oItem.data(CSS_CLASS + "ListItem", oListItem);

	return oListItem;
};

/**
 * Given a item type of sap.m.StandardListItem, find the corresponding item type of sap.ui.core.Item.
 *
 * @param {sap.m.StandardListItem} oListItem
 * @param {array} [aItems]
 * @returns {sap.ui.core.Item | null}
 * @private
 * @name sap.m.Select#_findMappedItem
 * @function
 */
sap.m.Select.prototype._findMappedItem = function(oListItem, aItems) {
	for (var i = 0, aItems = aItems || this.getItems(), aItemsLength = aItems.length; i < aItemsLength; i++) {
		if (aItems[i].data(sap.m.SelectRenderer.CSS_CLASS + "ListItem") === oListItem) {
			return aItems[i];
		}
	}

	return null;
};

/**
 * Fill the list of items.
 *
 * @param {array} aItems An array with items type of sap.ui.core.Item.
 * @private
 * @name sap.m.Select#_fillList
 * @function
 */
sap.m.Select.prototype._fillList = function(aItems) {
	var oSelectedItem = this.getSelectedItem();

	for (var i = 0, oListItem, oItem; i < aItems.length; i++) {
		oItem = aItems[i];

		// add a private property to the added item containing a reference
		// to the corresponding mapped item
		oListItem = this._mapItemToListItem(oItem);

		// add the mapped item type of sap.m.StandardListItem to the List
		this.getList().addAggregation("items", oListItem, true);	// note: suppress re-rendering

		// add active state to the selected item
		if (oItem === oSelectedItem) {
			this.getList().setSelectedItem(oListItem, true);
		}
	}
};

/**
 * Destroy the items in the List.
 *
 * @private
 * @name sap.m.Select#_clearList
 * @function
 */
sap.m.Select.prototype._clearList = function() {
	if (this.getList()) {
		this.getList().destroyAggregation("items", true);	// note: suppress re-rendering
	}
};

/**
 * Whether the native HTML Select Element is required.
 *
 * @returns {boolean}
 * @private
 * @name sap.m.Select#_isRequiredSelectElement
 * @function
 */
sap.m.Select.prototype._isRequiredSelectElement = function() {
	if (this.getAutoAdjustWidth()) {
		return false;
	} else if (this.getWidth() === "auto") {
		return true;
	}
};

/**
 * Retrieves the first item from the aggregation named <code>items</code>
 * whose first character match with the given <code>sChar</code>.
 *
 * @param {string} sChar
 * @returns {sap.ui.core.Item | undefined}
 * @private
 * @name sap.m.Select#_findItemByFirstCharacter
 * @function
 */
sap.m.Select.prototype._findItemByFirstCharacter = function(sChar) {
	for (var i = 0, aItems = this.getItems(); i < aItems.length; i++) {
		if (aItems[i].getText().charAt(0).toUpperCase() === sChar.toUpperCase()) {
			return aItems[i];
		}
	}
};

/**
 * Called, whenever the binding of the aggregation items is changed.
 * This method deletes all items in this aggregation and recreates them
 * according to the data model.
 *
 * @private
 * @name sap.m.Select#updateItems
 * @function
 */
sap.m.Select.prototype.updateItems = function(sReason) {
	this._bDataAvailable = false;
	this.updateAggregation("items");
	this._bDataAvailable = true;
};

/**
 * Called, when the items aggregation needs to be refreshed.
 * This method does not make any change on the aggregation, but just calls the
 * getContexts() method to trigger fetching of new data.
 *
 * note: This method has been overwritten to prevent .updateItems()
 * from being called when the bindings are refreshed.
 * @see sap.ui.base.ManagedObject#bindAggregation
 *
 * @private
 * @name sap.m.Select#refreshItems
 * @function
 */
sap.m.Select.prototype.refreshItems = function() {
	this.refreshAggregation("items");
};

/**
 * Getter for the Select's List.
 *
 * @returns {sap.m.List}
 * @private
 * @since 1.22.0
 * @name sap.m.Select#getList
 * @function
 */
sap.m.Select.prototype.getList = function() {
	return this._oList;
};

/* ----------------------------------------------------------- */
/* Picker                                                      */
/* ----------------------------------------------------------- */

/**
 * This event handler will be called before the Select Picker is opened.
 *
 * @private
 * @name sap.m.Select#onBeforeOpen
 * @function
 */
sap.m.Select.prototype.onBeforeOpen = function() {
	var fnPickerTypeBeforeOpen = this["_onBeforeOpen" + this.getPickerType()];

	// add the active state to the Select's field
	this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS + "Pressed");

	// call the hook to add additional content to the List
	this.addContent();

	fnPickerTypeBeforeOpen && fnPickerTypeBeforeOpen.call(this);
};

/**
 * This event handler will be called after the control's picker pop-up is opened.
 *
 * @private
 * @name sap.m.Select#onAfterOpen
 * @function
 */
sap.m.Select.prototype.onAfterOpen = function() {};

/**
 * This event handler will be called before the picker pop-up is closed.
 *
 * @private
 * @name sap.m.Select#onBeforeClose
 * @function
 */
sap.m.Select.prototype.onBeforeClose = function() {

	// remove the active state of the Select's field
	this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS + "Pressed");
};

/**
 * This event handler will be called after the picker pop-up is closed.
 *
 * @private
 * @name sap.m.Select#onAfterClose
 * @function
 */
sap.m.Select.prototype.onAfterClose = function() {};

/**
 * Getter for the control's picker pop-up.
 *
 * @returns {sap.m.Dialog | sap.m.Popover | null} The picker, creating it if necessary by calling <code>createPicker()</code> method.
 * @private
 * @name sap.m.Select#getPicker
 * @function
 */
sap.m.Select.prototype.getPicker = function() {
	if (this.bIsDestroyed) {
		return null;
	}

	// initialize the control's picker
	return this.createPicker(this.getPickerType());
};

/**
 * Setter for property <code>_sPickerType</code>.
 *
 * @private
 * @name sap.m.Select#setPickerType
 * @function
 */
sap.m.Select.prototype.setPickerType = function(sPickerType) {
	this._sPickerType = sPickerType;
};

/**
 * Getter for property <code>_sPickerType</code>
 *
 * @returns {string}
 * @private
 * @name sap.m.Select#getPickerType
 * @function
 */
sap.m.Select.prototype.getPickerType = function() {
	return this._sPickerType;
};

/* ----------------------------------------------------------- */
/* Popover                                                     */
/* ----------------------------------------------------------- */

/**
 * Creates an instance type of <code>sap.m.Popover</code>.
 *
 * @returns {sap.m.Popover}
 * @private
 * @name sap.m.Select#_createPopover
 * @function
 */
sap.m.Select.prototype._createPopover = function() {

	// initialize Popover
	var oPicker = new sap.m.Popover({
		showHeader: false,
		placement: sap.m.PlacementType.Vertical,
		offsetX: 0,
		offsetY: 0,
		initialFocus: this,
		bounce: false
	});

	this._decoratePopover(oPicker);
	return oPicker;
};

/**
 * Decorate a Popover instance by adding some private methods.
 *
 * @param {sap.m.Popover}
 * @private
 * @name sap.m.Select#_decoratePopover
 * @function
 */
sap.m.Select.prototype._decoratePopover = function(oPopover) {
	var self = this;

	// adding additional capabilities to the Popover
	oPopover._removeArrow = function() {
		this._marginTop = 0;
		this._marginLeft = 0;
		this._marginRight = 0;
		this._marginBottom = 0;
		this._arrowOffset = 0;
		this._offsets = ["0 0", "0 0", "0 0", "0 0"];
	};

	oPopover._setPosition = function() {
		this._myPositions = ["begin bottom", "begin center", "begin top", "end center"];
		this._atPositions = ["begin top", "end center", "begin bottom", "begin center"];
	};

	oPopover._setArrowPosition = function() {};

	oPopover._setMinWidth = function(sWidth) {
		this.getDomRef().style.minWidth = sWidth;
	};

	oPopover._setWidth = function(sWidth) {
		var bAutoAdjustWidth = self.getAutoAdjustWidth(),
			bIconOnly = self.getType() === "IconOnly",
			oPickerContentDomRef;

		// set the width of the content
		if (sap.ui.Device.system.desktop || sap.ui.Device.system.tablet) {

			oPickerContentDomRef = this.getContent()[0];

			if (bAutoAdjustWidth) {
				oPickerContentDomRef.setWidth("auto");
				oPickerContentDomRef.getDomRef().style.minWidth = sWidth;
			} else {
				oPickerContentDomRef.setWidth(sWidth);
			}
		}

		if (!bIconOnly) {

			// set the width of the popover
			this.getDomRef().style.minWidth = sWidth;
		}
	};

	oPopover.open = function() {
		return this.openBy(self);
	};
};

/**
 * Required adaptations after rendering of the Popover.
 *
 * @private
 * @name sap.m.Select#_onAfterRenderingPopover
 * @function
 */
sap.m.Select.prototype._onAfterRenderingPopover = function() {
	var oPopover = this.getPicker(),
		sWidth = (this.$().outerWidth() / parseFloat(sap.m.BaseFontSize)) + "rem";

	// remove the Popover arrow
	oPopover._removeArrow();

	// position adaptations
	oPopover._setPosition();

	// width adaptations
	if (sap.ui.Device.system.phone) {
		oPopover._setMinWidth("100%");
	} else {
		oPopover._setWidth(sWidth);
	}
};

/* ----------------------------------------------------------- */
/* Dialog                                                      */
/* ----------------------------------------------------------- */

/**
 * Creates an instance type of <code>sap.m.Dialog</code>.
 *
 * @returns {sap.m.Dialog}
 * @private
 * @name sap.m.Select#_createDialog
 * @function
 */
sap.m.Select.prototype._createDialog = function() {
	var CSS_CLASS = sap.m.SelectRenderer.CSS_CLASS;

	// initialize Dialog
	var oDialog = new sap.m.Dialog({
		stretchOnPhone: true,
		customHeader: new sap.m.Bar({
			contentLeft: new sap.m.InputBase({
				width: "100%",
				editable: false
			}).addStyleClass(CSS_CLASS + "Input")
		}).addStyleClass(CSS_CLASS + "Bar")
	});

	oDialog.getAggregation("customHeader").attachBrowserEvent("tap", function() {
		oDialog.close();
	}, this);

	return oDialog;
};

/**
 * Called before the Dialog is opened.
 *
 * @private
 * @name sap.m.Select#_onBeforeOpenDialog
 * @function
 */
sap.m.Select.prototype._onBeforeOpenDialog = function() {
	var oHeader = this.getPicker().getCustomHeader();
	oHeader.getContentLeft()[0].setValue(this.getSelectedItem().getText());
};

/* =========================================================== */
/* Lifecycle methods                                           */
/* =========================================================== */

/**
 * Initialization hook for the Select.
 *
 * @private
 * @name sap.m.Select#init
 * @function
 */
sap.m.Select.prototype.init = function() {

	// initialize list
	this.createList();
};

/**
 * Required adaptations before rendering.
 *
 * @private
 * @name sap.m.Select#onBeforeRendering
 * @function
 */
sap.m.Select.prototype.onBeforeRendering = function() {
	var aItems = this.getItems();

	this.synchronizeSelection();
	this._clearList();
	this._fillList(aItems);
};

/**
 * Required adaptations after rendering.
 *
 * @private
 * @name sap.m.Select#onAfterRendering
 * @function
 */
sap.m.Select.prototype.onAfterRendering = function() {

	// whether the Select has a Bar as parent
	var bHasParentBar = !!this.$().closest(".sapMBar-CTX").length;

	// set the picker type
	this.setPickerType(sap.ui.Device.system.phone && !bHasParentBar ? "Dialog" : "Popover");
};

/**
 * Cleans up before destruction.
 *
 * @private
 * @name sap.m.Select#exit
 * @function
 */
sap.m.Select.prototype.exit = function() {

	if (this.getList()) {
		this.getList().destroy();
		this._oList = null;
	}
};

/* =========================================================== */
/* Event handlers                                              */
/* =========================================================== */

/**
 * Handle the touch start event on the Select.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#ontouchstart
 * @function
 */
sap.m.Select.prototype.ontouchstart = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	if (this.getEnabled() && this.isOpenArea(oEvent.target)) {

		// add the active state to the Select's field
		this.addStyleClass(sap.m.SelectRenderer.CSS_CLASS + "Pressed");
	}
};

/**
 * Handle the touch end event on the Select.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#ontouchend
 * @function
 */
sap.m.Select.prototype.ontouchend = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	if (this.getEnabled() && (!this.isOpen() || !this.hasContent()) && this.isOpenArea(oEvent.target)) {

		// remove the active state of the Select HTMLDIVElement container
		this.removeStyleClass(sap.m.SelectRenderer.CSS_CLASS + "Pressed");
	}
};

/**
 * Handle the tap event on the Select.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#ontap
 * @function
 */
sap.m.Select.prototype.ontap = function(oEvent) {
	var CSS_CLASS = sap.m.SelectRenderer.CSS_CLASS;

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	if (!this.getEnabled()) {
		return;
	}

	if (this.isOpenArea(oEvent.target)) {

		if (this.isOpen()) {
			this.close();
			this.removeStyleClass(CSS_CLASS + "Pressed");
			return;
		}

		if (this.hasContent()) {
			this.open();
		}
	}

	if (this.isOpen()) {

		// add the active state to the Select's field
		this.addStyleClass(CSS_CLASS + "Pressed");
	}
};

/**
 * Handle the selection change event on the List.
 *
 * @param {sap.ui.base.Event} oControlEvent
 * @private
 * @name sap.m.Select#onSelectionChange
 * @function
 */
sap.m.Select.prototype.onSelectionChange = function(oControlEvent) {
	var oListItem = oControlEvent.getParameter("listItem"),
		oNewSelectedItem = this._findMappedItem(oListItem);

	if ((oListItem.getType() === "Inactive") ||	// workaround: this is needed because the List fires the "selectionChange" event on inactive items

		// a disabled Select, the selection cannot be modified
		!this.getEnabled()) {

		return;
	}

	// pre-assertion
	jQuery.sap.assert(oNewSelectedItem, "The corresponding mapped item was not found on " + this);

	this.close();

	if (oNewSelectedItem) {

		// update the selected item
		this.setSelection(oNewSelectedItem, {
			suppressInvalidate: true,
			listItemUpdated: true
		});

		this.fireChange({ selectedItem: this.getSelectedItem() });

		// update the label text
		// note: if, due to invalid databinding, the selectedKey cannot be changed and is reset to null,
		// oNewSelectedItem does not match getSelectedItem() and a wrong text is displayed in the Select field
		oNewSelectedItem = this.getSelectedItem();
		this.setValue(oNewSelectedItem ? oNewSelectedItem.getText() : ((oNewSelectedItem = this.getDefaultSelectedItem()) ? oNewSelectedItem.getText() : ""));
	}
};

/* ----------------------------------------------------------- */
/* Keyboard handling                                           */
/* ----------------------------------------------------------- */

/**
 * Handle the keypress event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onkeypress
 * @function
 */
sap.m.Select.prototype.onkeypress = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	if (!this.getEnabled()) {
		return;
	}

	var oItem = this._findItemByFirstCharacter(String.fromCharCode(oEvent.which));	// jQuery oEvent.which normalizes oEvent.keyCode and oEvent.charCode

	if (oItem) {

		this.setSelection(oItem, { suppressInvalidate: true });
		this.fireChange({ selectedItem: this.getSelectedItem() });
		this.setValue(oItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when F4 or Alt + DOWN arrow are pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapshow
 * @function
 */
sap.m.Select.prototype.onsapshow = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent browser address bar to be open in ie9, when F4 is pressed
	if (oEvent.keyCode === jQuery.sap.KeyCodes.F4) {
		oEvent.preventDefault();
	}

	if (this.isOpen()) {
		this.close();
		return;
	}

	if (this.hasContent()) {
		this.open();
	}
};

/**
 * Handle when Alt + UP arrow are pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsaphide
 * @function
 */
sap.m.Select.prototype.onsaphide = sap.m.Select.prototype.onsapshow;

/**
 * Handle when escape is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapescape
 * @function
 */
sap.m.Select.prototype.onsapescape = function(oEvent) {

	if (this.isOpen()) {

		// mark the event for components that needs to know if the event was handled
		oEvent.setMarked();

		this.close();
	}
};

/**
 * Handle when enter is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapenter
 * @function
 */
sap.m.Select.prototype.onsapenter = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	this.close();
};

/**
 * Handle when keyboard DOWN arrow is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapdown
 * @function
 */
sap.m.Select.prototype.onsapdown = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when arrow keys are pressed
	oEvent.preventDefault();

	var oNextSelectableItem,
		aSelectableItems = this.getSelectableItems();

	oNextSelectableItem = aSelectableItems[aSelectableItems.indexOf(this.getSelectedItem()) + 1];

	if (oNextSelectableItem) {

		this.setSelection(oNextSelectableItem, { suppressInvalidate: true });
		this.fireChange({ selectedItem: this.getSelectedItem() });
		this.setValue(oNextSelectableItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when keyboard UP arrow is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapup
 * @function
 */
sap.m.Select.prototype.onsapup = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when arrow keys are pressed
	oEvent.preventDefault();

	var oPrevSelectableItem,
		aSelectableItems = this.getSelectableItems();

	oPrevSelectableItem = aSelectableItems[aSelectableItems.indexOf(this.getSelectedItem()) - 1];

	if (oPrevSelectableItem) {

		this.setSelection(oPrevSelectableItem, { suppressInvalidate: true });
		this.fireChange({ selectedItem: this.getSelectedItem() });
		this.setValue(oPrevSelectableItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle Home key pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsaphome
 * @function
 */
sap.m.Select.prototype.onsaphome = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when Home key is pressed
	oEvent.preventDefault();

	var oFirstSelectableItem = this.getSelectableItems()[0];

	if (oFirstSelectableItem && (oFirstSelectableItem !== this.getSelectedItem())) {

		this.setSelection(oFirstSelectableItem, { suppressInvalidate: true });
		this.fireChange({ selectedItem: this.getSelectedItem() });
		this.setValue(oFirstSelectableItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle End key pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapend
 * @function
 */
sap.m.Select.prototype.onsapend = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when End key is pressed
	oEvent.preventDefault();

	var oLastSelectableItem = this.findLastEnabledItem(this.getSelectableItems());

	if (oLastSelectableItem && (oLastSelectableItem !== this.getSelectedItem())) {

		this.setSelection(oLastSelectableItem, { suppressInvalidate: true });
		this.fireChange({ selectedItem: this.getSelectedItem() });
		this.setValue(oLastSelectableItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when page down key is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsappagedown
 * @function
 */
sap.m.Select.prototype.onsappagedown = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when page down key is pressed
	oEvent.preventDefault();

	var aSelectableItems = this.getSelectableItems(),
		oSelectedItem = this.getSelectedItem();

	this.setSelectedIndex(aSelectableItems.indexOf(oSelectedItem) + 20, aSelectableItems);

	if (oSelectedItem !== this.getSelectedItem()) {
		this.fireChange({ selectedItem: this.getSelectedItem() });
	}

	oSelectedItem = this.getSelectedItem();

	if (oSelectedItem) {
		this.setValue(oSelectedItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when page up key is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsappageup
 * @function
 */
sap.m.Select.prototype.onsappageup = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when page up key is pressed
	oEvent.preventDefault();

	var aSelectableItems = this.getSelectableItems(),
		oSelectedItem = this.getSelectedItem();

	this.setSelectedIndex(aSelectableItems.indexOf(oSelectedItem) - 20, aSelectableItems);

	if (oSelectedItem !== this.getSelectedItem()) {
		this.fireChange({ selectedItem: this.getSelectedItem() });
	}

	oSelectedItem = this.getSelectedItem();

	if (oSelectedItem) {
		this.setValue(oSelectedItem.getText());
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle the focus leave event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.Select#onsapfocusleave
 * @function
 */
sap.m.Select.prototype.onsapfocusleave = function(oEvent) {
	var oPicker = this.getAggregation("picker");

	if (!oEvent.relatedControlId || !oPicker) {
		return;
	}

	var oControl = sap.ui.getCore().byId(oEvent.relatedControlId),
		oFocusDomRef = oControl && oControl.getFocusDomRef();

	if (jQuery.sap.containsOrEquals(oPicker.getFocusDomRef(), oFocusDomRef)) {

		// force the focus to stay in the input field
		this.focus();
	}
};

/* =========================================================== */
/* API methods                                                 */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* protected methods                                           */
/* ----------------------------------------------------------- */

/*
 * Update and synchronize "selectedItem" association, "selectedItemId", "selectedKey" properties and
 * the "selectedItem" in the List.
 *
 * @param {sap.ui.core.Item | null} vItem
 * @param {object} [mOptions]
 * @param {boolean} [mOptions.suppressInvalidate]
 * @param {boolean} [mOptions.listItemUpdated]
 * @protected
 * @name sap.m.Select#setSelection
 * @function
 */
sap.m.Select.prototype.setSelection = function(vItem, mOptions) {
	var oListItem;
	mOptions = mOptions || {};

	// Update and synchronize "selectedItem" association,
	// "selectedKey" and "selectedItemId" properties.
	this.setAssociation("selectedItem", vItem || null, mOptions.suppressInvalidate);
	this.setProperty("selectedItemId", vItem ? vItem.getId() : "", mOptions.suppressInvalidate);
	this.setProperty("selectedKey", vItem ? vItem.getKey() : "", mOptions.suppressInvalidate);

	// update the selection in the List
	if (!mOptions.listItemUpdated) {

		oListItem = this._getSelectedListItem();

		if (oListItem) {

			// set the selected item of the List
			this.getList().setSelectedItem(oListItem, true);
		} else if (this.getList()) {

			if (this.getDefaultSelectedItem()) {
				this.getList().setSelectedItem(this.getDefaultSelectedItem().data(sap.m.SelectRenderer.CSS_CLASS+ "ListItem"), true);
			} else if (this.getList().getSelectedItem()) {
				this.getList().setSelectedItem(this.getList().getSelectedItem(), false);
			}
		}
	}
};

/*
 * Determines whether the "selectedItem" association and "selectedKey" property are synchronized.
 *
 * @returns {boolean}
 * @protected
 * @since 1.24.0
 * @name sap.m.Select#isSelectionSynchronized
 * @function
 */
sap.m.Select.prototype.isSelectionSynchronized = function() {
	var vItem = this.getSelectedItem();
	return this.getSelectedKey() === (vItem && vItem.getKey());
};

/*
 * Synchronize selected item and key.
 *
 * @protected
 * @name sap.m.Select#synchronizeSelection
 * @function
 */
sap.m.Select.prototype.synchronizeSelection = function() {
	var vItem, sKey;

	// the "selectedKey" property is set, but it is not synchronized with the "selectedItem" association
	if (!this.isSelectionSynchronized()) {

		vItem = this.getSelectedItem();
		sKey = this.getSelectedKey();

		// find the first item with the given key
		vItem = this.getItemByKey("" + sKey);

		// if there is an item that match with the "selectedKey" property and
		// it does not have the default value
		if (vItem && (sKey !== "")) {

			// Update and synchronize "selectedItem" association and
			// "selectedKey" property.
			this.setAssociation("selectedItem", vItem, true);	// suppress re-rendering
			this.setProperty("selectedItemId", vItem.getId(), true);	// suppress re-rendering

		// the aggregation items is not bound or
		// it is bound and the data is already available
		} else if (!this.isBound("items") || this._bDataAvailable) {

			// the "selectedKey" property have the default value
			vItem = this.getDefaultSelectedItem();

			// Update and synchronize "selectedItem" association,
			// "selectedKey" and "selectedItemId" properties.
			this.setSelection(vItem, { suppressInvalidate: true	});
		}
	}
};

/*
 * This hook method can be used to add additional content.
 *
 * @param {sap.m.Dialog | sap.m.Popover} [oPicker]
 * @protected
 * @name sap.m.Select#addContent
 * @function
 */
sap.m.Select.prototype.addContent = function(oPicker) {};


/**
 * Creates a picker.
 * To be overwritten by subclasses.
 *
 * @param {string} sPickerType
 * @returns {sap.m.Popover | sap.m.Dialog} The picker pop-up to be used.
 * @protected
 * @name sap.m.Select#createPicker
 * @function
 */
sap.m.Select.prototype.createPicker = function(sPickerType) {
	var oPicker = this.getAggregation("picker");

	if (oPicker) {
		return oPicker;
	}

	oPicker = this["_create" + sPickerType]();

	// define a parent-child relationship between the control's and the picker pop-up
	this.setAggregation("picker", oPicker, true);

	// configuration
	oPicker.setHorizontalScrolling(false)
			.addStyleClass(sap.m.SelectRenderer.CSS_CLASS + "Picker")
			.attachBeforeOpen(this.onBeforeOpen, this)
			.attachAfterOpen(this.onAfterOpen, this)
			.attachBeforeClose(this.onBeforeClose, this)
			.attachAfterClose(this.onAfterClose, this)
			.addEventDelegate({
				onBeforeRendering: this.onBeforeRenderingPicker,
				onAfterRendering: this.onAfterRenderingPicker
			}, this)
			.addContent(this.getList());

	return oPicker;
};

/*
 * Create an instance type of <code>sap.m.List</code>.
 *
 * @returns {sap.m.List}
 * @protected
 * @name sap.m.Select#createList
 * @function
 */
sap.m.Select.prototype.createList = function() {

	// list to use inside the picker pop-up
	this._oList = new sap.m.List({
		width: "100%",
		mode: sap.m.ListMode.SingleSelectMaster,
		rememberSelections: false	// select handles selection in itself, so list should not remember selection
	}).addStyleClass(sap.m.SelectRenderer.CSS_CLASS + "List")
	.addEventDelegate({
		ontap: function(oEvent) {
			this.close();
		}
	}, this)
	.attachSelectionChange(this.onSelectionChange, this);
};

/*
 * Determines whether the Select has content or not.
 *
 * @returns {boolean}
 * @protected
 * @name sap.m.Select#hasContent
 * @function
 */
sap.m.Select.prototype.hasContent = function() {
	return !!this.getItems().length;
};

/*
 * This hook method is called before the control's picker pop-up is rendered.
 *
 * @protected
 * @name sap.m.Select#onBeforeRenderingPicker
 * @function
 */
sap.m.Select.prototype.onBeforeRenderingPicker = function() {
	var fnOnBeforeRenderingPickerType = this["_onBeforeRendering" + this.getPickerType()];
	fnOnBeforeRenderingPickerType && fnOnBeforeRenderingPickerType.call(this);
};

/*
 * This hook method is called after the control's picker pop-up is rendered.
 *
 * @protected
 * @name sap.m.Select#onAfterRenderingPicker
 * @function
 */
sap.m.Select.prototype.onAfterRenderingPicker = function() {
	var fnOnAfterRenderingPickerType = this["_onAfterRendering" + this.getPickerType()];
	fnOnAfterRenderingPickerType && fnOnAfterRenderingPickerType.call(this);
};

/*
 * Open the control's picker pop-up.
 *
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @protected
 * @since 1.16
 * @name sap.m.Select#open
 * @function
 */
sap.m.Select.prototype.open = function() {
	var oPicker = this.getPicker();

	if (oPicker) {
		oPicker.open();
	}

	return this;
};

/*
 * Getter for visible <code>items</code>.
 *
 * @return {sap.ui.core.Item[]}
 * protected
 * @since 1.22.0
 * @name sap.m.Select#getVisibleItems
 * @function
 */
sap.m.Select.prototype.getVisibleItems = sap.m.Select.prototype.getItems;

/*
 * Check whether an item is selected or not.
 *
 * @param {sap.ui.core.Item} vItem
 * @returns {boolean} Whether the item is selected.
 * @protected
 * @since 1.24.0
 * @name sap.m.Select#isItemSelected
 * @function
 */
sap.m.Select.prototype.isItemSelected = function(vItem) {
	return vItem && (vItem.getId() === this.getAssociation("selectedItem"));
};

/*
 * Retrieves the default selected item object from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null}
 * protected
 * @since 1.22.0
 * @name sap.m.Select#getDefaultSelectedItem
 * @function
 */
sap.m.Select.prototype.getDefaultSelectedItem = function(aItems) {
	return this.findFirstEnabledItem();
};

/*
 * Retrieves the selectables items from the aggregation named <code>items</code>.
 *
 * @return {sap.ui.core.Item[]} An array containing the selectables items.
 * @protected
 * @since 1.22.0
 * @name sap.m.Select#getSelectableItems
 * @function
 */
sap.m.Select.prototype.getSelectableItems = function() {
	return this.getEnabledItems(this.getVisibleItems());
};

/*
 * Getter for the control's picker pop-up open area element.
 *
 * @returns {Element | null} Returns the element that is used as trigger to open the control's picker pop-up.
 * @protected
 * @since 1.22.0
 * @name sap.m.Select#getOpenArea
 * @function
 */
sap.m.Select.prototype.getOpenArea = function() {
	return this.getDomRef();
};

/*
 * Checks whether the provided element is the open area.
 *
 * @param {Element} oDomRef
 * @returns {boolean}
 * @protected
 * @since 1.22.0
 * @name sap.m.Select#isOpenArea
 * @function
 */
sap.m.Select.prototype.isOpenArea = function(oDomRef) {
	var oOpenAreaDomRef = this.getOpenArea();
	return oOpenAreaDomRef && oOpenAreaDomRef.contains(oDomRef);
};

/*
 * Retrieves a item by searching for the given property/value from the aggregation named <code>items</code>.
 * If duplicate values exists the first item matching the value is returned.
 *
 * @param {string} sProperty An item property.
 * @param {string} sValue An item value that specifies the item to retrieve.
 * @returns {sap.ui.core.Item | null} The matched item or null.
 * @protected
 * @since 1.22.0
 * @name sap.m.Select#findItem
 * @function
 */
sap.m.Select.prototype.findItem = function(sProperty, sValue) {
	for (var i = 0, aItems = this.getItems(); i < aItems.length; i++) {
		if (aItems[i]["get" + sProperty]() === sValue) {
			return aItems[i];
		}
	}

	return null;
};

/*
 * Clear the selection.
 *
 * @protected
 * @since 1.22.0
 * @name sap.m.Select#clearSelection
 * @function
 */
sap.m.Select.prototype.clearSelection = function() {
	this.setSelection(null);
};

/* ----------------------------------------------------------- */
/* public methods                                              */
/* ----------------------------------------------------------- */

/**
 * Adds some item <code>oItem</code> to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item} oItem The item to add; if empty, nothing is inserted.
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.Select#addItem
 * @function
 */
sap.m.Select.prototype.addItem = function(oItem) {
	this.addAggregation("items", oItem);

	if (this.getList()) {
		this.getList().addItem(this._mapItemToListItem(oItem));
	}

	return this;
};

/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item} oItem The item to insert; if empty, nothing is inserted.
 * @param {int} iIndex The <code>0</code>-based index the item should be inserted at; for
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value
 *             greater than the current size of the aggregation, the item is inserted at
 *             the last position.
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.Select#insertItem
 * @function
 */
sap.m.Select.prototype.insertItem = function(oItem, iIndex) {
	this.insertAggregation("items", oItem, iIndex);

	if (this.getList()) {
		this.getList().insertItem(this._mapItemToListItem(oItem), iIndex);
	}

	return this;
};

/**
 * Setter for association <code>selectedItem</code>.
 *
 * @param {string | sap.ui.core.Item | null} vItem new value for association <code>selectedItem</code>
 *    Id of an sap.ui.core.Item which becomes the new target of this <code>selectedItem</code> association.
 *    Alternatively, an sap.ui.core.Item instance may be given or null.
 *    If the value of null is provided the first enabled item will be selected (if any).
 *
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.Select#setSelectedItem
 * @function
 */
sap.m.Select.prototype.setSelectedItem = function(vItem) {

	if (typeof vItem === "string") {
		vItem = sap.ui.getCore().byId(vItem);
	}

	if (!(vItem instanceof sap.ui.core.Item) && vItem !== null) {
		jQuery.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on', this);
		return this;
	}

	if (!vItem) {
		vItem = this.getDefaultSelectedItem();
	}

	// Update and synchronize "selectedItem" association,
	// "selectedKey" and "selectedItemId" properties.
	this.setSelection(vItem, { suppressInvalidate: true });

	// update the label text
	this.setValue(vItem ? vItem.getText() : ((vItem = this.getDefaultSelectedItem()) ? vItem.getText() : ""));

	return this;
};

/**
 * Setter for property <code>selectedItemId</code>.
 *
 * Default value is an empty string <code>""</code> or <code>undefined</code>.
 * If the provided <code>vItem</code> has a default value,
 * the first enabled item will be selected (if any).
 *
 * @param {string | undefined} vItem New value for property <code>selectedItemId</code>.
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @since 1.12
 * @name sap.m.Select#setSelectedItemId
 * @function
 */
sap.m.Select.prototype.setSelectedItemId = function(vItem) {
	vItem = this.validateProperty("selectedItemId", vItem);
	var oItem = sap.ui.getCore().byId(vItem);

	if (!(oItem instanceof sap.ui.core.Item) && vItem !== "") {
		jQuery.sap.log.warning('Warning: setSelectedItemId() "sItem" has to be a string id of an sap.ui.core.Item instance, an empty string or undefined on', this);
		return this;
	}

	if (!oItem) {
		oItem = this.getDefaultSelectedItem();
	}

	// Update and synchronize "selectedItem" association,
	// "selectedKey" and "selectedItemId" properties.
	this.setSelection(oItem, { suppressInvalidate: true	});

	// update the label text
	this.setValue(oItem ? oItem.getText() : ((oItem = this.getDefaultSelectedItem()) ? oItem.getText() : ""));

	return this;
};

/**
 * Setter for property <code>selectedKey</code>.
 *
 * Default value is an empty string <code>""</code> or <code>undefined</code>.
 *
 * If the provided <code>sKey</code> has a default value,
 * the first enabled item will be selected (if any).
 * In the case that an item has the default key value, it will be selected instead.
 *
 * @param {string} sKey New value for property <code>selectedKey</code>.
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @since 1.11
 * @name sap.m.Select#setSelectedKey
 * @function
 */
sap.m.Select.prototype.setSelectedKey = function(sKey) {
	sKey = this.validateProperty("selectedKey", sKey);
	var oItem = this.getItemByKey(sKey);

	if (oItem || (sKey === "")) {

		// If the "sKey" value is an empty string "" or undefined,
		// the first enabled item will be selected (if any).
		// In the case that an item has the default key value, it will be selected instead.
		if (!oItem && sKey === "") {
			oItem = this.getDefaultSelectedItem();
		}

		// Update and synchronize "selectedItem" association,
		// "selectedKey" and "selectedItemId" properties.
		this.setSelection(oItem, { suppressInvalidate: true	});

		// update the label text
		this.setValue(oItem ? oItem.getText() : ((oItem = this.getDefaultSelectedItem()) ? oItem.getText() : ""));

		return this;
	}

	// note: setSelectedKey() method sometimes is called
	// before the items are added, in this case the "selectedItem" association
	// and "selectedItemId" property need to be updated in onBeforeRendering()
	return this.setProperty("selectedKey", sKey);	// update "selectedKey" property, re-rendering is needed
};

/**
 * Retrieves the item from the aggregation named <code>items</code> at the given 0-based index.
 *
 * @param {int} iIndex Index of the item to return.
 * @returns {sap.ui.core.Item | null} Item at the given index, or null if none.
 * @public
 * @since 1.16
 * @name sap.m.Select#getItemAt
 * @function
 */
sap.m.Select.prototype.getItemAt = function(iIndex) {
	return this.getItems()[+iIndex] || null;
};

/**
 * Retrieves the selected item object from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null} The current target of the <code>selectedItem</code> association, or null.
 * @public
 * @name sap.m.Select#getSelectedItem
 * @function
 */
sap.m.Select.prototype.getSelectedItem = function() {
	var vSelectedItem = this.getAssociation("selectedItem");
	return (vSelectedItem === null) ? null : sap.ui.getCore().byId(vSelectedItem) || null;
};

/**
 * Retrieves the first item from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null} The first item, or null if there are no items.
 * @public
 * @since 1.16
 * @name sap.m.Select#getFirstItem
 * @function
 */
sap.m.Select.prototype.getFirstItem = function() {
	return this.getItems()[0] || null;
};

/**
 * Retrieves the last item from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null} The last item, or null if there are no items.
 * @public
 * @since 1.16
 * @name sap.m.Select#getLastItem
 * @function
 */
sap.m.Select.prototype.getLastItem = function() {
	var aItems = this.getItems();
	return aItems[aItems.length - 1] || null;
};

/**
 * Retrieves the enabled items from the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item[]} [aItems=getItems()] Items to filter.
 * @return {sap.ui.core.Item[]} An array containing the enabled items.
 * @public
 * @since 1.22.0
 * @name sap.m.Select#getEnabledItems
 * @function
 */
sap.m.Select.prototype.getEnabledItems = function(aItems) {
	aItems = aItems || this.getItems();

	return aItems.filter(function(oItem) {
		return oItem.getEnabled();
	});
};

/**
 * Retrieves the item with the given key from the aggregation named <code>items</code>.
 * If duplicate keys exists the first item matching the key is returned.
 *
 * @param {string} sKey An item key that specifies the item to retrieve.
 * @returns {sap.ui.core.Item | null}
 * @public
 * @since 1.16
 * @name sap.m.Select#getItemByKey
 * @function
 */
sap.m.Select.prototype.getItemByKey = function(sKey) {
	return this.findItem("Key", sKey);
};

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.core.Item} vItem The item to remove or its index or id.
 * @returns {sap.ui.core.Item} The removed item or null.
 * @public
 * @name sap.m.Select#removeItem
 * @function
 */
sap.m.Select.prototype.removeItem = function(vItem) {
	var CSS_CLASS = sap.m.SelectRenderer.CSS_CLASS,
		oItem;

	// remove the item from the aggregation items
	vItem = this.removeAggregation("items", vItem);

	// remove the corresponding mapped item from the List
	if (this.getList()) {
		this.getList().removeItem(vItem && vItem.data(CSS_CLASS + "ListItem"));
	}

	// no items, the removed item was the last
	if (this.getItems().length === 0) {

		// clear the selection
		this.clearSelection();
	} else if (this.isItemSelected(vItem)) {	// if the removed item is selected

		oItem = this.findFirstEnabledItem();

		if (oItem) {

			this.setSelection(oItem);

			// set the input value
			this.setValue(oItem ? oItem.getText() : ((oItem = this.getDefaultSelectedItem()) ? oItem.getText() : ""));
		}
	}

	// return the removed item or null
	return vItem;
};

/**
 * Removes all the controls in the aggregation named <code>items</code>.
 * Additionally unregisters them from the hosting UIArea and clears the selection.
 *
 * @returns {sap.ui.core.Item[]} An array of the removed items (might be empty).
 * @public
 * @name sap.m.Select#removeAllItems
 * @function
 */
sap.m.Select.prototype.removeAllItems = function() {
	var aItems = this.removeAllAggregation("items");

	// clear the selection
	this.clearSelection();

	if (this.getList()) {
		this.getList().removeAllItems();
	}

	return aItems;
};

/**
 * Destroys all the items in the aggregation named <code>items</code>.
 *
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.Select#destroyItems
 * @function
 */
sap.m.Select.prototype.destroyItems = function() {

	this.destroyAggregation("items");

	if (this.getList()) {
		this.getList().destroyItems();
	}

	return this;
};

/**
 * Whether the control's picker pop-up is open. It returns true when the control's picker pop-up is currently open,
 * this includes opening and closing animations.
 *
 * @returns {boolean} Determines whether the Select is currently open (this includes opening and closing animations).
 * @public
 * @since 1.16
 * @name sap.m.Select#isOpen
 * @function
 */
sap.m.Select.prototype.isOpen = function() {
	var oPicker = this.getAggregation("picker");
	return !!(oPicker && oPicker.isOpen());
};

/**
 * Closes the control's picker pop-up.
 *
 * @returns {sap.m.Select} <code>this</code> to allow method chaining.
 * @public
 * @since 1.16
 * @name sap.m.Select#close
 * @function
 */
sap.m.Select.prototype.close = function() {
	var oPicker = this.getAggregation("picker");

	if (oPicker) {
		oPicker.close();
	}

	return this;
};