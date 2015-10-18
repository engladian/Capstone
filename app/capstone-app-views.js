"use strict";
var controllersModule = angular.module('capstoneApp.Controllers', ['ngRoute', 'uiGmapgoogle-maps']);

//Shared Routing
controllersModule.config(['$routeProvider', 'uiGmapGoogleMapApiProvider',
function ($routeProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBGA8ddvnm_xryH6iqKt_M-Iv7mVyXD9WI',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });

    $routeProvider
         .when('/search', {
             templateUrl: 'search/search.html',
             controller: 'SearchController',
             controllerAs: 'search',
             bindToController: true
         })
         .when('/itinerary/:start/:end', {
             templateUrl: 'itinerary/itinerary.html',
             controller: 'ItineraryController',
             controllerAs: 'itinerary',
             resolve: {
                 itineraryOptions: ['ItineraryService', '$route', function (ItineraryService, $route) {
                     return ItineraryService.getItineraryOptions($route.current.params.start, $route.current.params.end);
                 }]
             }
         })
        .otherwise('/search');
}]);

//Shared factories
controllersModule.factory('ItineraryService', ['$http', function ($http) {
    return {
        getItineraryOptions: function (fromName, toName) {
            var url = 'http://free.rome2rio.com/api/1.2/json/Search?key=hD1BdEWP&oName='
                + fromName + '&dName=' + toName;
            var promise = $http.get(url);
            promise.success(function (data) {
                return data;
            });
            return promise;
        }
    }
}]);

controllersModule.factory('MapService', ['uiGmapGoogleMapApi', function (uiGmapGoogleMapApi) {
    return {
        getGoogleMap: function () {
            var promise = uiGmapGoogleMapApi;
            promise.success(function (maps) {
                return maps;
            });
            return promise;
        }
    }
}]);