sap.ui.define(['jquery.sap.global'], function(jQuery) {

    "use strict";
    
	//A renderer is an ordinary JavaScript object
    var YouTubeVideoRenderer = {};

    /*
    * A renderer needs to define a "render" method.
    */
    YouTubeVideoRenderer.render = function(rm, oControl) {
        //Container div
        rm.write("<div");
        rm.writeControlData(oControl);
        rm.addClass(oControl._getStyleClass());
        rm.writeClasses();
        rm.write(">");

        rm.write("<iframe");
        
        rm.writeAttribute("width", oControl.getWidth());
        rm.writeAttribute("height", oControl.getHeight());
        
        rm.writeAttribute("src", "http://www.youtube.com/embed/" + oControl.getYouTubeId());
        rm.write(">");

        
        rm.write("</iframe>");

        //End Container div
        rm.write("</div>");
    };

    return YouTubeVideoRenderer;
    
}, /* export */ true);