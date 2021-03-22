let getParams = {};
loadGetParams();


function loadPage(pageUrl){

  if (pageUrl == undefined){
      pageUrl = document.location.hostname + "/pages/index_page.html";
  }


  var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    document.getElementById("main_div_frame").innerHTML = this.responseText;
  }else{
    document.getElementById("main_div_frame").innerHTML = "There was a problem trying to get the page you requested. <button onclick='loadPage()'>Try reloading the page</button> or <button onclick='loadPage()'>Go to the home page</button>";
  }
 };
 xhttp.open("GET", pageUrl, true);
 xhttp.send();
}

function loadGetParams(){

  var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               getParams[pair[0]] = pair[1];
       }
  }
