/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.DatePicker.
jQuery.sap.declare("sap.m.DatePicker");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.InputBase");


/**
 * Constructor for a new DatePicker.
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
 * <li>{@link #getDisplayFormat displayFormat} : string</li>
 * <li>{@link #getValueFormat valueFormat} : string</li>
 * <li>{@link #getDateValue dateValue} : object</li></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
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
 * This is an date input control with a calendar DatePicker.
 * It internal uses the sap.ui.unified.Calendar. So the sap.ui.unified library should be loaded from applications using this control. (Otherwise it will be loaded by opening the DatePicker.)
 * @extends sap.m.InputBase
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.22.0
 * @name sap.m.DatePicker
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.InputBase.extend("sap.m.DatePicker", { metadata : {

	library : "sap.m",
	properties : {
		"displayFormat" : {type : "string", group : "Appearance", defaultValue : null},
		"valueFormat" : {type : "string", group : "Data", defaultValue : null},
		"dateValue" : {type : "object", group : "Data", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.m.DatePicker with name <code>sClassName</code> 
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
 * @name sap.m.DatePicker.extend
 * @function
 */


/**
 * Getter for property <code>displayFormat</code>.
 * Displays date value in this given format in text field. Default value is taken from locale settings.
 * If you use data-binding on value property with type sap.ui.model.type.Date then you can ignore this property or latter wins.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>displayFormat</code>
 * @public
 * @name sap.m.DatePicker#getDisplayFormat
 * @function
 */

/**
 * Setter for property <code>displayFormat</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sDisplayFormat  new value for property <code>displayFormat</code>
 * @return {sap.m.DatePicker} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DatePicker#setDisplayFormat
 * @function
 */


/**
 * Getter for property <code>valueFormat</code>.
 * Given value property should match with valueFormat to parse date. Default value is taken from locale settings.
 * You can set and get value in this format.
 * If you use data-binding on value property with type sap.ui.model.type.Date you can ignore this property or latter wins.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>valueFormat</code>
 * @public
 * @name sap.m.DatePicker#getValueFormat
 * @function
 */

/**
 * Setter for property <code>valueFormat</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sValueFormat  new value for property <code>valueFormat</code>
 * @return {sap.m.DatePicker} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DatePicker#setValueFormat
 * @function
 */


/**
 * Getter for property <code>dateValue</code>.
 * This property as JavaScript Date Object can be used to assign a new value which is independent from valueFormat.
 * If this property is used, the value property should not be changed from the caller.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>dateValue</code>
 * @public
 * @name sap.m.DatePicker#getDateValue
 * @function
 */

/**
 * Setter for property <code>dateValue</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oDateValue  new value for property <code>dateValue</code>
 * @return {sap.m.DatePicker} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.DatePicker#setDateValue
 * @function
 */


// Start of sap\m\DatePicker.js
///**
// * This file defines behavior for the control,
// */
//sap.m.DatePicker.prototype.init = function(){
//   // do something for initialization...
//};

jQuery.sap.require("sap.ui.model.type.Date");

(function() {

	sap.m.DatePicker.prototype.init = function() {

		sap.m.InputBase.prototype.init.apply(this, arguments);

		this._inputProxy = jQuery.proxy(_onInput, this);

		this._bIntervalSelection = false;

	};

	sap.m.DatePicker.prototype.exit = function() {

		sap.m.InputBase.prototype.exit.apply(this, arguments);

		if (this._oPopup) {
			if (this._oPopup.isOpen()) {
				this._oPopup.close();
			}
			delete this._oPopup;
		}

		if (this._oCalendar) {
			this._oCalendar.destroy();
			delete this._oCalendar;
		}

	};

	sap.m.DatePicker.prototype.onAfterRendering = function() {

		sap.m.InputBase.prototype.onAfterRendering.apply(this, arguments);
		this.bindToInputEvent(this._inputProxy);

	};

	sap.m.DatePicker.prototype.invalidate = function(oOrigin) {

		if (!oOrigin || oOrigin != this._oCalendar){
			// Calendar is only invalidated by DatePicker itself -> so don't invalidate DatePicker
			sap.ui.core.Control.prototype.invalidate.apply(this, arguments);
		}

	};

	/**
	 * Defines the width of the DatePicker. Default value is 100%
	 *
	 * @param {string} sWidth  new value for <code>width</code>
	 * @returns {sap.m.DatePicker} <code>this</code> to allow method chaining
	 * @public
	 */
	sap.m.DatePicker.prototype.setWidth = function(sWidth) {

		return sap.m.InputBase.prototype.setWidth.call(this, sWidth || "100%");

	};

	sap.m.DatePicker.prototype.getWidth = function(sWidth) {

		return this.getProperty("width") || "100%";

	};

	sap.m.DatePicker.prototype.onfocusin = function(oEvent) {
		sap.m.InputBase.prototype.onfocusin.apply(this, arguments);
		if (sap.ui.Device.browser.mobile && !jQuery(oEvent.target).hasClass("sapUiIcon") && !this._bFocusNoPopup) {
			// on mobile devices open calendar
			var that = this;

			if (!this._oPopup || !this._oPopup.isOpen()) {
				_open(that);
			}
		}

		this._bFocusNoPopup = undefined;

	};

	sap.m.DatePicker.prototype.onsapshow = function(oEvent) {

		var that = this;

		_toggleOpen(that);

		oEvent.preventDefault(); // otherwise IE opens the address bar history

	};

	// ALT-UP and ALT-DOWN should behave the same
	sap.m.DatePicker.prototype.onsaphide = sap.m.DatePicker.prototype.onsapshow;

	sap.m.DatePicker.prototype.onsappageup = function(oEvent){

		//increase by one day
		var that = this;
		_incraseDate(that, 1, "day");

		oEvent.preventDefault(); // do not move cursor

	};

	sap.m.DatePicker.prototype.onsappageupmodifiers = function(oEvent){

		var that = this;
		if (!oEvent.ctrlKey && oEvent.shiftKey) {
			// increase by one month
			_incraseDate(that, 1, "month");
		} else {
			// increase by one year
			_incraseDate(that, 1, "year");
		}

		oEvent.preventDefault(); // do not move cursor

	};

	sap.m.DatePicker.prototype.onsappagedown = function(oEvent){

		//decrease by one day
		var that = this;
		_incraseDate(that, -1, "day");

		oEvent.preventDefault(); // do not move cursor

	};

	sap.m.DatePicker.prototype.onsappagedownmodifiers = function(oEvent){

		var that = this;
		if (!oEvent.ctrlKey && oEvent.shiftKey) {
			// decrease by one month
			_incraseDate(that, -1, "month");
		} else {
			// decrease by one year
			_incraseDate(that, -1, "year");
		}

		oEvent.preventDefault(); // do not move cursor

	};

	sap.m.DatePicker.prototype.onclick = function(oEvent) {

		var that = this;
		if (jQuery(oEvent.target).hasClass("sapUiIcon")) {
			_toggleOpen(that);
		}else	if (sap.ui.Device.browser.mobile && (!this._oPopup || !this._oPopup.isOpen())) {
			_open(that);
		}

	};

	sap.m.DatePicker.prototype.setValue = function(sValue) {

		var sOldValue = this.getValue();
		if (sValue == sOldValue) {
			return this;
		}else {
			this._lastValue = sValue;
		}

		// set the property in any case but check validity on output
		this.setProperty("value", sValue, true); // no rerendering

		// convert to date object
		var oDate = this._parseValue(sValue);
		this.setProperty("dateValue", oDate, true); // no rerendering

		// do not call InputBase.setValue because the displayed value and the output value might have different pattern
		if (this.getDomRef()) {
			// convert to output
			var sOutputValue = this._formatValue(oDate);

			if (this._$input.val() !== sOutputValue) {
				this._$input.val(sOutputValue);
				this._setLabelVisibility();
				this._curpos = this._$input.cursorPos();
			}
		}

		return this;

	};

	sap.m.DatePicker.prototype.setDateValue = function(oDate) {

		if (jQuery.sap.equal(this.getDateValue(), oDate)) {
			return this;
		}

		this.setProperty("dateValue", oDate, true); // no rerendering

		// convert date object to value
		var sValue = this._formatValue(oDate, true);

		if (sValue !== this.getValue()) {
			this._lastValue = sValue;
		}
		// set the property in any case but check validity on output
		this.setProperty("value", sValue, true); // no rerendering

		if (this.getDomRef()) {
			// convert to output
			var sOutputValue = this._formatValue(oDate);

			if (this._$input.val() !== sOutputValue) {
				this._$input.val(sOutputValue);
				this._setLabelVisibility();
				this._curpos = this._$input.cursorPos();
			}
		}

		return this;

	};

	sap.m.DatePicker.prototype.setValueFormat = function(sValueFormat) {

		// if valueFormat changes the value must be parsed again

		this.setProperty("valueFormat", sValueFormat, true); // no rerendering
		var sValue = this.getValue();

		if (sValue) {
			var oDate = this._parseValue(sValue);
			this.setProperty("dateValue", oDate, true); // no rerendering
		}

		return this;

	};

	sap.m.DatePicker.prototype.setDisplayFormat = function(sDisplayFormat) {

		// if displayFormat changes the value must be formatted again

		this.setProperty("displayFormat", sDisplayFormat, true); // no rerendering
		var sOutputValue = this._formatValue(this.getDateValue());

		if (this.getDomRef() && (this._$input.val() !== sOutputValue)) {
			this._$input.val(sOutputValue);
			this._curpos = this._$input.cursorPos();
		}

		return this;

	};

	sap.m.DatePicker.prototype.onChange = function(oEvent) {
		// don't call InputBase onChange because this calls setValue what would trigger a new formatting

		// check the control is editable or not
		if (!this.getEditable() || !this.getEnabled()) {
			return;
		}

		// set date before fire change event
		var sValue = this._$input.val();
		var oDate;
		if (sValue != "") {
			oDate = this._parseValue(sValue, true);
			if (oDate) {
				// check if Formatter changed the value (it correct some wrong inputs or known patterns)
				sValue = this._formatValue(oDate);
			} else {
				sValue = "";
			}
		}

		if (this.getDomRef() && (this._$input.val() !== sValue)) {
			this._$input.val(sValue);
			this._curpos = this._$input.cursorPos();
			if (this._$label) {
				// because value property might not be updated between typing
				this._$label.css("display", sValue ? "none" : "inline");
			}
		}

		if (oDate) {
			// get the value in valueFormat
			sValue = this._formatValue(oDate, true);
		}

		// compare with the old known value
		if (sValue !== this._lastValue) {
			this.setProperty("value", sValue, true); // no rerendering
			this.setProperty("dateValue", oDate, true); // no rerendering

			// remember the last value on change
			this._lastValue = sValue;

			this.fireChangeEvent(sValue);

			if (this._oPopup && this._oPopup.isOpen()) {
				this._oCalendar.focusDate(oDate);
				var oStartDate = this._oDateRange.getStartDate();
				if ((!oStartDate && oDate) || (oStartDate && oDate && oStartDate.getTime() != oDate.getTime())) {
					this._oDateRange.setStartDate(new Date(oDate.getTime()));
				}else if (oStartDate && !oDate){
					this._oDateRange.setStartDate(undefined);
				}
			}
		}

	};

	// overwrite _getInputValue to do the conversion there
	sap.m.DatePicker.prototype._getInputValue = function(sValue) {

		sValue = (typeof sValue == "undefined") ? this._$input.val() : sValue.toString();

		var oDate = this._parseValue(sValue, true);
		sValue = this._formatValue(oDate, true);

		return sValue;

	};

	// overwrite _getInputValue to do the output conversion
	sap.m.DatePicker.prototype.updateDomValue = function(sValue) {

		// dom value updated other than value property
		this._bCheckDomValue = true;

		sValue = (typeof sValue == "undefined") ? this._$input.val() : sValue.toString();
		this._curpos = this._$input.cursorPos();

		var oDate = this._parseValue(sValue, true);
		sValue = this._formatValue(oDate);

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

	sap.m.DatePicker.prototype._parseValue = function(sValue, bDisplayFormat) {

		var sInputPattern = "";
		var oFormat;
		var oBinding = this.getBinding("value");

		if (oBinding && oBinding.oType && (oBinding.oType instanceof sap.ui.model.type.Date)) {
			sInputPattern = oBinding.oType.getOutputPattern();
		}

		if (!sInputPattern) {
			// not databinding is used -> use given format
			if (bDisplayFormat) {
				sInputPattern = this.getDisplayFormat();
			} else {
				sInputPattern = this.getValueFormat();
			}
		}

		if (!sInputPattern) {
			// still no pattern -> use locale format
			if (bDisplayFormat) {
				sInputPattern = "medium";
			} else {
				sInputPattern = "short";
			}
		}

		if (sInputPattern == "short" || sInputPattern == "medium" || sInputPattern == "long") {
			oFormat = sap.ui.core.format.DateFormat.getInstance({style: sInputPattern});
		} else {
			oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: sInputPattern});
		}

		// convert to date object
		var oDate = oFormat.parse(sValue);
		return oDate;

	};

	// converts the date to the output format, but if bValueFormat set it converts it to the input format
	sap.m.DatePicker.prototype._formatValue = function(oDate, bValueFormat) {

		var sValue = "";

		if (oDate) {
			var sOutputPattern = "";
			var oBinding = this.getBinding("value");
			var oFormat;

			if (oBinding && oBinding.oType && (oBinding.oType instanceof sap.ui.model.type.Date)) {
				sOutputPattern = oBinding.oType.getOutputPattern();
			}

			if (!sOutputPattern) {
				// not databinding is used -> use given format
				if (bValueFormat) {
					sOutputPattern = this.getValueFormat();
				} else {
					sOutputPattern = this.getDisplayFormat();
				}
			}

			if (!sOutputPattern) {
				// still no pattern -> use locale format
				if (bValueFormat) {
					sOutputPattern = "short";
				} else {
					sOutputPattern = "medium";
				}
			}

			if (sOutputPattern == "short" || sOutputPattern == "medium" || sOutputPattern == "long") {
				oFormat = sap.ui.core.format.DateFormat.getInstance({style: sOutputPattern});
			} else {
				oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: sOutputPattern});
			}

			// convert to date object
			sValue = oFormat.format(oDate);
		}

		return sValue;

	};

	sap.m.DatePicker.prototype._getPlaceholder = function() {

		var sPlaceholder = this.getPlaceholder();

		if (!sPlaceholder) {
			var oBinding = this.getBinding("value");

			if (oBinding && oBinding.oType && (oBinding.oType instanceof sap.ui.model.type.Date)) {
				sPlaceholder = oBinding.oType.getOutputPattern();
			}else {
				sPlaceholder = this.getDisplayFormat();
			}

			if (!sPlaceholder) {
				sPlaceholder = "medium";
			}

			if (sPlaceholder == "short" || sPlaceholder == "medium" || sPlaceholder == "long") {
				var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
				var oLocaleData = sap.ui.core.LocaleData.getInstance(oLocale);
				sPlaceholder = oLocaleData.getDatePattern(sPlaceholder);
			}
		}

		return sPlaceholder;

	};

	function _open(oThis){

		if (!oThis._oPopup) {
			jQuery.sap.require("sap.ui.core.Popup");
			oThis._oPopup = new sap.ui.core.Popup();
			oThis._oPopup.setAutoClose(true);
			oThis._oPopup.setDurations(0, 0); // no animations
			oThis._oPopup.attachOpened(_handleOpened, oThis);
//			oThis._oPopup.attachClosed(_handleClosed, oThis);
		}

		if (!oThis._oCalendar) {
			sap.ui.getCore().loadLibrary("sap.ui.unified");
			jQuery.sap.require("sap.ui.unified.library");
			oThis._oCalendar = new sap.ui.unified.Calendar(oThis.getId() + "-cal", {intervalSelection: oThis._bIntervalSelection});
			oThis._oDateRange = new sap.ui.unified.DateRange();
			oThis._oCalendar.addSelectedDate(oThis._oDateRange);
			oThis._oCalendar.attachSelect(oThis._selectDate, oThis);
			oThis._oCalendar.attachCancel(_cancel, oThis);
			oThis._oCalendar.attachEvent("_renderMonth", _resizeCalendar, oThis);
			oThis._oPopup.setContent(oThis._oCalendar);
			if (oThis.$().closest(".sapUiSizeCompact").length > 0) {
				oThis._oCalendar.addStyleClass("sapUiSizeCompact");
			}
			oThis._oCalendar.setPopupMode(true);
			oThis._oCalendar.setParent(oThis, undefined, true); // don't invalidate DatePicker
		}

		oThis.onChange(); // to check manually typed in text

		oThis._fillDateRange();

		oThis._oPopup.setAutoCloseAreas([oThis.getDomRef()]);

		var eDock = sap.ui.core.Popup.Dock;
		var sAt = eDock.BeginBottom + "-4"; // as m.Input has some padding around
		oThis._oPopup.open(0, eDock.BeginTop, sAt, oThis, null, "fit", true);

	}

	sap.m.DatePicker.prototype._fillDateRange = function(){

		var oDate = this.getDateValue();

		if (oDate) {
			this._oCalendar.focusDate(new Date(oDate.getTime()));
			if (!this._oDateRange.getStartDate() || this._oDateRange.getStartDate().getTime() != oDate.getTime()) {
				this._oDateRange.setStartDate(new Date(oDate.getTime()));
			}
		} else if (this._oDateRange.getStartDate()) {
			this._oDateRange.setStartDate(undefined);
		}

	};

	function _toggleOpen(oThis){

		if (oThis.getEditable() && oThis.getEnabled()) {
			if (!oThis._oPopup || !oThis._oPopup.isOpen()) {
				_open(oThis);
			} else {
				oThis._oPopup.close();
			}
		}

	}

	sap.m.DatePicker.prototype._selectDate = function(oEvent){

		var aSelectedDates = this._oCalendar.getSelectedDates();
		var oDateOld = this.getDateValue();
		var oDate;

		if (aSelectedDates.length > 0) {
			oDate = aSelectedDates[0].getStartDate();
		}
		this.setDateValue(oDate);

		this._oPopup.close();
		this._bFocusNoPopup = true;
		this.focus();

		// do not use this.onChange() because output pattern will change date (e.g. only last 2 number of year -> 1966 -> 2066 )
		if (!jQuery.sap.equal(oDate, oDateOld)) {
			// compare Dates because value can be the same if only 2 digits for year 
			var sValue = this.getValue();
			this.fireChangeEvent(sValue);
			this._curpos = sValue.length;
			this._$input.cursorPos(this._curpos);
		}

	};

	function _cancel(oEvent) {

		if (this._oPopup && this._oPopup.isOpen()) {
			this._oPopup.close();
			this._bFocusNoPopup = true;
			this.focus();
		}

	}
/*
	function _handleClosed(oEvent) {


	};
*/
	function _incraseDate(oThis, iNumber, sUnit) {

		var oOldDate = oThis.getDateValue();
		var iCurpos = oThis._$input.cursorPos();

		if (oOldDate && oThis.getEditable() && oThis.getEnabled()) {
			// use a new date object to have a real updated property
			var oDate = new Date(oOldDate.getTime());

			switch (sUnit) {
			case "day":
				oDate.setDate(oDate.getDate() + iNumber);
				break;
			case "month":
				oDate.setMonth(oDate.getMonth() + iNumber);
				break;
			case "year":
				oDate.setFullYear(oDate.getFullYear() + iNumber);
				break;

			default:
				break;
			}

			oThis.setDateValue(oDate);

			oThis._curpos = iCurpos;
			oThis._$input.cursorPos(oThis._curpos);

			var sValue = oThis._getInputValue();
			oThis.fireChangeEvent(sValue);
		}

	}

	function _onInput(oEvent){

		// do not use sap.m.InputBase.prototype._setLabelVisibility because value is not updated during typing
		if (this.getDomRef() && this._$label) {
			var sValue = this._$input.val();
			this._$label.css("display", sValue ? "none" : "inline");
		}

	}

	function _handleOpened(oEvent) {

		this._renderedDays = this._oCalendar.$("days").children(".sapUiCalDay").length;

	}

	function _resizeCalendar(oEvent){

		var iDays = oEvent.getParameter("days");

		if (iDays > this._renderedDays) {
			// calendar gets larger, so it could move out of the page -> reposition
			this._renderedDays = iDays;
			this._oPopup._applyPosition(this._oPopup._oLastPosition);
		}

	}

}());
