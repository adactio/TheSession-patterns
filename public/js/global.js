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

var Mapping = {
    map: null,
    pins: [],
    mapOptions: {},
    location: null,
    magnification: 12,
    container: null,
    setContainer: function (container_id) {
        if (document.getElementById(container_id)) {
            Mapping.container = document.getElementById(container_id);
        }
    },
    setLocation: function (lat, lon) {
        if (!window.google) {
            return;
        }
        Mapping.location = new google.maps.LatLng(lat, lon);
    },
    setMagnification: function (mag) {
        Mapping.magnification = mag;
    },
    addMarker: function (lat, lon, overlay) {
        if (!window.google) {
            return;
        }
        var marker = new google.maps.Marker({
                map: Mapping.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(lat, lon)
            }),
            infowindow;
        if (overlay) {
            infowindow = new google.maps.InfoWindow({
                content: overlay
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(Mapping.map, marker);
            });
        }
        Mapping.pins.push(marker);
        return marker;
    },
    dropPin: function (lat, lon, overlay) {
        var marker = Mapping.addMarker(lat, lon, overlay);
    },
    removePins: function () {
        var total = Mapping.pins.length,
            i;
        for (i = 0; i < total; i = i + 1) {
            Mapping.pins[i].setMap(null);
        }
        Mapping.pins = [];
    },
    dropPins: function () {
        if (!document.querySelectorAll || !document.addEventListener || !window.google) {
            return;
        }
        Mapping.removePins();
        var elements = document.querySelectorAll('[data-latlon]'),
            total = elements.length,
            i,
            element,
            coords,
            boundary = new google.maps.LatLngBounds(),
            startBounce = function () {
                this.marker.setAnimation(google.maps.Animation.BOUNCE);
            },
            stopBounce = function () {
                this.marker.setAnimation(null);
            };
        if (total < 1) {
            return;
        }
        for (i = 0; i < total; i = i + 1) {
            element = elements[i];
            coords = element.getAttribute('data-latlon').split(',');
            element.marker = Mapping.addMarker(coords[0], coords[1], element.cloneNode(true));
            boundary.extend(new google.maps.LatLng(coords[0], coords[1]));
            element.addEventListener('mouseover', startBounce, true);
            element.addEventListener('mouseout', stopBounce, true);
        }
        Mapping.map.setCenter(boundary.getCenter());
        if (total > 1) {
            Mapping.map.fitBounds(boundary);
        }
    },
    draw: function () {
        if (!window.google) {
            return;
        }
        document.getElementsByTagName('body')[0].className += ' mapping';
        var credit = document.createElement('span');
        credit.innerHTML = '<small class="discrete credit"><abbr title="Copyright">&copy;</abbr> <a href="//www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</small>';
        Mapping.container.parentNode.appendChild(credit);
        Mapping.mapOptions = {
            zoom: Mapping.magnification,
            mapTypeId: 'OSM',
            mapTypeControlOptions: {
                mapTypeIds: ['OSM', 'styled_map', google.maps.MapTypeId.SATELLITE]
            }
        };
        Mapping.map = new google.maps.Map(Mapping.container, Mapping.mapOptions);
        if (Mapping.location) {
            Mapping.map.setCenter(Mapping.location);
        }
        Mapping.map.mapTypes.set('OSM', new google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
                return '//a.tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
            },
            tileSize: new google.maps.Size(256, 256),
            name: 'Map',
            maxZoom: 18
        }));
    },
    init : function () {
        Mapping.setContainer('map');
        if (!Mapping.container) {
            return;
        }
        Mapping.draw();
        Mapping.dropPins();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    if (!window.google) {
                        return;
                    }
                    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    Mapping.map.setCenter(location);
                    Mapping.map.setZoom(12);
                }
            );
        }
    }
};
Mapping.init();

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
