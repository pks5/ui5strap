/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBaseRenderer','sap/ui/core/Renderer'],function(q,L,R){"use strict";var G=R.extend(L);G.renderLIAttributes=function(r,l){r.addClass("sapMGHLI");if(l.getUpperCase()){r.addClass("sapMGHLIUpperCase")}};G.renderLIContent=function(r,l,t){var T=l.getTitle();t&&r.write("<td class='sapMGHLICell' colspan='"+(t.getColSpan())+"'>");if(T){t&&r.write("<div class='sapMLIBContent sapMLIBContentMargin'>");r.write("<label for='"+l.getId()+"-value' class='sapMGHLITitle'>");r.writeEscaped(T);var c=l.getCount();if(c!==undefined&&c!==""){r.writeEscaped(" ("+c+")")}r.write("</label>");t&&r.write("</div>")}t&&r.write("</td>")};return G},true);
