const { Router } = require('express');
const { Recipe, Diet } = require('../../db');
const router = Router();


const { getAllRecipes  } = require('../../controllers')

// Gives everything in the DB

router.get('/', async (req,res) =>{
    const {name} = req.query;

    const recetas = await getAllRecipes();
    try{
        if(name){
            const recetasFiltradas = recetas.filter(receta => receta.name.toLowerCase().includes(name.toLowerCase()))
            
            recetasFiltradas.length>0?res.status(200).send(recetasFiltradas):res.status(404).send(`Recipes with the word ${name} were not found. Would you like to try another?`)
        }
        else{
            res.send(recetas)
        }
    }
    catch(error){
        res.status(404).send(error)
    }
})

// Uncomplete task

router.get('/:idReceta', async (req,res) =>{
    const {idReceta} = req.params;

    const recetas = await getAllRecipes();
    try{
        if(idReceta){
            const recetasFiltradas = await recetas.filter(receta => receta.id == idReceta)
            
            recetasFiltradas.length?
            res.status(200).send(recetasFiltradas):
            res.status(404).send('Recipe was not found')
        }
    }
    catch(error){
        res.status(404).send(error)
    }
})

// Saves the recipes in the DB
router.post('/', async (req,res) =>{
    const { name,description,healthScore,howToDo,image,diet } = req.body;

    try{
        if(name && description){
            const receta = await Recipe.create({ name,description,healthScore,howToDo,image })
            
            const dieta = await Diet.findAll({
                where:{
                    name: diet
                }
            })
            
            await receta.addDiet(dieta)
            // console.log(dieta)
            return res.status(200).send("Recipe created successfully")
        }
        else{
            return res.status(400).send("Data received is not enough")
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send("Hola soy el error del POST")
        
    }
})


module.exports = router;