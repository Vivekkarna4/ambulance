document.getElementById('findAmbulanceBtn').addEventListener('click', findAmbulance);

function findAmbulance() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    map.flyTo({
        center: [lng, lat],
        zoom: 15
    });

    // Example ambulance location (for demonstration purposes)
    const ambulanceLocation = [lng + 0.01, lat + 0.01];

    new mapboxgl.Marker({
        position: ambulanceLocation,
        icon: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/symbol-11-convex-pentagon-0.5-0.5-0.5-stroke-#f00', // Use a custom icon for the ambulance
        title: "Ambulance Location"
    }).addTo(map);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
