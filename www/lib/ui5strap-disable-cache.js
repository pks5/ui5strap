//This Hack allows to disable the Browser Cache completely.
		   var oldCreateElement = document.createElement;
		   document.createElement = function(){
    	   
    		   if(window.jQuery
    			&& !jQuery.ui5strapDisableCache
    			  && jQuery.sap 
    			   && jQuery.sap.includeStyleSheet 
    			   && jQuery.sap.includeScript
    			   && jQuery.sap._loadJSResourceAsync){
    			   
    			   jQuery.ajaxSetup({
                       data: {
                           "ui5strap-version": Math.random()
                       }
                    });
    			   var oldIncludeStyleSheet = jQuery.sap.includeStyleSheet;
    			   jQuery.sap.includeStyleSheet = function(vUrl, sId, fnLoadCallback, fnErrorCallback){
    				    var cUrl = vUrl;
                       
                       if(typeof vUrl === 'object'){
                           cUrl = vUrl.url;
                       }
                       
                       cUrl += (cUrl.indexOf("?") === -1 ? "?" : "&") + "ui5strap-app-version=" + Math.random();
                       
                       if(typeof vUrl === 'object'){
                           vUrl.url = cUrl;
                       }
                       else{
                           vUrl = cUrl;
                       }
                       
    				   oldIncludeStyleSheet.call(jQuery.sap, vUrl, sId, fnLoadCallback, fnErrorCallback);
    			   };
    			   
    			   var oldIncludeScript = jQuery.sap.includeScript;
    			   
    			   jQuery.sap.includeScript = function(vUrl, sId, fnLoadCallback, fnErrorCallback){
    				    var cUrl = vUrl;
                       
                       if(typeof vUrl === 'object'){
                           cUrl = vUrl.url;
                       }
                       
                       cUrl += (cUrl.indexOf("?") === -1 ? "?" : "&") + "ui5strap-app-version=" + Math.random();
                       
                       if(typeof vUrl === 'object'){
                           vUrl.url = cUrl;
                       }
                       else{
                    	   vUrl = cUrl;
                       }
                       console.log("x",cUrl);
    				   oldIncludeScript.call(jQuery.sap, vUrl, sId, fnLoadCallback, fnErrorCallback);
    			   };
    			   
    			   
    			   var old_loadJSResourceAsync = jQuery.sap._loadJSResourceAsync;
    			   jQuery.sap._loadJSResourceAsync = function(sResource, bIgnoreErrors){
    				   sResource += (sResource.indexOf("?") === -1 ? "?" : "&") + "ui5strap-app-version=" + Math.random();
    				   old_loadJSResourceAsync.call(jQuery.sap, sResource, bIgnoreErrors);
    			   }
    			   
    			   console.log("T");
    			   jQuery.ui5strapDisableCache = true;
    		   }
    		   
    		    return oldCreateElement.apply(document, arguments);
    	   };