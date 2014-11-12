/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ComboBoxBase");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.InputBase");sap.m.InputBase.extend("sap.m.ComboBoxBase",{metadata:{"abstract":true,publicMethods:["isOpen","close","getItemByKey","getFirstItem","getLastItem","getItemAt","getEnabledItems"],library:"sap.m",properties:{"maxWidth":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},"picker":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});jQuery.sap.require("sap.ui.core.EnabledPropagator");jQuery.sap.require("sap.m.ComboBoxBaseRenderer");jQuery.sap.require("sap.m.Bar");jQuery.sap.require("sap.m.List");jQuery.sap.require("sap.m.Popover");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle();sap.ui.core.EnabledPropagator.apply(sap.m.ComboBoxBase.prototype,[true]);
sap.m.ComboBoxBase.prototype._mapItemToListItem=function(i){if(!i){return null}var C=sap.m.ComboBoxBaseRenderer.CSS_CLASS,l=C+"Item",L=i.getEnabled()?"Enabled":"Disabled",s=(i===this.getSelectedItem())?l+"Selected":"";var o=new sap.m.StandardListItem().addStyleClass(l+" "+l+L+" "+s);o.setTitle(i.getText());o.setType(i.getEnabled()?sap.m.ListType.Active:sap.m.ListType.Inactive);o.setTooltip(i.getTooltip());i.data(C+"ListItem",o);return o};
sap.m.ComboBoxBase.prototype._findMappedItem=function(l,I){for(var i=0,I=I||this.getItems(),a=I.length;i<a;i++){if(I[i].data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"ListItem")===l){return I[i]}}return null};
sap.m.ComboBoxBase.prototype._fillList=function(I){var s=this.getSelectedItem();for(var i=0,l,o;i<I.length;i++){o=I[i];l=this._mapItemToListItem(o);this.getList().addAggregation("items",l,true);if(o===s){this.getList().setSelectedItem(l,true)}}};
sap.m.ComboBoxBase.prototype._clearList=function(){if(this.getList()){this.getList().destroyAggregation("items",true)}};
sap.m.ComboBoxBase.prototype.getList=function(){return this._oList};
sap.m.ComboBoxBase.prototype.init=function(){sap.m.InputBase.prototype.init.apply(this,arguments);this.setPickerType("Popover");this.createList()};
sap.m.ComboBoxBase.prototype.exit=function(){sap.m.InputBase.prototype.exit.apply(this,arguments);if(this.getList()){this.getList().destroy();this._oList=null}};
sap.m.ComboBoxBase.prototype.ontouchstart=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();if(this.isOpenArea(e.target)){this.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed")}};
sap.m.ComboBoxBase.prototype.ontouchend=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();if((!this.isOpen()||!this.hasContent())&&this.isOpenArea(e.target)){this.removeStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed")}};
sap.m.ComboBoxBase.prototype.ontap=function(e){var C=sap.m.ComboBoxBaseRenderer.CSS_CLASS;if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(C+"Pressed");return}if(this.hasContent()){this.open()}}if(this.isOpen()){this.addStyleClass(C+"Pressed")}};
sap.m.ComboBoxBase.prototype.onsapshow=function(e){if(!this.getEnabled()||!this.getEditable()){return}e.setMarked();if(e.keyCode===jQuery.sap.KeyCodes.F4){e.preventDefault()}if(this.isOpen()){this.close();return}this.selectText(0,this.getValue().length);if(this.hasContent()){this.open()}};
sap.m.ComboBoxBase.prototype.onsapescape=function(e){if(this.getEnabled()&&this.getEditable()&&this.isOpen()){e.setMarked();e.preventDefault();this.close()}else{sap.m.InputBase.prototype.onsapescape.apply(this,arguments)}};
sap.m.ComboBoxBase.prototype.onsaphide=sap.m.ComboBoxBase.prototype.onsapshow;
sap.m.ComboBoxBase.prototype.addContent=function(p){};
sap.m.ComboBoxBase.prototype.setPickerType=function(p){this._sPickerType=p};
sap.m.ComboBoxBase.prototype.getPickerType=function(){return this._sPickerType};
sap.m.ComboBoxBase.prototype.createPicker=function(){};
sap.m.ComboBoxBase.prototype.getPicker=function(){if(this.bIsDestroyed){return null}return this.createPicker(this.getPickerType())};
sap.m.ComboBoxBase.prototype.hasContent=function(){return!!this.getItems().length};
sap.m.ComboBoxBase.prototype.findFirstEnabledItem=function(I){var I=I||this.getItems();for(var i=0;i<I.length;i++){if(I[i].getEnabled()){return I[i]}}return null};
sap.m.ComboBoxBase.prototype.findLastEnabledItem=function(i){var i=i||this.getItems();return this.findFirstEnabledItem(i.reverse())};
sap.m.ComboBoxBase.prototype.open=function(){var p=this.getPicker();if(p){p.open()}return this};
sap.m.ComboBoxBase.prototype.getVisibleItems=function(){return this.getItems().filter(function(i){var l=i.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"ListItem");return l&&l.getVisible()})};
sap.m.ComboBoxBase.prototype.isItemSelected=function(){};
sap.m.ComboBoxBase.prototype.getKeys=function(I){for(var i=0,k=[],I=I||this.getItems();i<I.length;i++){k[i]=I[i].getKey()}return k};
sap.m.ComboBoxBase.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems())};
sap.m.ComboBoxBase.prototype.getOpenArea=function(){return this.getDomRef("arrow")};
sap.m.ComboBoxBase.prototype.isOpenArea=function(d){var o=this.getOpenArea();return o&&o.contains(d)};
sap.m.ComboBoxBase.prototype.findItem=function(p,v){var m="get"+p.charAt(0).toUpperCase()+p.slice(1);for(var i=0,I=this.getItems();i<I.length;i++){if(I[i][m]()===v){return I[i]}}return null};
sap.m.ComboBoxBase.prototype.getItemByText=function(t){return this.findItem("text",t)};
sap.m.ComboBoxBase.prototype.scrollToItem=function(l){var p=this.getPicker(),P=p.$().children(".sapMPopoverCont")[0],L=l&&l.getDomRef();if(!p||!P||!L){return}var i=P.scrollTop,a=L.offsetTop,b=jQuery(P).height(),c=jQuery(L).height();if(i>a){P.scrollTop=a}else if((a+c)>(i+b)){P.scrollTop=Math.ceil(a+c-b)}};
sap.m.ComboBoxBase.prototype.clearFilter=function(){var C=sap.m.ComboBoxBaseRenderer.CSS_CLASS;for(var i=0,l,I=this.getItems();i<I.length;i++){l=I[i].data(C+"ListItem");l.setVisible(true)}};
sap.m.ComboBoxBase.prototype.clearSelection=function(){};
sap.m.ComboBoxBase.prototype.getValue=function(){var d=this.getFocusDomRef();if(d){return d.value}return this.getProperty("value")};
sap.m.ComboBoxBase.prototype.addItem=function(i){this.addAggregation("items",i);if(this.getList()){this.getList().addItem(this._mapItemToListItem(i))}return this};
sap.m.ComboBoxBase.prototype.insertItem=function(i,I){this.insertAggregation("items",i,I);if(this.getList()){this.getList().insertItem(this._mapItemToListItem(i),I)}return this};
sap.m.ComboBoxBase.prototype.getItemAt=function(i){return this.getItems()[+i]||null};
sap.m.ComboBoxBase.prototype.getFirstItem=function(){return this.getItems()[0]||null};
sap.m.ComboBoxBase.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null};
sap.m.ComboBoxBase.prototype.getEnabledItems=function(i){i=i||this.getItems();return i.filter(function(I){return I.getEnabled()})};
sap.m.ComboBoxBase.prototype.getItemByKey=function(k){return this.findItem("key",k)};
sap.m.ComboBoxBase.prototype.isOpen=function(){var p=this.getAggregation("picker");return!!(p&&p.isOpen())};
sap.m.ComboBoxBase.prototype.close=function(){var p=this.getAggregation("picker");if(p){p.close()}return this};
sap.m.ComboBoxBase.prototype.removeItem=function(i){var C=sap.m.ComboBoxBaseRenderer.CSS_CLASS;i=this.removeAggregation("items",i);if(this.getList()){this.getList().removeItem(i&&i.data(C+"ListItem"))}return i};
sap.m.ComboBoxBase.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.clearSelection();if(this.getList()){this.getList().removeAllItems()}return i};
sap.m.ComboBoxBase.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems()}return this};
