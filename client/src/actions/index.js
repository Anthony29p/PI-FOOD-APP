import axios from 'axios';
// const axios = require('axios')
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME';
export const GET_RECIPES_BY_ID = 'GET_RECIPES_BY_ID';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const FILTER_BY_SOURCE ='FILTER_BY_SOURCE';
export const ORDER_BY_NAME ='ORDER_BY_NAME';
export const ORDER_BY_SCORE ='ORDER_BY_SCORE';
export const POST_RECIPES = 'POST_RECIPES';
export const FILTER_BY_SCORE = 'FILTER_BY_SCORE';

// const urlBase ="http://localhost:3001"
const urlBase ="https://back-pi-production.up.railway.app"

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get(`${urlBase}/recipes`)

        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getRecipesByName(name){
    return async function(dispatch){
        try{
        var json = await axios.get(`${urlBase}/recipes?name=${name}`)

        return dispatch({
            type: GET_RECIPES_BY_NAME,
            payload: json.data
        })
        }
        catch(error){console.log(error)}
    }
}

export function getRecipesByID(id){
    return async function(dispatch){
        try{
        var json = await axios.get(`${urlBase}/recipes/${id}`)

        return dispatch({
            type: GET_RECIPES_BY_ID,
            payload: json.data
        })
        }
        catch(error){console.log(error)}
    }
}

export function getDiets(){
    return async function(dispatch){
        var json = await axios.get(`${urlBase}/diets`)

        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        try{
        var post = await axios.post(`${urlBase}/recipes`,payload)
        return post
        }
        catch(error){console.log(error)}
    }
}

export function filterRecipes(payload){
    
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function filterScore(payload){
    
    return {
        type: FILTER_BY_SCORE,
        payload
    }
}

export function filterSource(payload){

    return {
        type: FILTER_BY_SOURCE,
        payload
    }
}

export function orderName(payload){

    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderScore(payload){

    return {
        type: ORDER_BY_SCORE,
        payload
    }
}