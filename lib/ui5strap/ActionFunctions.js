/*
 * 
 * ui5strap.ActionFunctions
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */
 
(function ui5strapActionFunctions(){
	var ActionFunctions = {};

	ui5strap.ActionFunctions = ActionFunctions;

	ActionFunctions.set = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._setParameter(paramKey, arguments[paramKey]);
			this._log.debug("{set} '" + paramKey + "' = '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.copy = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._copyParameter(paramKey, arguments[paramKey]);
			this._log.debug("{copy} '" + paramKey + "' => '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.move = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._moveParameter(paramKey, arguments[paramKey]);
			this._log.debug("{move} '" + paramKey + "' => '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.not = function(arguments){
		if(!("srcParam" in arguments)){
			this._log.error("{func} missing argument 'srcParam'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			arguments.tgtParam = arguments.srcParam;
		}

		var srcParamValue = this._getParameter(arguments.srcParam);
		if(null === srcParamValue){
			this._log.error("{not} missing parameter '" + arguments.srcParam + "'");
			return false;
		}

		this._setParameter(arguments.tgtParam, !srcParamValue);
	};

	ActionFunctions["switch"] = function(arguments){
		if(!("srcParam" in arguments)){
			this._log.error("{func} missing argument 'srcParam'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			arguments.tgtParam = arguments.srcParam;
		}

		var srcParamValue = this._getParameter(arguments.srcParam);
		if(null === srcParamValue){
			this._log.error("{switch} missing parameter '" + arguments.srcParam + "'");
			return false;
		}

		var casesKeys = Object.keys(arguments.cases),
			casesKeysLength = argumentKeys.length;
		for(var i = 0; i < casesKeysLength; i++){
			var switchValue = casesKeys[i];
			if(srcParamValue === switchValue){
				this._log.debug("{switch} set '" + arguments.tgtParam + "' = '" + arguments.cases[switchValue] + "'");
				this._setParameter(arguments.tgtParam, arguments.cases[switchValue]);
				return true;
			}
		}
		if("default" in arguments){
			this._log.debug("{switch} set default '" + arguments.tgtParam + "' = '" + arguments["default"] + "'");
			this._setParameter(arguments.tgtParam, arguments["default"]);
			return true;
		}
		this._log.warning("{switch} no matching value found for parameter '" + arguments.srcParam + "'");
		return false;
	};

	ActionFunctions.jquery = function(arguments){
		if(!("selector" in arguments)){
			throw new Error("{jquery} missing argument 'selector'");
		}

		if(!("methodName" in arguments)){
			throw new Error("{jquery} missing argument 'methodName'");
		}

		if(!("methodArgs" in arguments)){
			throw new Error("{jquery} missing argument 'methodArgs'");
		}

		if(!("tgtParam" in arguments)){
			throw new Error("{jquery} missing argument 'tgtParam'");
		}

		var $el = jQuery(arguments.selector);

		if($el.size() === 0){
			return false;
		}

		if(!(arguments.methodName in $el)){
			throw new Error($el + " has no method '" + arguments.methodName + "'");
		}

		var functionArgs = [],
			argumentKeys = Object.keys(arguments.methodArgs),
			argumentKeysLength = argumentKeys.length;
		
		for(var i = 0; i < argumentKeysLength; i++){
			var funcArg = argumentKeys[i];
			var srcParamValue = this._getParameter(arguments.methodArgs[funcArg]);
			if(null === srcParamValue){
				this._log.error("{func} missing parameter '" + arguments.methodArgs[funcArg] + "'");
				return false;
			}
			functionArgs.push(srcParamValue);
		}

		var methodResult = $el[arguments.methodName].apply($el, functionArgs);
		
		this._setParameter(arguments.tgtParam, methodResult);
	};

	ActionFunctions.func = function(arguments){
		

		if(!("funcName" in arguments)){
			this._log.error("{func} missing argument 'funcName'");
			return false;
		}

		if(!("funcArgs" in arguments)){
			this._log.error("{func} missing argument 'funcArgs'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			this._log.error("{func} missing argument 'tgtParam'");
			return false;
		}

		var functionArgs = [],
			argumentKeys = Object.keys(arguments.funcArgs),
			argumentKeysLength = argumentKeys.length;
		
		for(var i = 0; i < argumentKeysLength; i++){
			var funcArg = argumentKeys[i];
			var srcParamValue = this._getParameter(arguments.funcArgs[funcArg]);
			if(null === srcParamValue){
				this._log.error("{func} missing parameter '" + arguments.funcArgs[funcArg] + "'");
				return false;
			}
			functionArgs.push(srcParamValue);
		}

		var functionRef = jQuery.coolui5.getObject(arguments.funcName);
		var functionThis = jQuery.coolui5.getObject(arguments.funcName, 1);


		var functionResult = functionRef.apply(functionThis, functionArgs);

		this._setParameter(arguments.tgtParam, functionResult);
		
		return true;
	};

}());