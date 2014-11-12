/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.ShellHeadUserItem.
jQuery.sap.declare("sap.ui.unified.ShellHeadUserItem");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.core.Element");


/**
 * Constructor for a new ShellHeadUserItem.
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
 * <li>{@link #getUsername username} : string (default: '')</li>
 * <li>{@link #getImage image} : sap.ui.core.URI</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.ui.unified.ShellHeadUserItem#event:press press} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.core.Element#constructor sap.ui.core.Element}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * User Header Action Item of the Shell.
 * @extends sap.ui.core.Element
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.22.0
 * @name sap.ui.unified.ShellHeadUserItem
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Element.extend("sap.ui.unified.ShellHeadUserItem", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"username" : {type : "string", group : "Appearance", defaultValue : ''},
		"image" : {type : "sap.ui.core.URI", group : "Appearance", defaultValue : null}
	},
	events : {
		"press" : {}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.ShellHeadUserItem with name <code>sClassName</code> 
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
 * @name sap.ui.unified.ShellHeadUserItem.extend
 * @function
 */

sap.ui.unified.ShellHeadUserItem.M_EVENTS = {'press':'press'};


/**
 * Getter for property <code>username</code>.
 * The name of the user.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>username</code>
 * @public
 * @name sap.ui.unified.ShellHeadUserItem#getUsername
 * @function
 */

/**
 * Setter for property <code>username</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sUsername  new value for property <code>username</code>
 * @return {sap.ui.unified.ShellHeadUserItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.ShellHeadUserItem#setUsername
 * @function
 */


/**
 * Getter for property <code>image</code>.
 * An image of the user, normally an URI to a image but also an icon from the sap.ui.core.IconPool is possible.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.URI} the value of property <code>image</code>
 * @public
 * @name sap.ui.unified.ShellHeadUserItem#getImage
 * @function
 */

/**
 * Setter for property <code>image</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.URI} sImage  new value for property <code>image</code>
 * @return {sap.ui.unified.ShellHeadUserItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.ShellHeadUserItem#setImage
 * @function
 */


/**
 * Event is fired when the user presses the button.
 *
 * @name sap.ui.unified.ShellHeadUserItem#press
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'press' event of this <code>sap.ui.unified.ShellHeadUserItem</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.ui.unified.ShellHeadUserItem</code>.<br/> itself. 
 *  
 * Event is fired when the user presses the button.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.unified.ShellHeadUserItem</code>.<br/> itself.
 *
 * @return {sap.ui.unified.ShellHeadUserItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.ShellHeadUserItem#attachPress
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'press' event of this <code>sap.ui.unified.ShellHeadUserItem</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.ui.unified.ShellHeadUserItem} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.ShellHeadUserItem#detachPress
 * @function
 */

/**
 * Fire event press to attached listeners.
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.unified.ShellHeadUserItem} <code>this</code> to allow method chaining
 * @protected
 * @name sap.ui.unified.ShellHeadUserItem#firePress
 * @function
 */


// Start of sap\ui\unified\ShellHeadUserItem.js
jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.core.IconPool.getIconInfo("", ""); //Ensure Icon Font is loaded

sap.ui.unified.ShellHeadUserItem.prototype.onclick = function(oEvent){
	this.firePress();
};

sap.ui.unified.ShellHeadUserItem.prototype.onsapspace = sap.ui.unified.ShellHeadUserItem.prototype.onclick;

sap.ui.unified.ShellHeadUserItem.prototype.setImage = function(sImage){
	this.setProperty("image", sImage, true);
	if(this.getDomRef()){
		this._refreshImage();
	}
	return this;
};

sap.ui.unified.ShellHeadUserItem.prototype._refreshImage = function(){
	var $Ico = this.$("img");
	var sImage = this.getImage();
	if(!sImage){
		$Ico.html("").css("style", "").css("display", "none");
	}else if(sap.ui.core.IconPool.isIconURI(sImage)){
		var oIconInfo = sap.ui.core.IconPool.getIconInfo(sImage);
		$Ico.html("").css("style", "");
		if(oIconInfo){
			$Ico.text(oIconInfo.content).css("font-family", "'" + oIconInfo.fontFamily + "'");
		}
	}else{
		var $Image = this.$("img-inner");
		if($Image.length == 0 || $Image.attr("src") != sImage){
			$Ico.css("style", "").html("<img id='" + this.getId() + "-img-inner' src='" + jQuery.sap.encodeHTML(sImage) + "'></img>");
		}
	}
};

sap.ui.unified.ShellHeadUserItem.prototype._checkAndAdaptWidth = function(bShellSearchVisible){
	if(!this.getDomRef()){
		return false;
	}
	
	var $Ref = this.$(),
		$NameRef = this.$("name");
	var iBeforeWidth = $Ref.width();
	$Ref.toggleClass("sapUiUfdShellHeadUsrItmLimit", false);
	//User name cannot be larger than 240px
	//(if a search field is shown in the shell this max size decreases depending on the screen width)
	var iMax = 240;
	if(bShellSearchVisible){
		iMax = Math.min(iMax, 0.5*document.documentElement.clientWidth - 225);
	}
	if(iMax < $NameRef.width()){
		$Ref.toggleClass("sapUiUfdShellHeadUsrItmLimit", true);
	}
	return iBeforeWidth != $Ref.width();
};
