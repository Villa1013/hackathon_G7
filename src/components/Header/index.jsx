import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Wrapper from "../Wrapper";
import IMG_CHIPER_LOGO from "../../assets/images/logo-chiper.svg";
import styles from "./index.module.sass";

const Header = () => {
  const [suggestionList] = useState([
    { name: "Lechuga Crespa" },
    { name: "Lechuga Batavia" },
  ]);

  return (
    <>
    <header className={styles.header}>
      <Wrapper className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img src={IMG_CHIPER_LOGO} alt="Chiper" />
        </Link>

        <div className="nav-right">
          <div className="kam-input list-active list-icons">
          </div>
          <span className={styles.headerSocial}>
            <a href="https://apps.apple.com/co/app/chiper/id1525818781" data-tip="iOS" target="_blank" rel="noopener noreferrer">
              <img className="appstore" src="data:image/png;base64,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" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=co.chiper.empresario" data-tip="Android" target="_blank" rel="noopener noreferrer"
              ><img className="playstore" src="data:image/png;base64,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" />
            </a>
            <h3 className="downloadText">Descarga la app</h3>
          </span>
          {/*<Link to="/" className="btn btn-primary btn-effect">
            <i className="simple-icon-equalizer"></i> Iniciar Sesion
          </Link>*/}
        </div>
      </Wrapper>
    </header>

    <div className={`animationAssesor ${styles.toggleButton}`}><i className="fas fa-comments"></i> Asesoria Online</div>
    </>
  );
};

export default Header;
