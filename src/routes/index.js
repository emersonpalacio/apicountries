const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const countryRouter = require("./countrys");
const continentsRouter = require("./continentsRouter");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/country", countryRouter);
router.use("/continent", continentsRouter);

module.exports = router;
