import { createContext, useContext, useState } from "react";

const BottomTabContext = createContext({ opened: false, setOpened: () => {} });

export const BottomTabContextProvider = ({ children }) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <BottomTabContext.Provider value={{ opened, toggleOpened }}>
      {children}
    </BottomTabContext.Provider>
  );
};

export const useTabMenu = () => useContext(BottomTabContext);
