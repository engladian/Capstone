"use strict";
controllersModule.controller('SearchController', ['$location', function ($location) {
    var scvm = this;
    scvm.startSearch = function (){
        var url = "/itinerary/" + scvm.start
          + "/" + scvm.end;
        //Send down the routing path.
        $location.path(url);
    };
}]);




