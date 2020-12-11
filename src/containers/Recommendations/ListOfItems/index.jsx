import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Card from '../../../components/Cards';

const ListOfItems = ({
  loading, items, match, lastOrders,
}) => (
  <>
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
              <div className="flex flex-wrap m-0 mx-auto justify-center">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    storeId={match?.params?.storeId}
                    {...item}
                    lastOrders={lastOrders}
                  />
                ))}
              </div>
            )
        }
  </>
);

export default withRouter(ListOfItems);
