import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { DataContext } from "../context/DataProvider";

// Fix for marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Set default icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup offset
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ filters }) => {
  const { clusters, setClusters, skip, setSkip, field, setField, sorted, setSorted } = useContext(DataContext);

  const limit = 100;

  useEffect(() => {
    axios
      .get("http://localhost:8000/cluster/api/data", {
        params: {
          limit: limit,
          skip: skip,
          field: field,
          sorted: sorted
        }
      })
      .then((response) => {
        const allClusters = response.data;

        const filteredClusters = allClusters.filter((cluster) => {
          const { minUsers, minProjects } = filters;
          return (
            (!minUsers || cluster.users >= minUsers) &&
            (!minProjects || cluster.projects >= minProjects)
          );
        });

        setClusters(filteredClusters);
      })
      .catch((error) => console.error(error));
  }, [filters, skip, field, sorted]);

  return (
    <div className="map-container bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-4 pl-8 pr-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Cluster Map
      </h2>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        className="w-full h-96 sm:h-[500px] rounded-md border border-black-300"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {clusters.map((cluster) => (
          <Marker
            key={cluster.name}
            position={[cluster.location.latitude, cluster.location.longitude]}
          >
            <Tooltip>
              <div className="text-xs text-gray-800">
                <strong className="text-blue-600">{cluster.name}</strong>
                <br />
                Users: {cluster.users}
                <br />
                Projects: {cluster.projects}
                <br />
                Leads: {cluster.leads}
              </div>
            </Tooltip>
            <Popup>
              <div className="p-2 text-gray-700">
                <h3 className="font-semibold text-lg text-blue-600">
                  {cluster.name}
                </h3>
                <p className="text-sm">Users: {cluster.users}</p>
                <p className="text-sm">Projects: {cluster.projects}</p>
                <p className="text-sm">Leads: {cluster.leads}</p>
                <p className="text-sm">
                  Location: ({cluster.location.latitude},{" "}
                  {cluster.location.longitude})
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Hover over a marker to see details.
      </p>
    </div>

  );
};

export default MapComponent;