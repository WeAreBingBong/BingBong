// JavaScript Document
// tags mean dish names here

var tags= [];
var _names = [];
var database;
var dishes;
var count = 0;
var tagsauto = [];
var putButton = '<button class = "foradd" id="put"></button>';
var results = 0;
/*
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
}*/

//console.log(indexOfTag(Gamjatang, Hot));
function searchtags(name){
  results = 0;
document.getElementById("elements").innerHTML = "";
   dishes.once('value',function(snapshot){
      snapshot.forEach(function(child){

         if(name.toLowerCase() == child.key.toLowerCase()) {

            results += 1;
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
                           topranktag[1] = child.val().Hashtags[obj][element];
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


           var buttons = "";
        for(var i=0;i<tags.length;i++)
          {
            buttons += '<button>' + flag[i]+ '</button>&nbsp';
          }
        //console.log(child.val().image);
        // Adding Hashtag
        /*var hashtagbutton = '&nbsp<div class = "pannel panel-info" style="margin-top: 2px;margin-bottom: 2px; margin-right: 2px; margin-left: 10px; border:1px solid #bce8f1; border-radius: 5px;" ><div class = "panel-heading"><h4>'+child.key+'</h4></div><div class = "panel-body"><img src='+child.val().image +' width="200" class = "pull-left"><div class = "container" ><h4 class = "make-margin">Searching Hashtags </h4><div class = "make-margin">' +buttons +'</div></div>';*/
        var hashtagbutton = '&nbsp<div style="margin-top:10px;"class="card"><h2 class="card__title" style="font-family: Quicksand; font-size:21px; font-weight:bold; ">'+child.key+'</h2><div class="card__content"><img src='+child.val().image +' width="180" class = "pull-left">';
        // Adding Top Rank Hashtag
        var buttons2=""
        var toprankbutton="";
        for(var i=0;i<3;i++)
          {
            if(toprank[i] != "")
              {
                var tmp = '<button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;" onclick="hashclick(this)">'
                        + toprank[i]+
                        ////여기ㅣ기기기건드렸음!!!!!!
                        '<img src="./img/profile.png" height="16" width="16">'
                        + topranktag[i]  + //  숫자
                        '</button>';
                buttons2 += tmp;
              }
          }

        

      
        var name_img = '&nbsp<div class="card"><h2 class="card__title" style="font-family: Quicksand; font-size:21px; font-weight:bold; ">'+child.key+'</h2><div class="card__content"><img src='+child.val().image +' width="180" class = "pull-left">';
        
        var tempb = buttons2;
        var more_button = '<br><i class="fa fa-caret-square-down" id="morebut" onclick="showmore(this.parentNode.parentNode.parentNode)" style = "color:gray;font-size:30px;"></i>';
        
              toprankbutton = '<h4 class = "make-margin" style="font-family: Quicksand; font-size:16px;">Top Rank Hashtags </h4><div class = "make-margin">' +buttons2+more_button+'</div></div>';

              document.getElementById("elements").innerHTML=document.getElementById("elements").innerHTML+name_img+toprankbutton;
      }

      });
  if(results == 0 && tags.length !=0)
  {
    document.getElementById("elements").innerHTML = '<div style="color:gray; margin-top:10px;">&nbsp&nbspNo Results</div>';
  }
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


function showmore(node1)
{
  //버튼을 누른 음식 이름
  var toprank = [];
  //console.log(node1.childNodes[1].childNodes[2].childNodes[0]);
  toprank.push(node1.childNodes[1].childNodes[2].childNodes[0].innerHTML.split('<img')[0]);
  toprank.push(node1.childNodes[1].childNodes[2].childNodes[1].innerHTML.split('<img')[0]);
  toprank.push(node1.childNodes[1].childNodes[2].childNodes[2].innerHTML.split('<img')[0]);
  
  node1.childNodes[1].childNodes[1].innerHTML = "All Hashtags";

  //console.log(node1.childNodes[1].childNodes[2].childNodes[3]);
  node1.childNodes[1].childNodes[2].removeChild(node1.childNodes[1].childNodes[2].childNodes[3]);
  node1.childNodes[1].childNodes[2].removeChild(node1.childNodes[1].childNodes[2].childNodes[3]);
  var name = node1.childNodes[0].innerHTML;
  var nameRef = database.ref(name+'/Hashtags/ca')

  nameRef.once('value',function(snapshot){
    snapshot.forEach(function(child){
      if(child.key != toprank[0] && child.key != toprank[1] && child.key != toprank[2])
      { 
        node1.childNodes[1].childNodes[2].innerHTML = node1.childNodes[1].childNodes[2].innerHTML + ' <button class="hashb" style="margin-bottom : 5px; font-family: Quicksand;" onclick="hashclick(this)">'+child.key+'<img src="./img/profile.png" height="16" width="16">'+child.val()+'</button>';
      }
    });
  });

  var addinput = '<input id = "input2" style = "width:270px; height:40px;"class = "adding" type="text" placeholder="Add Hashtag ex) spicy, salty"></input><i style = "font-size: 30px; color:gray ;margin-left:10px; margin-top:5px;"class = "fa fa-plus-square" id="put" onclick="addnewhash(this.parentNode.parentNode)"></i><i style = "font-size: 30px; color:gray ;margin-left:10px; margin-top:5px;" class = "make-margin fa fa-caret-square-up" onclick = "fold(this.parentNode.parentNode)"></i>';
  

  node1.childNodes[1].innerHTML = node1.childNodes[1].innerHTML+addinput;
}

function addnewhash(node)
{
  var name = node.childNodes[0].innerHTML;
  var tag = node.childNodes[1].childNodes[3].value;
  node.childNodes[1].childNodes[3].value="";
  if(tag != "")
  {
    var flag = 0;
    var nameRef = database.ref(name+'/Hashtags/ca');
    /*nameRef.once('value',function(snapshot){
    snapshot.forEach(function(child){

      if(child.key == tag)
      { 
        console.log(child.val())
        nameRef.child(tag).set(child.val()+1)
        flag = 1;
      }
    });
    if(flag == 0)
    {*/
      nameRef.child(tag).set(1);
      node.childNodes[1].childNodes[2].innerHTML = node.childNodes[1].childNodes[2].innerHTML + ' <button class="hashb" style="margin-bottom : 5px; font-family: Quicksand; background-color:lightgray;" onclick="hashclick(this)">'+tag+'<img src="./img/profile.png" height="16" width="16">'+"1"+'</button>';
    //}

  }
  
  //ode1.childNodes[1].childNodes[2].innerHTML = node1.childNodes[1].childNodes[2].innerHTML + ' <button class="hashb yellow" style="margin-bottom : 5px; font-family: Quicksand;" onclick="hashclick(this)">'+child.key+'<img src="./img/profile.png" height="16" width="16">'+"1"+'</button>';
  //console.log(tag);
}

function hashclick(node)
{ 
  //console.log(node);
  if(node.style.backgroundColor!="lightgray")
  {
    node.style.backgroundColor="lightgray";
    //console.log(node.innerHTML.split('>')[1])
    var added = parseInt(node.innerHTML.split('>')[1])+1;
    node.innerHTML=node.innerHTML.split('>')[0]+'>'+added;
    //console.log(node.parentNode.parentNode.parentNode);
    var node1 = node.parentNode.parentNode.parentNode;
    var name = node1.childNodes[0].innerHTML;
    var nameRef = database.ref(name+'/Hashtags/ca');

    var tagname = node.innerHTML.split('<img')[0];

    nameRef.child(tagname).set(added);
  }
  

}

function fold(node)
{
  var more_button = '<br><i class="fa fa-caret-square-down" id="morebut" onclick="showmore(this.parentNode.parentNode.parentNode)" style = "color:gray;font-size:30px;"></i>';
  //console.log(node.childNodes[1].childNodes[2]);
  var name = node.childNodes[0].innerHTML;
  node.childNodes[1].childNodes[1].innerHTML = "Top Rank Hashtags";
  var toprank = [];
  toprank[0] = node.childNodes[1].childNodes[2].childNodes[0];
  toprank[1] = node.childNodes[1].childNodes[2].childNodes[1];
  toprank[2] = node.childNodes[1].childNodes[2].childNodes[2];
  node.childNodes[1].childNodes[2].innerHTML="";
  node.childNodes[1].childNodes[2].appendChild(toprank[0]);
  node.childNodes[1].childNodes[2].appendChild(toprank[1]);
  node.childNodes[1].childNodes[2].appendChild(toprank[2]);
  node.childNodes[1].childNodes[2].innerHTML = node.childNodes[1].childNodes[2].innerHTML + more_button;
  console.log(node.childNodes[1].childNodes[3]);
  node.childNodes[1].removeChild(node.childNodes[1].childNodes[3]);
  node.childNodes[1].removeChild(node.childNodes[1].childNodes[3]);
  node.childNodes[1].removeChild(node.childNodes[1].childNodes[3]);
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
