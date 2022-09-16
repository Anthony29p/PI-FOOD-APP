
const { Recipe, Diet } = require('../db')
const { API_KEY03 } = process.env
const API_KEY = API_KEY03;

const axios = require('axios')
const nRecetas = 100;

const saveInfo = async (req,res) => {

    try{
        let i=0
        const recipes = await Recipe.findAll()
        if(recipes.length===0){
        const infoAPI = await axios(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=${nRecetas}&apiKey=${API_KEY}`)
        const info = infoAPI.data?.results.map(async e => {
    
            const receta = await Recipe.create(
            {
                name : e.title,
                description : e.summary.replace(/[^a-zA-Z ^:^/]/g, ""),
                healthScore : e.healthScore,
                image : e.image,
                howToDo : e.analyzedInstructions[0] && e.analyzedInstructions[0].steps? e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
                createdDB: false,
            })

            const dieta = await Diet.findAll({
                where:{
                    name: e.diets
                }
            })
            await receta.addDiet(dieta)
            console.log(i++)
        })
            res.status(200).send("Data uploaded")
        }
        else{
            res.status(200).send("Existing data")
        }
        
    }
    catch(error){
        console.log(error)
    }
}


const getRecipes = async (req,res) =>{
    const {name} = req.query;

    const recetas = await Recipe.findAll({
        attributes: { 
            exclude: ['updatedAt'] 
        },
        include: [{
        model: Diet,
        through: {
            attributes: ['dietId'],
        },
        }],
    });

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
}


const getRecipesByID = async (req,res) =>{
    const {idReceta} = req.params || {}

    const recetas = await Recipe.findAll({
        attributes: { 
            exclude: ['updatedAt'] 
        },
        include: [{
        model: Diet,
        through: {
            attributes: ['dietId'],
        },
        }],
    });

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
}

const postRecipe = async (req,res) =>{
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
} 

const getAPI = async () => {

    try{
        const infoAPI = await axios(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=${nRecetas}&apiKey=${API_KEY}`)
        const info = infoAPI.data?.results.map(e => {
            return {
                id : e.id,
                name : e.title,
                description : e.summary.replace(/[^a-zA-Z ^:^/]/g, ""),
                healthScore : e.healthScore,
                image : e.image,
                howToDo : e.analyzedInstructions[0] && e.analyzedInstructions[0].steps? e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
                diets : e.diets
            }
        })
        return info
    }
    catch(error){
        console.log(error)
    }
}


const getDB = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attibutes: ['name'],
            through:{
                attibutes : []
            }
        }   
    })
}

const getAllRecipes = async () =>{
    const infoAPI = await getAPI();
    // const infoDB = await getDB();
    // const infoTotal = infoAPI.concat(infoDB);

    // return infoTotal
    return infoAPI
}

module.exports = {
    getAllRecipes,
    saveInfo,
    getRecipes,
    getRecipesByID,
    postRecipe,
}

// node index.js