
const { Recipe, Diet } = require('../db')
const { API_KEY08 } = process.env
const API_KEY = API_KEY08;

const axios = require('axios')
const nRecetas = 100;

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
    const infoDB = await getDB();
    const infoTotal = infoAPI.concat(infoDB);

    return infoTotal
    return infoDB
}



module.exports = {
    getAllRecipes
}

// node index.js