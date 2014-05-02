/*
 * 
 * UI5Strap
 *
 * Page Header Renderer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

    jQuery.sap.declare("ui5strap.PageHeaderRenderer");

    ui5strap.PageHeaderRenderer = {};

    ui5strap.PageHeaderRenderer.render = function(rm, oControl) {
        var lead = oControl.getLead();

        rm.write("<div");
        rm.writeControlData(oControl);
        rm.addClass("page-header");
        rm.writeClasses();
        rm.write(">");
        
        rm.write("<h1>");
        
        rm.writeEscaped(oControl.getText());
        
        var subText = oControl.getSubText();
        if('' !== subText){
        	rm.write("<small>");
        	rm.writeEscaped(subText);
        	rm.write("</small>");
        }
        
        rm.write("</h1>");
        
        if('' !== lead){
             rm.write("<p class='lead'>")
             rm.writeEscaped(lead);
             rm.write('</p>');
        }
        
        rm.write("</div>");

        
    };

}());