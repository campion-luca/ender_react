import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';


// default icon
const customIcon = new Icon({
    iconUrl: require("../assets/marker-disco.png"), // percorso icona default
    iconSize: [38, 38] // dimensione
})


// raggruppatore di marker
const createCustomClusterIcon = (cluster) => {
    return new divIcon({
        html: <div class="cluster-icon">${cluster.getChildCount()}</div>,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
    });
};


// marker creati default
const markers = [
    {
        geocode: [48.86, 2.3522],
        popUp: "Hello, pop up 1"
    },
    {
        geocode: [48.85, 2.3522],
        popUp: "Hello, pop up 2"
    },
    {
        geocode: [48.855, 2.34],
        popUp: "Hello, pop up 3"
    },
    {
        geocode: [45.07139462931815, 11.789627562572209],
        popUp: "Cupola di festa!"
    }
];

const MapsTest = () => {
  
    return(

    <>
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
        >


        {markers.map(marker => (
            <Marker position={marker.geocode} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
            </Marker>
        ))}
</MarkerClusterGroup>
    </MapContainer>
    </>

  )
};

export default MapsTest;