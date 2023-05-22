const axios = require("axios");
const { Country, Continents } = require("../db");

const getAllCountry = async () => {
  try {
    //const countryApi = await axios.get("https://restcountries.com/v3/all");
    // const countryApi = await axios.get(
    //   " https://rest-countries.up.railway.app/v2/all "
    // );
    const countryApi = await axios.get(
      "https://rest-countries.up.railway.app/v3/all"
    );

    const coutryApiData = countryApi.data.map((c) => {
      return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[1],
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : "Esta capital no está registrada.",
        subregion: c.subregion
          ? c.subregion
          : "Esta subregión no está registrada.",
        area: c.area,
        population: c.population,
      };
    });
    return coutryApiData;
  } catch (error) {
    return { error: error.message };
  }
};

const getAllDb = async () => {
  try {
    return await Country.findAll({
      include: Continents,
    });
  } catch (error) {
    return error.message;
  }
};

const getAllCoutryes = async () => {
  try {
    const dataApi = await getAllCountry();
    const dataDb = await getAllDb();
    const allApi = dataDb.concat(dataApi);

    return allApi;
  } catch (error) {
    return error.message;
  }
};

module.exports = getAllCoutryes;
