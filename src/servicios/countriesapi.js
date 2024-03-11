const getDataApi = async (search) => {
  const resp = await fetch('https://restcountries.com/v3.1/all');
  const data = await resp.json();

  if(!search){
    return data
  }
  
  const searchData = await Promise.all(
    data.map((api)=>{
      const searchName = api.name.common.toLowerCase().includes(search.toLowerCase())
      const searchRegion = api.region.toLowerCase().includes(search.toLowerCase());
      if(searchName || searchRegion){
        return{
          flags: api.flags,
          name : api.name,
          population: api.population,
          area:api.area,
          region: api.region,
          capital: api.capital,
          subregion:api.subregion,
          languages:api.languages,
          currencies:api.currencies,
          continents: api.continents,
          borders:api.borders
        }
          
      }
      return null
    })
  )
  const filterData=searchData.filter(item=>item !==null)
  return filterData
} 

export { getDataApi };
