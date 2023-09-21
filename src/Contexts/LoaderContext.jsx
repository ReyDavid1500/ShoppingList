import { createContext, useState } from "react";
import Loader from "../components/Loader";

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <Loader isLoading={isLoading} />
    </LoaderContext.Provider>
  );
};

export { LoaderContext, LoaderProvider };
