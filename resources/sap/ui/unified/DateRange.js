/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.DateRange");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.unified.DateRange",{metadata:{library:"sap.ui.unified",properties:{"startDate":{type:"object",group:"Misc",defaultValue:null},"endDate":{type:"object",group:"Misc",defaultValue:null}}}});
sap.ui.unified.DateRange.prototype.setStartDate=function(d){this.setProperty("startDate",d)};
sap.ui.unified.DateRange.prototype.setEndDate=function(d){this.setProperty("endDate",d)};
