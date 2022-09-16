const { Router } = require('express');
const { Recipe, Diet } = require('../../db');
const router = Router();


const { saveInfo, getRecipes, getRecipesByID, postRecipe } = require('../../controllers')

// Insert data in the DB -- use once
router.post('/test', saveInfo)

// Gives everything in the DB

router.get('/',getRecipes )

// Uncomplete task

router.get('/:idReceta', getRecipesByID)

// Saves the recipes in the DB
router.post('/',postRecipe)


module.exports = router;