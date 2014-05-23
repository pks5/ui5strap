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

	jQuery.sap.declare("ui5strap.NavContainerBase");

	sap.ui.core.Control.extend("ui5strap.NavContainerBase", {
		metadata : {
			library : "ui5strap",
			
			abstract : true,
			
			properties : {
				defaultTransition : {
					type : "string",
					defaultValue : 'transition-slide'
				}
			}
		}
	});

	var NavContainerBase = ui5strap.NavContainerBase,
		NavContainerBaseProto = NavContainerBase.prototype;

	NavContainerBase.pageId = 0;

/*
	NavContainerBaseProto._targets = { 
		"content" : {}
	};
*/
	NavContainerBaseProto.init = function(){
		this._pendingTransitions = [];
		this._targetTransitions = {};
		//this._contents = {};
	};

	var _prepareTransition = function(pageChange){
		var transition = new NavContainerBase.Transition(
				pageChange.transitionName, 
				pageChange.$current, 
				pageChange.$next, 
				'transition-nav-container'
			);
			
			pageChange.transition = transition;

			transition.prepare();// alert('AR');
	};

	var _prepareTransitions = function(_this){
		for(var i = 0; i < _this._pendingTransitions.length; i++){
			_prepareTransition(_this._targetTransitions[_this._pendingTransitions[i]]);
		}	
	};

	var _executeTransition = function(transList){
		transList.pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				
				var $current = this.$current;
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
				this.$next.attr('class', 'ui5strap-nc-page ui5strap-nc-page-current');
			}
		);

		
	};

	var _executeTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length
		var callbacks = [];
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pendingTransition = _this._targetTransitions[_this._pendingTransitions[i]];
			if(pendingTransition && pendingTransition.callback){
				callbacks.push(pendingTransition.callback);
			}
		}
		
		var transList = {
			callI : pendingTransitionsLength,
			callbacks : callbacks
		};

		for(var i = 0; i < pendingTransitionsLength; i++){
			var pendingTransition = _this._targetTransitions[_this._pendingTransitions[i]];
			if(pendingTransition){
				transList.pageChange = pendingTransition;
				_executeTransition(transList);
			}
		}
		
		
	};

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
				delete _this._targetTransitions[pageChange.target];
			});
		
		});
	};

	var _placePage = function(_this, target, page, isPrepared){
			if(null === page){
				return null;
			}
			
			if(page.getDomRef()){
				return page.$().parent();
			}

			var newPage = document.createElement('div');
			var $nextContent = jQuery(newPage);

			var newClassName = 'ui5strap-nc-page';
			if(true === isPrepared){
				 newClassName += ' ui5strap-nc-page-next ui5strap-hidden';
			}
			newPage.className = newClassName;
			newPage.id = 'ui5strap-nc-page-new-' + NavContainerBase.pageId;
				
			NavContainerBase.pageId++;

			var $targetContainer = _this.$().find('.' + _this.getId() + '--' + target);
			$targetContainer.append($nextContent);
			
			page.placeAt(newPage.id);
			
			_this.mAggregations[target] = page;
			
			return $nextContent;
	};

	NavContainerBaseProto.renderAggregation = function (rm, aggregationName) {
			rm.write("<div");
			rm.addClass("ui5strap-nc-aggregation " 
						+ this.getId() + '--' + aggregationName
						+ ' ui5strap-nc-aggregation-' + aggregationName);
			rm.writeClasses();
			rm.write(">");
			rm.write('<div class="ui5strap-nc-page ui5strap-nc-page-next ui5strap-hidden" id="ui5strap-nc-page-new-' + NavContainerBase.pageId + '">');
			var content = this.getPage(aggregationName);
			if(null !== content){
				rm.renderControl(content);
			}
			rm.write("</div></div>");

			NavContainerBase.pageId++;
	};

	NavContainerBaseProto.renderStart = function(rm, suffix) {
		 	rm.write("<div");
		    rm.writeControlData(this);
		    rm.addClass("ui5strap-nc ui5strap-nc-" + suffix);
		    rm.writeClasses();
		    rm.write(">");
	};

	NavContainerBaseProto.renderEnd = function(rm) {
		 	rm.write("</div>");
	};

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
	* Constructs a Transition
	* @constructor
	*/
	NavContainerBase.Transition = function(transitionName, $currentRoot, $nextRoot, transitionId){
		this.$current = $currentRoot;
		this.$next = $nextRoot;
		this._transitionId = transitionId;

		var transitionClass = transitionName;

		this.prepare = function (){
			if(null !== this.$current){
					this.$current.addClass(transitionClass + ' ' + transitionClass+'-current');
			}

		 	if(null !== this.$next){
					this.$next.addClass(transitionClass + ' ' + transitionClass+'-next').removeClass('ui5strap-hidden');
			}
		};

		this.execute = function (currentRootCallback, nextRootCallback){
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
				if(typeof currentRootCallback === 'function'){ 	
					currentRootCallback.call(this);
				}
				if(typeof nextRootCallback === 'function'){ 	
					nextRootCallback.call(this);
				}
			}

		 };

		 
	};

	NavContainerBaseProto.invalidate = function(){
		if(this.getDomRef()){
			return;
		}
		return sap.ui.core.Control.prototype.invalidate.call(this);
	}

	NavContainerBaseProto.hasAggregation = function(target){
		return target in this.getMetadata().getAggregations();
	};

	NavContainerBaseProto.setAggregation = function(aggregationName, newContent, suppressInvalidate){ 
		sap.ui.core.Control.prototype.setAggregation.call(this, aggregationName, newContent, suppressInvalidate);
		
		this.toPage(newContent, aggregationName);
		
		return this;
	};

	NavContainerBaseProto.getAggregationContainer = function(target){
		var $targetContainer = this.$().find('.' + this.getId() + '--' + target),
			$currentContent = $targetContainer.children().last();
			
			if($currentContent.size() === 0){
				return null;
			}
			return $currentContent;
	};

	NavContainerBaseProto.getPage = function(target){
		if(!this.hasAggregation(target)){
			throw new Error("Nav container does not support target: '" + target + "'");
		}

		return this['get' + jQuery.sap.charToUpperCase(target, 0)]();
	};

	NavContainerBaseProto.createPageChange = function(page, target, transitionName, callback){
		if(target in this._targetTransitions){
			return this._targetTransitions[target];
		}

		var targetTransition = {
				"target" : target,
				"transitionName" : transitionName ? transitionName : this.getDefaultTransition(),
				"transition" : null,
				"$current" : this.getAggregationContainer(target),
				"$next" : null,
				"$detach" : null,
				"callback" : callback,
				"page" : page
		};

		this._targetTransitions[target] = targetTransition;

		return targetTransition;
	}

	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		var _this = this;

		var currentPage = this.getPage(target),
			_this = this;

		var targetTransition = this.createPageChange(page, target, transitionName, callback);

		if(this.getDomRef()){
			if(currentPage === page && page.getDomRef() && page.$().parent().hasClass('ui5strap-nc-page-current')){
				return false;
			}

			targetTransition.$next = _placePage(this, target, page, true); 
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, 250);
		
		}
		else{
			console.log('Container not read, pushed ' + target);
			this._pendingTransitions.push(target);
		}
	};

	

	

	NavContainerBaseProto.onAfterRendering = function(){ console.log('render');
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransition = this._targetTransitions[_pendingTransitions[i]],
				target = targetTransition.target;

			var page = targetTransition.page;

			if(null === targetTransition.$next){
				targetTransition.$next = _placePage(this, target, page, true); 
			}
		}

		window.setTimeout(function anon_afterDomTimeout(){
			_pageTransitions(_this);	
		}, 250);
	};

}());