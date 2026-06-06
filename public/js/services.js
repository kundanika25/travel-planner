app.service('TravelService', function($http) {
    this.getDestinations = function() {
        return $http.get('api/destinations');
    };
});

app.service('ItineraryService', function() {
    var itinerary = [];

    this.addToItinerary = function(item) {
        itinerary.push(item);
    };

    this.removeFromItinerary = function(index) {
        itinerary.splice(index, 1);
    };

    this.getItinerary = function() {
        return itinerary;
    };
});
