import { useCallback, useEffect, useState } from "react";
import { getDataApi } from "../servicios/countriesapi";

const userCountries = () => {
  const [countries, setCountries] = useState([]);
  const [cantidadDatos, setCantidadDatos] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const data = await getDataApi(''); // Se pasa sortBy para ordenar los datos
      setCountries(data);
    } catch (e) {
      throw new Error('error al cargar los datos');
    }
  }, []);

  const fetchDataCount = useCallback(async () => {
    try {
      const dataCount = await getDataApi(''); // Se pasa sortBy para contar los datos
      setCantidadDatos(dataCount.length);
    } catch (e) {
      throw new Error('error al contar los datos');
    }
  }, []);

  const searchFetch = useCallback(async (search) => {
    try {
      const searchD = await getDataApi(search);
      setCountries(searchD);
    } catch (e) {
      throw new Error('error al buscar los datos');
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchDataCount();
  }, [fetchData, fetchDataCount]);

  return { apis: countries, fetchData, fetchDataCount, cantidadDatos,searchFetch };
}

export { userCountries };
