"use strict";
var controllersModule = angular.module('capstoneApp.Controllers', ['ngRoute', 'uiGmapgoogle-maps']);





//Shared Routing
controllersModule.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function ($routeProvider, uiGmapGoogleMapApiProvider) {
    //Google key
    //AIzaSyBGA8ddvnm_xryH6iqKt_M-Iv7mVyXD9WI

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBGA8ddvnm_xryH6iqKt_M-Iv7mVyXD9WI',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });


    $routeProvider
         .when('/search', {
             templateUrl: 'search/search.html'
         })
         .when('/itinerary', {
             templateUrl: 'itinerary/itinerary.html',
             controller: 'ItineraryController as itinerary',
             resolve: {
                 itineraryOptions: ['ItineraryService', function (ItineraryService) {
                     return ItineraryService.getItineraryOptions('London', 'Paris');
                 }]
             }
         })
        //.when('/countries/:country/:capital', {
        //    templateUrl: 'countrydetails/countrydetails.html',
        //    controller: 'CountryDetailsController',
        //    resolve: {
        //        capitalPop: ['countriesService', '$route', function (countriesService, $route) {
        //            var capital = $route.current.params.capital;
        //            var countryCode = $route.current.params.country;
        //            return countriesService.getCapitalPopulation(countryCode, capital);
        //        }],
        //        neighbours: ['countriesService', '$route', function (countriesService, $route) {
        //            var countryCode = $route.current.params.country;
        //            return countriesService.getNeighbours(countryCode);
        //        }],
        //        pickedCountryCode: ['$route', function($route) {
        //            return $route.current.params.country;
        //        }]
        //    }
        //})
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
        getGoogleMap: function() {
            var promise = uiGmapGoogleMapApi;
            promise.success(function (maps) {
                return maps;
            });
            return promise;
        }
    }
}]);