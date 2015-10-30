angular.module("appPortalGeo").controller("appPortalGeoCtrl", function ($scope, $http) {
    
    var map = null;
    var geocoder = null;
        
    $scope.init = function () {
        map = new google.maps.Map(document.getElementById('mapPrincipal'), {

            center: new google.maps.LatLng(-23.223701, -45.900907399999994),
            zoom: 10,

        });
        geocoder = new google.maps.Geocoder();
    };

    $scope.getInformations = function (origin) {

        var urlRequest = 'http://127.0.0.1:8887//portalgeo/assets/' + origin + '_codificado.json';
        
        $http.get(urlRequest).success(function (data) {

            for (var i = 0; i <= data.data.features.length; i++) {
                $scope.newMarker(map, data.data.features[i].geometry.coordinates)
            }

        }).error(function (data, status) {

            console.log("Error object http get: " + status);

        });
    };

    $scope.newMarker = function (mapMain, coords) {
        var newLatlng = new google.maps.LatLng(coords[1], coords[0]);
        marker.push(new google.maps.Marker({

            map: mapMain,
            position: newLatlng

        }));
    };

    $scope.setSchools = function (type) {

        for (var i = 0; i <= marker.length -1; i++) {
            marker[i].setMap(null);
        }

        marker = new Array();
       
        $scope.getInformations(type);
    };

    $scope.getMarkerFromAddress = function (address, title) {

        geocodeAddress(geocoder, map, address, title);
    };

    $scope.init();
});

var marker = new Array();

function geocodeAddress(geocoder, resultsMap, address, titleMarker) {

    geocoder.geocode({ 'address': address }, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK) {

            marker.push( new google.maps.Marker({

                map: resultsMap,
                title: titleMarker,
                position: results[0].geometry.location

            }));

        } else {

            alert('Geocode was not successful for the following reason: ' + status);

        }
    });

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}