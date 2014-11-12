/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.ComboBox.
jQuery.sap.declare("sap.m.ComboBox");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.ComboBoxBase");


/**
 * Constructor for a new ComboBox.
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
 * <li>{@link #getSelectedKey selectedKey} : string</li>
 * <li>{@link #getSelectedItemId selectedItemId} : string</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul>
 * <li>{@link #getSelectedItem selectedItem} : string | sap.ui.core.Item</li></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.ComboBox#event:selectionChange selectionChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.m.ComboBoxBase#constructor sap.m.ComboBoxBase}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The ComboBox control provides a list box with items and a text field allowing the user to either type a value directly into the control or choose from the list of existing items.
 * @extends sap.m.ComboBoxBase
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.22
 * @name sap.m.ComboBox
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.ComboBoxBase.extend("sap.m.ComboBox", { metadata : {

	library : "sap.m",
	properties : {
		"selectedKey" : {type : "string", group : "Data", defaultValue : null},
		"selectedItemId" : {type : "string", group : "Misc", defaultValue : null}
	},
	associations : {
		"selectedItem" : {type : "sap.ui.core.Item", multiple : false}
	},
	events : {
		"selectionChange" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.ComboBox with name <code>sClassName</code> 
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
 * @name sap.m.ComboBox.extend
 * @function
 */

sap.m.ComboBox.M_EVENTS = {'selectionChange':'selectionChange'};


/**
 * Getter for property <code>selectedKey</code>.
 * Key of the selected item. If the key has no corresponding item, no changes will apply. If duplicate keys exists the first item matching the key is used.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>selectedKey</code>
 * @public
 * @name sap.m.ComboBox#getSelectedKey
 * @function
 */

/**
 * Setter for property <code>selectedKey</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sSelectedKey  new value for property <code>selectedKey</code>
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBox#setSelectedKey
 * @function
 */


/**
 * Getter for property <code>selectedItemId</code>.
 * Identifier of the selected item. If the identifier has no corresponding item, no changes will apply.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>selectedItemId</code>
 * @public
 * @name sap.m.ComboBox#getSelectedItemId
 * @function
 */

/**
 * Setter for property <code>selectedItemId</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sSelectedItemId  new value for property <code>selectedItemId</code>
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBox#setSelectedItemId
 * @function
 */


/**
 * Set or retrieves the selected item from the aggregation named items.
 *
 * @return {string} Id of the element which is the current target of the <code>selectedItem</code> association, or null
 * @public
 * @name sap.m.ComboBox#getSelectedItem
 * @function
 */

/**
 * Set or retrieves the selected item from the aggregation named items.
 *
 * @param {string | sap.ui.core.Item} vSelectedItem 
 *    Id of an element which becomes the new target of this <code>selectedItem</code> association.
 *    Alternatively, an element instance may be given.
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBox#setSelectedItem
 * @function
 */


	
/**
 * Occurs when the user changes the selected item.
 *
 * @name sap.m.ComboBox#selectionChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.core.Item} oControlEvent.getParameters.selectedItem The selected item.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'selectionChange' event of this <code>sap.m.ComboBox</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.ComboBox</code>.<br/> itself. 
 *  
 * Occurs when the user changes the selected item.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.ComboBox</code>.<br/> itself.
 *
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBox#attachSelectionChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'selectionChange' event of this <code>sap.m.ComboBox</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ComboBox#detachSelectionChange
 * @function
 */

/**
 * Fire event selectionChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItem' of type <code>sap.ui.core.Item</code> The selected item.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.ComboBox#fireSelectionChange
 * @function
 */


// Start of sap\m\ComboBox.js
jQuery.sap.require("sap.m.ComboBoxRenderer");

/* =========================================================== */
/* Private methods and properties                              */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* Private methods                                             */
/* ----------------------------------------------------------- */

/**
 * Get the selected item in the List.
 *
 * @returns {sap.m.StandardListItem | null}
 * @private
 * @name sap.m.ComboBox#_getSelectedListItem
 * @function
 */
sap.m.ComboBox.prototype._getSelectedListItem = function() {
	var oItem = this.getSelectedItem();
	return (oItem && oItem.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "ListItem")) || null;
};

/**
 * Called, whenever the binding of the aggregation items is changed.
 * This method deletes all items in this aggregation and recreates them
 * according to the data model.
 *
 * @private
 * @name sap.m.ComboBox#updateItems
 * @function
 */
sap.m.ComboBox.prototype.updateItems = function(sReason) {
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
 * @name sap.m.ComboBox#refreshItems
 * @function
 */
sap.m.ComboBox.prototype.refreshItems = function() {
	this.refreshAggregation("items");
};

/* ----------------------------------------------------------- */
/* Popover                                                     */
/* ----------------------------------------------------------- */

/**
 * Creates an instance type of <code>sap.m.Popover</code>.
 *
 * @returns {sap.m.Popover}
 * @private
 * @name sap.m.ComboBox#_createPopover
 * @function
 */
sap.m.ComboBox.prototype._createPopover = function() {

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
 * @name sap.m.ComboBox#_decoratePopover
 * @function
 */
sap.m.ComboBox.prototype._decoratePopover = function(oPopover) {
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

	oPopover.open = function() {
		return this.openBy(self.getFocusDomRef());
	};
};

/**
 * Required adaptations after rendering of the Popover.
 *
 * @private
 * @name sap.m.ComboBox#onAfterRenderingPopover
 * @function
 */
sap.m.ComboBox.prototype.onAfterRenderingPopover = function() {
	var oPopover = this.getPicker();

	// remove the Popover arrow
	oPopover._removeArrow();

	// position adaptations
	oPopover._setPosition();
};

/* ----------------------------------------------------------- */
/* Dialog                                                      */
/* ----------------------------------------------------------- */

/**
 * Creates an instance type of <code>sap.m.Dialog</code>.
 *
 * @returns {sap.m.Dialog}
 * @private
 * @name sap.m.ComboBox#_createDialog
 * @function
 */
sap.m.ComboBox.prototype._createDialog = function() {
	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS;

	// initialize Dialog
	var oDialog = new sap.m.Dialog({
		stretchOnPhone: true,
		customHeader: new sap.m.Bar({
			contentLeft: new sap.m.InputBase({
				value: this.getSelectedItem().getText(),
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
 * @name sap.m.ComboBox#onBeforeOpenDialog
 * @function
 */
sap.m.ComboBox.prototype.onBeforeOpenDialog = function() {
	var oHeader = this.getPicker().getCustomHeader();
	oHeader.getContentLeft()[0].setValue(this.getSelectedItem().getText());
};

/* =========================================================== */
/* Lifecycle methods                                           */
/* =========================================================== */

/**
 * Required adaptations before rendering.
 *
 * @private
 * @name sap.m.ComboBox#onBeforeRendering
 * @function
 */
sap.m.ComboBox.prototype.onBeforeRendering = function() {
	sap.m.ComboBoxBase.prototype.onBeforeRendering.apply(this, arguments);
	this.synchronizeSelection();
	this._clearList();
	this._fillList(this.getItems());
};

/* =========================================================== */
/* Event handlers                                              */
/* =========================================================== */

/**
 * Handle the input event on the control's input field.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#oninput
 * @function
 */
sap.m.ComboBox.prototype.oninput = function(oEvent) {
	sap.m.ComboBoxBase.prototype.oninput.apply(this, arguments);

	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS,
		oSelectedItem = this.getSelectedItem(),
		aItems = this.getItems(),
		oInputDomRef = oEvent.target,
		sValue = oInputDomRef.value,
		bFirst = true,
		oItem,
		bMatch,
		oListItem,
		i = 0;

	// open the picker while typing
	if (aItems.length) {
		this.open();
	}

	if (!this.isAllowedSubstringValue(sValue)) {

		// suppress the invalid entered character
		sValue = sValue.substr(0, sValue.length - 1);
		this.updateDomValue(sValue);
	}

	if (sValue === "") {
		this.setSelection(null, { suppressInvalidate: true });

		if (oSelectedItem !== this.getSelectedItem()) {
			this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		}
	}

	for (; i < aItems.length; i++) {

		// the item match with the value
		oItem = aItems[i];
		bMatch = jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue);
		oListItem = oItem.data(CSS_CLASS + "ListItem");

		if (sValue === "") {
			bMatch = true;
		}

		// toggle the visibility of the items according to the value
		oListItem.setVisible(bMatch);

		// first match of the value
		if (bFirst && bMatch && sValue !== "") {
			bFirst = false;

			if (this._bDoTypeAhead) {
				this.updateDomValue(oItem.getText());
			}

			this.setSelection(oItem, { suppressInvalidate: true });

			if (oSelectedItem !== this.getSelectedItem()) {
				this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
			}

			if (this._bDoTypeAhead) {
				this.selectText(sValue.length, 9999999);
			}

			this.scrollToItem(this.getList().getSelectedItem());
		}
	}
};

/**
 * Handle the selection change event on the List.
 *
 * @param {sap.ui.base.Event} oControlEvent
 * @private
 * @name sap.m.ComboBox#onSelectionChange
 * @function
 */
sap.m.ComboBox.prototype.onSelectionChange = function(oControlEvent) {
	var oListItem = oControlEvent.getParameter("listItem"),
		oNewSelectedItem = this._findMappedItem(oListItem),
		sValue;

	if ((oListItem.getType() === "Inactive") || // workaround: this is needed because the List fires the "selectionChange" event on inactive items

		// a non editable or disabled ComboBox, the selection cannot be modified
		!this.getEnabled() || !this.getEditable()) {

		return;
	}

	// pre-assertion
	jQuery.sap.assert(oNewSelectedItem, "The corresponding mapped item was not found on " + this);

	if (oNewSelectedItem) {

		// set the input value
		this.updateDomValue(oNewSelectedItem.getText());

		// update the selected item
		this.setSelection(oNewSelectedItem, {
			suppressInvalidate: true,
			listItemUpdated: true
		});
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });

		sValue = this.getValue();

		if (sap.ui.Device.system.desktop) {

			// deselect the text and move the text cursor at the endmost position (only ie)
			jQuery.sap.delayedCall(0, this, "selectText", [sValue.length, sValue.length]);
		}
	}
};

/**
 * Handle the item press event on the List.
 *
 * @param {sap.ui.base.Event} oControlEvent
 * @private
 * @name sap.m.ComboBox#onItemPress
 * @function
 */
sap.m.ComboBox.prototype.onItemPress = function() {
	this.close();
};

/* ----------------------------------------------------------- */
/* Keyboard handling                                           */
/* ----------------------------------------------------------- */

/**
 * Handle the keydown event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onkeydown
 * @function
 */
sap.m.ComboBox.prototype.onkeydown = function(oEvent) {
	sap.m.ComboBoxBase.prototype.onkeydown.apply(this, arguments);

	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	var mKeyCode = jQuery.sap.KeyCodes;
	this._bDoTypeAhead = (oEvent.which !== mKeyCode.BACKSPACE) && (oEvent.which !== mKeyCode.DELETE);
};

/**
 * Handle cut event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#oncut
 * @function
 */
sap.m.ComboBox.prototype.oncut = function(oEvent) {
	sap.m.ComboBoxBase.prototype.oncut.apply(this, arguments);
	this._bDoTypeAhead = false;
};

/**
 * Handle when enter is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsapenter
 * @function
 */
sap.m.ComboBox.prototype.onsapenter = function(oEvent) {
	sap.m.ComboBoxBase.prototype.onsapenter.apply(this, arguments);

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// a non editable or disabled ComboBox, the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	var sValue = this.getFocusDomRef().value;
	this.setValue(sValue);

	// no text selection
	this.selectText(sValue.length, sValue.length);

	if (this.isOpen()) {
		this.close();
	}
};

/**
 * Handle when keyboard DOWN arrow is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsapdown
 * @function
 */
sap.m.ComboBox.prototype.onsapdown = function(oEvent) {

	// a non editable or disabled ComboBox, the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when arrow keys are pressed
	oEvent.preventDefault();

	var oNextSelectableItem,
		aSelectableItems = this.getSelectableItems();

	oNextSelectableItem = aSelectableItems[aSelectableItems.indexOf(this.getSelectedItem()) + 1];

	if (oNextSelectableItem) {
		this.updateDomValue(oNextSelectableItem.getText());
		this.setSelection(oNextSelectableItem, { suppressInvalidate: true });
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		this.selectText(0, this.getFocusDomRef().value.length);
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when keyboard UP arrow is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsapup
 * @function
 */
sap.m.ComboBox.prototype.onsapup = function(oEvent) {

	// a non editable or disabled ComboBox, the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when arrow keys are pressed
	oEvent.preventDefault();

	var oPrevSelectableItem,
		aSelectableItems = this.getSelectableItems();

	oPrevSelectableItem = aSelectableItems[aSelectableItems.indexOf(this.getSelectedItem()) - 1];

	if (oPrevSelectableItem) {
		this.updateDomValue(oPrevSelectableItem.getText());
		this.setSelection(oPrevSelectableItem, { suppressInvalidate: true });
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		this.selectText(0, this.getFocusDomRef().value.length);
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle Home key pressed.
 * Select the first selectable item and update the input field accordingly.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsaphome
 * @function
 */
sap.m.ComboBox.prototype.onsaphome = function(oEvent) {

	// a non editable or disabled ComboBox, the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when Home key is pressed
	oEvent.preventDefault();

	var oFirstSelectableItem = this.getSelectableItems()[0];

	if (oFirstSelectableItem && (oFirstSelectableItem !== this.getSelectedItem())) {
		this.updateDomValue(oFirstSelectableItem.getText());
		this.setSelection(oFirstSelectableItem, { suppressInvalidate: true });
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		this.selectText(0, this.getFocusDomRef().value.length);
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle End key pressed.
 * Select the last selectable item and update the input field accordingly.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsapend
 * @function
 */
sap.m.ComboBox.prototype.onsapend = function(oEvent) {

	// a non editable or disabled ComboBox, the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when End key is pressed
	oEvent.preventDefault();

	var oLastSelectableItem = this.findLastEnabledItem(this.getSelectableItems());

	if (oLastSelectableItem && (oLastSelectableItem !== this.getSelectedItem())) {
		this.updateDomValue(oLastSelectableItem.getText());
		this.setSelection(oLastSelectableItem, { suppressInvalidate: true });
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		this.selectText(0, this.getFocusDomRef().value.length);
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when page down key is pressed.
 *
 * Select the last visible item. If the last visible item is already selected,
 * scroll one page down and select the then last visible item.
 * If the last item is selected, do nothing.
 * Update the input field accordingly.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsappagedown
 * @function
 */
sap.m.ComboBox.prototype.onsappagedown = function(oEvent) {

	// non editable or disabled ComboBox, the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when page down key is pressed
	oEvent.preventDefault();

	var aSelectableItems = this.getSelectableItems(),
		iIndex = aSelectableItems.indexOf(this.getSelectedItem()) + 20,
		oItem;

	// constrain the index
	iIndex = (iIndex > aSelectableItems.length - 1) ? aSelectableItems.length - 1 : Math.max(0, iIndex);
	oItem = aSelectableItems[iIndex];

	if (oItem && (oItem !== this.getSelectedItem())) {
		this.updateDomValue(oItem.getText());
		this.setSelection(oItem, { suppressInvalidate: true });
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		this.selectText(0, this.getFocusDomRef().value.length);
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle when page up key is pressed.
 *
 * Select the first visible item. If the first visible item is already selected,
 * scroll one page up and select the then first visible item.
 * If the first item is selected, do nothing.
 * Update the input field accordingly.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsappageup
 * @function
 */
sap.m.ComboBox.prototype.onsappageup = function(oEvent) {

	// a non editable or disabled ComboBox the selection cannot be modified
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();

	// note: prevent document scrolling when page up key is pressed
	oEvent.preventDefault();

	var aSelectableItems = this.getSelectableItems(),
		iIndex = aSelectableItems.indexOf(this.getSelectedItem()) - 20,
		oItem;

	// constrain the index
	iIndex = (iIndex > aSelectableItems.length - 1) ? aSelectableItems.length - 1 : Math.max(0, iIndex);
	oItem = aSelectableItems[iIndex];

	if (oItem && (oItem !== this.getSelectedItem())) {
		this.updateDomValue(oItem.getText());
		this.setSelection(oItem, { suppressInvalidate: true });
		this.fireSelectionChange({ selectedItem: this.getSelectedItem() });
		this.selectText(0, this.getFocusDomRef().value.length);
	}

	this.scrollToItem(this.getList().getSelectedItem());
};

/**
 * Handle the focus in event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onfocusin
 * @function
 */
sap.m.ComboBox.prototype.onfocusin = function(oEvent) {
	if (oEvent.target === this.getOpenArea()) {

		if (sap.ui.Device.system.desktop) {

			// force the focus to stay in the input field
			this.focus();
		}
	} else {

		if (sap.ui.Device.system.desktop) {
			jQuery.sap.delayedCall(0, this, function() {
				if (document.activeElement === this.getFocusDomRef()) {
					this.selectText(0, this.getValue().length);
				}
			});
		}
	}
};

/**
 * Handle the focus leave event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 * @name sap.m.ComboBox#onsapfocusleave
 * @function
 */
sap.m.ComboBox.prototype.onsapfocusleave = function(oEvent) {
	var oPicker = this.getAggregation("picker");

	if (!oEvent.relatedControlId || !oPicker) {
		return;
	}

	var oControl = sap.ui.getCore().byId(oEvent.relatedControlId),
		oFocusDomRef = oControl && oControl.getFocusDomRef();

	if (jQuery.sap.containsOrEquals(oPicker.getFocusDomRef(), oFocusDomRef)) {

		if (sap.ui.Device.system.desktop) {

			// force the focus to stay in the input field
			this.focus();
		}
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
 * @name sap.m.ComboBox#setSelection
 * @function
 */
sap.m.ComboBox.prototype.setSelection = function(vItem, mOptions) {
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
				this.getList().setSelectedItem(this.getDefaultSelectedItem().data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+ "ListItem"), true);
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
 * @name sap.m.ComboBox#isSelectionSynchronized
 * @function
 */
sap.m.ComboBox.prototype.isSelectionSynchronized = function() {
	var vItem = this.getSelectedItem();
	return this.getSelectedKey() === (vItem && vItem.getKey());
};

/**
 * Synchronize selected item and key.
 *
 * @protected
 * @name sap.m.ComboBox#synchronizeSelection
 * @function
 */
sap.m.ComboBox.prototype.synchronizeSelection = function() {

	// the "selectedKey" property is set and it is synchronized with the "selectedItem" association
	if (this.isSelectionSynchronized()) {
		return;
	}

	var sKey = this.getSelectedKey(),
		vItem = this.getItemByKey("" + sKey);	// find the first item with the given key

	// if there is an item that match with the "selectedKey" property and
	// it does not have the default value
	if (vItem && (sKey !== "")) {

		// update and synchronize "selectedItem" association and
		// "selectedKey" property
		this.setAssociation("selectedItem", vItem, true);	// suppress re-rendering
		this.setProperty("selectedItemId", vItem.getId(), true);	// suppress re-rendering

		// update the value if it has not changed
		if (this._sValue === this.getValue()) {
			this.setValue(vItem.getText());
		}

	// the aggregation items is not bound or
	// it is bound and the data is already available
	} else if (!this.isBound("items") || this._bDataAvailable) {

		// the "selectedKey" property have the default value
		vItem = this.getDefaultSelectedItem();

		// update and synchronize "selectedItem" association,
		// "selectedKey" and "selectedItemId" properties
		this.setSelection(vItem, { suppressInvalidate: true });
	}
};

/**
 * Creates a picker.
 * To be overwritten by subclasses.
 *
 * @param {string} sPickerType
 * @returns {sap.m.Popover | sap.m.Dialog} The picker pop-up to be used.
 * @protected
 * @name sap.m.ComboBox#createPicker
 * @function
 */
sap.m.ComboBox.prototype.createPicker = function(sPickerType) {
	var oPicker = this.getAggregation("picker");

	if (oPicker) {
		return oPicker;
	}

	oPicker = this["_create" + sPickerType]();

	// define a parent-child relationship between the control's and the picker pop-up
	this.setAggregation("picker", oPicker, true);

	// configuration
	oPicker.setHorizontalScrolling(false)
			.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "Picker")
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
 * @name sap.m.ComboBox#createList
 * @function
 */
sap.m.ComboBox.prototype.createList = function() {

	// list to use inside the picker
	this._oList = new sap.m.List({
		width: "100%",
		mode: sap.m.ListMode.SingleSelectMaster,
		rememberSelections: false	// list should not remember selection
	}).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "List")
	.attachSelectionChange(this.onSelectionChange, this)
	.attachItemPress(this.onItemPress, this);
};

/*
 * This hook method is called before the control's picker pop-up is rendered.
 *
 * @protected
 * @name sap.m.ComboBox#onBeforeRenderingPicker
 * @function
 */
sap.m.ComboBox.prototype.onBeforeRenderingPicker = function() {
	var fnOnBeforeRenderingPickerType = this["onBeforeRendering" + this.getPickerType()];
	fnOnBeforeRenderingPickerType && fnOnBeforeRenderingPickerType.call(this);
};

/*
 * This hook method is called after the control's picker pop-up is rendered.
 *
 * @protected
 * @name sap.m.ComboBox#onAfterRenderingPicker
 * @function
 */
sap.m.ComboBox.prototype.onAfterRenderingPicker = function() {
	var fnOnAfterRenderingPickerType = this["onAfterRendering" + this.getPickerType()];
	fnOnAfterRenderingPickerType && fnOnAfterRenderingPickerType.call(this);
};

/*
 * This event handler will be called before the control's picker pop-up is opened.
 *
 * @protected
 * @name sap.m.ComboBox#onBeforeOpen
 * @function
 */
sap.m.ComboBox.prototype.onBeforeOpen = function() {
	var fnPickerTypeBeforeOpen = this["onBeforeOpen" + this.getPickerType()];

	// add the active state to the control field
	this.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "Pressed");

	// call the hook to add additional content to the List
	this.addContent();

	fnPickerTypeBeforeOpen && fnPickerTypeBeforeOpen.call(this);
};

/*
 * This event handler will be called before the control's picker popover is opened.
 *
 * @protected
 * @name sap.m.ComboBox#onBeforeOpenPopover
 * @function
 */
sap.m.ComboBox.prototype.onBeforeOpenPopover = function() {
	var oDomRef = this.getDomRef(),
		oComputedStyle = window.getComputedStyle(oDomRef);

	if (oComputedStyle) {
		this.getPicker().setContentWidth((parseFloat(oComputedStyle.width) / parseFloat(sap.m.BaseFontSize)) + "rem");
	}
};

/*
 * This event handler will be called after the control's picker pop-up is opened.
 *
 * @protected
 * @name sap.m.ComboBox#onAfterOpen
 * @function
 */
sap.m.ComboBox.prototype.onAfterOpen = function() {};

/*
 * This event handler will be called before the picker pop-up is closed.
 *
 * @protected
 * @name sap.m.ComboBox#onBeforeClose
 * @function
 */
sap.m.ComboBox.prototype.onBeforeClose = function() {};

/*
 * This event handler will be called after the picker pop-up is closed.
 *
 * @protected
 * @name sap.m.ComboBox#onAfterClose
 * @function
 */
sap.m.ComboBox.prototype.onAfterClose = function() {

	// remove the active state of the control's field
	this.removeStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "Pressed");

	// clear the filter to make all items visible after the picker pop-up is closed
	this.clearFilter();
};

/*
 * Check whether an item is selected or not.
 *
 * @param {sap.ui.core.Item} vItem
 * @returns {boolean} Whether the item is selected.
 * @protected
 * @since 1.24.0
 * @name sap.m.ComboBox#isItemSelected
 * @function
 */
sap.m.ComboBox.prototype.isItemSelected = function(vItem) {
	return vItem && (vItem.getId() === this.getAssociation("selectedItem"));
};

/**
 * Retrieves the default selected item from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null}
 * @protected
 * @name sap.m.ComboBox#getDefaultSelectedItem
 * @function
 */
sap.m.ComboBox.prototype.getDefaultSelectedItem = function() {
	return this.getForceSelection() ? this.findFirstEnabledItem() : null;
};

/*
 * Check whether the provided value match with the text of an item in the list.
 *
 * @param {string} sValue
 * @returns {boolean}
 * @protected
 * @name sap.m.ComboBox#isAllowedSubstringValue
 * @function
 */
sap.m.ComboBox.prototype.isAllowedSubstringValue = function(sValue) {

	if (!this.getForceSelection()) {
		return true;
	}

	return this.getItems().some(function(oItem) {
		return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue);
	});
};

/*
 * Clear the selection.
 *
 * @protected
 * @name sap.m.ComboBox#clearSelection
 * @function
 */
sap.m.ComboBox.prototype.clearSelection = function() {
	this.setSelection(null);
};

/**
 * Sets the start and end positions of the current text selection.
 *
 * @param {integer} iSelectionStart The index into the text at which the first selected character is located.
 * @param {integer} iSelectionEnd The index into the text at which the last selected character is located.
 * @protected
 * @since 1.22.1
 * @name sap.m.ComboBoxBase#selectText
 * @function
 */
sap.m.ComboBox.prototype.selectText = function(iSelectionStart, iSelectionEnd) {
	sap.m.ComboBoxBase.prototype.selectText.apply(this, arguments);
	this.textSelectionStart = iSelectionStart;
	this.textSelectionEnd = iSelectionEnd;
	return this;
};

/* ----------------------------------------------------------- */
/* public methods                                              */
/* ----------------------------------------------------------- */

/**
 * Setter for property <code>value</code>.
 *
 * Default value is empty/<code>undefined</code>.
 *
 * @param {string} sValue New value for property <code>value</code>.
 * @return {sap.m.ComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.InputBase#setValue
 * @function
 */
sap.m.ComboBox.prototype.setValue = function(sValue, bSuppressForceSelection /* for internal usage */) {
	if (!bSuppressForceSelection && this.getForceSelection() && !this.getItemByText(sValue)) {
		return this;
	}

	sap.m.ComboBoxBase.prototype.setValue.call(this, sValue);
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
 * @returns {sap.m.ComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBox#setSelectedItem
 * @function
 */
sap.m.ComboBox.prototype.setSelectedItem = function(vItem) {

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

	// set the input value
	this.setValue(vItem ? vItem.getText() : ((vItem = this.getDefaultSelectedItem()) ? vItem.getText() : ""), true);

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
 * @returns {sap.m.ComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBox#setSelectedItemId
 * @function
 */
sap.m.ComboBox.prototype.setSelectedItemId = function(vItem) {
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

	// set the input value
	this.setValue(oItem ? oItem.getText() : ((oItem = this.getDefaultSelectedItem()) ? oItem.getText() : ""), true);

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
 * @returns {sap.m.ComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.ComboBox#setSelectedKey
 * @function
 */
sap.m.ComboBox.prototype.setSelectedKey = function(sKey) {
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

		// set the input value
		this.setValue(oItem ? oItem.getText() : ((oItem = this.getDefaultSelectedItem()) ? oItem.getText() : ""), true);

		return this;
	}

	// note: setSelectedKey() method sometimes is called
	// before the items are added, in this case the "selectedItem" association,
	// "selectedItemId" and the "value" properties need to be updated in onBeforeRendering()
	this._sValue = this.getValue();
	return this.setProperty("selectedKey", sKey);	// update "selectedKey" property, re-rendering is needed
};

/**
 * Retrieves the selected item object from the aggregation named <code>items</code>.
 *
 * @returns {sap.ui.core.Item | null} The current target of the <code>selectedItem</code> association, or null.
 * @public
 * @name sap.m.ComboBox#getSelectedItem
 * @function
 */
sap.m.ComboBox.prototype.getSelectedItem = function() {
	var vSelectedItem = this.getAssociation("selectedItem");

	return (vSelectedItem === null) ? null : sap.ui.getCore().byId(vSelectedItem) || null;
};

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.core.Item} vItem The item to remove or its index or id.
 * @returns {sap.ui.core.Item} The removed item or null.
 * @public
 * @name sap.m.ComboBox#removeItem
 * @function
 */
sap.m.ComboBox.prototype.removeItem = function(vItem) {
	vItem = sap.m.ComboBoxBase.prototype.removeItem.call(this, vItem);

	var sValue = this.getValue(),
		oItem;

	// no items, the removed item was the last
	if (this.getItems().length === 0) {

		// clear the selection
		this.clearSelection();

		if (this.getForceSelection()) {
			this.setValue("", true);
		}
	} else if (this.isItemSelected(vItem)) {	// if the removed item is selected

		oItem = this.getDefaultSelectedItem();
		this.setSelection(oItem);

		// update the input value
		if (this.getForceSelection()) {
			sValue = oItem ? oItem.getText() : "";
		}

		this.setValue(sValue);
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
 * @name sap.m.ComboBox#removeAllItems
 * @function
 */
sap.m.ComboBox.prototype.removeAllItems = function() {
	var aItems = sap.m.ComboBoxBase.prototype.removeAllItems.call(this);

	if (this.getForceSelection()) {
		this.setValue("", true);
	}

	return aItems;
};

sap.m.ComboBox.prototype.getForceSelection = function() {
	return false;
};

sap.m.ComboBox.prototype.setForceSelection = function() {};