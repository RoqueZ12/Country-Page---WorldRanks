import React, { useState, useEffect, Children } from "react";
import '../sass/Card.scss'
import { Countries } from "./Countries";
import { userCountries } from "../hooks/userCountries";
import { Boton } from "./Boton";
import searchI from '../assets/Search.svg'

const Card = ({onCountryClick}) => {

  const {apis, fetchData, fetchDataCount, cantidadDatos, search, searchFetch} = userCountries()
  const [searchD, setSearchD] = useState('')
  const [sortBy, setSortBy] = useState('population'); // Estado para el criterio de ordenamiento
  const [region, setRegion] = useState('')
  const [independentOnly, setIndependentOnly] = useState(false);
  const [unMemberOnly, setUnMemberOnly] = useState(false);

  const handleIndependentChange = () => {
    setIndependentOnly(!independentOnly);
  };

  const handleUnMemberChange = () => {
    setUnMemberOnly(!unMemberOnly);
  };
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    searchFetch(searchD)
    console.log("Formulario enviado con valor:", searchD);
  }
  const handleChange = (event) => {
    setSearchD(event.target.value);
  }
  const handleSortChange = (event) => {
    const sortByValue = event.target.value;
    setSortBy(sortByValue);
  }
  const handleRegionFilter = (children) => {   
    setRegion(children);
  };

  return(
    <div id="card-container" className="card-container">
      <div className="card-header">
      <p>Found {cantidadDatos} countries</p>
        <form onSubmit={handleSubmit}>
          <img src={searchI}/>
          <input 
          value={search}
          type="text"
          onChange={handleChange}
          placeholder="Search by Name, Region, Subregion" />
        </form>
      </div>
      <div className="diosmio">
        <div className="section-filter">
          <div className="section-filter-sort">
            <p>Sort by</p>
            <select name="sort" onChange={handleSortChange} value={sortBy}>
              <option value="population">Population</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="area">Area (km²)</option>
            </select>
          </div>
          <div className="section-filter-region">
            <p>Region</p>
            <div className="contenedor">
            <div className="fila">
                <Boton onClick={() => handleRegionFilter("Americas")} >Americas</Boton>
                <Boton onClick={() => handleRegionFilter("Antartic")} >Antarctic</Boton>
              </div>
              <div className="fila">
                <Boton onClick={() => handleRegionFilter("Africa")} >Africa</Boton>
                <Boton onClick={() => handleRegionFilter("Asia")} >Asia</Boton>
                <Boton onClick={() => handleRegionFilter("Europe")} >Europe</Boton>
              </div>
              <div className="fila">
                <Boton onClick={() => handleRegionFilter("Oceania")} >Oceania</Boton>
              </div>
          </div>
          </div>
          <div className="section-filter-status">
           <p>Status</p>
           <div className="status">
            <label className="checkbox-label">
            <input
              type="checkbox"
              checked={independentOnly}
              onChange={handleIndependentChange}
            /> UnMember
            </label>
            <label className="checkbox-label">
            <input
              type="checkbox"
              checked={unMemberOnly}
              onChange={handleUnMemberChange}
            />
              Independent
            </label>
          </div>

        </div>                 
        </div>
        <div className="card-body">
         {  <Countries apis={apis} region={region} sortBy={sortBy} member={unMemberOnly} indep={independentOnly} onCountryClick={onCountryClick}/>}
        </div>
      </div>
    </div>
  )
}
export {Card}