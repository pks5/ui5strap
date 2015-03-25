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

(function(){

	jQuery.sap.declare("ui5strap.Carousel");


	sap.ui.core.Control.extend("ui5strap.Carousel", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
			// ---- control specific ----
			library : "ui5strap",
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
        showIndex : {
          type:"boolean", defaultValue : false
        },
        columnsExtraSmall : {
          type:"int", defaultValue:-1
        },
        columnsSmall : {
          type:"int", defaultValue:-1
        },
        columnsMedium : {
          type:"int", defaultValue:-1
        },
        columnsLarge : {
          type:"int", defaultValue:-1
        },
        centered : {
          type:"boolean",
          defaultValue : false
        },
        speed : {
          type:"float", defaultValue : 0.5
        },
        interval : {
          type:"int", defaultValue : 0
        }
			},
			aggregations : {

				"items" : {}

			},
			events : {
				"change" : {}
			}

		}
	});

  var CarouselProto = ui5strap.Carousel.prototype;

  var _setInterval = function(_this, newInterval){
      if(_this.timer){
            window.clearInterval(_this.timer);
       }

       if(!newInterval){
          return;
       }

       this.timer = window.setInterval(function(){
          var newIndex = _this.getIndex()+1;
          if(newIndex >= _this.pagesCount){
            newIndex = 0;
          }
          _this.setIndex(newIndex);
        }, newInterval);
  };

  CarouselProto.init = function(){
		this.pagesCount = 0;
	};

	CarouselProto.onAfterRendering = function(){
		this.$lane = this.$().find('#' + this.getId()+ '--carousel-lane');
  
    this.pagesCount = this.getItems().length;

    if(this.getShowIndex()){
      this.setIndexLabel(this.getIndex());
    }

    _setInterval(this, this.getInterval());
	};

  CarouselProto.setInterval = function(newInterval, noRefresh){
  
      if(!this.getDomRef()){ 
          this.setProperty('interval', newInterval, noRefresh);
      }
      else{
          _setInterval(this, newInterval);
          this.setProperty('interval', newInterval, true);
      }
  };


  CarouselProto.onswipeleft = function(){
      if(this.getSwipe()){ 
        this.nextPage();
      }
  };

  CarouselProto.onswiperight = function(){
      if(this.getSwipe()){ 
        this.previousPage();
      }
  };

  CarouselProto.ontap = function(e){
    var $target = jQuery(e.target);
    if(this.getControls()){
      if($target.data('slide') === 'prev'){
        this.previousPage();
      }
      else if($target.data('slide') === 'next'){
        this.nextPage();
      }
    }

    if(this.getPagination()){
      if($target.hasClass('carousel-indicator')){
        this.setIndex(parseInt($target.attr('data-slide-to')));
      }
    }
  };

  CarouselProto.setIndex = function(newIndex){
  
    if(!this.getDomRef()){ 
      sap.ui.core.Control.prototype.setProperty.call(this, 'index', newIndex);
    }
    else{

      if(newIndex < 0 || newIndex >= this.pagesCount){
        return false;
      }
      
      var oldIndex = this.getIndex();

      this.$lane.css('left',  (-newIndex * 100) + '%');
      
      if(this.getPagination()){
        var paginationItems = this.$().find('#' + this.getId()+ '--carousel-indicators').find('li');
        //console.log(this.getIndex());
        paginationItems.eq(oldIndex).removeClass('active');
        paginationItems.eq(newIndex).addClass('active');
      }
      
      for(var i = 0; i < this.pagesCount; i++){
        var $page = this.$().find('#' + this.getId()+ '--carousel-item-' + i),
          newClass = null;
        
        if(i === newIndex){
          newClass = 'carousel-item active carousel-pos-0';
        }
        else{
          newClass = 'carousel-item carousel-pos-' + (i - newIndex);
        }
        
        $page.attr('class', newClass);
      }
      
      this.setProperty('index', newIndex, true);

      if(this.getShowIndex()){
        this.setIndexLabel(newIndex);
      }

      this.fireChange({ newIndex : newIndex });
    }
  };

  CarouselProto.setIndexLabel = function(newIndex){
    var indexLabel = this.pagesCount > 0 ? (newIndex + 1) + ' / ' + this.pagesCount : '';
    this.$().find('#' + this.getId()+ '--carousel-index').html(indexLabel);
  };

  CarouselProto.nextPage = function(){
      this.setIndex(this.getIndex() + 1);
  }; 

  CarouselProto.previousPage = function(){
      this.setIndex(this.getIndex() - 1);
  };

}());