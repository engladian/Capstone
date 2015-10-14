"use strict";
var appModule = angular.module('capstoneApp', ['capstoneApp.Controllers',   //MUST HAVE VIEWS MODULE AS DEPENDENCY HERE
                                               'ngRoute',
                                               'ngAnimate']);

appModule.run(['$rootScope', '$timeout', function ($rootScope, $timeout) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 200); //short wait
    });
}]);



