import { ita_countries } from "./countries";

const EXTENDED_CODE = "extended_code";
const NORMAL_CODE = "code";

function getCountryName(country_name, lang = "it") {
  return ita_countries.find(country => {
    return country.name == country_name;
  });
}

function getCountryCode(country_name, version = NORMAL_CODE, lang = "it") {
  let country = ita_countries.find(country => {
    return country.name == country_name;
  });

  return country ? country[version] : null;
}

export { EXTENDED_CODE, ita_countries, getCountryName, getCountryCode };
