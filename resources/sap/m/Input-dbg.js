/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.Input.
jQuery.sap.declare("sap.m.Input");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.InputBase");


/**
 * Constructor for a new Input.
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
 * <li>{@link #getType type} : sap.m.InputType (default: sap.m.InputType.Text)</li>
 * <li>{@link #getMaxLength maxLength} : int (default: 0)</li>
 * <li>{@link #getValueStateText valueStateText} : string</li>
 * <li>{@link #getShowValueStateMessage showValueStateMessage} : boolean (default: true)</li>
 * <li>{@link #getDateFormat dateFormat} : string (default: 'YYYY-MM-dd')</li>
 * <li>{@link #getShowValueHelp showValueHelp} : boolean (default: false)</li>
 * <li>{@link #getShowSuggestion showSuggestion} : boolean (default: false)</li>
 * <li>{@link #getValueHelpOnly valueHelpOnly} : boolean (default: false)</li>
 * <li>{@link #getFilterSuggests filterSuggests} : boolean (default: true)</li>
 * <li>{@link #getMaxSuggestionWidth maxSuggestionWidth} : sap.ui.core.CSSSize</li>
 * <li>{@link #getStartSuggestion startSuggestion} : int (default: 1)</li>
 * <li>{@link #getShowTableSuggestionValueHelp showTableSuggestionValueHelp} : boolean (default: true)</li>
 * <li>{@link #getDescription description} : string</li>
 * <li>{@link #getFieldWidth fieldWidth} : sap.ui.core.CSSSize (default: '50%')</li>
 * <li>{@link #getValueLiveUpdate valueLiveUpdate} : boolean (default: false)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getSuggestionItems suggestionItems} <strong>(default aggregation)</strong> : sap.ui.core.Item[]</li>
 * <li>{@link #getSuggestionColumns suggestionColumns} : sap.m.Column[]</li>
 * <li>{@link #getSuggestionRows suggestionRows} : sap.m.ColumnListItem[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.m.Input#event:liveChange liveChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.Input#event:valueHelpRequest valueHelpRequest} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.Input#event:suggest suggest} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.m.Input#event:suggestionItemSelected suggestionItemSelected} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
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
 * Enables users to input data.
 * @extends sap.m.InputBase
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.Input
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.InputBase.extend("sap.m.Input", { metadata : {

	publicMethods : [
		// methods
		"setFilterFunction", "setRowResultFunction"
	],
	library : "sap.m",
	properties : {
		"type" : {type : "sap.m.InputType", group : "Data", defaultValue : sap.m.InputType.Text},
		"maxLength" : {type : "int", group : "Behavior", defaultValue : 0},
		"valueStateText" : {type : "string", group : "Misc", defaultValue : null},
		"showValueStateMessage" : {type : "boolean", group : "Misc", defaultValue : true},
		"dateFormat" : {type : "string", group : "Misc", defaultValue : 'YYYY-MM-dd', deprecated: true},
		"showValueHelp" : {type : "boolean", group : "Behavior", defaultValue : false},
		"showSuggestion" : {type : "boolean", group : "Behavior", defaultValue : false},
		"valueHelpOnly" : {type : "boolean", group : "Behavior", defaultValue : false},
		"filterSuggests" : {type : "boolean", group : "Behavior", defaultValue : true},
		"maxSuggestionWidth" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : null},
		"startSuggestion" : {type : "int", group : "Behavior", defaultValue : 1},
		"showTableSuggestionValueHelp" : {type : "boolean", group : "Behavior", defaultValue : true},
		"description" : {type : "string", group : "Misc", defaultValue : null},
		"fieldWidth" : {type : "sap.ui.core.CSSSize", group : "Appearance", defaultValue : '50%'},
		"valueLiveUpdate" : {type : "boolean", group : "Behavior", defaultValue : false}
	},
	defaultAggregation : "suggestionItems",
	aggregations : {
		"suggestionItems" : {type : "sap.ui.core.Item", multiple : true, singularName : "suggestionItem"}, 
		"suggestionColumns" : {type : "sap.m.Column", multiple : true, singularName : "suggestionColumn", bindable : "bindable"}, 
		"suggestionRows" : {type : "sap.m.ColumnListItem", multiple : true, singularName : "suggestionRow", bindable : "bindable"}
	},
	events : {
		"liveChange" : {}, 
		"valueHelpRequest" : {}, 
		"suggest" : {}, 
		"suggestionItemSelected" : {}
	}
}});


/**
 * Creates a new subclass of class sap.m.Input with name <code>sClassName</code> 
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
 * @name sap.m.Input.extend
 * @function
 */

sap.m.Input.M_EVENTS = {'liveChange':'liveChange','valueHelpRequest':'valueHelpRequest','suggest':'suggest','suggestionItemSelected':'suggestionItemSelected'};


/**
 * Getter for property <code>type</code>.
 * Type of input (e.g. Text, Number, Email, Phone)
 *
 * Default value is <code>Text</code>
 *
 * @return {sap.m.InputType} the value of property <code>type</code>
 * @public
 * @name sap.m.Input#getType
 * @function
 */

/**
 * Setter for property <code>type</code>.
 *
 * Default value is <code>Text</code> 
 *
 * @param {sap.m.InputType} oType  new value for property <code>type</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setType
 * @function
 */


/**
 * Getter for property <code>maxLength</code>.
 * Maximum number of characters. Value '0' means the feature is switched off.
 *
 * Default value is <code>0</code>
 *
 * @return {int} the value of property <code>maxLength</code>
 * @public
 * @name sap.m.Input#getMaxLength
 * @function
 */

/**
 * Setter for property <code>maxLength</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {int} iMaxLength  new value for property <code>maxLength</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setMaxLength
 * @function
 */


/**
 * Getter for property <code>valueStateText</code>.
 * The text which is shown in the value state message popup. If not specfied a default text is shown.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>valueStateText</code>
 * @public
 * @name sap.m.Input#getValueStateText
 * @function
 */

/**
 * Setter for property <code>valueStateText</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sValueStateText  new value for property <code>valueStateText</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setValueStateText
 * @function
 */


/**
 * Getter for property <code>showValueStateMessage</code>.
 * Whether the value state message should be shown.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showValueStateMessage</code>
 * @public
 * @name sap.m.Input#getShowValueStateMessage
 * @function
 */

/**
 * Setter for property <code>showValueStateMessage</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowValueStateMessage  new value for property <code>showValueStateMessage</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setShowValueStateMessage
 * @function
 */


/**
 * Getter for property <code>dateFormat</code>.
 * Only used if type=date and no datepicker is available.
 * The data is displayed and the user input is parsed according to this format.
 * NOTE: The value property is always of the form RFC 3339 (YYYY-MM-dd).
 *
 * Default value is <code>YYYY-MM-dd</code>
 *
 * @return {string} the value of property <code>dateFormat</code>
 * @public
 * @deprecated Since version 1.9.1. 
 * sap.m.DateTimeInput should be used for date/time inputs and formating.
 * @name sap.m.Input#getDateFormat
 * @function
 */

/**
 * Setter for property <code>dateFormat</code>.
 *
 * Default value is <code>YYYY-MM-dd</code> 
 *
 * @param {string} sDateFormat  new value for property <code>dateFormat</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.9.1. 
 * sap.m.DateTimeInput should be used for date/time inputs and formating.
 * @name sap.m.Input#setDateFormat
 * @function
 */


/**
 * Getter for property <code>showValueHelp</code>.
 * If set to true, a value help indicator will be displayed inside the control. When clicked the event "valueHelpRequest" will be fired.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showValueHelp</code>
 * @public
 * @since 1.16
 * @name sap.m.Input#getShowValueHelp
 * @function
 */

/**
 * Setter for property <code>showValueHelp</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowValueHelp  new value for property <code>showValueHelp</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Input#setShowValueHelp
 * @function
 */


/**
 * Getter for property <code>showSuggestion</code>.
 * If this is set to true, suggest event is fired when user types in the input. Changing the suggestItems aggregation in suggest event listener will show suggestions within a popup. When runs on phone, input will first open a dialog where the input and suggestions are shown. When runs on a tablet, the suggestions are shown in a popup next to the input.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showSuggestion</code>
 * @public
 * @since 1.16.1
 * @name sap.m.Input#getShowSuggestion
 * @function
 */

/**
 * Setter for property <code>showSuggestion</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowSuggestion  new value for property <code>showSuggestion</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.1
 * @name sap.m.Input#setShowSuggestion
 * @function
 */


/**
 * Getter for property <code>valueHelpOnly</code>.
 * If set to true, direct text input is disabled and the control will trigger the event "valueHelpRequest" for all user interactions. The properties "showValueHelp", "editable", and "enabled" must be set to true, otherwise the property will have no effect
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>valueHelpOnly</code>
 * @public
 * @since 1.21.0
 * @name sap.m.Input#getValueHelpOnly
 * @function
 */

/**
 * Setter for property <code>valueHelpOnly</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bValueHelpOnly  new value for property <code>valueHelpOnly</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.0
 * @name sap.m.Input#setValueHelpOnly
 * @function
 */


/**
 * Getter for property <code>filterSuggests</code>.
 * Defines whether to filter the provided suggestions before showing them to the user.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>filterSuggests</code>
 * @public
 * @name sap.m.Input#getFilterSuggests
 * @function
 */

/**
 * Setter for property <code>filterSuggests</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bFilterSuggests  new value for property <code>filterSuggests</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setFilterSuggests
 * @function
 */


/**
 * Getter for property <code>maxSuggestionWidth</code>.
 * If set, the value of this parameter will control the horizontal size of the suggestion list to display more data. This allows suggestion lists to be wider than the input field if there is enough space available. By default, the suggestion list is always as wide as the input field.
 * Note: The value will be ignored if the actual width of the input field is larger than the specified parameter value.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>maxSuggestionWidth</code>
 * @public
 * @since 1.21.1
 * @name sap.m.Input#getMaxSuggestionWidth
 * @function
 */

/**
 * Setter for property <code>maxSuggestionWidth</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sMaxSuggestionWidth  new value for property <code>maxSuggestionWidth</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#setMaxSuggestionWidth
 * @function
 */


/**
 * Getter for property <code>startSuggestion</code>.
 * Minimum length of the entered text in input before suggest event is fired. The default value is 1 which means the suggest event is fired after user types in input. When it's set to 0, suggest event is fired when input with no text gets focus.
 *
 * Default value is <code>1</code>
 *
 * @return {int} the value of property <code>startSuggestion</code>
 * @public
 * @since 1.21.2
 * @name sap.m.Input#getStartSuggestion
 * @function
 */

/**
 * Setter for property <code>startSuggestion</code>.
 *
 * Default value is <code>1</code> 
 *
 * @param {int} iStartSuggestion  new value for property <code>startSuggestion</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.2
 * @name sap.m.Input#setStartSuggestion
 * @function
 */


/**
 * Getter for property <code>showTableSuggestionValueHelp</code>.
 * For tabular suggestions, this flag will show/hide the button at the end of the suggestion table that triggers the event "valueHelpRequest" when pressed. The default value is true.
 * 
 * NOTE: If suggestions are not tabular or no suggestions are used, the button will not be displayed and this flag is without effect.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showTableSuggestionValueHelp</code>
 * @public
 * @since 1.22.1
 * @name sap.m.Input#getShowTableSuggestionValueHelp
 * @function
 */

/**
 * Setter for property <code>showTableSuggestionValueHelp</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowTableSuggestionValueHelp  new value for property <code>showTableSuggestionValueHelp</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.22.1
 * @name sap.m.Input#setShowTableSuggestionValueHelp
 * @function
 */


/**
 * Getter for property <code>description</code>.
 * The description is a text after the input field, e.g. units of measurement, currencies.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>description</code>
 * @public
 * @name sap.m.Input#getDescription
 * @function
 */

/**
 * Setter for property <code>description</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sDescription  new value for property <code>description</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setDescription
 * @function
 */


/**
 * Getter for property <code>fieldWidth</code>.
 * This property only takes effect if the description property is set. It controls the distribution of space between the input field and the description text. The default value is 50% leaving the other 50% for the description.
 *
 * Default value is <code>50%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>fieldWidth</code>
 * @public
 * @name sap.m.Input#getFieldWidth
 * @function
 */

/**
 * Setter for property <code>fieldWidth</code>.
 *
 * Default value is <code>50%</code> 
 *
 * @param {sap.ui.core.CSSSize} sFieldWidth  new value for property <code>fieldWidth</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#setFieldWidth
 * @function
 */


/**
 * Getter for property <code>valueLiveUpdate</code>.
 * Indicates when the value gets updated with the user changes: At each keystroke (true) or first when the user presses enter or tabs out (false).
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>valueLiveUpdate</code>
 * @public
 * @since 1.24
 * @name sap.m.Input#getValueLiveUpdate
 * @function
 */

/**
 * Setter for property <code>valueLiveUpdate</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bValueLiveUpdate  new value for property <code>valueLiveUpdate</code>
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.24
 * @name sap.m.Input#setValueLiveUpdate
 * @function
 */


/**
 * Getter for aggregation <code>suggestionItems</code>.<br/>
 * SuggestItems are the items which will be shown in the suggestion popup. Changing this aggregation (by calling addSuggestionItem, insertSuggestionItem, removeSuggestionItem, removeAllSuggestionItems, destroySuggestionItems) after input is rendered will open/close the suggestion popup. o display suggestions with two text values, it is also possible to add sap.ui.core/ListItems as SuggestionItems (since 1.21.1). For the selected ListItem, only the first value is returned to the input field.
 * 
 * <strong>Note</strong>: this is the default aggregation for Input.
 * @return {sap.ui.core.Item[]}
 * @public
 * @since 1.16.1
 * @name sap.m.Input#getSuggestionItems
 * @function
 */


/**
 * Inserts a suggestionItem into the aggregation named <code>suggestionItems</code>.
 *
 * @param {sap.ui.core.Item}
 *          oSuggestionItem the suggestionItem to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the suggestionItem should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the suggestionItem is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the suggestionItem is inserted at 
 *             the last position        
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.1
 * @name sap.m.Input#insertSuggestionItem
 * @function
 */

/**
 * Adds some suggestionItem <code>oSuggestionItem</code> 
 * to the aggregation named <code>suggestionItems</code>.
 *
 * @param {sap.ui.core.Item}
 *            oSuggestionItem the suggestionItem to add; if empty, nothing is inserted
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.1
 * @name sap.m.Input#addSuggestionItem
 * @function
 */

/**
 * Removes an suggestionItem from the aggregation named <code>suggestionItems</code>.
 *
 * @param {int | string | sap.ui.core.Item} vSuggestionItem the suggestionItem to remove or its index or id
 * @return {sap.ui.core.Item} the removed suggestionItem or null
 * @public
 * @since 1.16.1
 * @name sap.m.Input#removeSuggestionItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>suggestionItems</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.core.Item[]} an array of the removed elements (might be empty)
 * @public
 * @since 1.16.1
 * @name sap.m.Input#removeAllSuggestionItems
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.core.Item</code> in the aggregation named <code>suggestionItems</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.core.Item}
 *            oSuggestionItem the suggestionItem whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @since 1.16.1
 * @name sap.m.Input#indexOfSuggestionItem
 * @function
 */
	

/**
 * Destroys all the suggestionItems in the aggregation 
 * named <code>suggestionItems</code>.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.1
 * @name sap.m.Input#destroySuggestionItems
 * @function
 */


/**
 * Getter for aggregation <code>suggestionColumns</code>.<br/>
 * The suggestionColumns and suggestionRows are for tabular input suggestions. This aggregation allows for binding the table columns; for more details see the aggregation "suggestionRows".
 * 
 * @return {sap.m.Column[]}
 * @public
 * @since 1.21.1
 * @name sap.m.Input#getSuggestionColumns
 * @function
 */


/**
 * Inserts a suggestionColumn into the aggregation named <code>suggestionColumns</code>.
 *
 * @param {sap.m.Column}
 *          oSuggestionColumn the suggestionColumn to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the suggestionColumn should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the suggestionColumn is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the suggestionColumn is inserted at 
 *             the last position        
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#insertSuggestionColumn
 * @function
 */

/**
 * Adds some suggestionColumn <code>oSuggestionColumn</code> 
 * to the aggregation named <code>suggestionColumns</code>.
 *
 * @param {sap.m.Column}
 *            oSuggestionColumn the suggestionColumn to add; if empty, nothing is inserted
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#addSuggestionColumn
 * @function
 */

/**
 * Removes an suggestionColumn from the aggregation named <code>suggestionColumns</code>.
 *
 * @param {int | string | sap.m.Column} vSuggestionColumn the suggestionColumn to remove or its index or id
 * @return {sap.m.Column} the removed suggestionColumn or null
 * @public
 * @since 1.21.1
 * @name sap.m.Input#removeSuggestionColumn
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>suggestionColumns</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.Column[]} an array of the removed elements (might be empty)
 * @public
 * @since 1.21.1
 * @name sap.m.Input#removeAllSuggestionColumns
 * @function
 */

/**
 * Checks for the provided <code>sap.m.Column</code> in the aggregation named <code>suggestionColumns</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.Column}
 *            oSuggestionColumn the suggestionColumn whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @since 1.21.1
 * @name sap.m.Input#indexOfSuggestionColumn
 * @function
 */
	

/**
 * Destroys all the suggestionColumns in the aggregation 
 * named <code>suggestionColumns</code>.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#destroySuggestionColumns
 * @function
 */


/**
 * Binder for aggregation <code>suggestionColumns</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#bindSuggestionColumns
 * @function
 */

/**
 * Unbinder for aggregation <code>suggestionColumns</code>.
 *
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#unbindSuggestionColumns
 * @function
 */


/**
 * Getter for aggregation <code>suggestionRows</code>.<br/>
 * The suggestionColumns and suggestionRows are for tabular input suggestions. This aggregation allows for binding the table cells.
 * The items of this aggregation are to be bound directly or to set in the suggest event method.
 * Note: If this aggregation is filled, the aggregation suggestionItems will be ignored.
 * 
 * @return {sap.m.ColumnListItem[]}
 * @public
 * @since 1.21.1
 * @name sap.m.Input#getSuggestionRows
 * @function
 */


/**
 * Inserts a suggestionRow into the aggregation named <code>suggestionRows</code>.
 *
 * @param {sap.m.ColumnListItem}
 *          oSuggestionRow the suggestionRow to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the suggestionRow should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the suggestionRow is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the suggestionRow is inserted at 
 *             the last position        
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#insertSuggestionRow
 * @function
 */

/**
 * Adds some suggestionRow <code>oSuggestionRow</code> 
 * to the aggregation named <code>suggestionRows</code>.
 *
 * @param {sap.m.ColumnListItem}
 *            oSuggestionRow the suggestionRow to add; if empty, nothing is inserted
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#addSuggestionRow
 * @function
 */

/**
 * Removes an suggestionRow from the aggregation named <code>suggestionRows</code>.
 *
 * @param {int | string | sap.m.ColumnListItem} vSuggestionRow the suggestionRow to remove or its index or id
 * @return {sap.m.ColumnListItem} the removed suggestionRow or null
 * @public
 * @since 1.21.1
 * @name sap.m.Input#removeSuggestionRow
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>suggestionRows</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.m.ColumnListItem[]} an array of the removed elements (might be empty)
 * @public
 * @since 1.21.1
 * @name sap.m.Input#removeAllSuggestionRows
 * @function
 */

/**
 * Checks for the provided <code>sap.m.ColumnListItem</code> in the aggregation named <code>suggestionRows</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.m.ColumnListItem}
 *            oSuggestionRow the suggestionRow whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @since 1.21.1
 * @name sap.m.Input#indexOfSuggestionRow
 * @function
 */
	

/**
 * Destroys all the suggestionRows in the aggregation 
 * named <code>suggestionRows</code>.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#destroySuggestionRows
 * @function
 */


/**
 * Binder for aggregation <code>suggestionRows</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#bindSuggestionRows
 * @function
 */

/**
 * Unbinder for aggregation <code>suggestionRows</code>.
 *
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.21.1
 * @name sap.m.Input#unbindSuggestionRows
 * @function
 */


/**
 * This event is fired when the value of the input is changed - e.g. at each keypress
 *
 * @name sap.m.Input#liveChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.value The new value of the input.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'liveChange' event of this <code>sap.m.Input</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Input</code>.<br/> itself. 
 *  
 * This event is fired when the value of the input is changed - e.g. at each keypress
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Input</code>.<br/> itself.
 *
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#attachLiveChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'liveChange' event of this <code>sap.m.Input</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.Input#detachLiveChange
 * @function
 */

/**
 * Fire event liveChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'value' of type <code>string</code> The new value of the input.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @protected
 * @name sap.m.Input#fireLiveChange
 * @function
 */


/**
 * When the value help indicator is clicked, this event will be fired.
 *
 * @name sap.m.Input#valueHelpRequest
 * @event
 * @since 1.16
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {boolean} oControlEvent.getParameters.fromSuggestions The event parameter is set to true, when the button at the end of the suggestion table is clicked, otherwise false. It can be used to determine whether the "value help" trigger or the "show all items" trigger has been pressed.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'valueHelpRequest' event of this <code>sap.m.Input</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Input</code>.<br/> itself. 
 *  
 * When the value help indicator is clicked, this event will be fired.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Input</code>.<br/> itself.
 *
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Input#attachValueHelpRequest
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'valueHelpRequest' event of this <code>sap.m.Input</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16
 * @name sap.m.Input#detachValueHelpRequest
 * @function
 */

/**
 * Fire event valueHelpRequest to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'fromSuggestions' of type <code>boolean</code> The event parameter is set to true, when the button at the end of the suggestion table is clicked, otherwise false. It can be used to determine whether the "value help" trigger or the "show all items" trigger has been pressed.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16
 * @name sap.m.Input#fireValueHelpRequest
 * @function
 */


/**
 * This event is fired when user types in the input and showSuggestion is set to true. Changing the suggestItems aggregation will show the suggestions within a popup.
 *
 * @name sap.m.Input#suggest
 * @event
 * @since 1.16.1
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {string} oControlEvent.getParameters.suggestValue The current value which has been typed in the input.
 * @param {sap.m.ListBase} oControlEvent.getParameters.suggestionColumns The suggestion list is passed to this event for convenience. If you use list-based or tabular suggestions, fill the suggestionList with the items you want to suggest. Otherwise, directly add the suggestions to the "suggestionItems" aggregation of the input control.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'suggest' event of this <code>sap.m.Input</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Input</code>.<br/> itself. 
 *  
 * This event is fired when user types in the input and showSuggestion is set to true. Changing the suggestItems aggregation will show the suggestions within a popup.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Input</code>.<br/> itself.
 *
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.1
 * @name sap.m.Input#attachSuggest
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'suggest' event of this <code>sap.m.Input</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.1
 * @name sap.m.Input#detachSuggest
 * @function
 */

/**
 * Fire event suggest to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'suggestValue' of type <code>string</code> The current value which has been typed in the input.</li>
 * <li>'suggestionColumns' of type <code>sap.m.ListBase</code> The suggestion list is passed to this event for convenience. If you use list-based or tabular suggestions, fill the suggestionList with the items you want to suggest. Otherwise, directly add the suggestions to the "suggestionItems" aggregation of the input control.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16.1
 * @name sap.m.Input#fireSuggest
 * @function
 */


/**
 * This event is fired when suggestionItem shown in suggestion popup are selected. This event is only fired when showSuggestion is set to true and there are suggestionItems shown in the suggestion popup.
 *
 * @name sap.m.Input#suggestionItemSelected
 * @event
 * @since 1.16.3
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.core.Item} oControlEvent.getParameters.selectedItem This is the item selected in the suggestion popup for one and two-value suggestions. For tabular suggestions, this value will not be set.
 * @param {sap.m.ColumnListItem} oControlEvent.getParameters.selectedRow This is the row selected in the tabular suggestion popup represented as a ColumnListItem. For one and two-value suggestions, this value will not be set.
 * 
 *         Note: The row result function to select a result value for the string is already executed at this time. To pick different value for the input field or to do follow up steps after the item has been selected.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'suggestionItemSelected' event of this <code>sap.m.Input</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.m.Input</code>.<br/> itself. 
 *  
 * This event is fired when suggestionItem shown in suggestion popup are selected. This event is only fired when showSuggestion is set to true and there are suggestionItems shown in the suggestion popup.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.m.Input</code>.<br/> itself.
 *
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.3
 * @name sap.m.Input#attachSuggestionItemSelected
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'suggestionItemSelected' event of this <code>sap.m.Input</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @public
 * @since 1.16.3
 * @name sap.m.Input#detachSuggestionItemSelected
 * @function
 */

/**
 * Fire event suggestionItemSelected to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'selectedItem' of type <code>sap.ui.core.Item</code> This is the item selected in the suggestion popup for one and two-value suggestions. For tabular suggestions, this value will not be set.</li>
 * <li>'selectedRow' of type <code>sap.m.ColumnListItem</code> This is the row selected in the tabular suggestion popup represented as a ColumnListItem. For one and two-value suggestions, this value will not be set.

Note: The row result function to select a result value for the string is already executed at this time. To pick different value for the input field or to do follow up steps after the item has been selected.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.m.Input} <code>this</code> to allow method chaining
 * @protected
 * @since 1.16.3
 * @name sap.m.Input#fireSuggestionItemSelected
 * @function
 */


/**
 * Sets a custom filter function for suggestions. The default is to check whether the first item text begins with the typed value. For one and two-value suggestions this callback function will operate on sap.ui.core.Item types, for tabular suggestions the function will operate on sap.m.ColumnListItem types.
 * 
 * The filter function is called when displaying suggestion items and has two input parameters: the first one is the string that is currently typed in the input field and the second one is the suggestionItem that is being filtered. Returning true will add this item to the popup, returning false will not display it.
 *
 * @name sap.m.Input#setFilterFunction
 * @function
 * @param {object} oFnFilter
 *         The filter function is called when displaying suggestion items and has two input parameters: the first one is the string that is currently typed in the input field and the second one is the item that is being filtered. Returning true will add this item to the popup, returning false will not display it.
 * @type sap.m.Input
 * @public
 * @since 1.16.1
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Sets a custom result filter function for tabular suggestions to select the text that is passed to the input field. The default returns the value of the first cell with a "text" property .
 * 
 * The result function is called with one parameter: the sap.m.ColumnListItem that is selected. The function must return a result string that will be displayed as the input field's value.
 *
 * @name sap.m.Input#setRowResultFunction
 * @function
 * @param {object} oFnFilter
 *         The result function is called with one parameter: the sap.m.ColumnListItem that is selected. The function must return a result string that will be displayed as the input field's value.
 * @type sap.m.Input
 * @public
 * @since 1.21.1
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


// Start of sap\m\Input.js
jQuery.sap.require("jquery.sap.strings");
jQuery.sap.require("sap.m.Dialog");
jQuery.sap.require("sap.m.Popover");
jQuery.sap.require("sap.m.List");
jQuery.sap.require("sap.m.Table");
jQuery.sap.require("sap.m.StandardListItem");
jQuery.sap.require("sap.m.Bar");
jQuery.sap.require("sap.m.Toolbar");
jQuery.sap.require("sap.m.ToolbarSpacer");
jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.core.IconPool.insertFontFaceStyle();

/**
 * The default filter function for one and two-value. It checks whether the item text begins with the typed value.
 * @param {string} sValue the current filter string
 * @param {sap.ui.core.Item} oItem the filtered list item
 * @private
 * @returns {boolean} true for items that start with the parameter sValue, false for non matching items
 */
sap.m.Input._DEFAULTFILTER = function(sValue, oItem) {
	return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue);
};

/**
 * The default filter function for tabular suggestions. It checks whether the first item text begins with the typed value.
 * @param {string} sValue the current filter string
 * @param {sap.m.ColumnListItem} oColumnListItem the filtered list item
 * @private
 * @returns {boolean} true for items that start with the parameter sValue, false for non matching items
 */
sap.m.Input._DEFAULTFILTER_TABULAR = function(sValue, oColumnListItem) {
	var aCells = oColumnListItem.getCells(),
		i = 0;

	for (; i < aCells.length; i++) {
		// take first cell with a text method and compare value
		if (aCells[i].getText) {
			return jQuery.sap.startsWithIgnoreCase(aCells[i].getText(), sValue);
		}
	}
	return false;
};

/**
 * The default result function for tabular suggestions. It returns the value of the first cell with a "text" property
 * @param {sap.m.ColumnListItem} oColumnListItem the selected list item
 * @private
 * @returns {string} the value to be displayed in the input field
 */
sap.m.Input._DEFAULTRESULT_TABULAR = function (oColumnListItem) {
	var aCells = oColumnListItem.getCells(),
		i = 0;

	for (; i < aCells.length; i++) {
		// take first cell with a text method and compare value
		if (aCells[i].getText) {
			return aCells[i].getText();
		}
	}
	return "";
};

/**
 * Initializes the control
 * @private
 */
sap.m.Input.prototype.init = function() {
	sap.m.InputBase.prototype.init.call(this);
	this._inputProxy = jQuery.proxy(this._onInput, this);
	this._fnFilter = sap.m.Input._DEFAULTFILTER;
};

/**
 * Destroys the control
 * @private
 */
sap.m.Input.prototype.exit = function() {
	this._deregisterEvents();
	if (this._oSuggestionPopup) {
		this._oSuggestionPopup.destroy();
		this._oSuggestionPopup = null;
	}

	// CSN# 1404088/2014: list is not destroyed when it has not been attached to the popup yet
	if (this._oList) {
		this._oList.destroy();
		this._oList = null;
	}

	if (this._oValueHelpIcon) {
		this._oValueHelpIcon.destroy();
		this._oValueHelpIcon = null;
	}

	if (this._oSuggestionTable) {
		this._oSuggestionTable.destroy();
		this._oSuggestionTable = null;
	}

	if (this._oButtonToolbar) {
		this._oButtonToolbar.destroy();
		this._oButtonToolbar = null;
	}

	if (this._oShowMoreButton) {
		this._oShowMoreButton.destroy();
		this._oShowMoreButton = null;
	}
};

/**
 * Resizes the popup to the input width and makes sure that the input is never bigger as the popup
 * @private
 */
sap.m.Input.prototype._resizePopup = function() {
	var that = this;

	if (this._oList && this._oSuggestionPopup) {
		if (this.getMaxSuggestionWidth()) {
			this._oSuggestionPopup.setContentWidth(this.getMaxSuggestionWidth());
		} else {
			this._oSuggestionPopup.setContentWidth((this.$().outerWidth()) + "px");
		}

		// resize suggestion popup to minimum size of the input field
		setTimeout(function() {
			if (that._oSuggestionPopup.isOpen() && that._oSuggestionPopup.$().outerWidth() < that.$().outerWidth()) {
				that._oSuggestionPopup.setContentWidth((that.$().outerWidth()) + "px");
			}
		}, 0);
	}
};

sap.m.Input.prototype.onBeforeRendering = function() {
	sap.m.InputBase.prototype.onBeforeRendering.call(this);
	this._deregisterEvents();
};

sap.m.Input.prototype.onAfterRendering = function() {
	var that = this;

	sap.m.InputBase.prototype.onAfterRendering.call(this);
	this.bindToInputEvent(this._inputProxy);

	if (!sap.ui.Device.system.phone) {
		this._resizePopup();
		this._sPopupResizeHandler = sap.ui.core.ResizeHandler.register(this.getDomRef(), function() {
			that._resizePopup();
		});
	}

	if (sap.ui.Device.system.phone) {
		// click event has to be used in order to focus on the input in dialog
		this.$().on("click", jQuery.proxy(function () {
			if (this.getShowSuggestion() && this._oSuggestionPopup) {
				this._oSuggestionPopup.open();
				this._oPopupInput._$input.focus();
			}
		}, this));
	}
};

/**
 * Returns/Instantiates the value help icon control when needed
 * @private
 */
sap.m.Input.prototype._getValueHelpIcon = function () {
	var that = this;

	if (!this._oValueHelpIcon) {
		var sURI = sap.ui.core.IconPool.getIconURI("value-help");
		this._oValueHelpIcon = sap.ui.core.IconPool.createControlByURI({
			id: this.getId() + "__vhi",
			src: sURI
		});

		this._oValueHelpIcon.addStyleClass("sapMInputValHelpInner");
		this._oValueHelpIcon.attachPress(function (evt) {
			// if the property valueHelpOnly is set to true, the event is triggered in the ontap function
			if (!that.getValueHelpOnly()) {
				that.fireValueHelpRequest({fromSuggestions: false});
			}
		});
	}

	return this._oValueHelpIcon;
};

/**
 * Fire valueHelpRequest event if conditions for ValueHelpOnly property are met
 * @private
 */
sap.m.Input.prototype._fireValueHelpRequestForValueHelpOnly = function() {
	// if all the named properties are set to true, the control triggers "valueHelpRequest" for all user interactions
	if (this.getEnabled() && this.getEditable() && this.getShowValueHelp() && this.getValueHelpOnly()) {
		this.fireValueHelpRequest({fromSuggestions: false});
	}
};

/**
 * Fire valueHelpRequest event on tap
 * @public
 * @param {jQuery.Event} oEvent
 */
sap.m.Input.prototype.ontap = function(oEvent) {
	this._fireValueHelpRequestForValueHelpOnly();
};

/**
 * Defines the width of the input. Default value is 100%
 * @public
 * @param {string} sWidth
 */
sap.m.Input.prototype.setWidth = function(sWidth) {
	return sap.m.InputBase.prototype.setWidth.call(this, sWidth || "100%");
	return this;
};

/**
 * Returns the width of the input.
 * @public
 * @return {string} The current width or 100% as default
 */
sap.m.Input.prototype.getWidth = function() {
	return this.getProperty("width") || "100%";
};

/**
 * Sets a custom filter function for suggestions. The default is to check whether the first item text begins with the typed value. For one and two-value suggestions this callback function will operate on sap.ui.core.Item types, for tabular suggestions the function will operate on sap.m.ColumnListItem types.
 * @param {function} fnFilter The filter function is called when displaying suggestion items and has two input parameters: the first one is the string that is currently typed in the input field and the second one is the item that is being filtered. Returning true will add this item to the popup, returning false will not display it.
 * @returns {sap.m.Input} this pointer for chaining
 */
sap.m.Input.prototype.setFilterFunction = function(fnFilter) {
	// reset to default function when calling with null or undefined
	if (fnFilter === null || fnFilter === undefined) {
		this._fnFilter = sap.m.Input._DEFAULTFILTER;
		return this;
	}
	// set custom function
	jQuery.sap.assert(typeof(fnFilter) === "function", "Input.setFilterFunction: first argument fnFilter must be a function on " + this);
	this._fnFilter = fnFilter;
	return this;
};

/**
 * Sets a custom result filter function for tabular suggestions to select the text that is passed to the input field. Default is to check whether the first cell with a "text" property begins with the typed value. For one value and two-value suggestions this callback function is not called.
 * @param {function} fnFilter The result function is called with one parameter: the sap.m.ColumnListItem that is selected. The function must return a result string that will be displayed as the input field's value.
 * @returns {sap.m.Input} this pointer for chaining
 */
sap.m.Input.prototype.setRowResultFunction = function(fnFilter) {
	// reset to default function when calling with null or undefined
	if (fnFilter === null || fnFilter === undefined) {
		this._fnRowResultFilter = sap.m.Input._DEFAULTRESULT_TABULAR;
		return this;
	}
	// set custom function
	jQuery.sap.assert(typeof(fnFilter) === "function", "Input.setRowResultFunction: first argument fnFilter must be a function on " + this);
	this._fnRowResultFilter = fnFilter;
	return this;
};

/**
 * Selects the text of the InputDomRef in the given range
 * @param {int} [iStart=0] start position of the text selection
 * @param {int} [iEnd=<length of text>] end position of the text selection
 * @return {sap.m.Input} this Input instance for chaining
 * @private
 */
sap.m.Input.prototype._doSelect = function(iStart, iEnd) {
	if (sap.ui.Device.support.touch) {
		return;
	}
	var oDomRef = this._$input[0];
	if (oDomRef) {
		// if no Dom-Ref - no selection (Maybe popup closed)
		var $Ref = this._$input;
		oDomRef.focus();
		$Ref.selectText(iStart ? iStart : 0, iEnd ? iEnd : $Ref.val().length);
	}
	return this;
};

sap.m.Input.prototype._scrollToItem = function(iIndex, sDir) {
	var oPopup = this._oSuggestionPopup,
		oList = this._oList;

	if (!(oPopup instanceof sap.m.Popover) || !oList) {
		return;
	}

	var oListItem = oList.getItems()[iIndex],
		oListItemDom = oListItem && oListItem.$()[0];

	if (oListItemDom) {
		oListItemDom.scrollIntoView(sDir === "up");
	}
};

// helper method for keyboard navigation in suggestion items
sap.m.Input.prototype._isSuggestionItemSelectable = function(oItem) {
	// CSN# 1390866/2014: The default for ListItemBase type is "Inactive", therefore disabled entries are only supported for single and two-value suggestions
	// for tabular suggestions: only check visible
	// for two-value and single suggestions: check also if item is not inactive
	return oItem.getVisible() && (this._hasTabularSuggestions() || oItem.getType() !== sap.m.ListType.Inactive);
};

sap.m.Input.prototype._onsaparrowkey = function(oEvent, sDir) {
	if (!this.getEnabled() || !this.getEditable()) {
		return;
	}
	if (!this._oSuggestionPopup || !this._oSuggestionPopup.isOpen()) {
		return;
	}
	if (sDir !== "up" && sDir !== "down") {
		return;
	}

	var bFirst = false,
		oList = this._oList,
		aItems = this.getSuggestionItems(),
		aListItems = oList.getItems(),
		iSelectedIndex = this._iPopupListSelectedIndex,
		sNewValue,
		iOldIndex = iSelectedIndex;

	if (sDir === "up" && iSelectedIndex === 0) {
		// if key is 'up' and selected Item is first -> do nothing
		return;
	}
	if (sDir == "down" && iSelectedIndex === aListItems.length - 1) {
		//if key is 'down' and selected Item is last -> do nothing
		return;
	}

	// always select the first item from top when nothing is selected so far
	if (iSelectedIndex === -1) {
		iSelectedIndex = 0;
		if (this._isSuggestionItemSelectable(aListItems[iSelectedIndex])) {
			// if first item is visible, don't go into while loop
			iOldIndex = iSelectedIndex;
			bFirst = true;
		} else {
			// detect first visible item with while loop
			sDir = "down";
		}
	}

	if (sDir === "down") {
		while (iSelectedIndex < aListItems.length - 1 && (!bFirst || !this._isSuggestionItemSelectable(aListItems[iSelectedIndex]))) {
			aListItems[iSelectedIndex].setSelected(false);
			iSelectedIndex = iSelectedIndex + 1;
			bFirst = true;
		}
	} else {
		while (iSelectedIndex > 0 && (!bFirst || !aListItems[iSelectedIndex].getVisible() || !this._isSuggestionItemSelectable(aListItems[iSelectedIndex]))) {
			aListItems[iSelectedIndex].setSelected(false);
			iSelectedIndex = iSelectedIndex - 1;
			bFirst = true;
		}
	}

	if (!this._isSuggestionItemSelectable(aListItems[iSelectedIndex])) {
		// if no further visible item can be found -> do nothing (e.g. set the old item as selected again)
		if (iOldIndex >= 0) {
			aListItems[iOldIndex].setSelected(true);
		}
		return;
	} else {
		aListItems[iSelectedIndex].setSelected(true);
	}

	if (sap.ui.Device.system.desktop) {
		this._scrollToItem(iSelectedIndex, sDir);
	}

	// make sure the value doesn't exceed the maxLength
	if (sap.m.ColumnListItem && aListItems[iSelectedIndex] instanceof sap.m.ColumnListItem) {
		// for tabular suggestions we call a result filter function
		sNewValue = this._getInputValue(this._fnRowResultFilter(aListItems[iSelectedIndex]));
	} else {
		var bListItem = (aItems[0] instanceof sap.ui.core.ListItem ? true : false);
		if (bListItem) {
			// for two value suggestions we use the item label
			sNewValue = this._getInputValue(aListItems[iSelectedIndex].getLabel());
		} else {
			// otherwise we use the item title
			sNewValue = this._getInputValue(aListItems[iSelectedIndex].getTitle());
		}
	}

	// setValue isn't used because here is too early to modify the lastValue of input
	this._$input.val(sNewValue);

	// memorize the value set by calling jQuery.val, because browser doesn't fire a change event when the value is set programmatically.
	this._sSelectedSuggViaKeyboard = sNewValue;

	this._doSelect();
	this._iPopupListSelectedIndex = iSelectedIndex;

	oEvent.preventDefault();
	oEvent.stopPropagation();
};

sap.m.Input.prototype.onsapup = function(oEvent) {
	this._onsaparrowkey(oEvent, "up");
};

sap.m.Input.prototype.onsapdown = function(oEvent) {
	this._onsaparrowkey(oEvent, "down");
};

sap.m.Input.prototype.onsapescape = function(oEvent) {
	if (this._oSuggestionPopup && this._oSuggestionPopup.isOpen()) {
		// mark the event as already handled
		oEvent.originalEvent._sapui_handledByControl = true;
		this._oSuggestionPopup.close();

		// if popup is open, simply returns from here to prevent from setting the input to the last known value.
		return;
	}

	if (sap.m.InputBase.prototype.onsapescape) {
		sap.m.InputBase.prototype.onsapescape.apply(this, arguments);
	}
};

sap.m.Input.prototype.onsapenter = function(oEvent) {
	if (sap.m.InputBase.prototype.onsapenter) {
		sap.m.InputBase.prototype.onsapenter.apply(this, arguments);
	}

	// when enter is pressed before the timeout of suggestion delay, suggest event is cancelled
	if (this._iSuggestDelay) {
		jQuery.sap.clearDelayedCall(this._iSuggestDelay);
		this._iSuggestDelay = null;
	}

	if (this._oSuggestionPopup && this._oSuggestionPopup.isOpen()) {
		if (this._iPopupListSelectedIndex >= 0) {
			var oSelectedListItem = this._oList.getItems()[this._iPopupListSelectedIndex];
			

			if (oSelectedListItem) {
				this._fireSuggestionItemSelectedEvent(oSelectedListItem);
			}

			this._doSelect();

			this._iPopupListSelectedIndex = -1;
		}
		this._oSuggestionPopup.close();
	}
};

sap.m.Input.prototype.onsapfocusleave = function(oEvent) {
	var oPopup = this._oSuggestionPopup;

	if (oPopup instanceof sap.m.Popover) {
		if (oEvent.relatedControlId && jQuery.sap.containsOrEquals(oPopup.getDomRef(), sap.ui.getCore().byId(oEvent.relatedControlId).getFocusDomRef())) {
			// Force the focus to stay in input
			this.focus();
		} else {
			// When the input still has the value of the last jQuery.val call, a change event has to be
			// fired manually because browser doesn't fire an input event in this case.
			if (this._$input.val() === this._sSelectedSuggViaKeyboard) {
				this._sSelectedSuggViaKeyboard = null;
			}
		}
	}

	// Inform InputBase to fire the change event on Input only when focus doesn't go into the suggestion popup
	var oFocusedControl = sap.ui.getCore().byId(oEvent.relatedControlId);
	if (!(oPopup
			&& oFocusedControl
			&& jQuery.sap.containsOrEquals(oPopup.getDomRef(), oFocusedControl.getFocusDomRef())
		)) {
		// This keeps the inheritance chain to the InputBase
		// sap.m.Input connects onsapfocusleave to InputBase's onfocusout because only in onsapfocusleave the document.activeElement is updated and the needed check can be done
		sap.m.InputBase.prototype.onfocusout.apply(this, [oEvent]);
	}
};

sap.m.Input.prototype.onmousedown = function(oEvent) {
	var oPopup = this._oSuggestionPopup;

	if ((oPopup instanceof sap.m.Popover) && oPopup.isOpen()) {
		oEvent.stopPropagation();
	}
};

sap.m.Input.prototype._deregisterEvents = function() {
	if (this._sPopupResizeHandler) {
		sap.ui.core.ResizeHandler.deregister(this._sPopupResizeHandler);
		this._sPopupResizeHandler = null;
	}

	if (sap.ui.Device.system.phone && this._oSuggestionPopup) {
		this.$().off("click");
	}
};

sap.m.Input.prototype.updateSuggestionItems = function() {
	this.updateAggregation("suggestionItems");
	this._refreshItemsDelayed();
	return this;
};

sap.m.Input.prototype._triggerSuggest = function(sValue) {
	if (this._iSuggestDelay) {
		jQuery.sap.clearDelayedCall(this._iSuggestDelay);
		this._iSuggestDelay = null;
	}

	if (!sValue) {
		sValue = "";
	}

	if (sValue.length >= this.getStartSuggestion()) {
		this._iSuggestDelay = jQuery.sap.delayedCall(300, this, function(){
			this._bBindingUpdated = false;
			this.fireSuggest({
				suggestValue: sValue
			});
			// if binding is updated during suggest event, the list items don't need to be refreshed here
			// because they will be refreshed in updateItems function.
			// This solves the popup blinking problem
			if (!this.bBindingUpdate) {
				this._refreshItemsDelayed();
			}
		});
	} else if (sap.ui.Device.system.phone) {
		if (this._oList instanceof sap.m.Table) {
			// CSN# 1421140/2014: hide the table for empty/initial results to not show the table columns
			this._oList.addStyleClass("sapMInputSuggestionTableHidden");
		} else {
			this._oList.destroyItems();
		}
	} else if (this._oSuggestionPopup && this._oSuggestionPopup.isOpen()) {
		this._oSuggestionPopup.close();
	}
};

(function(){
	sap.m.Input.prototype.setShowSuggestion = function(bValue){
		this.setProperty("showSuggestion", bValue, true);
		this._iPopupListSelectedIndex = -1;
		if (bValue) {
			this._lazyInitializeSuggestionPopup(this);
		} else {
			destroySuggestionPopup(this);
		}
		return this;
	};
	
	sap.m.Input.prototype.setShowTableSuggestionValueHelp = function(bValue) {
		this.setProperty("showTableSuggestionValueHelp", bValue, true);

		if (!this._oSuggestionPopup) {
			return this;
		}

		if (bValue) {
			this._addShowMoreButton();
		} else {
			this._removeShowMoreButton();
		}
		return this;
	};

	sap.m.Input.prototype._getShowMoreButton = function() {
		var that = this,
			oMessageBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

		return this._oShowMoreButton || (this._oShowMoreButton = new sap.m.Button({
			text : oMessageBundle.getText("INPUT_SUGGESTIONS_SHOW_ALL"),
			press : function() {
				if (that.getShowTableSuggestionValueHelp()) {
					that.fireValueHelpRequest({fromSuggestions: true});
					that._oSuggestionPopup.close();
				}
			}
		}));
	};

	sap.m.Input.prototype._getButtonToolbar = function() {
		var oShowMoreButton = this._getShowMoreButton();

		return this._oButtonToolbar || (this._oButtonToolbar = new sap.m.Toolbar({
			content: [
				new sap.m.ToolbarSpacer(),
				oShowMoreButton
			]
		}));
	};

	sap.m.Input.prototype._addShowMoreButton = function() {
		if (!this._oSuggestionPopup || !this._hasTabularSuggestions()) {
			return;
		}

		if (this._oSuggestionPopup instanceof sap.m.Dialog) {
			// phone variant, use endButton (beginButton is close)
			var oShowMoreButton = this._getShowMoreButton();
			this._oSuggestionPopup.setEndButton(oShowMoreButton);
		} else {
			var oButtonToolbar = this._getButtonToolbar();
			// desktop/tablet variant, use popover footer
			this._oSuggestionPopup.setFooter(oButtonToolbar);
		}
	};

	sap.m.Input.prototype._removeShowMoreButton = function() {
		if (!this._oSuggestionPopup || !this._hasTabularSuggestions()) {
			return;
		}

		if (this._oSuggestionPopup instanceof sap.m.Dialog) {
			this._oSuggestionPopup.setEndButton(null);
		} else {
			this._oSuggestionPopup.setFooter(null);
		}
	};

	sap.m.Input.prototype._onInput = function(oEvent) {
		var value = this._$input.val();

		// add maxlength support for all types
		// TODO: type number add min and max properties
		if (this.getMaxLength() > 0 && value.length > this.getMaxLength()) {
			value = value.substring(0, this.getMaxLength());
			this._$input.val(value);
		}

		if (this.getValueLiveUpdate()){
			this.setProperty("value",value, true);
		}

		this.fireLiveChange({
			value: value,
			// backwards compatibility
			newValue: value
		});

		// No need to fire suggest event when suggestion feature isn't enabled or runs on the phone.
		// Because suggest event should only be fired by the input in dialog when runs on the phone.
		if (this.getShowSuggestion() && !sap.ui.Device.system.phone) {
			this._triggerSuggest(value);
		}
	}

	sap.m.Input.prototype.getValue = function(){
		return this.getDomRef("inner") ? this._$input.val() : this.getProperty("value");
	};

	sap.m.Input.prototype._refreshItemsDelayed = function() {
		jQuery.sap.clearDelayedCall(this._iRefreshListTimeout);
		this._iRefreshListTimeout = jQuery.sap.delayedCall(0, this, refreshListItems, [ this ]);
	};

	sap.m.Input.prototype.addSuggestionItem = function(oItem) {
		this.addAggregation("suggestionItems", oItem, true);
		this._refreshItemsDelayed();
		createSuggestionPopupContent(this);
		return this;
	};

	sap.m.Input.prototype.insertSuggestionItem = function(oItem, iIndex) {
		this.insertAggregation("suggestionItems", iIndex, oItem, true);
		this._refreshItemsDelayed();
		createSuggestionPopupContent(this);
		return this;
	};

	sap.m.Input.prototype.removeSuggestionItem = function(oItem) {
		var res = this.removeAggregation("suggestionItems", oItem, true);
		this._refreshItemsDelayed();
		return res;
	};

	sap.m.Input.prototype.removeAllSuggestionItems = function() {
		var res = this.removeAllAggregation("suggestionItems", true);
		this._refreshItemsDelayed();
		return res;
	};

	sap.m.Input.prototype.destroySuggestionItems = function() {
		this.destroyAggregation("suggestionItems", true);
		this._refreshItemsDelayed();
		return this;
	};

	sap.m.Input.prototype.addSuggestionRow = function(oItem) {
		oItem.setType(sap.m.ListType.Active);
		this.addAggregation("suggestionRows", oItem);
		this._refreshItemsDelayed();
		createSuggestionPopupContent(this);
		return this;
	};

	sap.m.Input.prototype.insertSuggestionRow = function(oItem, iIndex) {
		oItem.setType(sap.m.ListType.Active);
		this.insertAggregation("suggestionRows", iIndex, oItem);
		this._refreshItemsDelayed();
		createSuggestionPopupContent(this);
		return this;
	};

	sap.m.Input.prototype.removeSuggestionRow = function(oItem) {
		var res = this.removeAggregation("suggestionRows", oItem);
		this._refreshItemsDelayed();
		return res;
	};

	sap.m.Input.prototype.removeAllSuggestionRows = function() {
		var res = this.removeAllAggregation("suggestionRows");
		this._refreshItemsDelayed();
		return res;
	};

	sap.m.Input.prototype.destroySuggestionRows = function() {
		this.destroyAggregation("suggestionRows");
		this._refreshItemsDelayed();
		return this;
	};

	/**
	 * Forwards aggregations with the name of items or columns to the internal table.
	 * @overwrite
	 * @public
	 * @param {string} sAggregationName the name for the binding
	 * @param {object} oBindingInfo the configuration parameters for the binding
	 * @returns {sap.m.Input} this pointer for chaining
	 */
	sap.m.Input.prototype.bindAggregation = function() {
		var args = Array.prototype.slice.call(arguments);

		if (args[0] === "suggestionRows" || args[0] === "suggestionColumns" || args[0] === "suggestionItems") {
			createSuggestionPopupContent(this, args[0] === "suggestionRows" || args[0] === "suggestionColumns");
			this._bBindingUpdated = true;
		}

		// propagate the bind aggregation function to list
		this._callMethodInManagedObject.apply(this, ["bindAggregation"].concat(args));
		return this;
	};

	sap.m.Input.prototype._lazyInitializeSuggestionPopup = function() {
		if (!this._oSuggestionPopup) {
			createSuggestionPopup(this);
		}
	};

	function createSuggestionPopup(oInput) {
		var oMessageBundle = sap.ui.getCore().getLibraryResourceBundle("sap.m");

		if (sap.ui.Device.system.phone) {
			oInput._oPopupInput = new sap.m.Input(oInput.getId() + "-popup-input", {
				width : "100%",
				valueLiveUpdate: true,
				liveChange : function(oEvent) {
					var sValue = oEvent.getParameter("newValue");
					// call _getInputValue to apply the maxLength to the typed value
					oInput._$input.val(oInput
							._getInputValue(oInput._oPopupInput
									.getValue()));

					oInput._triggerSuggest(sValue);

					// make sure the live change handler on the original input is also called
					oInput.fireLiveChange({
						value: sValue,

						// backwards compatibility
						newValue: sValue
					});
				},

			}).addStyleClass("sapMInputSuggInDialog");
		}

		oInput._oSuggestionPopup = !sap.ui.Device.system.phone ?
			(new sap.m.Popover(oInput.getId() + "-popup", {
				showHeader : false,
				placement : sap.m.PlacementType.Vertical,
				initialFocus : oInput
			}).attachAfterClose(function() {
				oInput._iPopupListSelectedIndex = -1;
				// only destroy items in simple suggestion mode
				if (oInput._oList instanceof sap.m.Table) {
					oInput._oList.removeSelections(true);
				} else {
					oInput._oList.destroyItems();
				}
			}))
		:
			(new sap.m.Dialog(oInput.getId() + "-popup", {
				beginButton : new sap.m.Button(oInput.getId()
						+ "-popup-closeButton", {
					text : oMessageBundle.getText("MSGBOX_CLOSE"),
					press : function() {
						oInput._oSuggestionPopup.close();
					}
				}),
				stretch : true,
				customHeader : new sap.m.Bar(oInput.getId()
						+ "-popup-header", {
					contentMiddle : oInput._oPopupInput
				}),
				horizontalScrolling : false,
				initialFocus : oInput._oPopupInput
			}).attachBeforeOpen(function() {
				// set the same placeholder and maxLength as the original input
				oInput._oPopupInput.setPlaceholder(oInput.getPlaceholder());
				oInput._oPopupInput.setMaxLength(oInput.getMaxLength());
			}).attachBeforeClose(function(){
				// call _getInputValue to apply the maxLength to the typed value
					oInput._$input.val(oInput
							._getInputValue(oInput._oPopupInput
									.getValue()));
					oInput._changeProxy();
			}).attachAfterClose(function() {
				// only destroy items in simple suggestion mode
				if (sap.m.Table && !(oInput._oList instanceof sap.m.Table)) {
					oInput._oList.destroyItems();
				} else {
					oInput._oList.removeSelections(true);
				}
			}).attachAfterOpen(function() {
				var sValue = oInput.getValue();

				oInput._oPopupInput.setValue(sValue);
				oInput.fireSuggest({suggestValue : sValue});
				refreshListItems(oInput);
			}));

		oInput._oSuggestionPopup.addStyleClass("sapMInputSuggestionPopup");

		// add popup as dependent to also propagate the model and bindings to the content of the popover
		oInput.addDependent(oInput._oSuggestionPopup);
		if (!sap.ui.Device.system.phone) {
			overwritePopover(oInput._oSuggestionPopup, oInput);
		}

		if (oInput._oList) {
			oInput._oSuggestionPopup.addContent(oInput._oList);
		}

		if (oInput.getShowTableSuggestionValueHelp()) {
			oInput._addShowMoreButton();
		}
	}

	function createSuggestionPopupContent(oInput, bTabular) {
		// only initialize the content once
		if (oInput._oList) {
			return;
		}

		if (!oInput._hasTabularSuggestions() && !bTabular) {
			oInput._oList = new sap.m.List(oInput.getId() + "-popup-list", {
				width : "100%",
				showNoData : false
			});
		} else {
			// tabular suggestions
			// if no custom filter is set we replace the default filter function here
			if (oInput._fnFilter === sap.m.Input._DEFAULTFILTER) {
				oInput._fnFilter = sap.m.Input._DEFAULTFILTER_TABULAR;
			}

			// if not custom row result function is set we set the default one
			if (!oInput._fnRowResultFilter) {
				oInput._fnRowResultFilter = sap.m.Input._DEFAULTRESULT_TABULAR;
			}

			oInput._oList = oInput._getSuggestionsTable();

			if (oInput.getShowTableSuggestionValueHelp()) {
				oInput._addShowMoreButton();
			}
		}

		if (oInput._oSuggestionPopup) {
			oInput._oSuggestionPopup.addContent(oInput._oList);
		}
	}

	function destroySuggestionPopup(oInput) {
		// if the table is not removed before destroying the popup the table is also destroyed (table needs to stay because we forward the column and row aggregations to the table directly, they would be destroyed as well)
		if (oInput._oList instanceof sap.m.Table) {
			oInput._oSuggestionPopup.removeAllContent();
			// also remove the button/toolbar aggregation
			oInput._removeShowMoreButton();
		}

		if (oInput._oSuggestionPopup) {
			oInput._oSuggestionPopup.destroy();
			oInput._oSuggestionPopup = null;
		}
		// CSN# 1404088/2014: list is not destroyed when it has not been attached to the popup yet
		if (oInput._oList instanceof sap.m.List) {
			oInput._oList.destroy();
			oInput._oList = null;
		}
	}

	function overwritePopover(oPopover, oInput) {
		// overwrite the internal properties to not to show the arrow in popover.
		oPopover._marginTop = 0;
		oPopover._marginLeft = 0;
		oPopover._marginRight = 0;
		oPopover._marginBottom = 0;
		oPopover._arrowOffset = 0;
		oPopover._offsets = [ "0 0", "0 0", "0 0", "0 0" ];
		oPopover._myPositions = [ "begin bottom", "begin center", "begin top", "end center" ];
		oPopover._atPositions = [ "begin top", "end center", "begin bottom", "begin center" ];

		oPopover.open = function() {
			this.openBy(oInput, false, true);
		};

		// remove animation from popover
		oPopover.oPopup.setAnimations(function($Ref, iRealDuration, fnOpened) {
			fnOpened();
		}, function($Ref, iRealDuration, fnClosed) {
			fnClosed();
		});
	}

	function refreshListItems(oInput) {
		var bShowSuggestion = oInput.getShowSuggestion();
		this._iPopupListSelectedIndex = -1;

		if (!(bShowSuggestion
				&& oInput.getDomRef()
				&& (sap.ui.Device.system.phone || oInput.$().hasClass("sapMInputFocused")))
		) {
			return false;
		}

		var oItem,
			aItems = oInput.getSuggestionItems(),
			aTabularRows = oInput.getSuggestionRows(),
			sTypedChars = oInput._$input.val(),
			oList = oInput._oList,
			bFilter = sTypedChars && sTypedChars.length > 0,
			aHitItems = [],
			iItemsLength = 0,
			oPopup = oInput._oSuggestionPopup,
			oListItemDelegate = {
				ontouchstart : function(oEvent) {
					(oEvent.originalEvent || oEvent)._sapui_cancelAutoClose = true;
				}
			},
			oListItem,
			i;

		// only destroy items in simple suggestion mode
		if (oInput._oList) {
			if (oInput._oList instanceof sap.m.Table) {
				oList.removeSelections(true);
			} else {
				oList.destroyItems();
			}
		}

		if (!bFilter && oInput.getFilterSuggests()) {
			// when the input has no value, close the Popup when not runs on the phone because the opened dialog on phone shouldn't be closed.
			if (!sap.ui.Device.system.phone) {
				oPopup.close();
			} else {
				// hide table on phone when value is empty
				if (oInput._hasTabularSuggestions() && oInput._oList) {
					oInput._oList.addStyleClass("sapMInputSuggestionTableHidden");
				}
			}
			return false;
		} else {
			bFilter = oInput.getFilterSuggests();
		}

		if (oInput._hasTabularSuggestions()) {
			// show list on phone (is hidden when search string is empty)
			if (sap.ui.Device.system.phone && oInput._oList) {
				oInput._oList.removeStyleClass("sapMInputSuggestionTableHidden");
			}

			// filter tabular items
			for (i = 0; i < aTabularRows.length; i++) {
				if (!bFilter || oInput._fnFilter(sTypedChars, aTabularRows[i])) {
					aTabularRows[i].setVisible(true);
					aHitItems.push(aTabularRows[i]);
				} else {
					aTabularRows[i].setVisible(false);
				}
			}
		} else {
			// filter standard items
			var bListItem = (aItems[0] instanceof sap.ui.core.ListItem ? true : false);
			for (i = 0; i < aItems.length; i++) {
				oItem = aItems[i];
				if (!bFilter || oInput._fnFilter(sTypedChars, oItem)) {
					if (bListItem) {
						oListItem = new sap.m.DisplayListItem(oItem.getId() + "-dli");
						oListItem.setLabel(oItem.getText());
						oListItem.setValue(oItem.getAdditionalText());
					} else {
						oListItem = new sap.m.StandardListItem(oItem.getId() + "-sli");
						oListItem.setTitle(oItem.getText());
					}

					oListItem.setType(oItem.getEnabled() ? sap.m.ListType.Active : sap.m.ListType.Inactive);
					oListItem.attachPress(function () {
						if (sap.ui.Device.system.phone) {
							if (bListItem) {
								// use label for two value suggestions
								oInput._oPopupInput.setValue(this.getLabel());
							} else {
								// otherwise use title
								oInput._oPopupInput.setValue(this.getTitle());
							}
							oInput._oPopupInput._doSelect();
						} else {
							// call _getInputValue to apply the maxLength to the
							// typed value
							if (bListItem) {
								oInput._$input.val(oInput._getInputValue(this.getLabel()));
							} else {
								oInput._$input.val(oInput._getInputValue(this.getTitle()));
							}
							oInput._changeProxy();
						}
						oPopup.close();
						if (!sap.ui.Device.support.touch) {
							oInput._doSelect();
						}
						oInput.fireSuggestionItemSelected({
							selectedItem: this._oItem
						});
					});
					oListItem._oItem = oItem;
					oListItem.addEventDelegate(oListItemDelegate);
					aHitItems.push(oListItem);
				}
			}
		}

		iItemsLength = aHitItems.length;
		if (iItemsLength > 0) {
			// add items to list
			if (!oInput._hasTabularSuggestions()) {
				for (i = 0; i < iItemsLength; i++) {
					oList.addItem(aHitItems[i]);
				}
			}

			if (!sap.ui.Device.system.phone) {
				if (oInput._sCloseTimer) {
					clearTimeout(oInput._sCloseTimer);
					oInput._sCloseTimer = null;
				}

				if (!oPopup.isOpen() && !oInput._sOpenTimer) {
					oInput._sOpenTimer = setTimeout(function() {
						oPopup.open();
						oInput._resizePopup();
						oInput._sOpenTimer = null;
					}, 0);
				}
			}
		} else {
			if (!sap.ui.Device.system.phone) {
				if (oPopup.isOpen()) {
					oInput._sCloseTimer = setTimeout(function() {
						oPopup.close();
					}, 0);
				}
			} else {
				// hide table on phone when there are no items to display
				if (oInput._hasTabularSuggestions() && oInput._oList) {
					oInput._oList.addStyleClass("sapMInputSuggestionTableHidden");
				}
			}
		}
	}
})();

(function() {

	function closeMessage(oInput) {
		if (oInput._popup) {
			oInput._popup.close();
		}
	};

	function openMessage(oInput) {
		var oState = oInput.getValueState();

		if (oInput.getShowValueStateMessage() && oState && ((oState === sap.ui.core.ValueState.Warning)
				|| (oState === sap.ui.core.ValueState.Error)) && oInput.getEnabled() && oInput.getEditable()) {
			var sText = oInput.getValueStateText();
			if (!sText) {
				sText = sap.ui.core.ValueStateSupport.getAdditionalText(oInput);
			}
			if (!sText) {
				return;
			}

			var messageId = oInput.getId() + "-message";
			if (!oInput._popup) {
				jQuery.sap.require("sap.ui.core.Popup");
				jQuery.sap.require("jquery.sap.encoder");
				oInput._popup = new sap.ui.core.Popup(jQuery("<span></span>")[0] /* Just some dummy */, false, false, false);
				oInput._popup.attachClosed(function () {
					jQuery.sap.byId(messageId).remove();
				});
			}

			var $Input = jQuery(oInput.getFocusDomRef());
			var dock = sap.ui.core.Popup.Dock;
			var bIsRightAligned = $Input.css("text-align") === "right";

			var sClass = "sapMInputMessage " + ((oState === sap.ui.core.ValueState.Warning) ? "sapMInputMessageWarning" : "sapMInputMessageError");

			oInput._popup.setContent(jQuery("<div style=\"max-width:"
					+ $Input.outerWidth() + "px;\" class=\"" + sClass
					+ "\" id=\"" + messageId + "\"><span id=\"" + messageId
					+ "-text\">" + jQuery.sap.encodeHTML(sText)
					+ "</span></div>"));

			oInput._popup.close(0);
			oInput._popup.open(
					200,
					bIsRightAligned ? dock.EndTop : dock.BeginTop,
					bIsRightAligned ? dock.EndBottom : dock.BeginBottom,
					oInput.getFocusDomRef(),
					null,
					null,
					function() {
						oInput._popup.close();
					}
			);
		}
	};

	sap.m.Input.prototype.setValueState = function(sValueState) {
		var sOldValueState = this.getValueState();

		sap.m.InputBase.prototype.setValueState.apply(this, arguments);

		var sNewValueState = this.getValueState();

		if (this.getDomRef() && sNewValueState != sOldValueState && this.getFocusDomRef() === document.activeElement) {
			switch (sNewValueState) {
				case sap.ui.core.ValueState.Error:
				case sap.ui.core.ValueState.Warning:
					openMessage(this);
					break;
				default:
					closeMessage(this);
			}

		}

		return this;
	};

	sap.m.Input.prototype.setValueStateText = function (sText) {
		this.$("message-text").text(sText);
		return this.setProperty("valueStateText", sText, true);
	};

	sap.m.Input.prototype.onfocusin = function(oEvent) {
		sap.m.InputBase.prototype.onfocusin.apply(this, arguments);
		this.$().addClass("sapMInputFocused");
		openMessage(this);

		// fires suggest event when startSuggestion is set to 0 and input has no text
		if (!this.getStartSuggestion()&& !this.getValue()) {
			this._triggerSuggest(this.getValue());
		}
	};

	/**
	 * Register F4 to trigger the valueHelpRequest event
	 * @private
	 */
	sap.m.Input.prototype.onsapshow = function (oEvent) {
		if (!this.getEnabled() || !this.getShowValueHelp()) {
			return;
		}

		this.fireValueHelpRequest({fromSuggestions: false});
		oEvent.preventDefault();
		oEvent.stopPropagation();
	};

	sap.m.Input.prototype.onsapselect = function(oEvent) {
		this._fireValueHelpRequestForValueHelpOnly();
	};

	sap.m.Input.prototype.onkeydown = function(oEvent) {
		closeMessage(this);
		sap.m.InputBase.prototype.onkeydown.apply(this, arguments);
	};

	sap.m.Input.prototype.onfocusout = function(oEvent) {
		this.$().removeClass("sapMInputFocused");
		closeMessage(this);
	};

})();

sap.m.Input.prototype._hasTabularSuggestions = function() {
	return !!(this.getAggregation("suggestionColumns") && this.getAggregation("suggestionColumns").length);
};

/* lazy loading of the suggestions table */
sap.m.Input.prototype._getSuggestionsTable = function() {
	var that = this;

	if (!this._oSuggestionTable) {
		this._oSuggestionTable = new sap.m.Table(this.getId() + "-popup-table", {
			mode: sap.m.ListMode.SingleSelectMaster,
			showNoData: false,
			showSeparators: "All",
			width: "100%",
			enableBusyIndicator: false,
			selectionChange: function (oEvent) {
				var oSelectedListItem = oEvent.getParameter("listItem"),
					// for tabular suggestions we call a result filter function
					sNewValue = that._fnRowResultFilter(oSelectedListItem);

				if (sap.ui.Device.system.phone) {
					that._oPopupInput.setValue(sNewValue);
					that._oPopupInput._doSelect();
				} else {
					// call _getInputValue to apply the maxLength to the typed value
					that._$input.val(that._getInputValue(sNewValue));
					that._changeProxy();
				}
				that._oSuggestionPopup.close();
				if (!sap.ui.Device.support.touch) {
					that._doSelect();
				}
				that.fireSuggestionItemSelected({
					selectedRow : oSelectedListItem
				});
			}
		});
		// initially hide the table on phone
		if (sap.ui.Device.system.phone) {
			this._oSuggestionTable.addStyleClass("sapMInputSuggestionTableHidden");
		}

		this._oSuggestionTable.updateItems = function() {
			sap.m.Table.prototype.updateItems.apply(this, arguments);
			that._refreshItemsDelayed();
			return this;
		};
	}

	return this._oSuggestionTable;
};

sap.m.Input.prototype._fireSuggestionItemSelectedEvent = function (oSelectedListItem) {
	if (sap.m.ColumnListItem && oSelectedListItem instanceof sap.m.ColumnListItem) {
		this.fireSuggestionItemSelected({selectedRow : oSelectedListItem});
	} else {
		this.fireSuggestionItemSelected({selectedItem : oSelectedListItem._oItem});
	}
};

/* =========================================================== */
/*           begin: forward aggregation methods to table       */
/* =========================================================== */

/*
 * Forwards a function call to a managed object based on the aggregation name.
 * If the name is items, it will be forwarded to the table, otherwise called
 * locally
 * @private
 * @param {string} sFunctionName the name of the function to be called
 * @param {string} sAggregationName the name of the aggregation asociated
 * @returns {mixed} the return type of the called function
 */
sap.m.Input.prototype._callMethodInManagedObject = function(sFunctionName, sAggregationName) {
	var aArgs = Array.prototype.slice.call(arguments),
		oSuggestionsTable;

	if (sAggregationName === "suggestionColumns") {
		// apply to the internal table (columns)
		oSuggestionsTable = this._getSuggestionsTable();
		return oSuggestionsTable[sFunctionName].apply(oSuggestionsTable, ["columns"].concat(aArgs.slice(2)));
	} else if (sAggregationName === "suggestionRows") {
		// apply to the internal table (rows = table items)
		oSuggestionsTable = this._getSuggestionsTable();
		return oSuggestionsTable[sFunctionName].apply(oSuggestionsTable, ["items"].concat(aArgs.slice(2)));
	} else {
		// apply to this control
		return sap.ui.core.Control.prototype[sFunctionName].apply(this, aArgs .slice(1));
	}
};

sap.m.Input.prototype.validateAggregation = function(sAggregationName, oObject, bMultiple) {
	return this._callMethodInManagedObject("validateAggregation", sAggregationName, oObject, bMultiple);
};

sap.m.Input.prototype.setAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("setAggregation", sAggregationName,	oObject, bSuppressInvalidate);
	return this;
};

sap.m.Input.prototype.getAggregation = function(sAggregationName, oDefaultForCreation) {
	return this._callMethodInManagedObject("getAggregation", sAggregationName, oDefaultForCreation);
};

sap.m.Input.prototype.indexOfAggregation = function(sAggregationName, oObject) {
	return this._callMethodInManagedObject("indexOfAggregation", sAggregationName, oObject);
};

sap.m.Input.prototype.insertAggregation = function(sAggregationName, oObject, iIndex, bSuppressInvalidate) {
	this._callMethodInManagedObject("insertAggregation", sAggregationName, oObject, iIndex, bSuppressInvalidate);
	return this;
};

sap.m.Input.prototype.addAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("addAggregation", sAggregationName,oObject, bSuppressInvalidate);
	return this;
};

sap.m.Input.prototype.removeAggregation = function(sAggregationName, oObject, bSuppressInvalidate) {
	this._callMethodInManagedObject("removeAggregation", sAggregationName, oObject, bSuppressInvalidate);
	return this;
};

sap.m.Input.prototype.removeAllAggregation = function(sAggregationName, bSuppressInvalidate) {
	return this._callMethodInManagedObject("removeAllAggregation", sAggregationName, bSuppressInvalidate);
};

sap.m.Input.prototype.destroyAggregation = function(sAggregationName, bSuppressInvalidate) {
	this._callMethodInManagedObject("destroyAggregation", sAggregationName, bSuppressInvalidate);
	return this;
};

sap.m.Input.prototype.getBinding = function(sAggregationName) {
	return this._callMethodInManagedObject("getBinding", sAggregationName);
};

sap.m.Input.prototype.getBindingInfo = function(sAggregationName) {
	return this._callMethodInManagedObject("getBindingInfo", sAggregationName);
};

sap.m.Input.prototype.getBindingPath = function(sAggregationName) {
	return this._callMethodInManagedObject("getBindingPath", sAggregationName);
};

/* =========================================================== */
/*           end: forward aggregation methods to table         */
/* =========================================================== */
