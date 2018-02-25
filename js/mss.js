var user_detail;

if(getCookie('uid')>0){
	$.getJSON(URL_ROOT+"api/ajax.php",{type:"get_users_all_detail",uid:getCookie('uid')},function(data){
	user_detail = data;
	console.log(user_detail);
	//alert(user_detail.username);
	$('#username').val(user_detail.username);
	$("#username").attr("readonly","readonly").focus();
	$('.user_fname').val(user_detail.fname);
	$('.user_lname').val(user_detail.lname);
	$('.user_mobile').val(user_detail.mobile);
	$('.user_email').val(user_detail.email);
	$('.user_dob').val(user_detail.dob);
	$('.user_identity_number').val(user_detail.identity_number);
	$('.user_about_me').val(user_detail.about_me);
	$('.user_tag_line').val(user_detail.tag_line);
	$('.user_address').val(user_detail.address);
	$('.user_city').val(user_detail.city);
	$('.user_state').val(user_detail.state);
	$('.user_country').val(user_detail.country);
	$('.user_banner_image').val(user_detail.banner_image);
	
	var datas=' <a href = "#" data-searchbar = "true" data-back-on-select="true" data-searchbar-placeholder = "Search Identity Type" class = "item-link smart-select"><select name = "identity_type" class="identitytype" id="categoryname">';
		
		datas+='<option value = "aadhar_card"  >Aadhar Card</option>';
		datas+='<option value = "pan_card"  >Pan Card</option>';
		datas+='<option value = "voter_card"  >Voter Card</option>';
		
		
	datas+='</select><label class="control-label" for="input">Identity Type</label><div class = "item-inner"><div class = "item-after cat_name" >'+user_detail.identity_type+'</div></div></a>';
	$('.identity_type').html(datas);
	
	
	var you_are=' <a href = "#" data-searchbar = "true" data-back-on-select="true" data-searchbar-placeholder = "Search You Are" class = "item-link smart-select"><select name = "identity_type" id="categoryname"  class="gender">';
		
		you_are+='<option value = "Male"  >Male</option>';
		you_are+='<option value = "Female"  >Female</option>';
		you_are+='<option value = "Other"  >Other</option>';
		you_are+='<option value = "Business"  >Business</option>';
		
		
	you_are+='</select><label class="control-label" for="input">You Are</label><div class = "item-inner"><div class = "item-after cat_name" >'+user_detail.gender+'</div></div></a>';
	$('.you_are').html(you_are);
	
	
	
	
	});
}



function goBack(){

    mainView.router.back();

}



function get_users_all_detail(id){
	
}

function startCheck(){
	if($(".rating_star").length>0){
		$(".rating_star").each(function(){
			var starclass="ion-android-star";
			var oprate="";
			var starCount=$(this).attr("star-count");
			rating=Math.round(starCount);
			for(var i=1; i<=5;i++){
				if(starCount>=i){
					oprate+='<span class="icon '+starclass+'"></span>';
				}else{
					oprate+='<span class="icon '+starclass+'-outline"></span>';
				}
			}
			$(this).html(oprate)
		});
	}
}

var checklogin=getCookie("fname");

	$("#usersideindex").addClass('hide');
	$("#sideindex").addClass('hide');


if(checklogin!=""){
	allUser(getCookie('uid'));
	$("#usersideindex").removeClass('hide');
	$("#invoices").html(getCookie("invoice_available"));
	$("#products").html(getCookie("products_available"));

}else{
	$("#sideindex").removeClass('hide');
}

myApp.onPageInit('*', function (page) {

       loadForm();
		startCheck()
	   console.log(page)

       $$('img.lazy').trigger('lazy');

       if(page.name=="dashboard"){

           ImportJs("js/app/tab.js");
		   ImportJs("js/app/dashboard.js");
		   ImportJs("js/videojs-ie8.min.js");
		   ImportJs("js/video.js");

       }else if(page.name=="gallery"){

          ImportJs("js/app/gallery.js");

       }else if(page.name=="registration"){

          ImportJs("js/app/registration.js");

       }else if(page.url=="page/search.html"){
           ImportJs("js/app/search.js");
       }else if(page.url=="page/search/image.html"){
		   
       }else if(page.url=="page/search/video.html"){
		   
       }else if(page.name=="login"){
           ImportJs("js/app/login.js");
       }else if(page.query.page=="productview"){

           var id = page.query.id;

           $$("#pid").val(id);

           ImportJs("js/app/productview.js");

       }
 	   else if(page.name=="profile"){
		   ImportJs("js/app/profile.js");

       } else if(page.name=="update_profile"){
		   ImportJs("js/app/update_profile.js");

       }

 });

var category="",city="",search="",lat="",lan="",mile=0,shortBy="order by udate DESC",CurrentPage=1,startV=0,endV=15,minserprice="",maxserprice="",is_parent=0,status=1,extra="",lat='23.2508536',lang='77.427655';

var mobile="",pass="";


function indexSearch(){

	cat=$(".selectvalf").val();

	city=$(".autocomplete-city").val();

	search=$(".autocomplete-for").val();

	//lat=$(".lat").val();

	//lang=$(".lang").val();

	mainView.router.loadPage("page/search.html");

}

function loadForm(){

     var progressbar     = $('#progressbar');

        var statustxt       = $('#progresstext');

        var submitbutton    = $("#submit");

        var myform          = $(".form_ajax");

        var title = document.title;

        var progressDiv     = $("#progressDiv");

        var completed       = '0%';

        $(myform).ajaxForm({

                beforeSend: function() { //brfore sending form

                        myApp.showPreloader('Loading...')

                        //submitbutton.attr('disabled', ''); // disable upload button

                        //progressDiv.show();

                        //document.title = " Processing Please wait...";

                        //progressbar.width(completed);

                        //showToast(" Processing Please wait...","info")

                },

                uploadProgress: function(event, position, total, percentComplete) { //on progress

                        myApp.showPreloader('Loading '+percentComplete + '% completed')

                        //$("#progress").width(percentComplete + '%');//update progressbar percent complete

                        //$(".statustxt").html(percentComplete + '% completed'); //update status text

                        //addNotice(percentComplete+ "% Completed...", "fa fa-refresh", "");

                        //document.title = percentComplete+ "% Completed..."

                        //submitbutton.html(percentComplete+' % Processing...');

                },

                complete: function(response) { // on complete

                        myApp.hidePreloader();

                        //x$.gritter.removeAll();

                        //document.title = title;

                        //submitbutton.removeAttr('disabled'); //enable submit button

                        //progressDiv.slideUp(); // hide progressbar

                        //console.log(response.responseText);

                        var data=$.parseJSON(response.responseText);

                        if(data.status=="success"){

                                if(data.type=="alert"){

                                        showToast(data.message,"success")

                                }

                                else if(data.type=="image"){

                                        showToast(data.message,"success");

                                        $("#"+data.imgid).attr("src",data.imgurl);
										
										setCookie('avatar',data.imgurl,'360');
										
										myApp.hidePreloader();

                                }

                                else if(data.type=="loadPage"){

                                    var pageurl=data.loadPage;

                                    if(data.dids!=""){

                                        pageurl+="?id="+data.dids;

                                    }
									 myApp.hidePreloader();
                                    mainView.router.loadPage(pageurl);

                                }

                                else if(data.type=="div"){

                                        $("#"+data.divid).html(data.message);

                                }

                                else if(data.type=="url"){

                                        showToast(data.message,"success");

                                        setInterval(function(){ window.location=data.url; }, 2000);

                                }else if(data.type=="popup"){

                                        showToast(data.message,"success");

                                }else{

                                        showToast(data.message,"success");

                                }

                                //resetbutton.click();

                        }

                        else if(data.status=="error"){

                                showToast(data.message,"error");

                        }

                }

        });

 }



/*
function ImportJs(jsfile){

   var imported = document.createElement('script');

   imported.src = jsfile;

   document.head.appendChild(imported);

       

}*/

function ImportJs(jsfile){
   var ids=jsfile.replace(/[^a-zA-Z ]/g, "");
   if($("#"+ids).length>0) $("#"+ids).remove();
   var imported = document.createElement('script');
   imported.src = jsfile;
   imported.id = ids;
   document.head.appendChild(imported);
}


function showToast(msg,type){

    $("body").append("<div class='toast-container show'><div class='toast-msg'>"+msg+"</div></div>");

    $(".toast-container").addClass("fadein")

    setTimeout(function(){ $(".toast-container").removeClass("fadein"); }, 4000);

    setTimeout(function(){ $(".toast-container").remove(); }, 5000);

    //myApp.closeNotification(".notification-item");

    //myApp.addNotification({

       // message: msg,

    //});

}

function startRating(){

    if($(".rating_star").length>0){

        $(".rating_star").each(function(){

            var attr = $(this).attr('star-type');

            var starclass="ms-star";

            if (typeof attr !== typeof undefined && attr !== false && attr==="itav") {

                starclass="ms-star-itav";

            }

            var oprate="";

            var starCount=$(this).attr("star-count");

            rating=Math.round(starCount);

            for(var i=1; i<=5;i++){

                if(starCount>=i){

                    oprate+='<span class="ms '+starclass+'-checked ms-16"></span>';

                }else{

                    oprate+='<span class="ms '+starclass+' ms-16"></span>';

                }

            }

            $(this).html(oprate);

        });

    }

}

//allUser();
function allUser(id){
    var dataList='';
    var chatCount=0;
    $.getJSON(URL_ROOT+"api/ajax.php",{"type":"nearuser","uid":id},function(data){
        if(data.status=="success"){
            $.each(data.list,function(kay,val){
                var chtCount='';
                if(val.unread>0){
                    chtCount='<div class = "item-after"> <span class = "badge bg-red">'+val.unread+'</span></div>';
                    chatCount=chatCount+parseInt(val.unread);
                }
                dataList+=' <li class = "swipeout"> <div class = "swipeout-content item-content"> <div class = "item-media"><img style="width:32px; height:32px" src="uploads/avatar/'+val.avatar+'"></div> <div class = "item-inner"><div class = "item-title">'+val.fullname+'</div>'+chtCount+'</div> </div><div class = "swipeout-actions-right"><a href = "chat.html?id='+val.id+'" class = "task1 bg-red">Chat</a><a href = "userprofile.html?id='+val.id+'" class = "task2 bg-green">Profile</a></div></li>';
            })
            $("#ulist").html("<ul>"+dataList+"</ul>");
            $$("a").on("click",function(){
                myApp.closePanel()
            })
             $$('.swipeout').on('click', function() {
                myApp.swipeoutOpen($(this));
             });
        }
        if(chatCount>0){
            $(".chat_count").html(chatCount).show();
        }else{
            $(".chat_count").html('').hide();
        }
    })
    
}