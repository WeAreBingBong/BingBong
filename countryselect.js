// JavaScript Document
 $(window).load(function(){        
   $('#myModal').modal('show');
    }); 
var options = document.getElementById('sel1');
	var result = "<option>No country</option>";
	var i = 0;
	for (i=0; i < pairs.length; i++){
		result = result+"<option>"+pairs[i].country + "</option>";
	}
	options.innerHTML = result
