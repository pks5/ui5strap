sap.ui.define(['jquery.sap.global'], function(jQuery) {

    "use strict";
    
	//A renderer is an ordinary JavaScript object
    var KnobRenderer = {
    		rev : 0
    };

    /*
    * A renderer needs to define a "render" method.
    */
    KnobRenderer.render = function(rm, oControl) {
    	this.rev ++;
    	console.log("R", this.rev);
    	rm.write("<div");
        
        rm.writeControlData(oControl);
        
        rm.addClass(oControl._getStyleClass());
        rm.writeClasses();
        
        rm.writeAttribute("data-rev", this.rev);
        
        rm.write(">");
        
        rm.write("<input class='" + oControl._getStyleClassPart("knob") + "'");
        rm.writeAttribute("value", oControl.getValue());
        rm.write(">");
        
        rm.write("</div>");
    };

    return KnobRenderer;
    
}, /* export */ true);