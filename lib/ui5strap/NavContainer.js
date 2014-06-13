/*
 * 
 * UI5Strap
 *
 * NavContainer Base Class
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
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
				defaultTransition : {
					type : "string",
					defaultValue : 'transition-slide'
				},
				defaultTarget : {
					type : "string",
					defaultValue : 'content'
				},
				name : {
					type : "string",
					defaultValue : 'default'
				},
				options : {
					type : "string",
					defaultValue : ''
				}
			},

			aggregations : { 
				
				content : {
					multiple : false
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

	jQuery.sap.log.debug('Transition-end event is: ' + _transitionEndEvent);

	var _triggerControllerEvent = function(page, eventName, parameters){
		if(null !== page){
			jQuery.sap.log.debug('Trigger ' + eventName + ' for page ' + page.getId());
			var controller = page;
			if(page instanceof sap.ui.core.mvc.View){
				var controller = page.getController();
			}
			if(controller && eventName in controller){
				controller[eventName](parameters ? parameters : {});
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
			if(null !== this.$current){
					this.$current.addClass(transitionClass + ' ' + transitionClass+'-current');
			}

		 	if(null !== this.$next){
					this.$next.addClass(transitionClass + ' ' + transitionClass+'-next').removeClass('navcontainer-page-hidden');
			}
		};

		this.execute = function (currentRootCallback, nextRootCallback){
			//console.log("execute trans" , this, nextRootCallback);

		 	if(null !== _transitionEndEvent){
	 			if(typeof currentRootCallback === 'function' && null !== this.$current){ 	
					this.$current
					//	.off(transitionEndEvent)
					.one(_transitionEndEvent, jQuery.proxy(currentRootCallback, this));

					//console.log('registered current en');
				}
				if(typeof nextRootCallback === 'function' && null !== this.$next){ 	
					this.$next
					//.off(transitionEndEvent)
					.one(_transitionEndEvent, jQuery.proxy(nextRootCallback, this));
				}
	 		}

	 		//console.log('execute trans', this._transitionId, this.$current, currentRootCallback, nextRootCallback);

			if(null !== this.$current){
				this.$current.addClass(transitionClass+'-current-out');
			}
							
			if(null !== this.$next){			
				this.$next.removeClass(transitionClass + '-next');
			}
			
			if(null === _transitionEndEvent){ 
				if(typeof currentRootCallback === 'function'){ 	
					currentRootCallback.call(this);
				}
				if(typeof nextRootCallback === 'function'){ 	
					nextRootCallback.call(this);
				}
			}

		 };

	};

	/*
	* @Private
	*/
	var _prepareTransition = function(pageChange){
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
			//for(var j = 0; j < pageChanges.length; j++){
			//	_prepareTransition(pageChanges[j]);
			//}
			_prepareTransition(pageChanges[pageChanges.length-1]);
		}	
	};

	

	/*
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){

		jQuery.sap.log.debug('Execute transitions on target ' + pageChange.target);

		pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				
				var $current = this.$current; //console.log('remove current page removed');
				if(null !== $current){

					$current.remove();
				}

				//currentpage hidden
				_triggerControllerEvent(pageChange.currentPage, 'onPageHidden', {
					newPage : pageChange.page
				});

			}, 
			function anon_transitionPreparedComplete(){
				//console.log('current-page', this.$next);
				this.$next.attr('class', 'navcontainer-page navcontainer-page-current');
				
				transList.callI --;
				var callbacksLength = transList.callbacks.length;

				
				if(0 === transList.callI && callbacksLength > 0){
					jQuery.sap.log.debug('Trigger callback for target ' + pageChange.target);

					for(var i = 0; i < callbacksLength; i++){
						transList.callbacks[i]();
					}

					//newpage shown
				}

				_triggerControllerEvent(pageChange.page, 'onPageShown', {
					oldPage : pageChange.currentPage
				});
			}
		);

	};

	/*
	* @Private
	*/
	var _executeTransitions = function(_this){
		jQuery.sap.log.debug("Execute pending transitions...");
		var pendingTransitionsLength = _this._pendingTransitions.length
		
		

		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];

			//for(var j = 0; j< pageChanges.length; j++){
			//	_executeTransition(_this, pageChanges[j], transList);
			//}

			var callbacks = [];
			//for(var i = 0; i < pendingTransitionsLength; i++){
			//	var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
				for(var j = 0; j< pageChanges.length; j++){
					if(pageChanges[j].callback){
						callbacks.push(pageChanges[j].callback);
					}
				}
			//}

			var transList = {
				callI : pageChanges.length,
				callbacks : callbacks
			};

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
		_requestAnimFrame(function(){

			_prepareTransition(pageChange);
			
			_requestAnimFrame(function(){
				
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

	/*
	* @Private
	*/
	var _placePage = function(_this, target, page, isPrepared){
			if(null === page){
				return null;
			}
			
			if(page.getDomRef()){
				return page.$().parent();
			}

			var newPage = document.createElement('div');
			var $nextContent = jQuery(newPage);

			var newClassName = 'navcontainer-page';
			if(true === isPrepared){
				 newClassName += ' navcontainer-page-next navcontainer-page-hidden';
			}
			newPage.className = newClassName;

			newPage.id = _this.pageDomId(target, page);
				
			NavContainerBase.pageId++;

			var $targetContainer = jQuery('#' + _this.targetPagesDomId(target));
			$targetContainer.append($nextContent);
			
			if(_this.mAggregations[target]){
				_this.mAggregations[target].setParent(null);
			}
			
			page.placeAt(newPage.id);
			
			_this.mAggregations[target] = page;
			
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
	};

	/*
	* Creates a dom id for a given target and page
	* @Public
	*/
	NavContainerBaseProto.createPageDomId = function(target, page){
		if(page === null){
			return 'navcontainer-page-' + this._targetPagesCount[target];
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

	NavContainerBaseProto.getClassString = function(){
		var navContainerClassName = "navcontainer-" + this.getName(),
				options = this.getOptions();

		var classes = "navcontainer " + navContainerClassName;
	    if('' !== options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		classes += ' ' + navContainerClassName + '-' + options[i];
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
		var currentOptions = this.getOptions().split(' ');
		
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

	NavContainerBaseProto.isOptionEnabled = function(optionName){
		return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
	};

	NavContainerBaseProto.toggleOption = function(optionName){
		var isOptionEnabled = this.isOptionEnabled(optionName);
		var options = {};
		options[optionName] = !isOptionEnabled;
		this.setOptionsEnabled(options);
	};

	/*
	* @Public
	* @Override
	*/
	NavContainerBaseProto.setName = function(newName){
		if(this.getDomRef()){
			this.setProperty('name', newName, true);
			this.$().attr('class', this.getClassString());
		}
		else{
			this.setProperty('name', newName);
		}
	};

	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.setAggregation = function(aggregationName, newContent, suppressInvalidate){ 
		
		if(!this.getMetadata().getAggregations()[aggregationName].multiple){
			this.toPage(newContent, aggregationName);
		}

		sap.ui.core.Control.prototype.setAggregation.call(this, aggregationName, newContent, suppressInvalidate);
		
		return this;
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
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		if(!(target in this.getMetadata().getAggregations())){
			throw new Error('NavContainer does not support aggregation: ' + target);
		}

		jQuery.sap.log.debug('NavContainer.toPage (' + target + ')');

		var _this = this,
			currentPage = this.getAggregation(target),
			$currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			targetTransition = {
				"target" : target,
				"transitionName" : transitionName ? transitionName : this.getDefaultTransition(),
				"transition" : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				"callback" : callback,
				"page" : page,
				"currentPage" : currentPage
			};

		if(currentPage === page){
			jQuery.sap.log.debug('NavContainer.toPage: is current page');

			callback && callback();
			
			return false;
		}

		_triggerControllerEvent(currentPage, 'onPageHide', {
			newPage : page
		});

		_triggerControllerEvent(page, 'onPageShow', {
			oldPage : currentPage
		});

		if(!(target in this._targetTransitions)){
			this._targetTransitions[target] = [];
		}

		if(this.getDomRef()){
			targetTransition.$next = _placePage(this, target, page, true); 
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, 250);
		
		}
		else{
			//console.log('render later');
			if(-1 === jQuery.inArray(target, this._pendingTransitions)){ 
				this._pendingTransitions.push(target);
			}
			this._targetTransitions[target].push(targetTransition);
			
		}

		return true;
	};

	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onAfterRendering = function(){ 
		//console.log('render');
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;

		//console.log(_pendingTransitions);

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = this._targetTransitions[_pendingTransitions[i]];
			
			var targetTransition = targetTransitions[targetTransitions.length - 1];

			if(null === targetTransition.$next){
				targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
			}

			/*
			for(var j = 0; j < targetTransitions.length; j++){
				var targetTransition = targetTransitions[j];

				if(null === targetTransition.$next){
					targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
				}
			}
			*/
		}

		window.setTimeout(function anon_afterDomTimeout(){
			_pageTransitions(_this);	
		}, 250);
	};

}());