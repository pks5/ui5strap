(function(){

  //Declare the library
  jQuery.sap.declare("tld__domain.shared__lib.library");
  
  //Require the core
  jQuery.sap.require("sap.ui.core.Core");

  //Register the library
  sap.ui.getCore().initLibrary({
        name : "tld__domain.shared__lib",
        dependencies : [],
        types: [],
        interfaces: [],
        controls: [
            "tld__domain.shared__lib.Clock"
        ],
        elements: [],
        version: "0.2.0"
  });

}());