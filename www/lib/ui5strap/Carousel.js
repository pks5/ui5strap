/*
 * 
 * UI5Strap
 *
 * ui5strap.Carousel
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Carousel = ControlBase.extend("ui5strap.Carousel", {
		metadata : {

			defaultAggregation : "items",
			
			library : "ui5strap",
			
			//Properties
			properties : { 
				index : {
					type:"int", defaultValue : 0
				},
		        swipe : {
		            type:"boolean", defaultValue : true
		        },
				controls : {
					type:"boolean", defaultValue : true
				},
				pagination : {
					type:"boolean", defaultValue : true
				},
		        innerAlign : {
			        type: "ui5strap.Alignment",
			        defaultValue : ui5strap.Alignment.CenterBlock
		        },
		        innerOverflow : {
		            type: "ui5strap.CarouselOverflow",
		            defaultValue : ui5strap.CarouselOverflow.Visible
		        },
		        label : {
		            type:"string", defaultValue : ""
		        },
		        
		        //Columns DO inherit from smaller sizes
		        //TODO rename to columns
		        columnsExtraSmall : {
		            type:"int", defaultValue:-1
		        },
		        //TODO rename to columnsSmallUp
		        columnsSmall : {
		            type:"int", defaultValue:-1
		        },
		        //TODO rename to columnsMediumUp
		        columnsMedium : {
		            type:"int", defaultValue:-1
		        },
		        //TODO rename to columnsLargeUp
		        columnsLarge : {
		            type:"int", defaultValue:-1
		        },
		        //TODO add columnsExtraLarge on Bootstrap 4 Upgrade
		        
		        speed : {
		            type:"float", defaultValue : 0.5
		        },
		        cycle : {
		            type:"boolean",
		            defaultValue : false
		        },
		        interval : {
		            type:"int", defaultValue : 0
		        }
			},
			
			//Aggregations
			aggregations : {

				"items" : {},
				"content" : {}

			},
			
			//Events
			events : {
				
				//TODO rename to pageChange & pageChanged
				"change" : {},
				"changed" : {}
			}

		}
	}),
	CarouselProto = Carousel.prototype;

  /**
   * @Private
   */
  var _setInterval = function(_this, newInterval){
      if(_this.timer){
            window.clearInterval(_this.timer);
       }

       if(!newInterval){
          return;
       }

       this.timer = window.setInterval(function(){
          _this.nextPage(newIndex);
       }, newInterval);
  };

  /**
   * @Private
   */
  var _findPart = function(_this, partId, index){
      var idString = '#' + _this.getId()+ '--carousel-' + partId;
      if(index >= 0){
        idString += '-' + index;
      }
      return _this.$().find(idString);
  };

  /**
   * @Public
   * @Override
   */
  CarouselProto.init = function(){
		this.items = [];

    if(!ui5strap.support.transitionEndEvent){
      throw new Error('ui5strap.Carousel requires "transitionEndEvent" support.');
    }
  };

  /**
   * @Protected
   */
  CarouselProto._cssClasses = function(){
      var cssClasses = "carousel carousel-advanced",
      newIndex = this.getIndex(),
      columsMedium = this.getColumnsMedium(),
      columsLarge = this.getColumnsLarge(),
      columsSmall = this.getColumnsSmall(),
      columsExtraSmall = this.getColumnsExtraSmall();

      cssClasses += this.getCycle() ? " carousel-cycle" : " carousel-ends";
      
    if(0 < columsMedium){
      cssClasses += " carousel-md-" + columsMedium;
    }
    if(0 < columsLarge){
      cssClasses += " carousel-lg-" + columsLarge;
    }
    if(0 < columsSmall){
      cssClasses += " carousel-sm-" + columsSmall;
    }
    if(0 < columsExtraSmall){
      cssClasses += " carousel-xs-" + columsExtraSmall;
    }

    cssClasses += " carousel-overflow-" + this.getInnerOverflow().toLowerCase();
    cssClasses += " carousel-align-" + ui5strap.BSAlignment[this.getInnerAlign()];
       cssClasses += " carousel-current-" + newIndex;
      if(newIndex === 0){
        cssClasses += " carousel-current-first";
      }
      if(newIndex === this.items.length-1){
        cssClasses += " carousel-current-last";
      }

      return cssClasses;
  };

  /**
   * @Public
   * @Override
   */
	CarouselProto.onAfterRendering = function(){
	    var _this = this,
	    itemsLength = this.getItems().length;
	
	    //Store lane reference
			this.$lane = _findPart(this, 'lane');
	
	    if(ui5strap.support.transitionEndEvent){
	        this.$lane.on(ui5strap.support.transitionEndEvent, function(){
	            _this.fireChanged({});
	        });
	    }
	
	    this.pagination = [];
	    this.items = [];
	
	    for(var i = 0; i < itemsLength; i++){
	          this.pagination.push(_findPart(this, 'indicator', i));
	          this.items.push(_findPart(this, 'item', i));
	    }
	
	    this._refreshLabel();
	    
	    _setInterval(this, this.getInterval());
	};

  /**
   * @Public
   * @Override
   */	
  CarouselProto.setInterval = function(newInterval, noRefresh){
  
      if(!this.getDomRef()){ 
          this.setProperty('interval', newInterval, noRefresh);
      }
      else{
          _setInterval(this, newInterval);
          this.setProperty('interval', newInterval, true);
      }
  };

  /**
   * @Public
   * @Override
   */
  CarouselProto.setIndex = function(newIndex, suppressInvalidate){
  
    if(!this.getDomRef()){ 
      this.setProperty('index', newIndex, suppressInvalidate);
    }
    else{

      if(newIndex < 0 || newIndex >= this.items.length){
        return false;
      }
      
      var oldIndex = this.getIndex();

      //Set the property
      this.setProperty('index', newIndex, true);

      //Refresh Pagination
      if(this.getPagination()){
          this.pagination[oldIndex].removeClass('active');
          this.pagination[newIndex].addClass('active');
      }
      
      //Refresh CSS Classes
      for(var i = 0; i < this.items.length; i++){
          var newClass = null;
          
          if(i === newIndex){
            newClass = 'carousel-item active carousel-pos-0';
          }
          else{
            newClass = 'carousel-item carousel-pos-' + (i - newIndex);
          }
          
          this.items[i].attr('class', newClass);
      }
      
      this._refreshLabel();
      
      var rootClasses = this._cssClasses();
      if(this.aCustomStyleClasses){
    	  rootClasses += ' ' + this.aCustomStyleClasses.join(' ');
      }
      
      //Refresh carousel class
      this.$().attr("class", rootClasses);
      
      //Move the lane
      this.$lane.css('left',  (-newIndex * 100) + '%');

      //Fire change event
      this.fireChange({ 
        oldIndex : oldIndex
      });
    }
  };

  /**
  * Refreshes the label
  * @Protected
  */
  CarouselProto._refreshLabel = function(){
      var label = this.getLabel();
      if("" !== label){
        label = this.items.length > 0 ? label.replace("[index]", this.getIndex()).replace("[number]", this.getIndex() + 1).replace("[count]", this.items.length) : '';
        _findPart(this, 'label').html(label);
      }
  };

  /**
  * Change to next page
  * @Public
  */
  CarouselProto.nextPage = function(){
      var newIndex = this.getIndex()+1;
      if(this.getCycle() && newIndex >= this.items.length){
          newIndex = 0;
      }
      this.setIndex(newIndex);
  }; 

  /**
  * Change to previous page
  * @Public
  */
  CarouselProto.previousPage = function(){
      var newIndex = this.getIndex()-1;
      if(this.getCycle() && newIndex < 0){
          newIndex = this.items.length - 1;
      }
      this.setIndex(newIndex);
  };
  
  /**
   * @Public
   * @Override
   */
  CarouselProto.onswipeleft = function(){
      if(this.getSwipe()){ 
        this.nextPage();
      }
  };

  /**
   * @Public
   * @Override
   */
  CarouselProto.onswiperight = function(){
      if(this.getSwipe()){ 
        this.previousPage();
      }
  };
  
  /**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
  CarouselProto._handlePress = function(oEvent){
	  //Mark the event so parent Controls know that event has been handled already
	  oEvent.setMarked();
	  
	  	var $target = jQuery(oEvent.target);
	    if(this.getControls()){
		      if($target.hasClass('carousel-control-prev')){
		        this.previousPage();
		      }
		      else if($target.hasClass('carousel-control-next')){
		        this.nextPage();
		      }
	    }
	
	    if(this.getPagination()){
		      if($target.hasClass('carousel-indicator')){
		        this.setIndex(parseInt($target.attr('data-slide-to')));
		      }
	    }
  };

  if(ui5strap.support.touch){
	    CarouselProto.ontap = CarouselProto._handlePress;
	}
	else{
		CarouselProto.onclick = CarouselProto._handlePress;
	}

  return Carousel;
});