window.L_PREFER_CANVAS = true;
var map = L.map('map').setView([50.5, 30.51], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.getElementById('output').addEventListener('click', function() {
   //  sample3.innerHTML = 'Loading map image for saving....';
   // $('#sample3').plainModal('open', {offset: {left: 100, top: 50}});
	leafletImage(map, doImage);
});

window.setTimeout(function() {
    map.panBy([100, 100]);
    // map.setView([0, 0], 2);
    window.setTimeout(function() {
        leafletImage(map, doImage);
    }, 1000);
}, 1000);

function doImage(err, canvas) {
    var img = document.createElement('img');
    var dimensions = map.getSize();
    img.width = dimensions.x;
    img.height = dimensions.y;
    img.src = canvas.toDataURL();
    document.getElementById('images').innerHTML = '';
    document.getElementById('images').appendChild(img);
	//sample3.innerHTML = '';
   // sample3.appendChild(img);
}

	var markers = new L.MarkerClusterGroup();
		var markersList = [];

		function populate() {
			for (var i = 0; i < 100; i++) {
				var m = new L.Marker(getRandomLatLng(map));
				markersList.push(m);
				markers.addLayer(m);
			}
			return false;
		}
		function populateRandomVector() {
			for (var i = 0, latlngs = [], len = 20; i < len; i++) {
				latlngs.push(getRandomLatLng(map));
			}
			var path = new L.Polyline(latlngs);
			map.addLayer(path);
		}
		function getRandomLatLng(map) {
			var bounds = map.getBounds(),
				southWest = bounds.getSouthWest(),
				northEast = bounds.getNorthEast(),
				lngSpan = northEast.lng - southWest.lng,
				latSpan = northEast.lat - southWest.lat;

			return new L.LatLng(
					southWest.lat + latSpan * Math.random(),
					southWest.lng + lngSpan * Math.random());
		}

		markers.on('clusterclick', function (a) {
			alert('cluster ' + a.layer.getAllChildMarkers().length);
		});
		markers.on('click', function (a) {
			alert('marker ' + a.layer);
		});
		
		populate();
		map.addLayer(markers);