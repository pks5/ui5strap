/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool','sap/ui/core/Renderer','./TableRenderer'],function(q,I,R,T){"use strict";var A=R.extend(T);A.writeRowSelectorContent=function(r,t,o,i){T.writeRowSelectorContent(r,t,o,i);r.write("<div");r.writeAttribute("id",o.getId()+"-groupHeader");r.writeAttribute("class","sapUiTableGroupIcon");r.write("></div>");if('ontouchstart'in document){var a=I.getIconInfo("sap-icon://drop-down-list");r.write("<div class='sapUiTableGroupMenuButton'>");r.writeEscaped(a.content);r.write("</div>");}};return A;},true);
