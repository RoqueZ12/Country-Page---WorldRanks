import React from "react";
import '../sass/DetailCountries.scss';
import { userCountries } from "../hooks/userCountries";

const DetailCountries = ({ isOpen, onClose, country }) => {
  if (!country) return null;

  const {apis} = userCountries();
  const countriesToShow = apis;

  return (
    <div className="detail-container">
      <div key={country.name.common} className="detail-card">
        <div className="detail-card-top">
          <div className="card-top">
            <img src={country.flags.png} alt={`${country.name.common} Flag`} />
            <h1>{country.name.common}</h1>
            <h2>{country.name.official}</h2>
          </div>
        </div>
        <div className="card-bottom-info">
          <div className="card-izq">
            <p>Population | {country.population}</p>
          </div>
          <div className="card-der">
            <p>Area (km²) | {country.area}</p>
          </div>
        </div>
        <div className="detail-card-mid">
          <div className="mid">
            <div className="mid-izq">
              <p>Capital</p>
              <p>Subregion</p>
              <p>Language</p>
              <p>Currencies</p>
              <p>Continents</p>
            </div>
            <div className="mid-der">
              <span>{country.capital}</span>
              <span>{country.subregion}</span>
              <span>
                {country.languages && Object.values(country.languages).map(lang => lang).join(', ')}
              </span>
              <span>
                {country.currencies && Object.values(country.currencies).map(currency => currency.name).join(', ')}
              </span>
              <span>{country.continents}</span>
            </div>
          </div>
        </div>
        <div className="detail-card-bottom">
          <p>Vecinos</p>
          <div className="grid-container">
            {country.borders && country.borders.length > 0 ? (
              country.borders.map((borderCode) => {
                const borderCountry = countriesToShow.find((country) => country.cca3 === borderCode);
                if (borderCountry) {
                  return (
                    <div className="country" key={borderCode}>
                      <img src={borderCountry.flags.png} alt={`${borderCountry.name.common} flag`} />
                      <div>{borderCountry.name.common}</div>
                    </div>
                  );
                } else {
                  return null; // Maneja el caso cuando no se encuentra el país vecino
                }
              })
            ) : (
              <p>No hay vecinos disponibles</p>
            )}
          </div>
        </div>
      </div>
      <span className="close" onClick={onClose}>&times;</span>
    </div>
  );
};

export { DetailCountries };
