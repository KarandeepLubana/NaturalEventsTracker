import React from 'react'

const Cluster = ({ lat, lng, id, pointCount, points, onClickCluster }) => {
  return (
    <section>
      <div
        className="cluster-marker"
        style={{
          width: `${10 + (pointCount / points.length) * 80}px`,
          height: `${10 + (pointCount / points.length) * 80}px`,
        }}
        onClick={() => onClickCluster(id, lat, lng)}
      >
        {pointCount}
      </div>
    </section>
  );
};

export default Cluster
