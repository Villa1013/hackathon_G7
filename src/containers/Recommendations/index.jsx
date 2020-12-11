/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
// import Loader from 'react-loader-spinner';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
// import Card from '../../components/Cards';
// import { getReferenceInfo } from '../../utils/requests/getReferenceInfo';
// import { getHotItems } from '../../utils/requests/getHotItems';
import ListOfItems from './ListOfItems';
import Map from '../../components/Map';
import styles from './index.module.sass';

const Recommendations = () => {
  const refMap = useRef(null);
  const refZone = useRef(null);
  const getPosition = () => new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position);
    });
  });

  const handleMapLoaded = async (map) => {
    refMap.current = map;

    const position = await getPosition();
    const { coords: { longitude: lng, latitude: lat } } = position;
    const zone = {
      center: { lat, lng },
      radius: 1000,
    };
    map.setCenter({ lat: Number(lat), lng: Number(lng) });

    refZone.current = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map,
      center: zone.center,
      radius: zone.radius,
    });
  };

  return (
    <>
      <Header />
      <Wrapper className={styles.main}>
        <div className="w-full">

          <div className="w-full h-128 bg-gray-300 rounded-lg mt-3 mx-auto">
            <Map lng={-74.07209} lat={4.710989} onMapLoaded={handleMapLoaded} />
          </div>

          <div className="mt-3 w-full">
            <ListOfItems />
          </div>

        </div>

      </Wrapper>
    </>
  );
};

export default Recommendations;
