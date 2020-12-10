import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import IMG_CHIPER_LOGO from "../../assets/images/logo-chiper.svg";
import styles from "./index.module.sass";

const Header = () => {
  const [suggestionList] = useState([
    { name: "Lechuga Crespa" },
    { name: "Lechuga Batavia" },
  ]);

  return (
    <header className={styles.header}>
      <Wrapper className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img src={IMG_CHIPER_LOGO} alt="Chiper" />
        </Link>

        <div className="nav-right">
          <div className="kam-input list-active list-icons">
          </div>
          <Link to="/" className="btn btn-primary btn-effect">
            <i className="simple-icon-equalizer"></i> Iniciar Sesion
          </Link>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
