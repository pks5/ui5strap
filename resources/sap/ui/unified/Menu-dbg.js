/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.Menu.
jQuery.sap.declare("sap.ui.unified.Menu");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Menu.
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
 * <li>{@link #getAriaDescription ariaDescription} : string</li>
 * <li>{@link #getMaxVisibleItems maxVisibleItems} : int (default: 0)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} <strong>(default aggregation)</strong> : sap.ui.unified.MenuItemBase[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.ui.unified.Menu#event:itemSelect itemSelect} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A container for menu items. When the space in the browser is not large enough to display all defined items, a scroll bar is provided.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.unified.Menu
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.ui.unified.Menu", { metadata : {

	publicMethods : [
		// methods
		"open", "close"
	],
	library : "sap.ui.unified",
	properties : {
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"ariaDescription" : {type : "string", group : "Accessibility", defaultValue : null},
		"maxVisibleItems" : {type : "int", group : "Behavior", defaultValue : 0}
	},
	defaultAggregation : "items",
	aggregations : {
		"items" : {type : "sap.ui.unified.MenuItemBase", multiple : true, singularName : "item"}
	},
	events : {
		"itemSelect" : {}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.Menu with name <code>sClassName</code> 
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
 * @name sap.ui.unified.Menu.extend
 * @function
 */

sap.ui.unified.Menu.M_EVENTS = {'itemSelect':'itemSelect'};


/**
 * Getter for property <code>enabled</code>.
 * 
 * Disabled menus have other colors than enabled ones, depending on customer settings.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.ui.unified.Menu#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#setEnabled
 * @function
 */


/**
 * Getter for property <code>ariaDescription</code>.
 * 
 * The label/description provided for screen readers
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>ariaDescription</code>
 * @public
 * @name sap.ui.unified.Menu#getAriaDescription
 * @function
 */

/**
 * Setter for property <code>ariaDescription</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sAriaDescription  new value for property <code>ariaDescription</code>
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#setAriaDescription
 * @function
 */


/**
 * Getter for property <code>maxVisibleItems</code>.
 * 
 * Max. number of items to be displayed before an overflow mechanimn appears. Values smaller than 1 mean infinite number of visible items.
 * The menu can not become larger than the screen height.
 *
 * Default value is <code>0</code>
 *
 * @return {int} the value of property <code>maxVisibleItems</code>
 * @public
 * @name sap.ui.unified.Menu#getMaxVisibleItems
 * @function
 */

/**
 * Setter for property <code>maxVisibleItems</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {int} iMaxVisibleItems  new value for property <code>maxVisibleItems</code>
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#setMaxVisibleItems
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * Aggregation of menu items
 * 
 * <strong>Note</strong>: this is the default aggregation for Menu.
 * @return {sap.ui.unified.MenuItemBase[]}
 * @public
 * @name sap.ui.unified.Menu#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.ui.unified.MenuItemBase}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.unified.MenuItemBase}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.unified.MenuItemBase} vItem the item to remove or its index or id
 * @return {sap.ui.unified.MenuItemBase} the removed item or null
 * @public
 * @name sap.ui.unified.Menu#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.unified.MenuItemBase[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.ui.unified.Menu#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.unified.MenuItemBase</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.unified.MenuItemBase}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.ui.unified.Menu#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#destroyItems
 * @function
 */


/**
 * 
 * Provides the application an alternative option to listen to select events. This event is only fired on the root menu of a menu hierarchy.
 * Note that there is also a select event available for MenuItem; if the current event is used, the select event of a MenuItem becomes redundant.
 *
 * @name sap.ui.unified.Menu#itemSelect
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.unified.MenuItemBase} oControlEvent.getParameters.item The selected item
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'itemSelect' event of this <code>sap.ui.unified.Menu</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.ui.unified.Menu</code>.<br/> itself. 
 *  
 * 
 * Provides the application an alternative option to listen to select events. This event is only fired on the root menu of a menu hierarchy.
 * Note that there is also a select event available for MenuItem; if the current event is used, the select event of a MenuItem becomes redundant.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.unified.Menu</code>.<br/> itself.
 *
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#attachItemSelect
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'itemSelect' event of this <code>sap.ui.unified.Menu</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Menu#detachItemSelect
 * @function
 */

/**
 * Fire event itemSelect to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'item' of type <code>sap.ui.unified.MenuItemBase</code> The selected item</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.unified.Menu} <code>this</code> to allow method chaining
 * @protected
 * @name sap.ui.unified.Menu#fireItemSelect
 * @function
 */


/**
 * Opens the menu
 *
 * @name sap.ui.unified.Menu#open
 * @function
 * @param {boolean} bWithKeyboard
 * 
 *         An indicator whether the first item shall be highlighted, or not. It is highlighted in the case that the menu is opened via keyboard.
 * @param {object} oOpenerRef
 * 
 *         DOMNode or sap.ui.core.Element that opens the menu; the DOMNode or sap.ui.core.Element will be focused again after the menu is closed. This parameter is optional.
 * @param {sap.ui.core.Dock} sMy
 * 
 *         The popup content's reference position for docking.
 *         See also sap.ui.core.Popup.Dock and sap.ui.core.Popup.open.
 * @param {sap.ui.core.Dock} sAt
 * 
 *         The 'of' element's reference point for docking to.
 *         See also sap.ui.core.Popup.Dock and sap.ui.core.Popup.open.
 * @param {object} oOf
 * 
 *         The DOM element or sap.ui.core.Element to dock to.
 *         See also sap.ui.core.Popup.open.
 * @param {string} sOffset
 * 
 *         The offset relative to the docking point, specified as a string with space-separated pixel values (e.g. "0 10" to move the popup 10 pixels to the right).
 *         See also sap.ui.core.Popup.open.
 * @param {sap.ui.core.Collision} sCollision
 * 
 *         The collision defines how the position of an element should be adjusted in case it overflows the window in some direction.
 *         See also sap.ui.core.Popup.open.
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Closes the menu
 *
 * @name sap.ui.unified.Menu#close
 * @function
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


// Start of sap\ui\unified\Menu.js
(function(window, undefined) {

jQuery.sap.require("sap.ui.unified.MenuItemBase");
jQuery.sap.require("sap.ui.core.Popup");
jQuery.sap.require("jquery.sap.script");

sap.ui.unified.Menu.prototype.init = function(){
	var that = this;
	this.bOpen = false;
	this.oOpenedSubMenu = null;
	this.oHoveredItem = null;
	this.oPopup = null; // Will be created lazily
	this.fAnyEventHandlerProxy = jQuery.proxy(function(oEvent){
		var oRoot = this.getRootMenu();
		if(oRoot != this || !this.bOpen || !this.getDomRef() || (oEvent.type != "mousedown" && oEvent.type != "touchstart")) {
			return;
		}
		oRoot.handleOuterEvent(this.getId(), oEvent); //TBD: standard popup autoclose
	}, this);
	this.fOrientationChangeHandler = function(){
		that.close();
	};
	this.bUseTopStyle = false;
};

/**
 * Does all the cleanup when the Menu is to be destroyed.
 * Called from Element's destroy() method.
 * @private
 */
sap.ui.unified.Menu.prototype.exit = function(){
	if(this.oPopup){
		this.oPopup.detachOpened(this._menuOpened, this);
		this.oPopup.detachClosed(this._menuClosed, this);
		this.oPopup.destroy();
		delete this.oPopup;
	}
	
	jQuery.sap.unbindAnyEvent(this.fAnyEventHandlerProxy);
	if(this._bOrientationChangeBound){
		jQuery(window).unbind("orientationchange", this.fOrientationChangeHandler);
		this._bOrientationChangeBound = false;
	}
	
	// Cleanup
	this._resetDelayedRerenderItems();
};

/**
 * Called when the control or its children are changed.
 * @private
 */
sap.ui.unified.Menu.prototype.invalidate = function(oOrigin){
	if(oOrigin instanceof sap.ui.unified.MenuItemBase && this.getDomRef()){
		this._delayedRerenderItems();
	}else{
		sap.ui.core.Control.prototype.invalidate.apply(this, arguments);
	}
};

/**
 * Called before rendering starts by the renderer
 * @private
 */
sap.ui.unified.Menu.prototype.onBeforeRendering = function() {
	this._resetDelayedRerenderItems();
};

/**
 * Called when the rendering is complete
 * @private
 */
sap.ui.unified.Menu.prototype.onAfterRendering = function() {
	var aItems = this.getItems();
	var item = -1;
	
	for(var i=0; i<aItems.length; i++){
		if(aItems[i].onAfterRendering && aItems[i].getDomRef()){
			item = i;
			aItems[i].onAfterRendering();
		}
	}
	
	if(this.oHoveredItem) {
		this.oHoveredItem.hover(true, this);
	}
	
	var iMaxVisibleItems = this.getMaxVisibleItems();
	var iMaxHeight = document.documentElement.clientHeight-10;
	if(iMaxVisibleItems > 0 && item >= 0){
		iMaxHeight = Math.min(iMaxHeight, aItems[item].$().outerHeight(true) * iMaxVisibleItems);
	}
	
	if(this.$().outerHeight(true) > iMaxHeight){
		this.$().css("max-height", iMaxHeight+"px").toggleClass("sapUiMnuScroll", true);
	}
};


//****** API Methods ******

sap.ui.unified.Menu.prototype.addItem = function(oItem){
	this.addAggregation("items", oItem, !!this.getDomRef());
	this._delayedRerenderItems();
	return this;
};

sap.ui.unified.Menu.prototype.insertItem = function(oItem, idx){
	this.insertAggregation("items", oItem, idx, !!this.getDomRef());
	this._delayedRerenderItems();
	return this;
};

sap.ui.unified.Menu.prototype.removeItem = function(oItem){
	this.removeAggregation("items", oItem, !!this.getDomRef());
	this._delayedRerenderItems();
	return this;
};

sap.ui.unified.Menu.prototype.removeAllItems = function(){
	var oRes = this.removeAllAggregation("items", !!this.getDomRef());
	this._delayedRerenderItems();
	return oRes;
};

sap.ui.unified.Menu.prototype.destroyItems = function(){
	this.destroyAggregation("items", !!this.getDomRef());
	this._delayedRerenderItems();
	return this;
};

sap.ui.unified.Menu.prototype._delayedRerenderItems = function(){
	if(!this.getDomRef()){
		return;
	}
	this._resetDelayedRerenderItems();
	
	this._itemRerenderTimer = jQuery.sap.delayedCall(0, this, function(){
		var oDomRef = this.getDomRef();
		if(oDomRef){
			var oRm = sap.ui.getCore().createRenderManager();
			sap.ui.unified.MenuRenderer.renderItems(oRm, this);
			oRm.flush(oDomRef);
			oRm.destroy();
			this.onAfterRendering();
			this.getPopup()._applyPosition(this.getPopup()._oLastPosition);
		}
	});
};

sap.ui.unified.Menu.prototype._resetDelayedRerenderItems = function(){
	if(this._itemRerenderTimer){
		jQuery.sap.clearDelayedCall(this._itemRerenderTimer);
		delete this._itemRerenderTimer;
	}
};


sap.ui.unified.Menu.prototype.open = function(bWithKeyboard, oOpenerRef, my, at, of, offset, collision){
	if(this.bOpen) {
		return;
	}
	
	setItemToggleState(this, true);

	this.bOpen = true;
	this.oOpenerRef = oOpenerRef;

	// Open the sap.ui.core.Popup
	this.getPopup().open(0, my, at, of, offset || "0 0", collision || "_sapUiCommonsMenuFlip _sapUiCommonsMenuFlip", true);

	// Set the tab index of the menu and focus
	var oDomRef = this.getDomRef();
	jQuery(oDomRef).attr("tabIndex", 0).focus();
	
	// Mark the first item when using the keyboard
	if (bWithKeyboard) {
		this.setHoveredItem(this.getNextVisibleItem(-1));
	}

	jQuery.sap.bindAnyEvent(this.fAnyEventHandlerProxy);
	if(sap.ui.Device.support.orientation && this.getRootMenu() === this){
		jQuery(window).bind("orientationchange", this.fOrientationChangeHandler);
		this._bOrientationChangeBound = true;
	}
};

/**
 * This function is called when the Menu was opened.
 *
 * @since 1.17.0
 * @private
 */ 
sap.ui.unified.Menu.prototype._menuOpened = function() {
	fnIe8RepaintBug(this);
};

sap.ui.unified.Menu.prototype.close = function() {
	if(!this.bOpen || sap.ui.unified.Menu._dbg /*Avoid closing for debugging purposes*/) {
		return;
	}
	
	setItemToggleState(this, false);
	
	// Remove fixed flag if it existed
	delete this._bFixed;

	jQuery.sap.unbindAnyEvent(this.fAnyEventHandlerProxy);
	if(this._bOrientationChangeBound){
		jQuery(window).unbind("orientationchange", this.fOrientationChangeHandler);
		this._bOrientationChangeBound = false;
	}

	this.bOpen = false;
	// Close all sub menus if there are any
	if(this.oOpenedSubMenu) {
		this.oOpenedSubMenu.close();
	}

	// Reset the hover state
	this.setHoveredItem();

	// Reset the tab index of the menu and focus the opener (if there is any)
	jQuery(this.getDomRef()).attr("tabIndex", -1);

	// Close the sap.ui.core.Popup
	this.getPopup().close(0);

	//Remove the Menus DOM after it is closed
	this._resetDelayedRerenderItems();
	this.$().remove();
	this.bOutput = false;

	if(this.isSubMenu()){
		this.getParent().getParent().oOpenedSubMenu = null;
	}
};

/**
 * This function is called when the Menu was closed.
 *
 * @since 1.17.0
 * @private
 */ 
sap.ui.unified.Menu.prototype._menuClosed = function() {
	//TBD: standard popup autoclose: this.close(); //Ensure proper cleanup
	if (this.oOpenerRef) {
		if (!this.ignoreOpenerDOMRef) {
			try {
				this.oOpenerRef.focus();
			} catch(e) {
				jQuery.sap.log.warning("Menu.close cannot restore the focus on opener " + this.oOpenerRef + ", " + e);
			}
		}
		this.oOpenerRef = undefined;
	}
};

//****** Event Handlers ******

sap.ui.unified.Menu.prototype.onclick = function(oEvent){
	this.selectItem(this.getItemByDomRef(oEvent.target), false, !!(oEvent.metaKey || oEvent.ctrlKey));
	oEvent.preventDefault();
	oEvent.stopPropagation();
};


sap.ui.unified.Menu.prototype.onsapnext = function(oEvent){
	//right or down (RTL: left or down)
	if(oEvent.keyCode != jQuery.sap.KeyCodes.ARROW_DOWN){
		//Go to sub menu if available
		if(this.oHoveredItem && this.oHoveredItem.getSubmenu() && this.checkEnabled(this.oHoveredItem)){
			this.openSubmenu(this.oHoveredItem, true);
			return;
		}
	}

	//Go to the next visible item
	var iIdx = this.oHoveredItem ? this.indexOfAggregation("items", this.oHoveredItem) : -1;
	this.setHoveredItem(this.getNextVisibleItem(iIdx));
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onsapprevious = function(oEvent){
	//left or up (RTL: right or up)
	if(oEvent.keyCode != jQuery.sap.KeyCodes.ARROW_UP){
		//Go to parent menu if this is a sub menu
		if(this.isSubMenu()){
			this.close();
			oEvent.preventDefault();
			oEvent.stopPropagation();
			return;
		}
	}

	//Go to the previous visible item
	var iIdx = this.oHoveredItem ? this.indexOfAggregation("items", this.oHoveredItem) : -1;
	this.setHoveredItem(this.getPreviousVisibleItem(iIdx));
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onsaphome = function(oEvent){
	//Go to the first visible item
	var aItems = this.getItems();
	var oItem = null;
	for(var i=0; i<aItems.length; i++){
		if(aItems[i].getVisible()){
			oItem = aItems[i];
			break;
		}
	}

	this.setHoveredItem(oItem);
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onsapend = function(oEvent){
	//Go to the last visible item
	var aItems = this.getItems();
	var oItem = null;
	for(var i=aItems.length-1; i>=0; i--){
		if(aItems[i].getVisible()){
			oItem = aItems[i];
			break;
		}
	}

	this.setHoveredItem(oItem);
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onsapselect = function(oEvent){
	this._sapSelectOnKeyDown = true;
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onkeyup = function(oEvent){
	//like sapselect but on keyup:
	//Using keydown has the following side effect:
	//If the selection leads to a close of the menu and the focus is restored to the caller (e.g. a button)
	//the keyup is fired on the caller (in case of a button a click event is fired there in FF -> Bad!)
	//The attribute _sapSelectOnKeyDown is used to avoid the problem the other way round (Space is pressed
	//on Button which opens the menu and the space keyup immediately selects the first item)
	if(!this._sapSelectOnKeyDown){
		return;
	}else{
		this._sapSelectOnKeyDown = false;
	}
	if(!jQuery.sap.PseudoEvents.sapselect.fnCheck(oEvent)) {
		return;
	}
	this.selectItem(this.oHoveredItem, true, false);
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onsapbackspace = function(oEvent){
	if(jQuery(oEvent.target).prop("tagName") != "INPUT"){
		oEvent.preventDefault(); //CSN 4537657 2012: Stop browser history navigation
	}
};
sap.ui.unified.Menu.prototype.onsapbackspacemodifiers = sap.ui.unified.Menu.prototype.onsapbackspace;

sap.ui.unified.Menu.prototype.onsapescape = function(oEvent){
	this.close();
	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.ui.unified.Menu.prototype.onsaptabnext = sap.ui.unified.Menu.prototype.onsapescape;
sap.ui.unified.Menu.prototype.onsaptabprevious = sap.ui.unified.Menu.prototype.onsapescape;

sap.ui.unified.Menu.prototype.onmouseover = function(oEvent){
	if(!sap.ui.Device.system.desktop){
		return;
	}
	var oItem = this.getItemByDomRef(oEvent.target);
	if(!this.bOpen || !oItem || oItem == this.oHoveredItem) {
		return;
	}

	if(this.oOpenedSubMenu && jQuery.sap.containsOrEquals(this.oOpenedSubMenu.getDomRef(), oEvent.target)) {
		return;
	}

	this.setHoveredItem(oItem);

	if (this.oOpenedSubMenu && !this.oOpenedSubMenu._bFixed) {
		this.oOpenedSubMenu.close();
		this.oOpenedSubMenu = null;
	}

	if(jQuery.sap.checkMouseEnterOrLeave(oEvent, this.getDomRef())){
		this.getDomRef().focus();
	}

	if(this.checkEnabled(oItem)) {
		this.openSubmenu(oItem, false, true);
	}
};

sap.ui.unified.Menu.prototype.onmouseout = function(oEvent){
	if(!sap.ui.Device.system.desktop){
		return;
	}
	fnIe8RepaintBug(this);
	
	if(jQuery.sap.checkMouseEnterOrLeave(oEvent, this.getDomRef())){
		if(!this.oOpenedSubMenu || !this.oOpenedSubMenu.getParent() === this.oHoveredItem) {
			this.setHoveredItem(null);
		}
	}
};

/**
 * Handles the onsapfocusleave event
 * @param {jQuery.Event} oEvent The browser event
 * @private
 */
sap.ui.unified.Menu.prototype.onsapfocusleave = function(oEvent){
	// Only the deepest opened sub menu should handle the event or ignore the event from an item
	if(this.oOpenedSubMenu || !this.bOpen) {
		return;
	}
	this.getRootMenu().handleOuterEvent(this.getId(), oEvent); //TBD: standard popup autoclose
};

//****** Helper Methods ******

sap.ui.unified.Menu.prototype.handleOuterEvent = function(oMenuId, oEvent){
	//See sap.ui.core.Popup implementation: Target is to use autoclose mechanismn of the popup
	//but currently there autoclose only works for 2 hierarchy levels and not for n as needed by the menu
	//-> This function and all its callers are obsolete when switching later to standard popup autoclose
	//   (all needed further code locations for that change are marked with "TBD: standard popup autoclose")
	var isInMenuHierarchy = false,
		touchEnabled = this.getPopup().touchEnabled;
	
	if (oEvent.type == "mousedown" || oEvent.type == "touchstart"){
		// Suppress the delayed mouse event from mobile browser
		if(touchEnabled && (oEvent.isMarked("delayedMouseEvent") || oEvent.isMarked("cancelAutoClose"))){
			return;
		}
		var currentMenu = this;
		while(currentMenu && !isInMenuHierarchy){
			if(jQuery.sap.containsOrEquals(currentMenu.getDomRef(), oEvent.target)){
				isInMenuHierarchy = true;
			}
			currentMenu = currentMenu.oOpenedSubMenu;
		}
	}else if (oEvent.type == "sapfocusleave"){
		if(touchEnabled){
			return;
		}
		if(oEvent.relatedControlId){
			var currentMenu = this;
			while(currentMenu && !isInMenuHierarchy){
				if((currentMenu.oOpenedSubMenu && currentMenu.oOpenedSubMenu.getId() == oEvent.relatedControlId)
						|| jQuery.sap.containsOrEquals(currentMenu.getDomRef(), jQuery.sap.byId(oEvent.relatedControlId).get(0))){
					isInMenuHierarchy = true;
				}
				currentMenu = currentMenu.oOpenedSubMenu;
			}
		}
	}

	if(!isInMenuHierarchy) {
		this.ignoreOpenerDOMRef = true;
		this.close();
		this.ignoreOpenerDOMRef = false;
	}
};

sap.ui.unified.Menu.prototype.getItemByDomRef = function(oDomRef){
	var oItems = this.getItems(),
		iLength = oItems.length;
	for(var i=0;i<iLength;i++){
		var oItem = oItems[i],
			oItemRef = oItem.getDomRef();
		if(jQuery.sap.containsOrEquals(oItemRef, oDomRef)) {
			return oItem;
		}
	}
	return null;
};

sap.ui.unified.Menu.prototype.selectItem = function(oItem, bWithKeyboard, bCtrlKey){
	if(!oItem || !(oItem instanceof sap.ui.unified.MenuItemBase && this.checkEnabled(oItem))) {
		return;
	}

	var oSubMenu = oItem.getSubmenu();

	if(!oSubMenu){
		// This is a normal item -> Close all menus and fire event.
		this.getRootMenu().close();
	}else{
		if(!sap.ui.Device.system.desktop && this.oOpenedSubMenu === oSubMenu){
			this.oOpenedSubMenu.close();
			this.oOpenedSubMenu = null;
		}else{
			// Item with sub menu was triggered -> Open sub menu and fire event.
			this.openSubmenu(oItem, bWithKeyboard);
		}
	}

	oItem.fireSelect({item: oItem, ctrlKey: bCtrlKey});
	this.getRootMenu().fireItemSelect({item: oItem});
};

sap.ui.unified.Menu.prototype.isSubMenu = function(){
	return this.getParent() && this.getParent().getParent && this.getParent().getParent() instanceof sap.ui.unified.Menu;
};

sap.ui.unified.Menu.prototype.getRootMenu = function(){
	var oMenu = this;
	while(oMenu.isSubMenu()){
		oMenu = oMenu.getParent().getParent();
	}
	return oMenu;
};

sap.ui.unified.Menu.prototype.getMenuLevel = function(){
	var iLevel = 1;
	var oMenu = this;
	while(oMenu.isSubMenu()){
		oMenu = oMenu.getParent().getParent();
		iLevel++;
	}
	return iLevel;
};

sap.ui.unified.Menu.prototype.getPopup = function (){
	if(!this.oPopup){
		this.oPopup = new sap.ui.core.Popup(this, false, true, false); // content, modal, shadow, autoclose (TBD: standard popup autoclose)
		this.oPopup.setDurations(0, 0);
		this.oPopup.attachOpened(this._menuOpened, this);
		this.oPopup.attachClosed(this._menuClosed, this);
	}
	return this.oPopup;
};

sap.ui.unified.Menu.prototype.setHoveredItem = function(oItem){
	if(this.oHoveredItem) {
		this.oHoveredItem.hover(false, this);
	}

	if(!oItem){
		this.oHoveredItem = null;
		jQuery(this.getDomRef()).removeAttr("aria-activedescendant");
		return;
	}

	this.oHoveredItem = oItem;
	oItem.hover(true, this);
	if(sap.ui.getCore().getConfiguration().getAccessibility()) {
		jQuery(this.getDomRef()).attr("aria-activedescendant", oItem.getId());
	}
};

sap.ui.unified.Menu.prototype.openSubmenu = function(oItem, bWithKeyboard, bWithHover){
	var oSubMenu = oItem.getSubmenu();
	if(!oSubMenu) {
		return;
	}

	if(this.oOpenedSubMenu && this.oOpenedSubMenu !== oSubMenu){
		// Another sub menu is open and has not been fixed. Close it at first.
		this.oOpenedSubMenu.close();
		this.oOpenedSubMenu = null;
	}
	
	if (this.oOpenedSubMenu) {
		// Already open. Keep open, bring to front and fix/unfix menu...

		// Fix/Unfix Menu if clicked. Do not change status if just hovering over
		this.oOpenedSubMenu._bFixed = 
			   (bWithHover && this.oOpenedSubMenu._bFixed) 
			|| (!bWithHover && !this.oOpenedSubMenu._bFixed);
		
		this.oOpenedSubMenu._bringToFront();
	} else {
		// Open the sub menu
		this.oOpenedSubMenu = oSubMenu;
		var eDock = sap.ui.core.Popup.Dock;
		oSubMenu.open(bWithKeyboard, this, eDock.BeginTop, eDock.EndTop, oItem, "0 0");
	}
};

/**
 * Brings this menu to the front of the menu stack.
 * This simulates a mouse-event and raises the z-index which is internally tracked by the Popup.
 * 
 * @private
 */
sap.ui.unified.Menu.prototype._bringToFront = function() {
	// This is a hack. We "simulate" a mouse-down-event on the submenu so that it brings itself
	// to the front.
	jQuery.sap.byId(this.getPopup().getId()).mousedown();
};

sap.ui.unified.Menu.prototype.checkEnabled = function(oItem){
	fnIe8RepaintBug(this);
	return oItem && oItem.getEnabled() && this.getEnabled();
};

sap.ui.unified.Menu.prototype.getNextVisibleItem = function(iIdx){
	var oItem = null;
	var aItems = this.getItems();

	// At first, start with the next index
	for(var i=iIdx+1; i<aItems.length; i++){
		if(aItems[i].getVisible()){
			oItem = aItems[i];
			break;
		}
	}

	// If nothing found, start from the beginning
	if(!oItem){
		for(var i=0; i<=iIdx; i++){
			if(aItems[i].getVisible()){
				oItem = aItems[i];
				break;
			}
		}
	}

	return oItem;
};

sap.ui.unified.Menu.prototype.getPreviousVisibleItem = function(iIdx){
	var oItem = null;
	var aItems = this.getItems();

	// At first, start with the previous index
	for(var i=iIdx-1; i>=0; i--){
		if(aItems[i].getVisible()){
			oItem = aItems[i];
			break;
		}
	}

	// If nothing found, start from the end
	if(!oItem){
		for(var i=aItems.length-1; i>=iIdx; i--){
			if(aItems[i].getVisible()){
				oItem = aItems[i];
				break;
			}
		}
	}

	return oItem;
};

sap.ui.unified.Menu.prototype.setRootMenuTopStyle = function(bUseTopStyle){
	this.getRootMenu().bUseTopStyle = bUseTopStyle;
	sap.ui.unified.Menu.rerenderMenu(this.getRootMenu());
};


sap.ui.unified.Menu.rerenderMenu = function(oMenu){
	var aItems = oMenu.getItems();
	for(var i=0; i<aItems.length; i++){
		var oSubMenu = aItems[i].getSubmenu();
		if(oSubMenu) {
			sap.ui.unified.Menu.rerenderMenu(oSubMenu);
		}
	}

	oMenu.invalidate();
	oMenu.rerender();
};


///////////////////////////////////////// Hidden Functions /////////////////////////////////////////

function setItemToggleState(oMenu, bOpen){
	var oParent = oMenu.getParent();
	if(oParent && oParent instanceof sap.ui.unified.MenuItemBase){
		oParent.onSubmenuToggle(bOpen);
	}
};


//IE 8 repainting bug when hovering over MenuItems with IconFont
var fnIe8RepaintBug = function() {};
if (sap.ui.Device.browser.internet_explorer && sap.ui.Device.browser.version < 9) {
	fnIe8RepaintBug = function(oMenu, iDelay) {
		if (iDelay === undefined) {
			iDelay = 50;
		}
		
		
		/* In case of perdormance issues, the commented code around the delayedCall might help:
		jQuery.sap.clearDelayedCall(oMenu.data("delayedRepaintId"));
		var iDelayedId =  */ 
		jQuery.sap.delayedCall(iDelay, oMenu, function() {
			var $Elem = this.$(); // this is the Menu instance from the oMenu argument
			if ($Elem.length > 0) {
				var oDomRef = $Elem[0].firstChild;
				sap.ui.core.RenderManager.forceRepaint(oDomRef);
			}
		});
		/* oMenu.data("delayedRepaintId", iDelayedId); */
	};
}


//**********************************************

/*!
 * The following code is taken from 
 * jQuery UI 1.10.3 - 2013-11-18
 * jquery.ui.position.js
 *
 * http://jqueryui.com
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT
 */

//TODO: Get rid of this coding when jQuery UI 1.8 is no longer supported and the framework was switched to jQuery UI 1.9 ff. 

function _migrateDataTojQueryUI110(data){
	var withinElement = jQuery(window);
	data.within = {
		element: withinElement,
		isWindow: true,
		offset: withinElement.offset() || { left: 0, top: 0 },
		scrollLeft: withinElement.scrollLeft(),
		scrollTop: withinElement.scrollTop(),
		width: withinElement.width(),
		height: withinElement.height()
	};
	data.collisionPosition = {
		marginLeft: 0,
		marginTop: 0
	};
	return data;
};

var _pos_jQueryUI110 = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = Math.max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = Math.max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < Math.abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			}
			else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || Math.abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < Math.abs( overTop ) ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
			else if ( overBottom > 0 ) {
				newOverTop = position.top -  data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || Math.abs( newOverTop ) < overBottom ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			_pos_jQueryUI110.flip.left.apply( this, arguments );
			_pos_jQueryUI110.fit.left.apply( this, arguments );
		},
		top: function() {
			_pos_jQueryUI110.flip.top.apply( this, arguments );
			_pos_jQueryUI110.fit.top.apply( this, arguments );
		}
	}
};

jQuery.ui.position._sapUiCommonsMenuFlip = {
	left: function(position, data){
		
		if(jQuery.ui.position.flipfit){ //jQuery UI 1.9 ff.
			jQuery.ui.position.flipfit.left.apply(this, arguments);
			return;
		}
		
		//jQuery UI 1.8
		data = _migrateDataTojQueryUI110(data);
		_pos_jQueryUI110.flipfit.left.apply(this, arguments);
	},
	top: function(position, data){
		
		if(jQuery.ui.position.flipfit){ //jQuery UI 1.9 ff.
			jQuery.ui.position.flipfit.top.apply(this, arguments);
			return;
		}
		
		//jQuery UI 1.8
		data = _migrateDataTojQueryUI110(data);
		_pos_jQueryUI110.flipfit.top.apply(this, arguments);
	}
};

//******************** jQuery UI 1.10.3 End **************************


})(window);
