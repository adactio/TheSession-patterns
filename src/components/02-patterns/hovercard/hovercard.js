/*
Show mini member profiles on hover after a delay
*/
(function (win, doc) {
    'use strict';
    if (!doc.documentElement.classList || !win.addEventListener) {
        // doesn't cut the mustard.
        return;
    }
    var showDelay = 750;
    var hideDelay = 250;
    var target;
    var targetBox;
    var card;
    var cardBox;
    var timer;
    var memberid;
    var memberbio;
    var xPos;
    var yPos;

    function hover(ev) {
        ev = ev || win.event;
        target = ev.target;
        // Drill down to the bottom element.
        while (target.firstChild && target.firstChild.nodeType == 1) {
            target = target.firstChild;
        }
        if (target.hasAttribute('data-memberbio') || target.hasAttribute('data-memberid')) {
            countdownToShowCard();
            target.addEventListener('mouseout', cancelCountdown, false);
        }
    }

    function tab(ev) {
        if (ev.keyCode == 9) {
            if (timer) {
                countdownToHideCard();
            }
            hover(ev);
        }
    }

    function cancelCountdown() {
        win.clearTimeout(timer);
    }

    function countdownToHideCard() {
        timer = win.setTimeout(hideCard, hideDelay);
    }

    function countdownToShowCard() {
        timer = win.setTimeout(showCard, showDelay);
    }

    function showCard() {
        card.innerHTML = '';
        if (target.hasAttribute('data-memberbio')) {
            memberbio = target.getAttribute('data-memberbio');
            card.innerHTML+= '<p class="discrete">' + memberbio + '</p>';
        }
        if (target.hasAttribute('data-memberid')) {
            memberid = target.getAttribute('data-memberid');
            card.innerHTML += '<p class="discrete" style="text-align: center"><a href="/members/' + memberid + '/contact" class="button action message">send a message</a></p>';
        }
        targetBox = target.getBoundingClientRect();
        cardBox = card.getBoundingClientRect();

        if (targetBox.top < cardBox.height) {
            yPos = Math.round(targetBox.bottom);
            card.classList.add('below');
        } else {
            yPos = Math.round(targetBox.top - cardBox.height);
            card.classList.add('above');
        }
        xPos = Math.round((targetBox.left + (targetBox.width/2)) - (cardBox.width/2));
        if (xPos > win.innerWidth) {
            xPos = win.innerWidth - cardBox.Width;
        }
        if (xPos < 0) {
            xPos = 0;
        }
        card.style.left = xPos + 'px';
        card.style.top = yPos + 'px';
        card.style.position = 'fixed';

        card.setAttribute('aria-hidden', 'false');
        target.setAttribute('aria-describedby', 'memberdetails');
        target.addEventListener('mouseout', countdownToHideCard, false);
        card.addEventListener('mouseover', cancelCountdown, false);
        card.addEventListener('mouseout', countdownToHideCard, false);
        doc.addEventListener('scroll', hideCard, false);
    }

    function hideCard() {
        card.setAttribute('aria-hidden', 'true');
        target.removeAttribute('aria-describedby');
        target.removeEventListener('mouseout', countdownToHideCard, false);
        card.removeEventListener('mouseout', countdownToHideCard, false);
        card.removeEventListener('mouseover', cancelCountdown, false);
        doc.removeEventListener('scroll', hideCard, false);
        win.setTimeout(function() {
            card.innerHTML = '';
            card.classList.remove('above');
            card.classList.remove('below');
            card.style.left = 'auto';
            card.style.top = 'auto';
            card.style.position = 'static';
        }, hideDelay);
    }

    function init() {
        card = doc.createElement('div');
        card.setAttribute('class', 'hovercard');
        card.setAttribute('id', 'memberdetails');
        card.setAttribute('aria-hidden', 'true');
        card.setAttribute('role', 'tooltip');
        doc.body.appendChild(card);
        doc.addEventListener('mouseover', hover, false);
        doc.addEventListener('keyup', tab, false);
    }

    init();

}(this, this.document));
