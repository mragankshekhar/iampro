get_total_item("image");
get_total_item("video");
get_total_item("product");
get_total_item("PROVIDE");
get_total_item("DEMAND");
get_total_friend();

//alert(getCookie('banner_image'));

var start=0;var end=10;
AllFeeds(start,end);
//alert(getCookie('avatar'));
var avatar = getCookie('avatar');
var userimage='<img src="'+avatar+'" class="pro-img">';
$(".user_image").html(userimage);
$(".user-name").html(getCookie('fullname'));
$(".about_me").html(getCookie('about_me'));
$(".about_meemail").html(getCookie('email'));

$("#banner_image").css({"background-image":"url("+getCookie('banner_image')+")",    "background-size":" cover"});

function get_total_item(name){
	var uid=getCookie('uid');
	//alert(name+"//"+uid);
	  $.getJSON(URL_ROOT+"api/ajax.php",{type:"total_item",data_type:name,uid:uid},function (data){
		if(name=='image'){
			$('.total_img').html(data.total_count);
			}
			else if(name=='video'){
			$('.total_video').html(data.total_count);
			}
			else if(name=='product'){
			$('.total_product').html(data.total_count_product);
			}
			else if(name=='PROVIDE'){
			$('.total_provide').html(data.total_count_product_classified);
			}
			else if(name=='DEMAND'){
			$('.total_demand').html(data.total_count_product_classified);
			}
	});
 }
 function get_total_friend(){
	var uid=getCookie('uid');
	//alert(name+"//"+uid);
	  $.getJSON(URL_ROOT+"api/ajax.php",{type:"total_friend",uid:uid},function (data){
		$('.total_friend').html(data.total_count);
			
	});
 }
 
function sendMsg(){
	//showToast("hiiiii","success");
	var update_info_id=$('#update_info_id').val();
	//var comments=('#comments').val();
	var comment=$('#comment').val();
	//alert(update_info_id+"//"+comment);
	$('#reset_btn').click();
	$.getJSON(URL_ROOT+"ajax/product.php",{type:"product_review",update_info_id:update_info_id,comment:comment,id:getCookie('uid')},function (data){
		console.log(data);
		if(data.status=='success'){
			showToast(data.msg,"success");
			count_comment();
		}
			
	});
	
	}
 function count_comment(){
		   if($('#comments').val()!=""){
			   var new_count = 1+ parseInt($('#comments').val());
			   var id=$('#update_info_id').val()
			   //alert(new_count+"///"+id); 
			   $('#total_comment'+id).html(new_count);
		   }
		};
 
 function AllFeeds(start,end){
	 myApp.showPreloader('Loading...');
	var uid=getCookie('uid');
	//alert(start+"//"+end);
	  $.getJSON(URL_ROOT+"api/ajax.php",{type:"AllFeeds",start:start,end:end},function (data){
		var datas="";
		console.log(data);
		
		$.each(data,function(key,val){
			datas+='<div class="card facebook-card"><div class="card-header no-border"><div class="facebook-avatar"><img src="'+URL_ROOT+'uploads/avatar/20/20/'+val.avatar+'" width="34" height="34"></div><div class="facebook-name">'+val.fullname+'</div><div class="facebook-date">'+val.udate+'</div></div><hr><div class="card-content feed_div">'+val.Detail+'</div><div class="card-footer no-border"><a href="#" ><input type="hidden" value="10" id="limit'+val.id+'"><span class="rating_star hidden-sm pull-left" star-count="'+val.average_rating+'" id="total_rate'+val.id+'"></span></a><a href = "#" data-popup = ".first_page" class = "link open-popup link"  onClick="getAllCmt('+val.id+',\'update_info_id\');$(\'#update_info_id\').val(\''+val.id+'\');$(\'#comments\').val(\''+val.all_comment+'\');"><i class="icon ion-ios-pricetags-outline"> &nbsp;<span id="total_comment'+val.id+'">'+val.all_comment+'</span></i></a><a href="#" class="link"><div class="row lead evaluation clearfix pull-right"><div id="colorstar" class="starrr ratable"></div><input type="hidden" id="count" data-id="'+val.id+'" data-type="update_info_id" value="0"></div></a></div></div>'
});
myApp.hidePreloader();
		$('.all_feed').html(datas);
		getrate()
		startCheck()
	});
 }
 function getAllCmt(id,cmt_type){
			//alert(id+'//'+cmt_type);
			//$('#myloderone').show();
			myApp.showPreloader('Loading...');
			var limit=$('#limit'+id).val();
			 $.getJSON(URL_ROOT+"ajax/product.php",{type:"getAllCmt",id:id,cmt_type:cmt_type,limit:limit},function (data){
				// alert(data);
			 var datas=""; var msg_operation="";
			 if(data!=''){
			 $.each(data,function(key,val){
//$('#myloderone').hide();
				
				  datas+='<li style="background-color: #eee;"><a href="#" class="item-link item-content"><div class="item-media"><img src="'+URL_ROOT+'/uploads/avatar/50/50/'+val.avatar+'" style="width: 100%;" ></div><div class="item-inner"><div class="item-title-row" style="background-image: none !important;"><div class="item-title" >'+val.name+'</div></div><div class ="item-subtitle">'+val.date+'</div><div class="item-text">'+val.comment+'</div></div></a></li><hr/>';
			 
				  })
			 }else{
				 datas='<img src="'+URL_ROOT+'uploads/NoRecordFound.png" style="width:100%">';
				 }
				 myApp.hidePreloader();
				  $('#all_CMT').html(datas);
				  console.log(datas)
			 });
		}
 
function getrate(){
 <!------------------------------star rating------------------------------------->
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='icon ion-star'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('ion-ios-star-outline').addClass('ion-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('ion-star').addClass('ion-ios-star-outline');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('ion-star').addClass('ion-ios-star-outline');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
    
    var correspondence=["","Really Bad","Bad","Fair","Good","Excelent"];
      
  $('.ratable').on('starrr:change', function(e, value){
   	 var countinput=$(this).closest('.evaluation').children('#count');
     countinput.val(value);
	 rate_me(value,countinput.attr("data-id"),countinput.attr("data-type"));
    
    
  });
  
  $('#hearts-existing').on('starrr:change', function(e, value){
    $('#count-existing').html(value);
  });
});
<!------------------------------star rating------------------------------------->
}
function rate_me(rating,id,ptype){
		//var rating=$('#count').val();
		//alert(id+"hiii"+rating+"hiii"+r_type);
		$.getJSON(URL_ROOT+"ajax/product.php",{type:"rate_me",id:id,ptype:ptype,rating:rating},function (data){
				if(data.status=='success'){
					//alert(data.avg_rating);
					$('#total_rate'+id).attr("star-count",data.avg_rating);
					//addNotice("Thank You For Rating ", "fa fa-heart", "green");
					showToast("Thank You For Rating ","success");
					startCheck()
				}
			});
		}