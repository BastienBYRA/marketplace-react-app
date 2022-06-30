import React, { useState } from 'react';
import "./style.css"

const Product = ({productDetail, handleChangeBasket, deleteProductFromBasket}) => {

    // console.log(productDetail)

    let array = []

    if(productDetail){
        if (productDetail.quantity > 0){
            for (let i = 1; i <= productDetail.product.quantity; i++) {
                array.push(<option key={i} value={i}>{i}</option>)
            }
        }else{
            array = null;
        }
    }

    return(
        <div className="product-container">
            <img className='product-image' src={productDetail.product.image} />
            <div className="product-information">
                <h1>{productDetail.product.title}</h1>
                <h2>Category : {productDetail.product.category}</h2>
                <h3>{productDetail.product.rating.rate} <span className='product-star-icon'>★</span> <span className='rating-text'>{productDetail.product.rating.count} ratings</span></h3>
                <p>{productDetail.product.description}</p>
                <div className='product-basket-quantity'>
                    Quantity : <select value={productDetail.quantity} name="detail-purchase-quantity" id="detail-purchase-quantity" className='detail-purchase-quantity' onChange={
                        (e) => handleChangeBasket(productDetail.product, +e.target.value, 'ADD_PRODUCT_TO_BASKET')
                    } >
                    {array}
                    </select> <button className='product-basket-delete' onClick={
                        () => handleChangeBasket(productDetail.product, null, 'DELETE_PRODUCT_FROM_BASKET')
                    }>Delete</button>
                    <div className="product-price">
                        <h2 className='product-price-unit'>Unit price : {productDetail.product.price}€</h2>
                        <h2 className='product-price-multiple'>Actual price : {Math.round(((productDetail.quantity * productDetail.product.price) + Number.EPSILON) * 100) / 100}€</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product;