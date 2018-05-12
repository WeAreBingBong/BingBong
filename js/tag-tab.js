// JavaScript Document

var tags= [];

var database;
var dishes;
// Initialize Firebase
$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDm03A2zOboq6VbKBq4QC2e1xiTsc4ADjg",
    databaseURL: "https://we-are-bingbong.firebaseio.com",
  };
  firebase.initializeApp(config);
  database = firebase.database();
	dishes = database.ref();
});



var search_button  = document.getElementById("searchbutton");
search_button.onclick = function(){answerclick(document.getElementById("input1").value)};

function answerclick(value)
{
	var paragraph = document.getElementById("in-panel");
	tags.push(value);

	if(tags.length == 1)
	{

		paragraph.innerHTML = "";
		 paragraph.innerHTML = '<button class="tagb">' + value +"&nbsp" +'<i class="deletebutton far fa-times-circle" onclick = "deleted(this.parentNode)"></i>'  + "</button>";
	}
	else
	{

		paragraph.innerHTML = paragraph.innerHTML + "&nbsp"+ '<button class="tagb">' + value +"&nbsp"+ '<i class="deletebutton far fa-times-circle" onclick = "deleted(this.parentNode)"></i>'  + "</button>";
	}
}

document.getElementById("input1").onclick = function(){
	document.getElementById("input1").value = "";
};


function deleted(node1){
	var value = node1.innerHTML.split("&nbsp")[0];
	for(var i=0; i<tags.length;i++){
        if(tags[i]==value){
            tags.splice(i,1);
            break;
        }
    }
	node1.parentNode.removeChild(node1);
}
searchtags();
function searchtags(){
	dishes.once('value',function(snapshot){
		console.log(snapshot.val());
	});
}