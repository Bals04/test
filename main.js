document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([7.1035, 125.6235], 13); // Default center for Buhangin, Davao City
    var marker;
    if (marker) {
        map.removeLayer(marker)
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            countrycodes: 'PH', // Restrict geocoding results to Philippines
            // city: 'Davao City', // Restrict results to Davao City
            limit: 1 // Limit number of results
        }
    });

    document.getElementById('locationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var userLoc = document.getElementById('address').value;
        var address = userLoc.concat(', Davao city')

        geocoder.geocode(address, function (results) {
            console.log(results); // Log geocoding results to inspect in the console

            if (results.length > 0) {
                var latLng = results[0].center;
                map.setView(latLng, 13); // Set map view to the geocoded location
                marker = L.marker(latLng).addTo(map)
                    .bindPopup("USER LOCATION: " + address)
                    .openPopup();
            } else {
                alert('Location not found');
            }
        });
    });
});
