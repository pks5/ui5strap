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

	sap.ui.core.Control.extend("ui5strap.NavContainer", {
		metadata : {
			library : "ui5strap",
			
			properties : {
				defaultTransition : {
					type : "string",
					defaultValue : 'transition-slide'
				},
				name : {
					type : "string",
					defaultValue : 'default'
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
	* @Public
	*/
	NavContainerBase.pageId = 0;


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

	/*
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	/*
	* @Private
	*/
	var _pageDomId = function(_this, aggregationContent){
		if(aggregationContent === null){
			NavContainerBase.pageId++;
			return 'navcontainer-page-' + NavContainerBase.pageId;
		}

		return 'navcontainer-page---' + aggregationContent.getId();
	};

	/*
	* @Private
	*/
	var _aggregationContentDomId = function(_this, aggregationName){
		return 'navcontainer-pages-' + aggregationName + '---' + _this.getId();
	};

	/*
	* @Private
	*/
	var _aggregationLayersDomId = function(_this, aggregationName){
		return 'navcontainer-layers-' + aggregationName + '---' + _this.getId();
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
	* @Private
	*/
	var _prepareTransitions = function(_this){
		for(var i = 0; i < _this._pendingTransitions.length; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			for(var j = 0; j < pageChanges.length; j++){
				_prepareTransition(pageChanges[j]);
			}
		}	
	};

	/*
	* @Private
	*/
	var _executeTransition = function(transList){
		transList.pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				
				var $current = this.$current; //console.log('remove current page removed');
				if(null !== $current){

					$current.remove();
				}

				transList.callI --;
				var callbacksLength = transList.callbacks.length;
				//TODO callback must be triggered ONCE for both callbacks
				if(0 === transList.callI && callbacksLength > 0){
					
					for(var i = 0; i < callbacksLength; i++){
						transList.callbacks[i]();
					}
				}

			}, 
			function anon_transitionPreparedComplete(){
				//console.log('current-page', this.$next);
				this.$next.attr('class', 'navcontainer-page navcontainer-page-current');
			}
		);

		
	};

	/*
	* @Private
	*/
	var _executeTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];

			var callbacks = [];
			for(var j = 0; j< pageChanges.length; j++){
				if(pageChanges[j].callback){
					callbacks.push(pageChanges[j].callback);
				}
			}

			var transList = {
				callI : pendingTransitionsLength,
				callbacks : callbacks
			};

			for(var j = 0; j< pageChanges.length; j++){
				transList.pageChange = pageChanges[j];
				_executeTransition(transList);
			}
		}
		
		
	};

	/*
	* @Private
	*/
	var _pageTransitions = function(_this){
		requestAnimationFrame(function(){

			_prepareTransitions(_this);
			
			requestAnimationFrame(function(){
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
		requestAnimationFrame(function(){

			_prepareTransition(pageChange);
			
			requestAnimationFrame(function(){
				var transList = {
					pageChange : pageChange,
					callI : 1,
					callbacks : []
				};
				if(pageChange.callback){
					transList.callbacks.push(pageChange.callback);
				}
				_executeTransition(transList);
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
			newPage.id = _pageDomId(_this, page);
				
			NavContainerBase.pageId++;

			var $targetContainer = jQuery('#' + _aggregationContentDomId(_this, target));
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
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.renderAggregation = function (rm, aggregationName) {
			rm.write('<div');
			rm.addClass('navcontainer-aggregation navcontainer-aggregation-' + aggregationName);
			rm.writeClasses();
			rm.write(">");

			rm.write('<div id="' + _aggregationContentDomId(this, aggregationName) + '"');
			rm.addClass('navcontainer-pages');
			rm.writeClasses();
			rm.write(">");

			var content = this.getAggregation(aggregationName);
			rm.write('<div class="navcontainer-page navcontainer-page-next navcontainer-page-prerendered navcontainer-page-hidden" id="' + _pageDomId(this, content) + '">');
			
			if(null !== content){
				rm.renderControl(content);
			}
			rm.write("</div>");
			
			rm.write("</div>");
			
			rm.write('<div id="' + _aggregationLayersDomId(this, aggregationName) + '"');
			rm.addClass('navcontainer-layers');
			rm.writeClasses();
			rm.write(">");
			rm.write("</div>");

			rm.write("</div>");

			NavContainerBase.pageId++;
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.startRender = function(rm) {
		 	rm.write("<div");
		    rm.writeControlData(this);
		    rm.addClass("navcontainer navcontainer-" + this.getName());
		    rm.writeClasses();
		    rm.write(">");
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.endRender = function(rm) {
		 	rm.write("</div>");
	};

	
	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.setAggregation = function(aggregationName, newContent, suppressInvalidate){ 
		sap.ui.core.Control.prototype.setAggregation.call(this, aggregationName, newContent, suppressInvalidate);
		
		this.toPage(newContent, aggregationName);
		
		return this;
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		if(!(target in this.getMetadata().getAggregations())){
			throw new Error('NavContainer does not support aggregation: ' + target);
		}

		var currentPage = this.getAggregation(target),
			_this = this;

		var $aggregation = jQuery('#' + _aggregationContentDomId(this, target));
		var $currentPage = $aggregation.children().last();
		var targetTransition = {
				"target" : target,
				"transitionName" : transitionName ? transitionName : this.getDefaultTransition(),
				"transition" : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				"callback" : callback,
				"page" : page
		};

		
		
		if(currentPage === page && target in this._targetTransitions){
			console.log('iscu');
			return false;
		}

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
			if(-1 === jQuery.inArray(target, this._targetTransitions)){ 
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

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = this._targetTransitions[_pendingTransitions[i]];
			for(var j = 0; j < targetTransitions.length; j++){
				var targetTransition = targetTransitions[j];

				if(null === targetTransition.$next){
					targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
				}
			}
		}

		window.setTimeout(function anon_afterDomTimeout(){
			_pageTransitions(_this);	
		}, 250);
	};

}());