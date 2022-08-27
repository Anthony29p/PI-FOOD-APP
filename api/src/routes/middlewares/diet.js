const { Router } = require('express');
const { Op, Diet } = require('../../db');
const router = Router();


router.get('/', (req,res) =>{
    const tipoDietas = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "whole 30",
    "fodmap friendly", "vegetarian", "pescatarian", "ketogenic"];
    
    try{
        tipoDietas.forEach(dieta =>{
            Diet.findOrCreate({
                where:{
                    name : dieta
                }
            })
        })

        Diet.findAll()
        .then(r=> res.status(200).send(r))
    }
    catch(error){
        res.status(404).send(error)
    }
})

module.exports = router;