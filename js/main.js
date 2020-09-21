var map = L.map('map').setView([32, 35], 7);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
}).addTo(map);

var breaks = [-Infinity, 399, 642, 933.2, 2089.8, Infinity];
var colors = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];

/* Function to choose color */
function getColor(d) {
    for(var i = 0; i < breaks.length; i++) {
        if(d > breaks[i] && d <= breaks[i+1]) {
            return colors[i];
        }
    }
}

/* Function to style map features */
function style(feature) {
    return {
        fillColor: getColor(feature.properties.pop_2015),
        weight: 0.5,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7
    };
}

var geojson;
/* Function to add (,) to population numbers in the thousands */
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

/* Adding popups on each feature */
$.getJSON("./data/towns.geojson", function(data) {
    geojson = L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                '<div class="popup">' +
                'Town: ' + feature.properties.name_eng + '<br />' +
                '<b>' + 'Population: ' + formatNumber(feature.properties.pop_2015) + '</b>' +
                '</div>'
            );
        },
        style: style
    }).addTo(map)
})

/* Adding a legend to the map */
var legend = L.control({position:"topright"});
legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = 
        '<b>Population in 2015</b><br />by Town<br />' +
        '<small>Persons/Town</small><br />';
    for(var i = breaks.length-1; i > 0; i--) {
        div.innerHTML +=
        '<i style="background-color: ' + colors[i-1] + '"></i>' +
        breaks[i-1] + ' - ' + breaks[i] + '<br />';
    }
    return div;
}
legend.addTo(map);