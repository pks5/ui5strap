/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.layout.MatrixLayout");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.layout.MatrixLayout",{metadata:{publicMethods:["createRow"],library:"sap.ui.commons",properties:{"visible":{type:"boolean",group:"Behavior",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"layoutFixed":{type:"boolean",group:"Appearance",defaultValue:true},"columns":{type:"int",group:"Appearance",defaultValue:null},"widths":{type:"sap.ui.core.CSSSize[]",group:"Appearance",defaultValue:null}},defaultAggregation:"rows",aggregations:{"rows":{type:"sap.ui.commons.layout.MatrixLayoutRow",multiple:true,singularName:"row"}}}});jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.ui.commons.layout.MatrixLayoutCell");jQuery.sap.require("sap.ui.commons.layout.MatrixLayoutRow");sap.ui.core.EnabledPropagator.call(sap.ui.commons.layout.MatrixLayout.prototype,true,true);
sap.ui.commons.layout.MatrixLayout.prototype.createRow=function(){var r=new sap.ui.commons.layout.MatrixLayoutRow();this.addRow(r);for(var i=0;i<arguments.length;i++){var c=arguments[i];var C;if(c instanceof sap.ui.commons.layout.MatrixLayoutCell){C=c}else if(c instanceof sap.ui.core.Control){C=new sap.ui.commons.layout.MatrixLayoutCell({content:c})}else if(c instanceof Object&&c.height){r.setHeight(c.height)}else{var t=c?c.toString():"";C=new sap.ui.commons.layout.MatrixLayoutCell({content:new sap.ui.commons.TextView({text:t})})}r.addCell(C)}return this};
sap.ui.commons.layout.MatrixLayout.prototype.setWidths=function(w){var s;if(!jQuery.isArray(w)){s=jQuery.makeArray(arguments)}else{s=w}for(var i=0;i<s.length;i++){if(s[i]==""||!s[i]){s[i]="auto"}}this.setProperty("widths",s);return this};
