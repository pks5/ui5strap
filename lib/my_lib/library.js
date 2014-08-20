var jQuerySap = jQuery.sap;

	jQuery.sap.declare("my_lib.library");
	jQuery.sap.require("sap.ui.core.Core");
	
  //Register Ui5Strap as library
	sap.ui.getCore().initLibrary(
      {
      	  name : "my_lib",
      	  dependencies : [],
      	  types: [
      	  	
      	  ],
      	  interfaces: [],
      	  controls: [
                  "my_lib.Clock"
              ],
      	  elements: [],
        	  version: "0.1.0"
      }
  );