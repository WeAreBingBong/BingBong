// JavaScript Document
// tags mean dish names here

var tags= [];
var _names = [];
var database;
var dishes;
var count = 0;
var tagsauto = [];
var putButton = '<button class = "foradd" id="put"></button>';

function searchtags(name){
document.getElementById("elements").innerHTML = "";
   dishes.on('value',function(snapshot){
      snapshot.forEach(function(child){
		//console.log(database.ref(child.key/Hashtags));
         if(name.toLowerCase() == child.key.toLowerCase()) {
            //console.log(name);
            //console.log(child.val().Hashtags);
            var flag =  [];
            var toprank = ["","",""];
			var everytags = [];
			//console.log(everytags);
            for(var obj in child.val().Hashtags)
            {

                  for(var element in child.val().Hashtags[obj])
                  {
						//console.log(element);
						everytags.push(element);
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
			//console.log(everytags);

           var buttons2="";
         var name_img = '&nbsp<div class="card"><h2 class="card__title" style="font-family: Quicksand; font-size:21px; font-weight:bold; ">'+child.key+'</h2><div class="card__content"><img src='+child.val().image +' width="180" class = "pull-left">';

            var toprankbutton="";

            for(var i=0;i<3;i++)
               {
                  if(toprank[i] != "")
                     {
                        buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + toprank[i]+ '</button>';
                     }
               }
			var tempb = buttons2;
			var more_button = '<button class = "more" id="morebut"></button>';
            toprankbutton = '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +buttons2+ " " +more_button+'</div></div>';

      document.getElementById("elements").innerHTML=document.getElementById("elements").innerHTML+name_img+toprankbutton;
			document.getElementById("morebut").onclick = function() {
				count ++;
				seeMoreorLess(child);
				console.log("clickeddd");

				console.log(count);
			}

         }

         });
      });

}




function seeMoreorLess(child) {
	//console.log(child);
	var toprank = ["","",""];
	var everytags = [];
	//console.log(everytags);
	for(var obj in child.val().Hashtags)
	{
		  for(var element in child.val().Hashtags[obj])
		  {
				//console.log(element);
				everytags.push(element);
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
	           var buttons2="";
         var name_img = '&nbsp<div class="card"><h2 class="card__title" style="font-family: Quicksand; font-size:21px; font-weight:bold; ">'+child.key+'</h2><div class="card__content"><img src='+child.val().image +' width="180" class = "pull-left">';



            for(var i=0;i<3;i++)
               {
                  if(toprank[i] != "")
                     {
                        buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + toprank[i]+ '</button>';
                     }
               }
			var tempb = buttons2;
			var more_button = '<button class = "more" id="morebut"></button>';
			var addinput = '<input id = "input2" class = "adding" type="text" placeholder="Add Hashtag ex) spicy, salty">';


			/*document.getElementById("input2").onclick=function(){
			document.getElementById("input2").value = "";
			}*/

			//console.log(everytags);
	if(count % 2 == 1){ //펼치기
		for(var i=0;i<everytags.length;i++){
			//top rank랑 겹치면 안넣어줌
			if(everytags[i] != toprank[0] && everytags[i] != toprank[1] && everytags[i] != toprank[2]){
				buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + everytags[i]+ '</button>';
			}
			else continue;
		}
		document.getElementById("elements").innerHTML = name_img+ '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">All Hashtags </h4><div class = "make-margin">' +buttons2+ addinput+putButton +more_button+'</div></div>';
		document.getElementById("morebut").style.background= "url('https://image.flaticon.com/icons/svg/3/3581.svg')";
		var put_Button = document.getElementById("put");
		console.log(put_Button);
		put_Button.onclick = function() {typein(child.key, document.getElementById("input2").value)};

	}
	else{//줄이기

		console.log("else");
		document.getElementById("elements").innerHTML = name_img+ '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +tempb+ " " +more_button+'</div></div>';
		document.getElementById("morebut").style.background= "url('https://image.flaticon.com/icons/svg/3/3907.svg')";
	}

}


// Initialize Firebase

$(document).ready(function(){
  $('#loading').remove();
  var config = {
    apiKey: "AIzaSyDm03A2zOboq6VbKBq4QC2e1xiTsc4ADjg",
    databaseURL: "https://we-are-bingbong.firebaseio.com",
  };
  firebase.initializeApp(config);
  database = firebase.database();
   dishes = database.ref();
   //searchtags();

   dishes.on('value',function(snapshot){
      snapshot.forEach(function(child){
      _names.push(child.key);
      });


	console.log("Updated");
});
/*var commentsRef = database.ref('countrycapital');

   // Bind comments to firebase
   commentsRef.on('value', function (snapshot) {
     console.log("Updated")
     var commentsObject = snapshot.val()
     //renderComments(commentsObject)
   })

   function addMessage(answer, capital, correct, country) {
     var messageObject = {
      answer: answer,
      capital: capital,
      correct: correct,
      country: country,
     }
     commentsRef.push(messageObject)
   }*/
});



$( "#input1" ).autocomplete({
   source: _names,
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



function addtag(child, tag){
	database.ref(child+'/Hashtags/Others').child(tag).set(1);
}
function typein(child, value)
{
	document.getElementById("input2").innerHTML="";
	addtag(child, value);
}



var search_button  = document.getElementById("searchbutton");
search_button.onclick = function(){answerclick()};

function answerclick(value)
{
	document.getElementById("elements").innerHTML = "";
   searchtags(value);
}

document.getElementById("input1").onclick = function(){
   document.getElementById("input1").value = "";
};



var normalize = function( term ) {
   var ret = "";
      for ( var i = 0; i < term.length; i++ ) {
        ret += accentMap[ term.charAt(i) ] || term.charAt(i);
      }
      return ret;
    };
