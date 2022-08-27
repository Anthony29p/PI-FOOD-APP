import React from "react";
import { Link,useParams } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";

import { getRecipesByID } from "../actions";

import './styles/Detail.css';
import menu from './resources/menu.png';
import paella from './resources/paella.jpg';

export default function Detail (){
    const dispatch = useDispatch();
    const { id }  = useParams();
    
    useEffect(() =>{
        dispatch(getRecipesByID(id))
    },[id])

    const detail = useSelector(state =>state.detail)

    console.log(detail)


    return(
        <div className="detail">
            <img src={menu} alt=""></img>
            {
                detail.length>0?    
                <div className="menu">
                    <div className="section01">
                        <h1>{detail[0].name}</h1>
                        <div>
                        {
                            detail[0].createdAt?
                            detail[0].diets.map(d =>(
                                <h4>{d.name}</h4>
                            )):
                            detail[0].diets.map(d =>(
                                <h4>{d}</h4>
                            ))
                        }
                        </div>
                        <h5>{detail[0].description}</h5>
                    </div>
                    <div className="section02">
                        <h5>Health Score: {detail[0].healthScore}%</h5>

                        {detail[0].createdAt?
                        <img src = {paella} alt =''/>:
                        <img src = {detail[0].image} alt =''/>
                        }
                    </div>
                </div>:
                <div></div>

            }
        <Link to="/home">
            <button>Return to Home</button>
        </Link>
        </div>
    )
}

