/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element','./library'],function(q,E,l){"use strict";var R=E.extend("sap.ui.table.Row",{metadata:{library:"sap.ui.table",defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell"}}}});R.prototype.getIndex=function(){var t=this.getParent();if(t){var f=t.getFirstVisibleRow();var r=t.indexOfRow(this);return f+r}return-1};return R},true);
