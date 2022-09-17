import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';

import {Link} from 'react-router-dom'

import { getRecipes, filterRecipes, filterSource,filterScore, orderName, orderScore } from "../actions";

import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Loader from "./Loader";

import './styles/Home.css';

export default function Home(){

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    // Variables de paginado
    const [currentPage,setCurrentPage] = useState(1)
    const [recipesPerPage,setRecipesPerPage] =useState(9)

    const [order,setOrder] =useState("")
    const [charge, setCharge] = useState(true)

    const indexOfLastRecipe = currentPage*recipesPerPage
    const indexOfFirstRecipe =indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe )

    const pagination = (pageNumber) =>{ 
        setCurrentPage(pageNumber)
    }

    // Reinicio de recetas 
    useEffect(() =>{
        // setCharge(true);
        setTimeout(() => {
            setCharge(false);
        }, 500);
        dispatch(getRecipes());
    },[]) 
    

    // Parche para usar creacion de recetas
    
    // useEffect(() =>{
    //     dispatch(getDiets());
    // },[]) 

    function handleClick(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getRecipes())
    }

    function handleFilterDiet(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRecipes(e.target.value))
    }

    function handleScore(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterScore(e.target.value))
    }

    function handleFilterSource(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterSource(e.target.value))
    }

    function handleOrderName(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(orderName(e.target.value))
        setOrder(`ordenado ${e.target.value}`)
    }

    function handleOrderScore(e){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(orderScore(e.target.value))
        setOrder(`ordenado ${e.target.value}`)
    }
    
    return(
        charge?
        <Loader/>
        :
        <div className="home">
            <nav className="navbar">
                <h1>HOME</h1>
                <Link to='/recipes' style={{textDecoration:"none"}}>
                    <button>Create Recipe</button>
                </Link>
                <SearchBar/>
            </nav>
            <div className="container">
                <nav className="filters">
                    <select onChange={e =>{handleFilterDiet(e)}}>
                        <option value="all">All Diets</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="dairy free">Dairy Free</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30">Whole30</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="ketogenic">Ketogenic</option>
                    </select>
                    
                    <select onChange={e =>{handleOrderName(e)}}>
                        <option value=''>-Alphabetic Sort-</option>
                        <option value='asc'>Ascending Sort</option>
                        <option value='des'>Descending Sort</option>
                    </select>
                    <select onChange={e =>{handleOrderScore(e)}}>
                        <option value=''>-Health Score Sort-</option>
                        <option value='up'>Ascending Sort</option>
                        <option value='down'>Descending Sort</option>
                    </select>
                    <select onChange={e =>{handleFilterSource(e)}}>
                        <option value=''>-Data Source-</option>
                        <option value='todo'>All</option>
                        <option value='registrado'>Already Registred</option>
                        <option value='creado'>Created at Data Base</option>
                    </select>

                    <button onClick={e =>{handleScore(e)}}>Filtrar 100 y 99</button>

                    <button onClick={e => {handleClick(e)}}>
                        Reload
                    </button> 
                </nav>
                <div className="containerCard">
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pagination={pagination}
                    currentPage={currentPage}
                />
                {
                    currentRecipes?.map(e =>{
                        return(
                            <Fragment key={e.id}>
                                <Link to={`/recipes/${e.id}`} style={{textDecoration:"none"}} >
                                <Card name={e.name} image={e.image} healthScore={e.healthScore}/>
                                </Link>
                            </Fragment>
                        );
                    })
                }
                </div>
            </div>
        </div>
    )
}