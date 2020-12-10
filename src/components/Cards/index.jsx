/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { AiFillFire } from 'react-icons/ai';
import NumberFormat from 'react-number-format';
import DEFAULT_IMAGE from './assets/images/testImage.png';

const Cards = ({
  id,
  name,
  prices = [{
    managerTotal: null,
    startQuantity: 1,
    discountedTotal: null,
  }],
  medium = DEFAULT_IMAGE,
}) => {
  const getLabel = (index) => {
    const { startQuantity } = prices[index];

    if (index === prices.length - 1) {
      return `${startQuantity} Uds`;
    }
    const { startQuantity: startQuantityNextLevel } = prices[index + 1];
    return `${startQuantity}  a ${startQuantityNextLevel - 1} Uds.`;
  };
  const getPrice = () => {
    if (prices[0].discountedTotal) return prices[0].discountedTotal;
    return prices[0].managerTotal;
  };

  return (
    <Link to={`/${id}`} className="text-md w-48 p-4 m-2 box-border bg-white border border-gray-100 rounded-lg  transition-all duration-300 ease-in-out hover:shadow cursor-pointer flex flex-col">
      <div className="">
        <figure className="w-full p-1 flex justify-items-center">
          <img className="w-full" src={medium} alt="Product" />
        </figure>

        <div className={`grid grid-cols-${prices.length} gap-1.5 items-center mt-2`}>
          {prices.map((item, index) => (
            <div key={item} className={`text-center text-xs rounded-full px-1 ${index === 0 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow'}`}>
              {
                getLabel(index)
              }
            </div>
          ))}
        </div>

        <div className="font-black text-md text-black mt-2">
          <span><NumberFormat prefix="$" value={getPrice()} /></span>
        </div>

        <div className="text-md mt-2">
          <p>{name}</p>
        </div>
      </div>

      <div className="flex mt-3 flex-grow items-end">
        <div className="border-t border-gray-200 w-full pt-2">
          <AiFillFire data-tip="This reference is on fire in your location!" className="text-red-500" />
        </div>
      </div>

      <ReactTooltip />
    </Link>
  );
};

export default Cards;
