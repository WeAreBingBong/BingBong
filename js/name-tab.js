// JavaScript Document
// tags mean dish names here

var tags= [];
var _names = [];
var database;
var dishes;
var count = 0;
var tagsauto = [];
var putButton = '<button class = "foradd" id="put"></button>';


function categoryOfTag(child, tag) {
  dishes.on('value',function(snapshot){
     snapshot.forEach(function(child){
       var category="";
       for(var obj in child.val().Hashtags)
          {
              for(var element in child.val().Hashtags[obj])
              {
                  if(element == tag){
                        category = obj;

                  }
              }
          }
         return category;
      }
    )})
}

//console.log(indexOfTag(Gamjatang, Hot));
function searchtags(name){
document.getElementById("elements").innerHTML = "";
   dishes.on('value',function(snapshot){
      snapshot.forEach(function(child){

         if(name.toLowerCase() == child.key.toLowerCase()) {


            var flag =  [];
            var toprank = ["","",""];
            var topranktag = [0,0,0];
			var everytags = [];

            for(var obj in child.val().Hashtags)
            {

                  for(var element in child.val().Hashtags[obj])
                  {
						//if(element == name){ category = obj; }
						everytags.push(element);
						for(var i=0;i<tags.length;i++)
                        {


                           if(element.toLowerCase() == tags[i].toLowerCase())
                              {
                                 flag.push(element);
                              }

                        }
                     if(toprank[0] == "")
                     {
                        toprank[0] = element;
                        topranktag[0] = child.val().Hashtags[obj][element];
                     }
                     else if(child.val().Hashtags[obj][element] > child.val().Hashtags[obj][toprank[0]])
                        {
                           var tmp = toprank[0];
                           toprank[0] = element;
                           toprank[2] = toprank[1];
                           toprank[1] = tmp;

                           var tmptag = topranktag[0];
                           topranktag[0] = child.val().Hashtags[obj][element];
                           topranktag[2] = topranktag[1];
                           topranktag[1] = tmptag;
                        }
                     else
                     {
                        if(toprank[1] == "")
                        {
                           toprank[1] = element;

                           topranktag[1] = child.val().Hashtags[obj][element];
                        }
                        else if(child.val().Hashtags[obj][element] > child.val().Hashtags[obj][toprank[1]])
                        {
                           var tmp = toprank[1];
                           toprank[1] = element;
                           toprank[2] = tmp;

                           var tmptag = topranktag[1];
                           toprantagk[1] = child.val().Hashtags[obj][element];
                           topranktag[2] = tmptag;
                        }
                        else
                        {
                           if(toprank[2] == "")
                           {
                              toprank[2] = element;

                              topranktag[2] = child.val().Hashtags[obj][element];
                           }
                           else if(child.val().Hashtags[obj][element] > child.val().Hashtags[obj][toprank[2]])
                           {

                              toprank[2] = element;

                              topranktag[2] = child.val().Hashtags[obj][element];
                           }
                        }
                     }
                  }
            }

		var dbTestRef = database.ref(name+'/Hashtags/ca')

           var buttons2="";
         var name_img = '&nbsp<div class="card"><h2 class="card__title" style="font-family: Quicksand; font-size:21px; font-weight:bold; ">'+child.key+'</h2><div class="card__content"><img src='+child.val().image +' width="180" class = "pull-left">';

            var toprankbutton="";

            for(var i=0;i<3;i++)
               {
                  if(toprank[i] != "")
                     {
                        buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + toprank[i]+ '<img src="./img/profile.png" height="16" width="16">'+topranktag[i]+'</button>';

                     }
               }


			var tempb = buttons2;
			var more_button = '<button class = "more" id="morebut"></button>';
            toprankbutton = '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +buttons2+ " " +more_button+'</div></div>';

            document.getElementById("elements").innerHTML=document.getElementById("elements").innerHTML+name_img+toprankbutton;


			var tagclick = document.getElementsByClassName("hashb");
			for (var i = 0; i < tagclick.length; i++) {
				tagclick[i].addEventListener('click', (function(i) {
					return function() {
						console.log(i);
						var cat = categoryOfTag(child, tagclick[i]);
						console.log(cat);
						getnum(name, tagclick[i], cat);
            var dbTestRef = database.ref(name+'/Hashtags/'+cat);
            dbTestRef.update({
              //tagclick[i]: getnum(name, tagclikc[i], cat)-1;
            })
					};
				})(i), false);
			};

			document.getElementById("morebut").onclick = function() {
				var addinput = '<input id = "input2" class = "adding" type="text" placeholder="Add Hashtag ex) spicy, salty">';

				for(var i=0;i<everytags.length;i++){
				//top rank랑 겹치면 안넣어줌
					if(everytags[i] != toprank[0] && everytags[i] != toprank[1] && everytags[i] != toprank[2]){
						buttons2 += '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;">' + everytags[i]+ '<img src="./img/profile.png" height="16" width="16">'+32+'</button>';
					}
					else continue;
				}
				document.getElementById("elements").innerHTML = name_img+ '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">All Hashtags </h4><div class = "make-margin">' +buttons2+ addinput+putButton +more_button+'</div></div>';
				document.getElementById("morebut").style.height = "0px";
				document.getElementById("morebut").style.width = "0px";


				var put_Button = document.getElementById("put");
		//console.log(put_Button);
				put_Button.onclick = function() {
					addtag(child.key, document.getElementById("input2").value)

				};
			}

         }

         });
      });

}


function getnum(name, tag, category){
	var dbTestRef = database.ref(name+'/Hashtags/'+category)
	dbTestRef.once('value', function(data){
		console.log(data.child(tag).val());
    //return(data.child(tag).val());
	})
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

	//if($('div.pannel11').length == 1{

	//}
	console.log("Updated");
	//console.log($('div.card__title').length);

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



function addtag(child, tag){
	database.ref(child+'/Hashtags/ca').child(tag).set(1);
	searchtags(child);

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


/*
var normalize = function( term ) {
   var ret = "";
      for ( var i = 0; i < term.length; i++ ) {
        ret += accentMap[ term.charAt(i) ] || term.charAt(i);
      }
      return ret;
    };*/
