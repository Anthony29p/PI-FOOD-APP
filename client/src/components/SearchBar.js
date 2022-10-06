import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { getRecipesByName } from '../actions';

import './styles/SearchBar.css';
import { BsSearch } from "react-icons/bs";

export default function SearchBar(){
    
    const dispatch = useDispatch()
    const [ open , setOpen ] = useState(false);
    const [consulta,setConsulta] = useState("");

    function onSearch(e){
        dispatch(getRecipesByName(e))
    }

    return(
        <div className='formulario'>
        {!open?<div></div>:
        <input
            type="text"
            placeholder="Buscar receta..."
            onChange={(e) => {
                setConsulta(e.target.value);
                onSearch(e.target.value)
            }}
            value={consulta}
        />
        }
        <div onClick={ () => setOpen(!open)}>
            <BsSearch className='BsSearch'/>
        </div>
        </div>
    );
}; 