import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const oneCountry = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');
const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    clearMarkup();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      clearMarkup();

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length > 2 && data.length <= 10) {
        countriesListMarkup(data);
      }
      if (data.length === 1) {
        oneCountryMarkup(data);
      }
    })
    .catch(error => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
    });
}

function countriesListMarkup(countries = []) {
  const coutriesListMarkup = countries
    .map(
      ({ flags: { svg }, name: { official } }) =>
        `<li class="list-item"><img class="flag-img"  src="${svg}" width="50" height="50">${official}</li>`
    )
    .join('');

  countriesList.innerHTML = coutriesListMarkup;
}

function oneCountryMarkup(countries = []) {
  const oneCountryMarkup = countries
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) =>
        `<p class="country-name"><img class="flag-img" src="${svg}" width="50" height="50">${official}</p>
        <p> Catital: ${capital} </p>
        <p> Population: ${population} </p>
        <p> Languages: ${Object.values(languages)} </p>`
    )
    .join('');

  oneCountry.innerHTML = oneCountryMarkup;
}

function clearMarkup() {
  oneCountry.innerHTML = '';
  countriesList.innerHTML = '';
}
