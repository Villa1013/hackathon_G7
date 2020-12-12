import React, { useRef, useState, useEffect } from 'react';
// import Loader from 'react-loader-spinner';
import Loader from 'react-loader-spinner';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import Footer from '../../components/Footer';
import { getReferenceInfo } from '../../utils/requests/getReferenceInfo';
import { getHotItems } from '../../utils/requests/getHotItems';
import { getLastOrders } from '../../utils/requests/getLastOrders';
import ListOfItems from './ListOfItems';
import Map from '../../components/Map';
import styles from './index.module.sass';
import { getInfoStore } from '../../utils/requests/getInfoStore';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Recommendations = (props) => {
  const refMap = useRef(null);
  const refZone = useRef(null);
  const refMarker = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeInfo, setStoreInfo] = useState({});
  const [lastOrders, setLastOrders] = useState([]);

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

      getLastOrders(storeId).then((orders) => {
        getInfoStore(storeId).then((_storeInfo) => {
          setStoreInfo(_storeInfo);
          setLastOrders(orders);
          setItems(newItems);
          setLoading(false);
        });
      });
    });
  };
  const drawingZone = () => {
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
    window.google.maps.event.addListener(
      refMarker.current,
      'click',
      (function (marker) {
        return function () {
          infowindow.setContent('Mi tienda');
          infowindow.open(refMap.current, marker);
        };
      }(refMarker.current)),
    );
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (items.length && refMap.current) {
      drawingZone();
    }
  }, [JSON.stringify(storeInfo), JSON.stringify(items)]);

  const handleMapLoaded = async (map) => {
    refMap.current = map;
  };

  return (
    <>
      <Header />

      <Wrapper className={styles.main}>
        {
          loading
            && (
            <div className="w-full flex items-center justify-center absolute left-0 top-0 bottom-0 right-0">
              <Loader
                type="Puff"
                color="#FA0236"
                height={100}
                width={100}
              />
            </div>
            )

        }
        <div className={`w-full h-full bg-gray-100 rounded-lg p-3 -mb-6 ${loading ? 'hidden' : ''}`}>

          <div className="banner-home clearfix w-full flex items-center text-center rounded-lg bg-gray-400 mb-8">
            <div className="w-full">
              <h3 className="font-black">Bienvenido!</h3>
              <h1 className="font-black">Conoce los productos mas vendidos en tu zona</h1>
              <p className="font-medium">Eleva tus ventas con estos productos recomendados...</p>
              <h4><i className="fas fa-store"></i> {storeInfo?.storeName || 'Nombre de tienda desconocido'}</h4>
            </div>
          </div>

          <div className="w-full clearflex">
            <h3 className="font-black text-xl clearfix mb-2">Referencias Recomendadas</h3>
          </div>

          <div className={styles.gridBody}>
            <div className={`w-full h-full bg-gray-300 rounded-lg mt-3 mx-auto relative p-1 mapGrid ${styles.map}`}>
              <Map lng={-74.07209} lat={4.710989} onMapLoaded={handleMapLoaded} />
            </div>
            <ListOfItems items={items} loading={loading} lastOrders={lastOrders} />
          </div>

          <div className="w-full clearflex mt-10 mb-6">
            <h3 className="font-black text-xl mb-3 mt-5 block">Promos Recomendadas</h3>
            <Carousel
              autoPlay={true}
              interval='3000'
              transitionTime='350'
              showThumbs={false}
              infiniteLoop={true}
              showIndicators={true}
              showStatus={false}
              className="carousel_preview w-full"
            >
              <div><img src={require('../../assets/images/promos/1.png')} /></div>
              <div><img src={require('../../assets/images/promos/2.png')} /></div>
            </Carousel>
          </div>

          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

export default Recommendations;
