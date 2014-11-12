/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.FeedInput.
jQuery.sap.declare("sap.m.FeedInput");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new FeedInput.
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
 * <li>{@link #getMaxLength maxLength} : int (default: 0)</li>
 * <li>{@link #getPlaceholder placeholder} : string</li>
 * <li>{@link #getValue value} : string</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li>
 * <li>{@link #getIcon icon} : sap.ui.core.URI</li>
 * <li>{@link #getShowIcon showIcon} : boolean (default: true)</li>
 * <li>{@link #getIconDensityAware iconDensityAware} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.FeedInput#event:post post} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The Feed Input allows the user to enter text for a new feed entry and then post it.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.22
 * @name sap.m.FeedInput
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.FeedInput", { metadata : {

	library : "sap.m",
	properties : {
		"enabled" : {type : "boolean", group : "Behavior", defaultValue : true},
		"maxLength" : {type : "int", group : "Behavior", defaultValue : 0},
		"placeholder" : {type : "string", group : "Appearance", defaultValue : null},
		"value" : {type : "string", group : "Data", defaultValue : null},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true},
		"icon" : {type : "sap.ui.core.URI", group : "Data", defaultValue : null},
		"showIcon" : {type : "boolean", group : "Behavior", defaultValue : true},
		"iconDensityAware" : {type : "boolean", group : "Appearance", defaultValue : true}
	},
	events : {
		"post" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.FeedInput with name <code>sClassName</code> 
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
 * @name sap.m.FeedInput.extend
 * @function
 */

sap.m.FeedInput.M_EVENTS = {'post':'post'};


/**
 * Getter for property <code>enabled</code>.
 * Set this flag to "false" to disable both text input and post button.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>enabled</code>
 * @public
 * @name sap.m.FeedInput#getEnabled
 * @function
 */

/**
 * Setter for property <code>enabled</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEnabled  new value for property <code>enabled</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setEnabled
 * @function
 */


/**
 * Getter for property <code>maxLength</code>.
 * The maximum length (the maximum number of characters) for the feed input's value. By default this is not limited.
 *
 * Default value is <code>0</code>
 *
 * @return {int} the value of property <code>maxLength</code>
 * @public
 * @name sap.m.FeedInput#getMaxLength
 * @function
 */

/**
 * Setter for property <code>maxLength</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {int} iMaxLength  new value for property <code>maxLength</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setMaxLength
 * @function
 */


/**
 * Getter for property <code>placeholder</code>.
 * The placeholder text shown in the input area as long as the user has not entered any text value.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>placeholder</code>
 * @public
 * @name sap.m.FeedInput#getPlaceholder
 * @function
 */

/**
 * Setter for property <code>placeholder</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sPlaceholder  new value for property <code>placeholder</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setPlaceholder
 * @function
 */


/**
 * Getter for property <code>value</code>.
 * The text value of the feed input. As long as the user has not entered any text the post butoon is disabled
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>value</code>
 * @public
 * @name sap.m.FeedInput#getValue
 * @function
 */

/**
 * Setter for property <code>value</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sValue  new value for property <code>value</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setValue
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Set this flag to "false" to hide the feed input on the screen. In this case the control will not be rendered.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.FeedInput#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setVisible
 * @function
 */


/**
 * Getter for property <code>icon</code>.
 * Icon to be displayed as a graphical element within the feed input. This can be an image or an icon from the icon font.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>icon</code>
 * @public
 * @name sap.m.FeedInput#getIcon
 * @function
 */

/**
 * Setter for property <code>icon</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sIcon  new value for property <code>icon</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setIcon
 * @function
 */


/**
 * Getter for property <code>showIcon</code>.
 * If set to "true" (default), icons will be displayed. In case no icon is provided the standard placeholder will be displayed. if set to "false" icons are hidden
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showIcon</code>
 * @public
 * @name sap.m.FeedInput#getShowIcon
 * @function
 */

/**
 * Setter for property <code>showIcon</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowIcon  new value for property <code>showIcon</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setShowIcon
 * @function
 */


/**
 * Getter for property <code>iconDensityAware</code>.
 * Some mobile devices support higher resolution images while others do not. Therefore you should provide image resources for all relevant densities.
 * If the property is set to "true" one or more requests are sent to the server trying to get the density perfect version of an image. If an image of a certain density is not available, the image control falls back to the default image, which should be provided as well.
 * 
 * If you do not have higher resolution images you should set the property to "false" to avoid unnecessary roundtrips.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>iconDensityAware</code>
 * @public
 * @name sap.m.FeedInput#getIconDensityAware
 * @function
 */

/**
 * Setter for property <code>iconDensityAware</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bIconDensityAware  new value for property <code>iconDensityAware</code>
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#setIconDensityAware
 * @function
 */


/**
 * The post event is triggered when the user has entered a value and pressed the post button. After firing this event the value is reset.
 *
 * @name sap.m.FeedInput#post
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.value The value of the feed input before reseting it.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'post' event of this <code>sap.m.FeedInput</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.FeedInput</code>.<br/> itself. 
 *  
 * The post event is triggered when the user has entered a value and pressed the post button. After firing this event the value is reset.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.FeedInput</code>.<br/> itself.
 *
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#attachPost
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'post' event of this <code>sap.m.FeedInput</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.FeedInput#detachPost
 * @function
 */

/**
 * Fire event post to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The value of the feed input before reseting it.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.FeedInput} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.FeedInput#firePost
 * @function
 */


// Start of sap\m\FeedInput.js


/////////////////////////////////// Lifecycle /////////////////////////////////////////////////////////
jQuery.sap.require("sap.ui.core.IconPool");
jQuery.sap.require("sap.ui.core.HTML");

/**
 * Overrides sap.ui.core.Element.init
 */
sap.m.FeedInput.prototype.init = function () {
	// override text defaults
	var oBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");
	this.setProperty("placeholder", oBundle.getText("FEEDINPUT_PLACEHOLDER"), true);
};

/**
 * Overrides sap.ui.core.Element.exit
 */
sap.m.FeedInput.prototype.exit = function () {
	if (this._oTextArea) {
		this._oTextArea.destroy();
	}
	if (this._oButton) {
		this._oButton.destroy();
	}
	if (this._oImageControl) {
		this._oImageControl.destroy();
	}
};

/////////////////////////////////// Properties /////////////////////////////////////////////////////////

sap.m.FeedInput.prototype.setMaxLength = function (iMaxLength) {
	this.setProperty("maxLength", iMaxLength, true);
	this._getTextArea().setMaxLength(iMaxLength);
	return this;
};

sap.m.FeedInput.prototype.setValue = function (sValue) {
	this.setProperty("value", sValue, true);
	this._getTextArea().setValue(sValue);
	this._enablePostButton();
	return this;
};

sap.m.FeedInput.prototype.setPlaceholder = function (sValue) {
	this.setProperty("placeholder", sValue, true);
	this._getTextArea().setPlaceholder(sValue);
	return this;
};

sap.m.FeedInput.prototype.setEnabled = function (bEnabled) {
	this.setProperty("enabled", bEnabled, true);
	this._getTextArea().setEnabled(bEnabled);
	this._enablePostButton();
	return this;
};

/////////////////////////////////// Private /////////////////////////////////////////////////////////

/**
 * Access and initialization for the text area
 */
sap.m.FeedInput.prototype._getTextArea = function () {
	if (!this._oTextArea) {
		this._oTextArea = new sap.m.TextArea(this.getId() + "-textArea", {
			rows : 1,
			value : null,
			maxLength : this.getMaxLength(),
			placeholder : this.getPlaceholder(),
			liveChange : jQuery.proxy(function (oEvt) {
				var sValue = oEvt.getParameter("value");
				this.setProperty("value", sValue, true); // update myself without re-rendering
				this._enablePostButton();
			}, this)
		});
		this._oTextArea.setParent(this);
	}
	return this._oTextArea;
};

/**
 * Access and initialization for the button
 */
sap.m.FeedInput.prototype._getPostButton = function () {
	if (!this._oButton) {
		this._oButton = new sap.m.Button(this.getId() + "-button", {
			enabled : false,
			type : sap.m.ButtonType.Default,
			icon : "sap-icon://feeder-arrow",
			press : jQuery.proxy(function (oEvt) {
				this.firePost({
					value : this.getValue()
				});
				this.setValue(null);
				this._oTextArea.focus();
			}, this)
		});
		this._oButton.setParent(this);
	}
	return this._oButton;
};

/**
 * Enable post button depending on the current value
 */
sap.m.FeedInput.prototype._enablePostButton = function () {
	var sValue = this.getProperty("value");
	var bInputEnabled = this.getProperty("enabled");
	var bPostButtonEnabled = (bInputEnabled && !!sValue && sValue.trim().length > 0);
	var oButton = this._getPostButton();
	if (oButton.getEnabled() !== bPostButtonEnabled) {
		oButton.setEnabled(bPostButtonEnabled);
	}
};

/**
 * Lazy load feed icon image.
 *
 * @private
 */
sap.m.FeedInput.prototype._getImageControl = function() {
	
	var sIconSrc = this.getIcon() || sap.ui.core.IconPool.getIconURI("person-placeholder"),
		sImgId = this.getId() + '-icon',
		mProperties = { 
			src : sIconSrc,
			densityAware : this.getIconDensityAware()
		},
		aCssClasses = ['sapMFeedInImage'];

	this._oImageControl = sap.m.ImageHelper.getImageControl(sImgId, this._oImageControl, this, mProperties, aCssClasses);

	return this._oImageControl;
};
