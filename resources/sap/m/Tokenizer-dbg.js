/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Tokenizer.
jQuery.sap.declare("sap.m.Tokenizer");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Tokenizer.
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
 * <li>{@link #getEditable editable} : boolean (default: true)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getTokens tokens} <strong>(default aggregation)</strong> : sap.m.Token[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.Tokenizer#event:tokenChange tokenChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Tokenizer displays multiple tokens
 * @extends sap.ui.core.Control
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.Tokenizer
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.m.Tokenizer", { metadata : {

	library : "sap.m",
	properties : {
		"editable" : {type : "boolean", group : "Misc", defaultValue : true},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
		"visible" : {type : "boolean", group : "Appearance", defaultValue : true}
	},
	defaultAggregation : "tokens",
	aggregations : {
		"tokens" : {type : "sap.m.Token", multiple : true, singularName : "token"}
	},
	events : {
		"tokenChange" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.Tokenizer with name <code>sClassName</code> 
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
 * @name sap.m.Tokenizer.extend
 * @function
 */

sap.m.Tokenizer.M_EVENTS = {'tokenChange':'tokenChange'};


/**
 * Getter for property <code>editable</code>.
 * true if tokens shall be editable otherwise false
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>editable</code>
 * @public
 * @name sap.m.Tokenizer#getEditable
 * @function
 */

/**
 * Setter for property <code>editable</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bEditable  new value for property <code>editable</code>
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#setEditable
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Defines the width of the Tokenizer.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.m.Tokenizer#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#setWidth
 * @function
 */


/**
 * Getter for property <code>visible</code>.
 * Determines whether the tokenizer is visible.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>visible</code>
 * @public
 * @name sap.m.Tokenizer#getVisible
 * @function
 */

/**
 * Setter for property <code>visible</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bVisible  new value for property <code>visible</code>
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#setVisible
 * @function
 */


/**
 * Getter for aggregation <code>tokens</code>.<br/>
 * the currently displayed tokens
 * 
 * <strong>Note</strong>: this is the default aggregation for Tokenizer.
 * @return {sap.m.Token[]}
 * @public
 * @name sap.m.Tokenizer#getTokens
 * @function
 */


/**
 * Inserts a token into the aggregation named <code>tokens</code>.
 *
 * @param {sap.m.Token}
 *          oToken the token to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the token should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the token is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the token is inserted at 
 *             the last position        
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#insertToken
 * @function
 */

/**
 * Adds some token <code>oToken</code> 
 * to the aggregation named <code>tokens</code>.
 *
 * @param {sap.m.Token}
 *            oToken the token to add; if empty, nothing is inserted
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#addToken
 * @function
 */

/**
 * Removes an token from the aggregation named <code>tokens</code>.
 *
 * @param {int | string | sap.m.Token} vToken the token to remove or its index or id
 * @return {sap.m.Token} the removed token or null
 * @public
 * @name sap.m.Tokenizer#removeToken
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>tokens</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.Token[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.Tokenizer#removeAllTokens
 * @function
 */

/**
 * Checks for the provided <code>sap.m.Token</code> in the aggregation named <code>tokens</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.Token}
 *            oToken the token whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.m.Tokenizer#indexOfToken
 * @function
 */
	

/**
 * Destroys all the tokens in the aggregation 
 * named <code>tokens</code>.
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#destroyTokens
 * @function
 */


/**
 * fired when the tokens aggregation changed (add / remove token)
 *
 * @name sap.m.Tokenizer#tokenChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'tokenChange' event of this <code>sap.m.Tokenizer</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Tokenizer</code>.<br/> itself. 
 *  
 * fired when the tokens aggregation changed (add / remove token)
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Tokenizer</code>.<br/> itself.
 *
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#attachTokenChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'tokenChange' event of this <code>sap.m.Tokenizer</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Tokenizer#detachTokenChange
 * @function
 */

/**
 * Fire event tokenChange to attached listeners.
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Tokenizer} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Tokenizer#fireTokenChange
 * @function
 */


// Start of sap\m\Tokenizer.js
///**
// * This file defines behavior for the control,
// */

// When to create a scroll delegate (library) or using pure CSS
sap.m.Tokenizer.prototype._bDoScrollViaLibrary = !sap.ui.Device.system.desktop;
sap.m.Tokenizer.prototype._bDoScrollWin8 = sap.ui.Device.os.windows && sap.ui.Device.os.version === 8;
sap.m.Tokenizer.prototype._bDoTouchScroll = sap.m.Tokenizer.prototype._bDoScrollViaLibrary
		|| sap.m.Tokenizer.prototype._bDoScrollWin8;

sap.m.Tokenizer.prototype.init = function() {
	//if bScrollToEndIsActive === true, than tokenizer will keep last token visible
	this._bScrollToEndIsActive = false;
	
	this._aTokenValidators = [];
	
	if (this._bDoScrollViaLibrary) {
		jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");
		var sId = this.getId() + "-scrollContainer";

		var _nonTouchScrolling;
		if (sap.ui.Device.os.android && sap.ui.Device.os.version < 4.4 && !sap.ui.Device.browser.chrome) {
			_nonTouchScrolling = true;
		} else {
			_nonTouchScrolling = false;
		}		

		this._oScroller = new sap.ui.core.delegate.ScrollEnablement(this, sId, {
			horizontal : true,
			vertical : false,
			nonTouchScrolling : _nonTouchScrolling
		});

	} else if (this._bDoScrollWin8) {
		// in the case of Windows 8 we use no special library since scrolling there is a. working nicely without it and
		// b. there are issues with scrolling when using the ScrollEnablement
		this.addStyleClass("sapMTokenizerWin8");
	}
};

/**
 * Function returns the internally used scroll delegate
 * 
 * @public
 * @returns {sap.ui.core.delegate.ScrollEnablement}
 */
sap.m.Tokenizer.prototype.getScrollDelegate = function() {
	return this._oScroller;
};

/**
 * Function scrolls the tokens to the end
 * 
 * @public
 * @param {boolean}
 *          bInitialize indicates if we should reset the 'scroll-to-end-pending' flag; if true we would reset this flag
 */
sap.m.Tokenizer.prototype.scrollToEnd = function() {
	
	if (!this._bScrollToEndIsActive){
		this._bScrollToEndIsActive = true;
		
		var that = this;		
		var domRef = this.getDomRef();
		if (domRef){
			this._sResizeHandlerId = sap.ui.core.ResizeHandler.register(domRef, function() {
				that._doScrollToEnd();
			});
		}		
	}	
	
	this._doScrollToEnd();
};

/**
 * Function sets the tokenizer's width in pixels, if the last token is wider than the new tokenizer width, the token gets truncated
 * 
 * @public
 * @param {number}
 *          nWidth - the new width in pixels
 */
sap.m.Tokenizer.prototype.setPixelWidth = function(nWidth){	
	var lastToken = null;
	var $lastToken = null;
	var that = this;
	
	if (this.getTokens().length > 0) {
		lastToken = this.getTokens()[this.getTokens().length - 1];
		$lastToken = lastToken.$();
		if ($lastToken) {
			$lastToken.removeAttr("style");
		}
	}
	
	// when token selected we no longer truncate; thereby the delete icon is visible
	var fSelectHandler = null; 
	fSelectHandler = function() {
		this.$().removeAttr("style");
		this.detachSelect(fSelectHandler);
		that.scrollToEnd();
	};

	if ($lastToken) {
		var widthOfLastToken = $lastToken.width();
		if (!lastToken.getSelected() && nWidth < widthOfLastToken) {
			// truncate last token if not selected and not completely visible
			$lastToken.outerWidth(nWidth, true);
			$lastToken.css("overflow", "hidden");
			$lastToken.css("text-overflow", "ellipsis");
			$lastToken.css("white-space", "nowrap");

			lastToken.attachSelect(fSelectHandler);			
		} else {
		  // last token is completely visible
			lastToken.detachSelect(fSelectHandler);
			
		}
		
		this.scrollToEnd();
	}
	this.$().css("width", nWidth + "px");
	
	if (this._oScroller) {
		this._oScroller.refresh();
	}
	
};

sap.m.Tokenizer.prototype._doScrollToEnd = function(){	
	var thisDomRef = this.getDomRef();
	if (!thisDomRef) {			
		return;
	}

	var $this = this.$();
	var scrollDiv = $this.find(".sapMTokenizerScrollContainer")[0];
	$this[0].scrollLeft = scrollDiv.scrollWidth;
};

/**
 * Function scrolls the tokens to the start
 * 
 * @public
 * 
 */
sap.m.Tokenizer.prototype.scrollToStart = function() {
	this._deactivateScrollToEnd();
	
	var thisDomRef = this.getDomRef();	

	if (!thisDomRef) {
		return;
	}

	var jMultiInput = jQuery(thisDomRef);
	jMultiInput[0].scrollLeft = 0;
};

sap.m.Tokenizer.prototype._deactivateScrollToEnd = function(){
	this._deregisterResizeHandler();
	this._bScrollToEndIsActive = false;	
};

/**
 * Function returns the tokens' width
 * 
 * @public
 * 
 * @returns
 * 	the complete tokens' width
 */
sap.m.Tokenizer.prototype.getScrollWidth = function(){
	return this.$().children(".sapMTokenizerScrollContainer")[0].scrollWidth;	
};

sap.m.Tokenizer.prototype.onAfterRendering = function() {	

	if (sap.ui.core.Control.prototype.onAfterRendering){
		sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments);
	}

	if (this._bScrollToEndIsActive){
		var that = this;		
		this._sResizeHandlerId = sap.ui.core.ResizeHandler.register(this.getDomRef(), function() {
				that._doScrollToEnd();
		});
	}
};


sap.m.Tokenizer.prototype.saptabnext = function(oEvent) {
	this.selectAllTokens(false);
};

sap.m.Tokenizer.prototype.onkeydown = function(oEvent) {
	if (oEvent.which === jQuery.sap.KeyCodes.TAB) {
		this.selectAllTokens(false);
	}
};

sap.m.Tokenizer.prototype.onsapbackspace = function(oEvent) {
	if (this.getSelectedTokens().length === 0) {
		this.onsapprevious(oEvent);
	} else if (this.getEditable()){		
		this.removeSelectedTokens();
	}

	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.m.Tokenizer.prototype.onsapdelete = function(oEvent) {
	if (this.getEditable()){
		this.removeSelectedTokens();
	}
};

sap.m.Tokenizer.prototype.onsapnext = function(oEvent) {
	if (oEvent.which === jQuery.sap.KeyCodes.ARROW_DOWN) {
		return;
  }
	
	var iLength = this.getTokens().length;

	if (iLength === 0) {
		return;
	}

	this.selectAllTokens(false);

	var oFocusedElement = jQuery(document.activeElement).control()[0]; 
	if (oFocusedElement === this) {
		// focus is on tokenizer itself - we do not handle this event and let it bubble
		return;
	}

	// oFocusedElement could be undefined since the focus element might not correspond to a SAPUI5 Control
	var index = oFocusedElement ? this.getTokens().indexOf(oFocusedElement) : -1;

	if (index < iLength - 1) {
		this.getTokens()[index + 1].setSelected(true);
		oEvent.preventDefault();
	} else if (index === iLength - 1) {		
		// focus is on last token - we do not handle this event and let it bubble
		this.scrollToEnd();
		return;
	}

	this._deactivateScrollToEnd();
	
	oEvent.setMarked();

};

sap.m.Tokenizer.prototype.onsapprevious = function(oEvent) {
	if (oEvent.which === jQuery.sap.KeyCodes.ARROW_UP) {
  	return;
  }
	
	if (this.getSelectedTokens().length === this.getTokens().length) {
		// select all situation
		return;
	}

	if (this.getTokens().length === 0) {
		return;
	}	
	
	var oFocusedElement = sap.ui.getCore().byId(jQuery(document.activeElement).attr("id"));

	// oFocusedElement could be undefined since the focus element might not correspond to a SAPUI5 Control
	var index = oFocusedElement ? this.getTokens().indexOf(oFocusedElement) : -1;

	if (index > 0) {
		this.getTokens()[index - 1].setSelected(true);
	} else if (index === -1) {
		this.getTokens()[this.getTokens().length - 1].setSelected(true);
	}

	this._deactivateScrollToEnd();
	
};

/**
 * Function adds an validation callback called before any new token gets added to the tokens aggregation
 * 
 * @public
 * @param {function}
 *          fValidator
 */
sap.m.Tokenizer.prototype.addValidator = function(fValidator) {
	if (typeof (fValidator) === "function") {
		this._aTokenValidators.push(fValidator);
	}
};

/**
 * Function removes an validation callback
 * 
 * @public
 * @param {function}
 *          fValidator
 */
sap.m.Tokenizer.prototype.removeValidator = function(fValidator) {
	var i = this._aTokenValidators.indexOf(fValidator);
	if (i !== -1) {
		this._aTokenValidators.splice(i, 1);
	}
};

/**
 * Function removes all validation callbacks
 * 
 * @public
 */
sap.m.Tokenizer.prototype.removeAllValidators = function() {
	this._aTokenValidators = [];
};

/**
 * Function validates a given token using the set validators
 * 
 * @private
 * @param {object}
 *          oParameters - parameter bag containing fields for text, token, suggestionObject and validation callback
 * @param {function[]}
 *          [optional] aValidator - all validators to be used
 * @returns {sap.m.Token} - a valid token or null
 */
sap.m.Tokenizer.prototype._validateToken = function(oParameters, aValidators) {
	var sText = oParameters.text;
	var oToken = oParameters.token;
	var fValidateCallback = oParameters.validationCallback;
	var oSuggestionObject = oParameters.suggestionObject;

	var i, validator, length;

	if (!aValidators) {
		aValidators = this._aTokenValidators;
	}

	length = aValidators.length;
	if (length === 0) { // no custom validators, just return given token
		if (!oToken && fValidateCallback) {
			fValidateCallback(false);
		}
		return oToken;
	}

	for (i = 0; i < length; i++) {
		validator = aValidators[i];

		oToken = validator({
			text : sText,
			suggestedToken : oToken,
			suggestionObject : oSuggestionObject,
			asyncCallback : this._getAsyncValidationCallback(aValidators, i, sText, oSuggestionObject, fValidateCallback)
		});

		if (!oToken) {
			if (fValidateCallback) {
				fValidateCallback(false);
			}
			return null;
		}

		if (oToken === sap.m.Tokenizer.WaitForAsyncValidation) {
			return null;
		}
	}

	return oToken;
};

sap.m.Tokenizer.prototype._getAsyncValidationCallback = function(aValidators, iValidatorIndex, sInitialText,
		oSuggestionObject, fValidateCallback) {
	var that = this;
	return function(oToken) {
		if (oToken) { // continue validating
			aValidators = aValidators.slice(iValidatorIndex + 1);
			oToken = that._validateToken({
				text : sInitialText,
				token : oToken,
				suggestionObject : oSuggestionObject,
				validationCallback : fValidateCallback
			}, aValidators);
			that._addUniqueToken(oToken, fValidateCallback);
		} else {
			if (fValidateCallback) {
				fValidateCallback(false);
			}
		}
	};
};

/**
 * Function validates the given text and adds a new token if validation was successful
 * 
 * @public
 * @param {object}
 *          oParameters - parameter bag containing following fields: {sap.m.String} text - the source text {sap.m.Token}
 *          [optional] token - a suggested token {object} [optional] suggestionObject - any object used to find the
 *          suggested token {function} [optional] validationCallback - callback which gets called after validation has
 *          finished
 */
sap.m.Tokenizer.prototype.addValidateToken = function(oParameters) {
	var oToken = this._validateToken(oParameters);
	this._addUniqueToken(oToken, oParameters.validationCallback);
};
/**
 * Function adds token if it does not already exist
 * 
 * @private
 * @param {sap.m.Token}
 *          token
 * @param {function}
 *          [optional] fValidateCallback
 */
sap.m.Tokenizer.prototype._addUniqueToken = function(oToken, fValidateCallback) {
	if (!oToken) {
		return;
	}

	if (fValidateCallback) {
		fValidateCallback(true);
	}

	var tokenExists = this._tokenExists(oToken);
	if (tokenExists) {
		return;
	}

	this.addToken(oToken);

	this.fireTokenChange({
		addedTokens : [oToken],
		removedTokens : [],
		type : sap.m.Tokenizer.TokenChangeType.TokensChanged
	});
};

/**
 * Function checks if a given token already exists in the tokens aggregation based on their keys
 * 
 * @private
 * @param {sap.m.Token}
 *          Token
 * @return {boolean} true if it exists, otherwise false
 */
sap.m.Tokenizer.prototype._tokenExists = function(oToken) {
	var tokens = this.getTokens();

	if (!(tokens && tokens.length)) {
		return false;
	}

	var key = oToken.getKey();
	if (!key) {
		return false;
	}

	var length = tokens.length;
	for (var i = 0; i < length; i++) {
		var currentToken = tokens[i];
		var currentKey = currentToken.getKey();

		if (currentKey === key) {
			return true;
		}
	}

	return false;
};

sap.m.Tokenizer.prototype.addToken = function(oToken, bSuppressInvalidate) {
	this.addAggregation("tokens", oToken, bSuppressInvalidate);
	oToken.attachDelete(this._onDeleteToken, this);
	oToken.attachPress(this._onTokenPress, this);

	oToken.setEditable(this.getEditable());
	
	this.scrollToEnd();

	this.fireTokenChange({
		token : oToken,
		type : sap.m.Tokenizer.TokenChangeType.Added
	});
};

sap.m.Tokenizer.prototype.removeToken = function(oToken) {
	oToken = this.removeAggregation("tokens", oToken);
	if (oToken) {
		oToken.detachDelete(this._onDeleteToken, this);
		oToken.detachPress(this._onTokenPress, this);
	}
	
	this.scrollToEnd();

	this.fireTokenChange({
		token : oToken,
		type : sap.m.Tokenizer.TokenChangeType.Removed
	});

	return oToken;
};

sap.m.Tokenizer.prototype.setTokens = function(aTokens) {
	var oldTokens = this.getTokens();
	this.removeAllTokens(false);

	var i;
	for (i = 0; i < aTokens.length; i++) {
		this.addToken(aTokens[i], true);
	}

	this.invalidate();
	this.rerender();

	this.scrollToEnd();
	
	this.fireTokenChange({
		addedTokens : aTokens,
		removedTokens : oldTokens,
		type : sap.m.Tokenizer.TokenChangeType.TokensChanged
	});
};

sap.m.Tokenizer.prototype.removeAllTokens = function(bFireEvent) {
	var i, length, token, tokens;
	tokens = this.getTokens();
	length = tokens.length;
	for (i = 0; i < length; i++) {
		token = tokens[i];
		token.detachDelete(this._onDeleteToken, this);
		token.detachPress(this._onTokenPress, this);
	}

	this.removeAllAggregation("tokens");

	if (typeof (bFireEvent) === "boolean" && !bFireEvent) {
		return;
	}

	this.fireTokenChange({
		addedTokens : [],
		removedTokens : tokens,
		type : sap.m.Tokenizer.TokenChangeType.TokensChanged
	});

	this.fireTokenChange({
		tokens : tokens,
		type : sap.m.Tokenizer.TokenChangeType.RemovedAll
	});
};

/**
 * Function removes all selected tokens
 * 
 * @public
 * @returns {sap.m.Tokenizer} - this for chaining
 */
sap.m.Tokenizer.prototype.removeSelectedTokens = function() {
	var tokensToBeDeleted = this.getSelectedTokens();
	var token, i, length;
	length = tokensToBeDeleted.length;
	if (length === 0) {
		return this;
	}

	for (i = 0; i < length; i++) {
		token = tokensToBeDeleted[i];
		this.removeToken(token);
	}

	this.scrollToEnd();
	
	this.fireTokenChange({
		addedTokens : [],
		removedTokens : tokensToBeDeleted,
		type : sap.m.Tokenizer.TokenChangeType.TokensChanged
	});

	return this;
};

/**
 * Function selects all tokens
 * 
 * @public
 * @param {boolean}
 *          [optional] bSelect - true for selecting, false for deselecting
 * @returns {sap.m.Tokenizer} - this for chaining
 */
sap.m.Tokenizer.prototype.selectAllTokens = function(bSelect) {
	if (bSelect === undefined) {
		bSelect = true;
	}

	var tokens = this.getTokens();
	var token, i, length;
	length = tokens.length;
	for (i = 0; i < length; i++) {
		token = tokens[i];
		token.setSelected(bSelect, true);
	}

	return this;
};

/**
 * Function returns all currently selected tokens
 * 
 * @public
 * @returns {sap.m.Token[]} - array of selected tokens or empty array
 */
sap.m.Tokenizer.prototype.getSelectedTokens = function() {
	var aSelectedTokens = [];
	var i, length, token, tokens;
	tokens = this.getTokens();
	length = tokens.length;
	for (i = 0; i < length; i++) {
		token = tokens[i];
		if (token.getSelected()) {
			aSelectedTokens.push(token);
		}
	}
	return aSelectedTokens;
};

/**
 * Function is called when token's delete icon was pressed function removes token from Tokenizer's aggregation
 * 
 * @private
 * @param oEvent
 */
sap.m.Tokenizer.prototype._onDeleteToken = function(oEvent) {
	var token = oEvent.getParameter("token");
	if (token) {
		this.removeToken(token);
		this.fireTokenChange({
			addedTokens : [],
			removedTokens : [token],
			type : sap.m.Tokenizer.TokenChangeType.TokensChanged
		});
	}

};

/**
 * Function is called when token is pressed, toggles the token's selection state depending on ctrl key state, deselectes
 * other tokens
 * 
 * @private
 * @param {jQuery.Event}
 *          oEvent
 */
sap.m.Tokenizer.prototype._onTokenPress = function(oEvent) {
	var sourceToken = oEvent.oSource;
	sourceToken.setSelected(true);
};

sap.m.Tokenizer.prototype.setEditable = function(bEditable) {
	this.setProperty("editable", bEditable);

	var tokens = this.getTokens();
	var length = tokens.length;
	for (var i = 0; i < length; i++) {
		var currentToken = tokens[i];
		currentToken.setEditable(bEditable);
	}

	return this;
};

sap.m.Tokenizer.prototype.setWidth = function(sWidth) {
	this.setProperty("width", sWidth, true);
	this.$().css("width", this.getWidth());
	return this;
};

sap.m.Tokenizer.prototype.onsaphome = function(oEvent)
{
	this.scrollToStart();
};

sap.m.Tokenizer.prototype.onsapend = function(oEvent)
{
	this.scrollToEnd();
};




sap.m.Tokenizer.prototype.exit = function() {
	this._deregisterResizeHandler();
};

sap.m.Tokenizer.prototype._deregisterResizeHandler = function(){
	if (this._sResizeHandlerId) {
		sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);
		delete this._sResizeHandlerId;
	}
};

sap.m.Tokenizer.TokenChangeType = {
	Added : "added",
	Removed : "removed",
	RemovedAll : "removedAll",
	TokensChanged : "tokensChanged"
};

sap.m.Tokenizer.WaitForAsyncValidation = "sap.m.Tokenizer.WaitForAsyncValidation";
