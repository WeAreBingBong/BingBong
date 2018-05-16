// JavaScript Document
// tags mean dish names here

var tags= [];
var _names = [];
var database;
var dishes;
   var tagsauto = [];
function searchtags(name){

   dishes.on('value',function(snapshot){
      snapshot.forEach(function(child){

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
         var name_img = '&nbsp<div class = "pannel panel-info" style="margin-top: 2px;margin-bottom: 2px; margin-right: 2px; margin-left: 10px; border:1px solid #bce8f1; border-radius: 5px;" ><div class = "panel-heading"><h4>'+child.key+'</h3></div><div class = "panel-body"><img src='+child.val().image +' width="200" class = "pull-left"><div class = "container" style = "height : 0px"></div>';

            var toprankbutton="";
        
            for(var i=0;i<3;i++)
               {
                  if(toprank[i] != "")
                     {
                        buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + toprank[i]+ '</button>';
                     }
               }
			var tempb = buttons2;   
			var more_button = '<button class = "more" id="morebut"></button>'
            toprankbutton = '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +buttons2+ " " +more_button+'</div></div>';
			var addButton = '<button class = "add" id="addbut"style="margin-bottom : 5px; font-family: Quicksand;">Add Hashtag...</button>'
			
			
            document.getElementById("elements").innerHTML=document.getElementById("elements").innerHTML+name_img+toprankbutton;
			document.getElementById("morebut").onclick = function() {seeMoreorLess()};
			function seeMoreorLess() {
				
				if(document.getElementById("morebut").style.background= "url('https://image.flaticon.com/icons/svg/3/3907.svg')"){ //펼치기
					for(var i=0;i<everytags.length;i++){
						//top rank랑 겹치면 안넣어줌
						if(everytags[i] != toprank[0] && everytags[i] != toprank[1] && everytags[i] != toprank[2]){
							buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + everytags[i]+ '</button>'; 
						}
						else continue;
					}
					document.getElementById("elements").innerHTML = name_img+ '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">All Hashtags </h4><div class = "make-margin">' +buttons2+ addButton +more_button+'</div></div>';
					document.getElementById("morebut").style.background= "url('https://image.flaticon.com/icons/svg/3/3581.svg')";
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					////////////////////////////////////////////////////////////////////////////////여기 firebase에 add하는거///////////////////////////////////////// onclick부터 틀려서 다시 짜야할듯 //////////////////////
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					//onclick이 아니라 input 받았을때
					//addbut은 애드 버튼임! 그러고보니 버튼이 아니라 text input 받을수있는 박스로 해야하넹 ㅠ
					document.getElementById("addbut").onclick = function() {addfun()};
					//애드 펑션임
					function addfun(){
						var dish = database.ref(name/Hashtags/Others)
						var tagObject = {
							
					}
				}	
				else{//줄이기
					document.getElementById("elements").innerHTML = name_img+ '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +tempb+ " " +more_button+'</div></div>';
					document.getElementById("morebut").style.background= "url('https://image.flaticon.com/icons/svg/3/3907.svg')";
				}
				
			}
			
			
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
   //searchtags();

   dishes.on('value',function(snapshot){
      snapshot.forEach(function(child){
      _names.push(child.key);
      });
});
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