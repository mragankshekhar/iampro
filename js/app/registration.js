function sendotp(otp,mobile){
 
 $$.getJSON(URL_ROOT+"api/ajax.php",{"type":"sendotp","otp":otp,"mobile":mobile},function(regdata){});
	
}

$$("#createAcc").click(function(){
//alert('hii');
var otpv="";
var randomstr=""+Math.random()+"";
var otp=randomstr.substr(2, 4);
	
	var fname=$("#fname").val();
	
	var lname=$("#lname").val();
	var mobile=$("#mobile").val();
	var email=$("#email").val();
	var pass=$("#password").val();
	var cpass=$("#cpassword").val();
	
	 if(fname==""){
		showToast("Please enter First Name","error")
	}else if(lname==""){
		showToast("Please enter Last Name","error")
	}else if(pass==""){
		showToast("Please enter Password","error")
	}else if(cpass==""){
		showToast("Please enter Confirm password","error")
	}else if(cpass!=pass){
		showToast("Please enter Confirm password and Password doesn't matched","error")
	}else if(mobile==""){
		showToast("Please enter Mobile","error")
	}else if(email==""){
		showToast("Please enter Email","error")
	}else{
		sendotp(otp,mobile);
		myApp.prompt('Enter OTP?', function (value) {
			if(value==otp){
			 	$$.getJSON(URL_ROOT+"ajax/signup.php",{"type":"user_registration","fname":fname,"lname":lname,"mobile":mobile,"email":email,"password":pass,"cpassword":cpass},function(regdata){

					if(regdata.status=="success"){
						showToast(regdata.msg,"success");
						mainView.router.loadPage("page/login.html");
					}else{ 
						showToast(regdata.msg,"error");
					}
				});

			}else{
				myApp.alert('OTP verification failed.');
			}

		});
	}
})