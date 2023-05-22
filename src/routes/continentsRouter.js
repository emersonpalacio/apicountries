const { Router } = require("express");
const axios = require("axios");
const router = Router();

const { Continent } = require("../db");

router.get("/", async (req, res) => {
  try {
    //const apiInfo = (await axios.get("https://restcountries.com/v3/all")).data;
    const apiInfo = (
      await axios.get("https://rest-countries.up.railway.app/v3/all")
    ).data;
    //console.log(apiInfo);
    const continets = apiInfo
      .map((el) => el.continents)
      .join()
      .split(",")
      .sort();
    await continets
      .filter((con, ind) => continets.indexOf(con) === ind) //hago un filter para eliminar los duplicados con indexOf
      .forEach((con) => {
        if (con.trim() !== "") {
          //si el con no es una cadena vacia
          Continent.findOrCreate({
            where: {
              name: con.trim(),
            },
          });
        }
      });
    const dbContinents = await Continent.findAll({
      order: ["name"],
    });
    res.status(200).json(dbContinents);
  } catch (error) {
    error.message;
  }
});

module.exports = router;
