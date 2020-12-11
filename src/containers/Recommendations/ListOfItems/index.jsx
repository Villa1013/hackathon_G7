import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Card from '../../../components/Cards';

const ListOfItems = ({
  items, match, lastOrders,
}) => (
  <>
    <>
      {items.map((item) => (
        <Card
          key={item.id}
          storeId={match?.params?.storeId}
          {...item}
          lastOrders={lastOrders}
        />
      ))}
    </>
  </>
);

export default withRouter(ListOfItems);
