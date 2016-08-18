/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','./TableRenderer'],function(q,R,T){"use strict";var a=R.extend(T);a.renderTableCellControl=function(r,t,c,C){if(t.isTreeBinding("rows")&&C===0&&!t.getUseGroupMode()){var o=c.getParent();r.write("<span");r.addClass("sapUiTableTreeIcon");r.addClass(c.getParent()._sTreeIconClass);r.writeClasses();var l=t._getLevelIndentCSS(o);if(l){r.addStyle.apply(r,l);r.writeStyles();}r.writeAttribute("tabindex",-1);t._getAccRenderExtension().writeAriaAttributesFor(r,t,"TREEICON",{row:o});r.write(">&nbsp;</span>");}r.renderControl(c);};return a;},true);
