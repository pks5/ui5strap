/*
 * 
 * UI5Strap
 *
 * ui5strap.RestClient
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

sap.ui.define(['./library', './AppComponent'], function(library, AppComponent){

	var RestClient = AppComponent.extend("ui5strap.RestClient", {
		"constructor" : function(app, options){
			AppComponent.call(this, app, options);
			
			this._createMethods();
		}
	}),
	RestClientProto = RestClient.prototype;

    RestClient.CONTENT_TYPE_TEXT = 'text/plain';
    RestClient.CONTENT_TYPE_XML = 'application/xml';
    RestClient.CONTENT_TYPE_JSON = 'application/json';
    RestClient.CONTENT_TYPE_FORM_URL_ENCODED = 'application/x-www-form-urlencoded';
    RestClient.CONTENT_TYPE_FORM_MULTIPART = 'multipart/form-data';

    RestClient.CHARSET_UTF8 = 'UTF-8';

    RestClient.RESPONSE_DATA_TYPE_TEXT = 'text';
    RestClient.RESPONSE_DATA_TYPE_HTML = 'html';
    RestClient.RESPONSE_DATA_TYPE_SCRIPT = 'script';
    RestClient.RESPONSE_DATA_TYPE_JSON = 'json';
    RestClient.RESPONSE_DATA_TYPE_JSONP = 'jsonp';
    RestClient.RESPONSE_DATA_TYPE_XML = 'xml';
    
    RestClientProto._createMethods = function(){
    	var methodsSettings = this.options.methods;
    	if(!methodsSettings){
    		return;
    	}
    	
    	var _this = this,
    		methods = Object.keys(methodsSettings),
    		methodsLength = methods.length;
    	
    	for(var i = 0; i < methodsLength; i++){
    		(function(){
	    		var methodName = methods[i],
	    			methodData = methodsSettings[methodName],
	    			methodType = methodData.type;
	    		
	    		if(!methodData.path){
	    			methodData.path = jQuery.sap.hyphen(methodName);
	    		}
	    		
	    		if(!methodType){
	    			return;
	    		}
	    		
	    		var param = jQuery.extend({}, methodData);
	    		
	    		//Delete provided type
	    		delete param.type;
	    		
	    		if(methodType === "get"){
	    			_this[methodName] = function(){
	    				return this._get(this._buildParam(param, arguments));
	    			};
	    		}
	    		else if(methodType === "postWithPayload"){
	    			_this[methodName] = function(){
	    				return this._postWithPayload(this._buildParam(param, arguments));
	    			};
	    		}
	    		else if(methodType === "postUrlEncoded"){
	    			_this[methodName] = function(){
	    				return this._postUrlEncoded(this._buildParam(param, arguments));
	    			};
	    		}
	    		
    		}());
    	}
    	
    };
    
    /**
     * @Protected
     */
    RestClientProto._buildParam = function(param, args){
    	if(!param.arguments){
    		return param;
    	}
    	
    	for(var j=0; j<param.arguments.length; j++){
			var p = param.arguments[j].split("."),
				key = p[0];
    		
    		if(key === "path"){
    			if(!param.pathParameters){
    				param.pathParameters = {};
    			}
    			param.pathParameters[p[1]] = args[j];
    		}
    		else if(key === "query"){
    			if(!param.queryParameters){
    				param.queryParameters = {};
    			}
    			param.queryParameters[p[1]] = args[j];
    		}
    		else if(key === "post"){
    			if(!param.postParameters){
    				param.postParameters = {};
    			}
    			param.postParameters[p[1]] = args[j];
    		}
    		else if(key === "payload"){
    			param.payload = args[j];
    		}
    		else if(key === "success"){
    			param.success = args[j];
    		}
    		else if(key === "error"){
    			param.error = args[j];
    		}
		}
    	
    	return param;
    };
    
    /**
    * Parses a path and replaces {placeholder} with values of pathParam directory, if present.
    * @protected
    */
    RestClientProto._parsePath = function(path, pathParam){
        pathParam = pathParam || {};
        return path.replace(/\{([a-zA-Z0-9]+)\}/g, function(m0, m1){
            return pathParam[m1];
        });
    };

    /**
    * Determine the final request URL based on given options
    * @protected
    */
    RestClientProto._determineRequestURL = function(options){
    	var urlBase = this.options.url,
    		requestUrl = this._parsePath(options.path, options.pathParameters);
    	
    	if(urlBase){
    		if(urlBase.charAt(urlBase.length - 1) !== "/" && requestUrl.charAt(0) !== "/"){
    			urlBase += "/";
    		}
    		
    		requestUrl = urlBase + requestUrl;
    	}
    	
		return this.app.config.resolvePath(requestUrl, false);
    };
    
    /**
     * Global beforeSend
     */
    RestClientProto._beforeSend = function(xhr, options){
    	
    };
    
    /**
     * Global request headers
     */
    RestClientProto._requestHeaders = function(options){
    	return {};
    };
    
    /**
    * GET Request with Query Parameters
    * @protected 
    */
    RestClientProto._get = function(options){
    	var _this = this;
    	
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }
        
        var requestHeaders = this._requestHeaders(options);
        
        if(options.requestHeaders){
        	jQuery.extend(requestHeaders, options.requestHeaders);
        }

        jQuery.ajax({
            data: options.queryParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'GET',
            url: this._determineRequestURL(options),
            headers : requestHeaders,
            beforeSend: function (xhr) {
            	_this._beforeSend(xhr, options);
            },
            success : options.success,
            error : options.error
        });
    };

    /**
    * POST Form URL encoded
    * @protected
    */
    RestClientProto._postUrlEncoded = function(options){
    	var _this = this;
    	
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }
        
        var requestHeaders = this._requestHeaders(options);
        
        if(options.requestHeaders){
        	jQuery.extend(requestHeaders, options.requestHeaders);
        }

        var postUrl = this._determineRequestURL(options);

        if(options.queryParameters){
            postUrl += '?' + (-1 === postUrl.indexOf('?') ? '?' : '&') + jQuery.param(options.queryParameters);
        }

        jQuery.ajax({
            data: options.postParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'POST',
            url: postUrl,
            headers : requestHeaders,
            beforeSend: function (xhr) {
            	_this._beforeSend(xhr, options);
            },
            success : options.success,
            error : options.error
        });
    };

    /**
    * POST Object as JSON
    * @protected
    */
    RestClientProto._postWithPayload = function(options){
    	var _this = this;
    	
    	if(!options.requestContentType){
            options.requestContentType = RestClient.CONTENT_TYPE_JSON + '; charset=' + RestClient.CHARSET_UTF8;
        }

        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }
        
        var requestHeaders = this._requestHeaders(options);
        
        if(options.requestHeaders){
        	jQuery.extend(requestHeaders, options.requestHeaders);
        }
        
        var postUrl = this._determineRequestURL(options);

        if(options.queryParameters){
            postUrl += '?' + (-1 === postUrl.indexOf('?') ? '?' : '&') + jQuery.param(options.queryParameters);
        }

        jQuery.ajax({
            contentType: options.requestContentType,
            data: JSON.stringify(options.payload),
            dataType: options.responseDataType,
            processData: false,
            type: 'POST',
            url: postUrl,
            headers : requestHeaders,
            beforeSend: function (xhr) {
            	_this._beforeSend(xhr, options);
            },
            success : options.success,
            error : options.error
        });
    };

    //Return Module Constructor
    return RestClient;
});