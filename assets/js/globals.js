<<<<<<< HEAD
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
if(userAgent.match( /Android/i ))
{
	window.urlService = 'http://localhost:8000/';
}else{
	window.urlService = 'http://localhost:8000/';
}

var width=$("#menu").width();
var width_display = $(window).width();
var height_display = $(window).height();
=======
window.urlService = 'http://localhost:8000/';
>>>>>>> aa22aefa77d6d980cac8742d58aba9db480131e3

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

document.addEventListener("backbutton", function (e) {
    e.preventDefault();
}, false );