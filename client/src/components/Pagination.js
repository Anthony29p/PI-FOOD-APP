import React from "react";

import './styles/Pagination.css';

export default function Pagination ({recipesPerPage, allRecipes, pagination}){
    const pageNumber = []
    
    for(let i = 1; i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumber.push(i)
    }

    return(
        <nav className="nav">
            <ul>
                { pageNumber?.map(n =>(    
                        <li key={n}>
                            <button onClick={()=>pagination(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>

    )
}