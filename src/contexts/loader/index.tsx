import { useState, createContext } from "react";

export const LoadingContext = createContext({} as any);

const LoadingContextProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
