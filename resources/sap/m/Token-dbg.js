/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Token.
jQuery.sap.declare("sap.m.Token");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Token.
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
 * <li>{@link #getSelected selected} : boolean (default: false)</li>
 * <li>{@link #getKey key} : string (default: "")</li>
 * <li>{@link #getText text} : string (default: "")</li>
 * <li>{@link #getEditable editable} : boolean (default: true)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.Token#event:delete delete} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.Token#event:press press} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.Token#event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * renders a token containing text and an optional delete icon
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.Token
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.Token", { metadata : {

	library : "sap.m",
	properties : {
		"selected" : {type : "boolean", group : "Misc", defaultValue : false},
		"key" : {type : "string", group : "Misc", defaultValue : ""},
		"text" : {type : "string", group : "Misc", defaultValue : ""},
		"editable" : {type : "boolean", group : "Misc", defaultValue : true},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true}
	},
	aggregations : {
		"deleteIcon" : {type : "sap.ui.core.Icon", multiple : false, visibility : "hidden"}
	},
	events : {
		"delete" : {}, 
		"press" : {}, 
		"select" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.Token with name <code>sClassName</code> 
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
 * @name sap.m.Token.extend
 * @function
 */

sap.m.Token.M_EVENTS = {'delete':'delete','press':'press','select':'select'};


/**
 * Getter for property <code>selected</code>.
 * current selection status of token
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>selected</code>
 * @public
 * @name sap.m.Token#getSelected
 * @function
 */

/**
 * Setter for property <code>selected</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bSelected  new value for property <code>selected</code>
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#setSelected
 * @function
 */


/**
 * Getter for property <code>key</code>.
 * token's identifier key
 *
 * Default value is <code>""</code>
 *
 * @return {string} the value of property <code>key</code>
 * @public
 * @name sap.m.Token#getKey
 * @function
 */

/**
 * Setter for property <code>key</code>.
 *
 * Default value is <code>""</code> 
 *
 * @param {string} sKey  new value for property <code>key</code>
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#setKey
 * @function
 */


/**
 * Getter for property <code>text</code>.
 * token's display text
 *
 * Default value is <code>""</code>
 *
 * @return {string} the value of property <code>text</code>
 * @public
 * @name sap.m.Token#getText
 * @function
 */

/**
 * Setter for property <code>text</code>.
 *
 * Default value is <code>""</code> 
 *
 * @param {string} sText  new value for property <code>text</code>
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#setText
 * @function
 */


/**
 * Getter for property <code>editable</code>.
 * if true, token displays delete icon and fires events accordingly
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>editable</code>
 * @public
 * @name sap.m.Token#getEditable
 * @function
 */

/**
 * Setter for property <code>editable</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEditable  new value for property <code>editable</code>
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#setEditable
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Determines whether the token is visible.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.Token#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#setVisible
 * @function
 */


/**
 * Fired if the user click the token's delete button.
 *
 * @name sap.m.Token#delete
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'delete' event of this <code>sap.m.Token</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Token</code>.<br/> itself. 
 *  
 * Fired if the user click the token's delete button.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Token</code>.<br/> itself.
 *
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#attachDelete
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'delete' event of this <code>sap.m.Token</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#detachDelete
 * @function
 */

/**
 * Fire event delete to attached listeners.
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Token#fireDelete
 * @function
 */


/**
 * Event is fired when the user clicks on the control.
 *
 * @name sap.m.Token#press
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'press' event of this <code>sap.m.Token</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Token</code>.<br/> itself. 
 *  
 * Event is fired when the user clicks on the control.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Token</code>.<br/> itself.
 *
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#attachPress
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'press' event of this <code>sap.m.Token</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#detachPress
 * @function
 */

/**
 * Fire event press to attached listeners.
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Token#firePress
 * @function
 */


/**
 * Event is fired when the user selects a token (could be a keyboard navigation, could be a press)
 *
 * @name sap.m.Token#select
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'select' event of this <code>sap.m.Token</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Token</code>.<br/> itself. 
 *  
 * Event is fired when the user selects a token (could be a keyboard navigation, could be a press)
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Token</code>.<br/> itself.
 *
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#attachSelect
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'select' event of this <code>sap.m.Token</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Token#detachSelect
 * @function
 */

/**
 * Fire event select to attached listeners.
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Token} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Token#fireSelect
 * @function
 */


// Start of sap\m\Token.js
///**
// * This file defines behavior for the control,
// */
sap.m.Token.prototype.init = function() {
	var that = this;

	this._deleteIcon = new sap.ui.core.Icon({
		src : "sap-icon://sys-cancel"
	});

	this._deleteIcon.addStyleClass("sapMTokenIcon");
	this.setAggregation("deleteIcon", this._deleteIcon);
};

sap.m.Token.prototype.setEditable = function(bEditable){
	this.setProperty("editable", bEditable);
	if (bEditable){
		this.removeStyleClass("sapMTokenReadOnly");
	}else{
		this.addStyleClass("sapMTokenReadOnly");
	}
};

sap.m.Token.prototype.ontouchstart = function(oEvent) {

	if (sap.ui.Device.system.desktop && oEvent.originalEvent.button !== 0)
		return; // only on left mouse button

	this._oSrcStartId = oEvent.target.id;

	if (this._oSrcStartId === this._deleteIcon.getId()) {
		oEvent.preventDefault();
	}
};

sap.m.Token.prototype.ontouchend = function(oEvent) {

	var oSrc = oEvent.target, sId = this.getId();
	if (this._oSrcStartId !== oSrc.id) {
		delete this._oSrcStartId;
		return;
	}

	// we only allow deletion on touch devices when the Token is selected - this is to avoid accidental deletion when
	// swiping
	var bTouch = sap.m.MultiInput.prototype._bDoTouchScroll;
	var bTouchDeleteAllow = false;
	if (bTouch && this.getSelected()) {
		bTouchDeleteAllow = true;
	}

	if (oSrc.id === this._deleteIcon.getId()) {
		if (bTouchDeleteAllow || !bTouch) {
			this.fireDelete({
				token : this
			});
		} else {
			// in this case we at least make sure the element gets selected
			this.firePress({
				token : this
			});
		}
		oEvent.preventDefault();

	} else {
		this.firePress({
			token : this
		});
		oEvent.preventDefault();
	}

	delete this._oSrcStartId;

};

sap.m.Token.prototype.onsapfocusleave = function(oEvent) {
	this.setSelected(false);
};

sap.m.Token.prototype.setSelected = function(bSelected, bMultiSelect) {

	var $this = this.$();

	if ($this) {
		if (bSelected) {
			$this.addClass("sapMTokenSelected");
		} else {
			$this.removeClass("sapMTokenSelected");
		}
	} else {
		if (bSelected) {
			this.addStyleClass("sapMTokenSelected");
		} else {
			this.removeStyleClass("sapMTokenSelected");
		}

	}

	this.setProperty("selected", bSelected, true);

	if (bSelected && !bMultiSelect) {
		this.focus();
	}

	if (bSelected) {
		this.fireSelect();
	}

};

sap.m.Token.prototype.onsapbackspace = function(oEvent) {
	oEvent.preventDefault();
	oEvent.stopPropagation();
	if (this.getSelected() && this.getEditable()) {		
		this.fireDelete({
			token : this
		});

	}	
};

sap.m.Token.prototype.onsapdelete = function(oEvent) {
	if (this.getEditable()){
		this.fireDelete({
			token : this
		});
	}
	oEvent.preventDefault();
};