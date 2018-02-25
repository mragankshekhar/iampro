$$("#signinbtn").click(function(){
	//alert('hii');
	var username=$("#loginuserid").val()
	var password=$("#loginpassword").val()
	if(username==""){
		showToast("Please enter user ID","error")
	}else if(password==""){
		showToast("Please enter pass","error")
	}else{
		$$.getJSON(URL_ROOT+"ajax/signup.php",{"type":"login","username":username,"pass":password},function(cdata){
			if(cdata.status==="success"){
				$("#usersideindex").removeClass('hide');
				$("#sideindex").addClass('hide');
				
				pass=password;mobile=username;
				allUser(cdata.id);
				showToast(cdata.msg+" || "+cdata.fname ,"success")
				setCookie("uid",cdata.id,"365")
				setCookie("username",cdata.username,"365")
				setCookie("fullname",cdata.fname+" "+cdata.lname,"365")
				setCookie("email",cdata.email,"365")
				setCookie("atype",cdata.atype,"365")
				setCookie("fname",cdata.fname,"365")
				setCookie("lname",cdata.lname,"365")
				setCookie("mobile",cdata.mobile,"365")
				setCookie("address",cdata.address,"365")
				setCookie("avatar",URL_ROOT+"uploads/avatar/h/100/"+cdata.avatar,"365")
				setCookie("banner_image",URL_ROOT+"uploads/avatar/h/150/"+cdata.banner_image,"365")
				setCookie("about_me",cdata.about_me,"365")
				setCookie("category",cdata.category,"365")
				setCookie("tag_line",cdata.tag_line,"365")
				
				mainView.router.back({ url: "page/dashboard.html", force: true })
				//mainView.router.loadPage("page/dashboard.html");

			}else{
				showToast(cdata.msg,"error")
			}
		});	
	}
})