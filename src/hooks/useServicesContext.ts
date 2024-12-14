import { useContext } from "react";
import { ServicesContext } from "../contexts/services/ServicesContext";

export const useServicesContext = () => {
  const services = useContext(ServicesContext);

  if (!services) {
    throw new Error("Missing ServicesContext.");
  }

  return services;
};
