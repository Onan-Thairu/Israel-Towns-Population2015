var map = L.map('map').setView([32, 35], 7);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: "abcd",
    maxZoom: 19
}).addTo(map);

var breaks = [-Infinity, 399, 642, 933.2, 2089.8, Infinity];
var colors = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];

function getColor(d) {
    for(var i = 0; i < breaks.length; i++) {
        if(d > breaks[i] && d <= breaks[i+1]) {
            return colors[i];
        }
    }
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.pop_2015),
        weight: 0.5,
        opacity: 1,
        color: "black",
        fillOpacity: 0.7
    };
}

$.getJSON("./data/towns.geojson", function(data) {
    L.geoJSON(data, {style: style}).addTo(map);
})