import React, { useEffect, useRef } from 'react';

const Map = ({
  lat, lng, zoom = 13, onMapLoaded = () => {},
}) => {
  const refContainer = useRef(null);
  const refMap = useRef(null);

  const init = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyDLaf8dqsIyLSodHc5Z87PLYFg1qwic_Gw'}&libraries=drawing,places`;
    window.document.body.appendChild(script);

    script.onload = () => {
      refMap.current = new window.google.maps.Map(
        refContainer.current,
        {
          mapTypeId: 'roadmap',
          center: { lat, lng },
          zoom,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        },
      );

      onMapLoaded(refMap.current);
    };
  };

  useEffect(() => {
    init();
  }, []);

  return <div className="h-full w-full rounded-lg" ref={refContainer} />;
};

export default Map;
