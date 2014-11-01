/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.RatingIndicatorRenderer");
sap.ui.commons.RatingIndicatorRenderer=function(){};
sap.ui.commons.RatingIndicatorRenderer.render=function(r,R){var a=r;if(!R.getVisible()){return}var n=R.getMaxValue();a.write("<div");a.writeControlData(R);a.addClass("sapUiRating");if(R.getEditable()){a.addClass("sapUiRatingEdit")}a.writeClasses();a.writeAttribute("tabindex","0");if(R.getTooltip()&&R.getTooltip_AsString()){a.writeAttributeEscaped("title",R.getTooltip_AsString())}else if(!R.getEditable()){a.writeAttribute("title",R._getDisplayValue())}a.writeAccessibilityState(R,{"role":"slider","orientation":"horizontal","valuemin":1,"valuemax":n,"disabled":!R.getEditable(),"live":"assertive"});a.write(">");for(var i=0;i<n;i++){sap.ui.commons.RatingIndicatorRenderer.renderItem(a,R,i,R._getDisplayValue())}a.write("</div>")};
sap.ui.commons.RatingIndicatorRenderer.renderItem=function(r,R,i,v){var a=i+1;r.write("<div");r.writeAttribute("id",R.getId()+"-itm-"+a);r.writeAttribute("itemvalue",a);r.writeAttribute("class","sapUiRatingItm");r.writeAttribute("style","line-height:0px;");if(!R.getTooltip()&&R.getEditable()){r.writeAttributeEscaped("title",R._getText("RATING_TOOLTIP",[a,R.getMaxValue()]))}r.write(">");r.write("<img");r.writeAttribute("class","sapUiRatingItmImg");var I=sap.ui.commons.RatingIndicatorRenderer.getThemeSymbol("selected",R);r.writeAttributeEscaped("src",I);r.write("/>");r.write("<div");r.writeAttribute("class","sapUiRatingItmOvrflw");var b=R.getVisualMode();if(b=="Full"){v=Math.round(v)}var s;if(v>=a){s="width:0%;"}else if(v<i){s="width:100%;"}else{var d=v-i;if(b=="Half"){var w=50;if(d<0.25){w=100}if(d>=0.75){w=0}s="width:"+w+"%;"}else{s="width:"+(100-Math.round(d*100))+"%;"}}r.writeAttribute("style",s);r.write(">");r.write("<img");r.writeAttribute("class","sapUiRatingItmOvrflwImg");I=sap.ui.commons.RatingIndicatorRenderer.getThemeSymbol("unselected",R);r.writeAttributeEscaped("src",I);r.write("/>");r.write("</div>");r.write("</div>")};
sap.ui.commons.RatingIndicatorRenderer.hoverRatingSymbol=function(c,r,a){var s=jQuery.sap.byId(r.getId()+"-itm-"+c);s.addClass("sapUiRatingItmHov");var S=s.children("img");var i=sap.ui.commons.RatingIndicatorRenderer.getThemeSymbol(a?"unselected":"hover",r);S.attr("src",i)};
sap.ui.commons.RatingIndicatorRenderer.unhoverRatingSymbol=function(c,r){var s=jQuery.sap.byId(r.getId()+"-itm-"+c);s.removeClass("sapUiRatingItmHov");var S=s.children("img");var i=sap.ui.commons.RatingIndicatorRenderer.getThemeSymbol("selected",r);S.attr("src",i)};
sap.ui.commons.RatingIndicatorRenderer.getThemeSymbol=function(t,r){var i,p;if(t=="selected"){i=r.getIconSelected();p="sap.ui.commons.RatingIndicator:sapUiRatingSymbolSelected"}else if(t=="unselected"){i=r.getIconUnselected();p="sap.ui.commons.RatingIndicator:sapUiRatingSymbolUnselected"}else{i=r.getIconHovered();p="sap.ui.commons.RatingIndicator:sapUiRatingSymbolHovered"}if(!i){var T="themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/"+sap.ui.core.theming.Parameters.get(p);i=sap.ui.resource("sap.ui.commons",T)}return i};
