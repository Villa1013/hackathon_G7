import React from "react";
import chiperIco from "../../assets/images/chiper-ico.png";
import frubanaIco from "../../assets/images/frubana-ico.jpeg";
import jumboIco from "../../assets/images/jumbo-ico.png";
import styles from "./index.module.sass";

const Cards = ({ item }) => {
  // const formatterCO = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  //   minimumFractionDigits: 0,
  // });

  console.log(item);

  return (
    <div className={styles.card}>
      {/* <span className="w-full">
        <span className="inline-flex items-center text-sm tracking-tighter px-3 py-1 leading-snug rounded-md font-black bg-white text-black shadow w-90">
          5 - 10 units
        </span>
      </span> */}

      <figure className={styles.figure}>
        <div className={styles.effect}>
          <div className="front">
            <img src={item.imageURL} alt={item.name} />
          </div>
          <div className="back">
            {item.price.chiper.total && (
              <div className={styles.listPrice}>
                <img src={chiperIco} />
                <p>${item.price.chiper.total}</p>
              </div>
            )}

            {item.price.frubana.total && (
              <div className={styles.listPrice}>
                <img src={frubanaIco} />
                <p>${item.price.frubana.total}</p>
              </div>
            )}

            {item.price.jumbo.total && (
              <div className={styles.listPrice}>
                <img src={jumboIco} />
                <p>${item.price.jumbo.total}</p>
              </div>
            )}
          </div>
        </div>
      </figure>

      <div className={styles.cardContent}>
        <div className={styles.prices}>
          <span className={styles.currentPrice}>
            ${item.price.bestPrice.total}
          </span>
          {/**<span className={styles.oldPrice}>$0.00</span>*/}
        </div>

        <span
          className={styles.nice}
          style={{ backgroundColor: item.tagColor }}
        >
          Mejor precio: {item.tagBestPrice}
        </span>

        {/* {item.channelId === 1 ?(
        <span className={styles.nice}>Mejor precio: {item.tagBestPrice}</span>
        ):(
        <span className={styles.discount}>Mejor precio: Frubana</span>
        )} */}

        <span className={styles.description}>{item.referenceName}</span>
      </div>
    </div>
  );
};

export default Cards;
