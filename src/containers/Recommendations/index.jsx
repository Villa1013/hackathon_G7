/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Header from '../../components/Header';
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Cards';
import { getReferenceInfo } from '../../utils/requests/getReferenceInfo';
import { getHotItems } from '../../utils/requests/getHotItems';
import styles from './index.module.sass';

const Recommendations = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setItems(values);
      setLoading(false);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Header />
      <Wrapper className={styles.main}>
        {
          loading
            ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader
                  type="Puff"
                  color="#FA0236"
                  height={100}
                  width={100}

                />
              </div>
            )

            : (
              <div className="flex flex-wrap m-0 mx-auto">
                {items.map((item) => <Card key={item.id} storeId={props?.match?.params?.storeId} {...item} />)}
              </div>
            )
        }

      </Wrapper>
    </>
  );
};

export default Recommendations;
