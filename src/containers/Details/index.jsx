import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Loader } from "chiper-components-library";
import Wrapper from "../../components/Wrapper";
import { Row, Col } from "../../components/Grid";
import GlobalContext from "../../context/global";
import Analytics from './Analytics/analytics'
import styles from "./index.module.sass";

const DetailsPage = () => {
  const day = 30;
  const getParams = useParams();

  const { loadingReferences, references } = useContext(GlobalContext);

  const [loadingDetails, setLoadingDetails] = useState(true);
  const [details, setDetails] = useState({});

  const loadDetails = () => {
    if (getParams.productId) {
      const data = references.find(
        (item) => item.referenceId === Number(getParams.productId)
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
                        Mejor precio: {details.tagBestPrice}
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
                    </div>
                  </div>

                  <div className="w-full border-box grid grid-cols-3 border border-gray-300 rounded-lg">
                    <div className="w-full h-full border-box p-5">
                      <h2 className="w-full inline-block mb-2 text-lg">
                        Prices history
                      </h2>

                      <span className={styles.mainHistoryDescription}>
                        Check all the prices for this product in the last {day}{" "}
                        days
                      </span>
                    </div>

                    <div className="w-full h-full border-box p-5 bg-gray-200">
                      <span className={styles.mainHistoryDescription}>
                        Highest Price in the last {day} days:
                      </span>
                      <span className="w-full inline-block text-black text-xl font-medium mt-3">
                        $ 9999.99
                      </span>
                    </div>

                    <div className="w-full h-full border-box p-5 bg-gray-200 border-l border-gray-300">
                      <span className={styles.mainHistoryDescription}>
                        Lowest Price in the last {day} days:
                      </span>
                      <span className="w-full inline-block text-black text-xl font-medium mt-3">
                        $ 999.99
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
              <span className="font-light">Analytics Orders:</span>{" "}
              <strong>More Oportunities</strong>
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
