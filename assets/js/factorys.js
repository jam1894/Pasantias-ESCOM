escom.factory('globals',function(){

	var savedData = ""

	function getDateCurrent(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = dd +'/'+ mm +'/'+ yyyy;
		return today;	
	}
	
	function set(data) {
	  savedData = data;
	}

	function get() {
	 return savedData;
	}

	return {
	 set: set,
	 get: get
	}

})