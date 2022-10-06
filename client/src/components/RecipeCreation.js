import React,{ useState,useEffect } from "react";
import { Link,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { postRecipes, getDiets } from "../actions";

import './styles/RecipeCreation.css';
import gato from './resources/optimized/GatoCocinero.png';

export default function RecipeCreation(){

    const dispatch = useDispatch();
    const dieta = useSelector(state =>state.diets);
    const history = useHistory();

    const [newRecipe,setNewRecipe] = useState(
        {
           name: "",
           description: "", 
           healthScore: "", 
           howToDo: "",
           diet:[], 
           image: "" 
        }
    )
    const [errorValidation,setErrorValidation] = useState({})

    useEffect(() =>{
        dispatch(getDiets());
    },[]) 

    function handleChange(e){
        setNewRecipe({
            ...newRecipe,
            [e.target.name] : e.target.value
        })

        setErrorValidation({
            ...errorValidation,
            [e.target.name] : validations(e.target.value,e.target.placeholder,e.target.name)
        })

    }
    
    function validations(input,placeholder,referencia){
        if(input===""){return `${placeholder} shouldn't keep empty`}
        else if(referencia==="healthScore" && input<0){return `${placeholder} must not be a negative number`}
        else if(referencia==="healthScore" && input>100){return `${placeholder} must be a equal or less than 100`}
        else if(referencia==="healthScore" && isNaN(input)){return `${placeholder} must be a number`}
        else{return ""}
    }
    

    function onSubmit(e){
        e.preventDefault()
        dispatch(postRecipes(newRecipe))
        alert(`The Recipe ${newRecipe.name} was created succesfully. Thank you for you contribution`)
        setNewRecipe({
            name: "",
            description: "", 
            healthScore: "", 
            howToDo: "",
            diet:[], 
            image: "" 
        })
        history.push('/home')
    }
    
    function handleSelect(e){
        setNewRecipe({
            ...newRecipe,
            diet : [...newRecipe.diet,e.target.value]
        })
    }

    function handleDelete(dieta){
        setNewRecipe({
            ...newRecipe,
            diet : newRecipe.diet.filter(d =>d!==dieta)
        })
    }

    return(
        <div className="recipeCreation">
            <div className="navigation">
                <img src={gato} alt=""/>
                <Link to='/home'>
                    <button>Return to Home</button>
                </Link>
            </div>
            <form>  
                <div>
                    <label>Recipe's Name</label>
                    <input type="text" placeholder="Recipe's Name" name="name" onChange={handleChange} value={newRecipe.name}/>
                    <span>{errorValidation.name}</span>
                </div>
                <div>
                    <label>Recipe's Description</label>
                    <input type='text' placeholder="Recipe's Description" name="description" value={newRecipe.description} onChange={handleChange}></input>
                    <span>{errorValidation.description}</span>
                </div>
                <div>
                    <label>HealthScore</label>
                    <input type='text' name="healthScore" placeholder="Score Me"  value={newRecipe.healthScore} onChange={handleChange}></input>
                    <span>{errorValidation.healthScore}</span>
                </div>
                <div>
                    <label>Step by step</label>
                    <input type='text' name="howToDo" placeholder="How do i prepare" value={newRecipe.howToDo} onChange={handleChange}></input>
                    <span>{errorValidation.howToDo}</span>
                </div>
                <div>
                    <select onChange={handleSelect}>
                    {
                        dieta.map(d =>(
                            <option key={d.id}>{d.name}</option>
                        ))
                    }
                    </select>
                    <span>{errorValidation.diet}</span>
                </div>
                <button type="submit" disabled={!(errorValidation.name===""&&errorValidation.description===""&&errorValidation.healthScore===""&&errorValidation.howToDo==="")} onClick={onSubmit}>Create</button>
            </form>
            <div className="dietillas">
                {
                    newRecipe.diet.length>0?newRecipe.diet.map(d =>(
                        <div>
                            <p>{d}</p>
                            <button onClick={() =>handleDelete(d)}>X</button>
                        </div>
                    )):
                    <span></span>
                }
            </div>
        </div>       
    )
}