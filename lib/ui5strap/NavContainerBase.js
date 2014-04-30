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
			properties : {

			}
		}
	});

	var NavContainerBase = ui5strap.NavContainerBase,
		NavContainerBaseProto = NavContainerBase.prototype;

	NavContainerBase.pageId = 0;

	NavContainerBaseProto._targets = { 
		"content" : {}
	};

	NavContainerBaseProto.init = function(){
		this._pendingTransitions = [];
		this._targetTransitions = {};
		this._contents = {};
	};

	var _prepareTransitions = function(_this){
		for(var i = 0; i < _this._pendingTransitions.length; i++){
			var $current = _this._pendingTransitions[i].$current;
			var $nextContent = _this._pendingTransitions[i].$next;

			var transition = new NavContainerBase.Transition(_this._pendingTransitions[i].transitionName, $current, $nextContent, 'transition-nav-container');
			
			_this._pendingTransitions[i].transition = transition;

			transition.prepare();// alert('AR');
		}	
	};

	var _executeTransitions = function(_this){
		var callI = _this._pendingTransitions.length;
		for(var i = 0; i < _this._pendingTransitions.length; i++){
				var callback = _this._pendingTransitions[i].callback;
				var transition = _this._pendingTransitions[i].transition;
				transition.callback = callback;

				transition.execute(
					function anon_transitionCurrentComplete(){
						
						var $current = this.$current;
						if(null !== $current){
							$current.remove();
						}

						callI --;
						//TODO callback must be triggered ONCE for both callbacks
						if(0 === callI && typeof this.callback === 'function'){
							this.callback();
						}

					}, 
					function anon_transitionPreparedComplete(){
						this.$next.attr('class', 'ui5strap-nc-page ui5strap-nc-page-current');
					}
				);
		}
		

		_this._pendingTransitions = [];
		_this._targetTransitions = {};
	};

	var _pageTransitions = function(_this){
		requestAnimationFrame(function(){

			_prepareTransitions(_this);
			requestAnimationFrame(function(){
				_executeTransitions(_this);
			});
		
		});
	};

	var _placePage = function(_this, target, page, isPrepared){
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

			return $nextContent;
	};

	NavContainerBaseProto.hasTarget = function(target){
		return target in this._targets;
	};

	NavContainerBaseProto.renderTarget = function (rm, aggregationName) {
			rm.write("<div");
			rm.addClass("ui5strap-nc-aggregation " 
						+ this.getId() + '--' + aggregationName
						+ ' ui5strap-nc-aggregation-' + aggregationName);
			rm.writeClasses();
			rm.write("></div>");
	};

	NavContainerBaseProto.renderStart = function(rm) {
		 	rm.write("<div");
		    rm.writeControlData(this);
		    rm.addClass("ui5strap-nc ui5strap-nc-default");
		    rm.writeClasses();
		    rm.write(">");
	};

	NavContainerBaseProto.renderEnd = function(rm) {
		 	rm.write("</div>");
	};

	var _transitionEndEvent = null;

	var transitions = {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'transitionend',
	    'OTransition': 'otransitionend'
	  },
	  elem = document.createElement('div');
	 
	  for(var t in transitions){
	    if(typeof elem.style[t] !== 'undefined'){
	      _transitionEndEvent = transitions[t];
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

	NavContainerBaseProto.setPage = function(page, target, transitionName, callback){
		var currentPage = this.getPage(target),
			navContainer = this;

		if(currentPage === page){
			//console.log('Is current page');
			return false;
		}

		var $targetContent = this.getTargetContent(target);

		var targetTransition = {
				"target" : target,
				"transitionName" : transitionName,
				"transition" : null,
				"$current" : $targetContent,
				"$next" : null,
				"$detach" : null,
				"callback" : callback,
				"page" : page,
				"currentPage" : currentPage
		};

		this._pendingTransitions.push(targetTransition);

		if(!(target in this._targetTransitions)){
			this._targetTransitions[target] = [];
		}

		this._targetTransitions[target].push(targetTransition);

		if(null === page){
			delete navContainer._contents[target];
		}
		else{
			//page.rerender();
			navContainer._contents[target] = page;
		}

		if(this.$().length > 0){
			if(null !== page){
				targetTransition.$next = _placePage(this, targetTransition.target, page, true); 
			}
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageTransitions(navContainer);	
			}, 250);
		}
	};

	NavContainerBaseProto.getTargetContent = function(target){
		var $targetContainer = this.$().find('.' + this.getId() + '--' + target),
			$currentContent = $targetContainer.children().last();
			
			if($currentContent.size() === 0){
				return null;
			}
			return $currentContent;
	};

	NavContainerBaseProto.getPage = function(target){
		if(!this.hasTarget(target)){
			throw new Error("Nav container does not support target: '" + target + "'");
		}

		if( !(target in this._contents) ){
			return null;
		}

		return this._contents[target];
	};

	

	NavContainerBaseProto.getPendingTransitions = function(){
		return this._pendingTransitions;
	};

	NavContainerBaseProto.getTargetTransitions = function(target){
		if(!(target in this._targetTransitions)){
			return null;
		}
		return this._targetTransitions[target];
	};

	NavContainerBaseProto.onAfterRendering = function(){
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			navContainer = this,
			contentsKeys = Object.keys(this._contents),
			contentsKeysLength = contentsKeys.length;

		for(var i = 0; i < contentsKeysLength; i++){
			var contentKey = contentsKeys[i];

			if(!(contentKey in this._targetTransitions)){
				_placePage(this, contentKey, this._contents[contentKey], false); 
			}
		}	

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransition = _pendingTransitions[i],
				target = targetTransition.target;

			var page = targetTransition.page;

			if(null !== page){
				targetTransition.$next = _placePage(this, target, page, true); 
			}
		}

		window.setTimeout(function anon_afterDomTimeout(){
			_pageTransitions(navContainer);	
		}, 250);
	};

}());