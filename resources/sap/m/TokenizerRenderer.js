/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.TokenizerRenderer");sap.m.TokenizerRenderer={};
sap.m.TokenizerRenderer.render=function(r,c){if(!c.getVisible()){return}r.write("<div tabindex=\"-1\"");r.writeControlData(c);r.addClass("sapMTokenizer");r.writeClasses();r.write(">");var C="class=\"sapMTokenizerScrollContainer\">";var s=" ";var i="id="+c.getId()+"-scrollContainer";r.write("<div"+s+i+s+C);sap.m.TokenizerRenderer._renderTokens(r,c);r.write("</div>");r.write("</div>")};
sap.m.TokenizerRenderer._renderTokens=function(r,c){var i,l,t;t=c.getTokens();l=t.length;for(i=0;i<l;i++){r.renderControl(t[i])}};
