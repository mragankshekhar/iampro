get_category('IMAGE');

$("#search_type").on("change",function(){
	get_category($(this).val())
});



function get_category(name){
	  $.getJSON(URL_ROOT+"api/search.php",{type:"get_category",name:name},function (data){
		var datas="";
		datas+='<option value="">Select Category</option>';
		$.each(data,function(key,val){
			datas+='<option value="'+val.name+'">'+val.name+'</option>';
		}); 
		$('.all_category').html(datas);
	});
 }
			 



function searchallrecord(){
	var search_type=$('#search_type').val();
	var category_type=$('#category_type').val();
	var search_data=$('#search_data').val();
	//alert(search_type+'//'+category_type+'//'+search_data);
	if(search_type=="IMAGE"){
		mainView.router.loadPage("page/search/image.html?search_type="+search_type+"&category_type="+category_type+"&search_data="+search_data);
	}else if(search_type=="VIDEO"){
		mainView.router.loadPage("page/search/video.html?search_type="+search_type+"&category_type="+category_type+"&search_data="+search_data);
	}
}


			 
			 
function getcategories(){

    $$.getJSON(URL_ROOT+"api/ajax.php",{"type":"get-category"},function(cdata){

		if(cdata.status==="success"){

			var optionsval="";

			$.each(cdata.data,function(key, Value) {

				var selected="";

				if(cat==Value.heading)selected="selected";

				optionsval+='<option value="'+Value.id+'" '+selected+'>'+Value.heading+'</option>';

			});

			$$(".selectvalf").html(optionsval)

		}

	});

}