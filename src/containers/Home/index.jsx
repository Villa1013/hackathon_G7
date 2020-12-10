import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "chiper-components-library";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Cards from "../../components/Cards";
import { Row, Col } from "../../components/Grid";
import GlobalContext from "../../context/global";
import styles from "./index.module.sass";

const Home = () => {
  const { loadingReferences, references } = useContext(GlobalContext);

  const [products, setProducts] = useState(references);

  const [countries, setCountries] = useState([
    { label: "Colombia", value: 6, checked: true },
  ]);

  const [cities, setCities] = useState([
    { countryId: 6, label: "Bogotá", value: 1, checked: true },
    { countryId: 6, label: "Cali", value: 2, checked: false },
    { countryId: 6, label: "Barranquilla", value: 3, checked: false },
    { countryId: 6, label: "Medellin", value: 7, checked: false },
  ]);

  const [prices, setPrices] = useState([
    { label: "Best Price: Chiper", value: "Chiper", checked: false },
    { label: "Best Price: Jumbo", value: "Jumbo", checked: false },
    { label: "Best Price: Frubana", value: "Frubana", checked: false },
  ]);

  const getCountrySelected = countries.find((item) => item.checked);
  const getCitySelected = cities.find((item) => item.checked);
  const getPriceSelected = prices.find((item) => item.checked) || {};

  useEffect(() => {
    if (!loadingReferences) {
      loadProducts();
    }
  }, [loadingReferences, getCitySelected, prices]);

  // const updateCityByCountryId = (countryId) => {
  //   const getFirstCityByCountryId = cities.find(
  //     (item) => item.countryId === countryId
  //   );

  //   if (getFirstCityByCountryId) {
  //     const data = cities.map((item) => {
  //       if (item.value === getFirstCityByCountryId.value) {
  //         return {
  //           ...item,
  //           checked: true,
  //         };
  //       }

  //       return {
  //         ...item,
  //         checked: false,
  //       };
  //     });

  //     setCities(data);
  //   }
  // };

  const onHandleChangeCountry = (_value) => {
    const data = countries.map((item) => {
      if (item.value === Number(_value)) {
        return {
          ...item,
          checked: true,
        };
      }

      return {
        ...item,
        checked: false,
      };
    });

    setCountries(data);

    // updateCityByCountryId(_value);
  };

  const onHandleChangeCity = (_value) => {
    const data = cities.map((item) => {
      if (item.value === Number(_value)) {
        return {
          ...item,
          checked: true,
        };
      }

      return {
        ...item,
        checked: false,
      };
    });

    setCities(data);
  };

  const onHandleChangePrice = (_value) => {
    const data = prices.map((item) => {
      if (item.value === _value) {
        return {
          ...item,
          checked: true,
        };
      }

      return {
        ...item,
        checked: false,
      };
    });

    setPrices(data);
  };

  const loadProducts = () => {
    const filterProducts = references.filter(
      (item) =>
        item.countryId === getCountrySelected.value &&
        item.cityId === getCitySelected.value &&
        (getPriceSelected.value
          ? item.tagBestPrice === getPriceSelected.value
          : true)
    );

    setProducts(filterProducts);
  };

  return (
    <>
      <Header />

      <Wrapper className={styles.main}>
        <>
          <h1 className="card-title mb-5 grid grid-cols-3 border-b border-gray-300">
            Reference
          </h1>

          <div className="w-full border-box grid grid-cols-5 border-b border-gray-300 mb-6">
            <div className="w-full h-full border-box p-3 pl-0">
              <div className="relative">
                <select
                  value={getCountrySelected.value}
                  onChange={(e) => onHandleChangeCountry(e.target.value)}
                  className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-3 focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                >
                  {countries.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full h-full border-box p-3 pl-0">
              <div className="relative">
                <select
                  value={getCitySelected.value}
                  onChange={(e) => onHandleChangeCity(e.target.value)}
                  className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-3 focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                >
                  {cities
                    .filter(
                      (city) => city.countryId === getCountrySelected.value
                    )
                    .map((item) => {
                      return (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* <div className="w-full h-full border-box p-3">
            <div className="relative">
              <select className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-3 focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                <option value="">All stores</option>
                <option value="1">Chiper</option>
                <option value="2">Frubana</option>
                <option value="3">Jumbo</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div> */}

            {/* <div className="w-full h-full border-box p-3">
              <div className="relative">
                <select className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-3 focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                  <option value="">Category</option>
                  <option value="1">Licores y cigarrillos</option>
                  <option value="2">Licores y cigarrillos</option>
                  <option value="3">Licores y cigarrillos</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div> */}
            <div className="w-full h-full border-box p-3">
              <div className="relative">
                <select
                  value={getPriceSelected.value || ""}
                  onChange={(e) => onHandleChangePrice(e.target.value)}
                  className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-3 focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
                >
                  <option value="">All by Best Price</option>
                  {prices.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {loadingReferences ? (
            <div className="w-full inline-flex justify-center mt-4">
              <Loader color="transparent" />
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                <Row className="w-full">
                  {products.map((item, index) => (
                    <Col key={index} xl={2} lg={4} md={12} xs={12}>
                      <Link to={`/${item.referenceId}`}>
                        <Cards item={item} />
                      </Link>
                    </Col>
                  ))}
                </Row>
              ) : (
                "No results found"
              )}
            </>
          )}
        </>
      </Wrapper>
    </>
  );
};

export default Home;
