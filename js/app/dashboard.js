get_slider();
all_item("image");
all_item("video");
getAllUser('6');
all_product('product');
all_provide();
all_demand();
function searchNow(){
		var x = $$('#city');

		alert("va "+y);
        app.dialog.alert(x, function () {
          app.loginScreen.close();
        })
}

var mySwiper1 = myApp.swiper('.swiper-2', {
			  pagination:'.swiper-2 .swiper-pagination',
			  spaceBetween: 10,
			  slidesPerView: 2
			});


function get_slider(){
	  $.getJSON(URL_ROOT+"api/index.php",{type:"get_slider",name:"TOP_SLIDER"},function (data){
		var datas=""; var i=0;
		$.each(data,function(key,val){
			var wstyle=i*50;
			datas+='<div class="swiper-slide"><img src="'+URL_ROOT+'uploads/slider/317/120/'+val.image+'"  ></div>';
			i=1;
		}); 
		$('.TOP_SLIDER').html('<div class="swiper-pagination"></div><div class="swiper-wrapper ">'+datas+'</div>');
		var mySwiper1 = myApp.swiper('.swiper-1', {
			  pagination:'.swiper-1 .swiper-pagination',
			  spaceBetween: 50,
			  slidesPerView: 1
			});
	});
 }
 
 function all_item(name){
	  $.getJSON(URL_ROOT+"api/dashboard.php",{type:"all_item",name:name},function (data){
		  //console.log(data);
		  if(name=='image'){
			  datas=''; var i=0;
		 		 $.each(data, function(key,val){i++;
		  		if(i<7){
			if(typeof val.user_detail !== 'undefined'){
				datas+='<div class="col-50"><div class="card demo-card-header-pic" style="margin: 0px 0px 0px 0px;"><div style= "background-image : url('+URL_ROOT+'uploads/album/'+val.image+');height:120px !important; background-size: cover;  valign="bottom" class="card-header color-white no-border" ><div class="overlay"></div><span class="latest_photo">'+val.name+'<br/>'+val.ago+'</span></div><div class="card-content"><div class="card-content-inner" style="padding:5px"><p class="color-gray"><span class="latest_user_image"><img src="'+URL_ROOT+'uploads/avatar/'+val.user_detail.avatar+'"></span>'+val.user_detail.fullname+'</p></div></div></div></div>'; 
			}
		  }
		  })
			  
		 	 $("#latest_image").html(datas);
		  }
		  else if(name=='video'){
			  datas=''; var i=0;
		  		$.each(data, function(key,val){i++;
		  		if(i<7){
			if(typeof val.user_detail !== 'undefined'){
				datas+='<div class="col-50"><div class="card demo-card-header-pic" style="margin: 0px 0px 0px 0px;"><video data-setup=\'{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }\' class="video-js" controls preload="auto" style="width:100% !important;height:155px;"><source src="'+URL_ROOT+'uploads/video/'+val.image+'" type="video/mp4"><source src="'+URL_ROOT+'uploads/video/'+val.image+'" type="video/ogg"></video><div class="card-content"><div class="card-content-inner" style="padding:5px"><p class="color-gray"><span class="latest_user_image"><img src="'+URL_ROOT+'uploads/avatar/'+val.user_detail.avatar+'"></span>'+val.user_detail.fullname+'</p></div></div></div></div>'; 
			}
		  }
		  })
			  
			  $("#latest_video").html(datas);
			  }
	  });
 }
 
 function getAllUser(name){
	  $.getJSON(URL_ROOT+"api/dashboard.php",{type:"getAllUser",name:name},function (data){
		  console.log(data);
		  var i=0;
			  datas='<div class="card-content"><div class="list-block media-list" style="margin: 10px 0 !important;"><ul>'; 
		 		 $.each(data, function(key,val){i++;
		  				if(i<5){
								datas+='<li class="item-content "><div class="item-media"><img src="'+URL_ROOT+'uploads/avatar/70/70/'+val.avatar+'" width="44"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+val.fullname+'</div></div><div class="item-subtitle"><span class="icon ion-ipod"></span>&nbsp;'+val.mobile+'<br/><span class="icon ion-email"></span>&nbsp;'+val.email+'</div></div></li>'; 
								
							  }
		 				 })
			  datas+='</div></div></ul>';
		 	 $("#smart_users").html(datas);
		  
		  
	  });
 }
 
 function all_product(name){
	  $.getJSON(URL_ROOT+"api/dashboard.php",{type:"all_product",name:name},function (data){
		  console.log(data);
		  var i=0;
			  datas=''; 
		 		 $.each(data, function(key,val){i++;
		  				if(i<7){
								datas+='<a  href="'+val.url+'" class="col-50"><div ><div class="card demo-card-header-pic" style="margin: 0px 0px 0px 0px;"><div style= "background-image : url('+URL_ROOT+'uploads/product/'+val.image+');height:120px !important; background-size: cover;  valign="bottom" class="card-header color-white no-border" ><div class="overlay"></div><span class="latest_photo">'+val.name+'<br/>'+val.category+'</span></div><div class="card-content"><div class="card-content-inner" style="padding:5px"><p class="color-gray"><span style="color:#F00; text-decoration:line-through; color:#F00" >'+val.purchese_cost+' Rs</span> &nbsp;<span style="float:right">'+val.selling_cost+' Rs </span></p></div></div></div></div></a>'; 
								
							  }
		 				 })
			  $("#latest_product").html(datas);
		  
		  
	  });
 }
 
 
  function all_provide(){
	  $.getJSON(URL_ROOT+"api/dashboard.php",{type:"all_product_classified"},function (data){
		  console.log(data);
		  var i=0;
			  datas=''; 
		 		 $.each(data, function(key,val){
		  				
							if(val.product_type=='PROVIDE'){i++;
								if(i<7){
								datas+='<div class="swiper-slide "><a  href="'+val.url+'" class="col-50"><div ><div class="card demo-card-header-pic" style="margin: 0px 0px 0px 0px;"><div style= "background-image : url('+URL_ROOT+'uploads/product/'+val.image+');height:120px !important; background-size: cover;  valign="bottom" class="card-header color-white no-border" ><div class="overlay"></div><span class="latest_provide" style="font-size:15px !important;margin: 0px;    width: 100%;">'+val.name+'<br/><span style="font-size:15px;margin: 0px;    width: 100%;">'+val.selling_cost+' Rs </span></span></div></div></div></a></div>'; 
							}
							  }
		 				 })
			  $("#latest_provide").html(datas);
			  var mySwiper1 = myApp.swiper('.swiper-2', {
			  pagination:'.swiper-2 .swiper-pagination',
			  spaceBetween: 10,
			  slidesPerView: 2
			});
		  
		  
	  });
 }
 
 function all_demand(name){
	  $.getJSON(URL_ROOT+"api/dashboard.php",{type:"all_product_classified"},function (data){
		  console.log(data);
		  var i=0;
			  datas=''; 
		 		 $.each(data, function(key,val){
				 if(val.product_type=='DEMAND'){i++;
								if(i<7){
		  					datas+='<a  href="'+val.url+'" class="col-50"><div ><div class="card demo-card-header-pic" style="margin: 0px 0px 0px 0px;"><div style= "background-image : url('+URL_ROOT+'uploads/product/'+val.image+');height:120px !important; background-size: cover;  valign="bottom" class="card-header color-white no-border" ><div class="overlay"></div><span class="latest_photo">'+val.name+'<br/>'+val.category+'</span></div><div class="card-content"><div class="card-content-inner" style="padding:5px"><p class="color-gray"><span style="color:#F00; text-decoration:line-through; color:#F00" >'+val.purchese_cost+' Rs</span> &nbsp;<span style="float:right">'+val.selling_cost+' Rs </span></p></div></div></div></div></a>'; 
								
								}}
		 				 })
			  $("#latest_demand").html(datas);
		  
		  
	  });
 }