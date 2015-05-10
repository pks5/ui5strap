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

(function(){

    jQuery.sap.declare("ui5strap.RestClient");

    jQuery.sap.require("ui5strap.AppComponent");

    ui5strap.AppComponent.extend("ui5strap.RestClient");

    var RestClient = ui5strap.RestClient,
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
    
    /*
    * Parses a path and replaces {placeholder} with values of pathParam directory, if present.
    * @protected
    */
    RestClientProto._parsePath = function(path, pathParam){
        pathParam = pathParam || {};
        return path.replace(/\{([a-zA-Z0-9]+)\}/g, function(m0, m1){
            return pathParam[m1];
        });
    };

    /*
    * Determine the final request URL based on given options
    */
    RestClientProto._determineRequestURL = function(options){
        var urlBase = this.options.url;
        return (jQuery.sap.endsWith(urlBase, "/") ? urlBase : urlBase + '/') + this._parsePath(options.path, options.pathParameters);
    };

    /*
    * GET Request with Query Parameters
    * @protected 
    */
    RestClientProto._get = function(options){
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        jQuery.ajax({
            data: options.queryParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'GET',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Url Encoded Parameters
    * @protected
    * @deprecated Use _postUrlEncoded instead
    */
    RestClientProto._postQuery = function(options){
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        jQuery.ajax({
            data: options.queryParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'POST',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Query Parameters to a host
    * @protected
    */
    RestClientProto._postUrlEncoded = function(options){
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
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
            success : options.success,
            error : options.error
        });
    };

    /**
    * POST Object
    * @protected
    */
    RestClientProto._postWithPayload = function(options){
        if(!options.requestContentType){
            options.requestContentType = RestClient.CONTENT_TYPE_JSON + '; charset=' + RestClient.CHARSET_UTF8;
        }

        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        jQuery.ajax({
            contentType: options.requestContentType,
            data: JSON.stringify(options.payload),
            dataType: options.responseDataType,
            processData: false,
            type: 'POST',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Object / Payload to a host
    * @protected
    * @deprecated
    */
    RestClientProto._postPayload = function(options){
        jQuery.sap.log.warning('RestClient.prototype._postPayload is deprecated. Please use _postObject instead.');
        return this._postObject(options);
    };

}());