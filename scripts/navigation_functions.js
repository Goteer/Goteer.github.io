let links = { //Topbar links "array"
    'Index': "/index.html",
    '3D Demo': "/pages/threejs_demo/demo.html",
};



let getParams = {};
loadGetParams();


function loadTopbar(pageUrl) {

    if (pageUrl == undefined) {
        pageUrl = "/resources/sections/topbar.html";
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("topbar_loader").innerHTML = this.responseText;
            for (var [key, value] of Object.entries(links)) {
                var link = document.createElement("a");
                link.appendChild(document.createTextNode(key));
                link.title = key;
                link.href = value;
                document.getElementById("link-list").appendChild(link);
            }
        } else {
            document.getElementById("topbar_loader").innerHTML = "There was a problem trying to get the page you requested. <button onclick='loadPage()'>Try reloading the page</button> or <button onclick='loadPage()'>Go to the home page</button>";
        }
    };
    xhttp.open("GET", pageUrl, true);
    xhttp.send();


}

function loadGetParams() {

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        getParams[pair[0]] = pair[1];
    }
}