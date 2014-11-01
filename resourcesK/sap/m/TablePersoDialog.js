/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.TablePersoDialog");jQuery.sap.require("sap.ui.base.ManagedObject");jQuery.sap.require("sap.m.InputListItem");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Toolbar");jQuery.sap.require("sap.m.Button");sap.ui.base.ManagedObject.extend("sap.m.TablePersoDialog",{constructor:function(i,s){sap.ui.base.ManagedObject.apply(this,arguments)},metadata:{properties:{"contentWidth":{type:"sap.ui.core.CSSSize"},"contentHeight":{type:"sap.ui.core.CSSSize",since:"1.22"},"persoMap":{type:"object"},"columnInfoCallback":{type:"object",since:"1.22"},"initialColumnState":{type:"object",since:"1.22"},"hasGrouping":{type:"boolean",since:"1.22"},"showSelectAll":{type:"boolean",since:"1.22"},"showResetAll":{type:"boolean",since:"1.22"},},aggregations:{"persoService":{type:"Object",multiple:false}},associations:{"persoDialogFor":sap.m.Table},events:{confirm:{},cancel:{}},library:"sap.m"}});
sap.m.TablePersoDialog.prototype.init=function(){var t=this,l=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oP13nModel=new sap.ui.model.json.JSONModel();this._oP13nModel.setSizeLimit(Number.MAX_VALUE);this._fnUpdateCheckBoxes=jQuery.proxy(function(e){var s=e.getParameter('selected'),d=this._oP13nModel.getData();if(e.getSource().getParent().getParent()==this._oSelectAllHeader){d.aColumns.forEach(function(c){c.visible=s})}else{var S=!d.aColumns.some(function(c){return!c.visible});d.aHeaders[0].visible=S}this._oP13nModel.setData(d)},this);this._oColumnItemTemplate=new sap.m.InputListItem({label:"{Personalization>text}",content:new sap.m.CheckBox({selected:"{Personalization>visible}",select:this._fnUpdateCheckBoxes}),}).addStyleClass("sapMPersoDialogLI");this._oHeaderItemTemplate=new sap.m.InputListItem({label:"{Personalization>text}",content:new sap.m.CheckBox({selected:"{Personalization>visible}",select:this._fnUpdateCheckBoxes}),}).addStyleClass("sapMPersoDialogLI").addStyleClass("sapMPersoDialogLIHeader");this._oButtonUp=new sap.m.Button({icon:"sap-icon://arrow-top",enabled:false,press:function(e){t._moveItem(-1)}});this._oButtonDown=new sap.m.Button({icon:"sap-icon://arrow-bottom",enabled:false,press:function(e){t._moveItem(1)}});this._fnHandleResize=function(){var $=jQuery("#"+t._oDialog.getId()+"-cont");if($.children().length>0&&t._oSelectAllHeader.$().length>0){var c=$.children()[0].clientHeight;var h=t.getShowSelectAll()?t._oSelectAllHeader.$()[0].clientHeight:0;t._oScrollContainer.setHeight((c-h)+'px')}};this._fnUpdateArrowButtons=function(){var b=true,B=true,v=t._oSearchField.getValue(),i=t._oList.getItems().length;if(!!v||t._oList.getSelectedItems().length===0){B=false;b=false}else{if(t._oList.getItems()[0].getSelected()){B=false};if(t._oList.getItems()[i-1].getSelected()){b=false}}t._oButtonUp.setEnabled(B);t._oButtonDown.setEnabled(b)};this._fnAfterListRendering=function(e){var I=e.srcControl.$().find('.sapMCb'),a=I.length;for(var i=0;i<a;i++){var $=jQuery(I[i]).parent(),s=$.siblings(),b=s.length==1?jQuery(s[0]):null;if(b){$=$.detach();$[0].className='sapMLIBSelectM';$.insertBefore(b)}}};this._oList=new sap.m.List({includeItemInSelection:true,noDataText:this._oRb.getText('PERSODIALOG_NO_DATA'),mode:sap.m.ListMode.SingleSelectMaster,select:this._fnUpdateArrowButtons,});this._oSelectAllHeader=new sap.m.List({includeItemInSelection:true,mode:sap.m.ListMode.None,});this._oList.addDelegate({onAfterRendering:this._fnAfterListRendering});this._oSelectAllHeader.addDelegate({onAfterRendering:this._fnAfterListRendering});this._oSearchField=new sap.m.SearchField(this.getId()+"-searchField",{width:"100%",liveChange:function(e){var v=e.getSource().getValue(),d=(v?300:0);clearTimeout(l);if(d){l=setTimeout(function(){t._executeSearch()},d)}else{t._executeSearch()}},search:function(e){t._executeSearch()}});this._oScrollContainer=new sap.m.ScrollContainer({horizontal:false,vertical:true,content:[this._oList],width:'100%',});this._resetAllButton=new sap.m.Button({icon:"sap-icon://undo",tooltip:this._oRb.getText('PERSODIALOG_UNDO'),press:function(){t._resetAll()}});this._oSelectAllToolbar=new sap.m.Toolbar({active:true,design:sap.m.ToolbarDesign.Transparent,content:[this._oSelectAllHeader,this._resetAllButton]}).addStyleClass("sapMPersoDialogFixedBar");;this._oDialog=new sap.m.Dialog({title:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),stretch:sap.ui.Device.system.phone,horizontalScrolling:false,verticalScrolling:false,initialFocus:(sap.ui.Device.system.desktop?this._oSearchField:null),content:[this._oSelectAllToolbar,this._oScrollContainer],subHeader:new sap.m.Toolbar({active:true,content:[this._oButtonUp,this._oButtonDown,this._oSearchField]}),leftButton:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_OK"),press:function(){t._oDialog.close();t._oSearchField.setValue("");t._oSelectAllToolbar.setVisible(true);sap.ui.Device.resize.detachHandler(t._fnHandleResize);t.fireConfirm()}}),rightButton:new sap.m.Button({text:this._oRb.getText("PERSODIALOG_CANCEL"),press:function(){t._oDialog.close();t._oSearchField.setValue("");t._oSelectAllToolbar.setVisible(true);sap.ui.Device.resize.detachHandler(t._fnHandleResize);t.fireCancel()}})}).addStyleClass("sapMPersoDialog")};
sap.m.TablePersoDialog.prototype.retrievePersonalizations=function(){return this._oP13nModel.getData()};
sap.m.TablePersoDialog.prototype.open=function(){var s=null;if(this.getHasGrouping()){s=[new sap.ui.model.Sorter('group',false,true)]}this._readCurrentSettingsFromTable();this._oDialog.setModel(this._oP13nModel,"Personalization");this._oList.bindAggregation("items",{path:"Personalization>/aColumns",sorter:s,template:this._oColumnItemTemplate});this._oSelectAllHeader.bindAggregation("items",{path:"Personalization>/aHeaders",template:this._oHeaderItemTemplate});this._fnUpdateArrowButtons.call(this);this._oDialog.open();this._fnHandleResize.call(this);sap.ui.Device.resize.attachHandler(this._fnHandleResize)};
sap.m.TablePersoDialog.prototype.setContentHeight=function(h){this.setProperty("contentHeight",h,true);this._oDialog.setContentHeight(h);return this};
sap.m.TablePersoDialog.prototype.setContentWidth=function(w){this.setProperty("contentWidth",w,true);this._oDialog.setContentWidth(w);return this};
sap.m.TablePersoDialog.prototype.exit=function(){this._oRb=null;this._oP13nModel=null;if(this._oColumnItemTemplate){this._oColumnItemTemplate.destroy();this._oColumnItemTemplate=null}if(this._oHeaderItemTemplate){this._oHeaderItemTemplate.destroy();this._oHeaderItemTemplate=null}if(this._oSelectAllHeader){this._oSelectAllHeader.destroy();this._oSelectAllHeader=null}if(this._oList){this._oList.destroy();this._oList=null}if(this._oSearchField){this._oSearchField.destroy();this._oSearchField=null}if(this._oScrollContainer){this._oScrollContainer.destroy();this._oScrollContainer=null}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oButtonDown){this._oButtonDown.destroy();this._oButtonDown=null}if(this._oButtonUp){this._oButtonUp.destroy();this._oButtonUp=null}};
sap.m.TablePersoDialog.prototype._resetAll=function(){if(this.getInitialColumnState()){var i=jQuery.extend(true,[],this.getInitialColumnState()),t=this;if(!!this._mColumnCaptions){i.forEach(function(c){c.text=t._mColumnCaptions[c.id]})}this._oP13nModel.getData().aColumns=i;this._oP13nModel.getData().aHeaders[0].visible=!this.getInitialColumnState().some(function(c){return!c.visible});this._oP13nModel.updateBindings()}};
sap.m.TablePersoDialog.prototype._moveItem=function(d){var s=this._oList.getSelectedItem();if(!s)return;var D=this._oP13nModel.getData();var i=s.getBindingContext("Personalization").getPath().split("/").pop()*1;var a=i+d;if(a<0||a>=D.aColumns.length)return;var t=D.aColumns[a];D.aColumns[a]=D.aColumns[i];D.aColumns[a].order=a;D.aColumns[i]=t;D.aColumns[i].order=i;this._oList.removeSelections(true);this._oP13nModel.updateBindings();var S=this._oList.getItems()[a];this._oList.setSelectedItem(S,true);sap.ui.getCore().applyChanges();if(!!S.getDomRef()){var e=S.$().position().top,m=18,v=this._oScrollContainer.$().height(),V=this._oScrollContainer.$().offset().top-this._oList.$().offset().top,b=V+v;if(e<V){this._oScrollContainer.scrollTo(0,Math.max(0,V-v+m))}else if(e+m>b){this._oScrollContainer.scrollTo(0,e)}}this._fnUpdateArrowButtons.call(this)};
sap.m.TablePersoDialog.prototype._readCurrentSettingsFromTable=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor()),a=this,c=this.getColumnInfoCallback().call(this,t,this.getPersoMap(),this.getPersoService());this._oP13nModel.setData({aColumns:c,aHeaders:[{text:this._oRb.getText("PERSODIALOG_SELECT_ALL"),visible:!c.some(function(C){return!C.visible}),id:this.getId()+'_SelectAll'}]});this._mColumnCaptions={};c.forEach(function(C){a._mColumnCaptions[C.id]=C.text})};
sap.m.TablePersoDialog.prototype._executeSearch=function(){var v=this._oSearchField.getValue(),f=new sap.ui.model.Filter("text",sap.ui.model.FilterOperator.Contains,v),b=this._oList.getBinding("items");this._oSelectAllToolbar.setVisible(!v&&this.getShowSelectAll());b.filter([f]);this._fnUpdateArrowButtons.call(this);return this};
sap.m.TablePersoDialog.prototype.setHasGrouping=function(h){this.setProperty("hasGrouping",h,true);var b=this._oDialog.getSubHeader();if(!h){if(b.getContent().length===1){b.insertContent(this._oButtonDown,0);b.insertContent(this._oButtonUp,0)}}else{b.removeContent(this._oButtonUp);b.removeContent(this._oButtonDown)}return this};
sap.m.TablePersoDialog.prototype.setShowSelectAll=function(s){this.setProperty("showSelectAll",s,true);this._oSelectAllToolbar.setVisible(s);this._fnHandleResize.call(this);return this};
sap.m.TablePersoDialog.prototype.setShowResetAll=function(s){this.setProperty("showResetAll",s,true);this._resetAllButton.setVisible(s);return this};
