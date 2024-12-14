import { ReactNode, useState } from "react";
import { initServices, ServicesType } from "../../services";
import { ServicesContext } from "./ServicesContext";

type ServicesProviderProps = {
  children: ReactNode;
};

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [services] = useState<ServicesType>(() => initServices());

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};
