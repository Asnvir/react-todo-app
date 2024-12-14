import { createContext } from "react";
import { ServicesType } from "../../services";

type ServicesContextType = ServicesType | null;

export const ServicesContext = createContext<ServicesContextType>(null);
