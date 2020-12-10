import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Loader } from "chiper-components-library";
import Wrapper from "../../components/Wrapper";
import { Row, Col } from "../../components/Grid";
import IMG_Frubana from "../../assets/images/frubana-logo.png";
import GlobalContext from "../../context/global";
import styles from "./index.module.sass";
import { APIResquest } from '../../utils/api';


const DetailsPage = () => {
  const day = 30;
  const getParams = useParams();

   const getReferenceInfo = (storeId, storeReferenceId) => new Promise((resolve, reject) => {
    APIResquest({
      uri: `https://catalogue.chiper.co/store/${storeId}/available-inventory/recommended/info/${storeReferenceId}`,
      method: 'GET',
    }).then((resp) => {
      console.log('endpoint', resp);
      resolve(resp);
    }).catch((e) => {
      console.error(e);
      reject(e);
    });
  });

  const { loadingReferences, references } = useContext(GlobalContext);
  const [painted, setPainted] = useState([])
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [details, setDetails] = useState({});


  useEffect(() => {
    if (!loadingReferences) {
      loadDetails();
    }
  }, [loadingReferences, getParams.productId]);

  const loadDetails = () => {
    if (getParams.productId) {
      const data = references.find(
        (item) => item.referenceId === Number(getParams.productId)
      );

      setDetails(data);
      setLoadingDetails(false);
    }
  };

  console.log(details);

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
                  <img src={details.imageURL} alt="" />
                </figure>
              </Col>

              <Col xl={8} lg={8} md={12} xs={12}>
                <div className={styles.mainRightColumn}>
                  <div className="w-full">
                    <h1 className="w-full text-3xl mb-4 font-light">
                      {details.referenceName}
                    </h1>

                    <div className="w-full inline-flex items-center">
                      <span className={styles.mainPrice}>
                        ${details.price.bestPrice.total}
                      </span>
                      <span
                        className={styles.nice}
                        style={{ backgroundColor: details.tagColor }}
                      >
                        Nivel de precio: 3
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
                        <a href="https://chiper.co/pedir/dashboard"> <i class="fas fa-shopping-cart"></i> </a>
                      </span>

                    </div>
                  </div>

                  <div className="w-full border-box grid grid-cols-3 border border-gray-300 rounded-lg">
                    <div className="w-full h-full border-box p-5">
                      <h2 className="w-full inline-block mb-2 text-lg">
                        Ordenes en el mes:
                      </h2>

                      <span className={styles.mainHistoryDescription}>
                        En tu localidad, se venden 15 aceites por dia</span>
                    </div>

                    <div className="w-full h-full border-box p-5 bg-gray-200">
                      <span className={styles.mainHistoryDescription}>
                        Rank del producto:
                      </span>
                      <span className="w-full inline-block text-black text-xl font-medium mt-3">
                        2
                      </span>
                    </div>

                    <div className="w-full h-full border-box p-5 bg-gray-200 border-l border-gray-300">
                      <span className={styles.mainHistoryDescription}>
                        Cuanto stock minimo deberias tener:
                        {/* {day} days: */}
                      </span>
                      <span className="w-full inline-block text-black text-xl font-medium mt-3">
                        30
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
              <span className="font-light">Compare prices with other</span>{" "}
              <strong>confident stores</strong>
            </h2>
          </header>

          {loadingReferences || loadingDetails ? (
            <div className="w-full inline-flex justify-center mt-4">
              <Loader color="transparent" />
            </div>
          ) : (
            <section className="w-full">
              <ul className={styles.otherPricesList}>
                <ListCard
                  img={details.imageURL}
                  company="Chiper"
                  price={details.price.chiper.total}
                  url="https://chiper.co/"
                />
                <ListCard
                  img={details.imageURL}
                  company="Frubana"
                  price={details.price.frubana.total}
                  url="https://www.frubana.com/"
                />
                <ListCard
                  img={details.imageURL}
                  company="Jumbo"
                  price={details.price.jumbo.total}
                  url="https://www.tiendasjumbo.co/"
                />
              </ul>
            </section>
          )}
        </Wrapper>
      </div>
    </>
  );
};

const ListCard = (props) => {
  return (
    <li className="w-full inline-flex items-center">
      <figure className={styles.otherPricesListProductFigure}>
        <img src={props.img} alt="" className="object-contain w-full h-full" />
      </figure>

      <div className={`${styles.otherPricesListGrid} grid grid-cols-6 gap-0`}>
        {/* <figure className="inline-flex justify-center items-center h-8">
          <img
            src={IMG_Frubana}
            alt=""
            className="object-contain w-full h-full"
          />
        </figure> */}

        <div className="inline-flex justify-center items-center">
          {props.company}
        </div>

        <div className="inline-flex justify-center items-center">
          <span className="inline-flex items-center text-sm tracking-tighter px-3 py-1 leading-snug rounded-md font-black bg-black text-white shadow">
            1+ unit
          </span>
        </div>

        <div className="inline-flex justify-center items-center mx-12">
          <span className="text-xl font-medium">${props.price}</span>
        </div>

        <div className="inline-flex justify-center items-center">Colômbia</div>

        <div>{/*  */}</div>

        <div className="inline-flex justify-end items-center">
          <a href={props.url} target="_blank" className="btn green-theme">
            Visit Store
          </a>
        </div>
      </div>
    </li>
  );
};

export default DetailsPage;
