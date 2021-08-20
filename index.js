var velocity = 0.5;

function scrollBg() {
    var pos = document.window.scrollTop();
    document.getElementsByClassName('.background-container').each(function() {
        var element = document.getElementsByClassName('.background-container');
        // subtract some from the height b/c of the padding
        var height = element.height() - 18;
        document.getElementsByClassName('.background-container').css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px');
    });
};

document.window.bind('scroll', scrollBg);