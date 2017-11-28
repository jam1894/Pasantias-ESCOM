window.urlService = 'http://app.mincivil.net:90/public/';

window.urlImages = "http://app.mincivil.net:90/public/uploads/images/";

//window.urlService = 'http://127.0.0.1:8000/';

//window.urlImages = "http://127.0.0.1:8000/uploads/images/";

var width=$("#menu").width();
var width_display = $(window).width();
var height_display = $(window).height();


function confirmDOMChanges (callback){
	callback();
	var count = 0;
	var limit = 20;
	var interval = setInterval(function(){
		count++;
		if(count > limit){
			return clearInterval(interval);
		}
		callback();
	}, 100)
}

function time (time){
	var h = parseInt(time.split(":")[0]);
	var m = time.split(":")[1];
	var mer = ' AM';
	if(h >= 12){
		mer = ' PM';
		if(h >= 13){
			h = h - 12;
		}
	}
	return h +':'+ m + mer;
}

function hideLoad(){
	$(".load").hide();
}

function showLoad(){
	$(".load").show();
}

	function ConvertgetDateCurrent(date){
		var today = new Date(date);
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = yyyy +'/'+ mm +'/'+ dd;
		return today;	
	}


document.addEventListener("backbutton", function (e) {
    e.preventDefault();
}, false );