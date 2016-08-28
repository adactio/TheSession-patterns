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
