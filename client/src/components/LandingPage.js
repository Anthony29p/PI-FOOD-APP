import React from "react";
import {Link} from 'react-router-dom';

import bkg from './resources/landingPage-Dark.png';
import './styles/LandingPage.css';


export default function LandingPage(){
    return(
        
        <div className="landingPage">
            <div>
                <h1>Enjoy Our Food Experience</h1>
                <h4>We don't just make food. We make people's experience. Henryfoods was  buildt on the believe that food should be especial, and we carry the belief into everything we do</h4>
                <Link to='/home'>
                    <button  className="btn">View our recipes</button>
                </Link>
            </div>
            <img claseName="img" src={bkg} alt=""></img>
        </div>
    )
}