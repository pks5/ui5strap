/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.ComboBoxBase.
jQuery.sap.declare("sap.m.ComboBoxBase");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.InputBase");


/**
 * Constructor for a new ComboBoxBase.
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
 * <li>{@link #getMaxWidth maxWidth} : sap.ui.core.CSSSize (default: '100%')</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} <strong>(default aggregation)</strong> : sap.ui.core.Item[]</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.m.InputBase#constructor sap.m.InputBase}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * An abstract class for ComboBoxes.
 * @extends sap.m.InputBase
 *
 * @author SAP AG 
 * @version 1.22.10
 *
 * @constructor   
 * @public
 * @since 1.22.0
 * @name sap.m.ComboBoxBase
 */
sap.m.InputBase.extend("sap.m.ComboBoxBase", { metadata : {

	// ---- object ----
	"abstract" : true,
	publicMethods : [
		// methods
		"isOpen", "close", "getItemByKey", "getFirstItem", "getLastItem", "getItemAt", "getEnabledItems"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"maxWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'}
	},
	defaultAggregation : "items",
	aggregations : {
    	"items" : {type : "sap.ui.core.Item", multiple : true, singularName : "item", bindable : "bindable"}, 
    	"picker" : {type : "sap.ui.core.Control", multiple : false, visibility : "hidden"}
	}
}});


/**
 * Creates a new subclass of class sap.m.ComboBoxBase with name <code>sClassName</code> 
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
 * @name sap.m.ComboBoxBase.extend
 * @function
 */


/**
 * Getter for property <code>maxWidth</code>.
 * Defines the maximum width of the text field. This value can be provided in %, em, px… and all CSS units.
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>maxWidth</code>
 * @public
 * @name sap.m.ComboBoxBase#getMaxWidth
 * @function
 */

/**
 * Setter for property <code>maxWidth</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sMaxWidth  new value for property <code>maxWidth</code>
 * @return {sap.m.ComboBoxBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBoxBase#setMaxWidth
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * Aggregation of items to be displayed.
 * 
 * <strong>Note</strong>: this is the default aggregation for ComboBoxBase.
 * @return {sap.ui.core.Item[]}
 * @public
 * @name sap.m.ComboBoxBase#getItems
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
 * @return {sap.m.ComboBoxBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBoxBase#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.ComboBoxBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBoxBase#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.core.Item} vItem the item to remove or its index or id
 * @return {sap.ui.core.Item} the removed item or null
 * @public
 * @name sap.m.ComboBoxBase#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Item[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.ComboBoxBase#removeAllItems
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
 * @name sap.m.ComboBoxBase#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.ComboBoxBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBoxBase#destroyItems
 * @function
 */


/**
 * Binder for aggregation <code>items</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.ComboBoxBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBoxBase#bindItems
 * @function
 */

/**
 * Unbinder for aggregation <code>items</code>.
 *
 * @return {sap.m.ComboBoxBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBoxBase#unbindItems
 * @function
 */


/**
 * Whether the control's picker pop-up is open. It returns true when the control's picker pop-up is currently open, this includes opening and closing animations.
 *
 * @name sap.m.ComboBoxBase.prototype.isOpen
 * @function

 * @type boolean
 * @public
 */


/**
 * Closes the control's picker pop-up.
 *
 * @name sap.m.ComboBoxBase.prototype.close
 * @function

 * @type sap.m.ComboBoxBase
 * @public
 */


/**
 * Retrieves the item with the given key from the aggregation named items.
 * If duplicate keys exist the first item matching the key is returned.
 *
 * @name sap.m.ComboBoxBase.prototype.getItemByKey
 * @function
 * @param {string} 
 *         sKey
 *         An item key that identifies the item to retrieve.

 * @type sap.ui.core.Item
 * @public
 */


/**
 * Retrieves the first item from the aggregation named items.
 *
 * @name sap.m.ComboBoxBase.prototype.getFirstItem
 * @function

 * @type sap.ui.core.Item
 * @public
 */


/**
 * Retrieves the last item from the aggregation named items.
 *
 * @name sap.m.ComboBoxBase.prototype.getLastItem
 * @function

 * @type sap.ui.core.Item
 * @public
 */


/**
 * Retrieves the item from the aggregation named items the given 0-based index.
 *
 * @name sap.m.ComboBoxBase.prototype.getItemAt
 * @function
 * @param {int} 
 *         iIndex
 *         Index of the item to return.

 * @type sap.ui.core.Item
 * @public
 */


/**
 * Retrieves enabled items from the aggregation named items.
 *
 * @name sap.m.ComboBoxBase.prototype.getEnabledItems
 * @function

 * @type sap.ui.core.Item[]
 * @public
 */


// Start of sap\m\ComboBoxBase.js
jQuery.sap.require("sap.ui.core.EnabledPropagator");
jQuery.sap.require("sap.m.ComboBoxBaseRenderer");
jQuery.sap.require("sap.m.Bar");
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.Popover");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.core.IconPool.insertFontFaceStyle();
sap.ui.core.EnabledPropagator.apply(sap.m.ComboBoxBase.prototype, [true]);

/* =========================================================== */
/* Private methods and properties                              */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* Private methods                                             */
/* ----------------------------------------------------------- */

sap.m.ComboBoxBase.prototype._getParentPopup = function() {
	var $ComboBox = this.$();
	return ($ComboBox && $ComboBox.closest("[data-sap-ui-popup]")) || null;
};

/**
 *
 *
 * @param {object} $DomRef
 * @private
 */
sap.m.ComboBoxBase.prototype._addFocusableParentPopup = function($DomRef) {
	sap.m.ComboBoxBase._publishEventToPopup({
		action: "add",
		child: this.getAggregation("picker"),
		parent: $DomRef
	});
};

/**
 *
 *
 * @param {object} $DomRef
 * @private
 */
sap.m.ComboBoxBase.prototype._removeFocusableParentPopup = function($DomRef) {
	sap.m.ComboBoxBase._publishEventToPopup({
		action: "remove",
		child: this.getAggregation("picker"),
		parent: $DomRef
	});
};

/**
 * Notify a focusable html element to <code>sap.ui.core.Popup</code>.
 *
 * @param {object} mOptions
 * @private
 */
sap.m.ComboBoxBase._publishEventToPopup = function(mOptions) {
	var sParentId, sEventId;

	if (!mOptions.parent || !mOptions.child) {
		return;
	}

	sParentId = mOptions.parent.attr("data-sap-ui-popup");
	sEventId = "sap.ui.core.Popup." + mOptions.action + "FocusableContent" + "-" + sParentId;

	sap.ui.getCore().getEventBus().publish("sap.ui", sEventId, {
		id : mOptions.child.getId()
	});
};

/**
 * Map an item type of sap.ui.core.Item to an item type of sap.m.StandardListItem.
 *
 * @param {sap.ui.core.Item} oItem
 * @returns {sap.m.StandardListItem | null}
 * @private
 */
sap.m.ComboBoxBase.prototype._mapItemToListItem = function(oItem) {

	if (!oItem) {
		return null;
	}

	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS,
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
 * Given an item type of sap.m.StandardListItem, find the corresponding item type of sap.ui.core.Item.
 *
 * @param {sap.m.StandardListItem} oListItem
 * @param {array} [aItems]
 * @returns {sap.ui.core.Item | null}
 * @private
 */
sap.m.ComboBoxBase.prototype._findMappedItem = function(oListItem, aItems) {
	for (var i = 0, aItems = aItems || this.getItems(), aItemsLength = aItems.length; i < aItemsLength; i++) {
		if (aItems[i].data(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "ListItem") === oListItem) {
			return aItems[i];
		}
	}

	return null;
};

/**
 * Fill the List.
 *
 * @param {sap.ui.core.Item[]} aItems
 * @private
 */
sap.m.ComboBoxBase.prototype._fillList = function(aItems) {
	var oSelectedItem = this.getSelectedItem();

	aItems.forEach(function(oItem) {

		// add a private property to the added item containing a reference
		// to the corresponding mapped item
		var oListItem = this._mapItemToListItem(oItem);

		// add the mapped item type of sap.m.StandardListItem to the List
		this.getList().addAggregation("items", oListItem, true);	// note: suppress re-rendering

		// add active state to the selected item
		if (oItem === oSelectedItem) {
			this.getList().setSelectedItem(oListItem, true);
		}
	}, this);
};

/**
 * Destroy the items in the List.
 *
 * @private
 */
sap.m.ComboBoxBase.prototype._clearList = function() {

	if (this.getList()) {
		this.getList().destroyAggregation("items", true);	// note: suppress re-rendering
	}
};

/* =========================================================== */
/* Lifecycle methods                                           */
/* =========================================================== */

/**
 * Initialization hook.
 *
 * @private
 */
sap.m.ComboBoxBase.prototype.init = function() {
	sap.m.InputBase.prototype.init.apply(this, arguments);

	// set the picker pop-up type
	this.setPickerType("Popover");

	// initialize list
	this._createList();
};

/**
 * Cleans up before destruction.
 *
 * @private
 */
sap.m.ComboBoxBase.prototype.exit = function() {
	sap.m.InputBase.prototype.exit.apply(this, arguments);
	this._removeFocusableParentPopup(this._getParentPopup());

	if (this.getList()) {
		this.getList().destroy();
		this._oList = null;
	}
};

/* =========================================================== */
/* Event handlers                                              */
/* =========================================================== */

/**
 * Handle the touch start event on the control.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.ComboBoxBase.prototype.ontouchstart = function(oEvent) {

	if (this.getEnabled() && this.getEditable() && this.isOpenArea(oEvent.target)) {

		// mark the event for components that needs to know if the event was handled
		oEvent.setMarked();

		// add the active state to the control's field
		this.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "Pressed");
	}
};

/**
 * Handle the touch end event on the control.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.ComboBoxBase.prototype.ontouchend = function(oEvent) {

	if (this.getEnabled() && this.getEditable() && (!this.isOpen() || !this.hasContent()) && this.isOpenArea(oEvent.target)) {

		// mark the event for components that needs to know if the event was handled
		oEvent.setMarked();

		// remove the active state of the control's field
		this.removeStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "Pressed");
	}
};

/**
 * Handle the tap event on the control.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.ComboBoxBase.prototype.ontap = function(oEvent) {
	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS;

	// a non editable or disabled ComboBox, the picker pop-up cannot be opened
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	if (this.isOpenArea(oEvent.target)) {

		// select all text
		this.selectText(0, this.getValue().length);

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

		// add the active state to the control's field
		this.addStyleClass(CSS_CLASS + "Pressed");
	}
};

/* ----------------------------------------------------------- */
/* Keyboard handling                                           */
/* ----------------------------------------------------------- */

/**
 * Handle when F4 or Alt + DOWN arrow are pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.ComboBoxBase.prototype.onsapshow = function(oEvent) {

	// a non editable or disabled ComboBox, the picker pop-up cannot be opened
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

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

	// select all text
	this.selectText(0, this.getValue().length);

	if (this.hasContent()) {
		this.open();
	}
};

/**
 * Handle when Alt + UP arrow are pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.ComboBoxBase.prototype.onsaphide = sap.m.ComboBoxBase.prototype.onsapshow;

/* =========================================================== */
/* API methods                                                 */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* protected methods                                           */
/* ----------------------------------------------------------- */

/*
 * Hook method, can be used to add additional content to the control's picker pop-up.
 *
 * @param {sap.m.Dialog | sap.m.Popover} [oPicker]
 * @protected
 * @name sap.m.ComboBoxBase#addContent
 * @function
 */
sap.m.ComboBoxBase.prototype.addContent = function(oPicker) {};

/**
 * Setter for property <code>_sPickerType</code>.
 *
 * @param {string} sPickerType
 * @protected
 */
sap.m.ComboBoxBase.prototype.setPickerType = function(sPickerType) {
	this._sPickerType = sPickerType;
};

/**
 * Getter for property <code>_sPickerType</code>
 *
 * @returns {string}
 * @protected
 */
sap.m.ComboBoxBase.prototype.getPickerType = function() {
	return this._sPickerType;
};

/**
 * Creates a picker.
 * To be overwritten by subclasses.
 *
 * @param {string} sPickerType
 * @returns {sap.m.Popover | sap.m.Dialog} The picker pop-up to be used.
 * @protected
 * @function
 */
sap.m.ComboBoxBase.prototype.createPicker = function() {};

/**
 * Getter for the control's picker pop-up.
 *
 * @returns {sap.m.Dialog | sap.m.Popover | null} The picker, creating it if necessary by calling <code>createPicker()</code> method.
 * @protected
 * @name sap.m.ComboBoxBase#getPicker
 * @function
 */
sap.m.ComboBoxBase.prototype.getPicker = function() {

	if (this.bIsDestroyed) {
		return null;
	}

	// initialize the control's picker
	return this.createPicker(this.getPickerType());
};

/*
 * Determines whether the control has content or not.
 *
 * @returns {boolean}
 * @protected
 * @name sap.m.ComboBoxBase#hasContent
 * @function
 */
sap.m.ComboBoxBase.prototype.hasContent = function() {
	return !!this.getItems().length;
};

/*
 * Retrieves the first enabled item from the aggregation named <code>items</code>.
 *
 * @param {array} [aItems]
 * @returns {sap.ui.core.Item | null}
 * @protected
 * @name sap.m.ComboBoxBase#findFirstEnabledItem
 * @function
 */
sap.m.ComboBoxBase.prototype.findFirstEnabledItem = function(aItems) {
	var aItems = aItems || this.getItems();

	for (var i = 0; i < aItems.length; i++) {
		if (aItems[i].getEnabled()) {
			return aItems[i];
		}
	}

	return null;
};

/*
 * Retrieves the last enabled item from the aggregation named <code>items</code>.
 *
 * @param {array} [aItems]
 * @returns {sap.ui.core.Item | null}
 * @protected
 * @name sap.m.ComboBoxBase#findLastEnabledItem
 * @function
 */
sap.m.ComboBoxBase.prototype.findLastEnabledItem = function(aItems) {
	var aItems = aItems || this.getItems();
	return this.findFirstEnabledItem(aItems.reverse());
};

/*
 * Open the control's picker pop-up.
 *
 * @returns {sap.m.ComboBoxBase} <code>this</code> to allow method chaining.
 * @protected
 * @name sap.m.ComboBoxBase#open
 * @function
 */
sap.m.ComboBoxBase.prototype.open = function() {
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
 * @protected
 * @name sap.m.ComboBoxBase#getVisibleItems
 * @function
 */
sap.m.ComboBoxBase.prototype.getVisibleItems = function() {
	return this.getItems().filter(function(oItem) {
		return oItem.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "ItemVisible");
	});
};

/*
 * Getter for the control's List.
 *
 * @returns {sap.m.List}
 * @protected
 * @name sap.m.ComboBoxBase#getList
 * @function
 */
sap.m.ComboBoxBase.prototype.getList = function() {
	return this._oList;
};

/*
 * Retrieves the selectables items from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item[]} An array containing the selectables items.
 * @protected
 * @name sap.m.ComboBoxBase#getSelectableItems
 * @function
 */
sap.m.ComboBoxBase.prototype.getSelectableItems = function() {
	return this.getEnabledItems(this.getVisibleItems());
};

/*
 * Getter for the control's picker pop-up open area element.
 *
 * @returns {Element | null} Returns the element that is used as trigger to open the control's picker pop-up.
 * @protected
 * @name sap.m.ComboBoxBase#getOpenArea
 * @function
 */
sap.m.ComboBoxBase.prototype.getOpenArea = function() {
	return this.getDomRef("arrow");
};

/*
 * Checks whether the provided element is the open area.
 *
 * @param {Element} oDomRef
 * @returns {boolean}
 * @protected
 * @name sap.m.ComboBoxBase#isOpenArea
 * @function
 */
sap.m.ComboBoxBase.prototype.isOpenArea = function(oDomRef) {
	var oOpenAreaDomRef = this.getOpenArea();
	return oOpenAreaDomRef && oOpenAreaDomRef.contains(oDomRef);
};

/*
 * Retrieves a item by searching for the given property/value from the aggregation named <code>items</code>.
 * If duplicate values exist, the first item matching the value is returned.
 *
 * @param {string} sProperty An item property.
 * @param {string} sValue An item value that specifies the item to retrieve.
 * @returns {sap.ui.core.Item | null} The matched item or null.
 * @protected
 * @name sap.m.ComboBoxBase#findItem
 * @function
 */
sap.m.ComboBoxBase.prototype.findItem = function(sProperty, sValue) {
	var sMethod = "get" + sProperty.charAt(0).toUpperCase() + sProperty.slice(1);

	for (var i = 0, aItems = this.getItems(); i < aItems.length; i++) {
		if (aItems[i][sMethod]() === sValue) {
			return aItems[i];
		}
	}

	return null;
};

/*
 * Retrieves the item with the given value from the aggregation named <code>items</code>.
 * If duplicate values exist, the first item matching the value is returned.
 *
 * @param {string} sText An item value that specifies the item to retrieve.
 * @returns {sap.ui.core.Item | null} The matched item or null.
 * @protected
 * @name sap.m.ComboBoxBase#getItemByText
 * @function
 */
sap.m.ComboBoxBase.prototype.getItemByText = function(sText) {
	return this.findItem("text", sText);
};

/*
 * Scrolls an item into the visual viewport.
 *
 * @protected
 * @name sap.m.ComboBoxBase#scrollToItem
 * @function
 */
sap.m.ComboBoxBase.prototype.scrollToItem = function(oListItem) {
	var oPicker = this.getPicker(),
		oPickerDomRef = oPicker.$().children(".sapMPopoverCont")[0],
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

/*
 * Clear the filter
 *
 * @protected
 * @name sap.m.ComboBoxBase#clearFilter
 * @function
 */
sap.m.ComboBoxBase.prototype.clearFilter = function() {
	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS;

	this.getItems().forEach(function(oItem) {
		var oListItem = oItem.data(CSS_CLASS + "ListItem");
		oItem.data(CSS_CLASS + "ItemVisible", true);
		oListItem.setVisible(true);
	});
};

/*
 * Clear the selection.
 * To be overwritten by subclasses.
 *
 * @protected
 * @name sap.m.ComboBox#clearSelection
 * @function
 */
sap.m.ComboBoxBase.prototype.clearSelection = function() {};

/* ----------------------------------------------------------- */
/* public methods                                              */
/* ----------------------------------------------------------- */

/**
 * Getter for property <code>value</code>.
 * Defines the value of the control's input field.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>value</code>
 * @public
 * @name sap.m.ComboBoxBase#getValue
 * @function
 */
sap.m.ComboBoxBase.prototype.getValue = function() {
	var oDomRef = this.getFocusDomRef();

	// if the input field is rendered
	if (oDomRef) {

		// return the live value
		return oDomRef.value;
	}

	// else return the value from the model
	return this.getProperty("value");
};

/**
 * Adds some item <code>oItem</code> to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item} oItem The item to add; if empty, nothing is added.
 * @returns {sap.m.ComboBoxBase} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBoxBase#addItem
 * @function
 */
sap.m.ComboBoxBase.prototype.addItem = function(oItem) {
	this.addAggregation("items", oItem);
	oItem.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "ItemVisible", true);

	if (this.getList()) {
		this.getList().addItem(this._mapItemToListItem(oItem));
	}

	return this;
};

/**
 * Inserts an item into the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item} oItem The item to insert; if empty, nothing is inserted.
 * @param {int} iIndex The <code>0</code>-based index the item should be inserted at; for
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value
 *             greater than the current size of the aggregation, the item is inserted at
 *             the last position.
 * @returns {sap.m.ComboBoxBase} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBoxBase#insertItem
 * @function
 */
sap.m.ComboBoxBase.prototype.insertItem = function(oItem, iIndex) {
	this.insertAggregation("items", oItem, iIndex);
	oItem.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "ItemVisible", true);

	if (this.getList()) {
		this.getList().insertItem(this._mapItemToListItem(oItem), iIndex);
	}

	return this;
};

/**
 * Retrieves the item from the aggregation named <code>items</code> at the given 0-based index.
 *
 * @param {int} iIndex Index of the item to return.
 * @returns {sap.ui.core.Item | null} Item at the given index, or null if none.
 * @public
 * @name sap.m.ComboBoxBase#getItemAt
 * @function
 */
sap.m.ComboBoxBase.prototype.getItemAt = function(iIndex) {
	return this.getItems()[+iIndex] || null;
};

/**
 * Retrieves the first item from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null} The first item, or null if there are no items.
 * @public
 * @name sap.m.ComboBoxBase#getFirstItem
 * @function
 */
sap.m.ComboBoxBase.prototype.getFirstItem = function() {
	return this.getItems()[0] || null;
};

/**
 * Retrieves the last item from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null} The last item, or null if there are no items.
 * @public
 * @name sap.m.ComboBoxBase#getLastItem
 * @function
 */
sap.m.ComboBoxBase.prototype.getLastItem = function() {
	var aItems = this.getItems();

	return aItems[aItems.length - 1] || null;
};

/**
 * Retrieves the enabled items from the given array of items or from 
 * this control's aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item[]} [aItems=getItems()] items to filter 
 * @return {sap.ui.core.Item[]} An array containing the enabled items.
 * @public
 * @name sap.m.ComboBoxBase#getEnabledItems
 * @function
 */
sap.m.ComboBoxBase.prototype.getEnabledItems = function(aItems) {
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
 * @name sap.m.ComboBoxBase#getItemByKey
 * @function
 */
sap.m.ComboBoxBase.prototype.getItemByKey = function(sKey) {
	return this.findItem("key", sKey);
};

/**
 * Whether the control's picker pop-up is open. It returns true when the control's picker pop-up is currently open,
 * this includes opening and closing animations.
 *
 * @returns {boolean} Determines whether the control's picker pop-up is currently open (this includes opening and closing animations).
 * @public
 * @name sap.m.ComboBoxBase#isOpen
 * @function
 */
sap.m.ComboBoxBase.prototype.isOpen = function() {
	var oPicker = this.getAggregation("picker");

	return !!(oPicker && oPicker.isOpen());
};

/**
 * Closes the control's picker pop-up.
 *
 * @returns {sap.m.ComboBoxBase} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBoxBase#close
 * @function
 */
sap.m.ComboBoxBase.prototype.close = function() {
	var oPicker = this.getAggregation("picker");

	if (oPicker) {
		oPicker.close();
	}

	return this;
};

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.core.Item} vItem The item to remove or its index or id.
 * @returns {sap.ui.core.Item} The removed item or null.
 * @public
 * @name sap.m.ComboBoxBase#removeItem
 * @function
 */
sap.m.ComboBoxBase.prototype.removeItem = function(vItem) {
	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS;

	// remove the item from the aggregation items
	vItem = this.removeAggregation("items", vItem);

	// remove the corresponding mapped item from the List
	if (this.getList()) {
		this.getList().removeItem(vItem && vItem.data(CSS_CLASS + "ListItem"));
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
 * @name sap.m.ComboBoxBase#removeAllItems
 * @function
 */
sap.m.ComboBoxBase.prototype.removeAllItems = function() {
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
 * @returns {sap.m.ComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBoxBase#destroyItems
 * @function
 */
sap.m.ComboBoxBase.prototype.destroyItems = function() {
	this.destroyAggregation("items");

	if (this.getList()) {
		this.getList().destroyItems();
	}

	return this;
};