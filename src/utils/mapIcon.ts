import Leaflet from "leaflet";
import mapMarker from "../assets/map-marker.svg";

const MapIcon = Leaflet.icon({
    iconUrl: mapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});

export default MapIcon;
