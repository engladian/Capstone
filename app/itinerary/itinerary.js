"use strict";
controllersModule.controller('ItineraryController',
    ['$scope', 'itineraryOptions', 'MapService',
        function ($scope, itineraryOptions, MapService) {
            // console.log(itineraryOptions.data);

            var viewModel = this;
            viewModel.routesArray = itineraryOptions.data.routes;

            //starting with the first route
            var startMarker = viewModel.routesArray[0].stops[0];
            var endMarker = viewModel.routesArray[0].stops[1];

            $scope.markers = [
                {
                    id: startMarker.code,
                    coords: {
                        latitude: startMarker.pos.split(',')[0],
                        longitude: startMarker.pos.split(',')[1]
                    },
                    options: { labelContent : startMarker.name}
                },
                {
                    id: endMarker.code,
                    coords: {
                        latitude: endMarker.pos.split(',')[0],
                        longitude: endMarker.pos.split(',')[1]
                    },
                    options: { labelContent: endMarker.name }
                }];

            console.log($scope.markers);

            //Has to be scope.
            $scope.map = {
                center: {
                    latitude: startMarker.pos.split(',')[0],
                    longitude: startMarker.pos.split(',')[1]
                }, zoom: 8
            };

            console.log($scope.map);

            //Map service returns a promise.
            var baseMap = function () { return MapService.getGoogleMap(); }
        }]);