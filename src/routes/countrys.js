const { Router } = require("express");
const getAllCoutryes = require("../controllers/getAllCountrys");
const getCountryByName = require("../controllers/getCountryByName");
const getCountryById = require("../controllers/getCountryById");
const { Country, Continent } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    let data;
    if (name) {
      data = await getCountryByName(name);
    } else {
      data = await getAllCoutryes();
    }
    //console.log(data);
    if (data.error) throw new Error("No se encontraron datos");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let coubtryFound = await getCountryById(id);
    res.status(200).json(coubtryFound);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  //console.log("estas de primera");
  let { name, flag, continent, capital, subregion, area, population } =
    req.body;
  if (!name || !capital || !subregion || !area || !population) {
    throw new Error("Mandatory data is missing");
  }
  // if (!Array.isArray(continent)) {
  //   throw new Error("Continents no es un array");
  // }
  let findName = await Country.findOne({ where: { name: name } });

  if (findName) {
    return res.status(400).json({ message: "El nombre ya ha sido registrado" });
  }
  //console.log(name, flag, continent, capital, subregion, area, population);
  try {
    //console.log("estas de primera");
    let newCoutry = await Country.create({
      name,
      flag,
      continent,
      capital,
      subregion,
      area,
      population,
    });

    //console.log("estas de segudas");

    const ContinentsDb = await Continent.findAll({
      where: { name: continent },
    });

    newCoutry.addContinent(ContinentsDb);

    res.status(200).send(`Countrys ${name} created successfully!`);
  } catch (error) {
    //console.log("estas en el error");
    return { error: error.message };
  }
});

module.exports = router;
