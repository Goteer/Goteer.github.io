let linksArray = { //Topbar links "array"
    'Index': { 'Type': "/index.html" },
    'Animation': { 'Type': "/index.html" },
    'Three.js Demos': {
        'Type': "Dropdown",
        'Links': {
            'Demo1': "/pages/threejs_demo/demo.html",
            'Demo2': "/pages/threejs_demo/demo.html",
            'Demo3': "/pages/threejs_demo/demo.html"
        }
    }
};



let getParams = {};
loadGetParams();

function appendLinks(links, linkListName) {
    for (var [key, value] of Object.entries(links)) {
        var link;
        if (typeof value === 'object') {
            switch (value.Type) {
                case "Dropdown":
                    var dropDiv = document.createElement("div");
                    dropDiv.className = "menu-dropdown";
                    document.getElementById(linkListName).appendChild(dropDiv)

                    link = document.createElement("span");
                    link.appendChild(document.createTextNode(key));
                    link.title = key;
                    link.id = key;
                    link.className = "dropbtn"
                    dropDiv.appendChild(link);
                    var menuDiv = document.createElement("div");
                    menuDiv.className = "menu-dropdown-content";
                    dropDiv.appendChild(menuDiv)
                    for (var [linkKey, linkValue] of Object.entries(value["Links"])) {
                        link = document.createElement("a");
                        link.appendChild(document.createTextNode(linkKey));
                        link.title = linkKey;
                        link.id = linkKey;
                        link.href = linkValue;
                        menuDiv.appendChild(link);
                    }
                    break;

                default:
                    link = document.createElement("a");
                    link.appendChild(document.createTextNode(key));
                    link.title = key;
                    link.id = key;
                    link.className = "dropbtn"
                    link.href = value["Type"]; //This is so you can just input the URL directly instead of making yet another object within
                    document.getElementById(linkListName).appendChild(link);
                    break;
            }
        }




    }
}

function loadTopbar(pageUrl) {

    if (pageUrl == undefined) {
        pageUrl = "/resources/sections/topbar.html";
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("topbar_loader").innerHTML = this.responseText;
            appendLinks(linksArray, "link-list");
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