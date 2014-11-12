/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.MenuItemBase");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.unified.MenuItemBase",{metadata:{library:"sap.ui.unified",properties:{"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Behavior",defaultValue:true},"startsSection":{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"submenu",aggregations:{"submenu":{type:"sap.ui.unified.Menu",multiple:false}},events:{"select":{}}}});sap.ui.unified.MenuItemBase.M_EVENTS={'select':'select'};
sap.ui.unified.MenuItemBase.prototype.init=function(){};
sap.ui.unified.MenuItemBase.prototype.render=function(r,i,m){var a=r;a.write("<li");a.writeElementData(i);a.write("><div style=\"white-space:nowrap;display:inline-block;padding:1px;color:black;\" id=\""+this.getId()+"-txt\">");a.write(i.getId());if(this.getSubmenu()){a.write("&nbsp;&nbsp;->")}a.write("</div></li>")};
sap.ui.unified.MenuItemBase.prototype.hover=function(h,m){this.$("txt").attr("style",h?"white-space:nowrap;display:inline-block;padding:1px;color:red;":"white-space:nowrap;display:inline-block;padding:1px;color:black;")};
sap.ui.unified.MenuItemBase.prototype.onSubmenuToggle=function(o){this.$().toggleClass("sapUiMnuItmSubMnuOpen",o)};
sap.ui.unified.MenuItemBase.prototype.onAfterRendering=function(){};
sap.ui.unified.MenuItemBase.prototype.onmouseover=function(e){var p=this.getParent();if(p&&p instanceof sap.ui.unified.Menu&&this.getTooltip()instanceof sap.ui.core.TooltipBase){p.onmouseover(e)}};
