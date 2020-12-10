import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import Autosuggest from "react-autosuggest";
import IMG_CHIPER_LOGO from "../../assets/images/logo-chiper.svg";
import styles from "./index.module.sass";

const Header = () => {
  const phoneOptions = [
    { name: "Colombia", value: "57" },
    { name: "México", value: "23" },
    { name: "Perú", value: "33" },
  ];

  const [suggestionList] = useState([
    { name: "Lechuga Crespa" },
    { name: "Lechuga Batavia" },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const data =
      inputLength === 0
        ? []
        : suggestionList.filter(
            (item) =>
              item.name.toLowerCase().slice(0, inputLength) === inputValue
          );

    return data;
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const getSuggestionValue = (suggestion) => suggestion.name;

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search a product...",
    value,
    onChange: onChange,
  };

  return (
    <header className={styles.header}>
      <Wrapper className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          <img src={IMG_CHIPER_LOGO} alt="Chiper" />
        </Link>

        <div className={styles.searh_global}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            className={styles.input}
            inputProps={inputProps}
          />
          <i className="simple-icon-magnifier"></i>
        </div>

        <div className="nav-right">
          <div className="kam-input list-active list-icons">
          </div>
          <Link to="/scraping" className="btn btn-primary btn-effect">
            <i className="simple-icon-equalizer"></i> View Scraping
          </Link>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
