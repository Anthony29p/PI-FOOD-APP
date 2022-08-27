import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { getRecipesByName } from '../actions';

export default function SearchBar(){
    
    const dispatch = useDispatch()
    const [consulta,setConsulta] = useState("");

    function onSearch(e){
        e.preventDefault();
        dispatch(getRecipesByName(consulta))
    }

    return(
        <form onSubmit={e => {onSearch(e)}}>
            <input
                type="text"
                placeholder="Consulte casero..."
                onChange={e => setConsulta(e.target.value)}
            />
            <input type="submit" value="Consultar sin compromiso" />
        </form>
    );
}; 