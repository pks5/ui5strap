/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.InputBase.
jQuery.sap.declare("sap.m.InputBase");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new InputBase.
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
 * <li>{@link #getValue value} : string</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getEnabled enabled} : boolean (default: true)</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getValueState valueState} : sap.ui.core.ValueState (default: sap.ui.core.ValueState.None)</li>
 * <li>{@link #getName name} : string</li>
 * <li>{@link #getPlaceholder placeholder} : string</li>
 * <li>{@link #getEditable editable} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.InputBase#event:change change} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Base control for Input fields.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.12.0
 * @name sap.m.InputBase
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.InputBase", { metadata : {

	library : "sap.m",
	properties : {
		"value" : {type : "string", group : "Data", defaultValue : null, bindable : "bindable"},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"valueState" : {type : "sap.ui.core.ValueState", group : "Appearance", defaultValue : sap.ui.core.ValueState.None},
		"name" : {type : "string", group : "Misc", defaultValue : null},
		"placeholder" : {type : "string", group : "Misc", defaultValue : null},
		"editable" : {type : "boolean", group : "Behavior", defaultValue : true}
	},
	events : {
		"change" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.InputBase with name <code>sClassName</code> 
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
 * @name sap.m.InputBase.extend
 * @function
 */

sap.m.InputBase.M_EVENTS = {'change':'change'};


/**
 * Getter for property <code>value</code>.
 * Defines the value of the input.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>value</code>
 * @public
 * @name sap.m.InputBase#getValue
 * @function
 */

/**
 * Setter for property <code>value</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sValue  new value for property <code>value</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setValue
 * @function
 */


/**
 * Binder for property <code>value</code>.
 *
 * @param {string} sPath path to a property in the model 
 * @param {function} [fnFormatter=null] the formatter function
 * @param {sap.ui.model.BindingMode} [sMode=Default] the binding mode to be used for this property binding (e.g. one way) 
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#bindValue
 * @function
 */

/**
 * Unbinder for property <code>value</code>.
 *
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#unbindValue
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Defines the width of the input.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.InputBase#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setWidth
 * @function
 */


/**
 * Getter for property <code>enabled</code>.
 * Determines whether the user can change the input value (default is true).
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.m.InputBase#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setEnabled
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Determines whether the input is visible.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.InputBase#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setVisible
 * @function
 */


/**
 * Getter for property <code>valueState</code>.
 * Visualizes warnings or errors related to the text field. Possible values: Warning, Error, Success.
 *
 * Default value is <code>None</code>
 *
 * @return {sap.ui.core.ValueState} the value of property <code>valueState</code>
 * @public
 * @name sap.m.InputBase#getValueState
 * @function
 */

/**
 * Setter for property <code>valueState</code>.
 *
 * Default value is <code>None</code> 
 *
 * @param {sap.ui.core.ValueState} oValueState  new value for property <code>valueState</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setValueState
 * @function
 */


/**
 * Getter for property <code>name</code>.
 * The "name" property to be used in the HTML code (e.g. for HTML forms that send data to the server via 'submit').
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>name</code>
 * @public
 * @name sap.m.InputBase#getName
 * @function
 */

/**
 * Setter for property <code>name</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sName  new value for property <code>name</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setName
 * @function
 */


/**
 * Getter for property <code>placeholder</code>.
 * Text shown when no value available.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>placeholder</code>
 * @public
 * @name sap.m.InputBase#getPlaceholder
 * @function
 */

/**
 * Setter for property <code>placeholder</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sPlaceholder  new value for property <code>placeholder</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#setPlaceholder
 * @function
 */


/**
 * Getter for property <code>editable</code>.
 * Controls if a user can change the value.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>editable</code>
 * @public
 * @since 1.12.0
 * @name sap.m.InputBase#getEditable
 * @function
 */

/**
 * Setter for property <code>editable</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEditable  new value for property <code>editable</code>
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @since 1.12.0
 * @name sap.m.InputBase#setEditable
 * @function
 */


/**
 * This event gets fired when the input operation has finished and the value has changed.
 *
 * @name sap.m.InputBase#change
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.value The new value of the input.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'change' event of this <code>sap.m.InputBase</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.InputBase</code>.<br/> itself. 
 *  
 * This event gets fired when the input operation has finished and the value has changed.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.InputBase</code>.<br/> itself.
 *
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#attachChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'change' event of this <code>sap.m.InputBase</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.InputBase#detachChange
 * @function
 */

/**
 * Fire event change to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The new value of the input.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.InputBase#fireChange
 * @function
 */


// Start of sap\m\InputBase.js
jQuery.sap.require("sap.ui.core.EnabledPropagator");
jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.core.EnabledPropagator.call(sap.m.InputBase.prototype);
sap.ui.core.IconPool.insertFontFaceStyle();

/* Android browser does not scroll a focused input into the view correctly */
if (sap.ui.Device.os.android && sap.ui.Device.os.version >= 4){
	jQuery(window).on("resize", function(){
		var active = document.activeElement;
		if(active.tagName == "INPUT" && active.classList.contains("sapMInputBaseInner")){
			window.setTimeout(function(){
				active.scrollIntoViewIfNeeded();
			}, 0);
		}
	});
}


/* =========================================================== */
/* Private methods and properties                              */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* Private properties                                          */
/* ----------------------------------------------------------- */

// use labels as placeholder configuration
sap.m.InputBase.prototype._bShowLabelAsPlaceholder = (function(oDevice) {

	// check native placeholder support first
	if (!oDevice.support.input.placeholder) {
		return true;
	}

	// according to HTML 5 placeholder specification,
	// http://www.w3.org/html/wg/drafts/html/master/single-page.html#the-placeholder-attribute
	// the placeholder attribute is only shown before the user enters a value
	// but IE removes placeholder when the user puts focus on the field
	// http://msdn.microsoft.com/en-us/library/ie/hh772942(v=vs.85).aspx
	if (oDevice.browser.msie) {
		return true;
	}

	// we exclude not right alignable placeholders
	// check test page : http://jsfiddle.net/89FhB/
	if (oDevice.os.android && oDevice.os.version < 4.4) {
		return true;
	}

}(sap.ui.Device));

/* ----------------------------------------------------------- */
/* Private methods                                             */
/* ----------------------------------------------------------- */

/**
 * To allow setting of default placeholder e.g. in DatePicker
 *
 * FIXME: Remove this workaround
 * What is the difference between _getPlaceholder and getPlaceholder
 */
sap.m.InputBase.prototype._getPlaceholder = function() {
	return this.getPlaceholder();
};

/**
 * Update the synthetic placeholder visibility.
 */
sap.m.InputBase.prototype._setLabelVisibility = function() {
	if (!this._bShowLabelAsPlaceholder || !this._$label || !this.isActive()) {
		return;
	}

	var sValue = this._getInputValue();
	this._$label.css("display", sValue ? "none" : "inline");
};

/**
 * Returns the DOM value respect to maxLength
 * When parameter is set chops the given parameter
 *
 * TODO: write two different functions for two different behaviour
 */
sap.m.InputBase.prototype._getInputValue = function(sValue) {
	sValue = (typeof sValue == "undefined") ? this._$input.val() : sValue.toString();

	if (this.getMaxLength && this.getMaxLength() > 0) {
		sValue = sValue.substring(0, this.getMaxLength());
	}

	return sValue;
};

/**
 * Triggers input event from the input field delayed
 * This event is marked as synthetic since it is not a native input event
 * Event properties can be specified with first parameter when necessary
 */
sap.m.InputBase.prototype._triggerInputEvent = function(mProperties) {
	mProperties = mProperties || {};
	var oEvent = new jQuery.Event("input", mProperties);
	oEvent.originalEvent = mProperties;
	oEvent.setMark("synthetic", true);

	// not to break real event order fire the event delayed
	jQuery.sap.delayedCall(0, this, function() {
		this.$("inner").trigger(oEvent);
	});
};

/* =========================================================== */
/* Lifecycle methods                                           */
/* =========================================================== */

/**
 * Initialization hook.
 *
 * TODO: respect hungarian notation for variables
 * @private
 */
sap.m.InputBase.prototype.init = function() {
	this._lastValue = "";	// last changed value
	this._changeProxy = jQuery.proxy(this.onChange, this);
};

/**
 * Required adaptations before rendering.
 *
 * @private
 */
sap.m.InputBase.prototype.onBeforeRendering = function() {

	// mark the rendering phase
	this._bRendering = true;

	// is DOM already available
	if (this._bCheckDomValue && this.isActive()) {

		// remember dom value in case of invalidation during keystrokes
		// so the following should only be used onAfterRendering
		this._sDomValue = this._getInputValue();
	}
};

/**
 * Required adaptations after rendering.
 *
 * @private
 */
sap.m.InputBase.prototype.onAfterRendering = function() {

	// cache input as jQuery
	this._$input = this.$("inner");

	// maybe control is invalidated on keystrokes and
	// even the value property did not change
	// dom value is still the old value
	// FIXME: This is very ugly to implement this because of the binding
	if (this._bCheckDomValue && this._sDomValue !== this._getInputValue()) {

		// so we should keep the dom up-to-date
		this._$input.val(this._sDomValue);
	}

	// now dom value is up-to-date
	this._bCheckDomValue = false;

	// handle synthetic placeholder visibility
	if (this._bShowLabelAsPlaceholder) {
		this._$label = this.$("placeholder");
		this._setLabelVisibility();
	}

	// rendering phase is finished
	this._bRendering = false;
};

/**
 * Cleans up before destruction.
 *
 * @private
 */
sap.m.InputBase.prototype.exit = function() {
	this._$input = null;
	this._$label = null;
};

/* =========================================================== */
/* Event handlers                                              */
/* =========================================================== */

/**
 * Handles the touch start event of the Input.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.ontouchstart = function(oEvent) {

	// mark the event for components that needs to know if the event was handled
	oEvent.setMarked();
};
/**
 * Sets up at focus a touch listener on mobile devices.
 *
 * @private
 */
sap.m.InputBase.prototype.onfocusin = function() {
	if (sap.ui.Device.support.touch) {
		// listen to all touch events
		jQuery(document).on('touchstart.sapMIBtouchstart', jQuery.proxy(this._touchstartHandler, this));
	}
};

/**
 * Captures the initial touch position and sets up listeners for touchmove, touchcancel and touchend
 *
 * @private
 */
sap.m.InputBase.prototype._touchstartHandler = function (oEvent) {
	if (oEvent.target != this._$input[0]) {
		this._touchX = oEvent.targetTouches[0].pageX;
		this._touchY = oEvent.targetTouches[0].pageY;
		this._touchT = oEvent.timestamp;
		jQuery(oEvent.target)
			.on(  'touchmove.sapMIBtouch', jQuery.proxy(this._touchmoveHandler,this))
			.on(   'touchend.sapMIBtouch', jQuery.proxy(this._touchendHandler ,this))
			.on('touchcancel.sapMIBtouch', this._removeTouchHandler);
	}
};

/**
 * Calculates if a touch session is a click event or something else (scoll, longtouch)
 *
 * @private
 */
sap.m.InputBase.prototype._isClick = function(oEvent) {
	return Math.abs(oEvent.changedTouches[0].pageX-this._touchX) < 10 && Math.abs(oEvent.changedTouches[0].pageY - this._touchY) < 10 &&  oEvent.timestamp - this._touchT < jQuery.event.special.tap.tapholdThreshold; // 750ms
};

/**
 * Cancels the action if the touch session is a long tap or scroll
 *
 * @private
 */
sap.m.InputBase.prototype._touchmoveHandler = function(oEvent){
	if (!this._isClick(oEvent)) {
		jQuery(oEvent.target).off('.sapMIBtouch');
	}
};

/**
 * Sends an early change event to the input if a tap has happened outside the input - e.g. on a button
 *
 * @private
 */
sap.m.InputBase.prototype._touchendHandler = function(oEvent) {
	// cancel if scrolling or long tap
	if (this._isClick(oEvent)) {
		// simulate change event
		this.onChange(oEvent);
	}

	// remove all touch handlers
	jQuery(oEvent.target).off('.sapMIBtouch');
};

/**
 * Handles the focusout event of the Input.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.onfocusout = function(oEvent) {
	// remove touch handler from document for mobile devices
	jQuery(document).off('.sapMIBtouchstart');

	// because dom is replaced during the rendering
	// onfocusout event is triggered probably focus goes to the document
	// so we ignore this event that comes during the rendering
	if (this._bRendering) {
		return;
	}

	// handle change event on focusout
	this.onChange(oEvent);
};

/**
 * Handles the change event.
 *
 * @protected
 * @param {object} oEvent
 * @name sap.m.InputBase#onChange
 * @returns {true|undefined} true when change event is fired
 * @function
 */
sap.m.InputBase.prototype.onChange = function(oEvent) {

	// check the control is editable or not
	if (!this.getEditable() || !this.getEnabled()) {
		return;
	}

	// get the dom value respect to max length
	var sValue = this._getInputValue();

	// compare with the old known value
	if (sValue !== this._lastValue) {

		// save the value on change
		this.setValue(sValue);

		// get the value back maybe formatted
		sValue = this.getValue();

		// remember the last value on change
		this._lastValue = sValue;

		// fire change event
		this.fireChangeEvent(sValue);

		// inform change detection
		return true;
	}
};

/**
 * Fires the change event for the listeners
 *
 * @protected
 * @name sap.m.InputBase#fireChangeEvent
 * @param {String} sValue value of the input.
 * @param {Object} [oParams] extra event parameters.
 * @since 1.22.1
 * @function
 */
sap.m.InputBase.prototype.fireChangeEvent = function(sValue, oParams) {
	// generate event parameters
	var oChangeEvent = jQuery.extend({
		value : sValue,

		// backwards compatibility
		newValue : sValue
	}, oParams);

	// fire change event
	this.fireChange(oChangeEvent);
};

/* ----------------------------------------------------------- */
/* Keyboard handling                                           */
/* ----------------------------------------------------------- */

/**
 * Handle when enter is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.onsapenter = function(oEvent) {

	// handle change event on enter
	this.onChange(oEvent);
};

/**
 * Handle when escape is pressed.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.onsapescape = function(oEvent) {

	// get the dom value that respect to max length
	var sValue = this._getInputValue();

	// compare last known value and dom value
	if (sValue !== this._lastValue) {

		// mark the event that it is handled
		oEvent.setMarked();
		oEvent.preventDefault();

		// revert to the old dom value
		this.updateDomValue(this._lastValue);

		// fire private live change event
		this.fireEvent("liveChange", {
			value: this._lastValue,

			// backwards compatibility
			newValue: this._lastValue
		});
	}
};

/**
 * Handle DOM input event.
 *
 * This event is fired synchronously when the value of an <input> or <textarea> element is changed.
 * IE9 does not fire an input event when the user removes characters via BACKSPACE / DEL / CUT
 * InputBase normalize this behaviour for IE9 and calls oninput for the subclasses
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.oninput = function(oEvent) {

	// dom value updated other than value property
	this._bCheckDomValue = true;

	// update the synthetic placeholder visibility
	this._setLabelVisibility();
};

/**
 * Handle keydown event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.onkeydown = function(oEvent) {

	// IE9 does not fire input event on BACKSPACE & DEL
	var mKC = jQuery.sap.KeyCodes;
	var mBrowser = sap.ui.Device.browser;
	if ((mBrowser.msie && mBrowser.version < 10) &&
		(oEvent.which === mKC.DELETE || oEvent.which === mKC.BACKSPACE)) {

		// trigger synthetic input event
		this._triggerInputEvent();
	}
};

/**
 * Handle cut event.
 *
 * @param {jQuery.Event} oEvent The event object.
 * @private
 */
sap.m.InputBase.prototype.oncut = function(oEvent) {

	// IE9 does not fire input event on cut
	var mBrowser = sap.ui.Device.browser;
	if (mBrowser.msie && mBrowser.version < 10) {

		// trigger synthetic input event
		this._triggerInputEvent();
	}
};

/* =========================================================== */
/* API methods                                                 */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* protected methods                                           */
/* ----------------------------------------------------------- */

/**
 * Selects the text within the input field between the specified start and end positions.
 * Only supported for input control’s type of Text, Url, Tel and Password.
 *
 * @param {integer} iSelectionStart The index into the text at which the first selected character is located.
 * @param {integer} iSelectionEnd The index into the text at which the last selected character is located.
 * @returns {sap.m.InputBase} <code>this</code> to allow method chaining.
 * @protected
 * @since 1.22.1
 * @name sap.m.InputBase#selectText
 * @function
 */
sap.m.InputBase.prototype.selectText = function(iSelectionStart, iSelectionEnd) {
	jQuery(this.getFocusDomRef()).selectText(iSelectionStart, iSelectionEnd);
	return this;
};

/**
 * Overwrite setProperty function to know value property changes via API
 * @overwrite
 */
sap.m.InputBase.prototype.setProperty = function(sPropertyName, oValue, bSuppressInvalidate) {
	if (sPropertyName == "value") {

		// dom value will be updated with value property
		this._bCheckDomValue = false;
	}

	return sap.ui.core.Control.prototype.setProperty.apply(this, arguments);
};

/**
 * Registers an event listener to the browser input event.
 *
 * @param {function} fnCallback Function to be called when the value of the input element is changed.
 * @deprecated Since 1.22. Instead use event delegation(oninput) to listen input event.
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining.
 * @name sap.m.InputBase#bindToInputEvent
 * @protected
 */
sap.m.InputBase.prototype.bindToInputEvent = function(fnCallback) {

	// remove the previous event delegate
	if (this._oInputEventDelegate) {
		this.removeEventDelegate(this._oInputEventDelegate);
	}

	// generate new input event delegate
	this._oInputEventDelegate = {
		oninput : fnCallback
	};

	// add the input event delegate
	return this.addEventDelegate(this._oInputEventDelegate);
};

/**
 * Sets the DOM value of the input field and handles placeholder visibility.
 *
 * @param {string} sValue value of the input field.
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining.
 * @name sap.m.InputBase#updateDomValue
 * @since 1.22
 * @protected
 */
sap.m.InputBase.prototype.updateDomValue = function(sValue) {

	// dom value updated other than value property
	this._bCheckDomValue = true;

	// respect to max length
	sValue = this._getInputValue(sValue);

	// update the DOM value when necessary
	// otherwise cursor can goto end of text unnecessarily
	if (this.isActive() && (this._getInputValue() !== sValue)) {
		this._$input.val(sValue);
	}

	// update synthetic placeholder visibility
	this._setLabelVisibility();

	return this;
};

/* ----------------------------------------------------------- */
/* public methods                                              */
/* ----------------------------------------------------------- */

/**
 * Setter for property <code>valueState</code>.
 *
 * Default value is <code>None</code>.
 *
 * @param {sap.ui.core.ValueState} sValueState New value for property <code>valueState</code>.
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.InputBase#setValueState
 * @function
 */
sap.m.InputBase.prototype.setValueState = function(sValueState) {
	var sOldValueState = this.getValueState();
	sValueState = this.validateProperty("valueState", sValueState);

	if (sValueState === sOldValueState) {
		return this;
	}

	if (!this.isActive()) {
		return this.setProperty("valueState", sValueState);
	}

	var $container = this.$();
	this.setProperty("valueState", sValueState, true);

	if (sOldValueState !== sap.ui.core.ValueState.None) {
		$container.removeClass("sapMInputBaseState sapMInputBase" + sOldValueState);
		this._$input.removeClass("sapMInputBaseStateInner sapMInputBase" + sOldValueState + "Inner");
	}

	if (sValueState  !== sap.ui.core.ValueState.None) {
		$container.addClass("sapMInputBaseState sapMInputBase" + sValueState);
		this._$input.addClass("sapMInputBaseStateInner sapMInputBase" + sValueState + "Inner");
	}

	// set tooltip based on state (will be undefined when state is None)
	var sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(this, this.getTooltip_AsString());
	this.$().attr("title", sTooltip || "");

	return this;
};

/**
 * Setter for property <code>value</code>.
 *
 * Default value is empty/<code>undefined</code>.
 *
 * @param {string} sValue New value for property <code>value</code>.
 * @return {sap.m.InputBase} <code>this</code> to allow method chaining.
 * @public
 * @name sap.m.InputBase#setValue
 * @function
 */
sap.m.InputBase.prototype.setValue = function(sValue) {

	// validate given value
	sValue = this.validateProperty("value", sValue);

	// get the value respect to the max length
	sValue = this._getInputValue(sValue);

	// update the dom value when necessary
	this.updateDomValue(sValue);

	// check if we need to update the last value because
	// when setProperty("value") called setValue is called again via binding
	if (sValue !== this.getProperty("value")) {
		this._lastValue = sValue;
	}

	// update value property
	this.setProperty("value", sValue, true);

	return this;
};

/**
 * Returns an object representing the serialized focus information.
 * To be overwritten by subclasses.
 *
 * @return {object} An object representing the serialized focus information.
 * @protected
 * @name sap.m.InputBase.prototype#getFocusInfo
 * @function
 */
sap.m.InputBase.prototype.getFocusInfo = function() {
	var oFocusInfo = sap.ui.core.Control.prototype.getFocusInfo.call(this),
		oFocusDomRef = this.getFocusDomRef();

	// extend the serialized focus information with the current text selection and the cursor position
	jQuery.extend(oFocusInfo, {
		cursorPos: 0,
		selectionStart: 0,
		selectionEnd: 0
	});

	if (oFocusDomRef) {
		oFocusInfo.cursorPos = jQuery(oFocusDomRef).cursorPos();

		try {
			oFocusInfo.selectionStart = oFocusDomRef.selectionStart;
			oFocusInfo.selectionEnd = oFocusDomRef.selectionEnd;
		} catch (e) {}	// note: chrome fail to read the "selectionStart" property from HTMLInputElement: The input element's type "number" does not support selection.
	}

	return oFocusInfo;
};

/**
 * Applies the focus info.
 * To be overwritten by subclasses.
 *
 * @param {object} oFocusInfo
 * @protected
 * @name sap.m.InputBase.prototype#applyFocusInfo
 * @function
 */
sap.m.InputBase.prototype.applyFocusInfo = function(oFocusInfo) {
	sap.ui.core.Control.prototype.applyFocusInfo.call(this, oFocusInfo);
	this.$("inner").cursorPos(oFocusInfo.cursorPos);
	this.selectText(oFocusInfo.selectionStart, oFocusInfo.selectionEnd);
	return this;
};

sap.m.InputBase.prototype.getFocusDomRef = function() {
	return this.getDomRef("inner");
};

sap.m.InputBase.prototype.getIdForLabel = function() {
	return this.getId() + "-inner";
};
