/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.NavContainer
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
 
sap.ui.define(['./library', './ControlBase', './ResponsiveTransition', "./Utils"], function(ui5strapCoreLib, ControlBase, ResponsiveTransition, Utils){

	"use strict";
	
	/**
	 * Constructor for a new NavContainer instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating nav containers.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.NavContainer
	 * 
	 */
	var NavContainer = ControlBase.extend("pks.ui5strap.core.NavContainer", /** @lends pks.ui5strap.core.NavContainer.prototype */ {
		metadata : {
			interfaces : ["pks.ui5strap.core.INavigator"],
			
			library : "pks.ui5strap.core",
			
			properties : {
				defaultTransition : {
					type : "string",
					defaultValue : "slide-rtl"
				}
			},
			
			events : {
				pageChange : {
					parameters : {
						"target" : {type : "string"},
						"oldPage" : {type : "sap.ui.core.Control"}
					}
				},
				
				pageChanged : {
					parameters : {
						"target" : {type : "string"},
						"oldPage" : {type : "sap.ui.core.Control"}
					}
				},
				
				pageUpdate : {
					parameters : {
						"target" : {type : "string"},
						"pageParameters" : {type : "object"},
						"page" : {type : "sap.ui.core.Control"}
					}
				}
			}
		}
	}),
	/**
	 * @alias pks.ui5strap.core.NavContainer.prototype
	 */
	NavContainerProto = NavContainer.prototype,
	SAP_LOG = jQuery.sap.log,
	domAttachTimeout = 50;
	
	/**
	 * Returns the style class prefix of this control.
	 * @protected
	 * @override
	 */
	NavContainerProto._getStyleClassPrefix = function(){
		return "navcontainer";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	NavContainerProto._getStyleClassRoot = function(){
		return " navcontainer navcontainer-type-" + this.ncType;
	};
	
	/*
	 * START CUSTOM Ids and Classes
	 */
	
	/**
	* Creates a dom id for a given target and page
	* @Public
	*/
	NavContainerProto.createPageDomId = function(target, page){
		if(page === null){
			return 'navcontainer-page---' + this._targetPagesCount[target];
		}

		return 'navcontainer-page---' + page.getId();
	};

	/**
	* Registers a new dom id for a given target and page
	* @Public
	*/
	NavContainerProto.pageDomId = function(target, page){
		if(!(target in this._targetPagesCount)){
			this._targetPagesCount[target] = 0;
		}
		
		this._targetPagesCount[target]++;

		return this.createPageDomId(target, page);
	};
	
	/**
	 * TODO Improve component ID syntax
	 * @public
	 */
	NavContainerProto.targetDomId = function(target){
		return 'navcontainer-target-' + target + '---' + this.getId();
	};
	
	/**
	 * TODO Improve component ID syntax
	 * @public
	 */
	NavContainerProto.targetPagesDomId = function(target){
		return 'navcontainer-pages-' + target + '---' + this.getId();
	};

	/**
	 * TODO Improve component ID syntax
	 * @public
	 */
	NavContainerProto.targetLayersDomId = function(target){
		return 'navcontainer-layers-' + target + '---' + this.getId();
	};
	
	/**
	 * @Protected
	 */
	NavContainerProto._getTargetClassString = function(target){
		return "navcontainer-target navcontainer-target-" + target;
	};
	
	/*
	 * END CUSTOM Ids and Classes
	 */
	
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
			
			//TODO firePageEvent 
			controller 
				&& controller.firePageEvent 
				&& controller.firePageEvent(new sap.ui.base.Event("ui5strap.controller." + eventId, _this, eventParameters || {}), eventId);
		}
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _prepareTransition = function(_this, pageChange){
		if(pageChange.transition){
			SAP_LOG.warning("NavContainer::_prepareTransition: Transition already prepared for target " + pageChange.target);
			//There is already a Transition defined
			return false;
		}
		else{
			var sTransitionName = pageChange.transitionName;
			if(!sTransitionName){
				sTransitionName = _this.getDefaultTransition();
			}
			
			var transition = new ResponsiveTransition({
					"transitionAll" : sTransitionName, 
					"$current" : pageChange.$current, 
					"$next" : pageChange.$next, 
					id : 'nc-' + _this.ncType + '-' + pageChange.target
			});
				
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
		transList.callI --;
		
		var callbacksLength = transList.callbacks.length;
		if(0 === callbacksLength){
			//SAP_LOG.debug("No transition callbacks.");
			
			return;
		}

		if(0 === transList.callI){
			//SAP_LOG.debug("Calling " + callbacksLength + " callbacks.");
			
			for(var i = 0; i < callbacksLength; i++){
				transList.callbacks[i]({
					target : pageChange.target,
					oldPage : pageChange.currentPage
				});
			}

			//pageChange 
		}
		//else{
			//SAP_LOG.debug("Transition callback " + transList.callI + " call left.");
		//}
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		SAP_LOG.info(_this + " Execute transition '" + pageChange.changeName + "' ...");
		
		if(pageChange.currentPage === pageChange.page){
			throw new Error("Cannot execute transitions with 2 same instances: " + pageChange.page.getId());
		}
		
		pageChange.transition.on("last", function(){
			//Current Page
			var oCurrentPage = pageChange.currentPage;
			if(oCurrentPage){
				var oUiArea = oCurrentPage.getParent();
				if(oUiArea){
					var $current = pageChange.transition.getData().$current;
					
					//If current page has a dom reference, detach it now.
					$current.detach();
					
					var areaId = oUiArea.getId();
					
					//Remove the Page from the UIArea first, since we don't want to destroy the page.
					oUiArea.removeContent(oCurrentPage, true);
					oUiArea.setRootNode(null);
					oUiArea.destroy();
					
					SAP_LOG.info(_this + " Destroyed UIArea '" + areaId + "' of Page '" + oCurrentPage.getId() + "'.");
					
					//if current page has a dom reference, remove it now.
					$current.remove();
				}
				else{
					SAP_LOG.warning("Page has no UIArea!");
				}
				
				_triggerControllerEvent(_this, pageChange.target, oCurrentPage, 'pageHidden', {
					target : pageChange.target,
					newPage : pageChange.page
				});
			}
			
			//Next Page
			if(pageChange.page){ //console.log(pageChange.transition.getData());
				var $next = pageChange.transition.getData().$next;
				if($next){
					$next.attr('class', 'navcontainer-page navcontainer-page-current');
				}
				else{
					throw new Error("Next page has no DOM reference.");
				}
				
				_triggerControllerEvent(_this, pageChange.target, pageChange.page, 'pageShown', {
					target : pageChange.target,
					oldPage : pageChange.currentPage
				});
			}
			
			_this.firePageChanged({
				target : pageChange.target,
				oldPage : pageChange.currentPage
			});
			
			//Transition callback
			_transitionCallback(_this, pageChange, transList);
		});
		
		//Start the transition
		pageChange.transition.execute();
	};

	/**
	* Should always be surrounded by a RAF 
	* @Private
	*/
	var _executePendingTransitions = function(_this){
		SAP_LOG.info(_this + " Executing pending transitions (" + _this._pendingTransitions.length + ") ...");
		
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
			
			var lastPageChange = pageChanges[pageChanges.length-1];
			
			if(lastPageChange.page === lastPageChange.currentPage){
				SAP_LOG.info(_this + "Page is already current: '" + lastPageChange.changeName + "'.");
				//This can happen if the navcontainer is rerendered, but page is already current.
				
				lastPageChange.transition.getData().$next.attr('class', 'navcontainer-page navcontainer-page-current');
				_transitionCallback(_this, lastPageChange, transList);
			}
			else{
				_executeTransition(_this, lastPageChange, transList);
			}
		}
		
		_this._pendingTransitions = [];
		_this._targetTransitions = {};
		
		//SAP_LOG.debug("Executed pending transitions");
	};

	/**
	 * Should always be surrounded by a RAF.
	* @Private
	*/
	var _preparePendingTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length,
			successAll = true;
		//SAP_LOG.debug(' + [NC] PREPARE ' + pendingTransitionsLength + ' PENDING TRANSITIONS'); 
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]],
				pageChange = pageChanges[pageChanges.length-1]; //Only show the last pageChange
			
			_onPageChange(_this, pageChange);
			
			successAll = _prepareTransition(_this, pageChange) && successAll;
		}

		return successAll;
	};

	/**
	* @Private
	*/
	var _handlePendingTransitions = function(_this){
		if(0 === _this._pendingTransitions.length){
			
			//No pending transitions, so return.
			return;
		
		}
		
		//RAF start
		ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF1(){

			if(!_preparePendingTransitions(_this)){
				//SAP_LOG.debug(" - [NC] CANCEL HANDLING PENDING TRANSITIONS");
				SAP_LOG.warning("Canceled pending transitions");
				return;
			}
			
			ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF2(){
				_executePendingTransitions(_this);
			});
		
		});
		//RAF end
	};
	
	var _onPageChange = function(_this, pageChange){
		var page = pageChange.page,
			currentPage = pageChange.currentPage,
			target = pageChange.target;
		
		if(currentPage){
			_triggerControllerEvent(_this, target, currentPage, 'pageHide', {
				target : target,
				newPage : page
			});
		}

		if(page){
			_triggerControllerEvent(_this, target, page, 'pageShow', {
				target : target,
				oldPage : currentPage
			});
		}
		
		_this.firePageChange({
			target : target,
			oldPage : currentPage
		});
	};

	/**
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		//SAP_LOG.debug("Page change: " + pageChange.changeName);
		
		_onPageChange(_this, pageChange);
		
		var transList = {
			callI : 1,
			callbacks : []
		};
		
		if(pageChange.callback){
			transList.callbacks.push(pageChange.callback);
		}
		
		//RAF start
		ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF1(){
			
			//Prepare Transition before next repaint
			_prepareTransition(_this, pageChange);
			
			ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF2(){
				
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
		var target = pageChange.target;
		if(-1 === jQuery.inArray(target, _this._pendingTransitions)){ 
			_this._pendingTransitions.push(target);

			if(!_this._targetTransitions[target]){
				_this._targetTransitions[target] = [];
			}
		}

		if(override || _this._targetTransitions[target].length === 0){
			//SAP_LOG.debug(' + [NC] T1L {' + pageChange.target + '}');
			_this._targetTransitions[target].push(pageChange);
		}
		//else{
			//SAP_LOG.debug(' + [NC] T1S {' + pageChange.target + '}');
		//}
	};

	/**
	* @Private
	*/
	var _placePage = function(_this, target, page, isPrepared){
			//Page is null, return null
			if(!page){
				return null;
			}
			
			//Create dom element and jQuery wrapper
			var newPageContainer = document.createElement('div'),
				$newPageContainer = jQuery(newPageContainer);
			
			//Page still has a valid dom reference. Reuse the dom ref.
			//TODO Why?
			if(page.getDomRef()){
				throw new Error("Page already has a reference!");
				
				/*
				SAP_LOG.debug("Reusing DOM reference for page: " + page.getId() );
				
				var $parent = page.$().parent();
				if($parent.hasClass('navcontainer-page')){
					
					newPageContainer = $parent[0];
					$newPageContainer = $parent;
					
					SAP_LOG.debug("Recreated UIArea " + newPageContainer.id);
				
					if($newPageContainer.attr("data-sap-ui-area")){
						SAP_LOG.warning("Existing page container already has a UIArea assigned.");
					}
				}
				*/
			}
			
			//Set css class name for new page container
			newPageContainer.className = true === isPrepared
					? 'navcontainer-page navcontainer-page-next ui5strap-hidden'
					: 'navcontainer-page';
			
			//Create and set id for new page container
			//newPageContainer.id = _this.pageDomId(target, page);
			
			//Append page container to the dom
			jQuery('#' + _this.targetPagesDomId(target)).append($newPageContainer);
			
			//Add page to new page container
			page.placeAt(newPageContainer);
			
			SAP_LOG.info(_this + " Created UIArea '" + page.getParent().getId() + "' for Page '" + page.getId() + "'.");
			
			//Propagate Properties
			//This must be done after the Page has attached to DOM,
			//because the page might get a new UIArea as Parent and therefore new propagated properties.
			Utils.addPropertyPropagation(_this, page);
			
			//SAP_LOG.debug(" + [NC] NEW PAGE {" + target + "} #" + page.getId());

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
	NavContainerProto.init = function(){
		this._pendingTransitions = [];
		
		this._targetTransitions = {};

		this._targetPagesCount = {};
		
		//TODO Do we need a busy flag here?
		this._targetStatus = {};

		this._initNavContainer();
	};

	/**
	* @Override
	* @Protected
	*/
	NavContainerProto._initNavContainer = function(){
		//NavContainer type string. Should only contain letters, numbers and hyphens.
		this.ncType = "default";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
			"content" : null
		};
	};

	

	
	
	/*
	 *
	 * START Implement pks.ui5strap.core.INavigator
	 * 
	 */
	
	/**
	* @Public
	* @Override
	*/
	NavContainerProto.updateTarget = function(target, oPage, eventParameters){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}
		
		eventParameters = eventParameters || {};
		
		if(eventParameters.target){
			throw new Error('Parameters must not contain a target attribute!');
		}
		
		_triggerControllerEvent(this, target, oPage, 'pageUpdate', eventParameters);
		
		this.firePageUpdate({
			"target" : target,
			"pageParameters" : eventParameters,
			"page" : oPage
		});
		
	};
	
	/**
	 * @Public
	 * @Override
	 */
	NavContainerProto.hasTarget = function(target){
		return target in this.targets;
	};
	
	/**
	 * @Public
	 * @Override
	 */
	NavContainerProto.getTarget = function(target){
		return this.targets[target];
	};
	
	/**
	 * @Public
	 * @Override
	 */
	NavContainerProto.isTargetBusy = function(target){
		return this._targetStatus[target];
	};
	
	/**
	 * @Public
	 * @Override
	 */
	NavContainerProto.setTargetBusy = function(target, targetBusy){
		if(this._targetStatus[target] && targetBusy){
			throw new Error("Cannot set target busy: already busy!");
		}
		this._targetStatus[target] = targetBusy;
		SAP_LOG.info(this + " Target '" + target + "' is " + (targetBusy ? 'busy' : 'available') + ".");
	};
	
	/**
	* @Public
	* @Override
	*/
	NavContainerProto.toPage = function(page, target, transitionName, callback){
		//SAP_LOG.debug("[NC#" + this.getId() + "] to page on target " + target);
		
		if(!(target in this.targets)){
			throw new Error(this + " Invalid target: '" + target + "'.");
		}
		
		SAP_LOG.info(this + " Navigating on target '" + target + "' ...");
		
		var _this = this,
			currentPage = this.targets[target];

		if(this.getDomRef() && currentPage === page){
			if(currentPage.getDomRef()){
				SAP_LOG.info(this + " Page '" + currentPage.getId() + "' already shown on target '" + target + "'.");
	
				callback && callback({
					target : target,
					currentPage : page
				});
			}
			else{
				throw new Error(this + " Page '" + currentPage.getId() + "' doesn't have a dom reference.");
			}
			
			return false;
		}

		this.targets[target] = page;
		
		var changeName = '{' + target + '} '
							+ (null === currentPage ? 'None' : '#' + currentPage.getId()) 
							+ ' => '
							+ (null === page ? 'None' : '#' + page.getId())
							+ ' ("'
							+ transitionName + '")';

		//var $currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			var targetTransition = {
				"changeName" : changeName,
				"target" : target,
				"transitionName" : transitionName,
				"transition" : null,
				"$current" : currentPage ? currentPage.$().parent() : null,
				"$next" : null,
				"callback" : callback,
				"page" : page,
				"currentPage" : currentPage
			};
		
		if(this.getDomRef()){
			SAP_LOG.debug(this + " Already attached. Navigating now ...");
			//NavContainer is already attached to DOM
			targetTransition.$next = _placePage(_this, target, page, true);
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, domAttachTimeout);
		}
		else{
			SAP_LOG.debug(this + " Not attached to dom yet.");

			//NavContainer not attached to DOM yet
			//It will override all pending transitions on this target!
			_pageChangeLater(_this, targetTransition, true);
		}

		return true;
	};
	
	/*
	 *
	 * END Implement pks.ui5strap.core.INavigator
	 * 
	 */
	
	/*
	 * START OpenUi5 MOD
	 * Since we do not use aggregations in NavContainer, we have to care about propagation and destroying ourselves.
	 * Usually, this happens in ManagedObject.prototype.propagateProperties and ManagedObject.prototype.destroy.
	 */
	
	/**
	* @Override
	*/
	NavContainerProto.propagateProperties = function(vName){
		var oProperties = this._getPropertiesToPropagate(),
			bUpdateAll = vName === true, // update all bindings when no model name parameter has been specified
			sName = bUpdateAll ? undefined : vName,
			sTarget, oTarget, i;
	
		for (sTarget in this.targets) {
			oTarget = this.targets[sTarget];
			if (oTarget instanceof sap.ui.base.ManagedObject) {
				this._propagateProperties(vName, oTarget, oProperties, bUpdateAll, sName);
			}
		}
		
	};
	
	NavContainerProto.updateBindingContext = function(bSkipLocal, bSkipChildren, sFixedModelName, bUpdateAll){
		ControlBase.prototype.updateBindingContext.call(this, bSkipLocal, bSkipChildren, sFixedModelName, bUpdateAll);
		
		var oModelNames = {},
			sModelName,
			oContext,
			sTarget;

		// find models that need an context update
		if (bUpdateAll) {
			for (sModelName in this.oModels) {
				if ( this.oModels.hasOwnProperty(sModelName) ) {
					oModelNames[sModelName] = sModelName;
				}
			}
			for (sModelName in this.oPropagatedProperties.oModels) {
				if ( this.oPropagatedProperties.oModels.hasOwnProperty(sModelName) ) {
					oModelNames[sModelName] = sModelName;
				}
			}
		} else {
			oModelNames[sFixedModelName] = sFixedModelName;
		}

		for (sModelName in oModelNames ) {
			if ( oModelNames.hasOwnProperty(sModelName) ) {
				sModelName = sModelName === "undefined" ? undefined : sModelName;

				if (!bSkipChildren) {
					var oContext = this.getBindingContext(sModelName);
					// also update context in all child elements
					for (sTarget in this.targets) {
						var oTarget = this.targets[sTarget];
						if (oTarget instanceof sap.ui.base.ManagedObject) {
							oTarget.oPropagatedProperties.oBindingContexts[sModelName] = oContext;
							oTarget.updateBindingContext(false,false,sModelName);
						}
					}
				}
			}
		}
	};
	
	/*
	 * END OpenUi5 MOD
	 */

	/**
	* @Override
	* @Public
	*/
	NavContainerProto.onBeforeRendering = function(){
		for(var target in this.targets){
			var currentPage = this.targets[target];
			if(currentPage){
				//Make sure the exising page is reattached after rerendering. If another transition is pending on this target, the new transition is overriding this.
				_pageChangeLater(this, {
					changeName : "rerender",
					target : target,
					transitionName : ResponsiveTransition.NO_TRANSITION,
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
	NavContainerProto.onAfterRendering = function(){ 
		//SAP_LOG.debug("[NC#" + this.getId() + "] after rendering...");
		
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
				//TODO When does this ever happen?
				SAP_LOG.warning("N-APPEND !!!");
				//Reappend existing reference
				jQuery('#' + _this.targetPagesDomId(targetTransition.target)).append(targetTransition.$next);
			}
		}
		
		//Dom Attach Timeout
		window.setTimeout(function anon_afterDomTimeout(){
			_handlePendingTransitions(_this);	
		}, domAttachTimeout);
		
	};
	
	/**
	 * Destroys targets before the current control is destroyed.
	* @Override
	*/
	
	NavContainerProto.exit = function(){
		SAP_LOG.info(this + " Destroying ...");
		
		for(var target in this.targets){
			var oPage = this.targets[target];
			
			if(oPage){
				//var $page = oPage.$().parent();
				
				var oUiArea = oPage.getParent(),
					sAreaId = oUiArea.getId();
			
				//$page.detach();
				
				oUiArea.removeContent(oPage, true);
				oUiArea.setRootNode(null);
				oUiArea.destroy();
				
				SAP_LOG.info(this + " Destroyed UIArea '" + sAreaId + "' of Page '" + oPage.getId() + "'");
				
				//$page.remove();
			}
		}
		
		this._pendingTransitions = null;
		this._targetTransitions = null;
		
		this._targetPagesCount = null;
		this._targetStatus = null;
		
		this.targets = null;
	};
	
	NavContainerProto.toString = function(){
		return "{NavContainer id='" + this.getId() + "'}";
	};

	return NavContainer;
});