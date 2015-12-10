/*
 * 
 * UI5Strap
 *
 * ui5strap.ODataClient
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

sap.ui.define(['./library', './RestClient'], function(library, RestClient){

	var ODataClient = RestClient.extend("ui5strap.ODataClient"),
		ODataClientProto = ODataClient.prototype;
    
    ODataClientProto.init = function(){
        ui5strap.RestClient.prototype.init.call(this);

        this._initModel();
    };

    ODataClientProto._initModel = function(){
        var oModel = new sap.ui.model.odata.ODataModel(this.options.url + "eventdata.xsodata", true);

        oModel.attachRequestFailed(null, function(){
            throw new Error('OModel request failed!');
        });

        oModel.attachParseError(null, function(){
            throw new Error('OModel parse error!');
        });

        this._oModel = oModel;
    };

    ODataClientProto.getModel = function(){
        return this._oModel;
    };

    ODataClientProto.navigate = function(path, callback){
        //jQuery.sap.log.debug('Navigate binding context...');

        var _this = this;
        this._oModel.createBindingContext(path, null, null, function(context){
            _this._navigationContext = context;
            callback && callback(context);
        });
    };

    ODataClientProto.getNavigationContext = function(){
        return this._navigationContext;
    };

    ODataClientProto._read = function(options){
        this._oModel.read(this._parsePath(options.path, options.pathParameters), {
            "urlParameters" : options.queryParameters,
            "context" : options.context,
            "success" : options.success,
            "error" : options.error
        });
    };
    
    //Return Module Constructor
	return ODataClient;
});