/*
 * 
 * UI5Strap
 *
 * ui5strap.RestService
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

    jQuery.sap.declare("ui5strap.RestService");

    jQuery.sap.require("ui5strap.AppComponent");

    ui5strap.AppComponent.extend("ui5strap.RestService");

    var RestService = ui5strap.RestService,
        RestServiceProto = RestService.prototype;

    /*
    * Parses a path and replaces {placeholder} with values of pathParam directory, if present.
    * @protected
    */
    RestServiceProto._parsePath = function(path, pathParam){
        pathParam = pathParam || {};
        return path.replace(/\{([a-zA-Z0-9]+)\}/g, function(m0, m1){
            return pathParam[m1] || "TT";
        });
    };

    /*
    * Determine the final request URL based on given options
    */
    RestServiceProto._determineRequestURL = function(options){
        return this.options.url + '/' + this._parsePath(options.path, options.pathParameters);
    };

    /*
    * GET Request with Query Parameters
    * @protected 
    */
    RestServiceProto._get = function(options){
        jQuery.ajax({
            data: options.queryParameters,
            dataType: 'json',
            processData: true,
            type: 'GET',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Query Parameters to a host
    * @protected
    */
    RestServiceProto._postQuery = function(options){
        jQuery.ajax({
            data: options.queryParameters,
            dataType: 'json',
            processData: true,
            type: 'POST',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Object / Payload to a host
    * @protected
    */
    RestServiceProto._postPayload = function(options){
        jQuery.ajax({
            contentType: 'application/json',
            data: JSON.stringify(options.payload),
            dataType: 'json',
            processData: false,
            type: 'POST',
            url: this._determineRequestURL(options),
            success : success,
            error : options.error
        });
    };

}());