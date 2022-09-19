import { Notify } from 'notiflix';

function fetchCountries(countryName) {
  const filteredResponce = 'fields=name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${countryName}?${filteredResponce}`;
  if (!countryName) {
    return;
  }
  return fetch(url)
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

export { fetchCountries };
