import { createContext, useContext } from "react";
import type { FC } from "react";

// TODO 不知道该不该用context传递参数，这里先定义
const menuContext = createContext<undefined>(undefined);

export const MenuProvider: FC = ({ children }) => {
  return (
    <menuContext.Provider value={undefined}>{children}</menuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(menuContext);
  if (!context) {
    return console.error("context 不存在");
  }
  return context;
};
