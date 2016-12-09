sap.ui.define(['pks/ui5strap/core/ControlBase', './jquery.knob.min'], function(ControlBase){

    "use strict";
    
	//Define the Constructor
    var Knob = ControlBase.extend("com.ui5strap.apps.demoapp.controls.Knob", {
    
        metadata : {

            library : "com.ui5strap.apps.demoapp",
      
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
    	var $newKnob = this.$().find("." + this._getStyleClassPart("knob")).knob();
    	
    	if(this._$knob && $newKnob[0] !== this._$knob[0]){
    		this._$knob.remove();
    	}
    	
    	this._$knob = $newKnob;
    };
    
    KnobProto.exit = function(){
    	if(this._$knob){
    		this._$knob.remove();
    		this._$knob = null;
    	}
    };
    
    //return Constructor
    return Knob;

});