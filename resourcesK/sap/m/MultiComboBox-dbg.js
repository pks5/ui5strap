/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.MultiComboBox.
jQuery.sap.declare("sap.m.MultiComboBox");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.InputBase");


/**
 * Constructor for a new MultiComboBox.
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
 * <ul>
 * <li>{@link #getSelectedItems selectedItems} : string | sap.ui.core.Item</li></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.MultiComboBox#event:selectionChange selectionChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.MultiComboBox#event:selectionFinish selectionFinish} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
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
 * The MultiComboBox control provides a list box with items and a text field allowing the user to either type a value directly into the control or choose from the list of existing items.
 * @extends sap.m.InputBase
 *
 * @author SAP AG  
 * @version 1.22.10
 *
 * @constructor   
 * @public
 * @since 1.22.0
 * @name sap.m.MultiComboBox
 */
sap.m.InputBase.extend("sap.m.MultiComboBox", { metadata : {

	// ---- object ----
	publicMethods : [
		// methods
		"isOpen", "close", "getItemByKey", "setSelectedKeys", "getSelectedKeys", "addSelectedKeys", "removeSelectedKeys"
	],

	// ---- control specific ----
	library : "sap.m",
	properties : {
		"maxWidth" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'}
	},
	defaultAggregation : "items",
	aggregations : {
    	"items" : {type : "sap.ui.core.Item", multiple : true, singularName : "item"}, 
    	"popup" : {type : "sap.ui.core.Control", multiple : false, visibility : "hidden"}
	},
	associations : {
		"selectedItems" : {type : "sap.ui.core.Item", multiple : true, singularName : "selectedItem"}
	},
	events : {
		"selectionChange" : {}, 
		"selectionFinish" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.MultiComboBox with name <code>sClassName</code> 
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
 * @name sap.m.MultiComboBox.extend
 * @function
 */

sap.m.MultiComboBox.M_EVENTS = {'selectionChange':'selectionChange','selectionFinish':'selectionFinish'};


/**
 * Getter for property <code>maxWidth</code>.
 * Defines the maximum width of the text field.
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>maxWidth</code>
 * @public
 * @name sap.m.MultiComboBox#getMaxWidth
 * @function
 */

/**
 * Setter for property <code>maxWidth</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sMaxWidth  new value for property <code>maxWidth</code>
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#setMaxWidth
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * Aggregation of items to be displayed.
 * 
 * <strong>Note</strong>: this is the default aggregation for MultiComboBox.
 * @return {sap.ui.core.Item[]}
 * @public
 * @name sap.m.MultiComboBox#getItems
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
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.core.Item}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.core.Item} vItem the item to remove or its index or id
 * @return {sap.ui.core.Item} the removed item or null
 * @public
 * @name sap.m.MultiComboBox#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Item[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.MultiComboBox#removeAllItems
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
 * @name sap.m.MultiComboBox#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#destroyItems
 * @function
 */


/**
 * Provides getter and setter for the selected items from
 * the aggregation named items.
 * 
 * 
 * @return {string[]}
 * @public
 * @name sap.m.MultiComboBox#getSelectedItems
 * @function
 */

	
/**
 *
 * @param {string | sap.ui.core.Item} vSelectedItem
 *    Id of a selectedItem which becomes an additional target of this <code>selectedItems</code> association.
 *    Alternatively, a selectedItem instance may be given. 
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#addSelectedItem
 * @function
 */

/**
 * @param {int | string | sap.ui.core.Item} vSelectedItem the selectedItem to remove or its index or id
 * @return {string} the id of the removed selectedItem or null
 * @public
 * @name sap.m.MultiComboBox#removeSelectedItem
 * @function
 */

/**
 * @return {string[]} an array with the ids of the removed elements (might be empty)
 * @public
 * @name sap.m.MultiComboBox#removeAllSelectedItems
 * @function
 */

	
/**
 * Event is fired when selection of an item is changed.
 *  
 *
 * @name sap.m.MultiComboBox#selectionChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.ui.core.Item} oControlEvent.getParameters.changedItem Item which selection is changed
 * @param {boolean} oControlEvent.getParameters.selected Selection state: true if item is selected, false if
 *         item is not selected
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'selectionChange' event of this <code>sap.m.MultiComboBox</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.MultiComboBox</code>.<br/> itself. 
 *  
 * Event is fired when selection of an item is changed.
 *  
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.MultiComboBox</code>.<br/> itself.
 *
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#attachSelectionChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'selectionChange' event of this <code>sap.m.MultiComboBox</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#detachSelectionChange
 * @function
 */

/**
 * Fire event selectionChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'changedItem' of type <code>sap.ui.core.Item</code> Item which selection is changed</li>
 * <li>'selected' of type <code>boolean</code> Selection state: true if item is selected, false if
						item is not selected</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.MultiComboBox#fireSelectionChange
 * @function
 */


/**
 * Event is fired when user has finished a selection of items in a list box and list box has been closed. 
 *
 * @name sap.m.MultiComboBox#selectionFinish
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters

 * @param {sap.ui.core.Item} oControlEvent.getParameters.selectedItems The selected items which are selected after list box has been closed.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'selectionFinish' event of this <code>sap.m.MultiComboBox</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.MultiComboBox</code>.<br/> itself. 
 *  
 * Event is fired when user has finished a selection of items in a list box and list box has been closed. 
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.MultiComboBox</code>.<br/> itself.
 *
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#attachSelectionFinish
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'selectionFinish' event of this <code>sap.m.MultiComboBox</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiComboBox#detachSelectionFinish
 * @function
 */

/**
 * Fire event selectionFinish to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItems' of type <code>sap.ui.core.Item</code> The selected items which are selected after list box has been closed.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.MultiComboBox} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.MultiComboBox#fireSelectionFinish
 * @function
 */


/**
 * Indicates whether list box of the MultiComboBox is currently open. It returns True if list box is open and False if it is closed.
 *
 * @name sap.m.MultiComboBox.prototype.isOpen
 * @function

 * @type boolean
 * @public
 */


/**
 * Closes the list box of the MultiComboBox.
 *
 * @name sap.m.MultiComboBox.prototype.close
 * @function

 * @type sap.m.MultiComboBox
 * @public
 */


/**
 * Retrieves the first item from the aggregation named items, based on its key.
 *
 * @name sap.m.MultiComboBox.prototype.getItemByKey
 * @function
 * @param {string} 
 *         sKey
 *         An item key that identifies the item to be
 *         retrieved.

 * @type sap.ui.core.Item
 * @public
 */


/**
 * Sets selected items. Only items with valid keys are set as selected. Previous selection is removed.
 *
 * @name sap.m.MultiComboBox.prototype.setSelectedKeys
 * @function
 * @param {string[]} 
 *         aKeys
 *         An array of item keys that identifies the items to
 *         be set as selected.

 * @type sap.m.MultiComboBox
 * @public
 */


/**
 * Gets keys of selected items. Returns empty array if no items are selected.
 *
 * @name sap.m.MultiComboBox.prototype.getSelectedKeys
 * @function

 * @type string[]
 * @public
 */


/**
 * Adds selected items. Only items with valid keys are added as selected.
 *
 * @name sap.m.MultiComboBox.prototype.addSelectedKeys
 * @function
 * @param {string[]} 
 *         aKeys
 *         An array of item keys that identifies the items to be added as selected

 * @type sap.m.MultiComboBox
 * @public
 */


/**
 * Removes selected items. Only items with valid keys are removed.
 *
 * @name sap.m.MultiComboBox.prototype.removeSelectedKeys
 * @function
 * @param {string[]} 
 *         aKeys
 *         An array of item keys that identifies the items to be removed

 * @type sap.m.MultiComboBox
 * @public
 */


// Start of sap\m\MultiComboBox.js
jQuery.sap.require("sap.ui.core.EnabledPropagator");
jQuery.sap.require("sap.m.MultiComboBoxRenderer");
jQuery.sap.require("sap.m.Bar");
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.Popover");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.ui.core.IconPool");
jQuery.sap.require("jquery.sap.xml");
sap.ui.core.IconPool.insertFontFaceStyle();
sap.ui.core.EnabledPropagator.apply(sap.m.MultiComboBox.prototype, [true]);

/**
 * Initialization.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.init = function() {
	sap.m.InputBase.prototype.init.apply(this, arguments);

	this._setPopupType(sap.ui.Device.system.phone ? "Dialog" : "Popover");
	this._oList = this._createList();
	this._oTokenizer = this._createTokenizer();
	this._aCustomerKeys = [];
};

/**
 * Update and synchronize "selectedItems" association and the "selectedItems" in the List.
 * 
 * @param {sap.ui.core.Item |
 *          null} mOptions.item
 * @param {string}
 *          mOptions.id
 * @param {string}
 *          mOptions.key
 * @param {boolean}
 *          [mOptions.suppressInvalidate]
 * @param {boolean}
 *          [mOptions.listItemUpdated]
 * @param {boolean}
 *          [mOptions.fireChangeEvent]
 * @private
 */
sap.m.MultiComboBox.prototype._setSelectedItem = function(mOptions) {
	var aItems = this.getAggregation("items");

	if (mOptions.item && this._isItemSelected(mOptions.item)) {
		return;
	}

	if (aItems && this._getKeyOfItems(aItems).indexOf(mOptions.key) < 0) {
		return;
	}
	if (mOptions.item) {
		this.addAssociation("selectedItems", mOptions.item, mOptions.suppressInvalidate);

		if (mOptions.fireChangeEvent) {
			this.fireSelectionChange({
				selectedItem : mOptions.item,
				selected : true
			});
		}

		if (!mOptions.listItemUpdated && mOptions.item._oListItem) {
			// set the selected item in the List
			this._oList.setSelectedItem(mOptions.item._oListItem, true);
		}

		// Fill Tokenizer
		this._oTokenizer.addToken(new sap.m.Token({
			key : mOptions.key,
			text : mOptions.item.getText()
		}));

		this.setValue('');
	}
};

/**
 * Remove an item from "selectedItems" association and the "selectedItems" in the List.
 * 
 * @param {sap.ui.core.Item |
 *          null} mOptions.item
 * @param {string}
 *          mOptions.id
 * @param {string}
 *          mOptions.key
 * @param {boolean}
 *          [mOptions.suppressInvalidate]
 * @param {boolean}
 *          [mOptions.listItemUpdated]
 * @param {boolean}
 *          [mOptions.fireChangeEvent]
 * @private
 */
sap.m.MultiComboBox.prototype._removeSelectedItem = function(mOptions) {
	if (mOptions.item && !this._isItemSelected(mOptions.item)) {
		return;
	}

	if (mOptions.item) {
		this.removeAssociation("selectedItems", mOptions.item, mOptions.suppressInvalidate);

		if (mOptions.fireChangeEvent) {
			// fire the change event
			this.fireSelectionChange({
				selectedItem : mOptions.item,
				selected : false
			});
		}

		if (!mOptions.listItemUpdated && mOptions.item._oListItem) {
			// set the selected item in the List
			this._oList.setSelectedItem(mOptions.item._oListItem, false);
		}

		// Synch the Tokenizer
		if (!mOptions.tokenUpdated) {
			this._oTokenizer.removeToken(this._getTokenByKey(mOptions.key));
		}
	}
};

/**
 * Get items which match value of input field
 * 
 * @param {string}
 * @returns {sap.ui.core.Item[]}
 * @private
 */
sap.m.MultiComboBox.prototype._getSuggestedItems = function(sValue) {
	var aItems = [];
	this.getItems().forEach(function(oItem) {
		if (jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue)) {
			aItems.push(oItem);
		}
	}, this);
	return aItems;
};

/**
 * Get value of input field from DOM
 * 
 * @returns {string}
 * @private
 */
sap.m.MultiComboBox.prototype._getDomValue = function() {
	return jQuery(this.getFocusDomRef()).val();
};

/**
 * Calculate available width for the tokenizer
 * 
 * @private
 */
sap.m.MultiComboBox.prototype._setContainerSizes = function() {
	var oDomRef = this.getDomRef();
	if (!oDomRef) {
		return;
	}

	var $MultiComboBox = jQuery(oDomRef);
	var $ShadowDiv = jQuery($MultiComboBox.children(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "ShadowDiv")[0]);
	$ShadowDiv.text(this._getDomValue());
	var $InputContainer = jQuery($MultiComboBox.find(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "InputContainer")[0]);
	var $ScrollDiv = jQuery($MultiComboBox.find(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "ScrollContainer")[0]);

	var iTokenizerWidth = this._oTokenizer.$().outerWidth(true);
	var iInputWidth = $ShadowDiv.outerWidth();
	var iTotalWidth = $ScrollDiv.width();
	var iInnerWidth = iTokenizerWidth + iInputWidth;
	if (iInnerWidth < iTotalWidth) {
		iInputWidth = iTotalWidth - iTokenizerWidth;
	}

	var sWidth = (iInputWidth / parseFloat(sap.m.BaseFontSize)) + "rem";

	jQuery($InputContainer.find(".sapMInputBaseInner")[0]).css("width", sWidth);

	this._scrollToEnd();
};

/**
 * Get token instance for a specific token key
 * 
 * @param {string}
 *          sKey Key of sap.m.Token instances
 * @returns {sap.m.Token | null} Token instance, null if not found
 * @private
 */
sap.m.MultiComboBox.prototype._getTokenByKey = function(sKey) {
	var aTokens = this._oTokenizer.getTokens();
	for (var i = 0; aTokens && i < aTokens.length; i++) {
		if (sKey === aTokens[i].getKey()) {
			return aTokens[i];
		}
	}
	return null;
};

/**
 * Get key of each item from "aItems".
 * 
 * @param {array |
 *          null} aItems Array of sap.ui.core.Item
 * @returns {array}
 * @private
 */
sap.m.MultiComboBox.prototype._getKeyOfItems = function(aItems) {
	for (var i = 0, aKeys = []; aItems && i < aItems.length; i++) {
		aKeys[i] = aItems[i].getKey();
	}
	return aKeys;
};

/**
 * Get selected items from "aItems".
 * 
 * @param {array |
 *          null} aItems Array of sap.ui.core.Item
 * @returns {array}
 * @private
 */
sap.m.MultiComboBox.prototype._getSelectedItemsOf = function(aItems) {
	for (var i = 0, iLength = aItems.length, aSelectedItems = []; i < iLength; i++) {
		if (aItems[i]._oListItem.isSelected()) {
			aSelectedItems.push(aItems[i]);
		}
	}
	return aSelectedItems;
};

/**
 * Set property 'visible' for all items in the aggregation named <code>items</code>.
 * 
 * @param {boolean}
 *          bVisible
 * @private
 */
sap.m.MultiComboBox.prototype._setItemsToVisible = function(bVisible) {
	this.getItems().forEach(function(oItem) {
		if (oItem._oListItem) {
			oItem._oListItem.setVisible(bVisible);
		}
	}, this);
};

/**
 * Check whether an item is selected or not.
 * 
 * @param {sap.ui.core.Item}
 *          oItem
 * @returns {boolean} true if oItem is selected
 * @private
 */
sap.m.MultiComboBox.prototype._isItemSelected = function(oItem) {
	return (this.getSelectedItems().indexOf(oItem) > -1 ? true : false);
};

/**
 * Do not show placeholder in input field if at least one token exists. In case that no tokens exist the placeholder
 * should be shown but only if it was defined via property 'placeholder'.
 * 
 * @returns {string}
 * @private
 */
sap.m.MultiComboBox.prototype._getPlaceholder = function(oControl) {
	if (this._oTokenizer.getTokens().length > 0) {
		return "";
	}
	return this.getPlaceholder();
};

/**
 * @returns {sap.ui.core.Item[]} Array of visible items or empty array.
 * @private
 */
sap.m.MultiComboBox.prototype._getVisibleItems = function() {
	return this.getItems().filter(function(oItem) {
		return oItem._oListItem && oItem._oListItem.getVisible();
	});
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._getItemByListItem = function(oListItem) {
	if (!oListItem) {
		return null;
	}
	return this.getItemByKey(oListItem.data(sap.m.MultiComboBoxRenderer.CSS_CLASS + "ListItemKey"));
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._getLastSelectedItem = function() {
	var aTokens = this._oTokenizer.getTokens();
	var oToken = aTokens.length ? aTokens[aTokens.length - 1] : null;
	if (!oToken) {
		return null;
	}
	return this.getItemByKey(oToken.getKey());
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._getOrderedSelectedItems = function() {
	var aItems = [];
	for (var i = 0, aTokens = this._oTokenizer.getTokens(), iLength = aTokens.length; i < iLength; i++) {
		aItems[i] = this.getItemByKey(aTokens[i].getKey());
	}
	return aItems;
};

/**
 * Map an item type of sap.ui.core.Item to an item type of sap.m.StandardListItem.
 * 
 * @param {sap.ui.core.Item}
 *          oItem
 * @returns {sap.m.StandardListItem | null}
 * @private
 */
sap.m.MultiComboBox.prototype._mapItemToListItem = function(oItem) {
	if (!oItem) {
		return null;
	}
	var sListItem = sap.m.MultiComboBoxRenderer.CSS_CLASS + "Item";
	var sListItemEnabled = oItem.getEnabled() ? "Enabled" : "Disabled";
	var sListItemSelected = (this._isItemSelected(oItem)) ? sListItem + "Selected" : "";

	var oListItem = new sap.m.StandardListItem({
		title : oItem.getText(),
		type : oItem.getEnabled() ? sap.m.ListType.Active : sap.m.ListType.Inactive
	}).addStyleClass(sListItem + " " + sListItem + sListItemEnabled + " " + sListItemSelected);
	oListItem.data(sap.m.MultiComboBoxRenderer.CSS_CLASS + "ListItemKey", oItem.getKey());

	this._decorateListItem(oListItem);

	oItem._oListItem = oListItem;
	return oItem._oListItem;
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._getFocusedListItem = function() {
	var jFocusedElement = jQuery(':focus');
	var oFocusedElement = sap.ui.getCore().byId(jFocusedElement.attr('id'));
	if (this._oList && oFocusedElement
			&& jQuery.sap.containsOrEquals(this._oList.getFocusDomRef(), oFocusedElement.getFocusDomRef())) {
		return oFocusedElement;
	}
	return null;
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._getFocusedItem = function() {
	var oListItem = this._getFocusedListItem();
	return this._getItemByListItem(oListItem);
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._isRangeSelectionSet = function(oListItem) {
	var $ListItem = oListItem.getDomRef();
	return $ListItem.indexOf(sap.m.MultiComboBoxRenderer.CSS_CLASS + "ItemRangeSelection") > -1 ? true : false;
};
/**
 * Decorate a ListItem instance by adding some delegate methods.
 * 
 * @param {sap.m.StandardListItem}
 * @private
 */
sap.m.MultiComboBox.prototype._decorateListItem = function(oListItem) {
	oListItem.addDelegate({
		onkeyup : function(oEvent) {
			var oItem = null;
			// If an item is selected with SPACE inside of
			// suggest list the list
			// with all entries should be opened
			if (oEvent.which == jQuery.sap.KeyCodes.SPACE && this.isOpen() && this._isListInSuggestMode()) {
				this._setItemsToVisible(true);
				this.open();
				oItem = this._getLastSelectedItem();
				// Scrolls an item into the visual viewport
				if (oItem) {
					oItem._oListItem.focus();
				}
			}
		},
		onkeydown : function(oEvent) {
			var i = null, j = null;
			var oItemFirst = null, oItemLast = null, oItemFocused = null, aItems = [], aOrderedSelectedItems = [];

			// Paging inside the list via CTRL + SPACE is not
			// required, so
			// switch it out.
			if (oEvent.ctrlKey && oEvent.which == jQuery.sap.KeyCodes.SPACE) {
				oEvent.setMarked();
				oEvent.preventDefault();
				return null;
			}

			// Handle SHIFT + SPACE in order to select items
			// between last
			// selected item an current one.
			if (oEvent.shiftKey && oEvent.which == jQuery.sap.KeyCodes.SPACE) {
				aOrderedSelectedItems = this._getOrderedSelectedItems();
				oItemLast = this._getFocusedItem();
				j = aOrderedSelectedItems.indexOf(oItemLast);
				if (aOrderedSelectedItems.length && aOrderedSelectedItems.indexOf(oItemLast) > -1) {
					oItemFirst = aOrderedSelectedItems[aOrderedSelectedItems.length - 1];
					i = aOrderedSelectedItems.indexOf(oItemFirst);
					if (i == j) {
						aItems = aOrderedSelectedItems.splice(0, aOrderedSelectedItems.length);
					} else {
						aItems = aOrderedSelectedItems.splice(j + 1, i);
					}
					aItems.forEach(function(oItem) {
						this._removeSelectedItem({
							item : oItem,
							id : oItem.getId(),
							key : oItem.getKey(),
							fireChangeEvent : true,
							suppressInvalidate : true,
							listItemUpdated : false
						});
					}, this);
					return null;
				}
				oItemFirst = this._getLastSelectedItem();
				if (oItemFirst) {
					oItemLast = this._getItemByListItem(oEvent.srcControl);
					if (oItemLast) {
						i = this.indexOfItem(oItemFirst);
						j = this.indexOfItem(oItemLast);
						aItems = this.getItems().slice(Math.min(i, j), Math.max(i, j) + 1);
						if (i > j) {
							aItems.reverse();
						}
						aItems.forEach(function(oItem) {
							this.addSelectedItem(oItem);
						}, this);
					}
				}
				return null;
			}

			if (oEvent.shiftKey && oEvent.which == jQuery.sap.KeyCodes.ARROW_DOWN) {
				oItemFocused = this._getFocusedItem();
				return null;
			}

			// Handle when CTRL + A is pressed to select all
			// Note: at first this function should be called and
			// not the
			// ListItemBase
			if (oEvent.ctrlKey && oEvent.which == jQuery.sap.KeyCodes.A) {
				oEvent.setMarked();
				oEvent.preventDefault();

				var aVisibleItems = this._getVisibleItems();
				var aSelectedItems = this._getSelectedItemsOf(aVisibleItems);
				if (aSelectedItems.length !== aVisibleItems.length) {
					aVisibleItems.forEach(function(oItem) {
						this._setSelectedItem({
							item : oItem,
							id : oItem.getId(),
							key : oItem.getKey(),
							fireChangeEvent : true,
							suppressInvalidate : true,
							listItemUpdated : false
						});
					}, this);

				} else {
					aVisibleItems.forEach(function(oItem) {
						this._removeSelectedItem({
							item : oItem,
							id : oItem.getId(),
							key : oItem.getKey(),
							fireChangeEvent : true,
							suppressInvalidate : true,
							listItemUpdated : false
						});
					}, this);
				}
			}
		}
	}, true, this);
	oListItem.addEventDelegate({
		onsapshow : function(oEvent) {
			// Handle when F4 or Alt + DOWN arrow are pressed.
			oEvent.setMarked();
			// note: prevent browser address bar to be open in ie9, when F4 is
			// pressed
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
		},
		onsaphide : function(oEvent) {
			// Handle when Alt + UP arrow are pressed.
			this.onsapshow(oEvent);
		},
		onsapenter : function(oEvent) {
			// Handle when enter is pressed.
			oEvent.setMarked();
			this.close();
		},
		onsaphome : function(oEvent) {
			// Handle when Pos1 is pressed.
			oEvent.setMarked();
			// note: prevent document scrolling when Home key is pressed
			oEvent.preventDefault();
			var aVisibleItems = this._getVisibleItems();
			var oItem = aVisibleItems[0];
			// Scrolls an item into the visual viewport
			oItem._oListItem.focus();
		},
		onsapend : function(oEvent) {
			// Handle when End is pressed.
			oEvent.setMarked();
			// note: prevent document scrolling when End key is pressed
			oEvent.preventDefault();
			var aVisibleItems = this._getVisibleItems();
			var oItem = aVisibleItems[aVisibleItems.length - 1];
			// Scrolls an item into the visual viewport
			oItem._oListItem.focus();
		},
		onsapup : function(oEvent) {
			// Handle when key UP is pressed.
			oEvent.setMarked();
			// note: prevent document scrolling when arrow keys are pressed
			oEvent.preventDefault();

			var aVisibleItems = this._getVisibleItems();
			var oItemFirst = aVisibleItems[0];
			var oItemCurrent = jQuery(document.activeElement).control()[0];
			if (oItemCurrent === oItemFirst._oListItem) {
				this.focus();
				// Stop the propagation of event. Otherwise the list item sets
				// the focus and
				// it is not possible to come up from list box to input field.
				oEvent.stopPropagation(true);
			}
		},
		onfocusin : function(oEvent) {
			this.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Focused");
		},
		onfocusout : function(oEvent) {
			this.removeStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Focused");
		},
		onsapfocusleave : function(oEvent) {
			var oPopup = this.getAggregation("popup");
			var oControl = sap.ui.getCore().byId(oEvent.relatedControlId);
			if (oPopup && oControl && jQuery.sap.equal(oPopup.getFocusDomRef(), oControl.getFocusDomRef())) {
				// force the focus to stay in the list item field when
				// scrollbar is moving
				if (oEvent.srcControl) {
					oEvent.srcControl.focus();
				}
			}
		}
	}, this);

	// required workaround
	if (sap.ui.Device.support.touch) {
		oListItem.addEventDelegate({
			ontouchstart : function(oEvent) {
				oEvent.setMark("cancelAutoClose");
			}
		});
	}
};

/**
 * Fill the list of items.
 * 
 * @param {array}
 *          aItems An array with items type of sap.ui.core.Item.
 * @private
 */
sap.m.MultiComboBox.prototype._fillList = function(aItems) {
	if (!aItems) {
		return null;
	}

	for (var i = 0, oListItem, aItemsLength = aItems.length; i < aItemsLength; i++) {
		// add a private property to the added item containing a reference
		// to the corresponding mapped item
		oListItem = this._mapItemToListItem(aItems[i]);

		// add the mapped item type of sap.m.StandardListItem to the list
		this._oList.addAggregation("items", oListItem, true);

		// add active state to the selected item
		if (this._isItemSelected(aItems[i])) {
			this._oList.setSelectedItem(oListItem);
		}
	}
};

/**
 * Destroy the items in the List.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype._clearList = function() {
	if (this._oList) {
		this._oList.destroyAggregation("items", true);
	}
};

/**
 * Popup Factory singleton.
 * 
 * @param {string}
 *          sPopupType
 * @returns {sap.m.Popover|sap.m.Dialog}
 * @private
 */
sap.m.MultiComboBox.prototype._createPopupFactory = function(sPopupType) {
	var oPopup = this.getAggregation("popup");

	if (oPopup) {
		return oPopup;
	}

	oPopup = this["_create" + sPopupType]();

	// define a parent-child relationship between the MultiComboBox's field and
	// the
	// Pop-up (Popover or Dialog)
	this.setAggregation("popup", oPopup, true);

	// configuration
	oPopup.setHorizontalScrolling(false);
	oPopup.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Popup").attachBeforeOpen(this.onBeforeOpen, this)
			.attachAfterOpen(this.onAfterOpen, this).attachBeforeClose(this.onBeforeClose, this).attachAfterClose(
					this.onAfterClose, this).addEventDelegate({
				onBeforeRendering : this.onBeforeRenderingPopup,
				onAfterRendering : this.onAfterRenderingPopup
			}, this);

	return oPopup;
};

/**
 * Create an instance type of <code>sap.m.List</code>.
 * 
 * @returns {sap.m.List}
 * @private
 */
sap.m.MultiComboBox.prototype._createList = function() {

	// list to use inside the pop-up
	var oList = new sap.m.List({
		width : "100%",
		mode : sap.m.ListMode.MultiSelect,
		includeItemInSelection : true, // after clicking on an item the
		// checkbox is selected automaticaly
		rememberSelections : true
	// select handles selection in itself, so list should not remember selection
	}).addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "List").attachBrowserEvent("tap", this._handleItemPress,
			this).attachSelectionChange(this._handleSelectionLiveChange, this);

	return oList;
};

/**
 * @returns {boolean} true if the list has at least one not visible item, false if all items in the list are visible.
 * @private
 */
sap.m.MultiComboBox.prototype._isListInSuggestMode = function() {
	return this._oList.getItems().some(function(oItem) {
		return !oItem.getVisible();
	});
};

/**
 * Creates an instance type of <code>sap.m.Popover</code>.
 * 
 * @returns {sap.m.Popover}
 * @private
 */
sap.m.MultiComboBox.prototype._createPopover = function() {

	var oPopup = new sap.m.Popover({
		showHeader : false,
		placement : sap.m.PlacementType.Vertical,
		offsetX : 0,
		offsetY : 0,
		initialFocus : this,
		bounce : false
	});

	this._decoratePopover(oPopup);
	return oPopup;
};

/**
 * Decorate a Popover instance by adding some private methods.
 * 
 * @param {sap.m.Popover}
 * @private
 */
sap.m.MultiComboBox.prototype._decoratePopover = function(oPopover) {
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

	oPopover._setArrowPosition = function() {
	};

	oPopover._setMinWidth = function(sWidth) {
		this.getDomRef().style.minWidth = sWidth;
	};

	oPopover._setWidth = function(sWidth) {

		// set the width of the content
		if (sap.ui.Device.system.desktop || sap.ui.Device.system.tablet) {
			this.getContent()[0].setWidth(sWidth);
		}
	};

	oPopover.open = function() {
		// return this.openBy(self.getDomRef());
		var oDomRef = jQuery(self.getDomRef());
		var oBorder = oDomRef.find(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "Border");
		return this.openBy(oBorder[0]);
	};
};

/**
 * Creates an instance type of <code>sap.m.Dialog</code>.
 * 
 * @returns {sap.m.Dialog}
 * @private
 */
sap.m.MultiComboBox.prototype._createDialog = function() {
	var CSS_CLASS = sap.m.MultiComboBoxRenderer.CSS_CLASS;

	// initialize Dialog
	var oDialog = new sap.m.Dialog({
		stretchOnPhone : true,
		customHeader : new sap.m.Bar({
			contentLeft : new sap.m.InputBase({
				// value : "tbd",
				width : "100%",
				editable : false
			}).addStyleClass(CSS_CLASS + "Input")
		}).addStyleClass(CSS_CLASS + "Bar")
	});

	oDialog.getAggregation("customHeader").attachBrowserEvent("tap", function() {
		oDialog.close();
	}, this);

	return oDialog;
};

/**
 * Create an instance type of <code>sap.m.Tokenizer</code>.
 * 
 * @returns {sap.m.Tokenizer}
 * @private
 */
sap.m.MultiComboBox.prototype._createTokenizer = function() {
	var oTokenizer = new sap.m.Tokenizer({
		tokens : []
	}).attachTokenChange(this._handleTokenChange, this);
	// Set parent of Tokenizer, otherwise the Tokenizer renderer is not called.
	// Control.prototype.invalidate -> this.getUIArea() is null
	oTokenizer.setParent(this);

	oTokenizer.addEventDelegate({
		onAfterRendering : this._onAfterRenderingTokenizer
	}, this);

	this.getRenderer().placeholderToBeShown = function(oRm, oControl) {
		return (!oControl._oTokenizer.getTokens().length) && (oControl.getPlaceholder() ? true : false);
	};
	return oTokenizer;
};

/**
 * Setter for property <code>_sPopupType</code>.
 * 
 * @param {string}
 * @private
 */
sap.m.MultiComboBox.prototype._setPopupType = function(sPopupType) {
	this._sPopupType = sPopupType;
};

/**
 * Getter for property <code>_sPopupType</code>
 * 
 * @returns {string}
 * @private
 */
sap.m.MultiComboBox.prototype._getPopupType = function() {
	return this._sPopupType;
};

sap.m.MultiComboBox.prototype._handleItemPress = function(oEvent) {
	if (oEvent.target.children.length === 0) {
		this.close();
	}
};

/**
 * Handle the selection change event on the List.
 * 
 * @param {sap.ui.base.Event}
 *          oEvent
 * @private
 */
sap.m.MultiComboBox.prototype._handleSelectionLiveChange = function(oEvent) {
	var oListItem = oEvent.getParameter("listItem");
	var bIsSelected = oEvent.getParameter("selected");
	var oNewSelectedItem = this._getItemByListItem(oListItem);

	if (oListItem.getType() === "Inactive") { // workaround: this is needed
		// because the List fires the
		// "selectionChange" event on
		// inactive items
		return null;
	}

	// pre-assertion
	jQuery.sap.assert(oNewSelectedItem, "The corresponding mapped item was not found on " + this);

	if (!oNewSelectedItem) {
		return null;
	}
	var oParam = {
		item : oNewSelectedItem,
		id : oNewSelectedItem.getId(),
		key : oNewSelectedItem.getKey(),
		fireChangeEvent : true,
		suppressInvalidate : true,
		listItemUpdated : true
	};
	if (bIsSelected) {
		// update the selected item
		this.fireChangeEvent(oNewSelectedItem.getText());
		this._setSelectedItem(oParam);
	} else {
		this._removeSelectedItem(oParam);
	}
	// Scrolls an item into the visual viewport
	oListItem.focus();
};

/**
 * @param {sap.ui.base.Event}
 *          oEvent
 * @private
 */
sap.m.MultiComboBox.prototype._handleTokenChange = function(oEvent) {
	var sType = oEvent.getParameter("type");
	var oToken = oEvent.getParameter("token");
	var that = this;
	var oItem = null;

	if (sType !== sap.m.Tokenizer.TokenChangeType.Removed && sType !== sap.m.Tokenizer.TokenChangeType.Added) {
		return;
	}

	if (sType === sap.m.Tokenizer.TokenChangeType.Removed) {
		oItem = (oToken && this.getItemByKey(oToken.getKey()));
		if (oItem) {
			this._removeSelectedItem({
				item : oItem,
				id : oItem.getId(),
				key : oItem.getKey(),
				tokenUpdated : true,
				fireChangeEvent : true,
				suppressInvalidate : true
			});
			this.focus();
			this.fireChangeEvent('');
		}
	}

	if (this.isActive()) {
		var oDomRef = jQuery(this.getFocusDomRef());
		if (this._getPlaceholder() === "") {
			oDomRef[0].placeholder = "";
		} else {
			oDomRef[0].placeholder = this.getPlaceholder();
		}
	}

	// Fire selectionFinish also if tokens are deleted directly
	if (!this.isOpen()) {
		this.fireSelectionFinish({
			selectedItems : this.getSelectedItems()
		});
	}
};

/* =========================================================== */
/* Lifecycle methods */
/* =========================================================== */

/**
 * This event handler will be called before the MultiComboBox Popup is opened.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.onBeforeOpen = function() {
	var oPopup = this.getPopup(), fnPopupTypeBeforeOpen = this["_onBeforeOpen" + this._getPopupType()];

	// add the active state to the MultiComboBox's field
	this.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Pressed");

	oPopup.addContent(this._oList);

	this.addContent();

	if (fnPopupTypeBeforeOpen) {
		fnPopupTypeBeforeOpen.call(this);
	}
};

/**
 * This event handler will be called after the MultiComboBox's Pop-up is opened.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.onAfterOpen = function() {
};

/**
 * This event handler will be called before the MultiComboBox's Pop-up is closed.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.onBeforeClose = function() {

};

/**
 * This event handler will be called after the MultiComboBox's Pop-up is closed.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.onAfterClose = function() {

	// remove the active state of the MultiComboBox's field
	this.removeStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Pressed");

	// Show all items when the list will be opened next time
	this._setItemsToVisible(true);

	this.fireSelectionFinish({
		selectedItems : this.getSelectedItems()
	});
};

/**
 * Required adaptations after rendering of the Popover.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype._onAfterRenderingPopover = function() {
	var oPopover = this.getPopup();
	var sWidth = (this.$().outerWidth() / parseFloat(sap.m.BaseFontSize)) + "rem";

	// remove the Popover arrow
	oPopover._removeArrow();

	// position adaptations
	oPopover._setPosition();

	// width adaptations
	oPopover._setMinWidth(sap.ui.Device.system.phone ? "100%" : sWidth);
};

sap.m.MultiComboBox.prototype._onAfterRenderingTokenizer = function() {
	this._setContainerSizes();
};

/**
 * Required adaptations before rendering.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.onBeforeRendering = function() {
	sap.m.InputBase.prototype.onBeforeRendering.apply(this, arguments);

	var aItems = this.getItems();
	this._synchronizeSelectedItemAndKey(aItems);
	this._clearList();
	this._fillList(aItems);
};

/**
 * Required adaptations after rendering.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.onAfterRendering = function() {
	sap.m.InputBase.prototype.onAfterRendering.apply(this, arguments);

	// TODO Dom reference to Border-DIV
	// oPopover._oOpenBy = this.$().children("....")[0];
	var oPopover = this.getPopup();
	var oDomRef = jQuery(this.getDomRef());
	var oBorder = oDomRef.find(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "Border");
	oPopover._oOpenBy = oBorder[0];
};

/**
 * Cleans up before destruction.
 * 
 * @private
 */
sap.m.MultiComboBox.prototype.exit = function() {
	sap.m.InputBase.prototype.exit.apply(this, arguments);
	this._removeFocusableParentPopup(this._getParentPopup());

	if (this._oList) {
		this._oList.destroy();
		this._oList = null;
	}
};

/* =========================================================== */
/* Event handlers */
/* =========================================================== */
/**
 * Handle the input event on the control's input field.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.oninput = function(oEvent) {
	sap.m.InputBase.prototype.oninput.apply(this, arguments);

	var aItems = this.getItems();
	var oInputDomRef = oEvent.target;
	var sValue = oInputDomRef.value;
	var bVisibleItemFound = false;

	aItems.forEach(function(oItem) {
		var bMatch = sValue !== "" && (oItem.getText().toLowerCase().indexOf(sValue.toLowerCase(), 0) === 0);
		var oListItem = oItem._oListItem;
		if (sValue === "") {
			bMatch = true;
		}
		if (oListItem) {
			oListItem.setVisible(bMatch);
		}
		if (bMatch && !bVisibleItemFound) {
			bVisibleItemFound = true;
		}
	}, this);

	// First do manipulations on list items and then let the list renders
	if (this._getDomValue() === "" || !bVisibleItemFound) {
		this.close();
	} else {
		this.open();
	}

	this._setContainerSizes();
};

/**
 * Handle the touch start event on the MultiComboBox.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.ontouchstart = function(oEvent) {
	// mark the event for components that needs to know if the event was handled
	// by this control
	oEvent.setMarked();

	if (this.getEnabled() && this._isOpenArea(oEvent.target)) {
		// add the active state to the MultiComboBox's field
		this.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Pressed");
	}
};

/**
 * Handle the touch end event on the MultiComboBox.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.ontouchend = function(oEvent) {
	// mark the event for components that needs to know if the event was handled
	// by this control
	oEvent.setMarked();

	if (this.getEnabled() && (!this.isOpen() || !this.hasContent())) {
		this.removeStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Pressed");
	}
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype.onsapnext = function(oEvent) {

	if (oEvent.isMarked()) {
		return;
	}

	// find focused element
	var oFocusedElement = jQuery(document.activeElement).control()[0];

	if (!oFocusedElement) {
		// we cannot rule out that the focused element does not correspond to a SAPUI5 control in which case oFocusedElement
		// is undefined
		return;
	}

	if (oFocusedElement === this._oTokenizer || this._oTokenizer.$().find(oFocusedElement.$()).length > 0) {
		// focus is on the tokenizer or on some descendant of the tokenizer and the event was not handled ->
		// we therefore handle the event and focus the input element
		this.focus();
	}

};
/**
 * Handle the tap event on the MultiComboBox.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.ontap = function(oEvent) {
	// mark the event for components that needs to know if the event was handled
	// by the MultiComboBox
	oEvent.setMarked();

	if (!this.getEnabled() || !this.getEditable()) {
		return null;
	}

	if (this._isOpenArea(oEvent.target)) {
		if (this.isOpen()) {
			this.close();
			return null;
		}

		if (this.hasContent()) {
			this.open();
		}
	}
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype.onfocusin = function(oEvent) {
	this.addStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Focused");
	if (oEvent.target === this.getDomRef("arrow")) {
		// force the focus to stay in the input field
		this.focus();
	}
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype.onfocusout = function(oEvent) {
	this.removeStyleClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Focused");
	sap.m.InputBase.prototype.onfocusout.apply(this, arguments);
};

/**
 * Handle the focus leave event.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.onsapfocusleave = function(oEvent) {
	var oPopup = this.getAggregation("popup");
	var oControl = sap.ui.getCore().byId(oEvent.relatedControlId);
	var oFocusDomRef = oControl && oControl.getFocusDomRef();
	if (oPopup && oFocusDomRef) {
		if (jQuery.sap.equal(oPopup.getFocusDomRef(), oFocusDomRef)) {
			// force the focus to stay in the MultiComboBox field when scrollbar
			// is moving
			this.focus();
		}
	}
};

/* ----------------------------------------------------------- */
/* Keyboard handling */
/* ----------------------------------------------------------- */
/**
 * Handle when F4 or Alt + DOWN arrow are pressed.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.onsapshow = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	// by this control
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
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.onsaphide = sap.m.MultiComboBox.prototype.onsapshow;

/**
 * Handle when escape is pressed.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.onsapescape = function(oEvent) {

	oEvent.setMarked();
	if (this.isOpen()) {
		this.close();
	} else {
		// cancel changes and revert to the value which the Input field had when
		// it got the focus
		sap.m.InputBase.prototype.onsapescape.apply(this, arguments);
	}
};

/**
 * Handle when enter is pressed.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.onsapenter = function(oEvent) {
	sap.m.InputBase.prototype.onsapenter.apply(this, arguments);

	// mark the event for components that needs to know if the event was handled
	// by this control
	oEvent.setMarked();

	var aVisibleItems = [];
	if (this.isOpen()) {
		aVisibleItems = this._getVisibleItems();
	} else {
		aVisibleItems = this._getSuggestedItems(this.getValue());
	}
	if (aVisibleItems.length === 1) {
		var oItem = aVisibleItems[0];
		var oListItem = oItem._oListItem;
		var oParam = {
			item : oItem,
			id : oItem.getId(),
			key : oItem.getKey(),
			fireChangeEvent : true,
			suppressInvalidate : true,
			listItemUpdated : false
		};
		if (oListItem.getTitle().toLowerCase().indexOf(this._getDomValue().toLowerCase()) > -1) {
			if (oListItem.isSelected()) {
				this._removeSelectedItem(oParam);
				this.setValue('');
			} else {
				this._setSelectedItem(oParam);
			}
		}
	}

	this.close();
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype.onsapprevious = function(oEvent) {
	if (this.getCursorPosition() === 0) {
		if (oEvent.srcControl === this) {
			sap.m.Tokenizer.prototype.onsapprevious.apply(this._oTokenizer, arguments);
		}
	}
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype.onsaphome = function(oEvent) {
	var oDomRef = this.getDomRef();
	if (!oDomRef) {
		return;
	}
	var $MultiComboBox = jQuery(oDomRef);

	var oScrollDiv = $MultiComboBox.find(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "ScrollContainer")[0];

	oScrollDiv.scrollLeft = 0;
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype.onsapend = function(oEvent) {
	this._scrollToEnd();
};

/**
 * Handle when keyboard DOWN arrow is pressed.
 * 
 * @param {jQuery.Event}
 *          oEvent The event object.
 * @private
 */
sap.m.MultiComboBox.prototype.onsapdown = function(oEvent) {
	// mark the event for components that needs to know if the event was handled
	// by this control
	oEvent.setMarked();
	// note: prevent document scrolling when arrow keys are pressed
	oEvent.preventDefault();

	// If list is open then go to the first visible list item. Set this item
	// into the visual viewport.
	// If list is closed...
	if (this.isOpen()) {
		var oItem = this._getVisibleItems()[0];
		if (oItem) {
			oItem._oListItem.focus();
		}
	}
};

/**
 * Function is called on keyboard backspace, if cursor is in front of an token, token gets selected and deleted
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiComboBox.prototype.onsapbackspace = function(oEvent) {
	// Deleting characters, not tokens
	if (this.getCursorPosition() > 0 || this._getDomValue().length > 0) {
		return;
	}
	sap.m.Tokenizer.prototype.onsapbackspace.apply(this._oTokenizer, arguments);
};

/**
 * Function is called on delete keyboard input, deletes selected tokens
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiComboBox.prototype.onsapdelete = function(oEvent) {
	// do not return if everything is selected
	if (this.getValue() && !this._isCompleteTextSelected()) {
		return;
	}
	sap.m.Tokenizer.prototype.onsapdelete.apply(this._oTokenizer, arguments);
};

/**
 * Function is called on key down keyboard input
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiComboBox.prototype.onkeydown = function(oEvent) {
	sap.m.InputBase.prototype.onkeydown.apply(this, arguments);
	// only if there is no text
	if (this._getDomValue().length === 0 && oEvent.ctrlKey && oEvent.which === jQuery.sap.KeyCodes.A) {
		this._oTokenizer.focus();
		this._oTokenizer.selectAllTokens(true);
		oEvent.preventDefault();
	}
};

/**
 * Function is called on paste keyboard input
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiComboBox.prototype.onpaste = function(oEvent) {
	var sInputOld = oEvent.target.value;
	var sInputNew = "";
	if (oEvent.originalEvent && oEvent.originalEvent.clipboardData && oEvent.originalEvent.clipboardData.getData) {
		sInputNew = oEvent.originalEvent.clipboardData.getData('text/plain');
	}
	this._checkEnteredValue(sInputOld + sInputNew, oEvent); 
};
/**
 * Function is called on key pressed keyboard input
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiComboBox.prototype.onkeypress = function(oEvent) {
	if (jQuery.sap.isSpecialKey(oEvent)) {
		oEvent.preventDefault();
		return null;
	}
	var sInputOld = this._removeSelection(oEvent.target.value);
	var sInputNew = String.fromCharCode(oEvent.which);
	this._checkEnteredValue(sInputOld + sInputNew, oEvent);
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._removeSelection = function(sValue) {
	var oInput = this.getFocusDomRef();
	var iBegin = oInput.selectionStart;
	var iEnd = oInput.selectionEnd ? oInput.selectionEnd + 1 : oInput.selectionEnd;
	return sValue.slice(0, iBegin) + sValue.slice(iEnd);
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._checkEnteredValue = function(sText, oEvent) {
	if (!this._isItemExistsStartingText(sText)) {
		oEvent.preventDefault();
		var sValueState = this.getValueState();
		if (sValueState === sap.ui.core.ValueState.Error || sValueState === sap.ui.core.ValueState.Success
				|| sValueState === sap.ui.core.ValueState.Warning) {
			this.$().removeClass("sapMInputBase" + sValueState);
			jQuery.sap.delayedCall(300, this.$(), "addClass", ["sapMInputBase" + sValueState]);
		} else {
			this.$().addClass("sapMInputBaseError");
			jQuery.sap.delayedCall(300, this.$(), "removeClass", ["sapMInputBaseError"]);
		}
		return false;
	}
	return true;
};

/**
 * @private
 */
sap.m.MultiComboBox.prototype._scrollToEnd = function() {
	var oDomRef = this.getDomRef();
	if (!oDomRef) {
		return;
	}

	var $MultiComboBox = jQuery(oDomRef);
	var oScrollDiv = $MultiComboBox.find(sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS + "ScrollContainer")[0];
	var iScrollOffset = oScrollDiv.scrollWidth - jQuery(oScrollDiv).width();
	if (iScrollOffset < 0) {
		iScrollOffset = 0;
	}

	oScrollDiv.scrollLeft = iScrollOffset;
};

/**
 * Checks whether the provided element is the open area.
 * 
 * @param {Element}
 *          oDomRef
 * @returns {boolean}
 * @private
 */
sap.m.MultiComboBox.prototype._isOpenArea = function(oDomRef) {
	var oOpenAreaDomRef = this.getDomRef("arrow");
	return oOpenAreaDomRef && oOpenAreaDomRef.contains(oDomRef);
};

/**
 * Checks if provided text matches any item text
 * 
 * @private
 * @param {string}
 *          sText
 */
sap.m.MultiComboBox.prototype._isItemExistsStartingText = function(sText) {
	return this.getItems().some(function(oItem) {
		return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sText);
	});
};

/**
 * Functions returns the current input field's cursor position
 * 
 * @private
 * @return {integer} the cursor position
 */
sap.m.MultiComboBox.prototype.getCursorPosition = function() {
	return this._$input.cursorPos();
};
/**
 * Functions returns true if the input's text is completely selected
 * 
 * @private
 * @return {boolean} true if text is selected, otherwise false,
 */
sap.m.MultiComboBox.prototype._isCompleteTextSelected = function() {
	var oInput = this._$input[0];
	if (oInput.selectionStart !== 0 || oInput.selectionEnd !== this.getValue().length) {
		return false;
	}

	return true;
};
/* =========================================================== */
/* API methods */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* protected methods */
/* ----------------------------------------------------------- */

/**
 * This hook method can be used to add additional content.
 * 
 * @param {sap.m.Dialog |
 *          sap.m.Popover} [oPopup]
 * @protected
 * @name sap.m.MultiComboBox#addContent
 */
sap.m.MultiComboBox.prototype.addContent = function(oPopup) {
};

/**
 * Getter for the MultiComboBox's Pop-up.
 * 
 * @returns {object} Type sap.m.Dialog or sap.m.Popover
 * @protected
 */
sap.m.MultiComboBox.prototype.getPopup = function() {
	if (this.bIsDestroyed) {
		return null;
	}

	// initialize the ComboBox's Pop-up (Popover or Dialog)
	return this._createPopupFactory(this._getPopupType());
};

/**
 * Determines whether the MultiComboBox has content or not.
 * 
 * @returns {boolean}
 * @protected
 */
sap.m.MultiComboBox.prototype.hasContent = function() {
	return !!this.getItems().length;
};

/**
 * This hook method is called before the MultiComboBox's Pop-up is rendered.
 * 
 * @protected
 * @name sap.m.MultiComboBox#onBeforeRenderingPopup
 */
sap.m.MultiComboBox.prototype.onBeforeRenderingPopup = function() {
	var fnOnBeforeRenderingPopupType = this["_onBeforeRendering" + this._getPopupType()];

	this._removeFocusableParentPopup(this._getParentPopup());
	if (fnOnBeforeRenderingPopupType) {
		fnOnBeforeRenderingPopupType.call(this);
	}
};

/**
 * This hook method is called after the MultiComboBox's Pop-up is rendered.
 * 
 * @protected
 * @name sap.m.MultiComboBox#onAfterRenderingPopup
 */
sap.m.MultiComboBox.prototype.onAfterRenderingPopup = function() {
	var fnOnAfterRenderingPopupType = this["_onAfterRendering" + this._getPopupType()];

	this._addFocusableParentPopup(this._getParentPopup());
	if (fnOnAfterRenderingPopupType) {
		fnOnAfterRenderingPopupType.call(this);
	}
};

/**
 * Open the MultiComboBox's Pop-up.
 * 
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @protected
 * @name sap.m.MultiComboBox#open
 * @function
 */
sap.m.MultiComboBox.prototype.open = function() {
	var oPopup = this.getPopup();
	if (oPopup) {
		oPopup.open();
	}
	return this;
};

/* ----------------------------------------------------------- */
/* public methods */
/* ----------------------------------------------------------- */

/**
 * Adds some item <code>oItem</code> to the aggregation named <code>items</code>.
 * 
 * @param {sap.ui.core.Item}
 *          oItem The item is added; if empty, nothing is inserted.
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#addItem
 * @function
 */
sap.m.MultiComboBox.prototype.addItem = function(oItem) {
	this.addAggregation("items", oItem);
	if (this._oList) {
		this._oList.addItem(this._mapItemToListItem(oItem));
	}
	return this;
};

/**
 * Inserts an item into the aggregation named <code>items</code>.
 * 
 * @param {sap.ui.core.Item}
 *          oItem The item to insert; if empty, nothing is inserted.
 * @param {int}
 *          iIndex The <code>0</code>-based index the item should be inserted at; for a negative value of
 *          <code>iIndex</code>, the item is inserted at position 0; for a value greater than the current size of the
 *          aggregation, the item is inserted at the last position.
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#insertItem
 * @function
 */
sap.m.MultiComboBox.prototype.insertItem = function(oItem, iIndex) {
	this.insertAggregation("items", oItem, iIndex);
	if (this._oList) {
		this._oList.insertItem(this._mapItemToListItem(oItem), iIndex);
	}
	return this;
};

/**
 * Setter for association <code>selectedItems</code>.
 * 
 * @param {string[] |
 *          sap.ui.core.Item[] | null} aItems new values for association <code>selectedItems</code>. Array of
 *          sap.ui.core.Item Id which becomes the new target of this <code>selectedItems</code> association.
 *          Alternatively, an array of sap.ui.core.Item instance may be given or null.
 * 
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#setSelectedItems
 * @function
 */
sap.m.MultiComboBox.prototype.setSelectedItems = function(aItems) {
	if (!aItems || !aItems.length) {
		return this;
	}
	if (!jQuery.isArray(aItems)) {
		jQuery.sap.log
				.warning(
						'Warning: setSelectedItems() "aItems" has to be an array of sap.ui.core.Item instances or an array of valid sap.ui.core.Item Ids',
						this);
		return this;
	}
	aItems
			.forEach(
					function(oItem) {
						if (!(oItem instanceof sap.ui.core.Item) && (typeof oItem !== "string")) {
							jQuery.sap.log
									.warning(
											'Warning: setSelectedItems() "aItems" has to be an array of sap.ui.core.Item instances or an array of valid sap.ui.core.Item Ids',
											this);
							// Go to next item
							return;
						}
						if (typeof oItem === "string") {
							oItem = sap.ui.getCore().byId(oItem);
						}

						// Update and synchronize "selectedItems" association,
						// "selectedKey" and "selectedItemId" properties.
						this._setSelectedItem({
							item : oItem ? oItem : null,
							id : oItem ? oItem.getId() : "",
							key : oItem ? oItem.getKey() : "",
							suppressInvalidate : true
						});
					}, this);
	return this;
};
/**
 * Adds some item <code>oItem</code> to the association named <code>selectedItems</code>.
 * 
 * @param {sap.ui.core.Item}
 *          oItem The selected item to add; if empty, nothing is added.
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#addSelectedItem
 * @function
 */
sap.m.MultiComboBox.prototype.addSelectedItem = function(oItem) {
	if (!oItem) {
		return this;
	}
	if (typeof oItem === "string") {
		oItem = sap.ui.getCore().byId(oItem);
	}
	this._setSelectedItem({
		item : oItem ? oItem : null,
		id : oItem ? oItem.getId() : "",
		key : oItem ? oItem.getKey() : "",
		suppressInvalidate : true
	});
	return this;
};

/**
 * The item to remove from the association named <code>selectedItems</code>.
 * 
 * @param {sap.ui.core.Item |
 *          string} oItem The selected item or item id to remove. If empty, nothing is removed.
 * @returns {sap.ui.core.Item} The removed item or null.
 * @public
 * @name sap.m.MultiComboBox#removeSelectedItem
 * @function
 */
sap.m.MultiComboBox.prototype.removeSelectedItem = function(oItem) {
	if (!oItem) {
		return null;
	}
	if (typeof oItem === "string") {
		oItem = sap.ui.getCore().byId(oItem);
	}
	this._removeSelectedItem({
		item : oItem,
		id : oItem.getId(),
		key : oItem.getKey(),
		suppressInvalidate : true
	});
	return oItem;
};

/**
 * Removes all the entries in the association named <code>selectedItems</code>.
 * 
 * @returns {sap.ui.core.Item[]} The removed items or empty array.
 * @public
 * @name sap.m.MultiComboBox#removeAllSelectedItems
 * @function
 */
sap.m.MultiComboBox.prototype.removeAllSelectedItems = function() {
	var aItemRemoved = [];
	var aItems = this.getAssociation("selectedItems", []);
	aItems.forEach(function(oItem) {
		var oItemRemoved = this.removeSelectedItem(oItem);
		aItemRemoved.push(oItemRemoved);
	}, this);
	this._aCustomerKeys = [];
	return aItemRemoved;
};

/**
 * Removes an item from the aggregation named <code>items</code>.
 * 
 * @param {int |
 *          string | sap.ui.core.Item} oItem The item to remove or its index or id.
 * @returns {sap.ui.core.Item} The removed item or null.
 * @public
 * @name sap.m.MultiComboBox#removeItem
 * @function
 */
sap.m.MultiComboBox.prototype.removeItem = function(oItem) {

	oItem = this.removeAggregation("items", oItem);

	jQuery.sap.assert(oItem === null || (oItem._oListItem instanceof sap.m.StandardListItem));

	if (this._oList) {
		this._oList.removeItem(oItem && oItem._oListItem);
	}

	// If the removed item is selected remove it also from 'selectedItems'.
	this._removeSelectedItem({
		item : oItem,
		id : oItem.getId(),
		key : oItem.getKey(),
		suppressInvalidate : true,
		listItemUpdated : true
	});
	return oItem;
};

/**
 * Removes all the items in the aggregation named <code>items</code>.
 * 
 * @returns {sap.ui.core.Item[]} An array of sap.ui.core.Item of the removed items (might be empty).
 * @public
 * @name sap.m.MultiComboBox#removeAllItems
 * @function
 */
sap.m.MultiComboBox.prototype.removeAllItems = function() {
	var aItems = this.removeAllAggregation("items");
	this.removeAllSelectedItems();
	if (this._oList) {
		this._oList.removeAllItems();
	}
	return aItems;
};

/**
 * Remove an array of selected keys.
 * 
 * @param {array}
 *          aKeys Values to be removed from selected keys.
 * @returns {sap.ui.core.Item[]} Array of sap.ui.core.Item instances which are removed.
 * @public
 * @name sap.m.MultiComboBox#removeSelectedKeys
 * @function
 */
sap.m.MultiComboBox.prototype.removeSelectedKeys = function(aKeys) {
	var aItems = [], iIndex;
	if (!aKeys || !aKeys.length || !jQuery.isArray(aKeys)) {
		return aItems;
	}
	var oItem;
	aKeys.forEach(function(sKey) {
		oItem = this.getItemByKey(sKey);
		if (oItem) {
			this._removeSelectedItem({
				item : oItem ? oItem : null,
				id : oItem ? oItem.getId() : "",
				key : oItem ? oItem.getKey() : "",
				suppressInvalidate : true
			});
			aItems.push(oItem);
		}
		if (this._aCustomerKeys.length && (iIndex = this._aCustomerKeys.indexOf(sKey)) > -1) {
			this._aCustomerKeys.splice(iIndex, 1);
		}
	}, this);
	return aItems;
};

/**
 * Setter for property <code>selectedKeys</code>. Only items of existing keys are set as selected.
 * 
 * @param {array}
 *          aKeys New values for property <code>selectedKeys</code>.
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#setSelectedKeys
 * @function
 */
sap.m.MultiComboBox.prototype.setSelectedKeys = function(aKeys) {
	this.removeAllSelectedItems();
	this.addSelectedKeys(aKeys);
	return this;
};

/**
 * Add an array of selected keys.
 * 
 * @param {string[]}
 *          aKeys New values for property <code>selectedKeys</code>.
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#addSelectedKeys
 * @function
 */
sap.m.MultiComboBox.prototype.addSelectedKeys = function(aKeys) {
	if (!aKeys || !aKeys.length || !jQuery.isArray(aKeys)) {
		return this;
	}
	if (!jQuery.isArray(aKeys) || typeof aKeys[0] !== "string") {
		jQuery.sap.log.warning('Warning: addSelectedKeys() "aKeys" has to be an array of string', this);
		return this;
	}
	aKeys.forEach(function(sKey) {
		var oItem = this.getItemByKey(sKey);
		if (oItem) {
			this.addSelectedItem(oItem);
		} else if (sKey) {
			// If at this point of time aggregation 'items' does not exist we
			// have save provided key.
			this._aCustomerKeys.push(sKey);
		}
	}, this);
	return this;
};

/**
 * Retrieves the selected item keys.
 * 
 * @returns {array} The current target of the <code>selectedKeys</code> association.
 * @public
 * @name sap.m.MultiComboBox#getSelectedKeys
 * @function
 */
sap.m.MultiComboBox.prototype.getSelectedKeys = function() {
	var aItems = this.getSelectedItems() || [], aKeys = [];
	aItems.forEach(function(oItem) {
		aKeys.push(oItem.getKey());
	}, this);
	if (this._aCustomerKeys.length) {
		aKeys = aKeys.concat(this._aCustomerKeys);
	}
	return aKeys;
};

/**
 * Retrieves the selected item objects from the association named <code>selectedItems</code>.
 * 
 * @returns {array} Array of sap.ui.core.Item instances. The current target of the <code>selectedItems</code>
 *          association.
 * @public
 * @name sap.m.MultiComboBox#getSelectedItems
 * @function
 */
sap.m.MultiComboBox.prototype.getSelectedItems = function() {
	var aItems = [], aItemIds = this.getAssociation("selectedItems") || [];
	aItemIds.forEach(function(sItemId) {
		aItems.push(sap.ui.getCore().byId(sItemId));
	}, this);
	return aItems;
};

/**
 * Retrieves the item object from the aggregation named <code>items</code>, based on the item key value supplied.
 * 
 * @param {string}
 *          sKey An item key that specifies the item to retrieve.
 * @returns {sap.ui.core.Item | null}
 * @public
 * @name sap.m.MultiComboBox#getItemByKey
 * @function
 */
sap.m.MultiComboBox.prototype.getItemByKey = function(sKey) {
	for (var i = 0, aItems = this.getItems(); i < aItems.length; i++) {
		if (aItems[i].getKey() === sKey) {
			return aItems[i];
		}
	}

	return null;
};

sap.m.MultiComboBox.prototype.getWidth = function() {
	return this.getProperty("width") || "100%";
};
/**
 * Destroys all the items in the aggregation named <code>items</code>.
 * 
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#destroyItems
 * @function
 */
sap.m.MultiComboBox.prototype.destroyItems = function() {
	this.destroyAggregation("items");

	if (this._oList) {
		this._oList.destroyItems();
	}

	return this;
};

/**
 * Checks if the MultiComboBox's Pop-up is open. It returns true when the MultiComboBox's Pop-up is currently open, this
 * includes opening and closing animations, otherwise it returns false.
 * 
 * @returns {boolean} Determines whether the MultiComboBox is currently open (this includes opening and closing
 *          animations).
 * @public
 * @name sap.m.MultiComboBox#isOpen
 * @function
 */
sap.m.MultiComboBox.prototype.isOpen = function() {
	var oPopup = this.getAggregation("popup");

	return !!(oPopup && oPopup.isOpen());
};

/**
 * Closes the MultiComboBox's Pop-up.
 * 
 * @returns {sap.m.MultiComboBox} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.MultiComboBox#close
 * @function
 */
sap.m.MultiComboBox.prototype.close = function() {
	var oPopup = this.getAggregation("popup");

	if (oPopup) {
		oPopup.close();
	}

	this.focus();
	return this;
};

// Workaround for popup handling.
// Use-case: MultiComboBox is included inside of a popup. If then the
// MultiComboBox-Popup is closing then the outside popup should not be closed.
/**
 * @returns {object} $DomRef Popup in which the MultiComboBox control is included.
 * @private
 */
sap.m.MultiComboBox.prototype._getParentPopup = function() {
	var $MComboBox = this.$();
	return ($MComboBox && $MComboBox.closest("[data-sap-ui-popup]")) || null;
};

/**
 * @param {object}
 *          $DomRef
 * @private
 */
sap.m.MultiComboBox.prototype._addFocusableParentPopup = function($DomRef) {
	sap.m.MultiComboBox._publishEventToPopup({
		action : "add",
		child : this.getAggregation("popup"),
		parent : $DomRef
	});
};

/**
 * @param {object}
 *          $DomRef
 * @private
 */
sap.m.MultiComboBox.prototype._removeFocusableParentPopup = function($DomRef) {
	sap.m.MultiComboBox._publishEventToPopup({
		action : "remove",
		child : this.getAggregation("popup"),
		parent : $DomRef
	});
};

/**
 * Notify a focusable html element to <code>sap.ui.core.Popup</code>.
 * 
 * @param {object}
 *          mOptions
 * @private
 */
sap.m.MultiComboBox._publishEventToPopup = function(mOptions) {
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
 * Synchronize selected item and key.
 * 
 * @param {sap.ui.core.Item}
 *          oItem
 * @param {string}
 *          sKey
 * @param {array}
 *          [aItems]
 * @private
 */
sap.m.MultiComboBox.prototype._synchronizeSelectedItemAndKey = function(aItems) {

	// no items
	if (!aItems.length) {
		jQuery.sap.log.info(
				"Info: _synchronizeSelectedItemAndKey() the MultiComboBox control does not contain any item on ", this);
		return;
	}

	var aSelectedKeys = this.getSelectedKeys();
	var aKeyOfSelectedItems = this._getKeyOfItems(this.getSelectedItems());

	// the "selectedKey" property is not synchronized
	if (aSelectedKeys) {
		for (var i = 0, sKey = null, oItem = null, iIndex = null, iLength = aSelectedKeys.length; i < iLength; i++) {
			sKey = aSelectedKeys[i];
			if (aKeyOfSelectedItems.indexOf(sKey) > -1) {
				if (this._aCustomerKeys.length && (iIndex = this._aCustomerKeys.indexOf(sKey)) > -1) {
					this._aCustomerKeys.splice(iIndex, 1);
				}
				continue;
			}
			oItem = this.getItemByKey("" + sKey);
			// if the "selectedKey" has no corresponding aggregated item, no
			// changes will apply
			if (oItem) {
				if (this._aCustomerKeys.length && (iIndex = this._aCustomerKeys.indexOf(sKey)) > -1) {
					this._aCustomerKeys.splice(iIndex, 1);
				}
				this._setSelectedItem({
					item : oItem,
					id : oItem.getId(),
					key : oItem.getKey(),
					fireChangeEvent : false,
					suppressInvalidate : true,
					listItemUpdated : false
				});
			}
		}
		return;
	}

};
