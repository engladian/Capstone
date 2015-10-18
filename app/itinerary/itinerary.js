"use strict";
controllersModule.controller('ItineraryController',
['$scope', 'itineraryOptions', 'MapService',
function ($scope, itineraryOptions, MapService) {
    console.log(itineraryOptions.data);

    var viewModel = this;
    viewModel.routesArray = itineraryOptions.data.routes;
    viewModel.selectedRouteIndex = 0;
    viewModel.selectedSegmentIndex = 0;

    //starting with the first route
    var startMarker = viewModel.routesArray[0].stops[0];
    var endMarker = viewModel.routesArray[0].stops[1];

    $scope.markers = [
    {
        id: startMarker.code,
        coords: getPositionObj(startMarker.pos),
        options: { labelContent: startMarker.name }
    },
    {
        id: endMarker.code,
        coords: getPositionObj(endMarker.pos),
        options: { labelContent: endMarker.name }

    }];

    //Has to be scope.
    $scope.map = {
        center: getPositionObj(startMarker.pos),
        zoom: 8
    };

    console.log($scope.map);

    //Map service returns a promise.
    var baseMap = function () { return MapService.getGoogleMap(); }
}]);


function getPositionObj(pos) {
    var posArray = pos.split(',');
    return {
        latitude: posArray[0],
        longitude: posArray[1]
    }
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});