/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.table.AnalyticalColumn");jQuery.sap.require("sap.ui.table.library");jQuery.sap.require("sap.ui.table.Column");sap.ui.table.Column.extend("sap.ui.table.AnalyticalColumn",{metadata:{library:"sap.ui.table",properties:{"leadingProperty":{type:"string",group:"Misc",defaultValue:null},"summed":{type:"boolean",group:"Misc",defaultValue:false},"inResult":{type:"boolean",group:"Misc",defaultValue:false},"showIfGrouped":{type:"boolean",group:"Appearance",defaultValue:false},"groupHeaderFormatter":{type:"any",group:"Behavior",defaultValue:null}}}});
sap.ui.table.AnalyticalColumn.prototype.init=function(){sap.ui.table.Column.prototype.init.apply(this,arguments);this._bSkipUpdateAI=false};
sap.ui.table.AnalyticalColumn.prototype._createMenu=function(){jQuery.sap.require("sap.ui.table.AnalyticalColumnMenu");return new sap.ui.table.AnalyticalColumnMenu(this.getId()+"-menu")};
sap.ui.table.AnalyticalColumn.prototype.setGrouped=function(g){var p=this.getParent();var t=this;if(p&&p instanceof sap.ui.table.AnalyticalTable){if(g){p._addGroupedColumn(this.getId())}else{p._aGroupedColumns=jQuery.grep(p._aGroupedColumns,function(v){return v!=t.getId()})}}var r=this.setProperty("grouped",g);this._updateTableColumnDetails();this._updateTableAnalyticalInfo(true);return r};
sap.ui.table.AnalyticalColumn.prototype.setSummed=function(s){var r=this.setProperty("summed",s,true);this._updateTableAnalyticalInfo();return r};
sap.ui.table.AnalyticalColumn.prototype.setVisible=function(v){sap.ui.table.Column.prototype.setVisible.apply(this,arguments);this._updateTableColumnDetails();this._updateTableAnalyticalInfo();return this};
sap.ui.table.AnalyticalColumn.prototype.getLabel=function(){var l=this.getAggregation("label");if(!l){if(!this._oBindingLabel){var p=this.getParent();if(p&&p instanceof sap.ui.table.AnalyticalTable){var b=p.getBinding("rows");if(b){this._oBindingLabel=sap.ui.table.TableHelper.createLabel({text:b.getPropertyLabel(this.getLeadingProperty())})}}}l=this._oBindingLabel}return l};
sap.ui.table.AnalyticalColumn.prototype._afterSort=function(){this._updateTableAnalyticalInfo()};
sap.ui.table.AnalyticalColumn.prototype._updateTableAnalyticalInfo=function(s){if(this._bSkipUpdateAI){return}var p=this.getParent();if(p&&p instanceof sap.ui.table.AnalyticalTable){p.updateAnalyticalInfo(s)}};
sap.ui.table.AnalyticalColumn.prototype._updateTableColumnDetails=function(){if(this._bSkipUpdateAI){return}var p=this.getParent();if(p&&p instanceof sap.ui.table.AnalyticalTable){p._updateTableColumnDetails()}};
sap.ui.table.AnalyticalColumn.prototype.shouldRender=function(){if(!this.getVisible()){return false}return(!this.getGrouped()||this._bLastGroupAndGrouped||this.getShowIfGrouped())&&(!this._bDependendGrouped||this._bLastGroupAndGrouped)};
