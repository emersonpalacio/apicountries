const getAllCoutryes = require("../controllers/getAllCountrys");
const specialCharactresTypeRegex = /[0-9@:%._+~#=]/gi;

const getCountryByName = async (name) => {
  if (specialCharactresTypeRegex.test(name)) {
    throw new Error("Debes ingresar un nombre valido");
  }

  const allCountry = await getAllCoutryes();
  const countryFilter = allCountry.filter(
    (co) => name.toLowerCase() === co.name.toLowerCase()
  );
  if (!countryFilter.length) throw new Error(` No existe nombre ${name}`);
  return countryFilter;
};

module.exports = getCountryByName;
