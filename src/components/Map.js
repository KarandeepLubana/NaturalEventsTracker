import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import LocationMarker from "./LocationMarker";
import Cluster from "./Cluster";
import Select from "./Select";
require("dotenv").config();

const Map = React.memo(({ center, points }) => {

  const mapRef = useRef();
  const [zoom, setZoom] = useState(6);
  const [bounds, setBounds] = useState(null);

  // Array of clusters containing points
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });
 
  const onClickCluster = (id, latitude, longitude) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(id),
      80
    );
    mapRef.current.setZoom(expansionZoom);
    mapRef.current.panTo({ lat: latitude, lng: longitude });
  };

  return (
    <div className="map">
      <Select />
      {/* <Search /> */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        // options={getMapOptions}
        // distanceToMouse={distanceToMouse}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          // Everytime the user moves the map we are updating the state
          // After the map re-renders with the new state values, the useSupercluster will show the clusters accordingly
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          // console.log("TITLE:", cluster.properties.title);

          if (isCluster) {
            return (
              <Cluster
                key={cluster.id}
                id={cluster.id}
                lat={latitude}
                lng={longitude}
                points={points}
                pointCount={pointCount}
                onClickCluster={onClickCluster}
              />
            );
          }

          // Not a cluster. Just a single point
          return (
            <LocationMarker
              key={cluster.properties.eventId}
              lat={latitude}
              lng={longitude}
              title={cluster.properties.title}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
});

Map.defaultProps = {
  center: {
    lat: 43.6532,
    lng: -79.3832,
  },
};

export default Map;
