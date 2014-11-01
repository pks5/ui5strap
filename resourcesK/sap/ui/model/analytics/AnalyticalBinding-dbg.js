/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides class sap.ui.model.odata.ODataListBinding
sap.ui.define(['jquery.sap.global', 'sap/ui/model/TreeBinding', 'sap/ui/model/ChangeReason', 'sap/ui/model/Sorter', 'sap/ui/model/FilterOperator', './odata4analytics'],
	function(jQuery, TreeBinding, ChangeReason, Sorter, FilterOperator, odata4analytics) {
	"use strict";
	
	/**
	 * @class 
	 * Tree binding implementation for client models
	 *
	 * @param {sap.ui.model.Model} oModel
	 * @param {string} sPath the path pointing to the tree / array that should be bound
	 * @param {object} [oContext=null] the context object for this databinding (optional)
	 * @param {array} [aFilters=null] predefined filter/s contained in an array (optional)
	 * @param {object} [mParameters=null] additional model specific parameters (optional) 
	 * 
	 * @name sap.ui.model.analytics.AnalyticalBinding
	 * @extends sap.ui.model.TreeBinding
	 * @experimental This module is only for experimental use!
	 * @protected
	 */
	var AnalyticalBinding = TreeBinding.extend("sap.ui.model.analytics.AnalyticalBinding", /** @lends sap.ui.model.analytics.AnalyticalBinding.prototype */ {

			constructor : function(oModel, sPath, oContext, aSorters, aFilters, mParameters) {
				TreeBinding.call(this, oModel, sPath, oContext, aFilters, mParameters);

				// attribute members for addressing the requested entity set
				this.sEntitySetName = (mParameters && mParameters.entitySet) ? mParameters.entitySet : undefined; 
				// attribute members for maintaining aggregated OData requests
				this.bArtificalRootContext = false;
				this.aGlobalFilter = aFilters;
				this.aGlobalSorter = aSorters;
				this.aMaxAggregationLevel = [];
				this.aAggregationLevel = [];
				this.oPendingRequests = {};
				this.oPendingRequestHandle = [];
				this.oGroupedRequests = {};
				this.bUseBatchRequests = (mParameters && mParameters.useBatchRequests === true) ? true : false;
				this.bProvideTotalSize = (mParameters && mParameters.provideTotalResultSize === false) ? false : true;
				this.bProvideGrandTotals = (mParameters && mParameters.provideGrandTotals === false) ? false : true;
				this.aRequestQueue = [];

				// attribute members for maintaining loaded data; mapping from groupId to related information
				this.iTotalSize = -1;
				this.mKey = {}; // keys of loaded entities belonging to group with given ID
				this.mFinalLength = {}; // true iff all entities of group with given ID have been loaded (keys in mKey) 
				this.mLength = {}; // number of currently loaded entities 
				this.bNeedsUpdate = false;

				// attribute members for maintaining structure details requested by the binding consumer
				this.oAnalyticalQueryResult = this.oModel.getAnalyticalExtensions().findQueryResultByName(this._getEntitySet());
				this.aAnalyticalInfo = [];
				this.mAnalyticalInfoByProperty = {};

				this.updateAnalyticalInfo(mParameters == undefined ? [] : mParameters.analyticalInfo);
			}

		});

	/* *******************************
	 *** Public methods
	 ********************************/

	// called for initial population and on every subsequent change of grouping structure or filter conditions
	AnalyticalBinding.prototype.getRootContexts = function(mParameters) {
		var iAutoExpandGroupsToLevel = (mParameters && mParameters.numberOfExpandedLevels ? mParameters.numberOfExpandedLevels + 1 : 1);
// 		this._trace_enter("API", "getRootContexts", "expand to level=" + iAutoExpandGroupsToLevel, mParameters); // DISABLED FOR PRODUCTION 
		var aRootContext = null;
		
		var sRootContextGroupMembersRequestId = this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: null});
		
		// if the root context is artificial (i.e. no grand total requested), then delay its return until all other related requests have been completed
		if (this.bArtificalRootContext 
				&& !this._cleanupGroupingForCompletedRequest(sRootContextGroupMembersRequestId)) {
// 			this._trace_leave("API", "getRootContexts", "delay until related requests have been completed"); // DISABLED FOR PRODUCTION 			
			return null;
		}
		
		if (iAutoExpandGroupsToLevel <= 1) {
			aRootContext = this._getContextsForParentContext(null);
			if (iAutoExpandGroupsToLevel == 1) {
				this._considerRequestGrouping([ sRootContextGroupMembersRequestId, 
				                                this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: "/"}) ]);
				this.getNodeContexts(this.getModel().getContext("/"), {
					startIndex : mParameters.startIndex,
					length : mParameters.length,
					threshold : mParameters.threshold,
					level : 0,
					numberOfExpandedLevels : 0
				});
			}
		}
		else {
			aRootContext = this._getContextsForParentContext(null);
			var aRequestId = this._prepareGroupMembersAutoExpansionRequestIds("/", mParameters.numberOfExpandedLevels);
			aRequestId.push(sRootContextGroupMembersRequestId);
			this._considerRequestGrouping(aRequestId);
			this.getNodeContexts(this.getModel().getContext("/"), {
				startIndex : mParameters.startIndex,
				length : mParameters.length,
				threshold : mParameters.threshold,
				level : 0,
				numberOfExpandedLevels : mParameters.numberOfExpandedLevels
			});
/*			jQuery.sap.log.fatal("not yet implemented: number of initially expanded levels may be 0 or 1, but not "
					+ mParameters.numberOfExpandedLevels);
*/								
		}
		if (aRootContext.length > 1)
			jQuery.sap.log.fatal("assertion failed: grand total represented by a single entry");
// 		this._trace_leave("API", "getRootContexts", "aRootContext.length=" + aRootContext.length, aRootContext); // DISABLED FOR PRODUCTION 
		return aRootContext;		
	};
	
	AnalyticalBinding.prototype.getNodeContexts = function(oContext, mParameters) {
// 		this._trace_enter("API", "getNodeContexts", "groupId=" + this._getGroupIdFromContext(oContext), mParameters); // DISABLED FOR PRODUCTION 
		var iStartIndex, iLength, iThreshold, iLevel, iNumberOfExpandedLevels;
		if (typeof mParameters == "object") {
			iStartIndex = mParameters.startIndex;
			iLength = mParameters.length;
			iThreshold = mParameters.threshold;
			iLevel = mParameters.level;
			iNumberOfExpandedLevels = mParameters.numberOfExpandedLevels;
		} else { // due to compatibility; can be removed if table is adapted
			iStartIndex = arguments[1];
			iLength = arguments[2];
			iThreshold = arguments[3];
			iLevel = arguments[4];
			iNumberOfExpandedLevels = arguments[5];
		}
	
		var aContext = this._getContextsForParentContext(oContext, iStartIndex, iLength, iThreshold, iLevel, iNumberOfExpandedLevels);
// 		this._trace_leave("API", "getNodeContexts", "aContext.length=" + aContext.length, aContext); // DISABLED FOR PRODUCTION 
		return aContext;
	};
	
	AnalyticalBinding.prototype.ContextsAvailabilityStatus = { ALL: 2, SOME: 1, NONE: 0 };
	AnalyticalBinding.prototype.hasAvailableNodeContexts = function(oContext, iLevel) {
		var sGroupId = this._getGroupIdFromContext(oContext, iLevel);
		if (this.mKey[sGroupId] != undefined)
			if (this.mFinalLength[sGroupId] == true) 
				return AnalyticalBinding.prototype.ContextsAvailabilityStatus.ALL;
			else
				return AnalyticalBinding.prototype.ContextsAvailabilityStatus.SOME;
		else
			return AnalyticalBinding.prototype.ContextsAvailabilityStatus.NONE;
	};
	
	AnalyticalBinding.prototype.getGroupSize = function(oContext, iLevel) {
		if (oContext === undefined) return 0; // API robustness
		var sGroupId = this._getGroupIdFromContext(oContext, iLevel);
	
		return this.mFinalLength[sGroupId] ? this.mLength[sGroupId] : -1;
	};
	
	AnalyticalBinding.prototype.getTotalSize = function() {
		if (! this.bProvideTotalSize)
			jQuery.sap.log.fatal("total size of result explicitly turned off, but getter invoked");
		return this.iTotalSize;
	};
	
	AnalyticalBinding.prototype.hasChildren = function(oContext, mParameters) {
	
		if (oContext === undefined) return false; // API robustness
		if (oContext == null) return true;
		var iContextLevel = mParameters.level;
		if (iContextLevel == 0) return true;
	
		if (this.aAggregationLevel.length < iContextLevel) return false;
		// children exist if it is not the rightmost grouped column or there is at least one further level with an ungrouped groupable columns.
		return this.aMaxAggregationLevel.indexOf(this.aAggregationLevel[iContextLevel - 1]) < this.aMaxAggregationLevel.length - 1;
	};
	
	AnalyticalBinding.prototype.hasMeasures = function() {
		var bHasMeasures = false;
		for(var p in this.oMeasureDetailsSet) {
			bHasMeasures = true;
			break;
		}
		return bHasMeasures;
	};
	
	AnalyticalBinding.prototype.hasGrandTotalDisplayed = function() {
		return this.bProvideGrandTotals;
	};
	
	/**
	 * @public
	 * @function
	 * @name AnalyticalBinding.prototype.getFilterablePropertyNames
	 * @returns {Array} The names of the filterable properties in the given entity set.
	 */
	AnalyticalBinding.prototype.getFilterablePropertyNames = function() {
		return this.oAnalyticalQueryResult.getEntityType().getFilterablePropertyNames();
	};
	
	/**
	 * @public
	 * @function
	 * @name AnalyticalBinding.prototype.getPropertyLabel
	 * @returns {string} The label maintained for the given property.
	 */
	AnalyticalBinding.prototype.getPropertyLabel = function(sPropertyName) {
		return this.oAnalyticalQueryResult.getEntityType().getLabelOfProperty(sPropertyName);
	};
	
	/**
	 * Filters the tree according to the filter definitions.
	 * 
	 * @public
	 * @function
	 * @name AnalyticalBinding.prototype.filter
	 * @param {sap.ui.model.Filter[]}
	 *            aFilter Array of sap.ui.model.Filter objects
	 * @return {sap.ui.model.ListBinding} returns <code>this</code> to facilitate method chaining
	 */
	AnalyticalBinding.prototype.filter = function(aFilter) {
		
		this.aPropertyFilter = aFilter && aFilter.length > 0 ? aFilter : null;
	
		this.iTotalSize = -1; // invalidate last row counter

		this._abortAllPendingRequests();
				
		this.resetData();
		this._fireRefresh({
			reason : ChangeReason.Filter
		});		
		
		return this;
	};
	
	/**
	 * Sorts the tree.
	 * 
	 * @public
	 * @function
	 * @name AnalyticalBinding.prototype.sort
	 * @param {sap.ui.model.Sorter|sap.ui.model.Sorter[]}
	 *            aSorter the Sorter or an array of sorter objects object which define the sort order
	 * @return {sap.ui.model.ListBinding} returns <code>this</code> to facilitate method chaining
	 */
	AnalyticalBinding.prototype.sort = function(aSorter) {
	
		if (aSorter instanceof Sorter) {
			aSorter = [ aSorter ];
		}
	
		this.aPropertySorter = aSorter;

		this._abortAllPendingRequests();
		
		this._fireRefresh({
			reason : ChangeReason.Sort
		});

		return this;
	};
	
	AnalyticalBinding.prototype.getGroupName = function(oContext, iLevel) {
		if (oContext === undefined) return ""; // API robustness
	
		var sGroupProperty = this.aAggregationLevel[iLevel - 1],
			oDimension = this.oAnalyticalQueryResult.findDimensionByPropertyName(sGroupProperty),
			fValueFormatter = this.mAnalyticalInfoByProperty[sGroupProperty].formatter,
			sPropertyValue = oContext.getProperty(sGroupProperty),
			sDisplayPropertyValue = sPropertyValue == null ? "" : sPropertyValue,
			sFormattedPropertyValue = fValueFormatter ? fValueFormatter(sDisplayPropertyValue) : sDisplayPropertyValue,
			sGroupName = ((oDimension.getLabelText()) ? oDimension.getLabelText() + ': ' : '') + sFormattedPropertyValue,
			oTextProperty = null;
	
		if (oDimension && this.oDimensionDetailsSet[sGroupProperty].textPropertyName) {
			oTextProperty = oDimension.getTextProperty();
		}
		if (oTextProperty) {
			var sTextProperty = oDimension.getTextProperty().name,
				fTextValueFormatter = this.mAnalyticalInfoByProperty[sGroupProperty].formatter,
				sTextPropertyValue = oContext.getProperty(sTextProperty),
				sDisplayTextPropertyValue = sTextPropertyValue == null ? "" : sTextPropertyValue,
				sFormattedTextPropertyValue = fTextValueFormatter ? fTextValueFormatter(sDisplayTextPropertyValue) : sDisplayTextPropertyValue;
			if (sFormattedTextPropertyValue) {
				sGroupName += ' - ' + sFormattedTextPropertyValue;
			}
		}
		// include size information in the group name
		/*var iGroupSize = this.getGroupSize(oContext, iLevel);
		if (iGroupSize > -1) {
			sGroupName += ' (' + iGroupSize + ')';
		}*/
		return sGroupName;
	};
	
	AnalyticalBinding.prototype.updateAnalyticalInfo = function(aColumns) {
		// parameter is an array with elements whose structure is defined by sap.ui.analytics.model.AnalyticalTable.prototype._getColumnInformation()
		var oPreviousDimensionDetailsSet = this.oDimensionDetailsSet;
		this.mAnalyticalInfoByProperty = new Object(); // enable associative access to analytical update information
		this.aMaxAggregationLevel = new Array(); // names of all dimensions referenced by any column
		this.aAggregationLevel = new Array(); // names of all currently grouped dimensions
		this.aMeasureName = new Array(); // names of all measures referenced by any column
		this.iAnalyticalInfoVersionNumber = (this.iAnalyticalInfoVersionNumber === undefined ? 1
				: (this.iAnalyticalInfoVersionNumber > 999 ? 1 : this.iAnalyticalInfoVersionNumber + 1));

		this.oMeasureDetailsSet = new Object(); // properties with structure {rawValueProperty,unitProperty,formattedValueProperty}
		this.oDimensionDetailsSet = new Object(); // properties with structure {name,keyProperty,textProperty,aAttributeName}
	
		// process column settings for dimensions and measures part of the result or visible
		for (var i = 0; i < aColumns.length; i++) {
			// determine requested aggregation level from columns representing dimension-related properties
			var oDimension = this.oAnalyticalQueryResult.findDimensionByPropertyName(aColumns[i].name);
			if (oDimension && (aColumns[i].inResult == true || aColumns[i].visible == true)) {
				aColumns[i].dimensionPropertyName = oDimension.getName();
				var oDimensionDetails = this.oDimensionDetailsSet[oDimension.getName()];
				if (!oDimensionDetails) {
					oDimensionDetails = new Object();
					oDimensionDetails.name = oDimension.getName();
					oDimensionDetails.aAttributeName = new Array();
					oDimensionDetails.grouped = false;
					this.oDimensionDetailsSet[oDimension.getName()] = oDimensionDetails;
					this.aMaxAggregationLevel.push(oDimensionDetails.name);
					if (aColumns[i].grouped == true) this.aAggregationLevel.push(oDimensionDetails.name);
				}
				if (aColumns[i].grouped == true) oDimensionDetails.grouped = true;
				
				if (oDimension.getName() == aColumns[i].name) {
					oDimensionDetails.keyPropertyName = aColumns[i].name;
				}
				var oTextProperty = oDimension.getTextProperty();
				if (oTextProperty && oTextProperty.name == aColumns[i].name) {
					oDimensionDetails.textPropertyName = aColumns[i].name;
				}
				if (oDimension.findAttributeByName(aColumns[i].name)) {
					oDimensionDetails.aAttributeName.push(aColumns[i].name);
				}				
			}
	
			// determine necessary measure details from columns visualizing measure-related properties
			var oMeasure = this.oAnalyticalQueryResult.findMeasureByPropertyName(aColumns[i].name);
			if (oMeasure && (aColumns[i].inResult == true || aColumns[i].visible == true)) {
				aColumns[i].measurePropertyName = oMeasure.getName();
				var oMeasureDetails = this.oMeasureDetailsSet[oMeasure.getName()];
				if (!oMeasureDetails) {
					oMeasureDetails = new Object();
					oMeasureDetails.name = oMeasure.getName();
					this.oMeasureDetailsSet[oMeasure.getName()] = oMeasureDetails;
					this.aMeasureName.push(oMeasureDetails.name);
				}
				if (oMeasure.getRawValueProperty().name == aColumns[i].name) {
					oMeasureDetails.rawValuePropertyName = aColumns[i].name;
				}
				var oFormattedValueProperty = oMeasure.getFormattedValueProperty();
				if (oFormattedValueProperty && oFormattedValueProperty.name == aColumns[i].name) {
					oMeasureDetails.formattedValuePropertyName = aColumns[i].name;
				}
			}
			this.mAnalyticalInfoByProperty[aColumns[i].name] = aColumns[i];
		}
		// finalize measure information with unit properties also being part of the table
		var oMeasureDetails;
		for ( var measureName in this.oMeasureDetailsSet) {
			var oUnitProperty = this.oAnalyticalQueryResult.findMeasureByName(measureName).getUnitProperty();
			if (oUnitProperty)
				this.oMeasureDetailsSet[measureName].unitPropertyName = oUnitProperty.name;
		}

		// check if any dimension has been added or removed. If so, invalidate the total size
		var compileDimensionNames = function (oDimensionDetailsSet) {
			var aName = [];
			for (var oDimDetails in oDimensionDetailsSet)
				aName.push(oDimDetails.name);
			return aName.sort().join(";");
		};
		if (compileDimensionNames(oPreviousDimensionDetailsSet) != compileDimensionNames(this.oDimensionDetailsSet))
			this.iTotalSize = -1;
		
		// remember column settings for later reference
		this.aAnalyticalInfo = aColumns; 
		
		// reset attributes holding previously loaded data
		this.mFinalLength = {};
		this.mLength = {};
		this.mKey = {};
		this.mContexts = {};
		this.bNeedsUpdate = false;
	};

	AnalyticalBinding.prototype.getAnalyticalInfoForColumn = function(sColumnName) {
		return this.mAnalyticalInfoByProperty[sColumnName];
	};
	
	/**
	 * @public
	 * @function
	 * @name AnalyticalBinding.prototype.loadGroups
	 * @param {Object}
	 *            oGroupIdRanges Property names are group IDs to be loaded via the model. Property values are arrays of { startIndex, length,
	 *            threshold } describing the index ranges to be fetched.
	 */
	AnalyticalBinding.prototype.loadGroups = function(oGroupIdRanges) {
		var aGroupId = new Array();
		for ( var sGroupId in oGroupIdRanges) {
			aGroupId.push(sGroupId);
	
			// clean up existing loaded data for the given group ID
			delete this.mKey[sGroupId];
			delete this.mLength[sGroupId];
			delete this.mFinalLength[sGroupId];
			
			var aGroupIdRange = oGroupIdRanges[sGroupId];
	
			for (var i = 0; i < aGroupIdRange.length; i++) {
				var oGroupIdRange = aGroupIdRange[i];
				// force reload of every requested index range for the given group ID
				this._getContextsForParentGroupId(sGroupId, oGroupIdRange.startIndex, oGroupIdRange.length,
						oGroupIdRange.threshold);
			}
	
			var aRequestId = new Array();
			for (var i = -1, sGroupId; sGroupId = aGroupId[++i]; ) {
				aRequestId.push(this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: sGroupId}));
			}
			this._considerRequestGrouping(aRequestId);
		}
	};
	
	/**
	 * @function
	 * @name AnalyticalBinding.prototype.getAnalyticalQueryResult()
	 */
	AnalyticalBinding.prototype.getAnalyticalQueryResult = function() {
		return this.oAnalyticalQueryResult;
	};
	
	
	/********************************
	 *** Private section follows
	 ********************************/

	
	/**
	 * Enumeration of request types implemented for the analytical binding.
	 * Every type <T> is implemented with the two methods prepare<T>Request and process<T>Response, names in proper upper camel case notation.
	 * @private
	 */
	AnalyticalBinding._requestType = { 
			groupMembersQuery : 1, // members of a named group G identified by its path /G1/G2/G3/.../G/  
			totalSizeQuery : 2, // total number of entities in result matching all specified filter conditions 
			groupMembersAutoExpansionQuery : 3, // all members residing in a group or sub group w.r.t. a given group ID  
			levelMembersQuery : 4, // members of a given level 
			};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getContextsForParentContext
	 */
	AnalyticalBinding.prototype._getContextsForParentContext = function(oParentContext, iStartIndex, iLength,
			iThreshold, iLevel, iNumberOfExpandedLevels) {
		if (oParentContext === undefined) return []; // API robustness
		if (oParentContext && oParentContext.getPath() == "/artificialRootContent") {
			// special case for artificial root contexts: adjust context to point to the real path
			oParentContext = this.getModel().getContext("/");
		}
		var sParentGroupId = this._getGroupIdFromContext(oParentContext, iLevel);
		return this._getContextsForParentGroupId(sParentGroupId, iStartIndex, iLength, iThreshold, iNumberOfExpandedLevels);
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getContextsForParentContext
	 */
	AnalyticalBinding.prototype._getContextsForParentGroupId = function(sParentGroupId, iStartIndex, iLength,
			iThreshold, iNumberOfExpandedLevels) {
		if (sParentGroupId === undefined) return []; // API robustness
	
		//	Set default values if start index, threshold, length or number of expanded levels are not defined
		if (!iStartIndex) iStartIndex = 0;
	
		if (!iLength) iLength = this.oModel.iSizeLimit;
	
		if (this.mFinalLength[sParentGroupId] && this.mLength[sParentGroupId] < iLength)
			iLength = this.mLength[sParentGroupId];
	
		if (!iThreshold) iThreshold = 0;

		if (!iNumberOfExpandedLevels) iNumberOfExpandedLevels = 0;
	
		var aContext, bLoadContexts, oGroupSection, aAutoExpansionGroupHeaderPath, missingMemberCount;
		
		var bGroupLevelAutoExpansionIsActive = iNumberOfExpandedLevels > 0 && sParentGroupId != null;
		if (bGroupLevelAutoExpansionIsActive) {
			// reduced scope for initial delivery
			// TODO cleanup by checking data availability
			/* var iLevel = this._getGroupIdLevel(sParentGroupId);
			 * oGroupExpansionFirstMember = this._calculateRequiredGroupExpansion(sParentGroupId, iLevel, iStartIndex, iLength + iThreshold);
			 */
			aAutoExpansionGroupHeaderPath = []; // TODO not yet supported
			missingMemberCount = iLength + iThreshold;
			bLoadContexts = true;
			aContext = [];
		}
		else { // no automatic expansion of group levels
			aContext = this._getLoadedContextsForGroup(sParentGroupId, iStartIndex, iLength);
			oGroupSection = this._calculateRequiredGroupSection(sParentGroupId, iStartIndex, iLength, iThreshold, aContext);
			bLoadContexts = aContext.length != iLength
					&& !(this.mFinalLength[sParentGroupId] && aContext.length >= this.mLength[sParentGroupId] - iStartIndex);			
		}
	
		if (!bLoadContexts)
			// all data available so no request will be issued that might be related to some group of requests
			this._cleanupGroupingForCompletedRequest(this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: sParentGroupId}));
	
		// check if metadata are already available
		if (this.oModel.getServiceMetadata()) {
			// If rows are missing send a request
			if (bLoadContexts && !this._isRequestPending(this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: sParentGroupId}))) {
				var bNeedTotalSize = this.bProvideTotalSize && this.iTotalSize == -1 && !this._isRequestPending(this._getRequestId(AnalyticalBinding._requestType.totalSizeQuery));
				if (this.bUseBatchRequests) {
					var aMembersRequestId;
					if (bGroupLevelAutoExpansionIsActive) {
						this.aRequestQueue.push([ AnalyticalBinding._requestType.groupMembersAutoExpansionQuery, sParentGroupId, aAutoExpansionGroupHeaderPath, missingMemberCount, iNumberOfExpandedLevels ]);
						aMembersRequestId = this._prepareGroupMembersAutoExpansionRequestIds();
					}
					else {
						this.aRequestQueue.push([ AnalyticalBinding._requestType.groupMembersQuery, sParentGroupId, oGroupSection.startIndex, oGroupSection.length ]);
						aMembersRequestId = [ this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: sParentGroupId}) ];
					}
					if (bNeedTotalSize) {
						aMembersRequestId.push(this._getRequestId(AnalyticalBinding._requestType.totalSizeQuery));
						this._considerRequestGrouping(aMembersRequestId);						
						this.aRequestQueue.push([ AnalyticalBinding._requestType.totalSizeQuery ]);
					}
					jQuery.sap.delayedCall(0, this, AnalyticalBinding.prototype._processRequestQueue);
				}
				else {
					var oMemberRequestDetails;
					var aMembersRequestId;
					if (bGroupLevelAutoExpansionIsActive) {
						oMemberRequestDetails = this._prepareGroupMembersAutoExpansionQueryRequest(AnalyticalBinding._requestType.groupMembersAutoExpansionQuery, sParentGroupId, aAutoExpansionGroupHeaderPath, missingMemberCount, iNumberOfExpandedLevels);
						aMembersRequestId = oMemberRequestDetails.aRequestId;
					}
					else {
						oMemberRequestDetails = this._prepareGroupMembersQueryRequest(AnalyticalBinding._requestType.groupMembersQuery, sParentGroupId, oGroupSection.startIndex, oGroupSection.length);
						aMembersRequestId = [ oMemberRequestDetails.sRequestId ];
					}
					this._executeQueryRequest(oMemberRequestDetails);
					if (bNeedTotalSize && !oMemberRequestDetails.bIsFlatListRequest) {
						aMembersRequestId.push(this._getRequestId(AnalyticalBinding._requestType.totalSizeQuery));						
						this._considerRequestGrouping(aMembersRequestId);						
						this._executeQueryRequest(this._prepareTotalSizeQueryRequest(AnalyticalBinding._requestType.totalSizeQuery));
					}
				}
				if (sParentGroupId == null) this._abortAllPendingRequests(); // root node is requested, so discard all not received responses, because the entire table must be set up from scratch 
			}
		}
	
		return aContext;
	};
	
	AnalyticalBinding.prototype._processRequestQueue = function() {
		if (this.aRequestQueue.length == 0) return;
	
		var aRequestDetails = [];
		var bFoundFlatListRequest = false;

		// create request objects: process group member requests first to detect flat list requests 
		for (var i = -1, aRequestQueueEntry; aRequestQueueEntry = this.aRequestQueue[++i];) {
			if (aRequestQueueEntry[0] == AnalyticalBinding._requestType.groupMembersQuery) { // request type is at array index 0
				var oRequestDetails = AnalyticalBinding.prototype._prepareGroupMembersQueryRequest.apply(this, aRequestQueueEntry);
				bFoundFlatListRequest = bFoundFlatListRequest || oRequestDetails.bIsFlatListRequest;
				aRequestDetails.push(oRequestDetails);
			}
		}

		// create request objects for all other request types 
		for (var i = -1, aRequestQueueEntry; aRequestQueueEntry = this.aRequestQueue[++i];) {
			var oRequestDetails = null;
			switch (aRequestQueueEntry[0]) { // different request types
			case AnalyticalBinding._requestType.groupMembersQuery:
				continue; // handled above
			case AnalyticalBinding._requestType.totalSizeQuery:
				if (!bFoundFlatListRequest)
					oRequestDetails = AnalyticalBinding.prototype._prepareTotalSizeQueryRequest.apply(this, aRequestQueueEntry);
				break;
			default: 
				jQuery.sap.log.fatal("unhandled request type " + this.aRequestQueue[i][0]);
				continue;
			}
			if (oRequestDetails) aRequestDetails.push(oRequestDetails);
		}
	
		// execute them either directly in case of a single request or via a batch request
	
		if (aRequestDetails.length > 1) this._executeBatchRequest(aRequestDetails);
		else this._executeQueryRequest(aRequestDetails[0]);
	
		// clear queue
		this.aRequestQueue = [];
	};
	
	/** *************************************************************** */
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._prepareGroupMembersQueryRequest
	 */
	AnalyticalBinding.prototype._prepareGroupMembersQueryRequest = function(iRequestType, sGroupId, iStartIndex, iLength) {
		var aGroupId = [];
		var iCurrentAnalyticalInfoVersion = this.iAnalyticalInfoVersionNumber;
	
		// (0) set up analytical OData request object
		var oAnalyticalQueryRequest = new odata4analytics.QueryResultRequest(this.oAnalyticalQueryResult);
		oAnalyticalQueryRequest.setResourcePath(this._getResourcePath());
	
		// (1) analyze aggregation level of sGroupId
	
		// indexes to elements of this.aMaxAggregationLevel marking begin and end of the requested child level
		var iChildGroupFromLevel = 0, iChildGroupToLevel = -1;
		if (sGroupId) {
			aGroupId = this._getGroupIdComponents(sGroupId);
			iChildGroupFromLevel = iChildGroupToLevel = aGroupId.length;
	
			var iUngroupedParentLevelCount = 0;
			// determine offset for child level (depends on grouped column property of higher aggregation levels)
			// Ex: Assume aMaxAggregationLevel with (G=grouped,U=ungrouped): [ G1 U1 U2 G2 U3 U4 G3 F5 F6 ... ]
			// For sGroupId = "G1/G2", initial iChildGroupFromLevel is 2. The following loop will increment it to 4
			// and consequently point to U3
			for (var i = 0, iLevel = 0; i < iChildGroupFromLevel; iLevel++) {
				if (this.oDimensionDetailsSet[this.aMaxAggregationLevel[iLevel]].grouped == false)
					++iUngroupedParentLevelCount;
				else
					++i;
			}
			// adjust child levels by number of ungrouped parent levels!
			iChildGroupFromLevel = iChildGroupToLevel = iChildGroupFromLevel + iUngroupedParentLevelCount;
	
			// determine index range for aggregation levels included in child level
			// (rule: take all lower levels up to and including the first grouped level; G3 in above example
			if (this.aMaxAggregationLevel.length > 0) {
				while (this.oDimensionDetailsSet[this.aMaxAggregationLevel[iChildGroupToLevel]].grouped == false)
					if (++iChildGroupToLevel == this.aMaxAggregationLevel.length) break;
			}
		}
	
		// (2) set aggregation level for child nodes
		var aAggregationLevel = this.aMaxAggregationLevel.slice(0, iChildGroupToLevel + 1);
		oAnalyticalQueryRequest.setAggregationLevel(aAggregationLevel);
		for (var i = 0; i < aAggregationLevel.length; i++) {
			var oDimensionDetails = this.oDimensionDetailsSet[aAggregationLevel[i]];
			var bIncludeKey = (oDimensionDetails.keyPropertyName != undefined);
			// as we combine the key and text in the group header we also need the text! 
			var bIncludeText = true; // (oDimensionDetails.textPropertyName != undefined);
			oAnalyticalQueryRequest.includeDimensionKeyTextAttributes(oDimensionDetails.name, // bIncludeKey: No, always needed!
			true, bIncludeText, oDimensionDetails.aAttributeName);
		}
	
		// (3) set filter
		var oFilterExpression = oAnalyticalQueryRequest.getFilterExpression();
		oFilterExpression.clear();
		if (this.aGlobalFilter) oFilterExpression.addUI5FilterConditions(this.aGlobalFilter);
		if (this.aPropertyFilter) oFilterExpression.addUI5FilterConditions(this.aPropertyFilter);
	
		if (iChildGroupFromLevel >= 1) {
			for (var i = 0, l = aGroupId.length; i < l; i++) {
				oFilterExpression.addCondition(this.aAggregationLevel[i], FilterOperator.EQ, aGroupId[i]);
			}
		}
	
		// (4) determine if the sub groups will effectively represent leafs (relevant for un-"total"ed columns, see below)
		var bIsLeafGroupsRequest = !(this.aMaxAggregationLevel.length - iChildGroupToLevel - 1 > 0);
	
		// (5) set measures as requested per column
		var bIncludeRawValue;
		var bIncludeFormattedValue;
		var bIncludeUnitProperty;
		var oMeasureDetails;
	
		var aSelectedUnitPropertyName = new Array();
	
		if (sGroupId != null || this.bProvideGrandTotals) {
			// select measures if the requested group is not the root context i.e. the grand totals row, or grand totals shall be determined 
			oAnalyticalQueryRequest.setMeasures(this.aMeasureName);
	
			for ( var sMeasureName in this.oMeasureDetailsSet) {
				oMeasureDetails = this.oMeasureDetailsSet[sMeasureName];
				if (!bIsLeafGroupsRequest && this.mAnalyticalInfoByProperty[sMeasureName].total == false) {
					bIncludeRawValue = false;
					bIncludeFormattedValue = false;
					bIncludeUnitProperty = false;
				} else {
					bIncludeRawValue = (oMeasureDetails.rawValuePropertyName != undefined);
					bIncludeFormattedValue = (oMeasureDetails.formattedValuePropertyName != undefined);
					bIncludeUnitProperty = (oMeasureDetails.unitPropertyName != undefined);
					if (bIncludeUnitProperty) {
						// remember unit property together with using measure raw value property for response analysis in success handler
						if (aSelectedUnitPropertyName.indexOf(oMeasureDetails.unitPropertyName) == -1) {
							aSelectedUnitPropertyName.push(oMeasureDetails.unitPropertyName);
						}
					}
				}
				oAnalyticalQueryRequest.includeMeasureRawFormattedValueUnit(oMeasureDetails.name, bIncludeRawValue,
						bIncludeFormattedValue, bIncludeUnitProperty);
			}
			// exclude those unit properties from the selected that are included in the current aggregation level
			for ( var i in aAggregationLevel) {
				var iMatchingIndex;
				if ((iMatchingIndex = aSelectedUnitPropertyName.indexOf(aAggregationLevel[i])) != -1)
					aSelectedUnitPropertyName.splice(iMatchingIndex, 1);
			}
		}
	
		// (6) set sort order (for all levels but leafs)
		var oSorter = oAnalyticalQueryRequest.getSortExpression();
		oSorter.clear();
		if (!bIsLeafGroupsRequest) {
			for ( var i in aAggregationLevel) {
				var sSortOrder = odata4analytics.SortOrder.Ascending;
				if (this.mAnalyticalInfoByProperty[aAggregationLevel[i]].sorted)
					switch (this.mAnalyticalInfoByProperty[aAggregationLevel[i]].sortOrder) {
					case sap.ui.table.SortOrder.Ascending:
						sSortOrder = odata4analytics.SortOrder.Ascending;
						break;
					case sap.ui.table.SortOrder.Descending:
						sSortOrder = odata4analytics.SortOrder.Descending;
						break;
					}
				oSorter.addSorter(aAggregationLevel[i], sSortOrder);
			}
		}
		// additionally apply sorters that have been specified external
		if (this.aGlobalSorter) this._applyUI5SorterToSortExpression(this.aGlobalSorter, oSorter);
		if (this.aPropertySorter) this._applyUI5SorterToSortExpression(this.aPropertySorter, oSorter);		
	
		// (7) set result page boundaries
		if (iLength == 0) 
			jQuery.sap.log.fatal("unhandled case: load 0 entities of sub group");
		oAnalyticalQueryRequest.setResultPageBoundaries(iStartIndex + 1, iStartIndex + iLength);
	
		// (8) request result entity count
		oAnalyticalQueryRequest.setRequestOptions(null, !this.mFinalLength[sGroupId]);
	
		return {
			iRequestType : iRequestType,
			sRequestId : this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: sGroupId}),
			oAnalyticalQueryRequest : oAnalyticalQueryRequest,
			sGroupId : sGroupId,
			aSelectedUnitPropertyName : aSelectedUnitPropertyName,
			aAggregationLevel : aAggregationLevel,
			bIsFlatListRequest : bIsLeafGroupsRequest && iChildGroupFromLevel == 0,
			iStartIndex : iStartIndex,
			iLength : iLength
		};
	};

	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._prepareTotalSizeQueryRequest
	 */
	AnalyticalBinding.prototype._prepareTotalSizeQueryRequest = function(iRequestType) {
		var iCurrentAnalyticalInfoVersion = this.iAnalyticalInfoVersionNumber;
	
		// (0) set up analytical OData request object
		var oAnalyticalQueryRequest = new odata4analytics.QueryResultRequest(this.oAnalyticalQueryResult);
		oAnalyticalQueryRequest.setResourcePath(this._getResourcePath());
	
		// (1) set aggregation level
		oAnalyticalQueryRequest.setAggregationLevel(this.aMaxAggregationLevel);
		oAnalyticalQueryRequest.setMeasures([]);

		// (2) set filter
		var oFilterExpression = oAnalyticalQueryRequest.getFilterExpression();
		oFilterExpression.clear();
		if (this.aGlobalFilter) oFilterExpression.addUI5FilterConditions(this.aGlobalFilter);
		if (this.aPropertyFilter) oFilterExpression.addUI5FilterConditions(this.aPropertyFilter);

		// (2) fetch almost no data
		oAnalyticalQueryRequest.setResultPageBoundaries(1, 1);

		// (3) request result entity count
		oAnalyticalQueryRequest.setRequestOptions(null, true);
		
		return {
			iRequestType : iRequestType,
			sRequestId : this._getRequestId(AnalyticalBinding._requestType.totalSizeQuery),
			oAnalyticalQueryRequest : oAnalyticalQueryRequest
		};		
	};


	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._prepareGroupMembersAutoExpansionQueryRequest
	 */
	AnalyticalBinding.prototype._prepareGroupMembersAutoExpansionQueryRequest = function(iRequestType, sGroupId, aAutoExpansionGroupHeaderPath, iLength, iNumberOfExpandedLevels) {
		// local helper function for requesting members of a given level (across groups) - copied from _prepareGroupMembersQueryRequest & adapted  
		var prepareLevelMembersQueryRequest = function(iRequestType, iLevel, aGroupContextFilter, iLength) {
			var aGroupId = [];
			var iCurrentAnalyticalInfoVersion = that.iAnalyticalInfoVersionNumber;
		
			// (0) set up analytical OData request object
			var oAnalyticalQueryRequest = new odata4analytics.QueryResultRequest(that.oAnalyticalQueryResult);
			oAnalyticalQueryRequest.setResourcePath(that._getResourcePath());
		
			// (1) set aggregation level for child nodes
			var aAggregationLevel = that.aAggregationLevel.slice(0, iLevel);
			oAnalyticalQueryRequest.setAggregationLevel(aAggregationLevel);
			for (var i = 0; i < aAggregationLevel.length; i++) {
				var oDimensionDetails = that.oDimensionDetailsSet[aAggregationLevel[i]];
				var bIncludeKey = (oDimensionDetails.keyPropertyName != undefined);
				var bIncludeText = (oDimensionDetails.textPropertyName != undefined);
				oAnalyticalQueryRequest.includeDimensionKeyTextAttributes(oDimensionDetails.name, // bIncludeKey: No, always needed!
				true, bIncludeText, oDimensionDetails.aAttributeName);
			}
		
			// (3) set filter
			var oFilterExpression = oAnalyticalQueryRequest.getFilterExpression();
			oFilterExpression.clear();
			if (that.aGlobalFilter) oFilterExpression.addUI5FilterConditions(that.aGlobalFilter);
			if (that.aPropertyFilter) oFilterExpression.addUI5FilterConditions(that.aPropertyFilter);
			if (that.aPropertyFilter) oFilterExpression.addUI5FilterConditions(that.aPropertyFilter);
			oFilterExpression.addUI5FilterConditions(aGroupContextFilter);

			var iStartIndex = 0;
			
			// (4) determine if the sub groups will effectively represent leafs (relevant for un-"total"ed columns, see below)
			var bIsLeafGroupsRequest = iLevel - 1 == that.aAggregationLevel.length;
		
			// (5) set measures as requested per column
			var bIncludeRawValue;
			var bIncludeFormattedValue;
			var bIncludeUnitProperty;
			var oMeasureDetails;
		
			var aSelectedUnitPropertyName = new Array();
		
			// select measures if the requested group is not the root context i.e. the grand totals row, or grand totals shall be determined 
			oAnalyticalQueryRequest.setMeasures(that.aMeasureName);
		
			for ( var sMeasureName in that.oMeasureDetailsSet) {
				oMeasureDetails = that.oMeasureDetailsSet[sMeasureName];
				if (!bIsLeafGroupsRequest && that.mAnalyticalInfoByProperty[sMeasureName].total == false) {
					bIncludeRawValue = false;
					bIncludeFormattedValue = false;
					bIncludeUnitProperty = false;
				} else {
					bIncludeRawValue = (oMeasureDetails.rawValuePropertyName != undefined);
					bIncludeFormattedValue = (oMeasureDetails.formattedValuePropertyName != undefined);
					bIncludeUnitProperty = (oMeasureDetails.unitPropertyName != undefined);
					if (bIncludeUnitProperty) {
						// remember unit property together with using measure raw value property for response analysis in success handler
						if (aSelectedUnitPropertyName.indexOf(oMeasureDetails.unitPropertyName) == -1) {
							aSelectedUnitPropertyName.push(oMeasureDetails.unitPropertyName);
						}
					}
				}
				oAnalyticalQueryRequest.includeMeasureRawFormattedValueUnit(oMeasureDetails.name, bIncludeRawValue,
						bIncludeFormattedValue, bIncludeUnitProperty);
			}
			// exclude those unit properties from the selected that are included in the current aggregation level
			for ( var i in aAggregationLevel) {
				var iMatchingIndex;
				if ((iMatchingIndex = aSelectedUnitPropertyName.indexOf(aAggregationLevel[i])) != -1)
					aSelectedUnitPropertyName.splice(iMatchingIndex, 1);
			}
		
			// (6) set sort order (for all levels but leafs)
			var oSorter = oAnalyticalQueryRequest.getSortExpression();
			oSorter.clear();
			if (!bIsLeafGroupsRequest) {
				for ( var i in aAggregationLevel) {
					var sSortOrder = odata4analytics.SortOrder.Ascending;
					if (that.mAnalyticalInfoByProperty[aAggregationLevel[i]].sorted)
						switch (that.mAnalyticalInfoByProperty[aAggregationLevel[i]].sortOrder) {
						case sap.ui.table.SortOrder.Ascending:
							sSortOrder = odata4analytics.SortOrder.Ascending;
							break;
						case sap.ui.table.SortOrder.Descending:
							sSortOrder = odata4analytics.SortOrder.Descending;
							break;
						}
					oSorter.addSorter(aAggregationLevel[i], sSortOrder);
				}
			}
			// additionally apply sorters that have been specified external
			if (that.aGlobalSorter) that._applyUI5SorterToSortExpression(that.aGlobalSorter, oSorter);
			if (that.aPropertySorter) that._applyUI5SorterToSortExpression(that.aPropertySorter, oSorter);		
		
			// (7) set result page boundaries
			if (iLength == 0) 
				jQuery.sap.log.fatal("unhandled case: load 0 entities of sub group");
			oAnalyticalQueryRequest.setResultPageBoundaries(iStartIndex + 1, iStartIndex + iLength);
		
			return {
				iRequestType : iRequestType,
				sRequestId : that._getRequestId(AnalyticalBinding._requestType.levelMembersQuery, { level: iLevel }),
				oAnalyticalQueryRequest : oAnalyticalQueryRequest,
				iLevel : iLevel,
				aSelectedUnitPropertyName : aSelectedUnitPropertyName,
				aAggregationLevel : aAggregationLevel,
				bIsFlatListRequest : bIsLeafGroupsRequest,
				iStartIndex : iStartIndex,
				iLength : iLength
			};
		};

		// function implementation starts here
		if (aAutoExpansionGroupHeaderPath.length != 0) { // TODO
			jQuery.sap.log.fatal("group header paths not supported yet");
			return;
		}
		var iMinRequiredLevel = this._getGroupIdLevel(sGroupId) + 1;
		var iAutoExpandGroupsToLevel = iMinRequiredLevel + iNumberOfExpandedLevels;
		var aGroupMembersAutoExpansionRequestDetails = [];
		var aRequestId = [];
		var that = this;
		
		// construct filter condition for addressing the selected group
		var aFilter = [];
		var aGroupIdComponent = this._getGroupIdComponents(sGroupId);
		for (var i = 0; i < aGroupIdComponent.length; i++)
			aFilter.push(new sap.ui.model.Filter(this.aAggregationLevel[i], sap.ui.model.FilterOperator.EQ, aGroupIdComponent[i]));
		
		for (var iLevel = iMinRequiredLevel; iLevel <= iAutoExpandGroupsToLevel; iLevel++) {
			var iLengthForLevel = Math.ceil((iLength - iLevel)/(iAutoExpandGroupsToLevel - iLevel + 1));
			var oLevelMembersRequestDetails = prepareLevelMembersQueryRequest(AnalyticalBinding._requestType.levelMembersQuery, iLevel, aFilter, iLengthForLevel);
			aGroupMembersAutoExpansionRequestDetails.push(oLevelMembersRequestDetails);
			aRequestId.push(this._getRequestId(AnalyticalBinding._requestType.levelMembersQuery, { level: iLevel }))
		}
		
		return {
			iRequestType : iRequestType,
			aRequestId : aRequestId,
			aGroupMembersAutoExpansionRequestDetails : aGroupMembersAutoExpansionRequestDetails,
			sGroupId : sGroupId,
			iLength : iLength
		};		
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._prepareGroupMembersAutoExpansionQueryRequest
	 */
	AnalyticalBinding.prototype._prepareGroupMembersAutoExpansionRequestIds = function(sGroupId, iNumberOfExpandedLevels) {
		// intention of this function is to encapsulate the knowledge about steps to be taken
		// for creating request IDs for all relevant requests
		var iMinRequiredLevel = this._getGroupIdLevel(sGroupId) + 1;
		var iAutoExpandGroupsToLevel = iMinRequiredLevel + iNumberOfExpandedLevels;
		var aRequestId = [];
		for (var iLevel = 1; iLevel <= iAutoExpandGroupsToLevel; iLevel++) {
			aRequestId.push(this._getRequestId(AnalyticalBinding._requestType.levelMembersQuery, { level: iLevel }))
		}
		return aRequestId;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getQueryODataRequestOptions
	 */
	AnalyticalBinding.prototype._getQueryODataRequestOptions = function(oAnalyticalQueryRequest) {
		var sSelect = oAnalyticalQueryRequest.getURIQueryOptionValue("$select");
		var sFilter = oAnalyticalQueryRequest.getURIQueryOptionValue("$filter");
		var sOrderBy = oAnalyticalQueryRequest.getURIQueryOptionValue("$orderby");
		var sSkip = oAnalyticalQueryRequest.getURIQueryOptionValue("$skip");
		var sTop = oAnalyticalQueryRequest.getURIQueryOptionValue("$top");
		var sInlineCount = oAnalyticalQueryRequest.getURIQueryOptionValue("$inlinecount");
	
		if (this.mParameters["filter"]) sFilter += "and (" + this.mParameters["filter"] + ")";
	
		// construct OData request option parameters
		var aParam = [];
		if (sSelect) aParam.push("$select=" + sSelect);
		if (sFilter) aParam.push("$filter=" + sFilter);
		if (sOrderBy) aParam.push("$orderby=" + sOrderBy);
		if (sSkip) aParam.push("$skip=" + sSkip);
		if (sTop) aParam.push("$top=" + sTop);
		if (sInlineCount) aParam.push("$inlinecount=" + sInlineCount);
	
		return aParam;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._executeBatchRequest
	 */
	AnalyticalBinding.prototype._executeBatchRequest = function(aRequestDetails) {
		var iCurrentAnalyticalInfoVersion = this.iAnalyticalInfoVersionNumber;
	
		var that = this;
	
		var aBatchQueryRequest = [], aExecutedRequestDetails = [];
		for(var i = -1, oRequestDetails; oRequestDetails = aRequestDetails[++i];) {
			var oAnalyticalQueryRequest = oRequestDetails.oAnalyticalQueryRequest, sGroupId = oRequestDetails.sGroupId;
			
			if (oAnalyticalQueryRequest.getURIQueryOptionValue("$select") == null) {
				// no dimensions and no measures requested, so create an artificial empty root context (synonym for the regular "/")
				this.fireDataRequested(); // simulate the async behavior
				var oEmptyRootContext = this.getModel().getContext("/artificialRootContent");
	
				// perform all steps of fct fnSuccess (w/o calling it, b/c its argument is some data object and not a context
				sGroupId = null;
				this.mLength[sGroupId] = 1;
				this.mFinalLength[sGroupId] = true;
				this.mKey[sGroupId] = [ "artificialRootContent" ];
				this.bNeedsUpdate = true;
				// simulate the async behavior for the root context in case of having no sums (TODO: reconsider!)
				var that = this;
				if (aRequestDetails.length == 1) { // since no other request will be issued, send the received event at this point
					setTimeout(function() {
						that.fireDataReceived();
					});
				}
				this.bArtificalRootContext = true;
				// return immediately - no need to load data...
				continue;
			}
			var sPath = oAnalyticalQueryRequest.getURIToQueryResultEntries();
			if (sPath.indexOf("/") == 0) sPath = sPath.substring(1);
			if (! this._isRequestPending(oRequestDetails.sRequestId)) {
				/* side note: the check for a pending request is repeated at this point (first check occurs in _getContextsForParentGroupId),
				   because the logic executed for a call to the binding API may yield to identical OData requests in a single batch. 
				   Since _processRequestQueue, and hence also _executeBatchRequest are executed asynchronously, this method is the first place 
				   where the set of all operations included in the batch request becomes known and this condition can be checked. */  
				this._registerNewRequest(oRequestDetails.sRequestId);
				aBatchQueryRequest.push(this.oModel.createBatchOperation(sPath.replace(/\ /g, "%20"), "GET"));
				aExecutedRequestDetails.push(oRequestDetails);
			}
		}

		jQuery.sap.log.debug("AnalyticalBinding: executing batch request with " + aExecutedRequestDetails.length + " operations");
		
		var iRequestHandleId = this._getIdForNewRequestHandle();
		if (aBatchQueryRequest.length > 0) {
			this.oModel.addBatchReadOperations(aBatchQueryRequest);
			this.fireDataRequested();
			var oRequestHandle = this.oModel.submitBatch(fnSuccess, fnError, true, true);

			// fire event to indicate sending of a new request
			this.oModel.fireRequestSent({url : this.oModel.sServiceUrl	+ "/$batch", type : "POST", async : true,
				info: "",
				infoObject : {}
			});

			this._registerNewRequestHandle(iRequestHandleId, oRequestHandle);
		}

		function fnSuccess(oData, response) {
			that._deregisterHandleOfCompletedRequest(iRequestHandleId);
			
			if (aExecutedRequestDetails.length != oData.__batchResponses.length)
				jQuery.sap.log.fatal("assertion failed: received " + oData.__batchResponses.length 
						+ " responses for " + aExecutedRequestDetails.length + " read operations in the batch request");
	
			if (iCurrentAnalyticalInfoVersion != that.iAnalyticalInfoVersionNumber) {
				// discard responses for outdated analytical infos
				for(var i = -1, sRequestId; sRequestId = aExecutedRequestDetails[++i].sRequestId;) {
					that._deregisterCompletedRequest(sRequestId);
					that._cleanupGroupingForCompletedRequest(sRequestId);
				}
				return;
			}
			
			for (var i = 0; i < oData.__batchResponses.length; i++) {
				if (oData.__batchResponses[i].data != undefined) {
					switch (aExecutedRequestDetails[i].iRequestType) {
						case AnalyticalBinding._requestType.groupMembersQuery:
							that._processGroupMembersQueryResponse(aExecutedRequestDetails[i], oData.__batchResponses[i].data);
							break;
						case AnalyticalBinding._requestType.totalSizeQuery:
							that._processTotalSizeQueryResponse(aExecutedRequestDetails[i], oData.__batchResponses[i].data);
							break;
						default:
							jQuery.sap.log.fatal("invalid request type " + aExecutedRequestDetails[i].iRequestType);
						    continue;	
					}
				}
				that._deregisterCompletedRequest(aExecutedRequestDetails[i].sRequestId);
				that._cleanupGroupingForCompletedRequest(aExecutedRequestDetails[i].sRequestId);
			}

			// determine the logical success status: true iff all operations succeeded
			var bOverallSuccess = true;
			var aBatchErrors = that.oModel._getBatchErrors(oData);
			if (aBatchErrors.length > 0) bOverallSuccess = false;

			// fire event to indicate completion of request
			that.oModel.fireRequestCompleted({url : response.requestUri, type : "POST", async : true, 
				info: "", 
				infoObject : {}, 
				success: bOverallSuccess, 
				errorobject: bOverallSuccess ? {} : that.oModel._handleError(aBatchErrors[0])});

			// fire changes only if all operations succeeded
			if (bOverallSuccess) that._fireChange({ reason: ChangeReason.Change});
			
			that.fireDataReceived(); // raise event here since there is no separate fnCompleted handler for batch requests
		}	
		
		function fnError (oError) {
			that._deregisterHandleOfCompletedRequest(iRequestHandleId);
			for(var i = -1, oExecutedRequestDetails; oExecutedRequestDetails = aExecutedRequestDetails[++i];) {
				that._deregisterCompletedRequest(oExecutedRequestDetails.sRequestId);
				that._cleanupGroupingForCompletedRequest(oExecutedRequestDetails.sRequestId);
			}
			if (iCurrentAnalyticalInfoVersion != that.iAnalyticalInfoVersionNumber) {
				// discard responses for outdated analytical infos
				return;
			}

			// fire event to indicate completion of request
			that.oModel.fireRequestCompleted({url : "", type : "POST", async : true, 
				info: "", 
				infoObject : {}, 
				success: false, 
				errorobject: that.oModel._handleError(oError)});
			// fire event to indicate request failure
			that.fireRequestFailed(that.oModel._handleError(oError));

			that.fireDataReceived();
		}
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._executeQueryRequest
	 */
	AnalyticalBinding.prototype._executeQueryRequest = function(oRequestDetails) {
		if (oRequestDetails.iRequestType == AnalyticalBinding._requestType.groupMembersAutoExpansionQuery) {
			// handle auto-expanding requests that are actually a bundle of multiple requests, one per level  
			for (var i = -1, oAnalyticalQueryRequest; oAnalyticalQueryRequest = oRequestDetails.aGroupMembersAutoExpansionRequestDetails[++i]; ) {
				this._executeQueryRequest(oAnalyticalQueryRequest);
			}
			return;
		}
		
		var iCurrentAnalyticalInfoVersion = this.iAnalyticalInfoVersionNumber;
	
		var oAnalyticalQueryRequest = oRequestDetails.oAnalyticalQueryRequest, sGroupId = oRequestDetails.sGroupId;

		// determine relevant request query options  
		var sPath = oAnalyticalQueryRequest.getURIToQueryResultEntitySet();
		var aParam = this._getQueryODataRequestOptions(oAnalyticalQueryRequest);
	
		var that = this;
	
		if (oAnalyticalQueryRequest.getURIQueryOptionValue("$select") == null) {
			// no dimensions and no measures requested, so create an artificial empty root context (synonym for the regular "/")
			this.fireDataRequested(); // simulate the async behavior
			var oEmptyRootContext = this.getModel().getContext("/artificialRootContent");
	
			// perform all steps of fct fnSuccess (w/o calling it, b/c its argument is some data object and not a context
			sGroupId = null;
			this.mLength[sGroupId] = 1;
			this.mFinalLength[sGroupId] = true;
			this.mKey[sGroupId] = [ "artificialRootContent" ];
			this.bNeedsUpdate = true;
			// simulate the async behavior for the root context in case of having no sums (TODO: reconsider!)
			var that = this;
			setTimeout(function() {
				if (that._cleanupGroupingForCompletedRequest(oRequestDetails.sRequestId)) that.fireDataReceived();
			});
			this.bArtificalRootContext = true;
			// return immediately - no need to load data...
			return;
		}
		this._registerNewRequest(oRequestDetails.sRequestId);
		// execute the request and use the metadata if available
		this.fireDataRequested();
		for (var i = 0; i < aParam.length; i++) 
			aParam[i] = aParam[i].replace(/\ /g, "%20");
		jQuery.sap.log.debug("AnalyticalBinding: executing query request");	
		
		var iRequestHandleId = this._getIdForNewRequestHandle();
		this.oModel._loadData(sPath, aParam, fnSuccess, fnError, false, fnUpdateHandle, fnCompleted);
	
		function fnSuccess(oData) {
			that._deregisterHandleOfCompletedRequest(iRequestHandleId);
			
			if (iCurrentAnalyticalInfoVersion != that.iAnalyticalInfoVersionNumber) {
				// discard responses for outdated analytical infos
				that._deregisterCompletedRequest(oRequestDetails.sRequestId);
				return;
			}
			switch (oRequestDetails.iRequestType) {
				case AnalyticalBinding._requestType.groupMembersQuery:
					that._processGroupMembersQueryResponse(oRequestDetails, oData);
					break;
				case AnalyticalBinding._requestType.totalSizeQuery:
					that._processTotalSizeQueryResponse(oRequestDetails, oData);
					break;
				case AnalyticalBinding._requestType.levelMembersQuery:
					that._processLevelMembersQueryResponse(oRequestDetails, oData);
					break;
				default:
					jQuery.sap.log.fatal("invalid request type " + oRequestDetails.iRequestType);
			    	break;	
			}
			that._deregisterCompletedRequest(oRequestDetails.sRequestId);
		}
	
		function fnCompleted() {
			if (iCurrentAnalyticalInfoVersion != that.iAnalyticalInfoVersionNumber) {
				// discard responses for outdated analytical infos
				return;
			}
			if (that._cleanupGroupingForCompletedRequest(oRequestDetails.sRequestId)) 
				that.fireDataReceived();
		}
	
		function fnError(oData) {
	
			that._deregisterHandleOfCompletedRequest(iRequestHandleId);
			that._deregisterCompletedRequest(oRequestDetails.sRequestId);
			that._cleanupGroupingForCompletedRequest(oRequestDetails.sRequestId);
			if (iCurrentAnalyticalInfoVersion != that.iAnalyticalInfoVersionNumber) {
				// discard responses for outdated analytical infos
				return;
			}
			that.fireDataReceived();
		}
	
		function fnUpdateHandle(oRequestHandle) {
			that._registerNewRequestHandle(iRequestHandleId, oRequestHandle);
		}
	
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._abortAllPendingRequests
	 */
	AnalyticalBinding.prototype._abortAllPendingRequests = function() {
		this._abortAllPendingRequestsByHandle();
		this._clearAllPendingRequests();
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._processGroupMembersQueryResponse
	 */
	AnalyticalBinding.prototype._processGroupMembersQueryResponse = function(oRequestDetails, oData) {
		var sGroupId = oRequestDetails.sGroupId, aSelectedUnitPropertyName = oRequestDetails.aSelectedUnitPropertyName, 
		aAggregationLevel = oRequestDetails.aAggregationLevel, 
		iStartIndex = oRequestDetails.iStartIndex, iLength = oRequestDetails.iLength;
	
		
		if (!this.mKey[sGroupId]) this.mKey[sGroupId] = [];
	
		var aKey = this.mKey[sGroupId];
		var iKeyIndex = iStartIndex;
		var bUnitCheckRequired = (aSelectedUnitPropertyName.length > 0);
		var sPreviousEntryDimensionKeyString = null, sDimensionKeyString = null;
		var iFirstMatchingEntryIndex = -1;
		var iDiscardedEntriesCount = 0;
		var aAllDimensionSortedByName = null;
	
		// Collecting contexts
		for (var i = 0; i < oData.results.length; i++) {
			var oEntry = oData.results[i];
	
			if (bUnitCheckRequired) {
				// perform check to detect multiple returned entries for a single group level instance; duplicates are detected by having the same dimension keys  
				sDimensionKeyString = "";
				for (var j = 0; j < aAggregationLevel.length; j++) {
					sDimensionKeyString += oEntry[aAggregationLevel[j]] + "|";
				}
				if (sPreviousEntryDimensionKeyString == sDimensionKeyString) {
					if (iFirstMatchingEntryIndex == -1) iFirstMatchingEntryIndex = i - 1;
					var iDeviatingUnitPropertyNameIndex = -1, oPreviousEntry = oData.results[i - 1];
					for (var k = 0; k < aSelectedUnitPropertyName.length; k++) {
						if (oPreviousEntry[aSelectedUnitPropertyName[k]] != oEntry[aSelectedUnitPropertyName[k]]) {
							iDeviatingUnitPropertyNameIndex = k; // aggregating dimensions are all the same, entries only differ in currency
							break;
						}
					}
					if (iDeviatingUnitPropertyNameIndex == -1)
						jQuery.sap.log.fatal("assertion failed: no deviating units found for result entries " + (i - 1)
								+ " and " + i);
				}
				if ((sPreviousEntryDimensionKeyString != sDimensionKeyString || i == oData.results.length - 1)
						&& iFirstMatchingEntryIndex != -1) { // after sequence of identical records or if processing the last result entry
					// pick  first entry with same key combination, create a copy of it and modify that: clear all unit properties that are not part of the aggregation level, and all measures
					var oMultiUnitEntry = jQuery.extend(true, {}, oData.results[iFirstMatchingEntryIndex]);
					var oModelEntryObject = this.oModel._getObject("/"
							+ this.oModel._getKey(oData.results[iFirstMatchingEntryIndex]));
					for (var k = 0; k < aSelectedUnitPropertyName.length; k++)
						oMultiUnitEntry[aSelectedUnitPropertyName[k]] = "*";
					for ( var sMeasureName in this.oMeasureDetailsSet) {
						var oMeasureDetails = this.oMeasureDetailsSet[sMeasureName];
						// if (oMeasureDetails.unitPropertyName == undefined) continue;
						if (oMeasureDetails.rawValuePropertyName != undefined)
							oMultiUnitEntry[oMeasureDetails.rawValuePropertyName] = "*";
						if (oMeasureDetails.formattedValuePropertyName != undefined)
							oMultiUnitEntry[oMeasureDetails.formattedValuePropertyName] = "*";
					}
					/*
					 * assign a key to this new entry that allows to import it into the OData model that is guaranteed to be stable when used for multiple
					 * bindings 1) Take all(!) grouping dimensions in alphabetical order of their names 2) Concatenate the values of these dimenensions in this
					 * order separated by "," 3) append some indicator such as "-multiunit-not-dereferencable" to mark this special entry
					 */
					var sMultiUnitEntryKey = "";
					if (aAllDimensionSortedByName == null)
						// a complete set of sorted dimension names are the basis for stable key values; create array lazily
						aAllDimensionSortedByName = this.oAnalyticalQueryResult.getAllDimensionNames().concat([]).sort();
	
					for (var k = 0; k < aAllDimensionSortedByName.length; k++) {
						var sDimVal = oMultiUnitEntry[aAllDimensionSortedByName[k]];
						sMultiUnitEntryKey += (sDimVal === undefined ? "" : sDimVal) + ",";
					}
					// this modified copy must be imported to the OData model as a new entry with a modified key and OData metadata
					oMultiUnitEntry.__metadata.uri = sMultiUnitEntryKey + "-multiple-units-not-dereferencable";
					delete oMultiUnitEntry.__metadata["self"]; 
					delete oMultiUnitEntry.__metadata["self_link_extensions"];
					oMultiUnitEntry["^~volatile"] = true; // mark entry to distinguish it from others contained in the regular OData result
					this.oModel._importData(oMultiUnitEntry, {});
					// mark the context for this entry as volatile to facilitate special treatment by consumers
					this.oModel.getContext('/' + oMultiUnitEntry.__metadata.uri)["_volatile"] = true;
	
					// finally, get the entry from the OData model and adjust array aKey to point to the modified key
					aKey[iKeyIndex - 1] = this.oModel._getKey(oMultiUnitEntry);
	
					// calculate how many entries have now been discarded from the result
					if (i == oData.results.length - 1 && sPreviousEntryDimensionKeyString == sDimensionKeyString) // last row same as previous
					    iDiscardedEntriesCount += i - iFirstMatchingEntryIndex;
					else // last row is different from second to last
					    iDiscardedEntriesCount += i - iFirstMatchingEntryIndex - 1;
					iFirstMatchingEntryIndex = -1;
	
					// add current entry if it has different key combination
					if (sPreviousEntryDimensionKeyString != sDimensionKeyString)
						aKey[iKeyIndex++] = this.oModel._getKey(oEntry);
				} else if (sPreviousEntryDimensionKeyString != sDimensionKeyString)
					aKey[iKeyIndex++] = this.oModel._getKey(oEntry);
				sPreviousEntryDimensionKeyString = sDimensionKeyString;
			} else
				aKey[iKeyIndex++] = this.oModel._getKey(oEntry);
		}
	
		// update iLength (only when the inline count is available)
		if (oData.__count) {
			this.mLength[sGroupId] = parseInt(oData.__count, 10) - iDiscardedEntriesCount;
			this.mFinalLength[sGroupId] = true;
			
			if (oRequestDetails.bIsFlatListRequest)
				this.iTotalSize = oData.__count;
		}
	
		// if we got data and the results + startindex is larger than the
		// length we just apply this value to the length
		if (this.mLength[sGroupId] < iStartIndex + oData.results.length) {
			this.mLength[sGroupId] = iStartIndex + (oData.results.length - iDiscardedEntriesCount);
			this.mFinalLength[sGroupId] = false;
		}
	
		// if less entries are returned than have been requested
		// set length accordingly
		if ((oData.results.length - iDiscardedEntriesCount) < iLength || iLength === undefined) {
			this.mLength[sGroupId] = iStartIndex + (oData.results.length - iDiscardedEntriesCount);
			this.mFinalLength[sGroupId] = true;
		}
	
		// check if there are any results at all...
		if (oData.results.length == 0) {
			this.mLength[sGroupId] = 0;
			this.mFinalLength[sGroupId] = true;
		}
	
		this.bNeedsUpdate = true;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._processGroupMembersQueryResponse
	 */
	AnalyticalBinding.prototype._processTotalSizeQueryResponse = function(oRequestDetails, oData) {
		var oAnalyticalQueryRequest = oRequestDetails.oAnalyticalQueryRequest;
		
		if (oData.__count == undefined) {
			jQuery.sap.log.fatal("missing entity count in query result");
			return;
		}
		this.iTotalSize = oData.__count;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._processGroupMembersQueryResponse
	 */
	AnalyticalBinding.prototype._processLevelMembersQueryResponse = function(oRequestDetails, oData) {
		var oAnalyticalQueryRequest = oRequestDetails.oAnalyticalQueryRequest;
		
		if (oData.results.length == 0) return;
		// Collecting contexts
		var sPreviousParentGroupId = this._getGroupIdFromContext(
				this.oModel.getContext("/" + this.oModel._getKey(oData.results[0])), oRequestDetails.iLevel - 1);
		var aParentGroupODataResult = [];
		for (var i = 0; i < oData.results.length; i++) {
			// partition the result into several subsets each of which has a common parent group Id
			var oEntry = oData.results[i];
			var oContext = this.oModel.getContext("/" + this.oModel._getKey(oData.results[i]));
			var sParentGroupId = this._getGroupIdFromContext(oContext, oRequestDetails.iLevel - 1);
			if (sPreviousParentGroupId == sParentGroupId) {
				aParentGroupODataResult.push (oEntry);
				if ( i < oData.results.length - 1) continue;
			}
			// transform the subset for processing as group members query response
			var oGroupMembersRequestDetails = {
				iRequestType : AnalyticalBinding._requestType.groupMembersQuery,
				sRequestId : this._getRequestId(AnalyticalBinding._requestType.groupMembersQuery, {groupId: sPreviousParentGroupId}),
				oAnalyticalQueryRequest : oRequestDetails.oAnalyticalQueryRequest,
				sGroupId : sPreviousParentGroupId,
				aSelectedUnitPropertyName : oRequestDetails.aSelectedUnitPropertyName,
				aAggregationLevel : oRequestDetails.aAggregationLevel,
				bIsFlatListRequest : false,
				iStartIndex : oRequestDetails.iStartIndex,
				iLength : oRequestDetails.iLength
			};
			var oParentGroupOData = jQuery.extend(true, {}, oData);
			oParentGroupOData.results = aParentGroupODataResult;
			this._processGroupMembersQueryResponse(oGroupMembersRequestDetails, oParentGroupOData)
			
			if ( i < oData.results.length - 1) { // setup for processing next parent group 
				sPreviousParentGroupId = sParentGroupId;
				aParentGroupODataResult = [ oEntry ];
			}
		}
	};
	
	/** *************************************************************** */
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getLoadedContextsForGroup
	 */
	AnalyticalBinding.prototype._getLoadedContextsForGroup = function(sGroupId, iStartIndex, iLength) {
		var aContext = [], oContext, aKey = this.mKey[sGroupId], sKey;
	
		if (!aKey) return aContext;
	
		if (!iStartIndex) iStartIndex = 0;
	
		if (!iLength) {
			iLength = this.oModel.iSizeLimit;
			if (this.mFinalLength[sGroupId] && this.mLength[sGroupId] < iLength) iLength = this.mLength[sGroupId];
		}
	
		//	Loop through known data and check whether we already have all rows loaded
		for (var i = iStartIndex; i < iStartIndex + iLength; i++) {
			sKey = aKey[i];
			if (!sKey) {
				break;
			}
			oContext = this.oModel.getContext('/' + sKey);
			aContext.push(oContext);
		}
	
		return aContext;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._calculateRequiredGroupSection
	 */
	AnalyticalBinding.prototype._calculateRequiredGroupSection = function(sGroupId, iStartIndex, iLength, iThreshold, aContext) {
		// implementation copied from ODataListBinding; name changed here, because analytical binding comprises more calculations 
		var bLoadNegativeEntries = false, iSectionLength, iSectionStartIndex, iPreloadedSubsequentIndex, iPreloadedPreviousIndex, iRemainingEntries, oSection = {}, aKey = this.mKey[sGroupId], sKey;
	
		iSectionStartIndex = iStartIndex;
		iSectionLength = 0;
	
		// check which data exists before startindex; If all necessary data is loaded iPreloadedPreviousIndex stays undefined
		if (!aKey) {
			iPreloadedPreviousIndex = iStartIndex;
			iPreloadedSubsequentIndex = iStartIndex + iLength;
		} else {
			for (var i = iStartIndex - 1; i >= Math.max(iStartIndex - iThreshold, 0); i--) {
				sKey = aKey[i];
				if (!sKey) {
					iPreloadedPreviousIndex = i + 1;
					break;
				}
			}
			// check which data is already loaded after startindex; If all necessary data is loaded iPreloadedSubsequentIndex stays undefined
			for (var j = iStartIndex + iLength; j < iStartIndex + iLength + iThreshold; j++) {
				sKey = aKey[j];
				if (!sKey) {
					iPreloadedSubsequentIndex = j;
					break;
				}
			}
		}
		// calculate previous remaining entries
		iRemainingEntries = iStartIndex - iPreloadedPreviousIndex;
		if (iPreloadedPreviousIndex && iStartIndex > iThreshold && iRemainingEntries < iThreshold) {
			if (aContext.length != iLength)
				iSectionStartIndex = iStartIndex - iThreshold;
			else
				iSectionStartIndex = iPreloadedPreviousIndex - iThreshold;
	
			iSectionLength = iThreshold;
		}
	
		// No negative preload needed; move startindex if we already have some data
		if (iSectionStartIndex == iStartIndex) iSectionStartIndex += aContext.length;
	
		//read the rest of the requested data
		if (aContext.length != iLength) iSectionLength += iLength - aContext.length;
	
		//calculate subsequent remaining entries
		iRemainingEntries = iPreloadedSubsequentIndex - iStartIndex - iLength;
	
		if (iRemainingEntries == 0) iSectionLength += iThreshold;
	
		if (iPreloadedSubsequentIndex && iRemainingEntries < iThreshold && iRemainingEntries > 0) {
			//check if we need to load previous entries; If not we can move the startindex
			if (iSectionStartIndex >= iStartIndex) {
				iSectionStartIndex = iPreloadedSubsequentIndex;
				iSectionLength += iThreshold;
			}
	
		}
	
		//check final length and adapt sectionLength if needed.
		if (this.mFinalLength[sGroupId] && this.mLength[sGroupId] < (iSectionLength + iSectionStartIndex))
			iSectionLength = this.mLength[sGroupId] - iSectionStartIndex;
	
		oSection.startIndex = iSectionStartIndex;
		oSection.length = iSectionLength;
	
		return oSection;
	};

	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._calculateRequiredGroupSection
	 * @returns {Object} Either { groupId_Missing, startIndex_Missing, length_Missing } 
	 * expressing the number (length_Missing) of missing contexts starting in group (groupId_Missing) 
	 * at position (startIndex_Missing) using depth-first traversal of loaded data, 
	 * or { null, length_Missing } if the group with given ID (sGroupId) is completely loaded
	 * and still (length_Missing) further members (of other groups) are missing.
	 * Special case: { null, 0 } denotes that everything is loaded.
	 */
	AnalyticalBinding.prototype._calculateRequiredGroupExpansion = function(sGroupId, iLevel, iStartIndex, iLength) {
		if (iLevel == /* TODO */ this.iAutoExpandGroupsToLevel) {
			var aContext = this._getLoadedContextsForGroup(sGroupId, iStartIndex, iLength);
			var iLastLoadedIndex = iStartIndex + aContext.length - 1;
			
			if (!this.mFinalLength[sGroupId]) {
				if (aContext.length < iLength)
					return { groupId_Missing: sGroupId, startIndex_Missing: iLastLoadedIndex + 1, length_Missing: iLength - aContext.length }; // loading must start here
				else
					return { groupId_Missing: null, length_Missing: 0 }; // finished - everything is loaded	
			}
			else {
				if (aContext.length < iLength)
					return { groupId_Missing: null, length_Missing: iLength - aContext.length }; // group completely loaded, but some members are still missing
				else
					return { groupId_Missing: null, length_Missing: 0 }; // finished - everything is loaded				
			}
		}
		// deepest expansion level not yet reached, so traverse groups in depth-first order
		var aContext = this._getLoadedContextsForGroup(sGroupId, iStartIndex, iLength);
		var iLength_Missing = iLength, iLastLoadedIndex = iStartIndex + aContext.length - 1;
		for (var i = -1, oContext; oContext = aContext[++i]; ) {
			iLength_Missing--; // count the current context			
			var oGroupExpansionFirstMember = this._calculateRequiredGroupExpansion(this._getGroupIdFromContext(oContext, iLevel), iLevel + 1, 0, iLength_Missing);
			if (oGroupExpansionFirstMember.groupId_Missing == null) {
				if (oGroupExpansionFirstMember.startIndex_Missing == 0)
					return oGroupExpansionFirstMember; // finished - everything is loaded
				else
					iLength_Missing = oGroupExpansionFirstMember.length_Missing;
			}
			else {
				return oGroupExpansionFirstMember; // loading must start here
			}
			if (iLength_Missing == 0) break;
		}
		
		if (this.mFinalLength[sGroupId] || iLength_Missing == 0)
			return { groupId_Missing: null, length_Missing: iLength_Missing }; // group completely; maybe some members are still missing
		else
			return { groupId_Missing: sGroupId, startIndex_Missing: iLastLoadedIndex + 1, length_Missing: iLength_Missing }; // loading must start here
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getResourcePath
	 */
	AnalyticalBinding.prototype._getResourcePath = function() { 
		return this.isRelative() ? this.oModel.resolve(this.sPath, this.getContext()) : this.sPath;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getEntitySet
	 */
	AnalyticalBinding.prototype._getEntitySet = function() {
		var sEntitySet = this.sEntitySetName;
		var bindingContext = this.getContext();
		
		if (! sEntitySet) {	
			// assume absolute path complying with conventions from OData4SAP spec
			sEntitySet = this.sPath.split("/")[1];
		
			if (sEntitySet.indexOf("(") != -1) {
				sEntitySet = sEntitySet.split("(")[0] + "Results";
			}
		}
		return sEntitySet;
	
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._applyUI5SorterToSortExpression
	 */
	AnalyticalBinding.prototype._applyUI5SorterToSortExpression = function(aSorter, oSortExpression) {
		if (aSorter) {
			for ( var i in aSorter) {
				var oPropertyAnalyticalInfo = this.mAnalyticalInfoByProperty[aSorter[i].sPath];
				if (oPropertyAnalyticalInfo === undefined || oPropertyAnalyticalInfo == null)
					jQuery.sap.log.fatal("assertion failed: sorting property " + aSorter[i].sPath + " not found in analytical info");
				// add the to be sorted property only if it is not related to one of the dimensions used in the current aggregation level
				oSortExpression.addSorter(aSorter[i].sPath, aSorter[i].bDescending ? odata4analytics.SortOrder.Descending
						: odata4analytics.SortOrder.Ascending);
			}
		}
	};

	/********************************
	 *** Processing Group IDs 
	 ********************************/

	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getGroupIdFromContext
	 */
	AnalyticalBinding.prototype._getGroupIdFromContext = function(oContext, iLevel) {
	
		if (!oContext) { return null; }
		var sGroupId = "/";
		var sDimensionMember = null;
		if (iLevel > this.aAggregationLevel.length)
			jQuery.sap.log.fatal("assertion failed: aggregation level deeper than number of current aggregation levels");
		for (var i = 0; i < iLevel; i++) {
			sDimensionMember = oContext.getProperty(this.aAggregationLevel[i]);
			if (sDimensionMember != null) {
				sGroupId += encodeURIComponent(sDimensionMember) + "/"; // encode to escape slashes and at signs in the value
			} else {
				sGroupId += "@/";
			}
		}
	
		return sGroupId;
	};

	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getGroupIdLevel
	 */
	AnalyticalBinding.prototype._getGroupIdLevel = function(sGroupId) {
		if (sGroupId == null) {
			jQuery.sap.log.fatal("assertion failed: no need to determine level of group ID = null");
			return -1;
		}
		return sGroupId.split("/").length - 2;
	};

	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getGroupIdComponents
	 */
	AnalyticalBinding.prototype._getGroupIdComponents = function(sGroupId) {
		if (sGroupId == null) return null;
		var aGroupId = sGroupId.split("/");
		var aDecodedComponent = new Array();
		for (var i = 1; i < aGroupId.length - 1; i++) { // skip leading and trailing "" array elements
			if (aGroupId[i] == "@")
				aDecodedComponent[i - 1] = null;
			else
				aDecodedComponent[i - 1] = decodeURIComponent(aGroupId[i]);
		}
		return aDecodedComponent;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getGroupIdAncestors
	 * @param {integer} iNumLevels anchestors starting at the root if greater than 0, or starting at the parent of sGroupId if less than 0.
	 */
	AnalyticalBinding.prototype._getGroupIdAncestors = function(sGroupId, iNumLevels) {
		if (!iNumLevels) return [];
		if (sGroupId == null) {
			jQuery.sap.log.fatal("group ID null does not have ancestors");
			return [];
		}
		if (sGroupId == "/")
			if (Math.abs(iNumLevels) == 1) return [ null ];
			else {
				jQuery.sap.log.fatal("invalid level count " + iNumLevels + " for ancestors of groupId " + sGroupId);
				return [];
			}
		var aGroupId = sGroupId.split("/");
		var aAncestorGroupId = new Array(), sAncestorGroupId = "";
		var iFromLevel = 0, iToLevel = aGroupId.length - 3;
		if (iNumLevels > 0)
			if (iNumLevels - 1 > iToLevel)
				jQuery.sap.log.fatal("invalid level count " + iNumLevels + " for ancestors of groupId " + sGroupId);
			else iToLevel = iNumLevels - 1;
		else if (-(iNumLevels + 1) > iToLevel) jQuery.sap.log.fatal("invalid level count " + iNumLevels + " for ancestors of groupId " + sGroupId);
			else {
				iFromLevel = iToLevel + 1 + iNumLevels;
				for (var i = 0; i < iFromLevel; i++) {
					sAncestorGroupId += aGroupId[i] + "/";
				}
			}
		for (var i = iFromLevel; i <= iToLevel; i++) {
			sAncestorGroupId += aGroupId[i] + "/";
			aAncestorGroupId.push(sAncestorGroupId);
		}
		return aAncestorGroupId;
	};
	
	/**
	 * @private
	 * @function
	 * @name AnalyticalBinding.prototype._getParentGroupId
	 */
	AnalyticalBinding.prototype._getParentGroupId = function(sGroupId) {
		return this._getGroupIdAncestors(sGroupId, -1)[0];
	};
	
	AnalyticalBinding.prototype._removeDuplicatesFromStringArray = function(aString) {
		var oTemp = {};
		for (var i = 0; i < aString.length; i++)
			oTemp[aString[i]] = true;
		var aUniqueString = [];
		for (var s in oTemp)
			aUniqueString.push(s);
		return aUniqueString;
	};
	
	
	/********************************
	 *** Maintaining handles of pending requests
	 ********************************/
	
	/**
	 * Get an ID for a new request handle yet to be registered
	 *  
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._getIdForNewRequestHandle = function() {
		if (this.oPendingRequestHandle === undefined) this.oPendingRequestHandle = [];
		// find first unused slot or extend array
		for (var i = 0; i < this.oPendingRequestHandle.length; i++) {
			if (this.oPendingRequestHandle[i] === undefined) return i;
		}
		this.oPendingRequestHandle[this.oPendingRequestHandle.length] = undefined;
		return this.oPendingRequestHandle.length - 1;
	};
	
	/**
	 * Register a new request handle with its given request ID
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._registerNewRequestHandle = function(iRequestHandleId, oRequestHandle) {
		if (this.oPendingRequestHandle[iRequestHandleId] !== undefined) 
			jQuery.sap.log.fatal("request handle ID already in use");
		this.oPendingRequestHandle[iRequestHandleId] = oRequestHandle;
	};
	
	/**
	 * Deregister handle of completed request
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._deregisterHandleOfCompletedRequest = function(iRequestHandleId) {
		if (this.oPendingRequestHandle[iRequestHandleId] === undefined) 
			jQuery.sap.log.fatal("no handle found for this request ID");
		this.oPendingRequestHandle[iRequestHandleId] = undefined;
	};

	/**
	 * Abort all currently sent requests, which have not yet been completed  
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._abortAllPendingRequestsByHandle = function() {
// 		this._trace_enter("Requests", "_abortAllPendingRequestsByHandle"); // DISABLED FOR PRODUCTION 		
		for (var i = 0; i < this.oPendingRequestHandle.length; i++) {
// 			if (this.oPendingRequestHandle[i]) this._trace_message ("Requests", "abort index " + i);
			this.oPendingRequestHandle[i] !== undefined && this.oPendingRequestHandle[i].abort();
		}
		this.oPendingRequestHandle = [];
// 		this._trace_leave("Requests", "_abortAllPendingRequestsByHandle"); // DISABLED FOR PRODUCTION 		
	};
	
	/********************************
	 *** Maintaining pending requests
	 ********************************/
	
	/**
	 * Construct a request ID for a query request of the specified type
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._getRequestId = function(iRequestType, mParameters) {
		switch (iRequestType) {
		case AnalyticalBinding._requestType.groupMembersQuery:
			if (mParameters.groupId === undefined) 
				jQuery.sap.log.fatal("missing group ID");
			var sGroupId = mParameters.groupId;
			return AnalyticalBinding._requestType.groupMembersQuery + (sGroupId == null ? "" : sGroupId);
		case AnalyticalBinding._requestType.levelMembersQuery:
			if (mParameters.level === undefined) 
				jQuery.sap.log.fatal("missing level");
			var iLevel = mParameters.level;
			return "" + AnalyticalBinding._requestType.levelMembersQuery + iLevel;
		case AnalyticalBinding._requestType.totalSizeQuery:
			return AnalyticalBinding._requestType.totalSizeQuery;
		default:
			jQuery.sap.log.fatal("invalid request type " + iRequestType);
			return -1;
		}
	};
	
	/**
	 * Register another request to maintain its lifecycle (pending, completed)
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._registerNewRequest = function(sRequestId) {
		if (sRequestId == undefined || sRequestId == "") { 
			jQuery.sap.log.fatal("missing request ID");
			return;
		}
		if (!this.oPendingRequests[sRequestId])
			this.oPendingRequests[sRequestId] = 1;
		else
			++this.oPendingRequests[sRequestId];
	};
	
	/**
	 * Declare a group of related (pending) requests
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._considerRequestGrouping = function(aRequestId) {
		for (var i = -1, sRequestId; sRequestId = aRequestId[++i]; ) {
			if (this.oGroupedRequests[sRequestId] === undefined) this.oGroupedRequests[sRequestId] = {};
			var oGroup = this.oGroupedRequests[sRequestId];
			for (var j = 0; j < aRequestId.length; j++)
				oGroup[aRequestId[j]] = true;
		}
	};
	
	/**
	 * Is a request pending for a given group ID?
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._isRequestPending = function(sRequestId) {
		return this.oPendingRequests[sRequestId] != undefined && this.oPendingRequests[sRequestId] > 0;
	};
	
	/**
	 * Deregister a request, because its data have been received and processed. A call to this method must be followed 
	 * (not immediately, but logically) by this._cleanupGroupingForCompletedRequest to cleanup grouping information.
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype._deregisterCompletedRequest = function(sRequestId) {
		if (!this.oPendingRequests[sRequestId])
			jQuery.sap.log.fatal("assertion failed: there is no pending request ID " + sRequestId);
		if (this.oPendingRequests[sRequestId] == 1)
			delete this.oPendingRequests[sRequestId];
		else
			--this.oPendingRequests[sRequestId];
	};
	
	/**
	 * Cleanup request grouping, because its data have been received and processed. This method allows a caller to determine if it is possible
	 * to raise the "all data received" event for a group of related OData requests.
	 * 
	 * A call to this method must be preceded by this._deregisterCompletedRequest to mark the received response.
	 * 
	 * @private
	 * @function
	 * @return a Boolean whether or not all requests grouped together with this request have now been completed
	 */
	AnalyticalBinding.prototype._cleanupGroupingForCompletedRequest = function(sRequestId) {
		if (this._isRequestPending(sRequestId)) return false;
		var bGroupCompleted = true;
		if (this.oGroupedRequests[sRequestId] != undefined) {
			for ( var sOtherRequestId in this.oGroupedRequests[sRequestId]) {
				if (this.oPendingRequests[sOtherRequestId]) {
					bGroupCompleted = false;
					break;
				}
			}
		}
		if (bGroupCompleted) {
			var oRelatedGroup = this.oGroupedRequests[sRequestId];
			delete this.oGroupedRequests[sRequestId];
			for ( var sOtherRequestId in oRelatedGroup) {
				if (sOtherRequestId != sRequestId) this._cleanupGroupingForCompletedRequest(sOtherRequestId);
			}
		}
		return bGroupCompleted;
	};
	
	AnalyticalBinding.prototype._clearAllPendingRequests = function() {
		this.oPendingRequests = {};
		this.oGroupedRequests = {};
	};

	/**
	 * Resets the current list data and length
	 * 
	 * @private
	 * @function
	 */
	AnalyticalBinding.prototype.resetData = function(oContext) {
		if (oContext) {
			//Only reset specific content
			var sPath = oContext.getPath();
	
			delete this.mKey[sPath];
			delete this.mLength[sPath];
			delete this.mFinalLength[sPath];
		} else {
			this.mKey = {};
			this.mLength = {};
			this.mFinalLength = {};
		}
	};
	
	/**
	 * Refreshes the binding, check whether the model data has been changed and fire change event if this is the case. For server side models this should refetch
	 * the data from the server. To update a control, even if no data has been changed, e.g. to reset a control after failed validation, please use the parameter
	 * bForceUpdate.
	 * 
	 * @public
	 * @function
	 * @param {boolean}
	 *            [bForceUpdate] Update the bound control even if no data has been changed
	 * @param {object}
	 *            [mChangedEntities]
	 * @param {string]
	 *            [mEntityTypes]
	 */
	AnalyticalBinding.prototype.refresh = function(bForceUpdate, mChangedEntities, mEntityTypes) {
		var bChangeDetected = false;
		if (!bForceUpdate) {
			if (mEntityTypes) {
				var sResolvedPath = this.oModel.resolve(this.sPath, this.oContext);
				var oEntityType = this.oModel.oMetadata._getEntityTypeByPath(sResolvedPath);
				if (oEntityType && (oEntityType.entityType in mEntityTypes)) bChangeDetected = true;
			}
			if (mChangedEntities && !bChangeDetected) {
				jQuery.each(this.mKey, function(i, aNodeKeys) {
					jQuery.each(aNodeKeys, function(i, sKey) {
						if (sKey in mChangedEntities) {
							bChangeDetected = true;
							return false;
						}
					});
					if (bChangeDetected) return false;
				});
			}
			if (!mChangedEntities && !mEntityTypes) { // default
				bChangeDetected = true;
			}
		}
		if (bForceUpdate || bChangeDetected) {
			this._abortAllPendingRequests();
			this.resetData();
			this.bNeedsUpdate = false;
			this._fireRefresh({reason: sap.ui.model.ChangeReason.Refresh});
		}
	};
	
	/**
	 * Check whether this Binding would provide new values and in case it changed, inform interested parties about this.
	 * 
	 * @public
	 * @function
	 * @param {boolean}
	 *            bForceUpdate
	 */
	AnalyticalBinding.prototype.checkUpdate = function(bForceUpdate, mChangedEntities) {
		var bChangeDetected = false;
		if (!bForceUpdate) {
			if (this.bNeedsUpdate || !mChangedEntities) {
				bChangeDetected = true;
			} else {
				jQuery.each(this.mKey, function(i, aNodeKeys) {
					jQuery.each(aNodeKeys, function(i, sKey) {
						if (sKey in mChangedEntities) {
							bChangeDetected = true;
							return false;
						}
					});
					if (bChangeDetected) return false;
				});
			}
		}
		if (bForceUpdate || bChangeDetected) {
			this.bNeedsUpdate = false;
			this._fireChange();
		}
	};
	
	/********************************
	 *** Tracing execution
	 ********************************/
	
	/** DISABLED FOR PRODUCTION 
// 	 *    to enable, search using regex for "^// (.*\._trace_.*)", replace by "$1" 
// 	 *    to disable, search using regex for "^(.*\._trace_.*)", replace by "// $1"
	 *
// 	AnalyticalBinding.prototype._trace_enter = function(groupid, scope, input_msg, _arguments) {
		if (!this._traceMsgCtr) this._traceMsgCtr = { level: 0, msg: [] };
		this._traceMsgCtr.msg.push( { group: groupid, level: ++this._traceMsgCtr.level, scope: scope, msg: input_msg, details: _arguments, enter: true } );
	};
	
// 	AnalyticalBinding.prototype._trace_leave = function (groupid, scope, output_msg, results) {
		if (!this._traceMsgCtr) throw "leave without enter";
		this._traceMsgCtr.msg.push( { group: groupid, level: this._traceMsgCtr.level--, scope: scope, msg: output_msg, details: results, leave: true } );
	};
	 
// 	AnalyticalBinding.prototype._trace_message = function (groupid, message, details) {
		if (!this._traceMsgCtr) throw "message without enter";
		this._traceMsgCtr.msg.push( { group: groupid, level: this._traceMsgCtr.level, msg: message, details: details } );
	};
	
// 	AnalyticalBinding.prototype._trace_dump = function (aGroupId) {
		var fRenderMessage = function (line) {
			var s = "[" + line.group + "          ".slice(0,10 - line.group.length) + "]";
			for (var i = 0; i < line.level; i++) s+= "  ";
			if (line.enter) s += "->" + line.scope + (line.msg ? ":\t" : "");
			else if (line.leave) s += "<-" + line.scope + (line.msg ? ":\t" : "");
			else s += "  ";
			if (line.msg) s += line.msg;
			s += "\n";
			return s;
		}
		var fRender = function (aMsg) {
			var s = "";
			for (var i = 0; i < aMsg.length; i++) {
				if (!aGroupId || aGroupId.indexOf (aMsg[i].group) != -1) s += fRenderMessage(aMsg[i]);
			}
			return s;
		} 
		if (!this._traceMsgCtr) return;
		return "\n" + fRender (this._traceMsgCtr.msg);
	};

// 	AnalyticalBinding.prototype._trace_reset = function () {
		delete this._traceMsgCtr;
	};
	**/
	
	return AnalyticalBinding;

}, /* bExport= */ true);
