import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// default icon
const customIcon = new Icon({
  iconUrl: require("../assets/marker-disco.png"), // percorso icona default
  iconSize: [40, 40], // dimensione
});

// raggruppatore di marker
const createCustomClusterIcon = (cluster) => {
  return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// marker creati default
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Maison du Luca",
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Free Baguette",
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Cathedral en parti",
  },
  {
    geocode: [45.070262, 11.790684],
    popUp: "Babbo Natale in piazza!",
  },
  {
    geocode: [45.527909, 11.503608],
    popUp: "Villa Bonin, opening",
  },
  {
    geocode: [45.069402, 11.792291],
    popUp: "Prolife - mostra canina",
  },
  {
    geocode: [45.115529, 11.771944],
    popUp: "Lacapait",
  },
  {
    geocode: [44.880284, 11.750688],
    popUp: "Paparazzi - closing year",
  },
];

const MapsTest = () => {
  return (
    <>
      <MapContainer center={[45.0451, 11.4738]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker) => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
};

export default MapsTest;
