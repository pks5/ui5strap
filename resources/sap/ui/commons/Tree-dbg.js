/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.commons.Tree.
jQuery.sap.declare("sap.ui.commons.Tree");
jQuery.sap.require("sap.ui.commons.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Tree.
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
 * <li>{@link #getTitle title} : string</li>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize (default: 'auto')</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize (default: 'auto')</li>
 * <li>{@link #getShowHeader showHeader} : boolean (default: true)</li>
 * <li>{@link #getShowHeaderIcons showHeaderIcons} : boolean (default: true)</li>
 * <li>{@link #getShowHorizontalScrollbar showHorizontalScrollbar} : boolean (default: false)</li>
 * <li>{@link #getMinWidth minWidth} : sap.ui.core.CSSSize</li>
 * <li>{@link #getSelectionMode selectionMode} : sap.ui.commons.TreeSelectionMode (default: sap.ui.commons.TreeSelectionMode.Legacy)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getNodes nodes} <strong>(default aggregation)</strong> : sap.ui.commons.TreeNode[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul>
 * <li>{@link sap.ui.commons.Tree#event:select select} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li>
 * <li>{@link sap.ui.commons.Tree#event:selectionChange selectionChange} : fnListenerFunction or [fnListenerFunction, oListenerObject] or [oData, fnListenerFunction, oListenerObject]</li></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Simple tree to display item in a hierarchical way
 * @extends sap.ui.core.Control
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.commons.Tree
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.ui.commons.Tree", { metadata : {

	publicMethods : [
		// methods
		"expandAll", "collapseAll"
	],
	library : "sap.ui.commons",
	properties : {
		"title" : {type : "string", group : "Misc", defaultValue : null},
		"width" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : 'auto'},
		"height" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : 'auto'},
		"showHeader" : {type : "boolean", group : "Misc", defaultValue : true},
		"showHeaderIcons" : {type : "boolean", group : "Misc", defaultValue : true},
		"showHorizontalScrollbar" : {type : "boolean", group : "Misc", defaultValue : false},
		"minWidth" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : null},
		"selectionMode" : {type : "sap.ui.commons.TreeSelectionMode", group : "Behavior", defaultValue : sap.ui.commons.TreeSelectionMode.Legacy}
	},
	defaultAggregation : "nodes",
	aggregations : {
		"nodes" : {type : "sap.ui.commons.TreeNode", multiple : true, singularName : "node", bindable : "bindable"}
	},
	events : {
		"select" : {allowPreventDefault : true}, 
		"selectionChange" : {}
	}
}});


/**
 * Creates a new subclass of class sap.ui.commons.Tree with name <code>sClassName</code> 
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
 * @name sap.ui.commons.Tree.extend
 * @function
 */

sap.ui.commons.Tree.M_EVENTS = {'select':'select','selectionChange':'selectionChange'};


/**
 * Getter for property <code>title</code>.
 * Tree title
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>title</code>
 * @public
 * @name sap.ui.commons.Tree#getTitle
 * @function
 */

/**
 * Setter for property <code>title</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sTitle  new value for property <code>title</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setTitle
 * @function
 */


/**
 * Getter for property <code>width</code>.
 * Tree width
 *
 * Default value is <code>auto</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>width</code>
 * @public
 * @name sap.ui.commons.Tree#getWidth
 * @function
 */

/**
 * Setter for property <code>width</code>.
 *
 * Default value is <code>auto</code> 
 *
 * @param {sap.ui.core.CSSSize} sWidth  new value for property <code>width</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setWidth
 * @function
 */


/**
 * Getter for property <code>height</code>.
 * Tree height
 *
 * Default value is <code>auto</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>height</code>
 * @public
 * @name sap.ui.commons.Tree#getHeight
 * @function
 */

/**
 * Setter for property <code>height</code>.
 *
 * Default value is <code>auto</code> 
 *
 * @param {sap.ui.core.CSSSize} sHeight  new value for property <code>height</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setHeight
 * @function
 */


/**
 * Getter for property <code>showHeader</code>.
 * Tree Header is display. If false, the tree will be in a transparent mode
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showHeader</code>
 * @public
 * @name sap.ui.commons.Tree#getShowHeader
 * @function
 */

/**
 * Setter for property <code>showHeader</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowHeader  new value for property <code>showHeader</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setShowHeader
 * @function
 */


/**
 * Getter for property <code>showHeaderIcons</code>.
 * Show Header icons (e.g. Expand/Collapse all). Only consider if showHeader is true
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>showHeaderIcons</code>
 * @public
 * @name sap.ui.commons.Tree#getShowHeaderIcons
 * @function
 */

/**
 * Setter for property <code>showHeaderIcons</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bShowHeaderIcons  new value for property <code>showHeaderIcons</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setShowHeaderIcons
 * @function
 */


/**
 * Getter for property <code>showHorizontalScrollbar</code>.
 * Display horizontal scrollbar. If false, the overflow content will be hidden
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showHorizontalScrollbar</code>
 * @public
 * @name sap.ui.commons.Tree#getShowHorizontalScrollbar
 * @function
 */

/**
 * Setter for property <code>showHorizontalScrollbar</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowHorizontalScrollbar  new value for property <code>showHorizontalScrollbar</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setShowHorizontalScrollbar
 * @function
 */


/**
 * Getter for property <code>minWidth</code>.
 * Minimal width for the Tree. Can be useful when, for example, the width is specified in percentage, to avoid the tree to become too narrow when container is resize
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>minWidth</code>
 * @public
 * @name sap.ui.commons.Tree#getMinWidth
 * @function
 */

/**
 * Setter for property <code>minWidth</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.core.CSSSize} sMinWidth  new value for property <code>minWidth</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setMinWidth
 * @function
 */


/**
 * Getter for property <code>selectionMode</code>.
 * Selection mode of the Tree.
 *
 * Default value is <code>Legacy</code>
 *
 * @return {sap.ui.commons.TreeSelectionMode} the value of property <code>selectionMode</code>
 * @public
 * @name sap.ui.commons.Tree#getSelectionMode
 * @function
 */

/**
 * Setter for property <code>selectionMode</code>.
 *
 * Default value is <code>Legacy</code> 
 *
 * @param {sap.ui.commons.TreeSelectionMode} oSelectionMode  new value for property <code>selectionMode</code>
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#setSelectionMode
 * @function
 */


/**
 * Getter for aggregation <code>nodes</code>.<br/>
 * First level nodes
 * 
 * <strong>Note</strong>: this is the default aggregation for Tree.
 * @return {sap.ui.commons.TreeNode[]}
 * @public
 * @name sap.ui.commons.Tree#getNodes
 * @function
 */


/**
 * Inserts a node into the aggregation named <code>nodes</code>.
 *
 * @param {sap.ui.commons.TreeNode}
 *          oNode the node to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the node should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the node is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the node is inserted at 
 *             the last position        
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#insertNode
 * @function
 */

/**
 * Adds some node <code>oNode</code> 
 * to the aggregation named <code>nodes</code>.
 *
 * @param {sap.ui.commons.TreeNode}
 *            oNode the node to add; if empty, nothing is inserted
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#addNode
 * @function
 */

/**
 * Removes an node from the aggregation named <code>nodes</code>.
 *
 * @param {int | string | sap.ui.commons.TreeNode} vNode the node to remove or its index or id
 * @return {sap.ui.commons.TreeNode} the removed node or null
 * @public
 * @name sap.ui.commons.Tree#removeNode
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>nodes</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.commons.TreeNode[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.ui.commons.Tree#removeAllNodes
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.commons.TreeNode</code> in the aggregation named <code>nodes</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.commons.TreeNode}
 *            oNode the node whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.ui.commons.Tree#indexOfNode
 * @function
 */
	

/**
 * Destroys all the nodes in the aggregation 
 * named <code>nodes</code>.
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#destroyNodes
 * @function
 */


/**
 * Binder for aggregation <code>nodes</code>.
 *
 * @param {string} sPath path to a list in the model 
 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
 * @param {array} aFilters the predefined filters for this aggregation (optional)
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#bindNodes
 * @function
 */

/**
 * Unbinder for aggregation <code>nodes</code>.
 *
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#unbindNodes
 * @function
 */


/**
 * Event is fired when a tree node is selected.
 *
 * @name sap.ui.commons.Tree#select
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.commons.TreeNode} oControlEvent.getParameters.node The node which has been selected.
 * @param {object} oControlEvent.getParameters.nodeContext The binding context of the selected node.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'select' event of this <code>sap.ui.commons.Tree</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.ui.commons.Tree</code>.<br/> itself. 
 *  
 * Event is fired when a tree node is selected.
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.commons.Tree</code>.<br/> itself.
 *
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#attachSelect
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'select' event of this <code>sap.ui.commons.Tree</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#detachSelect
 * @function
 */

/**
 * Fire event select to attached listeners.
 *
 * Listeners may prevent the default action of this event using the preventDefault-method on the event object.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'node' of type <code>sap.ui.commons.TreeNode</code> The node which has been selected.</li>
 * <li>'nodeContext' of type <code>object</code> The binding context of the selected node.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {boolean} whether to prevent the default action
 * @protected
 * @name sap.ui.commons.Tree#fireSelect
 * @function
 */


/**
 * fired when the selection of the tree has been changed
 *
 * @name sap.ui.commons.Tree#selectionChange
 * @event
 * @param {sap.ui.base.Event} oControlEvent
 * @param {sap.ui.base.EventProvider} oControlEvent.getSource
 * @param {object} oControlEvent.getParameters
 * @param {sap.ui.commons.TreeNode[]} oControlEvent.getParameters.nodes The nodes which has been selected.
 * @param {object[]} oControlEvent.getParameters.nodeContexts The binding context of the selected nodes.
 * @public
 */
 
/**
 * Attach event handler <code>fnFunction</code> to the 'selectionChange' event of this <code>sap.ui.commons.Tree</code>.<br/>.
 * When called, the context of the event handler (its <code>this</code>) will be bound to <code>oListener<code> if specified
 * otherwise to this <code>sap.ui.commons.Tree</code>.<br/> itself. 
 *  
 * fired when the selection of the tree has been changed
 *
 * @param {object}
 *            [oData] An application specific payload object, that will be passed to the event handler along with the event object when firing the event.
 * @param {function}
 *            fnFunction The function to call, when the event occurs.  
 * @param {object}
 *            [oListener] Context object to call the event handler with. Defaults to this <code>sap.ui.commons.Tree</code>.<br/> itself.
 *
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#attachSelectionChange
 * @function
 */

/**
 * Detach event handler <code>fnFunction</code> from the 'selectionChange' event of this <code>sap.ui.commons.Tree</code>.<br/>
 *
 * The passed function and listener object must match the ones used for event registration.
 *
 * @param {function}
 *            fnFunction The function to call, when the event occurs.
 * @param {object}
 *            oListener Context object on which the given function had to be called.
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.commons.Tree#detachSelectionChange
 * @function
 */

/**
 * Fire event selectionChange to attached listeners.
 * 
 * Expects following event parameters:
 * <ul>
 * <li>'nodes' of type <code>sap.ui.commons.TreeNode[]</code> The nodes which has been selected.</li>
 * <li>'nodeContexts' of type <code>object[]</code> The binding context of the selected nodes.</li>
 * </ul>
 *
 * @param {Map} [mArguments] the arguments to pass along with the event.
 * @return {sap.ui.commons.Tree} <code>this</code> to allow method chaining
 * @protected
 * @name sap.ui.commons.Tree#fireSelectionChange
 * @function
 */


/**
 * Expands all nodes in the tree
 *
 * @name sap.ui.commons.Tree#expandAll
 * @function
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Collapses all nodes in the tree
 *
 * @name sap.ui.commons.Tree#collapseAll
 * @function
 * @type void
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


// Start of sap\ui\commons\Tree.js
sap.ui.commons.Tree.prototype.resizeListenerId;

sap.ui.commons.Tree.prototype.init = function(){
	this.bAllCollapsed = false;
	this.allowTextSelection(false);

	this.iOldScrollTop = null;

	this.oSelectedNodeMap = {};
	this.oSelectedContextMap = {};
	this.aLeadSelection = null;
	this.bDelFlag = null;
	this.aExpandedTree = [];

	//Create Buttons for Header

	var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");
	this.oCollapseAllButton = new sap.ui.commons.Button(this.getId() + "-CollapseAll", { icon: this.getIconPrefix() + "CollapseAll.png", tooltip: oResourceBundle.getText("TREE_COLLAPSE_ALL"), lite: true });
	this.oExpandAllButton	= new sap.ui.commons.Button(this.getId() + "-ExpandAll", { icon: this.getIconPrefix() + "ExpandAll.png", tooltip: oResourceBundle.getText("TREE_EXPAND_ALL"), lite: true });
	this.oCollapseAllButton.attachPress(this.onCollapseAll,this);
	this.oExpandAllButton.attachPress(this.onExpandAll,this);
	this.oCollapseAllButton.addStyleClass("sapUiTreeCol");
	this.oExpandAllButton.addStyleClass("sapUiTreeExp");
};

/**
 * Does all the cleanup when the Tree is to be destroyed.
 * Called from the element's destroy() method.
 * @private
 */
sap.ui.commons.Tree.prototype.exit = function(){
	if ( this.oCollapseAllButton ) {
		this.oCollapseAllButton.destroy();
		this.oCollapseAllButton = null;
	}
	if ( this.oExpandAllButton ) {
		this.oExpandAllButton.destroy();
		this.oExpandAllButton = null;
	}
};

// Enumeration for different types of selection in the tree
sap.ui.commons.Tree.SelectionType = {
	Select: "Select",
	Toggle: "Toggle",
	Range: "Range"
}
/***********************************************************************************
* EVENTS HANDLING
***********************************************************************************/

/** Handler for "Theme Changed" event.
 * @private
 */
sap.ui.commons.Tree.prototype.onThemeChanged = function(){
	this.oCollapseAllButton.setIcon(this.getIconPrefix() + "CollapseAll.png");
	this.oExpandAllButton.setIcon(this.getIconPrefix() + "ExpandAll.png");
};

/** Handler for "Expand All" button.
 * @private
 */
sap.ui.commons.Tree.prototype.onExpandAll = function(){
	this.expandAll();
};

/**Handler for "Collapse All" button.
 * @private
 */
sap.ui.commons.Tree.prototype.onCollapseAll = function(){
	this.collapseAll();
};

/*"*********************************************************************************
* PUBLIC METHODS
***********************************************************************************/
sap.ui.commons.Tree.prototype.expandAll = function(){
	var aNodes = this.getNodes();
	for(var i=0;i<aNodes.length;i++){
		aNodes[i].expand(true);
	}
};

sap.ui.commons.Tree.prototype.collapseAll = function(){
	var aNodes = this.getNodes();
	for(var i=0;i<aNodes.length;i++){
		aNodes[i].collapse(true);
	}
};

/***********************************************************************************
* KEYBOARD NAVIGATION
***********************************************************************************/
/**
* DOWN key behavior
* Opens the section or activates the UI element on DOWN key
* @private
* @param oEvent Browser event
*/
sap.ui.commons.Tree.prototype.onsapdown = function(oEvent){
	this.moveFocus(false);
	oEvent.preventDefault();
};

/**
* UP key behavior
* Opens the section or activates the UI element on UP key
* @private
* @param oEvent Browser event
*/
sap.ui.commons.Tree.prototype.onsapup = function(oEvent){
	this.moveFocus(true);
	oEvent.preventDefault();
};

/**
 * The general HOME key event of the tree
 * @private
 * @param {event} oEvent The saphome event object
 */
sap.ui.commons.Tree.prototype.onsaphome = function(oEvent) {
	this.placeFocus(this.getFirstSibling(oEvent.target));
	oEvent.preventDefault();
};

/**
 * The general CTRL+HOME key event of the tree
 * @private
 * @param {event} oEvent The saphome event object
 */
sap.ui.commons.Tree.prototype.onsaphomemodifiers = function(oEvent) {
	this.placeFocus(this.getFirst());
	oEvent.preventDefault();
};

/**
 * The general END key event of the tree
 * @private
 * @param {event} oEvent The sapend event object
 */
sap.ui.commons.Tree.prototype.onsapend = function(oEvent) {
	this.placeFocus(this.getLastSibling(oEvent.target));
	oEvent.preventDefault();
};

/**
 * The general CTRL+END key event of the tree
 * @private
 * @param {event} oEvent The sapend event object
 */
sap.ui.commons.Tree.prototype.onsapendmodifiers = function(oEvent) {
	this.placeFocus(this.getLast());
	oEvent.preventDefault();
};

/**
 * The numpad STAR(*) key event of the tree
 * @private
 * @param {event} oEvent The sapcollapseall event object
 */
sap.ui.commons.Tree.prototype.onsapcollapseall = function(oEvent) {

	if(this.bAllCollapsed ){
		this.expandAll();
	}
	else{
		this.collapseAll();
	}

	this.bAllCollapsed = !this.bAllCollapsed;
};

/***********************************************************************************
* HELPER METHODS - DOM NAVIGATION
***********************************************************************************/

/**
 * Determine the icon prefix for the embedded button icons
 * @private
 */
sap.ui.commons.Tree.prototype.getIconPrefix = function() {
	var sIconPrefix = "themes/" + sap.ui.getCore().getConfiguration().getTheme() + "/";
	
	if(!sap.ui.getCore().getConfiguration().getRTL()){
		sIconPrefix		+= "img/tree/";
	}
	else{
		sIconPrefix		+= "img-RTL/tree/";
	}
	return sap.ui.resource("sap.ui.commons", sIconPrefix);
};

/**Returns the first Sibling tree node based on DOM Tree node provided
 * @param oDomNode The DOM Tree node from which calculate the first sibling
 * @returns The first sibling tree node
 * @private
*/
sap.ui.commons.Tree.prototype.getFirstSibling = function(oDomNode) {
	var aDomFirstSiblingNode	= jQuery(oDomNode).siblings(".sapUiTreeNode:visible").first();

	if(aDomFirstSiblingNode.length){
		return aDomFirstSiblingNode[0];
	}
	return null;
};

/**Returns the last Sibling tree node based on DOM Tree node provided
 * @param oDomNode The DOM Tree node from which calculate the last sibling
 * @returns The last sibling tree node
 * @private
*/
sap.ui.commons.Tree.prototype.getLastSibling= function(oDomNode) {
	var aDomLastSiblingNode	= jQuery(oDomNode).siblings(".sapUiTreeNode:visible").last();

	if(aDomLastSiblingNode.length){
		return aDomLastSiblingNode[0];
	}
	return null;
};

/**Returns the first tree node of the tree. Children of collapsed nodes (hidden) are not considered.
 * @returns The first tree node
 * @private
*/
sap.ui.commons.Tree.prototype.getFirst = function() {
	var aDomFirstNode		= this.$().find(".sapUiTreeNode:visible").first();

	if(aDomFirstNode.length){
		return aDomFirstNode[0];
	}
	return null;
};

/**Returns the last tree node of the tree. Children of collapsed nodes (hidden) are not considered.
 * @returns The last tree node
 * @private
*/
sap.ui.commons.Tree.prototype.getLast = function() {
	var aDomLastNode		= this.$().find(".sapUiTreeNode:visible").last();

	if(aDomLastNode.length){
		return aDomLastNode[0];
	}
	return null;

};

/***********************************************************************************
* HELPER METHODS - FOCUS MANAGEMENT
***********************************************************************************/

/**
 * Move the focus by one position, either UP or DOWN depending of "bMoveUp"
 * @param bMoveUp When true the focus is move up. Otherwise, it's moved down
 * @private
 */
sap.ui.commons.Tree.prototype.moveFocus = function(bMoveUp){
   var afocusedNodeDom	= jQuery(".sapUiTreeNode:focus");
   if(afocusedNodeDom.length){

	   var oCurrNode = sap.ui.getCore().getControl(afocusedNodeDom[0].id)
;
	   var aDomAllNodes = this.$().find(".sapUiTreeNode:visible");
	   var currIndex	= aDomAllNodes.index(afocusedNodeDom[0]);

	   var nextIndex = currIndex;
	   if(bMoveUp){
		   nextIndex--;
	   }
	   else{
		   nextIndex++;
	   }

	   if(nextIndex >= 0 && nextIndex < aDomAllNodes.length){
			var oDomNextNode	= aDomAllNodes.eq( nextIndex );
			var oNextNode = sap.ui.getCore().getControl(oDomNextNode[0].id);
			oCurrNode.blur();
			oNextNode.focus();
	   }
	}

};

/**Adjusts the focus after a node is collapsed. This is necessary as the currently focused node can then be hidden,
 * leading the tree not being focusable anymore.
 *
 * When the focusable is being hid by the collapsing of its parent, the focus is then set on this parent.
 *
 * @private
 */
sap.ui.commons.Tree.prototype.adjustFocus = function(){

	var oFocusableNode = this.$().find('.sapUiTreeNode[tabIndex="0"]');

	if(!oFocusableNode.is(':visible')){


		var aDomAllNodes		= this.$().find(".sapUiTreeNode");
		var focusIndex			= aDomAllNodes.index(oFocusableNode[0]);
		var aDomPrecedingNodes	= aDomAllNodes.filter(":lt("+focusIndex+")");
		var aDomVisiblePrecedingNodes = aDomPrecedingNodes.filter(":visible");
		var oNewFocusNode		= aDomVisiblePrecedingNodes[aDomVisiblePrecedingNodes.length-1];

		if(oNewFocusNode) {
			oNewFocusNode.setAttribute("tabindex", "0");

			if( jQuery(".sapUiTreeNode:focus").is(":not(:visible)")){
				oNewFocusNode.focus();
			}
		}

	}

};

/**Places the focus on the node corresponding to given DOM Tree Node
 * @param oDomTargetNode The DOM Tree Node corresponding to the node to focus
 * @private
 */
sap.ui.commons.Tree.prototype.placeFocus = function(oDomTargetNode){

	if(!oDomTargetNode){
		return; //No Target node provided!
	}

	var oDomfocusedNode	= this.$().find(".sapUiTreeNode[tabIndex='0']");
	if(oDomfocusedNode.length){
		oDomfocusedNode[0].setAttribute("tabindex", "-1");
	}

	oDomTargetNode.setAttribute("tabindex", "0");
	var oTargetNode = sap.ui.getCore().getControl(oDomTargetNode.id);
	oTargetNode.focus();
};

/***********************************************************************************
* HELPER METHODS - SELECTION MANAGEMENT
***********************************************************************************/
/**Adjusts the selection, when expanding, by re-selecting a children node when the expanded node was
   selected only to reprensented the selection of a children node
 * @param oExpandingDomNode The Node being expanded
 * @private
 */
sap.ui.commons.Tree.prototype.adjustSelectionOnExpanding = function(oExpandingDomNode) {

	var $Tree = this.$(),
		$ExpandingDomNode = jQuery(oExpandingDomNode),
		$DomSelectedNode,
		$DomParent;

	//Current node is a fake selection, remove it. A child will be either another fake selection or an actual one.
	if($ExpandingDomNode.hasClass("sapUiTreeNodeSelectedParent")) {
		$ExpandingDomNode.removeClass("sapUiTreeNodeSelectedParent");
	}

	//If the actual selection now visible, remove all fake ones
	var $DomActualSelection = $Tree.find(".sapUiTreeNodeSelected:visible");
	if ($DomActualSelection.length){
		$Tree.find(".sapUiTreeNodeSelectedParent").removeClass("sapUiTreeNodeSelectedParent");
	}
	else {
		$DomSelectedNode = $Tree.find(".sapUiTreeNodeSelected");

		//Find first visible parent node
		$DomParent = $DomSelectedNode.parent(".sapUiTreeChildrenNodes").prev(".sapUiTreeNode");

		while ($DomParent.length && !$DomParent.is(":visible")) {
			$DomParent = $DomParent.parent(".sapUiTreeChildrenNodes").prev(".sapUiTreeNode");
		}
		$DomParent.addClass("sapUiTreeNodeSelectedParent");
	}
};

/**Adjusts the selection, when collapsing, selecting a parent when the actual selected node is
 * not visible.
 * @param oDomCollapsingNode The Node being expanded
 * @private
 */
sap.ui.commons.Tree.prototype.adjustSelectionOnCollapsing = function(oDomCollapsingNode){
	var that = this
	if (this.getSelectionMode() != sap.ui.commons.TreeSelectionMode.Multi) {
		var $DomCollapsingNode = jQuery(oDomCollapsingNode),
		sChildrenId = "#" + $DomCollapsingNode.attr("id") + "-children",
		$DomActualSelSubNode = $DomCollapsingNode.siblings(sChildrenId).find(".sapUiTreeNodeSelected"),
		$DomParentSelSubNode = $DomCollapsingNode.siblings(sChildrenId).find(".sapUiTreeNodeSelectedParent");

		if($DomActualSelSubNode.length || $DomParentSelSubNode.length){
			$DomCollapsingNode.addClass("sapUiTreeNodeSelectedParent");

			if($DomParentSelSubNode.length){
				$DomParentSelSubNode.removeClass("sapUiTreeNodeSelectedParent");
			}
		}
	} else {
		var $DomCollapsingNode = jQuery(oDomCollapsingNode),
		sChildrenId = "#" + $DomCollapsingNode.attr("id") + "-children",
		$DomActualSelSubNode = $DomCollapsingNode.siblings(sChildrenId).find(".sapUiTreeNodeSelected");
		var aSelNode = $DomActualSelSubNode.control();
		if (aSelNode){
			if (jQuery.isEmptyObject(aSelNode) == false) {
				jQuery.each(aSelNode, function(sId, oNode){
					that._delMultiSelection(oNode);
				});
			}
		}
	}
};

/**
 * override this method on Element.js and return true if tree binding
 * @private
 */
sap.ui.commons.Tree.prototype.isTreeBinding = function(sName) {
	return (sName == "nodes");
};

/**
 * override element updateAggregation method with this one and update the tree node bindings
 * @private
 */
sap.ui.commons.Tree.prototype.updateNodes = function(){
	var oContext = this.oSelectedContext, 
		oNode;
	this.updateAggregation("nodes");
	if (oContext) {
		oNode = this.getNodeByContext(oContext);
		this.setSelection(oNode, true);
	}
};

/**
 * Returns the node with the given context, or null if no such node currently exists
 * 
 * @param {sap.ui.model.Context} oContext the context of the node to be retrieved
 * @public
 * @since 1.19
 */
sap.ui.commons.Tree.prototype.getNodeByContext = function(oContext){
	return this.findNode(this, function(oNode) {
		return oNode.getBindingContext() == oContext;
	});
};

/**
 * Search through all existing nodes and return the first node which matches using
 * the given matching function
 * 
 * @param {function} fnMatch the matching function
 * @param {sap.ui.commons.Tree|sap.ui.commons.TreeNode} oNode the node to check
 * @returns The found node
 * @private
 */
sap.ui.commons.Tree.prototype.findNode = function(oNode, fnMatch) {
	var oFoundNode,
		that = this;
	if (fnMatch(oNode)) {
		return oNode;
	}
	jQuery.each(oNode.getNodes(), function(i, oNode) {
		oFoundNode = that.findNode(oNode, fnMatch);
		if (oFoundNode) return false;
	});
	return oFoundNode;
};

sap.ui.commons.Tree.prototype.setSelectionMode = function(oMode){
	oMode = this.validateProperty("selectionMode", oMode);
	if (this.getSelectionMode() != oMode) {
		this.setProperty("selectionMode", oMode);
		// Clear current selection, whenever the selectionmode changes
		this._delSelection();
	}
};

/**Returns the selected node in the tree. If not selection, returns false.
 * @returns The selected node
 * @private
 */
sap.ui.commons.Tree.prototype.getSelection = function(){
	for (var sId in this.oSelectedNodeMap) {
		return this.oSelectedNodeMap[sId];
	}
	return null;
};

/**Sets the selected node reference of the Tree
 * @private
 */
sap.ui.commons.Tree.prototype.setSelection = function(oNode, bSuppressEvent, sType, bDeselectOtherNodes){
	var bDoSelect = true;
	if (!bSuppressEvent) {
		bDoSelect = this.fireSelect({node: oNode, nodeContext: oNode && oNode.getBindingContext()});
	}

	if (bDoSelect) {
		switch (this.getSelectionMode()) {
		case sap.ui.commons.TreeSelectionMode.Legacy:
		case sap.ui.commons.TreeSelectionMode.Single:
			this._setSelectedNode(oNode, bSuppressEvent)
			break;
		case sap.ui.commons.TreeSelectionMode.Multi:
			if (sType == sap.ui.commons.Tree.SelectionType.Range) {
				this._setSelectedNodeMapRange(oNode, bSuppressEvent)
			}
			else if (sType == sap.ui.commons.Tree.SelectionType.Toggle) {
				this._setSelectedNodeMapToggle(oNode, bSuppressEvent)
			}
			else {
				this._setSelectedNode(oNode, bSuppressEvent)
			}
			break;
		case sap.ui.commons.TreeSelectionMode.None:
			break;
		}
	}
};

/**Rerendering handling. Sets the scroll position so that the selected node stays on the position it
 * was before rerendering, for example after the expand and adding the nodes dynamically.
 * @private
 */
sap.ui.commons.Tree.prototype.onAfterRendering = function () {
	if (this.iOldScrollTop) {
		this.$("TreeCont").scrollTop(this.iOldScrollTop);
	}
};

/**
 * Whenever nodes are added ore removed from the tree, the selection needs to be adapted, 
 * so that the selected node map is in sync with the isSelected properties of the contained
 * nodes
 * @private
 */
sap.ui.commons.Tree.prototype.invalidate = function () {
	sap.ui.core.Control.prototype.invalidate.apply(this, arguments);
	this.oSelectedNodeMap = {};
	this.oSelectedContextMap = {};
	this.updateSelection(this, true);
};

/**
 * Loop through all tree nodes and collect the selected state
 * @private
 */
sap.ui.commons.Tree.prototype.updateSelection = function (oNode, bExpanded) {
	var that = this;
	jQuery.each(oNode.getNodes(), function(i, oNode) {
		if (oNode.getIsSelected()) {
			switch (that.getSelectionMode()) {
				case sap.ui.commons.TreeSelectionMode.None:
					jQuery.sap.log.warning("Added selected nodes in a tree with disabled selection");
					oNode.setIsSelected(false);
					break;
				case sap.ui.commons.TreeSelectionMode.Legacy:
					if (jQuery.isEmptyObject(that.oSelectedNodeMap)) {
						that.oSelectedNodeMap[oNode.getId()] = oNode;
					}
					break;
				case sap.ui.commons.TreeSelectionMode.Single:
					if (jQuery.isEmptyObject(that.oSelectedNodeMap) == false) {
						jQuery.sap.log.warning("Added multiple selected nodes in single select tree");
						oNode.setIsSelected(false);
					} else {
						that.oSelectedNodeMap[oNode.getId()] = oNode;
					}
					break;
				case sap.ui.commons.TreeSelectionMode.Multi:
					if (!bExpanded) {
						jQuery.sap.log.warning("Added selected node inside collapsed node in multi select tree");
						oNode.setIsSelected(false);
					} else {
						that.oSelectedNodeMap[oNode.getId()] = oNode;
					}
					break;
			}
		}
		that.updateSelection(oNode, bExpanded && oNode.getExpanded());
	});
};

/**Rerendering handling. Remembers the scroll position of the selected node.
 * @private
 */
sap.ui.commons.Tree.prototype.onBeforeRendering = function() {
	this.iOldScrollTop = this.$("TreeCont").scrollTop();
};

sap.ui.commons.Tree.prototype._setSelectedNode = function(oNode, bSuppressEvent) {
	var that = this;

	jQuery.each(this.oSelectedNodeMap, function(sId, oNode){
		that._delMultiSelection(oNode, bSuppressEvent);
	});

	if (oNode) {
		oNode._select(bSuppressEvent, true);
	}

	this.oSelectedNodeMap[oNode.getId()] = oNode;
	this.oSelectedContextMap[oNode.getId()] = oNode && oNode.getBindingContext();
	this.oLeadSelection = oNode;
	if (!bSuppressEvent) {
		this.fireSelectionChange({nodes: [oNode], nodeContexts: [oNode && oNode.getBindingContext()]});
	}
};

sap.ui.commons.Tree.prototype._setSelectedNodeMapToggle = function(oNode, bSuppressEvent) {
	this._setNodeSelection(oNode, !oNode.getIsSelected(), bSuppressEvent);
};

sap.ui.commons.Tree.prototype._setSelectedNodeMapRange = function(oNode, bSuppressEvent) {
	var aNodes = [], aNodeContexts = [];
	var that = this;

	if (this.bDelFlag == true) {
		jQuery.each(this.oSelectedNodeMap, function(sId, oNode){
			that._delMultiSelection(oNode, bSuppressEvent);
		});
	};

	if (this.oSelectedNodeMap[oNode.getId()] == oNode) {
		return; //Nothing to do!
	}
	else{
		this.aExpandedTree.length = 0;
		var aNodes = oNode.getTree().getNodes();
		var i, a, b;
		if (aNodes.length>0){
			this._getSelectableNodes(aNodes);
			var oStartIndex = this.aExpandedTree.indexOf(this.oLeadSelection);
			var oEndIndex = this.aExpandedTree.indexOf(oNode);
			if (oStartIndex < oEndIndex){
				a = oStartIndex, b = oEndIndex
			}
			else {
				a = oEndIndex, b = oStartIndex
			};
			for (i=a;i<=b;i++) {
				var oSelNode = this.aExpandedTree[i]
				this._setMultiSelection(oSelNode, bSuppressEvent);
			};
		}
	};

	if (!bSuppressEvent) {
		jQuery.map(this.oSelectedNodeMap, function(sId, oNode) {aNodes.push(oNode)});
		jQuery.map(this.oSelectedContextMap, function(sId, oNode) {aNodeContexts.push(oNode)});
		this.fireSelectionChange({nodes: aNodes, nodeContexts: aNodeContexts});
	};
};

sap.ui.commons.Tree.prototype._getSelectableNodes = function(aNodes) {
	if (aNodes.length>0){
		var i;
		for (i=0;i<aNodes.length;i++) {
			var oNode = aNodes[i];
			if (oNode.getSelectable()){
				this.aExpandedTree.push(oNode);
			};
			if (oNode.getExpanded()){
				var aSubNodes = oNode.getNodes();
				this._getSelectableNodes(aSubNodes);
			};
		}
	};
};

sap.ui.commons.Tree.prototype._setNodeSelection = function(oNode, bIsSelected, bSuppressEvent) {
	var aNodes = [], aNodeContexts = [];
	this.bDelFlag = true;

	if (bIsSelected) {
		this._setMultiSelection(oNode, bSuppressEvent);
		this.oLeadSelection = oNode;
	} else {
		this._delMultiSelection(oNode, bSuppressEvent);
		this.oLeadSelection = oNode;
	}
	if (!bSuppressEvent) {
		jQuery.map(this.oSelectedNodeMap, function(sId, oNode) {aNodes.push(oNode);});
		jQuery.map(this.oSelectedContextMap, function(sId, oNode) {aNodeContexts.push(oNode);});
		this.fireSelectionChange({nodes: aNodes, nodeContexts: aNodeContexts});
	}
};

sap.ui.commons.Tree.prototype._setMultiSelection = function(oSelNode, bSuppressEvent) {
	if (!oSelNode) {
		return;
	}
	oSelNode._select(bSuppressEvent);
	this.oSelectedNodeMap[oSelNode.getId()] = oSelNode;
	this.oSelectedContextMap[oSelNode.getId()] = oSelNode.getBindingContext();
};

sap.ui.commons.Tree.prototype._delMultiSelection = function(oSelNode, bSuppressEvent) {
	if (!oSelNode) {
		return;
	}
	oSelNode._deselect();
	delete this.oSelectedNodeMap[oSelNode.getId()];
	delete this.oSelectedContextMap[oSelNode.getId()];
};

sap.ui.commons.Tree.prototype._delSelection = function() {
	var that = this;
	if (this.oSelectedNode) {
		this.oSelectedNode._deselect();
	}
	if (jQuery.isEmptyObject(this.oSelectedNodeMap) == false) {
		jQuery.each(this.oSelectedNodeMap, function(sId, oNode){
			that._delMultiSelection(oNode);
		});
	};
};
