sap.ui.define(['ui5strap/ControlBase', './jquery.knob.min'], function(ControlBase){

    "use strict";
    
	//Define the Constructor
    var Knob = ControlBase.extend("com.ui5strap.apps.demoapp.controls.Knob", {
    
        metadata : {

            library : "tld.mydomain.myapp",
      
            properties : {
            	
            	value : {
            		type : "int",
            		defaultValue : 0
            	}
            	
            },
      
            aggregations : {},
            
            events : {}

        }
    }),
    KnobProto = Knob.prototype;

    KnobProto._getStyleClassPrefix = function(){
        //You should specifiy a really unique prefix here.
        return "knob";
    };
    
    KnobProto.onAfterRendering = function(){
    	this.$().knob();
    };
    
    //return Constructor
    return Knob;

});