const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipe = require('./middlewares/recipe.js');
const diet = require('./middlewares/diet.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes',recipe)
router.use('/diets',diet)

module.exports = router;
