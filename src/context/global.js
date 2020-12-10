import React, { useEffect, createContext, useState } from "react";
import { references_json } from "../mocks/references.json";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loadingReferences, setLoadingReferences] = useState(true);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    console.log("Global Context");
    fetchReferences();
  }, []);

  const fetchReferences = () => {
    setReferences(references_json);
    setLoadingReferences(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        loadingReferences,
        references,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalConsumer = GlobalContext.Consumer;

export default GlobalContext;
