import { createContext, useContext, useState } from "react";

const BottomTabContexxt = createContext({ opened: false, setOpened: () => {} });

export const BottomTabContextProvider = ({ children }) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  return (
    <BottomTabContexxt.Provider value={{ opened, toggleOpened }}>
      {children}
    </BottomTabContexxt.Provider>
  );
};

export const useTabMenu = () => useContext(BottomTabContexxt);
