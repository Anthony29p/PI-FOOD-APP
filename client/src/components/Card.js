import React from 'react';

import './styles/Card.css';

import paella from './resources/optimized/paella.png';

export default function Card({ name,image,description,healthScore,howToDo }){
    const imagenFinal = image?image:paella
    
    return(
        <div className="card">
            <p>{name}</p>
            <p>HealthScore: {healthScore}</p>
            <img loading='lazy' src = {imagenFinal} alt =''/>
        </div>
    );
};  