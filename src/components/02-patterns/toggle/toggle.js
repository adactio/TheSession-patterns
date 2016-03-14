/*
Show and hide content with aria-controls buttons
*/
(function (win, doc) {
    'use strict';
    if (!doc.querySelectorAll || !win.addEventListener) {
        // doesn't cut the mustard.
        return;
    }
    var toggles = doc.querySelectorAll('.toggle button[aria-controls]');
    var togglecount = toggles.length;
    var toggleID;
    var togglecontent;
    var i;
    var target;
    for (i = 0; i < togglecount; i = i + 1) {
        toggleID = toggles[i].getAttribute('aria-controls');
        if (doc.getElementById(toggleID)) {
            togglecontent = doc.getElementById(toggleID);
            togglecontent.setAttribute('aria-hidden', 'true');
            togglecontent.setAttribute('tabindex', '-1');
            toggles[i].setAttribute('aria-expanded', 'false');
        }
    }
    function toggle(ev) {
        ev = ev || win.event;
        target = ev.target || ev.srcElement;
        if (target.hasAttribute('aria-controls')) {
            toggleID = target.getAttribute('aria-controls');
            if (doc.getElementById(toggleID)) {
                togglecontent = doc.getElementById(toggleID);
                if (togglecontent.getAttribute('aria-hidden') == 'true') {
                    togglecontent.setAttribute('aria-hidden', 'false');
                    target.setAttribute('aria-expanded', 'true');
                    togglecontent.focus();
                } else {
                    togglecontent.setAttribute('aria-hidden', 'true');
                    target.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }
    doc.addEventListener('click', toggle, false);
}(this, this.document));
