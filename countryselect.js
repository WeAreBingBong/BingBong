// JavaScript Document

	console.log('??')
$(document).ready(function() {
	      
   //$('#id01').modal('show');
   console.log('??')
var options = document.getElementById('sel1');
	var result = "<option>No country</option>";
	var i = 0;
	for (i=0; i < pairs.length; i++){
		result = result+"<option>"+pairs[i].country + "</option>";
	}
	options.innerHTML = result
});
