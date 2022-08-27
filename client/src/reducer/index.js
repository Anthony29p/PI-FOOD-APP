import { GET_RECIPES, GET_RECIPES_BY_NAME, POST_RECIPES, FILTER_BY_DIET, FILTER_BY_SOURCE,FILTER_BY_SCORE, ORDER_BY_NAME, ORDER_BY_SCORE, GET_RECIPES_BY_ID, GET_DIETS } from "../actions"; 



const initialState = {
    recipes : [],
    recipesCopy : [],
    detail: [],
    diets : []
}

function rootReducer(state = initialState,action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes :action.payload,
                recipesCopy :action.payload
            }

        case GET_RECIPES_BY_NAME:
            return{
                ...state,
                recipes :action.payload,
            }

        case GET_RECIPES_BY_ID:
            return{
                ...state,
                detail :action.payload,
            }
        
        case GET_DIETS:
            return{
                ...state,
                diets :action.payload,
            }

        case POST_RECIPES:
            return{
                ...state
            } 

        case FILTER_BY_DIET:
            const allRecipes = state.recipesCopy;
            const filterByDiet = action.payload === "all"?allRecipes:allRecipes.filter(el => el.diets?.some(d => d === action.payload))
            return{
                ...state,
                recipes: filterByDiet
            }

        case FILTER_BY_SCORE:
            const allRecipesScoreable = state.recipesCopy;
            const filterByScore = allRecipesScoreable.filter(el => el.healthScore>98 )
            return{
                ...state,
                recipes: filterByScore
            }

        case FILTER_BY_SOURCE:
            const recipes = state.recipesCopy;
            const filterBySource = action.payload === "creado"?recipes.filter(el =>el.createdAt):recipes.filter(el =>!el.createdAt)
            return{
                ...state,
                recipes: action.payload === "todo"?recipes:filterBySource
            }

        case ORDER_BY_NAME:
            const recipesName = state.recipes;
            const arrayNombres = action.payload ==="asc"?
                recipesName.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
                if(b.name.toLowerCase() > a.name.toLowerCase()){return -1}
                return 0}):
                recipesName.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){return -1}
                if(b.name.toLowerCase() > a.name.toLowerCase()){return 1}
                return 0})

            return{
                ...state,
                recipes: action.payload ===""?state.recipes:arrayNombres
            }

        case ORDER_BY_SCORE:
            const recipesScore = state.recipes;
            const arrayScore = action.payload ==="up"?
                recipesScore.sort(function(a, b){
                if(a.healthScore > b.healthScore){return 1}
                if(b.healthScore > a.healthScore){return -1}
                return 0}):
                recipesScore.sort(function(a, b){
                if(a.healthScore > b.healthScore){return -1}
                if(b.healthScore > a.healthScore){return 1}
                return 0})

            return{
                ...state,
                recipes: action.payload === ""?state.recipes:arrayScore
            }

        default:
            return state;
    }
}

export default rootReducer;