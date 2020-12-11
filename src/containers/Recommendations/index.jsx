import React, { useRef, useState, useEffect } from 'react';
// import Loader from 'react-loader-spinner';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import { getReferenceInfo } from '../../utils/requests/getReferenceInfo';
import { getHotItems } from '../../utils/requests/getHotItems';
import ListOfItems from './ListOfItems';
import Map from '../../components/Map';
import styles from './index.module.sass';
import { getInfoStore } from '../../utils/requests/getInfoStore';

const Recommendations = (props) => {
  const refMap = useRef(null);
  const refZone = useRef(null);
  const refMarker = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeInfo, setStoreInfo] = useState({});

  const init = async () => {
    setLoading(true);
    const storeId = props?.match?.params?.storeId;
    const hotReferences = await getHotItems(storeId);

    const promises = hotReferences.map((item) => new Promise((resolve) => {
      getReferenceInfo(storeId, item.storeReferenceId)
        .then((res) => {
          resolve(res);
        });
    }));

    Promise.all(promises).then((values) => {
      const newItems = values.map((reference) => {
        const additionalData = hotReferences.find((h) => h.storeReferenceId === reference.id);
        return { ...reference, ...additionalData };
      });

      setItems(newItems);
      setLoading(false);
    });
    getInfoStore(storeId).then((_storeInfo) => {
      setStoreInfo(_storeInfo);
    });
  };
  const DrawingZone = () => {
    const position = { lng: Number(storeInfo.longitude), lat: Number(storeInfo.latitude) };
    refMap.current.setCenter(position);

    refZone.current = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: refMap.current,
      center: position,
      radius: 1000,
    });

    refMarker.current = new window.google.maps.Marker({
      position,
      animation: window.google.maps.Animation.DROP,
      map: refMap.current,
    });

    const infowindow = new window.google.maps.InfoWindow();
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (items.length && refMap.current) {
      DrawingZone();
    }
  }, [JSON.stringify(storeInfo)]);

  const handleMapLoaded = async (map) => {
    refMap.current = map;
  };

  return (
    <>
      <Header />
      <Wrapper className={styles.main}>
        <div className="w-full">

          <div className="w-full h-128 bg-gray-300 rounded-lg mt-3 mx-auto">
            <Map lng={-74.07209} lat={4.710989} onMapLoaded={handleMapLoaded} />
          </div>

          <div className="mt-4 w-full">
            <ListOfItems items={items} loading={loading} />
          </div>

        </div>

      </Wrapper>
    </>
  );
};

export default Recommendations;
