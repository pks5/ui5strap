/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.commons.layout.BorderLayout.
jQuery.sap.declare("sap.ui.commons.layout.BorderLayout");
jQuery.sap.require("sap.ui.commons.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new layout/BorderLayout.
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
 * <li>{@link #getRtl rtl} : boolean (default: false)</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: '100%')</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize (default: '100%')</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getTop top} : sap.ui.commons.layout.BorderLayoutArea</li>
 * <li>{@link #getBegin begin} : sap.ui.commons.layout.BorderLayoutArea</li>
 * <li>{@link #getCenter center} : sap.ui.commons.layout.BorderLayoutArea</li>
 * <li>{@link #getEnd end} : sap.ui.commons.layout.BorderLayoutArea</li>
 * <li>{@link #getBottom bottom} : sap.ui.commons.layout.BorderLayoutArea</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Based upon the border layout as it comes with the Java standard. Using this layout, you are able to divide your available UI space into five areas whose sizes can be defined. These areas are: Top: Header; Bottom: Footer; Begin: Left/right-hand side panel; Center: Content area
 * in the middle; End: Right/left-hand side panel.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.commons.layout.BorderLayout
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.ui.commons.layout.BorderLayout", { metadata : {

	publicMethods : [
		// methods
		"createArea", "setAreaData", "addContent", "insertContent", "removeContent", "removeAllContent", "getContent", "indexOfContent", "destroyContent", "getAreaData", "getAreaById", "getArea"
	],
	library : "sap.ui.commons",
	properties : {
		"rtl" : {type : "boolean", group : "Appearance", defaultValue : false, deprecated: true},
		"width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'},
		"height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : '100%'}
	},
	aggregations : {
		"top" : {type : "sap.ui.commons.layout.BorderLayoutArea", multiple : false}, 
		"begin" : {type : "sap.ui.commons.layout.BorderLayoutArea", multiple : false}, 
		"center" : {type : "sap.ui.commons.layout.BorderLayoutArea", multiple : false}, 
		"end" : {type : "sap.ui.commons.layout.BorderLayoutArea", multiple : false}, 
		"bottom" : {type : "sap.ui.commons.layout.BorderLayoutArea", multiple : false}
	}
}});


/**
 * Creates a new subclass of class sap.ui.commons.layout.BorderLayout with name <code>sClassName</code> 
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
 * @name sap.ui.commons.layout.BorderLayout.extend
 * @function
 */


/**
 * Getter for property <code>rtl</code>.
 * The RTL setting swaps the areas Begin and End. Since version 1.5.2, this property is deprecated and ignored as it conflicts with the central configuration for the page.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>rtl</code>
 * @public
 * @deprecated Since version 1.5.2. 
 * RTL should not be configured on control level but is determined by a global configuration.
 * @name sap.ui.commons.layout.BorderLayout#getRtl
 * @function
 */

/**
 * Setter for property <code>rtl</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bRtl  new value for property <code>rtl</code>
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @deprecated Since version 1.5.2. 
 * RTL should not be configured on control level but is determined by a global configuration.
 * @name sap.ui.commons.layout.BorderLayout#setRtl
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Defines the overall width of the layout
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setWidth
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * Defines the overall height of the layout
 *
 * Default value is <code>100%</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is <code>100%</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setHeight
 * @function
 */


/**
 * Getter for aggregation <code>top</code>.<br/>
 * Represents the Top area
 * 
 * @return {sap.ui.commons.layout.BorderLayoutArea}
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getTop
 * @function
 */


/**
 * Setter for the aggregated <code>top</code>.
 * @param {sap.ui.commons.layout.BorderLayoutArea} oTop
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setTop
 * @function
 */
	

/**
 * Destroys the top in the aggregation 
 * named <code>top</code>.
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#destroyTop
 * @function
 */


/**
 * Getter for aggregation <code>begin</code>.<br/>
 * Represents the Begin area
 * 
 * @return {sap.ui.commons.layout.BorderLayoutArea}
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getBegin
 * @function
 */


/**
 * Setter for the aggregated <code>begin</code>.
 * @param {sap.ui.commons.layout.BorderLayoutArea} oBegin
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setBegin
 * @function
 */
	

/**
 * Destroys the begin in the aggregation 
 * named <code>begin</code>.
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#destroyBegin
 * @function
 */


/**
 * Getter for aggregation <code>center</code>.<br/>
 * Represents the Center area
 * 
 * @return {sap.ui.commons.layout.BorderLayoutArea}
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getCenter
 * @function
 */


/**
 * Setter for the aggregated <code>center</code>.
 * @param {sap.ui.commons.layout.BorderLayoutArea} oCenter
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setCenter
 * @function
 */
	

/**
 * Destroys the center in the aggregation 
 * named <code>center</code>.
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#destroyCenter
 * @function
 */


/**
 * Getter for aggregation <code>end</code>.<br/>
 * Represents the End area
 * 
 * @return {sap.ui.commons.layout.BorderLayoutArea}
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getEnd
 * @function
 */


/**
 * Setter for the aggregated <code>end</code>.
 * @param {sap.ui.commons.layout.BorderLayoutArea} oEnd
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setEnd
 * @function
 */
	

/**
 * Destroys the end in the aggregation 
 * named <code>end</code>.
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#destroyEnd
 * @function
 */


/**
 * Getter for aggregation <code>bottom</code>.<br/>
 * Represents the Bottom area
 * 
 * @return {sap.ui.commons.layout.BorderLayoutArea}
 * @public
 * @name sap.ui.commons.layout.BorderLayout#getBottom
 * @function
 */


/**
 * Setter for the aggregated <code>bottom</code>.
 * @param {sap.ui.commons.layout.BorderLayoutArea} oBottom
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#setBottom
 * @function
 */
	

/**
 * Destroys the bottom in the aggregation 
 * named <code>bottom</code>.
 * @return {sap.ui.commons.layout.BorderLayout} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.layout.BorderLayout#destroyBottom
 * @function
 */


/**
 * Creates the specified area and adds the given controls to it. Returns the created area.
 *
 * @name sap.ui.commons.layout.BorderLayout#createArea
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies which area will be created. If the area is already available, the method call is ignored.
 * @param {sap.ui.core.Control} oControls
 *         Any number of controls can be submitted to be added to the newly created area; where each control is submitted as one argument.
 * @type sap.ui.commons.layout.BorderLayoutArea
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Sets the properties of the specified area with the given values
 *
 * @name sap.ui.commons.layout.BorderLayout#setAreaData
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose properties will be set
 * @param {object} oData
 *         JSON-like object that contains the values to be set
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Adds controls to the specified area
 *
 * @name sap.ui.commons.layout.BorderLayout#addContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area where controls will be added
 * @param {sap.ui.core.Control} oControls
 *         N controls can be submitted to be added. Each control is submitted as one argument.
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Inserts controls to an area at a given index.
 *
 * @name sap.ui.commons.layout.BorderLayout#insertContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area where the controls shall be inserted.
 * @param {int} iIndex
 *         Specifies the index where the controls shall be added. For a negative value of iIndex, the content is inserted at
 *         position '0'; for a value greater than the current size of the aggregation, the content is inserted at the last position.
 * @param {sap.ui.core.Control} oControl
 *         N controls can be submitted to be added. Each control is submitted as one argument.
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Removes the content with the given index from an area
 *
 * @name sap.ui.commons.layout.BorderLayout#removeContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose content shall be removed
 * @param {int} iIndex
 *         Specifies the index of the control that shall be removed
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Removes all content from an area
 *
 * @name sap.ui.commons.layout.BorderLayout#removeAllContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose content shall be removed
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Returns all controls inside the specified area inside an array
 *
 * @name sap.ui.commons.layout.BorderLayout#getContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose content controls shall be returned.
 * @type sap.ui.core.Control[]
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Determines the index of a given content control
 *
 * @name sap.ui.commons.layout.BorderLayout#indexOfContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area that will be searched
 * @param {sap.ui.core.Control} oContent
 *         Specifies the control whose index will be searched
 * @type int
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Destroys the content of the specified area
 *
 * @name sap.ui.commons.layout.BorderLayout#destroyContent
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose content will be destroyed
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Returns a JSON-like object that contains all property values of the requested area
 *
 * @name sap.ui.commons.layout.BorderLayout#getAreaData
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose data will be returned
 * @type object
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Returns the object of the specified area. If the area does not exist, the area will be created and returned.
 *
 * @name sap.ui.commons.layout.BorderLayout#getAreaById
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 *         Specifies the area whose object will be returned.
 * @type sap.ui.commons.layout.BorderLayoutArea
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Returns the area of the given type. If the area does not exist, it will be created when create is set to true.
 *
 * @name sap.ui.commons.layout.BorderLayout#getArea
 * @function
 * @param {sap.ui.commons.layout.BorderLayoutAreaTypes} oAreaId
 * @param {boolean} bCreate
 * @type sap.ui.commons.layout.BorderLayoutAreaTypes
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


// Start of sap\ui\commons\layout\BorderLayout.js
sap.ui.commons.layout.BorderLayout.prototype._getOrCreateArea = function(sAreaId, aContent) {

	var Types = sap.ui.commons.layout.BorderLayoutAreaTypes,
		that = this,
		oArea;

	function create(sMutator) {
		var oArea;
		
		if ( aContent ) {
			oArea = new sap.ui.commons.layout.BorderLayoutArea({
				id : that.getId() + "--" + sAreaId,
				areaId : sAreaId,
				content : aContent
			});
			that[sMutator](oArea);
		}
		
		return oArea;
	}

	// check for a valid area id
	if ( !Types.hasOwnProperty(sAreaId) ) {
		throw new Error("Invalid Area Id '" + sAreaId + "'");
	}

	// get or create
	switch(sAreaId)
	{
		case Types.top:	
			oArea = this.getTop() || create("setTop");
			break;
		case Types.begin:
			oArea = this.getBegin() || create("setBegin");
			break;
		case Types.center:
			oArea = this.getCenter() || create("setCenter");
			break;
		case Types.end:	
			oArea = this.getEnd() || create("setEnd");
			break;
		case Types.bottom:	
			oArea = this.getBottom() || create("setBottom");
			break;
		default:
			jQuery.sap.assert(false, "default case must not be reached");
			break;
	}

	return oArea;
};

sap.ui.commons.layout.BorderLayout.prototype.getArea = function(sAreaId, bCreate) {
	return this._getOrCreateArea(sAreaId, bCreate ? [] : null);
};

sap.ui.commons.layout.BorderLayout.prototype.createArea = function(sAreaId, oContent /* ... */) {
	return this._getOrCreateArea(sAreaId, Array.prototype.slice.call(arguments, 1));
};

sap.ui.commons.layout.BorderLayout.prototype.getAreaById = function(sAreaId) {
	return this._getOrCreateArea(sAreaId, []);
};

sap.ui.commons.layout.BorderLayout.prototype.getAreaData = function(sAreaId) {
	var oArea = this.getAreaById(sAreaId);
	return oArea ? 
		{
			size         : oArea.getSize(),
			visible      : oArea.getVisible(),
			overflowX    : oArea.getOverflowX(),
			overflowY    : oArea.getOverflowY(),
			contentAlign : oArea.getContentAlign()
		} : {};
};

sap.ui.commons.layout.BorderLayout.prototype.setAreaData = function(sAreaId, oData) {
	this.getArea(sAreaId, true).applySettings(oData);
	return this;
};

sap.ui.commons.layout.BorderLayout.prototype.addContent = function(sAreaId) {
	var oArea = this.getArea(sAreaId, true),
		i;
	
	for(var i=1; i<arguments.length; i++) {
		oArea.addContent(arguments[i]);
	}
	return this;
};

sap.ui.commons.layout.BorderLayout.prototype.insertContent = function(sAreaId, iIndex) { //obsolete
	var oArea = this.getArea(sAreaId, true), 
		i;
	
	for(i=2; i<arguments.length; i++) {
		oArea.insertContent(arguments[i], iIndex++);
	}
	return this;
};

sap.ui.commons.layout.BorderLayout.prototype.removeContent = function(sAreaId, vElement) {
	var oArea = this.getAreaById(sAreaId);
	if ( oArea ) {
		oArea.removeContent(vElement);
	}
	return this;
};

sap.ui.commons.layout.BorderLayout.prototype.removeAllContent = function(sAreaId) {
	var oArea = this.getAreaById(sAreaId);
	if ( oArea ) {
	  oArea.removeAllContent();
	}
	return this;
};

sap.ui.commons.layout.BorderLayout.prototype.getContent = function(sAreaId) {
	var oArea = this.getAreaById(sAreaId);
	return oArea ? oArea.getContent() : [];
};

sap.ui.commons.layout.BorderLayout.prototype.indexOfContent = function(sAreaId, oContent) {
	var oArea = this.getAreaById(sAreaId);
	return oArea ? oArea.indexOfContent(oContent) : -1;
};

sap.ui.commons.layout.BorderLayout.prototype.destroyContent = function(sAreaId) {
	this.getAreaById(sAreaId, true).destroyContent();
	return this;
};


/*
 TODOS

 - rename BorderLayoutAreaTypes to BorderLayoutAreaPosition
 - Borderlayout.createArea, getAreaById, setAreaData -> getArea(pos), setArea(pos, settings);
 - BorderlayoutArea.areaId: deprecate, redundant
 - BorderLayout.overflow: defaults?
 - RTL support in general: really swap classes or trust in our mirroring?
 */
