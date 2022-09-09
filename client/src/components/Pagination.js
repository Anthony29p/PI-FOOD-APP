import React from "react";

import './styles/Pagination.css';

export default function Pagination ({recipesPerPage, allRecipes, pagination, currentPage}){
    const pageNumber = []
    
    for(let i = 1; i<=Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumber.push(i)
    }


    return(
        <nav className="nav">
            {currentPage!==1
                ?(<button className="botonAntesDespues" onClick={()=>pagination(currentPage-1)}>PREV</button>)
                :(<div className="invisible"></div>)
            }
            <ul>
                { pageNumber?.map(n =>(    
                        <li key={n}>
                            <button className={currentPage===n?"botonPaginado":""} onClick={()=>pagination(n)}>{n}</button>

                        </li>
                    ))
                }
            </ul>
            {currentPage<pageNumber.length
                ?(<button className="botonAntesDespues" onClick={()=>pagination(currentPage+1)}>NEXT</button>)
                :(<div className="invisible"></div>)
            }
        </nav>

    )
}