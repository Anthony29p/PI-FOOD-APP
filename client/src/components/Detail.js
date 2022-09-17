import React, { useState } from "react";
import { Link,useParams } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";

import { getRecipesByID } from "../actions";

import './styles/Detail.css';
import paella from './resources/paella.jpg';
import Loader from "./Loader";

export default function Detail (){
    const dispatch = useDispatch();
    const { id }  = useParams();
    
    const [charge, setCharge] = useState(true)

    useEffect(() =>{
        setTimeout(() => {
          setCharge(false);
        }, 800);
        dispatch(getRecipesByID(id))
    },[id])

    const detail = useSelector(state =>state.detail)

    console.log(detail)

    return(
        charge?
        <Loader/>
        :
        <div className="detail">
            <div className="back">
                <Link to="/home">
                    <button className="btn02">Return to Home</button>
                </Link>
            </div>
            { 
                detail.length>0?    
                <div className="menu">
                    <div className="section01">
                        <h1>{detail[0].name}</h1>
                        <h5>{detail[0].description}</h5>
                    </div>
                    <div className="section02">
                        <h5>Health Score: {detail[0].healthScore}%</h5>
                        <div>
                        {
                            detail[0].createdAt?
                            detail[0].diets.map(d =>(
                                <h4 key={d.id}>{d.name}</h4>
                            )):
                            detail[0].diets.map(d =>(
                                <h4>{d}</h4>
                            ))
                        }
                        </div>
                        {detail[0].createdDB?
                        <img src = {paella} alt =''/>:
                        <img src = {detail[0].image} alt =''/>
                        }
                    </div>
                </div>:
                <div></div>

            }
        </div>
    )
}

