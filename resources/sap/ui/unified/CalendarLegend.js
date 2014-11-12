/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.CalendarLegend");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.unified.CalendarLegend",{metadata:{library:"sap.ui.unified",properties:{"columnWidth":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'120px'}},aggregations:{"items":{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"item"}}}});
sap.ui.unified.CalendarLegend.prototype.onAfterRendering=function(){if(sap.ui.Device.browser.msie){if(sap.ui.Device.browser.version<10){jQuery(".sapUiUnifiedLegendItem").css("width",this.getColumnWidth()+4+"px").css("display","inline-block")}}}
