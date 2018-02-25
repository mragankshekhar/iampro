//$('.user_category').val(' <option value = "" >'+getCookie('category')+'</option>')
var avatar = getCookie('avatar')
var curl=encodeURI(document.URL);
$('#user_id').val(getCookie('uid'));
$('.user_id').val(getCookie('uid'));

var userimage=avatar;
$("#pro-img").attr("src",userimage);
$(".user-name").html(getCookie('fullname'));
$(".about_me").html(getCookie('about_me'));
$(".about_meemail").html(getCookie('email'));
$.getJSON(URL_ROOT+"api/ajax.php",{type:"friends_category"},function(data){
	var datas=' <a href = "#" data-searchbar = "true" data-back-on-select="true" data-searchbar-placeholder = "Search Category" class = "item-link smart-select"><select name = "category" id="categoryname">';
	$.each(data, function(key,val){
		var selector='';
		if(val.name==getCookie('category')){
			selector="selected";
		}
		datas+='<option value = "'+val.id+'" '+selector+' >'+val.name+'</option>';
	})
	datas+='</select><div class = "item-content"><div class = "item-inner"><div class = "item-title">Category</div><div class = "item-after cat_name" >'+getCookie('category')+'</div></div></div></a>';
	$('.user_category').html(datas);
	getVat()
});

function getVat(){
	$("#categoryname").on('change', function(e){
		id=$(this).val();
		$.getJSON(URL_ROOT+"ajax/signup.php",{type:"profile_category",category:id,uid:getCookie('uid')},function(data){
			if(data.status==="success"){
			setCookie("category",data.cname,"365")
			showToast(data.msg,"success")
			
			}
			
		});
	});
}

function update_profile_img(name){
	//alert(name);
	}
function update_profile_form(){
	var fname=$("#fname").val();
	var lname=$("#lname").val();
	var mobile=$("#mobile").val();
	var email=$("#email").val();
	var check_email="new";
	var dob=$("#dob").val();
	var identity_type=$(".identitytype").val();
	var identity_number=$("#identity_number").val();
	var about_me=$("#about_us").val();
	var gender=$(".gender").val();
	var tag_line=$("#tag_line").val();
	var address=$("#address").val();
	var city=$("#city").val();
	var state=$("#state").val();
	var country=$("#country").val();
	 myApp.showPreloader('Loading...');
	
	$.getJSON(URL_ROOT+"api/ajax.php",{type:"checkemail",email:email,uid:getCookie('uid')},function(data){
		check_email=data.msg;
		});
	//alert(mobile+"//"+identity_type+"//"+gender+"//"+state+"//"+check_email);
	if(fname==""){
		showToast("Please enter First Name","error")
	}else if(lname==""){
		showToast("Please enter Last Name","error")
	}else if(mobile==""){
		showToast("Please enter Mobile","error")
	}
	else if(email==""){
		showToast("Please enter Email","error")
	}else if(check_email=="old"){
		showToast("Please enter New Email Because This Email Is Already Exeist","error")
	}else{
			$.getJSON(URL_ROOT+"ajax/signup.php",{type:"update_profile",uid:getCookie('uid'),fname:fname,lname:lname,mobile:mobile,email:email,dob:dob,identity_type:identity_type,identity_number:identity_number,about_me:about_me,gender:gender,tag_line:tag_line,address:address,city:city,state:state,country:country},function(data){
				myApp.hidePreloader();
					if(data.status=='success'){
						showToast(data.msg+" || "+fname ,"success")
						setCookie("uid",getCookie('uid'),"365")
						setCookie("username",getCookie('username'),"365")
						setCookie("fullname",fname+" "+lname,"365")
						setCookie("email",email,"365")
						setCookie("atype",getCookie('atype'),"365")
						setCookie("fname",fname,"365")
						setCookie("lname",lname,"365")
						setCookie("mobile",mobile,"365")
						setCookie("address",address,"365")
						setCookie("about_me",about_me,"365")
						setCookie("tag_line",tag_line,"365")
						setCookie("dob",dob,"365")
				
				mainView.router.back({ url: "page/update_profile.html", force: true })
						}else{
				showToast(cdata.msg,"error")
			}
					
			 
		});
	}
	
}