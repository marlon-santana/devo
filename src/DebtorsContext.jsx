import { createContext, useContext, useState } from "react";
import { debitors as mockDebitors } from "./dadosMock";

const DebtorsContext = createContext();

export const DebtorsProvider = ({ children }) => {
  const [debitors, setDebitors] = useState(mockDebitors);
 

  return (
    <DebtorsContext.Provider value={{ debitors, setDebitors }}>
      {children}
    </DebtorsContext.Provider>
  );
};

export const useDebtors = () => {
  const context = useContext(DebtorsContext);
  if (!context) {
    throw new Error("useDebtors deve ser usado dentro de um DebtorsProvider");
  }
  return context;
};
