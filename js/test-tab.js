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
            console.log(name);
            //console.log(child.val().Hashtags);
            var flag =  [];
            var toprank = ["","",""];
        /*
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
      */


            //console.log(child.val().image);
            // Adding Hashtag
            /*var hashtagbutton = '&nbsp<div class = "pannel panel-info" style="margin-top: 2px;margin-bottom: 2px; margin-right: 2px; margin-left: 10px; border:1px solid #bce8f1; border-radius: 5px;" ><div class = "panel-heading"><h4>'+child.key+'</h4></div><div class = "panel-body"><img src='+child.val().image +' width="200" class = "pull-left"><div class = "container" ><h4 class = "make-margin">Searching Hashtags </h4><div class = "make-margin">' +buttons +'</div></div>';*/
            var hashtagbutton ='&nbsp<div class="card"><h2 class="card__title"style="font-family: Quicksand;font-size:21px; font-weight:bold; ">'
                                          +child.key+
                                          '</h2><div class="card__content"><img src='
                                          +child.val().image +' width="180" class = "pull-left">';
            // Adding Top Rank Hashtag


            //var toprankbutton="";
        /*
            for(var i=0;i<3;i++)
               {
                  if(toprank[i] != "")
                     {
                        buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + toprank[i]+ '</button>&nbsp';
                     }
               }*/
            //toprankbutton = '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +buttons2 +'</div></div>';
            document.getElementById("elements").innerHTML=document.getElementById("elements").innerHTML+ hashtagbutton;

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
