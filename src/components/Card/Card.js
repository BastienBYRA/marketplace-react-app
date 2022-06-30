import React from 'react';
import "./style.css"
import { useNavigate } from 'react-router-dom';

const Card = ({product}) => {

    const navigate = useNavigate();

    return(
        <div className="card-container" onClick={() => navigate("/article/" + product.id)}>
            <div className='card-main'>
                {product.quantity < 1 && <div className='card-sold-out'>
                    <p>SOLD OUT</p>
                </div>}
                <img className='card-img' src={product.image}/>
                <div className='card-content'>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>{product.price} $ - {product.rating.rate} <span className='card-star-icon'>★</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card;