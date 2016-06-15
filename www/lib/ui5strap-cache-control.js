//This Hack allows to disable the Browser Cache completely.
(function() {

	var oldCreateElement = document.createElement;
	document.createElement = function() {

		if (window.jQuery && jQuery.sap && jQuery.sap.includeStyleSheet
				&& jQuery.sap.includeScript && jQuery.sap._loadJSResourceAsync) {
			
			var randomString = function randString(x){
			    var s = "";
			    while(s.length<x&&x>0){
			        var r = Math.random();
			        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
			    }
			    return s;
			};
			
			var version = document.getElementById("ui5strap-cache-control").getAttribute("data-ui5strap-cache-version");
			if(!version || version == "RANDOM"){
				version = randomString(8);
			}
			
			var paramName = "__v",
				ajaxGlobalData = {};
			
			ajaxGlobalData[paramName] = version;
			
			//Ajax Requests
			jQuery.ajaxSetup({
				data : ajaxGlobalData
			});
			
			//Include Style Sheet
			var oldIncludeStyleSheet = jQuery.sap.includeStyleSheet;
			jQuery.sap.includeStyleSheet = function(vUrl, sId, fnLoadCallback,
					fnErrorCallback) {
				var cUrl = vUrl;

				if (typeof vUrl === 'object') {
					cUrl = vUrl.url;
				}

				cUrl += (cUrl.indexOf("?") === -1 ? "?" : "&")
						+ paramName + "=" + version;

				if (typeof vUrl === 'object') {
					vUrl.url = cUrl;
				} else {
					vUrl = cUrl;
				}

				oldIncludeStyleSheet.call(jQuery.sap, vUrl, sId,
						fnLoadCallback, fnErrorCallback);
			};

			//Include Script
			var oldIncludeScript = jQuery.sap.includeScript;
			jQuery.sap.includeScript = function(vUrl, sId, fnLoadCallback,
					fnErrorCallback) {
				var cUrl = vUrl;

				if (typeof vUrl === 'object') {
					cUrl = vUrl.url;
				}

				cUrl += (cUrl.indexOf("?") === -1 ? "?" : "&")
						+ paramName + "=" + version;

				if (typeof vUrl === 'object') {
					vUrl.url = cUrl;
				} else {
					vUrl = cUrl;
				}
				console.log("x", cUrl);
				oldIncludeScript.call(jQuery.sap, vUrl, sId, fnLoadCallback,
						fnErrorCallback);
			};

			//Load JS Resource Async
			//ATTENTION: This method is experimental. 
			//This means this code can stop working in future UI5 Versions.
			var old_loadJSResourceAsync = jQuery.sap._loadJSResourceAsync;
			jQuery.sap._loadJSResourceAsync = function(sResource, bIgnoreErrors) {
				sResource += (sResource.indexOf("?") === -1 ? "?" : "&")
						+ paramName + "=" + version;
				old_loadJSResourceAsync.call(jQuery.sap, sResource,
						bIgnoreErrors);
			}

			//Set back to original create Element function.
			document.createElement = oldCreateElement;
		}

		return oldCreateElement.apply(document, arguments);
	};

}());