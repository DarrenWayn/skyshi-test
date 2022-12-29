import React, { useState, createContext } from 'react';

export const LoadingContext = createContext({} as any);

const LoadingContextProvider = (props: any) => {
  const [isLoadingOn, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoadingOn, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
