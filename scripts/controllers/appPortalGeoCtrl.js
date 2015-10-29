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

        var urlRequest = 'http://localhost:8080/portalgeo/assets/' + origin + '.json';
        
        $http.get(urlRequest).success(function (data) {

            for (var i = 0; i <= data.length; i++) {
                var address = "";
                var title = "Sem Nome";
                if (typeof data[i].DE !== "undefined" || typeof data[i].DE !== "SN") {
                    address += String(data[i].DE).trim() + ', ';
                }
                if (typeof data[i].BAIESC !== "undefined") {
                    address += String(data[i].BAIESC).trim() + ', ';
                }
                if (typeof data[i].ENDESC !== "undefined") {
                    address += String(data[i].ENDESC).trim() + ', ';
                }
                if (typeof data[i].NUMESC !== "undefined") {
                    address += 'Nº ' + String(data[i].NUMESC).trim();
                }
                if (typeof data[i].NOMESC !== "undefined") {
                    title = data[i].NOMESC;
                }
                $scope.getMarkerFromAddress(address, title);
            }

        }).error(function (data, status) {

            console.log("Error object http get: " + status);

        });
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
        sleep(0010);
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