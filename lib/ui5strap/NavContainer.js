/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.NavContainer");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.NavContainer", {
		metadata : {
			library : "ui5strap",
			
			properties : {
				options : {
					type : "string",
					defaultValue : ""
				}
			}
		}
	});

	var NavContainerBase = ui5strap.NavContainer,
		NavContainerBaseProto = NavContainerBase.prototype;

	/*
	*
	* STATIC FIELDS & METHODS
	*
	*/

	var _requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
	})();

	/*
	* @Private
	*/
	var _transitionEndEvent = null,
		_transitionEndEvents = {
		    'transition': 'transitionend',
		    'WebkitTransition': 'webkitTransitionEnd',
		    'MozTransition': 'transitionend',
		    'OTransition': 'otransitionend'
	  	},
	  	elem = document.createElement('div');
	 
	for(var t in _transitionEndEvents){
	    if(typeof elem.style[t] !== 'undefined'){
	      _transitionEndEvent = _transitionEndEvents[t];
	      break;
	    }
	}

	//jQuery.sap.log.debug('Transition-end event is: ' + _transitionEndEvent);

	var _triggerControllerEvent = function(target, oPage, eventName, eventParameters){
		if(oPage){
			var controller = oPage;
			
			//If page is a view, use controller
			if(oPage instanceof sap.ui.core.mvc.View){
				controller = oPage.getController();
			}
			
			if(controller && controller[eventName]){
				jQuery.sap.log.debug('[NC][' + target + '] Trigger event "' + eventName + '" for page "' + oPage.getId() + '"');
			
				controller[eventName](eventParameters ? eventParameters : {});
			}
		}
	};

	/*
	* Constructs a Transition
	* @Constructor
	* @Private
	*/
	var _Transition = function(transitionName, $currentRoot, $nextRoot, transitionId){
		this.$current = $currentRoot;
		this.$next = $nextRoot;
		this._transitionId = transitionId;
		
		var transitionClass = transitionName;

		this.prepare = function (){
			if('none' === transitionClass){
				return;
			}

			if(null !== this.$current){
					this.$current.addClass(transitionClass + ' ' + transitionClass+'-current');
			}

		 	if(null !== this.$next){
					this.$next.addClass(transitionClass + ' ' + transitionClass+'-next').removeClass('navcontainer-page-hidden');
			}
		};

		this.execute = function (currentRootCallback, nextRootCallback){
			if('none' === transitionClass){
				if(null !== this.$next){
					this.$next.removeClass('navcontainer-page-hidden');
				}

				var _this = this;
				_requestAnimFrame(function(){
					currentRootCallback && currentRootCallback.call(_this);
					nextRootCallback && nextRootCallback.call(_this);
				});

				return;
			}

		 	if(null !== _transitionEndEvent){
	 			if(typeof currentRootCallback === 'function' && null !== this.$current){ 	
					this.$current
					//	.off(transitionEndEvent)
					.one(_transitionEndEvent, jQuery.proxy(currentRootCallback, this));

				}
				if(typeof nextRootCallback === 'function' && null !== this.$next){ 	
					this.$next
					//.off(transitionEndEvent)
					.one(_transitionEndEvent, jQuery.proxy(nextRootCallback, this));
				}
	 		}

	 		if(null !== this.$current){
				this.$current.addClass(transitionClass+'-current-out');
			}
							
			if(null !== this.$next){			
				this.$next.removeClass(transitionClass + '-next');
			}
			
			if(null === _transitionEndEvent){ 
				currentRootCallback && currentRootCallback.call(this);
				nextRootCallback && nextRootCallback.call(this);
			}

		 };

	};

	/*
	* @Private
	*/
	var _prepareTransition = function(pageChange){
		//jQuery.sap.log.debug('[NC]' + pageChange.changeName + ' PREPARE');

		var transition = new _Transition(
				pageChange.transitionName, 
				pageChange.$current, 
				pageChange.$next, 
				'transition-' + pageChange.target
			);
			
			pageChange.transition = transition;

			transition.prepare();
	};


	/*
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	/*
	* @Private
	*/
	var _prepareTransitions = function(_this){
		for(var i = 0; i < _this._pendingTransitions.length; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			_prepareTransition(pageChanges[pageChanges.length-1]);
		}	
	};

	var _transitionCallback = function(_this, pageChange, transList){
		transList.callI --;
		var callbacksLength = transList.callbacks.length;
		
		if(0 === callbacksLength){
			//jQuery.sap.log.debug('[NC][' + pageChange.target + '] No transition callbacks');

			return;
		}

		if(0 === transList.callI){
			jQuery.sap.log.debug('[NC][' + pageChange.target + '] Trigger ' + callbacksLength + ' callbacks');

			for(var i = 0; i < callbacksLength; i++){
				transList.callbacks[i]();
			}
		}
		else{
			jQuery.sap.log.debug('[NC][' + pageChange.target + '] Skipped callbacks');
		}
	};

	/*
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		jQuery.sap.log.debug('[NC]' + pageChange.changeName + ' EXECUTE');
		
		pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				
				var $current = this.$current;
				if(null !== $current){
					$current.remove();
				}

				//If next page is null, then execute the callbacks when old page has been hidden
				if(pageChange.page === null){
					_transitionCallback(_this, pageChange, transList);
				}

				//onPageHidden event
				_triggerControllerEvent(pageChange.target, pageChange.currentPage, 'onPageHidden', {
					newPage : pageChange.page
				});
			}, 
			function anon_transitionPreparedComplete(){
				this.$next.attr('class', this.$next.data('orgClass') + ' navcontainer-page-current');
				
				//Transition callback
				_transitionCallback(_this, pageChange, transList);

				//onPageShown event
				_triggerControllerEvent(pageChange.target, pageChange.page, 'onPageShown', {
					oldPage : pageChange.currentPage
				});
			}
		);

	};

	/*
	* @Private
	*/
	var _executeTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length;

		if(0 === pendingTransitionsLength){
			jQuery.sap.log.debug("[NC] No pendings transitions.");

			return;
		}
		
		jQuery.sap.log.debug("[NC] Execute " + pendingTransitionsLength + " pending transitions...");
		
		var transList = {
			callI : pendingTransitionsLength,
			callbacks : []
		};

		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];

			for(var j = 0; j< pageChanges.length; j++){
				if(pageChanges[j].callback){
					transList.callbacks.push(pageChanges[j].callback);
				}
			}
			
			_executeTransition(_this, pageChanges[pageChanges.length-1], transList);
		}
		
		
	};

	/*
	* @Private
	*/
	var _pageTransitions = function(_this){
		_requestAnimFrame(function(){

			_prepareTransitions(_this);
			
			_requestAnimFrame(function(){
				_executeTransitions(_this);

				_this._pendingTransitions = [];
				_this._targetTransitions = {};
			});
		
		});
	};

	/*
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		jQuery.sap.log.debug('[NC]' + pageChange.changeName + ' SINGLE PAGE CHANGE');
		_requestAnimFrame(function _pageChangeFrame1(){

			_prepareTransition(pageChange);
			
			_requestAnimFrame(function _pageChangeFrame2(){
				
				var transList = {
					callI : 1,
					callbacks : []
				};
				if(pageChange.callback){
					transList.callbacks.push(pageChange.callback);
				}
				_executeTransition(_this, pageChange, transList);
			
			});
		
		});
	};

	var _pageChangeLater = function(_this, pageChange, override){
		var target = pageChange.target;
		if(-1 === jQuery.inArray(target, _this._pendingTransitions)){ 
				_this._pendingTransitions.push(target);

				if(!(target in _this._targetTransitions)){
					_this._targetTransitions[target] = [];
				}
		}

		if(override || _this._targetTransitions[target].length === 0){
			_this._targetTransitions[target].push(pageChange);
		}
	};

	/*
	var ou = sap.ui.core.Core.prototype.createUIArea;

	sap.ui.core.Core.prototype.createUIArea = function(domRef, nc){
		var uiArea = ou.call(this, domRef);
		
		if(nc){
			jQuery.each(nc.oModels, function (sName, oModel){
				uiArea.oPropagatedProperties.oModels[sName] = oModel;
			});
			uiArea.propagateProperties(true);
		}
		return uiArea;
	};
	*/

	/*
	* @Private
	*/
	var _placePage = function(_this, target, page, isPrepared){
			if(page && page.getDomRef()){
				return page.$().parent();
			}
			
			if(null === page){
				return null;
			}

			//Add new page to DOM
			var newPage = document.createElement('div'),
				orgClassName = 'navcontainer-page navcontainer-' + _this.ncType + '-page navcontainer-' + _this.ncType + '-page-' + target,
				newClassName = orgClassName;
			if(true === isPrepared){
				 newClassName += ' navcontainer-page-next navcontainer-page-hidden';
			}
			newPage.className = newClassName;
			newPage.id = _this.pageDomId(target, page);
				
			var $nextContent = jQuery(newPage);
			$nextContent.data('orgClass', orgClassName);
			jQuery('#' + _this.targetPagesDomId(target)).append($nextContent);
			
			var oModels = _this.oModels;
			//var uiArea = sap.ui.getCore().createUIArea(newPage, _this);
			for(var sName in oModels){
				//page.setModel(oModel, sName);
				page.oPropagatedProperties.oModels[sName] = oModels[sName];
				page.propagateProperties(sName);
			};
			
			//uiArea.addContent(page);

			page.placeAt(newPage);

			return $nextContent;
	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/*
	* @Public
	* @PostConstruct
	*/
	NavContainerBaseProto.init = function(){
		this._pendingTransitions = [];
		
		this._targetTransitions = {};

		this._targetPagesCount = {};

		this.defaultTransition = "transition-slide";

		this._initNavContainer();
	};

	/*
	* @Override
	* @Protected
	*/
	NavContainerBaseProto._initNavContainer = function(){
		//NavContainer type string
		//Resulting css class is "navcontainer navcontainer-default"
		this.ncType = "default";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
			"content" : null
		};
	};

	/*
	* Creates a dom id for a given target and page
	* @Public
	*/
	NavContainerBaseProto.createPageDomId = function(target, page){
		if(page === null){
			return 'navcontainer-page---' + this._targetPagesCount[target];
		}

		return 'navcontainer-page---' + page.getId();
	};

	/*
	* Registers a new dom id for a given target and page
	* @Public
	*/
	NavContainerBaseProto.pageDomId = function(target, page){
		if(!(target in this._targetPagesCount)){
			this._targetPagesCount[target] = 0;
		}
		
		this._targetPagesCount[target]++;

		return this.createPageDomId(target, page);
	};

	/*
	* @Override
	*/
	NavContainerBaseProto.setModel = function(oModel, sName){
		for(var target in this.targets){
			var page = this.targets[target];
			if(page){
				//page.setModel(oModel, sName);
				page.oPropagatedProperties.oModels[sName] = oModel;
				page.propagateProperties(sName);
			}
		}
		sap.ui.core.Control.prototype.setModel.call(this, oModel, sName);
	};

	/*
	* @Override
	*/
	NavContainerBaseProto.destroy = function(){
		for(var target in this.targets){
			if(this.targets[target]){
				this.targets[target].destroy();
			}
		}
		sap.ui.core.Control.prototype.destroy.call(this);
	};

	/*
	*
	* @Public
	*/
	NavContainerBaseProto.targetPagesDomId = function(target){
		return 'navcontainer-pages-' + target + '---' + this.getId();
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.targetLayersDomId = function(target){
		return 'navcontainer-layers-' + target + '---' + this.getId();
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.getClassString = function(){
		var navContainerClassName = "navcontainer-" + this.ncType,
				options = this.getOptions();

		var classes = "navcontainer " + navContainerClassName;
	    if('' !== options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		classes += ' ' + navContainerClassName + '-' + options[i] + ' ' + 'navcontainer-option-' + options[i];
	    	}
	    }

	    return classes;
	};

	/*
	* @Public
	* @Override
	*/
	NavContainerBaseProto.setOptions = function(newOptions){
		if(this.getDomRef()){
			this.setProperty('options', newOptions, true);
			this.$().attr('class', this.getClassString());
		}
		else{
			this.setProperty('options', newOptions);
		}
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.setOptionsEnabled = function(options){
		var currentOptions = [],
			cOptions = this.getOptions();
		
		if(cOptions){
			currentOptions = cOptions.split(' ');
		}
		
		for(var optionName in options){
			var optionIndex = jQuery.inArray(optionName, currentOptions),
				optionEnabled = options[optionName];

			if(optionEnabled && -1 === optionIndex
				|| !optionEnabled && -1 !== optionIndex){
				
				if(optionEnabled){
					currentOptions.push(optionName);
				}
				else{
					currentOptions.splice(optionIndex, 1);
				}
			}
		}
		this.setOptions(currentOptions.join(' '));
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.isOptionEnabled = function(optionName){
		return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.toggleOption = function(optionName){
		var isOptionEnabled = this.isOptionEnabled(optionName);
		var options = {};
		options[optionName] = !isOptionEnabled;
		this.setOptionsEnabled(options);
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.setTargetOption = function(target, optionName, optionEnabled){
		var $aggregation = jQuery('#' + this.targetPagesDomId(target)),
			optionClassName = 'navcontainer-aggregation-' + target+ '-' + optionName;

		if(optionEnabled){
			$aggregation.addClass(optionClassName);
		}
		else{
			$aggregation.removeClass(optionClassName);
		}

	};

	/*
	* @Public
	*/
	NavContainerBaseProto.updateTarget = function(target, oPage, eventParameters){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		_triggerControllerEvent(target, oPage, 'onUpdate', eventParameters);
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		///jQuery.sap.log.debug('[NC][' + target + '] toPage ("' + (page ? page.getId() : 'None') + '")');

		var _this = this,
			currentPage = this.targets[target];

		if(this.getDomRef() && currentPage === page){
			jQuery.sap.log.debug('[NC][' + target + '] page is current');

			callback && callback();
			
			return false;
		}

		if(currentPage){
			_triggerControllerEvent(target, currentPage, 'onPageHide', {
				newPage : page
			});
		}

		this.targets[target] = page;
			
		if(page){
			_triggerControllerEvent(target, page, 'onPageShow', {
				oldPage : currentPage
			});
		}

		var changeTransitionName = transitionName ? transitionName : this.defaultTransition;

		var changeName = '[' + target + '] '
							+ (null === currentPage ? 'None' : '"' + currentPage.getId() + '"') 
							+ ' => '
							+ (null === page ? 'None' : '"' + page.getId() + '"')
							+ ' ("'
							+ changeTransitionName + '")';

		var $currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			targetTransition = {
				changeName : changeName,
				target : target,
				transitionName : changeTransitionName,
				transition : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				placed : false,
				callback : callback,
				page : page,
				currentPage : currentPage
			};

		

		if(this.getDomRef()){
			targetTransition.$next = _placePage(this, target, page, true);
			targetTransition.placed = true;
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, 250);
		
		}
		else{
			_pageChangeLater(_this, targetTransition, true);
			
		}

		return true;
	};

	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onBeforeRendering = function(){
		for(var target in this.targets){
			var currentPage = this.targets[target];
			if(currentPage){
				_pageChangeLater(this, {
					changeName : "test",
					target : target,
					transitionName : 'none',
					transition : null,
					"$current" : null,
					"$next" : null,
					placed : false,
					callback : null,
					page : currentPage,
					currentPage : null
				}, false);
			}
	 	}
	};

	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onAfterRendering = function(){ 
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = this._targetTransitions[_pendingTransitions[i]],
				targetTransition = targetTransitions[targetTransitions.length - 1];

			if(!targetTransition.placed && null === targetTransition.$next){
				targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
				targetTransition.placed = true;
			}
		}

		window.setTimeout(function anon_afterDomTimeout(){
			_pageTransitions(_this);	
		}, 250);
	};

}());