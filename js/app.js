var URL_ROOT = "http://www.iampro.co/";
var myApp = new Framework7({
	modalTitle: 'Near Markets',
	fastClicks: false,
	material: true,
	id: 'com.mssinfotech.iampro.co',
	panel: {
		swipe: 'left',
	},
	pushState: true,
	animateNavBackIcon: false,
	onAjaxStart: function (xhr) {
	 myApp.showIndicator('Please wait...');
	},
	 onAjaxComplete: function (xhr) {
	 myApp.hideIndicator();
	}

});


var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true
});
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
	if ($$('#left_panel').hasClass("active")) {
		myApp.closePanel();
		return false;
	} else {
		mainView.router.back();
	}
	return true;
}
function setCookie(cname, cvalue, exdays) {
    if (typeof Android !== 'undefined'){
        Android.setCookies(cname,cvalue);
    }else{
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}
function getCookie(cname) {
    if (typeof Android !== 'undefined'){
        return Android.getCookies(cname);
    }else{
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
function deleteCookie(name) {
    if (typeof Android !== 'undefined'){
        Android.deleteCookies(name);
    }else{
        // If the cookie exists
        if (getCookie(name)){
            setCookie(name, "", -1);
        }
    }
}
function logout(){
    if (typeof Android !== 'undefined'){
        Android.deleteAllCookies();
    }
    $("#sideindex").removeClass('hide');
    $("#usersideindex").addClass('hide');
    $(".invoices").html('');
    $(".products").html('');
    mainView.router.back({ url: "index.html", force: true })
}