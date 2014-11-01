/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.core.util.Export
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Control', './ExportColumn', './ExportRow', './ExportType', './File'],
	function(jQuery, Control, ExportColumn, ExportRow, ExportType, File) {
	'use strict';

	/**
	 * Constructor for a new Export.
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
	 * <li>{@link #getExportType exportType} : sap.ui.core.util.ExportType</li>
	 * <li>{@link #getColumns columns} : sap.ui.core.util.ExportColumn[]</li>
	 * <li>{@link #getRows rows} : sap.ui.core.util.ExportRow[]</li></ul>
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
	 * Export provides the possibility to generate a list of data in a specific format / type, e.g. CSV to use it in other programs / applications.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP AG
	 * @version 1.22.10
	 * @since 1.22.0
	 *
	 * @constructor
	 * @public
	 * @name sap.ui.core.util.Export
	 */
	var Export = Control.extend('sap.ui.core.util.Export', {

		metadata: {

			// ---- object ----
			publicMethods: [
				// methods
				"generate", "saveFile"
			],

			// ---- control specific ----
			library: "sap.ui.core",

			aggregations: {
				exportType: {
					type: 'sap.ui.core.util.ExportType',
					multiple: false
				},
				columns: {
					type: 'sap.ui.core.util.ExportColumn',
					multiple: true,
					bindable : 'bindable'
				},
				rows: {
					type: 'sap.ui.core.util.ExportRow',
					multiple: true,
					bindable: 'bindable'
				},
				_template: {
					type: 'sap.ui.core.util.ExportRow',
					multiple: false,
					visibility: 'hidden'
				}
			}

		}

	});

	// The aggregation is only to get the data / contexts. no actual rows will be created so no template/factory is needed here
	Export.getMetadata().getAllAggregations()["rows"]._doesNotRequireFactory = true;

	/**
	 * Creates a new subclass of class sap.ui.core.util.Export with name <code>sClassName</code> 
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
	 * @name sap.ui.core.util.Export.extend
	 * @function
	 */

	/**
	 * Getter for aggregation <code>exportType</code>.<br/>
	 * Type that generates the content.
	 *
	 * @return {sap.ui.core.util.ExportType}
	 * @public
	 * @name sap.ui.core.util.Export#getExportType
	 * @function
	 */

	/**
	 * Setter for the aggregated <code>exportType</code>.
	 * @param {sap.ui.core.util.ExportType} oExportType
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#setExportType
	 * @function
	 */

	/**
	 * Destroys the exportType in the aggregation 
	 * named <code>exportType</code>.
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#destroyExportType
	 * @function
	 */

	/**
	 * Getter for aggregation <code>columns</code>.<br/>
	 * Columns for the Export.
	 *
	 * @return {sap.ui.core.util.ExportColumn[]}
	 * @public
	 * @name sap.ui.core.util.Export#getColumns
	 * @function
	 */

	/**
	 * Inserts a column into the aggregation named <code>columns</code>.
	 *
	 * @param {sap.ui.core.util.ExportColumn}
	 *          oColumn the column to insert; if empty, nothing is inserted
	 * @param {int}
	 *             iIndex the <code>0</code>-based index the column should be inserted at; for
	 *             a negative value of <code>iIndex</code>, the column is inserted at position 0; for a value
	 *             greater than the current size of the aggregation, the column is inserted at
	 *             the last position
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#insertColumn
	 * @function
	 */

	/**
	 * Adds some column <code>oColumn</code> 
	 * to the aggregation named <code>columns</code>.
	 *
	 * @param {sap.ui.core.util.ExportColumn}
	 *            oColumn the column to add; if empty, nothing is inserted
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#addColumn
	 * @function
	 */

	/**
	 * Removes an column from the aggregation named <code>columns</code>.
	 *
	 * @param {int | string | sap.ui.core.util.ExportColumn} vColumn the column to remove or its index or id
	 * @return {sap.ui.core.util.ExportColumn} the removed column or null
	 * @public
	 * @name sap.ui.core.util.Export#removeColumn
	 * @function
	 */

	/**
	 * Removes all the controls in the aggregation named <code>columns</code>.<br/>
	 * Additionally unregisters them from the hosting UIArea.
	 * @return {sap.ui.core.util.ExportColumn[]} an array of the removed elements (might be empty)
	 * @public
	 * @name sap.ui.core.util.Export#removeAllColumns
	 * @function
	 */

	/**
	 * Checks for the provided <code>sap.ui.core.util.ExportColumn</code> in the aggregation named <code>columns</code> 
	 * and returns its index if found or -1 otherwise.
	 *
	 * @param {sap.ui.core.util.ExportColumn}
	 *            oColumn the column whose index is looked for.
	 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
	 * @public
	 * @name sap.ui.core.util.Export#indexOfColumn
	 * @function
	 */

	/**
	 * Destroys all the columns in the aggregation 
	 * named <code>columns</code>.
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#destroyColumns
	 * @function
	 */

	/**
	 * Binder for aggregation <code>columns</code>.
	 *
	 * @param {string} sPath path to a list in the model 
	 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
	 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
	 * @param {array} aFilters the predefined filters for this aggregation (optional)
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#bindColumns
	 * @function
	 */

	/**
	 * Unbinder for aggregation <code>columns</code>.
	 *
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#unbindColumns
	 * @function
	 */

	/**
	 * Getter for aggregation <code>rows</code>.<br/>
	 * Rows of the Export.
	 * 
	 * @return {sap.ui.core.util.ExportRow[]}
	 * @public
	 * @name sap.ui.core.util.Export#getRows
	 * @function
	 */

	/**
	 * Inserts a row into the aggregation named <code>rows</code>.
	 *
	 * @param {sap.ui.core.util.ExportRow}
	 *          oRow the row to insert; if empty, nothing is inserted
	 * @param {int}
	 *             iIndex the <code>0</code>-based index the row should be inserted at; for 
	 *             a negative value of <code>iIndex</code>, the row is inserted at position 0; for a value 
	 *             greater than the current size of the aggregation, the row is inserted at 
	 *             the last position        
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#insertRow
	 * @function
	 */

	/**
	 * Adds some row <code>oRow</code> 
	 * to the aggregation named <code>rows</code>.
	 *
	 * @param {sap.ui.core.util.ExportRow}
	 *            oRow the row to add; if empty, nothing is inserted
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#addRow
	 * @function
	 */

	/**
	 * Removes an row from the aggregation named <code>rows</code>.
	 *
	 * @param {int | string | sap.ui.core.util.ExportRow} vRow the row to remove or its index or id
	 * @return {sap.ui.core.util.ExportRow} the removed row or null
	 * @public
	 * @name sap.ui.core.util.Export#removeRow
	 * @function
	 */

	/**
	 * Removes all the controls in the aggregation named <code>rows</code>.<br/>
	 * Additionally unregisters them from the hosting UIArea.
	 * @return {sap.ui.core.util.ExportRow[]} an array of the removed elements (might be empty)
	 * @public
	 * @name sap.ui.core.util.Export#removeAllRows
	 * @function
	 */

	/**
	 * Checks for the provided <code>sap.ui.core.util.ExportRow</code> in the aggregation named <code>rows</code> 
	 * and returns its index if found or -1 otherwise.
	 *
	 * @param {sap.ui.core.util.ExportRow}
	 *            oRow the row whose index is looked for.
	 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
	 * @public
	 * @name sap.ui.core.util.Export#indexOfRow
	 * @function
	 */

	/**
	 * Destroys all the rows in the aggregation 
	 * named <code>rows</code>.
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#destroyRows
	 * @function
	 */

	/**
	 * Binder for aggregation <code>rows</code>.
	 *
	 * @param {string} sPath path to a list in the model 
	 * @param {sap.ui.core.Element} oTemplate the control template for this aggregation
	 * @param {sap.ui.model.Sorter} oSorter the initial sort order (optional)
	 * @param {array} aFilters the predefined filters for this aggregation (optional)
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#bindRows
	 * @function
	 */

	/**
	 * Unbinder for aggregation <code>rows</code>.
	 *
	 * @return {sap.ui.core.util.Export} <code>this</code> to allow method chaining
	 * @public
	 * @name sap.ui.core.util.Export#unbindRows
	 * @function
	 */

	/**
	 * @private
	 * @name sap.ui.core.util.Export#init
	 * @function
	 */
	Export.prototype.init = function() {
		this._oDeferred = null;
		this._oRowBindingInfo = null;
	};

	/**
	 * @private
	 * @name sap.ui.core.util.Export#exit
	 * @function
	 */
	Export.prototype.exit = function() {
		delete this._oDeferred;
		delete this._oRowBindingInfo;
	};

	/**
	 * Creates the row template using the defined columns
	 *
	 * @return {sap.ui.core.util.ExportRow} row template
	 * @private
	 * @name sap.ui.core.util.Export#_createRowTemplate
	 * @function
	 */
	Export.prototype._createRowTemplate = function() {
		var oTemplate = new ExportRow(this.getId() + "-row"),
			aCols = this.getColumns();

		for (var i = 0, l = aCols.length; i < l; i++) {
			var oColTemplate = aCols[i].getTemplate();
			if (oColTemplate) {
				oTemplate.addCell(oColTemplate.clone("col" + i));
			}
		}
		return oTemplate;
	};

	Export.prototype.bindAggregation = function(sName, oBindingInfo) {
		if (sName === 'rows') {
			// skip binding the aggregation for now.
			// will be bound when generating and unbound afterwards
			this._oRowBindingInfo = oBindingInfo;
			return this;
		}
		return Control.prototype.bindAggregation.apply(this, arguments);
	};

	/**
	 * Called when the row aggregation gets updated
	 *
	 * @private
	 * @name sap.ui.core.util.Export#updateRows
	 * @function
	 */
	Export.prototype.updateRows = function(sReason) {
		if (sReason === 'change') {
			// generate the file
			var sContent = this.getExportType()._generate(this);

			// template and rows aren't needed anymore, cleans up bindings, etc.
			this.destroyAggregation('_template');
			this.unbindAggregation('rows');

			// resolve promise to notify listeners
			this._oDeferred.resolveWith(this, [ sContent] );
			this._oDeferred = null;
		}
	};

	/**
	 * Generates the file content and returns a jQuery Promise
	 * with the instance as context (this).<br>
	 * The promise will be resolved with the generated content
	 * as a string.
	 *
	 * @return {jQuery.Promise} Promise object
	 *
	 * @public
	 * @name sap.ui.core.util.Export#generate
	 * @function
	 */
	Export.prototype.generate = function() {
		if (!this._oDeferred) {
			this._oDeferred = jQuery.Deferred();
			var oPromise = this._oDeferred.promise();

			if (!this.hasModel()) {
				this._oDeferred.rejectWith(this, [ "Generate is not possible beause no model was set." ]);
			} else {
				// setup row-template
				var oTemplate = this._createRowTemplate();
				this.setAggregation('_template', oTemplate, true);

				// bind row aggregation (this.bindAggregation would do nothing)
				Control.prototype.bindAggregation.call(this, 'rows', this._oRowBindingInfo);

				// triggers data loading for OData.
				// TODO: find a cleaner solution (when $count is not supported)
				if (this.getBinding("rows")) {
					this.getBinding("rows").getContexts(0, this.getBinding("rows").getLength());
				}
			}

			return oPromise;
		}

		return this._oDeferred.promise();
	};

	/**
	 * Generates the file content, triggers a download / save action and
	 * returns a jQuery Promise with the instance as context (this).<br>
	 * The promise will be resolved with the generated content
	 * as a string.
	 * <p><b>For information about browser support, see <code>sap.ui.core.util.File.save</code></b></p>
	 *
	 * @param {string} [sFileName] file name, defaults to 'data'
	 * @return {jQuery.Promise} Promise object
	 *
	 * @public
	 * @name sap.ui.core.util.Export#saveFile
	 * @function
	 */
	Export.prototype.saveFile = function(sFileName) {
		return this.generate().then(function(sContent) {
			var oExportType = this.getExportType();
			// Trigger the save action
			File.save(sContent, sFileName || "data", oExportType.getFileExtension(), oExportType.getMimeType(), oExportType.getCharset());
		});
	};

	return Export;
}, /* bExport= */ true);
