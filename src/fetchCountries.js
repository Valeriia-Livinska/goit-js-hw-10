import { Notify } from 'notiflix';

function fetchCountries(countryName) {
  const filteredResponce = 'fields=name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${countryName}?${filteredResponce}`;
  
  return fetch(url)
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    });
}

export { fetchCountries };
  
 
