/*
Hijack YouTube button links to display the video inline in an iframe.
*/
(function (win, doc) {
    'use strict';
    if (!win.addEventListener) {
        // doesn't cut the mustard.
        return;
    }
    var embedVideo = function (ev) {
        ev = ev || win.event;
        var target = ev.target;
        var container = target.parentNode;
        var videoid;
        if (target !== doc && target.hasAttribute('data-videoid')) {
            if (container.hasAttribute('data-videoid')) {
                target = container;
                container = target.parentNode;
            }
            ev.preventDefault();
            videoid = target.getAttribute('data-videoid');
            container.innerHTML = '<div class="youtube"><div class="youtube-video"><iframe src="https://www.youtube.com/embed/' + videoid + '?autoplay=1" width=320 height=200></iframe></div></div>';
        }
    };
    doc.addEventListener('click', embedVideo, false);
}(this, this.document));
