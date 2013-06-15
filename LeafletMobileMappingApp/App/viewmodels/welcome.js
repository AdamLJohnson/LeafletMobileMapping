define(function () {
    var map = null;
    var locationList = ko.observableArray();
    var durandalApp = require('durandal/app');

    var vm = {
        viewAttached: viewAttached,
        activate: activate,
        centerOnLocation: centerOnLocation,
        isLocating: ko.observable(false),
        createNewLocation: createNewLocation,
        locationList: locationList
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

    function location() {
        var self = this;
        self.lat = ko.observable(null);
        self.lon = ko.observable(null);
        self.title = ko.observable(null);
        self.status = ko.observable(null);
        self.note = ko.observable(null);
        self.accuracy = ko.observable(null);
    }

    function createNewLocation() {
        var newLocation = new location();

        navigator.geolocation.getCurrentPosition(function (position) {
            newLocation.lat(position.coords.latitude);
            newLocation.lon(position.coords.longitude);
            newLocation.accuracy(position.coords.accuracy);
        }, function (error) {

        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });

        durandalApp.showModal('viewmodels/dialog/newLocation', {entity: newLocation}).then(function (results) {
            if (results === true) {
                alert(ko.toJSON(newLocation));
            }
        });
    }

});