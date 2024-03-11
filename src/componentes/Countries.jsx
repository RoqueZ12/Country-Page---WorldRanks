import React from "react";
import '../sass/Countries.scss'

const ListCountries = ({ apis, onCountryClick}) => {
  return (
    <div className="card-table">
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Population</th>
            <th>Area (km²)</th>
            <th>Region</th>
          </tr> 
        </thead>
        <tbody>
          {apis.map((api, index) => (
            <tr key={`${api.name.common}-${index}`} onClick={() => onCountryClick(api)}>
              <td>
                <img className="img-country" src={api.flags.png} />
              </td>
              <td>{api.name.common}</td>
              <td>{api.population}</td>
              <td>{api.area}</td>
              <td>{api.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const NoList = () =>{
  return(
    <p>no hay datos</p>
  )
}
const Countries = ({apis, region, sortBy, member, indep,onCountryClick}) =>{
  // Filtrar países por región si se proporciona una región
  let filteredCountries = region ? apis.filter(country => country.region === region) : apis;
  
   // Filtrar por independientes o miembros de la ONU según el estado de los checkboxes
   if (indep) {
    filteredCountries = filteredCountries.filter(country => country.independent);
  }
  
  if (member) {
    filteredCountries = filteredCountries.filter(country => country.unMember);
  }
  
  // Aplicar ordenamiento según sortBy
  if (sortBy === 'alphabetical') {
    filteredCountries.sort((a, b) => {
      return a.name.common.localeCompare(b.name.common);
    });
  } else if (sortBy === 'population') {
    filteredCountries.sort((a, b) => {
      return b.population - a.population;
    });
  } else if (sortBy === 'area') {
    filteredCountries.sort((a, b) => {
      return b.area - a.area;
    });
  }
  
  return (
    <ListCountries apis={filteredCountries} onCountryClick={onCountryClick} />
  );
  
}

export {Countries}
