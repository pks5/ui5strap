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
		NavContainerBaseProto = NavContainerBase.prototype,
		domAttachTimeout = 50;

	/*
	*
	* STATIC FIELDS & METHODS
	*
	*/

	/**
	* Triggers a controller event: Update, PageShow, PageShown, PageHide, PageHidden
	* @Private
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

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _prepareTransition = function(_this, pageChange){
		//ui5strap.tm("APP", "NC", "PREP_TRANS");
		
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


	/**
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	var _transitionCallback = function(_this, pageChange, transList){
		//ui5strap.tm("APP", "NC", "TRANS_CB");
		
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

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		//ui5strap.tm("APP", "NC", "EXEC_TRANS");
		//jQuery.sap.log.debug(' + [NC] T3 (' + transList.callbacks.length + ') {' + pageChange.target + '}');
		
		if(pageChange.currentPage){
			_triggerControllerEvent(_this, pageChange.target, pageChange.currentPage, 'pageHide', {
				newPage : pageChange.page
			});
		}

		if(pageChange.page){
			_triggerControllerEvent(_this, pageChange.target, pageChange.page, 'pageShow', {
				oldPage : pageChange.currentPage
			});
		}
		
		pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				var $current = this.$current;
				if($current){
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
				this.$next.attr('class', 'navcontainer-page navcontainer-page-current');
				
				//Transition callback
				_transitionCallback(_this, pageChange, transList);

				//onPageShown event
				_triggerControllerEvent(_this, pageChange.target, pageChange.page, 'pageShown', {
					oldPage : pageChange.currentPage
				});
			}
		);

	};

	/**
	* Should always be surrounded by a RAF 
	* @Private
	*/
	var _executePendingTransitions = function(_this){
		//ui5strap.tm("APP", "NC", "EXEC_PEND_TRANS");
		
		var pendingTransitionsLength = _this._pendingTransitions.length,
			transList = {
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
		
		_this._pendingTransitions = [];
		_this._targetTransitions = {};
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _preparePendingTransitions = function(_this){
		//ui5strap.tm("APP", "NC", "PREP_PEND_TRANS");
		
		var pendingTransitionsLength = _this._pendingTransitions.length,
			successAll = true;
		//jQuery.sap.log.debug(' + [NC] PREPARE ' + pendingTransitionsLength + ' PENDING TRANSITIONS'); 
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			successAll = _prepareTransition(_this, pageChanges[pageChanges.length-1]) && successAll;
		}

		return successAll;
	};

	/**
	* @Private
	*/
	var _handlePendingTransitions = function(_this){
		//ui5strap.tm("APP", "NC", "HANDLE_PEND_TRANS");
		
		if(0 === _this._pendingTransitions.length){
			
			//No pending transitions, so return.
			return;
		
		}
		
		//RAF start
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){

			if(!_preparePendingTransitions(_this)){
				//jQuery.sap.log.debug(" - [NC] CANCEL HANDLING PENDING TRANSITIONS");

				return;
			}
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				_executePendingTransitions(_this);
			});
		
		});
		//RAF end
	};

	/**
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		//ui5strap.tm("APP", "NC", "PAGE_CHANGE");
		
		var transList = {
			callI : 1,
			callbacks : []
		};
		
		if(pageChange.callback){
			transList.callbacks.push(pageChange.callback);
		}
		
		//RAF start
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){
			
			//Prepare Transition before next repaint
			_prepareTransition(_this, pageChange);
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				
				//Execute Transition before next repaint
				_executeTransition(_this, pageChange, transList);
			
			});
		
		});
		//RAF end
	};
	
	/**
	 * @Private
	 */
	var _pageChangeLater = function(_this, pageChange, override){
		//ui5strap.tm("APP", "NC", "PAGE_CHANGE_LATER");
		
		var target = pageChange.target;
		if(-1 === jQuery.inArray(target, _this._pendingTransitions)){ 
			_this._pendingTransitions.push(target);

			if(!_this._targetTransitions[target]){
				_this._targetTransitions[target] = [];
			}
		}

		if(override || _this._targetTransitions[target].length === 0){
			//jQuery.sap.log.debug(' + [NC] T1L {' + pageChange.target + '}');
			_this._targetTransitions[target].push(pageChange);
		}
		//else{
			//jQuery.sap.log.debug(' + [NC] T1S {' + pageChange.target + '}');
		//}
	};

	/**
	* @Private
	*/
	var _placePage = function(_this, target, page, isPrepared){
			//ui5strap.tm("APP", "NC", "PLACE_PAGE");
			
			//Page is null, return null
			if(!page){
				return null;
			}
		
			//Page is already present in DOM, return parent jQuery reference
			if(page.getDomRef()){
				return page.$().parent();
			}
			
			//Create dom element and jQuery wrapper
			var newPageContainer = document.createElement('div'),
				$newPageContainer = jQuery(newPageContainer),
				oModels = _this.oModels;
			
			//Set css class name for new page container
			newPageContainer.className = true === isPrepared
					? 'navcontainer-page navcontainer-page-next ui5strap-hidden'
					: 'navcontainer-page';
			
			//Create and set id for new page container
			newPageContainer.id = _this.pageDomId(target, page);
			
			//Append page container to the dom
			jQuery('#' + _this.targetPagesDomId(target)).append($newPageContainer);
			
			for(var sName in oModels){
				//page.setModel(oModel, sName);
				page.oPropagatedProperties.oModels[sName] = oModels[sName];
				page.propagateProperties(sName);
			};
			
			//Add page to new page container
			page.placeAt(newPageContainer);

			//jQuery.sap.log.debug(" + [NC] NEW PAGE {" + target + "} #" + page.getId());

			return $newPageContainer;
	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/**
	* @Public
	* @PostConstruct
	*/
	NavContainerBaseProto.init = function(){
		//ui5strap.tm("APP", "NC", "INIT");
		
		this._pendingTransitions = [];
		
		this._targetTransitions = {};

		this._targetPagesCount = {};
		
		//TODO Do we need a busy flag here?
		//this._targetStatus = {};

		this._initNavContainer();
	};

	/**
	* @Override
	* @Protected
	*/
	NavContainerBaseProto._initNavContainer = function(){
		//ui5strap.tm("APP", "NC", "INIT_NC");
		
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

	/**
	* Creates a dom id for a given target and page
	* @Public
	*/
	NavContainerBaseProto.createPageDomId = function(target, page){
		if(page === null){
			return 'navcontainer-page---' + this._targetPagesCount[target];
		}

		return 'navcontainer-page---' + page.getId();
	};

	/**
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

	/**
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

	/**
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

	/**
	*
	* @Public
	*/
	NavContainerBaseProto.targetPagesDomId = function(target){
		return 'navcontainer-pages-' + target + '---' + this.getId();
	};

	/**
	* @Public
	*/
	NavContainerBaseProto.targetLayersDomId = function(target){
		return 'navcontainer-layers-' + target + '---' + this.getId();
	};

	/**
	* @Public
	*/
	NavContainerBaseProto.getClassString = function(){
		var options = this.getOptions(),
			classes = "navcontainer navcontainer-type-" + this.ncType;
	    
		if(options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		classes += ' ' + 'navcontainer-option-' + options[i];
	    	}
	    }

	    return classes;
	};

	/**
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

	/**
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

	/**
	* @Public
	*/
	NavContainerBaseProto.isOptionEnabled = function(optionName){
		return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
	};

	/**
	* @Public
	*/
	NavContainerBaseProto.toggleOption = function(optionName){
		var isOptionEnabled = this.isOptionEnabled(optionName);
		var options = {};
		options[optionName] = !isOptionEnabled;
		this.setOptionsEnabled(options);
	};

	/**
	* @Public
	*/
	NavContainerBaseProto.updateTarget = function(target, oPage, eventParameters){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		_triggerControllerEvent(this, target, oPage, 'update', eventParameters);
	};
	
	/**
	 * @Public
	 */
	NavContainerBaseProto.hasTarget = function(target){
		return target in this.targets;
	};
	
	/**
	 * @Public
	 */
	NavContainerBaseProto.getTarget = function(target){
		return this.targets[target];
	};
	
	/**
	* @Public
	*/
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		//ui5strap.tm("APP", "NC", "TO_PAGE");
		
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

		this.targets[target] = page;
		
		

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
			//NavContainer is already attached to DOM
			targetTransition.$next = _placePage(_this, target, page, true);
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, domAttachTimeout);
		}
		else{
			//NavContainer not attached to DOM yet
			_pageChangeLater(_this, targetTransition, true);
		}

		return true;
	};

	/**
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onBeforeRendering = function(){
		//ui5strap.tm("APP", "NC", "BEFORE_RENDERING");

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

	/**
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onAfterRendering = function(){ 
		//ui5strap.tm("APP", "NC", "AFTER_RENDERING");
		
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = _this._targetTransitions[_pendingTransitions[i]],
				targetTransition = targetTransitions[targetTransitions.length - 1];

			if(!targetTransition.$next){
				//There is no page reference available, so we have to create it
				targetTransition.$next = _placePage(_this, targetTransition.target, targetTransition.page, true); 
			}
			else{
				//Reappend existing reference
				jQuery('#' + _this.targetPagesDomId(targetTransition.target)).append(targetTransition.$next);
			}
		}
		
		//Dom Attach Timeout
		window.setTimeout(function anon_afterDomTimeout(){
			_handlePendingTransitions(_this);	
		}, domAttachTimeout);
		
	};

}());