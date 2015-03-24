/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputRenderer','sap/ui/core/Renderer'],function(q,I,R){"use strict";var M=R.extend(I);M.openInputTag=function(r,c){r.write("<div id=\""+c.getId()+"-border\" class=\"sapMMultiInputBorder\">");M._renderTokens(r,c);M._renderInput(r,c)};M._renderTokens=function(r,c){r.renderControl(c._tokenizer)};M._renderInput=function(r,c){r.write("<div class=\"sapMMultiInputInputContainer\">");I.openInputTag.call(this,r,c)};M.closeInputTag=function(r,c){I.closeInputTag.call(this,r,c);r.write("</div>");r.write("</div>");r.write("<div class=\"sapMMultiInputShadowDiv\"/>")};return M},true);
