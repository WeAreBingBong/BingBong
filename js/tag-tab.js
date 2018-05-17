// JavaScript Document

var tags= [];

var database;
var dishes;
	var tagsauto = [];
function searchtags(){
	document.getElementById("elements").innerHTML = "";
	dishes.once('value',function(snapshot){

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
				/*var hashtagbutton = '&nbsp<div class = "pannel panel-info" style="margin-top: 2px;margin-bottom: 2px; margin-right: 2px; margin-left: 10px; border:1px solid #bce8f1; border-radius: 5px;" ><div class = "panel-heading"><h4>'+child.key+'</h4></div><div class = "panel-body"><img src='+child.val().image +' width="200" class = "pull-left"><div class = "container" ><h4 class = "make-margin">Searching Hashtags </h4><div class = "make-margin">' +buttons +'</div></div>';*/
				var hashtagbutton = '&nbsp<div class="card"><h2 class="card__title" style="font-family: Quicksand; font-size:21px; font-weight:bold; ">'+child.key+'</h2><div class="card__content"><img src='+child.val().image +' width="180" class = "pull-left">';
				// Adding Top Rank Hashtag
				var buttons2=""
				var toprankbutton="";
				for(var i=0;i<3;i++)
					{
						if(toprank[i] != "")
							{
								buttons2 += ' <button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">'
								 				+ toprank[i]+ '<br/>'+
												////여기ㅣ기기기건드렸음!!!!!!
												'<img src="./img/profile.png" height="16" width="16">'
												+ 32  + //  숫자
												'</button>  &nbsp';
							}
					}
				toprankbutton = '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +buttons2 +'</div></div>';
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

	dishes.once('value',function(snapshot){
		snapshot.forEach(function(child){

			if(child.key == "All")
				{
					for(var element in child.val())
						{

							tagsauto.push(element);
						}
				}
		});
});
});



$( "#input1" ).autocomplete({
   source: tagsauto,
    minLength: 2,
	messages: {
        noResults: '',
        results: function() {}
    },
	select: function(event, ui)
    {
        if(event.keyCode == 13)
        {
            answerclick(ui.item.value);
        }
        else if(event.type == "autocompleteselect")
        {
            answerclick(ui.item.value);
        }
        var newTag = $(this).val();
        $("#input1").val("");

        event.preventDefault();


    }
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
		 paragraph.innerHTML = '<button class="tagb hashb" ;>' + value +"&nbsp" +'<i class="deletebutton far fa-times-circle" onclick = "deleted(this.parentNode)"></i>'  + "</button>";
	}
	else
	{

		paragraph.innerHTML = paragraph.innerHTML + "&nbsp"+ '<button class="tagb hashb" >' + value +"&nbsp"+ '<i class="deletebutton far fa-times-circle" onclick = "deleted(this.parentNode)"></i>'  + "</button>";
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

var normalize = function( term ) {
	var ret = "";
      for ( var i = 0; i < term.length; i++ ) {
        ret += accentMap[ term.charAt(i) ] || term.charAt(i);
      }
      return ret;
    };
