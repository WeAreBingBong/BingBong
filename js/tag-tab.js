// JavaScript Document

var tags= [];

var database;
var dishes;

function searchtags(){
	document.getElementById("elements").innerHTML = "";
	dishes.on('value',function(snapshot){
		 
		snapshot.forEach(function(child){
				//console.log(child.val().Hashtags);
				var flag =  [];
				var toprank = ["","",""];
				for(var obj in child.val().Hashtags)
				{
					//console.log(child.val().Hashtags[obj]);
						for(var element in child.val().Hashtags[obj])
						{
							//console.log(element);
							for(var i=0;i<tags.length;i++)
								{
									//console.log(tags[i]);
									
									if(element.toLowerCase() == tags[i].toLowerCase())
										{
											flag.push(element);
										}
									
								}
							if(toprank[0] == "")
							{
								toprank[0] = element;
									
							}
							else if(child.val().Hashtags[obj][element] > child.val().Hashtags[obj][toprank[0]])
								{
									var tmp = toprank[0];
									toprank[0] = element;
									toprank[2] = toprank[1];
									toprank[1] = tmp;
								}
							else
							{
								if(toprank[1] == "")
								{
									toprank[1] = element;
									
								}
								else if(child.val().Hashtags[obj][element] > child.val().Hashtags[obj][toprank[1]])
								{
									var tmp = toprank[1];
									toprank[1] = element;
									toprank[2] = tmp;

								}
								else
								{
									if(toprank[2] == "")
									{
										toprank[2] = element;
									
									}
									else if(child.val().Hashtags[obj][element] > child.val().Hashtags[obj][toprank[2]])
									{
										
										toprank[2] = element;
									}
								}
							}
						}
				}
			if(flag.length == tags.length && flag.length != 0)
			{
				var buttons = "";
				for(var i=0;i<tags.length;i++)
					{
						buttons += '<button>' + flag[i]+ '</button>&nbsp';
					}
				//console.log(child.val().image);
				// Adding Hashtag
				var hashtagbutton = '&nbsp<div class = "pannel panel-info" style="margin-top: 2px;margin-bottom: 2px; margin-right: 2px; margin-left: 10px; border:1px solid #bce8f1; border-radius: 5px;" ><div class = "panel-heading"><h4>'+child.key+'</h4></div><div class = "panel-body"><img src='+child.val().image +' width="200" class = "pull-left"><div class = "container" ><h4 class = "make-margin">Searching Hashtags </h4><div class = "make-margin">' +buttons +'</div></div>';
				
				// Adding Top Rank Hashtag
				var buttons2=""
				var toprankbutton="";
				for(var i=0;i<3;i++)
					{
						if(toprank[i] != "")
							{
								buttons2 += '<button>' + toprank[i]+ '</button>&nbsp';
							}
					}
				toprankbutton = '<div class = "container" ><h4 class = "make-margin">Top Rank Hashtags </h5><div class = "make-margin">' +buttons2 +'</div></div></div></div>';
				document.getElementById("elements").innerHTML=document.getElementById("elements").innerHTML+ hashtagbutton+toprankbutton;
				
			}
			});
		});
}
// Initialize Firebase

$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDm03A2zOboq6VbKBq4QC2e1xiTsc4ADjg",
    databaseURL: "https://we-are-bingbong.firebaseio.com",
  };
  firebase.initializeApp(config);
  database = firebase.database();
	dishes = database.ref();
	searchtags();
});


var search_button  = document.getElementById("searchbutton");
search_button.onclick = function(){answerclick(document.getElementById("input1").value)};

function answerclick(value)
{
	var paragraph = document.getElementById("in-panel");
	var flag = 0;
	for(var i=0; i< tags.length; i++)
	{
		if(tags[i].toLowerCase() == value.toLowerCase())
		{
			flag++;
		}
	}
	if(flag == 0)
	{	
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
	searchtags();
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
	searchtags();
}
searchtags();
