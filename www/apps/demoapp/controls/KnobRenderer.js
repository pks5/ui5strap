sap.ui.define(['jquery.sap.global'], function(jQuery) {

    "use strict";
    
	//A renderer is an ordinary JavaScript object
    var KnobRenderer = {};

    /*
    * A renderer needs to define a "render" method.
    */
    KnobRenderer.render = function(rm, oControl) {
        rm.write("<div");
        
        rm.writeControlData(oControl);
        
        rm.addClass(oControl._getStyleClass());
        rm.writeClasses();
        rm.write(">");
        
        rm.write("<input id='" + oControl._getIdPart('knob') + "'");
        rm.writeAttribute("value", oControl.getValue());
        rm.write(">");
        
        rm.write("</div>");
        
    };

    return KnobRenderer;
    
}, /* export */ true);