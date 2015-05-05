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
				},
				defaultTransition : {
					type : "string",
					defaultValue : "transition-slide"
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

/*
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
	
	*/
	
	/*
	* Triggers a controller event: Update, PageShow, PageShown, PageHide, PageHidden
	*/
	var _triggerControllerEvent = function(_this, target, oControl, eventId, eventParameters){
		if(oControl){
			var controller = oControl;
			
			//If page is a view, use controller
			if(oControl instanceof sap.ui.core.mvc.View){
				controller = oControl.getController();
			}
			
			var funcName = 'on' + jQuery.sap.charToUpperCase(eventId, 0);
			if(controller && controller[funcName]){
				//jQuery.sap.log.debug(' + [NC] EVENT ' + eventName + '() {' + target + '}');
			
				controller[funcName](new sap.ui.base.Event("ui5strap.controller." + eventId, _this, eventParameters || {}));
			}
		}
	};

	/*
	* Constructs a Transition
	* @Constructor
	* @Private
	*/
	/*
	var _Transition = function(transitionName, $currentRoot, $nextRoot, transitionId){
		this.$current = $currentRoot;
		this.$next = $nextRoot;
		
		this._transitionId = transitionId;
		
		this._prepared = false;
		this._executed = false;
		
		var transitionClass = transitionName;
		var transitionTimeout = 2000;
		var _transitionEndEvent = ui5strap.support.transitionEndEvent;

		this.prepare = function (){
			if(this._prepared || this._executed){
				throw new Error('Cannot prepare transition: already prepared or executed!');
			}
			this._prepared = true;

			if(!transitionName){
				return;
			}

			if(null !== this.$current){
					this.$current.addClass(transitionClass + ' ' + transitionClass+'-current');
			}

		 	if(null !== this.$next){
					this.$next.addClass(transitionClass + ' ' + transitionClass+'-next').removeClass('ui5strap-hidden');
			}
		};

		this.execute = function (currentRootCallback, nextRootCallback){
			var _this = this;

			if(!this._prepared){
				throw new Error('Cannot execute transition: not prepared!');
			}

			if(this._executed){
				throw new Error('Cannot execute transition: already executed!');
			}

			this._executed = true;
			this._neca = false;
			this._cuca = false;

			if(transitionName && _transitionEndEvent){
				//jQuery.sap.log.debug('[TRANSITION] ' + _this._transitionId + ' : ' + transitionName);

	 			if(currentRootCallback && this.$current){ 
	 				var _currentTimout = window.setTimeout(function(){
	 					if(_this._cuca){
	 						return;
	 					}
	 					_this._cuca = true;
						//jQuery.sap.log.debug('[NC] TIMEOUT CUCA');
			 			currentRootCallback.call(_this);
					}, transitionTimeout);

	 				this.$current
					//	.off(transitionEndEvent)
					.one(_transitionEndEvent, function(){
						if(_this._cuca){
	 						return;
	 					}
	 					_this._cuca = true;
						window.clearTimeout(_currentTimout);
						currentRootCallback.call(_this);
					});

				}
				if(nextRootCallback && this.$next){
					var _nextTimout = window.setTimeout(function(){
						if(_this._neca){
	 						return;
	 					}
	 					_this._neca = true;
						//jQuery.sap.log.debug('[NC] TIMEOUT NECA');
			 			nextRootCallback.call(_this);
			 		}, transitionTimeout);

					this.$next
					//.off(transitionEndEvent)
					.one(_transitionEndEvent, function(){
						if(_this._neca){
	 						return;
	 					}
	 					_this._neca = true;
						window.clearTimeout(_nextTimout);
						nextRootCallback.call(_this);
					});
				}

				this.$current && this.$current.addClass(transitionClass+'-current-out');
				this.$next && this.$next.removeClass(transitionClass + '-next');
			}
			else{ 
				//jQuery.sap.log.debug('[TRANSITION] ' + _this._transitionId + ' : no transition');
				this.$next && this.$next.removeClass('ui5strap-hidden');

				ui5strap.polyfill.requestAnimationFrame(function(){
					currentRootCallback && currentRootCallback.call(_this);
					nextRootCallback && nextRootCallback.call(_this);
				});
			}

		 };

	};
	*/

	/*
	* @Private
	*/
	var _prepareTransition = function(_this, pageChange){
		if(pageChange.transition){
			//There is already a Transition defined
			return false;
		}
		else{
			var changeTransitionName = pageChange.transitionName;
			if(!changeTransitionName){
				changeTransitionName = _this.getDefaultTransition();
			}
			
			//"no-transition" is deprecated, use "transition-none" instead
			if(changeTransitionName === 'no-transition'
				|| changeTransitionName === 'transition-none'){
				changeTransitionName = null;
			}
			
			var transition = new ui5strap.Transition(
					changeTransitionName, 
					pageChange.$current, 
					pageChange.$next, 
					'nc-' + _this.ncType + '-' + pageChange.target
				);
				
			pageChange.transition = transition;

			transition.prepare();

			return true;
		}
	};


	/*
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	var _transitionCallback = function(_this, pageChange, transList){
		transList.callI --;
		
		var callbacksLength = transList.callbacks.length;
		if(0 === callbacksLength){
			////jQuery.sap.log.debug('[NC][' + pageChange.target + '] No transition callbacks');

			return;
		}

		if(0 === transList.callI){
			//jQuery.sap.log.debug(' + [NC] CALLBACK_0 (' + callbacksLength + ') {' + pageChange.target + '}');

			for(var i = 0; i < callbacksLength; i++){
				transList.callbacks[i]();
			}

			//pageChange 
		}
		else{
			//jQuery.sap.log.debug(' - [NC] C_' + transList.callI + ' {' + pageChange.target + '}');
		}
	};

	/*
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		//jQuery.sap.log.debug(' + [NC] T3 (' + transList.callbacks.length + ') {' + pageChange.target + '}');
		
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
				_triggerControllerEvent(_this, pageChange.target, pageChange.currentPage, 'pageHidden', {
					newPage : pageChange.page
				});
			}, 
			function anon_transitionPreparedComplete(){
				this.$next.attr('class', this.$next.attr('data-org-class') + ' navcontainer-page-current');
				
				//Transition callback
				_transitionCallback(_this, pageChange, transList);

				//onPageShown event
				_triggerControllerEvent(_this, pageChange.target, pageChange.page, 'pageShown', {
					oldPage : pageChange.currentPage
				});
			}
		);

	};

	/*
	* @Private
	*/
	var _executePendingTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length;

		//jQuery.sap.log.debug(" + [NC] EXECUTE " + pendingTransitionsLength + " PENDING TRANSITIONS");
		
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
	var _preparePendingTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length,
			successAll = true;
		//jQuery.sap.log.debug(' + [NC] PREPARE ' + pendingTransitionsLength + ' PENDING TRANSITIONS'); 
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			successAll = _prepareTransition(_this, pageChanges[pageChanges.length-1]) && successAll;
		}

		return successAll;
	};

	/*
	* @Private
	*/
	var _handlePendingTransitions = function(_this){
		if(0 === _this._pendingTransitions.length){
			//jQuery.sap.log.debug(" - [NC] NO PENDING TRANSITIONS");

			return;
		}
		
		//jQuery.sap.log.debug(" + [NC] HANDLE PENDING TRANSITIONS");

		ui5strap.polyfill.requestAnimationFrame(function RAF1(){

			if(!_preparePendingTransitions(_this)){
				//jQuery.sap.log.debug(" - [NC] CANCEL HANDLING PENDING TRANSITIONS");

				return;
			}
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				_executePendingTransitions(_this);

				_this._pendingTransitions = [];
				_this._targetTransitions = {};
			});
		
		});
	};

	/*
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		//jQuery.sap.log.debug(' + [NC] T1 {' + pageChange.target + '}');
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){

			_prepareTransition(_this, pageChange);
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				
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
			//jQuery.sap.log.debug(' + [NC] T1L {' + pageChange.target + '}');
			_this._targetTransitions[target].push(pageChange);
		}
		else{
			//jQuery.sap.log.debug(' + [NC] T1S {' + pageChange.target + '}');
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
				 newClassName += ' navcontainer-page-next ui5strap-hidden';
			}
			newPage.className = newClassName;
			newPage.id = _this.pageDomId(target, page);
				
			var $nextContent = jQuery(newPage);
			$nextContent.attr('data-org-class', orgClassName);
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

			//jQuery.sap.log.debug(" + [NC] NEW PAGE {" + target + "} #" + page.getId());

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
		
		//TODO Do we need a busy flag here?
		//this._targetStatus = {};

		//Transition timeout
		this.transitionNextTimeout = 2000;
		this.transitionCurrentTimeout = 2000;

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
	* @Deprecated
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

		_triggerControllerEvent(this, target, oPage, 'update', eventParameters);
	};
	
	NavContainerBaseProto.hasTarget = function(target){
		return target in this.targets;
	};
	
	NavContainerBaseProto.getTarget = function(target){
		return this.targets[target];
	};
	
	/*
	* @Public
	*/
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		//jQuery.sap.log.debug(' + [NC] NAVIGATE {' + target + '} ' + (page ? '#' + page.getId() : 'CLEAR'));

		var _this = this,
			currentPage = this.targets[target];

		if(this.getDomRef() && currentPage === page){
			//jQuery.sap.log.debug(' + [NC] PAGE IS CURRENT {' + target + '}');

			callback && callback();
			
			return false;
		}

		if(currentPage){
			_triggerControllerEvent(this, target, currentPage, 'pageHide', {
				newPage : page
			});
		}

		this.targets[target] = page;
			
		if(page){
			_triggerControllerEvent(this, target, page, 'pageShow', {
				oldPage : currentPage
			});
		}

		var changeName = '{' + target + '} '
							+ (null === currentPage ? 'None' : '#' + currentPage.getId()) 
							+ ' => '
							+ (null === page ? 'None' : '#' + page.getId())
							+ ' ("'
							+ transitionName + '")';

		var $currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			targetTransition = {
				"changeName" : changeName,
				"target" : target,
				"transitionName" : transitionName,
				"transition" : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				"callback" : callback,
				"page" : page,
				"currentPage" : currentPage
			};

		

		if(this.getDomRef()){
			targetTransition.$next = _placePage(this, target, page, true);
			
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
		//jQuery.sap.log.debug('[NC] ON BEFORE RENDERING');

		for(var target in this.targets){
			var currentPage = this.targets[target];
			if(currentPage){
				_pageChangeLater(this, {
					changeName : "test",
					target : target,
					transitionName : null,
					transition : null,
					"$current" : null,
					"$next" : null,
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
		//jQuery.sap.log.debug('[NC] ON AFTER RENDERING');
		
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = this._targetTransitions[_pendingTransitions[i]],
				targetTransition = targetTransitions[targetTransitions.length - 1];

			if(!targetTransition.$next){
				//There is no page reference available, so we have to create it
				targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
			}
			else{
				//Reappend existing reference
				jQuery('#' + this.targetPagesDomId(targetTransition.target)).append(targetTransition.$next);
			}
		}
		
		window.setTimeout(function anon_afterDomTimeout(){
			_handlePendingTransitions(_this);	
		}, 250);
	};

}());