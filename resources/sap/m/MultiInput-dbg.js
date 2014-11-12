/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.MultiInput.
jQuery.sap.declare("sap.m.MultiInput");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.Input");


/**
 * Constructor for a new MultiInput.
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
 * <ul></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getTokens tokens} : sap.m.Token[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.MultiInput#event:tokenChange tokenChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.m.Input#constructor sap.m.Input}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * MultiInput provides functionality to add / remove / enter tokens
 * @extends sap.m.Input
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.MultiInput
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.Input.extend("sap.m.MultiInput", { metadata : {

	library : "sap.m",
	aggregations : {
		"tokens" : {type : "sap.m.Token", multiple : true, singularName : "token"}, 
		"tokenizer" : {type : "sap.m.Tokenizer", multiple : false, visibility : "hidden"}
	},
	events : {
		"tokenChange" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.MultiInput with name <code>sClassName</code> 
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
 * @name sap.m.MultiInput.extend
 * @function
 */

sap.m.MultiInput.M_EVENTS = {'tokenChange':'tokenChange'};


/**
 * Getter for aggregation <code>tokens</code>.<br/>
 * the currently displayed tokens
 * 
 * @return {sap.m.Token[]}
 * @public
 * @name sap.m.MultiInput#getTokens
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
 * @return {sap.m.MultiInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiInput#insertToken
 * @function
 */

/**
 * Adds some token <code>oToken</code> 
 * to the aggregation named <code>tokens</code>.
 *
 * @param {sap.m.Token}
 *            oToken the token to add; if empty, nothing is inserted
 * @return {sap.m.MultiInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiInput#addToken
 * @function
 */

/**
 * Removes an token from the aggregation named <code>tokens</code>.
 *
 * @param {int | string | sap.m.Token} vToken the token to remove or its index or id
 * @return {sap.m.Token} the removed token or null
 * @public
 * @name sap.m.MultiInput#removeToken
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>tokens</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.Token[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.m.MultiInput#removeAllTokens
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
 * @name sap.m.MultiInput#indexOfToken
 * @function
 */
	

/**
 * Destroys all the tokens in the aggregation 
 * named <code>tokens</code>.
 * @return {sap.m.MultiInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiInput#destroyTokens
 * @function
 */


/**
 * fired when the tokens aggregation changed (add / remove token)
 *
 * @name sap.m.MultiInput#tokenChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'tokenChange' event of this <code>sap.m.MultiInput</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.MultiInput</code>.<br/> itself. 
 *  
 * fired when the tokens aggregation changed (add / remove token)
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.MultiInput</code>.<br/> itself.
 *
 * @return {sap.m.MultiInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiInput#attachTokenChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'tokenChange' event of this <code>sap.m.MultiInput</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.MultiInput} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.MultiInput#detachTokenChange
 * @function
 */

/**
 * Fire event tokenChange to attached listeners.
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.MultiInput} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.MultiInput#fireTokenChange
 * @function
 */


// Start of sap\m\MultiInput.js
jQuery.sap.require("sap.ui.core.Item");
jQuery.sap.require("sap.m.Token");

// **
// * This file defines behavior for the control,
// */
sap.m.MultiInput.prototype.init = function() {
	var that = this;

	sap.m.Input.prototype.init.call(this);

	this._bIsValidating = false;
	this._tokenizer = new sap.m.Tokenizer();

	this.setAggregation("tokenizer", this._tokenizer);
	this._tokenizer.attachTokenChange(function(args) {

		that.fireTokenChange(args.getParameters());
		that.invalidate();

		that._setContainerSizes();
		
		if(args.getParameter("type")==="tokensChanged" && args.getParameter("removedTokens").length > 0){
			that.focus();
		}
	});

	this.setShowValueHelp(true);
	this.setShowSuggestion(true);

	this.addStyleClass("sapMMultiInput");

	this.attachSuggestionItemSelected(function(eventArgs) {
		var item = null;
		var token = null;
		if (this._hasTabularSuggestions()) {
			item = eventArgs.getParameter("selectedRow");
		} else {
			item = eventArgs.getParameter("selectedItem");
			if (item) {
				token = new sap.m.Token({
					text : item.getText(),
					key : item.getKey()
				});
			}
		}

		if (item) {
			var text = this.getValue();
			that._tokenizer.addValidateToken({
				text : text,
				token : token,
				suggestionObject : item,
				validationCallback : function(validated) {
					if (validated) {
						that.setValue("");
					}
				}
			});
		}
	});

	this.attachLiveChange(function(eventArgs) {
		that._tokenizer.removeSelectedTokens();
		that._setContainerSizes();
	});

	sap.ui.Device.orientation.attachHandler(this._onOrientationChange, this);

	if (this._tokenizer._bDoTouchScroll && this._oSuggestionPopup) {
		// on certain touch devices the setting back of the selected value happens 'late', in "attachAfterClose" (in the
		// sap.m.Input), which is why we need - slightly later - to set the value back to ""
		this._oSuggestionPopup.attachAfterClose(function() {
			setTimeout(function() {
				that.setValue("");
				that._tokenizer.scrollToEnd();
			}, 0);
		});
	}

};

sap.m.MultiInput.prototype._onOrientationChange = function() {
	this._setContainerSizes();	
};

sap.m.MultiInput.prototype.getScrollDelegate = function() {
	return this._tokenizer._oScroller;
};

sap.m.MultiInput.prototype.exit = function() {

	if (this._sResizeHandlerId) {
		sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);
		delete this._sResizeHandlerId;
	}
};

sap.m.MultiInput.prototype._setContainerSizes = function() {

	var thisDomRef = this.getDomRef();
	if (!thisDomRef) {
		return;
	}
	var $this = this.$();	

	jQuery($this.find(".sapMInputBaseInner")[0]).removeAttr("style");

	// we go to the sapMMultiInputBorder child elements, this makes the computations easier
	var availableWidth = $this.find(".sapMMultiInputBorder").width();

	// calculate minimal needed width for input field
	var shadowDiv = $this.children(".sapMMultiInputShadowDiv")[0];
	jQuery(shadowDiv).text(this.getValue());

	var inputWidthMinimalNeeded = jQuery(shadowDiv).width();

	var tokenizerWidth = this._tokenizer.getScrollWidth();

	// the icon
	var iconWidth = $this.find(".sapMInputValHelp").outerWidth(true);

	var totalNeededWidth = tokenizerWidth + inputWidthMinimalNeeded + iconWidth;
	var inputWidth;
	var additionalWidth = 1;
	if (totalNeededWidth < availableWidth) {
		inputWidth = inputWidthMinimalNeeded + availableWidth - totalNeededWidth;
	} else {
		inputWidth = inputWidthMinimalNeeded + additionalWidth;
		tokenizerWidth = availableWidth - inputWidth - iconWidth;
	}
	
	jQuery($this.find(".sapMInputBaseInner")[0]).css("width", inputWidth + "px");
	
	this._tokenizer.setPixelWidth(tokenizerWidth);	

	if (this.getPlaceholder()) {
		this._sPlaceholder = this.getPlaceholder();
	}

	if (this.getTokens().length > 0) {
		this.setPlaceholder("");
	} else {
		this.setPlaceholder(this._sPlaceholder);
	}

};

sap.m.MultiInput.prototype.onAfterRendering = function() {
	var that = this;

	sap.m.Input.prototype.onAfterRendering.apply(this, arguments);

	this._setContainerSizes();	

	this._sResizeHandlerId = sap.ui.core.ResizeHandler.register(this.getDomRef(), function() {
		// we could have more or less space to our disposal, thus calculate size of input again
		that._setContainerSizes();		
	});

};

/**
 * Function adds an validation callback called before any new token gets added to the tokens aggregation
 * 
 * @public
 * @param {function}
 *          fValidator
 */
sap.m.MultiInput.prototype.addValidator = function(fValidator) {
	this._tokenizer.addValidator(fValidator);
};

/**
 * Function removes an validation callback
 * 
 * @public
 * @param {function}
 *          fValidator
 */
sap.m.MultiInput.prototype.removeValidator = function(fValidator) {
	this._tokenizer.removeValidator(fValidator);
};

/**
 * Function removes all validation callbacks
 * 
 * @public
 */
sap.m.MultiInput.prototype.removeAllValidators = function() {
	this._tokenizer.removeAllValidators();
};

sap.m.MultiInput.prototype.onsapnext = function(oEvent) {

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

	if (this._tokenizer === oFocusedElement || this._tokenizer.$().find(oFocusedElement.$()).length > 0) {
		// focus is on the tokenizer or on some descendant of the tokenizer and the event was not handled ->
		// we therefore handle the event and focus the input element
		this._scrollAndFocus();
	}

};

/**
 * Function is called on keyboard backspace, if cursor is in front of an token, token gets selected and deleted
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiInput.prototype.onsapbackspace = function(oEvent) {
	if (this.getCursorPosition() > 0 || !this.getEditable() || this.getValue().length > 0) {
		// deleting characters, not
		return;
	}

	sap.m.Tokenizer.prototype.onsapbackspace.apply(this._tokenizer, arguments);

	oEvent.preventDefault();
	oEvent.stopPropagation();	
};

/**
 * Function is called on delete keyboard input, deletes selected tokens
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiInput.prototype.onsapdelete = function(oEvent) {
	if (!this.getEditable()) {
		return;
	}

	if (this.getValue() && !this._completeTextIsSelected()) { // do not return if everything is selected
		return;
	}

	sap.m.Tokenizer.prototype.onsapdelete.apply(this._tokenizer, arguments);
};

sap.m.MultiInput.prototype.onkeydown = function(oEvent) {
	if (this.getValue().length === 0) {
		// only if there is no text
		if ((oEvent.ctrlKey || oEvent.metaKey) && oEvent.which === jQuery.sap.KeyCodes.A) { //metaKey for MAC command		
			this._tokenizer.focus();
			this._tokenizer.selectAllTokens(true);
			oEvent.preventDefault();
		}
	}
};

sap.m.MultiInput.prototype.onsapprevious = function(oEvent) {

	if (this._getIsSuggestionPopupOpen()) {
		return;
	}

	if (this.getCursorPosition() === 0) {
		if (oEvent.srcControl === this) {
			sap.m.Tokenizer.prototype.onsapprevious.apply(this._tokenizer, arguments);

			// we need this otherwise navigating with the left arrow key will trigger a scroll an the Tokens
			oEvent.preventDefault();
		}
	}
};

/**
 * Function scrolls the tokens to the end and focuses the input field.
 * 
 * @private
 */
sap.m.MultiInput.prototype._scrollAndFocus = function() {
	this._tokenizer.scrollToEnd();
	// we set the focus back via jQuery instead of this.focus() since the latter on phones lead to unwanted opening of the
	// suggest popup
	this.$().find("input").focus();
};

sap.m.MultiInput.prototype.onsaphome = function(oEvent) {
	sap.m.Tokenizer.prototype.onsaphome.apply(this._tokenizer, arguments);		
};

sap.m.MultiInput.prototype.onsapend = function(oEvent) {
	sap.m.Tokenizer.prototype.onsapend.apply(this._tokenizer, arguments);	

	oEvent.preventDefault();
};

/**
 * Function is called on keyboard enter, if possible, adds entered text as new token
 * 
 * @private
 * @param {jQuery.event}
 *          oEvent
 */
sap.m.MultiInput.prototype.onsapenter = function(oEvent) {
	if (sap.m.Input.prototype.onsapenter) {
		sap.m.Input.prototype.onsapenter.apply(this, arguments);
	}

	this._validateCurrentText();
};

sap.m.MultiInput.prototype.onsapfocusleave = function(oEvent) {

	var oPopup = this._oSuggestionPopup;
	var bNewFocusIsInSuggestionPopup = false;
	var bNewFocusIsInTokenizer = false;
	if (oPopup instanceof sap.m.Popover) {
		if (oEvent.relatedControlId) {
			bNewFocusIsInSuggestionPopup = jQuery.sap.containsOrEquals(oPopup.getFocusDomRef(), sap.ui.getCore().byId(
					oEvent.relatedControlId).getFocusDomRef());
			bNewFocusIsInTokenizer = jQuery.sap.containsOrEquals(this._tokenizer.getFocusDomRef(), sap.ui.getCore().byId(
					oEvent.relatedControlId).getFocusDomRef());
		}
	}

	if (!bNewFocusIsInTokenizer && !bNewFocusIsInSuggestionPopup) {
		this._setContainerSizes();
		this._tokenizer.scrollToEnd();
	}

	if (this._bIsValidating) { // an asynchronous validation is running, no need to trigger validation again
		if (sap.m.Input.prototype.onsapfocusleave) {
			sap.m.Input.prototype.onsapfocusleave.apply(this, arguments);
		}
		return;
	}

	if (sap.m.Input.prototype.onsapfocusleave) {
		sap.m.Input.prototype.onsapfocusleave.apply(this, arguments);
	}

	if (!bNewFocusIsInSuggestionPopup && oEvent.relatedControlId !== this.getId()
			&& oEvent.relatedControlId !== this._tokenizer.getId() && !bNewFocusIsInTokenizer) { // leaving control, validate
		// latest text
		if (this._completeTextIsSelected()){ //text was created via suggestion list and is selected
			this._validateCurrentText();
		}
	}
};

/**
 * Function tries to turn current text into a token
 * 
 * @private
 */
sap.m.MultiInput.prototype._validateCurrentText = function() {
	var text = this.getValue();
	if (!text || !this.getEditable()) {
		return;
	}

	text = text.trim();

	if (!text) {
		return;
	}

	var item = null;

	if (this._getIsSuggestionPopupOpen()) { // only take item from suggestion list if popup is open, otherwise it can be
		// impossible to enter other text
		item = this._getSuggestionItem(text);
	}

	var token = null;
	if (item && item.getText && item.getKey) {
		token = new sap.m.Token({
			text : item.getText(),
			key : item.getKey()
		});
	}

	var that = this;

	this._bIsValidating = true;
	this._tokenizer.addValidateToken({
		text : text,
		token : token,
		suggestionObject : item,
		validationCallback : function(validated) {
			that._bIsValidating = false;
			if (validated) {
				that.setValue("");
			}
		}
	});
};

/**
 * Functions returns the current input field's cursor position
 * 
 * @private
 * @return {integer} the cursor position
 */
sap.m.MultiInput.prototype.getCursorPosition = function() {
	return this._$input.cursorPos();
};

/**
 * Functions returns true if the input's text is completely selected
 * 
 * @private
 * @return {boolean} true if text is selected, otherwise false,
 */
sap.m.MultiInput.prototype._completeTextIsSelected = function() {
	var input = this._$input[0];
	if (input.selectionStart !== 0) {
		return false;
	}

	if (input.selectionEnd !== this.getValue().length) {
		return false;
	}

	return true;
};

/**
 * Functions selects the complete input text
 * 
 * @private
 * @return {sap.m.MultiInput} this - for chaining
 */
sap.m.MultiInput.prototype._selectAllInputText = function() {
	var input = this._$input[0];
	input.selectionStart = 0;
	input.selectionEnd = this.getValue().length;
	return this;
};

/**
 * Functions returns true if the suggestion popup is currently open
 * 
 * @private
 */
sap.m.MultiInput.prototype._getIsSuggestionPopupOpen = function() {
	return this._oSuggestionPopup && this._oSuggestionPopup.isOpen();
};

sap.m.MultiInput.prototype.setEditable = function(bEditable) {
	if (bEditable === this.getEditable()) {
		return this;
	}

	if (sap.m.Input.prototype.setEditable) {
		sap.m.Input.prototype.setEditable.apply(this, arguments);
	}

	this._tokenizer.setEditable(bEditable);

	if (bEditable) {
		this.removeStyleClass("sapMMultiInputNotEditable");
	} else {
		this.addStyleClass("sapMMultiInputNotEditable");
	}

	return this;
};

/**
 * Function returns an item which's text starts with the given text within the given items array
 * 
 * @private
 * @param {string}
 *          sText
 * @param {array}
 *          aItems
 * @param {function}
 *          fGetText - function to extract text from a single item
 * @return {object} a found item or null
 */
sap.m.MultiInput.prototype._findItem = function(sText, aItems, fGetText) {
	if (!sText) {
		return;
	}

	if (!(aItems && aItems.length)) {
		return;
	}

	sText = sText.toLowerCase();

	var length = aItems.length;
	for (var i = 0; i < length; i++) {
		var item = aItems[i];
		var compareText = fGetText(item);
		if (!compareText) {
			continue;
		}

		compareText = compareText.toLowerCase();
		if (compareText.indexOf(sText) === 0) {
			return item;
		}
	}
};

/**
 * Function searches for an item with the given text within the suggestion items
 * 
 * @private
 * @param {string}
 *          sText
 * @return {sap.ui.core.Item} a found item or null
 */
sap.m.MultiInput.prototype._getSuggestionItem = function(sText) {
	var items = null;
	var item = null;
	if (this._hasTabularSuggestions()) {
		items = this.getSuggestionRows();
		item = this._findItem(sText, items, function(oRow) {
			var cells = oRow.getCells();
			var foundText = null;
			if (cells) {
				var i;
				for (i = 0; i < cells.length; i++)
					if (cells[i].getText) {
						foundText = cells[i].getText();
						break;
					}
			}
			return foundText;
		});
	} else {
		items = this.getSuggestionItems();
		item = this._findItem(sText, items, function(item) {
			return item.getText();
		});
	}
	return item;
};

sap.m.MultiInput.prototype.addToken = function(oToken) {
	return this._tokenizer.addToken(oToken);
};

sap.m.MultiInput.prototype.removeToken = function(oToken) {
	return this._tokenizer.removeToken(oToken);
};

sap.m.MultiInput.prototype.removeAllTokens = function() {
	return this._tokenizer.removeAllTokens();
};

sap.m.MultiInput.prototype.getTokens = function() {
	return this._tokenizer.getTokens();
};

/**
 * Function sets an array of tokens, existing tokens will get overridden
 * 
 * @public
 * @param {sap.m.Token[]}
 *          aTokens - the new token set
 */
sap.m.MultiInput.prototype.setTokens = function(aTokens) {
	this._tokenizer.setTokens(aTokens);	
};

sap.m.MultiInput.TokenChangeType = {
	Added : "added",
	Removed : "removed",
	RemovedAll : "removedAll"
};

sap.m.MultiInput.WaitForAsyncValidation = "sap.m.Tokenizer.WaitForAsyncValidation";
