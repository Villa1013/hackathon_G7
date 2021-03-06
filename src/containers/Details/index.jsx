import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'chiper-components-library';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from '../../components/Grid';
import GlobalContext from '../../context/global';
import Analytics from './Analytics/analytics';
import styles from './index.module.sass';
import { APIResquest } from '../../utils/api';
import { getReferenceInfo } from '../../utils/requests/getReferenceInfo';
import { getHotItems } from '../../utils/requests/getHotItems';
import { getInfoStore } from '../../utils/requests/getInfoStore';
import { getLastOrders } from '../../utils/requests/getLastOrders';

const DetailsPage = () => {
  const day = 30;
  const getParams = useParams();



  const getReferenceInfo = (storeId, storeReferenceId) => new Promise((resolve, reject) => {
    APIResquest({
      uri: `https://catalogue.chiper.co/store/${storeId}/available-inventory/recommended/info/${storeReferenceId}`,
      method: 'GET',
    }).then((resp) => {
      console.log('endpoint', resp);
      setProduct(resp);
      console.log('product', resp);
      resolve(resp);
    }).catch((e) => {
      console.error(e);
      reject(e);
    });
  });



  const init = async () => {
    const storeId = getParams.storeId;
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
        });
      });
    });
  };


  useEffect(() => {
    getHotItems(getParams.storeId).then(x => {
      getReferenceInfo(getParams.storeId, getParams.productId).then(item => {
        const dataRating = x.find((h) => h.storeReferenceId === item.id)
        setProduct({...item, ...dataRating});
      })
    })
  }, []);

  const { loadingReferences, references } = useContext(GlobalContext);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [details, setDetails] = useState({});
  const [product, setProduct] = useState({ prices: [] });
  const [lastOrders, setLastOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [lastItem, setLastItem] = useState({})


  console.log('items', items);
  console.log("producto solo",product)

  const loadDetails = () => {
    if (getParams.productId) {
      const data = references.find(
        (item) => item.referenceId === Number(getParams.productId),
      );

      setDetails(data);
      setLoadingDetails(false);
    }
  };

  React.useEffect(() => {
    if (!loadingReferences) {
      loadDetails();
    }
  }, [loadingReferences, getParams.productId]);

  console.log(product)

  const getAditionalInfo = () => {
    console.log("product id",product.id)
    const item = items.find((h) => h.id === product.id)
    setLastItem(item)
    console.log("item solo", item)

  }

  return (
    <>
      <Header />

      <Wrapper>
        <div className="py-10 w-full h-full border-box">
          {loadingReferences || loadingDetails ? (
            <div className="w-full inline-flex justify-center mt-4">
              <Loader color="transparent" />
            </div>
          ) : (
            <Row gutterWidth={70}>
              <Col xl={4} lg={4} md={12} xs={12}>
                <figure className={styles.mainFigure}>
                  <img src={product.large} alt="" />
                </figure>
              </Col>

              <Col xl={8} lg={8} md={12} xs={12}>
                <div className={styles.mainRightColumn}>
                  <div className="w-full">
                    <h1 className="w-full text-3xl mb-4 font-light">
                      {product.name}
                    </h1>

                    <div className="w-full inline-flex items-center">
                      <span className={styles.mainPrice}>

                        {product.prices.length
                        && (
                        <span key={product.prices[0].value} value={product.prices[0].value}>
                          $
                          {product.prices[0].managerPrice}
                        </span>
                        )}
                      </span>
                      <span
                        className={styles.nice}
                        // style={{ backgroundColor: details.tagColor }}
                      >
                        Nivel de precio:
                        {' '}
                        {product.priceLevel}
                        {/* {details.tagBestPrice} */}
                      </span>
                    </div>

                    <div className="w-full inline-flex items-center mt-4">

                      <span className="inline-flex items-center text-sm tracking-tighter px-3 py-1 leading-snug rounded-md font-black bg-black text-white shadow">
                        1 unit
                      </span>

                      <span className="ml-3 inline-flex items-center text-sm tracking-tighter px-3 py-1 leading-snug rounded-md font-black bg-white text-black shadow">
                        5 a 10 units
                      </span>

                      <span className="ml-3 inline-flex items-center text-sm tracking-tighter px-3 py-1 leading-snug rounded-md font-black bg-white text-black shadow">
                        10+ units
                      </span>
                      <span className="ml-3 inline-flex items-center text-lg tracking-tighter px-3 py-1 leading-snug rounded-md font-black bg-white text-black shadow">
                        <a href="https://chiper.co/pedir/dashboard">
                          {' '}
                          <i className="fas fa-shopping-cart" />
                          {' '}
                        </a>
                      </span>

                    </div>
                  </div>

                  <div className="w-full border-box grid grid-cols-3 border border-gray-300 rounded-lg">
                    <div className="w-full h-full border-box p-5">
                      <h2 className="w-full inline-block mb-2 text-lg">
                        Ordenes en el mes:
                      </h2>

                      <span className={styles.mainHistoryDescription}>
                        En tu localidad, se venden 15 {product.name} por dia
                      </span>
                    </div>

                    <div className="w-full h-full border-box p-5 bg-gray-200">
                      <span className={styles.mainHistoryDescription}>
                        Rating del producto
                      </span>
                      <span className="w-full inline-block text-black text-xl font-medium mt-3">
                        {parseFloat(100 * product.rating).toFixed(2)} %
                      </span>
                    </div>

                    <div className="w-full h-full border-box p-5 bg-gray-200 border-l border-gray-300">
                      <span className={styles.mainHistoryDescription}>
                        Macro:
                        {/* {day} days: */}
                      </span>
                      <span className="w-full inline-block text-black text-xl font-medium mt-3">
                        {product.macroName}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Wrapper>

      <div className={styles.otherPrices}>
        <Wrapper className={styles.otherPricesWrapper}>
          <header className={styles.otherPricesHeader}>
            <h2 className="w-full leading-snug text-xl">
              <span className="font-light">Porcentaje de:</span>
              {' '}
              <strong>Compra en tu zona</strong>
            </h2>
          </header>

          {loadingReferences || loadingDetails ? (
            <div className="w-full inline-flex justify-center mt-4">
              <Loader color="transparent" />
            </div>
          ) : (
            <section className="w-full">
              <Analytics />
            </section>
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default DetailsPage;
