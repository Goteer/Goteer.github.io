
function scaleFunc(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function scrollBackground(){
    for (var i = 0; i < document.getElementById("background-layer").children.length; i++){
        document.getElementById("background-layer").children[i].style.top = (document.body.scrollTop/10)-30;
    }
    document.getElementsByClassName("logo_bg")[0].style.top = (document.body.scrollTop/10)+300;
    //document.getElementsByClassName("stars")[0].style.top = (document.body.scrollTop/40);
        
    for (var i = 0; i < document.getElementsByClassName("main_container")[0].children.length; i++){

        if (document.getElementsByClassName("main_container")[0].children[i].className !== "bg_overlay_clipping"){ 

            var elementTop = document.getElementsByClassName("main_container")[0].children[i].getBoundingClientRect().y;
            var elementBottom = document.getElementsByClassName("main_container")[0].children[i].getBoundingClientRect().y+document.getElementsByClassName("main_container")[0].children[i].clientHeight;
            var elementCenter = document.getElementsByClassName("main_container")[0].children[i].getBoundingClientRect().y+document.getElementsByClassName("main_container")[0].children[i].clientHeight/2;
            
            if (elementTop > window.innerHeight/2 && elementBottom > window.innerHeight/2){
                var scale = 1-Math.abs(((elementTop/window.innerHeight)-0.5)/15)*2;
                var rotation = -800*Math.abs(((elementTop/window.innerHeight)-0.5)/15);
            }else{
                if (elementTop <= window.innerHeight/2 && elementBottom >= window.innerHeight/2){
                    var scale = 1;
                    var rotation = 0;
                }else{
                    if (elementBottom < window.innerHeight/2){
                        var scale = 1-Math.abs(((elementBottom/window.innerHeight)-0.5)/15)*1.25;
                        var rotation = 100*Math.abs(((elementTop/window.innerHeight)-0.5)/15);
                    }
                }
            }

            document.getElementsByClassName("main_container")[0].children[i].style.transform = "scale("+scale+") rotateX("+rotation+"deg)" ;
    }}

}

