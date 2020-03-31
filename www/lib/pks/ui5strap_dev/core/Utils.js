/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.Utils
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

sap.ui.define([ './library'], function(ui5strapCoreLib) {
	
	"use strict";
	
	/*
	 * -----
	 * 
	 * Utils
	 * 
	 * -----
	 */

	/**
	 * @Package
	 */
	var Utils = {};
	
	/**
	 * parse map
	 */
	Utils.parseMap = {
		'[strong]' : '<strong>',
		'[/strong]' : '</strong>',
		'[em]' : '<em>',
		'[/em]' : '</em>',
		'[small]' : '<small>',
		'[/small]' : '</small>',
		'[span]' : '<span>',
		'[/span]' : '</span>'
	};

	/**
	 * Parses BBCode inside text
	 * 
	 * @Public
	 * @Static
	 */
	Utils.parseText = function(text) {
		return text
				.replace(
						/\[\/?strong\]|\[\/?em\]|\[\/?small\]|\[\/?span\]/gi,
						function(matched) {
							return Utils.parseMap[matched];
						});
	};
	
	/**
	 * Gets an object property by string regardless of depth.
	 */
	Utils.fetchFromObject = function(obj, prop) {

	    if(typeof obj === 'undefined') {
	        return obj;
	    }

	    var _index = prop.indexOf('.')
	    if(_index > -1) {
	        return this.fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
	    }

	    return obj[prop];
	};
	
	Utils.addToObject = function(obj, prop, value){
		var _index = prop.indexOf('.')
	    if(_index > -1) {
	    	var nextProp = prop.substring(0, _index),
	    		newObject = obj[nextProp];
	    	
	    	if(typeof newObject === 'undefined') {
	    		newObject = {};
	    		obj[nextProp] = newObject; 
		    }
	    	
	        return this.addToObject(newObject, prop.substr(_index + 1), value);
	    }

	    obj[prop] = value;
	};
	
	/**
	 * Parses a path and replaces all {param} occurrencies by the content in the pathParam object.
	 */
	Utils.parsePath = function(path, pathParam){
        pathParam = pathParam || {};
        return path.replace(/\{([\w]+[\.\w]*)\}/g, function(m0, m1){
            return Utils.fetchFromObject(pathParam, m1);
        });
    };
	
	/**
	 * Gets a computed css property
	 */
	Utils.getComputedStyle = function(oElm, strCssRule){
		var strValue = "";

		if (document.defaultView
				&& document.defaultView.getComputedStyle) {
			strValue = document.defaultView.getComputedStyle(
					oElm, "").getPropertyValue(strCssRule);
		} else if (oElm.currentStyle) {
			strCssRule = strCssRule.replace(/\-(\w)/g,
					function(strMatch, p1) {
						return p1.toUpperCase();
					});
			strValue = oElm.currentStyle[strCssRule];
		}

		return strValue;
	};

	/**
	 * Builds dynamic setters from a list of html tag attributes.
	 * @Public
	 */
	Utils.dynamicAttributes = function(controlProto,
			attributeNames) {
		for (var i = 0; i < attributeNames.length; i++) {
			Utils.dynamicAttribute(controlProto,
					attributeNames[i]);
		}
	};

	/**
	 * Builds a dynamic setter from a html tag attribute.
	 * @Public
	 */
	Utils.dynamicAttribute = function(controlProto,
			attributeName) {
		controlProto['set'
				+ jQuery.sap.charToUpperCase(attributeName, 0)] = function(
				newValue, suppressInvalidate) {
			Utils.updateAttribute(this, attributeName,
					newValue, suppressInvalidate);
		};
	};

	/**
	 * Builds dynamic setters from a list of html tag attributes.
	 * @Public
	 */
	Utils.updateAttribute = function(oControl,
			attributeName, newValue, suppressInvalidate) {
		if (oControl.getDomRef()) {
			oControl.$().attr(attributeName, newValue);
			oControl.setProperty(attributeName, newValue, true);
		} else {
			oControl.setProperty(attributeName, newValue, suppressInvalidate);
		}
	};

	// @deprecated
	Utils.dynamicClass = function(controlProto,
			propertyName, valueMapping) {
		controlProto['set'
				+ jQuery.sap.charToUpperCase(propertyName, 0)] = function(
				newValue, suppressInvalidate) {
			Utils.updateClass(this, this.$(),
					propertyName, newValue, valueMapping,
					suppressInvalidate);
		};
	};

	// @deprecated
	Utils.updateClass = function(oControl, $target,
			propertyName, newValue, valueMapping,
			suppressInvalidate) {
		if (oControl.getDomRef()) {
			var oldValue = oControl['get'
					+ jQuery.sap.charToUpperCase(propertyName,
							0)]();
			if (oldValue in valueMapping) {
				$target.removeClass(valueMapping[oldValue]);
			}
			if (newValue in valueMapping) {
				$target.addClass(valueMapping[newValue]);
			}

			oControl.setProperty(propertyName, newValue, true);
		} else {
			oControl.setProperty(propertyName, newValue,
					suppressInvalidate);
		}
	};

	// @deprecated
	Utils.dynamicText = function(controlProto) {
		controlProto.setText = function(newText,
				suppressInvalidate) {
			// console.log(newText, suppressInvalidate);
			Utils.updateText(this, this.$(), newText,
					suppressInvalidate);
		};
	};

	// @deprecated
	Utils.updateText = function(oControl, $target,
			newText, suppressInvalidate) {
		if (oControl.getDomRef()
				&& oControl.getContent().length === 0) {
			//Check if text needs to be parsed
			if(oControl.getParse && oControl.getParse()){
				$target.html(Utils.parseText(newText));
			}
			else{
				$target.text(newText);
			}
			
			//jQuery.sap.log.info("Updated text directly for control " + oControl.getId());
			
			//Set property value without rerendering
			oControl.setProperty('text', newText, true);
		} else {
			//Default setter behaviour
			oControl.setProperty('text', newText,
					suppressInvalidate);
		}
	};

	/**
	 * @Static
	 * @Public
	 * @deprecated Use jQuery.sap.getObject instead.
	 */
	Utils.getObject = function(packageString, levelsUp) {
		if (!levelsUp) {
			levelsUp = 0;
		}

		var classParts = packageString.split('.');
		if (!(classParts[0] in window)) {
			return;
		}

		var constructor = window[classParts[0]];

		for (var i = 1; i < classParts.length - levelsUp; i++) {
			if (!(classParts[i] in constructor)) {
				return;
			}
			constructor = constructor[classParts[i]];
		}

		return constructor;
	};

	/**
	 * @Static
	 * @Public
	 */
	Utils.createObject = function(packageString) {
		var Constructor = this.getObject(packageString);
		return new Constructor();
	};

	/**
	 * @Static
	 * @Public
	 */
	Utils.queryToObject = function(query) {
		var vars = query.split('&'), obj = {};

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			obj[pair[0]] = pair[1];
		}

		return obj;
	};

	/**
	 * @Static
	 * @Public
	 */
	Utils.parseIContent = function(iContent) {
		var iContentType = typeof iContent;

		if (iContentType === 'string') {
			if (jQuery.sap.startsWith(iContent, "?")) {
				return Utils.queryToObject(iContent
						.slice(1));
			}
		}

		return iContent;
	};

	/**
	 * @Static
	 * @Public
	 */
	Utils.qualifyURL = function(url) {
		var a = document.createElement('a');
		a.href = url;
		return a.href;
	};

	/**
	 * @Static
	 * @Public
	 */
	Utils.urlOrigin = function(url) {
		var a = document.createElement('a');
		a.href = url;

		var origin = a.protocol + "//" + a.host;
	};
	
	/**
	 * Returns the path of the directory of a given file url.
	 */
	Utils.getFileLocation = function(url){
		var urlParts = url.split('/');
		urlParts[urlParts.length - 1] = '';
		
		return urlParts.join('/');
	};

	/**
	 * Transfers a property propagation from one to an other
	 * control. Taken from ManagedObject.prototype.setParent
	 * 
	 * @Public
	 * @Static
	 */
	Utils.addPropertyPropagation = function(
			fromControl, toControl) {
		toControl.oPropagatedProperties = fromControl
				._getPropertiesToPropagate();

		if (toControl.hasModel()) {
			jQuery.sap.log.info("{Utils} Added propagation from '" + fromControl.getId() + "' to '" + toControl.getId() + "'.");
			
			toControl.updateBindingContext(false, true,
					undefined, true);
			toControl.updateBindings(true, null); // TODO
			// could be
			// restricted
			// to models
			// that
			// changed
			toControl.propagateProperties(true);
		}
	};

	/**
	 * Finds the closest parent control of type TargetType.
	 * 
	 * @Public
	 * @Static
	 */
	Utils.findClosestParentControl = function(control,
			TargetType) {
		var parentControl = control, maxDepth = 20, i = 0;
		while (parentControl && !(parentControl instanceof TargetType)) {
			parentControl = parentControl.getParent()
			i++;
			if (i >= maxDepth) {
				jQuery.sap.log
						.warning("Cannot find parent control: max depth reached.");
				parentControl = null;
			}
		}

		return parentControl;
	};
	
	/**
	 * Generates a random UUID
	 */
	Utils.randomUUID = function(){
	    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c){
			  return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
			}
	    );
	    
	    //return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    //    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    //    return v.toString(16);
	    //  });
	};
	
	/**
	 * 
	 * @deprecated
	 */
	Utils.ScriptBlock = function() {
		this._pending = {};
		this._order = [];
		this._pendingRequests = 0;
		this._buffer = '';

		var _this = this;

		/**
		 * @Private
		 */
		var _successCallback = function(response, callback) {
			_this._pending[this.url]["script"] = response;

			_this._pendingRequests--;

			if (0 === _this._pendingRequests) {
				for (var i = 0; i < _this._order.length; i++) {
					if (!_this._order[i].script) {
						throw new Error(
								'Could not append script to buffer: '
										+ _this._order[i].url);
					}
					_this._buffer = _this._buffer.concat(
							"\n;\n", _this._order[i].script);
				}

				_this._pending = {};
				_this._order = [];

				callback && callback();
			}
		};

		/**
		 * @Public
		 */
		this.load = function(scripts, callback) {
			if (0 < this._pendingRequests
					|| this._order.length > 0) {
				throw new Error(
						'Could not load scripts: requests still pending.');
			}

			this._pendingRequests = scripts.length;

			for (var i = 0; i < this._pendingRequests; i++) {
				var scriptUrl = scripts[i], scriptData = {
					"index" : i,
					"url" : scriptUrl,
					"script" : null
				};

				this._pending[scriptUrl] = scriptData;
				this._order.push(scriptData);

				jQuery.ajax({
					url : scriptUrl,
					dataType : "text",
					success : function(response) {
						_successCallback.call(this, response,
								callback);
					},
					error : function() {
						throw new Error(
								'Could not load script: '
										+ scriptUrl);
					}
				});
			}
		};

		/**
		 * @Public
		 */
		this.execute = function(useEval) {
			if ('' === this._buffer) {
				return false;
			}
			var returnValue = null;
			if (true === useEval) {
				returnValue = eval.call(window, this._buffer);
			} else {
				returnValue = (new Function(this._buffer))(); // .call(window);
			}
			this._buffer = '';

			return returnValue;
		};
	};
	
	return Utils;
});