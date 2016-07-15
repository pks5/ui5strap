sap.ui.define(['jquery.sap.global'], function(jQuery) {

    "use strict";
    
	//A renderer is an ordinary JavaScript object
    var KnobRenderer = {};

    /*
    * A renderer needs to define a "render" method.
    */
    KnobRenderer.render = function(rm, oControl) {
        rm.write("<input");
        
        rm.writeControlData(oControl);
        
        rm.addClass(oControl._getStyleClass());
        rm.writeClasses();
        
        rm.writeAttribute("value", oControl.getValue());
        
        rm.write(">");
        
    };

    return KnobRenderer;
    
}, /* export */ true);