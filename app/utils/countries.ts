import { Country, State } from "country-state-city";

export async function getCountries() {
  return Country.getAllCountries().map((country) => ({
    code: country.isoCode,
    name: country.name,
  }));
}

export async function getStates(countryCode: string) {
  return State.getStatesOfCountry(countryCode).map((state) => ({
    code: state.isoCode,
    name: state.name,
  }));
}

export async function getCountryByCode(countryCode: string) {
  return Country.getCountryByCode(countryCode);
}

export async function getStateByCode(stateCode: string, countryCode: string) {
  return State.getStateByCodeAndCountry(stateCode, countryCode);
}
