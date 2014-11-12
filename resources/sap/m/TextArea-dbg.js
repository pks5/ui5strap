/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.TextArea.
jQuery.sap.declare("sap.m.TextArea");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.InputBase");


/**
 * Constructor for a new TextArea.
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
 * <li>{@link #getRows rows} : int (default: 2)</li>
 * <li>{@link #getCols cols} : int (default: 20)</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize</li>
 * <li>{@link #getMaxLength maxLength} : int (default: 0)</li>
 * <li>{@link #getWrapping wrapping} : sap.ui.core.Wrapping</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.TextArea#event:liveChange liveChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
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
 * Enable users to input multi-line text.
 * @extends sap.m.InputBase
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.9.0
 * @name sap.m.TextArea
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.InputBase.extend("sap.m.TextArea", { metadata : {

	library : "sap.m",
	properties : {
		"rows" : {type : "int", group : "Appearance", defaultValue : 2},
		"cols" : {type : "int", group : "Appearance", defaultValue : 20},
		"height" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
		"maxLength" : {type : "int", group : "Behavior", defaultValue : 0},
		"wrapping" : {type : "sap.ui.core.Wrapping", group : "Behavior", defaultValue : null}
	},
	events : {
		"liveChange" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.TextArea with name <code>sClassName</code> 
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
 * @name sap.m.TextArea.extend
 * @function
 */

sap.m.TextArea.M_EVENTS = {'liveChange':'liveChange'};


/**
 * Getter for property <code>rows</code>.
 * Specifies the height of the text area (in lines).
 *
 * Default value is <code>2</code>
 *
 * @return {int} the value of property <code>rows</code>
 * @public
 * @name sap.m.TextArea#getRows
 * @function
 */

/**
 * Setter for property <code>rows</code>.
 *
 * Default value is <code>2</code> 
 *
 * @param {int} iRows  new value for property <code>rows</code>
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#setRows
 * @function
 */


/**
 * Getter for property <code>cols</code>.
 * Specifies the width of the textarea (in average character width).
 *
 * Default value is <code>20</code>
 *
 * @return {int} the value of property <code>cols</code>
 * @public
 * @name sap.m.TextArea#getCols
 * @function
 */

/**
 * Setter for property <code>cols</code>.
 *
 * Default value is <code>20</code> 
 *
 * @param {int} iCols  new value for property <code>cols</code>
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#setCols
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * Defines the height of the textarea with CSS. This property can overwrite the rows property.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.m.TextArea#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#setHeight
 * @function
 */


/**
 * Getter for property <code>maxLength</code>.
 * Maximum number of characters that user can input. If your value property's length bigger than maxLength then value is not truncated and user can see whole value property but cannot write anymore.
 *
 * Default value is <code>0</code>
 *
 * @return {int} the value of property <code>maxLength</code>
 * @public
 * @name sap.m.TextArea#getMaxLength
 * @function
 */

/**
 * Setter for property <code>maxLength</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {int} iMaxLength  new value for property <code>maxLength</code>
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#setMaxLength
 * @function
 */


/**
 * Getter for property <code>wrapping</code>.
 * The wrap attribute specifies how the text in a text area is to be wrapped when submitted in a form. Possible values are: Soft, Hard, Off.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.Wrapping} the value of property <code>wrapping</code>
 * @public
 * @name sap.m.TextArea#getWrapping
 * @function
 */

/**
 * Setter for property <code>wrapping</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.Wrapping} oWrapping  new value for property <code>wrapping</code>
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#setWrapping
 * @function
 */


/**
 * This event is fired when the value of the input is changed - e.g. at each keypress
 *
 * @name sap.m.TextArea#liveChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.value The new value of the textarea.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'liveChange' event of this <code>sap.m.TextArea</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.TextArea</code>.<br/> itself. 
 *  
 * This event is fired when the value of the input is changed - e.g. at each keypress
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.TextArea</code>.<br/> itself.
 *
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#attachLiveChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'liveChange' event of this <code>sap.m.TextArea</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.TextArea#detachLiveChange
 * @function
 */

/**
 * Fire event liveChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The new value of the textarea.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.TextArea} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.TextArea#fireLiveChange
 * @function
 */


// Start of sap\m\TextArea.js
sap.m.TextArea.prototype.init = function() {
	sap.m.InputBase.prototype.init.call(this);
	this._inputProxy = jQuery.proxy(this._onInput, this);
};

// Attach listeners on after rendering and find iscroll
sap.m.TextArea.prototype.onAfterRendering = function() {
	sap.m.InputBase.prototype.onAfterRendering.call(this);

	// bind events
	this.bindToInputEvent(this._inputProxy);

	// touch browser behaviour differs
	if (sap.ui.Device.support.touch) {

		// check behaviour mode
		if (this._behaviour.INSIDE_SCROLLABLE_WITHOUT_FOCUS) {

			// Bind browser events to mimic native scrolling
			this._$input.on("touchstart", jQuery.proxy(this._onTouchStart, this));
			this._$input.on("touchmove", jQuery.proxy(this._onTouchMove, this));
		} else if (this._behaviour.PAGE_NON_SCROLLABLE_AFTER_FOCUS) {

			// stop bubbling to disable preventDefault calls
			this._$input.on("touchmove", function(e) {
				if (jQuery(this).is(":focus")) {
					e.stopPropagation();
				}
			});
		}
	}
};

// overwrite the input base enter handling for change event
sap.m.TextArea.prototype.onsapenter = function(oEvent) {
};

sap.m.TextArea.prototype._onInput = function(oEvent) {
	var value = this._$input.val();

	// some browsers does not respect to maxlength property of textarea
	if (this.getMaxLength() > 0 && value.length > this.getMaxLength()) {
		value = value.substring(0, this.getMaxLength());
		this._$input.val(value);
	}

	if (value != this.getValue()) {
		this.setProperty("value", value, true);
		this.fireLiveChange({
			value: value,

			// backwards compatibility
			newValue: value
		});
	}
};

/**
 * Some browsers let us to scroll inside of the textarea without focusing.
 * Android is very buggy and no touch event is publishing after focus.
 * Android 4.1+ has touch events but page scroll is not possible after
 * we reached the edge(bottom, top) of the textarea
 *
 * @private
 */
sap.m.TextArea.prototype._behaviour = (function(oDevice) {
	return {
		INSIDE_SCROLLABLE_WITHOUT_FOCUS : oDevice.os.ios || oDevice.os.blackberry || oDevice.browser.chrome,
		PAGE_NON_SCROLLABLE_AFTER_FOCUS : oDevice.os.android && oDevice.os.version >= 4.1
	};
}(sap.ui.Device));


/**
 * On touch start get iscroll and save starting point
 *
 * @private
 * @param {jQuery.EventObject} oEvent The event object
 */
sap.m.TextArea.prototype._onTouchStart = function(oEvent) {
	var oTouchEvent = oEvent.touches[0];
	this._iStartY = oTouchEvent.pageY;
	this._iStartX = oTouchEvent.pageX;
	this._bHorizontalScroll = undefined;

	// disable swipe handling of jQuery-mobile since it calls preventDefault
	// on touchmove and this can break the scrolling nature of the textarea
	oEvent.setMarked("swipestartHandled");
};


/**
 * Touch move listener doing native scroll workaround
 *
 * @private
 * @param {jQuery.EventObject} oEvent The event object
 */
sap.m.TextArea.prototype._onTouchMove = function(oEvent) {

	var oDomRef = this._$input[0],	// textarea dom reference
		iPageY = oEvent.touches[0].pageY,
		iScrollTop = oDomRef.scrollTop,
		bTop = iScrollTop <= 0,
		bBottom = iScrollTop + oDomRef.clientHeight >= oDomRef.scrollHeight,
		bGoingUp = this._iStartY > iPageY,
		bGoingDown =  this._iStartY < iPageY,
		bOnEnd = bTop && bGoingDown || bBottom && bGoingUp;

	if (this._bHorizontalScroll === undefined) { // check once
		this._bHorizontalScroll = Math.abs(this._iStartY - iPageY) < Math.abs(this._iStartX - oEvent.touches[0].pageX);
	}

	if (this._bHorizontalScroll || !bOnEnd) {

		// to prevent the rubber-band effect we are calling prevent default on touchmove
		// from jquery.sap.mobile but this breaks the scrolling nature of the textarea
		oEvent.setMarked();
	}
};