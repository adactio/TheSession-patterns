/*
Show and hide content with aria-controls buttons
*/
(function (win, doc) {
    'use strict';
    if (!win.addEventListener) {
        // doesn't cut the mustard.
        return;
    }
    var toggleID;
    var togglecontent;
    var target;
    function toggle(ev) {
        ev = ev || win.event;
        target = ev.target;
        if (target.hasAttribute('aria-controls')) {
            toggleID = target.getAttribute('aria-controls');
            if (doc.getElementById(toggleID)) {
                ev.preventDefault();
                togglecontent = doc.getElementById(toggleID);
                if (togglecontent.getAttribute('aria-hidden') == 'true') {
                    togglecontent.setAttribute('aria-hidden', 'false');
                    togglecontent.setAttribute('tabindex', '-1');
                    togglecontent.focus();
                    target.setAttribute('aria-expanded', 'true');
                } else {
                    togglecontent.setAttribute('aria-hidden', 'true');
                    target.setAttribute('aria-expanded', 'false');
                }
            }
        }
    }
    doc.addEventListener('click', toggle, false);
}(this, this.document));
