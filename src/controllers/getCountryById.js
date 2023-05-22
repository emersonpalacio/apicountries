const getAllCoutryes = require("../controllers/getAllCountrys");

const getCountryById = async (id) => {
  const allCountry = await getAllCoutryes();
  let miCountry = await allCountry.find(
    (c) => c.id === id || c.id === Number(id)
  );
  if (!miCountry) return Error(`Id ${id} dog not found`);
  return miCountry;
};
module.exports = getCountryById;
