import Leaflet from "leaflet";
// import mapMarker from "../assets/map-marker.svg";
// svg import was not working at vercel deployment

const MapIcon = Leaflet.icon({
    iconUrl: "https://happy-web-gamma.vercel.app/map-marker.71889b59.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});

export default MapIcon;
