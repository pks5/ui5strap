/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.DateRangeSelection.
jQuery.sap.declare("sap.m.DateRangeSelection");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.DatePicker");


/**
 * Constructor for a new DateRangeSelection.
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
 * <li>{@link #getDelimiter delimiter} : string (default: '-')</li>
 * <li>{@link #getSecondDateValue secondDateValue} : object</li>
 * <li>{@link #getFrom from} : object</li>
 * <li>{@link #getTo to} : object</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.DateRangeSelection#event:change change} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.m.DatePicker#constructor sap.m.DatePicker}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * This is a date range selection control. It internal uses the sap.ui.unified.Calendar. So the sap.ui.unified library should be loaded from applications using this control.
 * @extends sap.m.DatePicker
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.DateRangeSelection
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.DatePicker.extend("sap.m.DateRangeSelection", { metadata : {

	library : "sap.m",
	properties : {
		"delimiter" : {type : "string", group : "Misc", defaultValue : '-'},
		"secondDateValue" : {type : "object", group : "Data", defaultValue : null},
		"from" : {type : "object", group : "Misc", defaultValue : null, deprecated: true},
		"to" : {type : "object", group : "Misc", defaultValue : null, deprecated: true}
	},
	events : {
		"change" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.DateRangeSelection with name <code>sClassName</code> 
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
 * @name sap.m.DateRangeSelection.extend
 * @function
 */

sap.m.DateRangeSelection.M_EVENTS = {'change':'change'};


/**
 * Getter for property <code>delimiter</code>.
 * Delimiter of starting and ending date. Default value is "-".
 * If no delimiter is given the one defined for the used locale is used.
 *
 * Default value is <code>-</code>
 *
 * @return {string} the value of property <code>delimiter</code>
 * @public
 * @name sap.m.DateRangeSelection#getDelimiter
 * @function
 */

/**
 * Setter for property <code>delimiter</code>.
 *
 * Default value is <code>-</code> 
 *
 * @param {string} sDelimiter  new value for property <code>delimiter</code>
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateRangeSelection#setDelimiter
 * @function
 */


/**
 * Getter for property <code>secondDateValue</code>.
 * Ending date of the range.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>secondDateValue</code>
 * @public
 * @name sap.m.DateRangeSelection#getSecondDateValue
 * @function
 */

/**
 * Setter for property <code>secondDateValue</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oSecondDateValue  new value for property <code>secondDateValue</code>
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateRangeSelection#setSecondDateValue
 * @function
 */


/**
 * Getter for property <code>from</code>.
 * Starting date of the range.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>from</code>
 * @public
 * @deprecated Since version 1.22. 
 * Former property for starting date - since next release will be not supported. Use dateValue instead.
 * @name sap.m.DateRangeSelection#getFrom
 * @function
 */

/**
 * Setter for property <code>from</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oFrom  new value for property <code>from</code>
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.22. 
 * Former property for starting date - since next release will be not supported. Use dateValue instead.
 * @name sap.m.DateRangeSelection#setFrom
 * @function
 */


/**
 * Getter for property <code>to</code>.
 * Ending date of the range.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>to</code>
 * @public
 * @deprecated Since version 1.22. 
 * Former property for ending date - since next release will be not supported. Use secondDateValue instead.
 * @name sap.m.DateRangeSelection#getTo
 * @function
 */

/**
 * Setter for property <code>to</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oTo  new value for property <code>to</code>
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.22. 
 * Former property for ending date - since next release will be not supported. Use secondDateValue instead.
 * @name sap.m.DateRangeSelection#setTo
 * @function
 */


/**
 * Event thrown in case of change of date range.
 *
 * @name sap.m.DateRangeSelection#change
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {object} oControlEvent.getParameters.from Current starting date after change.
 * @param {object} oControlEvent.getParameters.to Current ending date after change.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'change' event of this <code>sap.m.DateRangeSelection</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.DateRangeSelection</code>.<br/> itself. 
 *  
 * Event thrown in case of change of date range.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.DateRangeSelection</code>.<br/> itself.
 *
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateRangeSelection#attachChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'change' event of this <code>sap.m.DateRangeSelection</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DateRangeSelection#detachChange
 * @function
 */

/**
 * Fire event change to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'from' of type <code>object</code> Current starting date after change.</li>
 * <li>'to' of type <code>object</code> Current ending date after change.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.DateRangeSelection} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.DateRangeSelection#fireChange
 * @function
 */


// Start of sap\m\DateRangeSelection.js
/**
 * This file defines behavior for the control
 * @public
 */

(function() {

	sap.m.DateRangeSelection.prototype.init = function(){

		sap.m.DatePicker.prototype.init.apply(this, arguments);

		this._bIntervalSelection = true;

	};

	sap.m.DateRangeSelection.prototype._getPlaceholder = function() {
		var sPlaceholder = this.getPlaceholder();

		if (!sPlaceholder) {
			sPlaceholder = this.getDisplayFormat();

			if (!sPlaceholder) {
				sPlaceholder = "medium";
			}

			if (sPlaceholder === "short" || sPlaceholder === "medium" || sPlaceholder === "long") {
				var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				var oLocaleData = sap.ui.core.LocaleData.getInstance(oLocale);
				sPlaceholder = oLocaleData.getDatePattern(sPlaceholder);
			}

			var that = this;
			var sDelimiter = _getDelimiter(that);
			if (sDelimiter && sDelimiter !== "") {
				sPlaceholder = sPlaceholder +" "+sDelimiter+" "+ sPlaceholder;
			}
		}

		return sPlaceholder;
	};

	// Overwrite DatePicker's setValue to support two date range processing
	sap.m.DateRangeSelection.prototype.setValue = function(sValue) {

		if (sValue !== this.getValue()) {
			this._lastValue = sValue;
		}else {
			return this;
		}
		// Set the property in any case but check validity on output
		this.setProperty("value", sValue, true);

		// Convert to date object(s)
		var aDates = [undefined, undefined];
		aDates = this._parseValue(sValue);
		aDates = _dateRangeValidityCheck(this, aDates[0], aDates[1]);
		this.setProperty("dateValue", aDates[0], true);
		this.setProperty("secondDateValue", aDates[1], true);

		// Do not call InputBase.setValue because the displayed value and the output value might have different pattern
		if (this.getDomRef()) {
			// Convert to output
			var sOutputValue = this._formatValue(aDates[0], aDates[1]);

			if (this._$input.val() !== sOutputValue) {
				this._$input.val(sOutputValue);
				this._setLabelVisibility();
				this._curpos = this._$input.cursorPos();
			}
		}

		return this;

	};

	//Following setters/getters are due to backward compatibility with original primary version of composite sap.m.DateRangeSelection,
	//that consisted of original primary sap.m.DateRangeSelection
	sap.m.DateRangeSelection.prototype.setFrom = function(oFrom) {
		this.setDateValue(oFrom);
	};

	sap.m.DateRangeSelection.prototype.getFrom = function() {
		return this.getDateValue();
	};

	sap.m.DateRangeSelection.prototype.setTo = function(oTo) {
		this.setSecondDateValue(oTo);
	};

	sap.m.DateRangeSelection.prototype.getTo = function() {
		return this.getSecondDateValue();
	};

	// Overwrite DatePicker's setDateValue to support two date range processing
	sap.m.DateRangeSelection.prototype.setDateValue = function(oDateValue) {

		if (jQuery.sap.equal(this.getDateValue(), oDateValue)) {
			return this;
		}

		this.setProperty("dateValue", oDateValue, true);

		var oSecondDateValue = this.getSecondDateValue();
		// Convert date object(s) to value
		var sValue = this._formatValue(oDateValue, oSecondDateValue);

		if (sValue !== this.getValue()) {
			this._lastValue = sValue;
		}
		// Set the property in any case but check validity on output
		this.setProperty("value", sValue, true);

		if (this.getDomRef()) {
			// convert to output
			var sOutputValue = this._formatValue(oDateValue, oSecondDateValue);

			if (this._$input.val() !== sOutputValue) {
				this._$input.val(sOutputValue);
				this._setLabelVisibility();
				this._curpos = this._$input.cursorPos();
			}
		}

		return this;

	};

	sap.m.DateRangeSelection.prototype.setSecondDateValue = function(oSecondDateValue) {

		if (jQuery.sap.equal(this.getSecondDateValue(), oSecondDateValue)) {
			return this;
		}

		this.setProperty("secondDateValue", oSecondDateValue, true);

		var oDateValue = this.getDateValue();
		// Convert date object(s) to value
		var sValue = this._formatValue(oDateValue, oSecondDateValue);

		if (sValue !== this.getValue()) {
			this._lastValue = sValue;
		}
		// Set the property in any case but check validity on output
		this.setProperty("value", sValue, true);

		if (this.getDomRef()) {
			// convert to output
			var sOutputValue = this._formatValue(oDateValue, oSecondDateValue);

			if (this._$input.val() !== sOutputValue) {
				this._$input.val(sOutputValue);
				this._setLabelVisibility();
				this._curpos = this._$input.cursorPos();
			}
		}

		return this;
	};

	//Support of two date range version added into original DatePicker's version
	sap.m.DateRangeSelection.prototype._parseValue = function(sValue) {

		var sInputPattern = "";
		var oFormat;
		var aDates = [];
		var oDate1, oDate2;

		//If we have version of control with delimiter, then sValue should consist of two dates delimited with delimiter,
		//hence we have to split the value to these dates
		var that = this;
		var sDelimiter = _getDelimiter(that);
		if ((sDelimiter && sDelimiter !== "") && sValue) {
			aDates = sValue.split(sDelimiter);
			if (aDates.length === 2) {
				// if delimiter only appears once in value (not part of date pattern) remove " " to be more flexible for input
				if (aDates[0].slice(aDates[0].length-1,aDates[0].length) == " ") {
					aDates[0] = aDates[0].slice(0, aDates[0].length-1);
				}
				if (aDates[1].slice(0,1) == " ") {
					aDates[1] = aDates[1].slice(1);
				}
			}else {
				aDates = sValue.split(" " + sDelimiter + " ");// Delimiter appears more than once -> try with separators
			}
			if (aDates.length < 2) {
				// no delimiter found -> maybe only " " is used
				var aDates2 = sValue.split(" ");
				if (aDates2.length === 2) {
					aDates = aDates2;
				}
			}
		}

		if (sValue && aDates.length <= 2) {

			sInputPattern = this.getDisplayFormat();

			if (!sInputPattern) {
				// still no pattern -> use locale format
				sInputPattern = "medium";
			}

			if (sInputPattern === "short" || sInputPattern === "medium" || sInputPattern === "long") {
				oFormat = sap.ui.core.format.DateFormat.getInstance({style: sInputPattern});
			} else {
				oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: sInputPattern});
			}

			//Convert to date object(s)
			if ((!sDelimiter || sDelimiter === "") || aDates.length === 1) {
				oDate1 = oFormat.parse(sValue);
			}else if (aDates.length === 2) {
				if ((oFormat.parse(aDates[0]) === null) || (oFormat.parse(aDates[1]) === null)) {
				}else {
					oDate1 = oFormat.parse(aDates[0]);
					oDate2 = oFormat.parse(aDates[1]);
				}
			}
		}

		return [oDate1, oDate2];

	};

	//Support of two date range version added into original DatePicker's version
	sap.m.DateRangeSelection.prototype._formatValue = function(oDateValue, oSecondDateValue) {

		var sValue = "";
		var that = this;
		var sDelimiter = _getDelimiter(that);

		if (oDateValue) {
			var sOutputPattern = "";
			var oFormat;

			sOutputPattern = this.getDisplayFormat();

			if (!sOutputPattern) {
				// still no pattern -> use locale format
				sOutputPattern = "medium";
			}

			if (sOutputPattern === "short" || sOutputPattern === "medium" || sOutputPattern === "long") {
				oFormat = sap.ui.core.format.DateFormat.getInstance({style: sOutputPattern});
			} else {
				oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: sOutputPattern});
			}

			if (sDelimiter && sDelimiter !== "" && oSecondDateValue) {
				sValue = oFormat.format(oDateValue) + " " + sDelimiter + " " + oFormat.format(oSecondDateValue);
			}else {
				sValue = oFormat.format(oDateValue);
			}
		}

		return sValue;

	};

	sap.m.DateRangeSelection.prototype.onChange = function() {

		// check the control is editable or not
		if (!this.getEditable() || !this.getEnabled()) {
			return;
		}

		var sValue = this._$input.val();
		var aDates = [undefined, undefined];
		if (sValue != "") {
			aDates = this._parseValue(sValue);
			aDates = _dateRangeValidityCheck(this, aDates[0], aDates[1]);
			sValue = this._formatValue( aDates[0], aDates[1] ); // to have the right output format if entered different
		}

		if ((sValue !== this._lastValue) || (sValue === "")) {
			if (this.getDomRef()) {
				this._$input.val(sValue);
			}
			this.setProperty("value", sValue, true);
			this.setProperty("dateValue", aDates[0], true);
			this.setProperty("secondDateValue", aDates[1], true);
			this._curpos = this._$input.cursorPos();
			this._setLabelVisibility();
			this._lastValue = sValue;

			if(this._oPopup && this._oPopup.isOpen()) {

				var oStartDate = this.getDateValue();
				if (oStartDate) {
					if (!this._oDateRange.getStartDate() || this._oDateRange.getStartDate().getTime() !== oStartDate.getTime()) {
						this._oDateRange.setStartDate(new Date(oStartDate.getTime()));
						this._oCalendar.focusDate(oStartDate);
					}
				} else {
					if (this._oDateRange.getStartDate()) {
						this._oDateRange.setStartDate(undefined);
					}
				}

				var oEndDate = this.getSecondDateValue();
				if (oEndDate) {
					if (!this._oDateRange.getEndDate() || this._oDateRange.getEndDate().getTime() !== oEndDate.getTime()) {
						this._oDateRange.setEndDate(new Date(oEndDate.getTime()));
						this._oCalendar.focusDate(oEndDate);
					}
				} else {
					if (this._oDateRange.getEndDate()) {
						this._oDateRange.setEndDate(undefined);
					}
				}
			}

			_fireChange(this);

		}

	};

	// Overwrite DatePicker's _getInputValue  to support two date range processing
	sap.m.DateRangeSelection.prototype._getInputValue = function(sValue) {

		sValue = (typeof sValue == "undefined") ? this._$input.val() : sValue.toString();

		var aDates = this._parseValue(sValue);
		sValue = this._formatValue( aDates[0], aDates[1]);

		return sValue;

	};

	// overwrite _getInputValue to do the output conversion
	sap.m.DateRangeSelection.prototype.updateDomValue = function(sValue) {

		// dom value updated other than value property
		this._bCheckDomValue = true;

		sValue = (typeof sValue == "undefined") ? this._$input.val() : sValue.toString();
		this._curpos = this._$input.cursorPos();

		var aDates = this._parseValue(sValue);
		sValue = this._formatValue( aDates[0], aDates[1]);

		// update the DOM value when necessary
		// otherwise cursor can goto end of text unnecessarily
		if (this.isActive() && (this._$input.val() !== sValue)) {
			this._$input.val(sValue);
			this._$input.cursorPos(this._curpos);
		}

		// update synthetic placeholder visibility
		this._setLabelVisibility();

		return this;
	};

	// overwrite InputBase function because this calls _getInputValue what calls _parseValue what updates the properties
	// This should be redesigned at all, because parsing should not update the properties in every case
	sap.m.DateRangeSelection.prototype._setLabelVisibility = function() {

		if (!this._bShowLabelAsPlaceholder || !this._$label || !this.isActive()) {
			return;
		}

		var sValue = this._$input.val();
		this._$label.css("display", sValue ? "none" : "inline");

	};

	//Do nothing in case of PageUp
	sap.m.DateRangeSelection.prototype.onsappageup = function(){}; //EXC_JSLINT_021
	sap.m.DateRangeSelection.prototype.onsappageupmodifiers = function(){}; //EXC_JSLINT_021

	//Do nothing in case of PageDown
	sap.m.DateRangeSelection.prototype.onsappagedown = function(){}; //EXC_JSLINT_021
	sap.m.DateRangeSelection.prototype.onsappagedownmodifiers = function(){}; //EXC_JSLINT_021

	//Support of two date range version of Calendar added into original DatePicker's version
	sap.m.DateRangeSelection.prototype._fillDateRange = function(){

		sap.m.DatePicker.prototype._fillDateRange.apply(this, arguments);

		var oEndDate = this.getSecondDateValue();

		if (oEndDate) {
			if (!this._oDateRange.getEndDate() || this._oDateRange.getEndDate().getTime() !== oEndDate.getTime()) {
				this._oDateRange.setEndDate(new Date(oEndDate.getTime()));
			}
		} else {
			if (this._oDateRange.getEndDate()) {
				this._oDateRange.setEndDate(undefined);
			}
		}

	};

	sap.m.DateRangeSelection.prototype._selectDate = function(oEvent){

		var aSelectedDates = this._oCalendar.getSelectedDates();

		if (aSelectedDates.length > 0) {
			var oDate1 = aSelectedDates[0].getStartDate();
			var oDate2 = aSelectedDates[0].getEndDate();
			var sLastValue = this._lastValue;

			if (oDate1 && oDate2) {
				var oDate1Old = this.getDateValue();
				var oDate2Old = this.getSecondDateValue();

				this._oPopup.close();
				this._bFocusNoPopup = true;
				this.focus();
				this.setProperty("dateValue", oDate1, true); // no rerendering

				this.setSecondDateValue(oDate2);
				if (!jQuery.sap.equal(oDate1, oDate1Old) || !jQuery.sap.equal(oDate2, oDate2Old)) {
					// compare Dates because value can be the same if only 2 digits for year 
					var sValue = this.getValue();
					var that = this;
					_fireChange(that);
					this._curpos = sValue.length;
					this._$input.cursorPos(this._curpos);
				}

				//To prevent opening keyboard on mobile device after dates are selected
				if (sap.ui.Device.browser.mobile) {
					window.document.activeElement.blur();
				}
			}
		}
	};

	function _fireChange(oThis) {

		oThis.fireChange({
			from: oThis.getDateValue(),
			to: oThis.getSecondDateValue()
		});

	};

	function _dateRangeValidityCheck(oThis, oDate, oSecondDate) {

		if (oDate && oSecondDate && oDate.getTime() > oSecondDate.getTime()) {
			// dates are in wrong oder -> just switch
			var oTmpDate = oDate;
			oDate = oSecondDate;
			oSecondDate = oTmpDate;
		}

		return [oDate, oSecondDate];

	};

	function _bCorrectDateRange(oFromDate, oToDate) {

		if (oFromDate.getTime() < oToDate.getTime()) {
			return true;
		}

		return false;

	};

	function _getDelimiter(oThis) {

		var sDelimiter = oThis.getDelimiter();

		if (!sDelimiter) {
			if (!oThis._sLocaleDelimiter) {
				var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				var oLocaleData = sap.ui.core.LocaleData.getInstance(oLocale);
				var sPattern = oLocaleData.getIntervalPattern();
				var iIndex1 = sPattern.indexOf("{0}") + 3;
				var iIndex2 = sPattern.indexOf("{1}");
				sDelimiter = sPattern.slice(iIndex1, iIndex2);
				if (sDelimiter.length > 1) {
					if (sDelimiter.slice(0,1) == " ") {
						sDelimiter = sDelimiter.slice(1);
					}
					if (sDelimiter.slice(sDelimiter.length-1,sDelimiter.length) == " ") {
						sDelimiter = sDelimiter.slice(0, sDelimiter.length-1);
					}
				}
				oThis._sLocaleDelimiter = sDelimiter;
			}else {
				sDelimiter = oThis._sLocaleDelimiter;
			}
		}

		return sDelimiter;

	};


//	to overwrite JS doc
	/**
	 * Setter for property <code>dateValue</code>.
	 *
	 * Starting date of the range.
	 * Default value is empty/undefined
	 *
	 * @param {object} oDateValue new value for property dateValue
	 * @returns {sap.m.DateRangeSelection} <code>this</code> to allow method chaining.
	 * @protected
	 * @name sap.m.DateRangeSelection#setDateValue
	 * @function
	 */

	/**
	 * Getter for property <code>dateValue</code>.
	 *
	 * Starting date of the range.
	 * Default value is empty/undefined
	 *
	 * @returns {object} the value of property secondDateValue
	 * @protected
	 * @name sap.m.DateRangeSelection#getDateValue
	 * @function
	 */

	/**
	 * Setter for property <code>valueFormat</code>.
	 *
	 * Property <code>valueFormat</code> is not supported in <code>sap.m.DateRangeSelection</code> control.
	 *
	 * @protected
	 * @name sap.m.DateRangeSelection#setValueFormat
	 * @function
	 */

	/**
	 * Getter for property <code>valueFormat</code>.
	 *
	 * Property <code>valueFormat</code> is not supported in <code>sap.m.DateRangeSelection</code> control.
	 *
	 * @protected
	 * @name sap.m.DateRangeSelection#getValueFormat
	 * @function
	 */

	/**
	 * On change of date range event.
	 *
	 * @name sap.m.DateRangeSelection#change
	 * @event
	 * @param {sap.ui.base.Event} oControlEvent
	 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
	 * @param {object} oControlEvent.getParameters

	 * @param {object} oControlEvent.getParameters.from Current starting date after change.
	 * @param {object} oControlEvent.getParameters.to Current ending date after change.

	 * @public
	 */
}());
