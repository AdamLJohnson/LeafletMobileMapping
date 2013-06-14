define(function () {
    var map = null;
    var vm = {
        viewAttached: viewAttached,
        activate: activate,
        centerOnLocation: centerOnLocation,
        isLocating: ko.observable(false)
    };
    return vm;

    function activate(context) {
    }

    function viewAttached(view) {
        //var map = L.map('map').setView([51.505, -0.09], 13);
        //L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
        //    maxZoom: 18,
        //    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
        //}).addTo(map);
        map = L.map('map');

        L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>'
        }).addTo(map);
        map.setView([38.5816, -121.4944], 16);
        //map.setView([38.677959, -121.176058], 16);        
    }

    function centerOnLocation() {
        vm.isLocating(true);
        map.on('locationfound', function (e) {
            var radius = e.accuracy / 2;

            L.marker(e.latlng).addTo(map)
				.bindPopup("You are within " + radius + " meters from this point").openPopup();

            L.circle(e.latlng, radius).addTo(map);
            vm.isLocating(false);
        });
        map.on('locationerror', function (e) {
            vm.isLocating(false);
            alert(e.message);
        });

        map.locate({ setView: true, maxZoom: 16 });
    }
});