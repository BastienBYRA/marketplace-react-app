import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css"
import Header from './../Header/Header';
import CircularProgress from '@mui/material/CircularProgress';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { useNavigate } from 'react-router-dom';

const Detail = ({allProducts, lightMode, emptyVariable, handleChangeBasket, basket}) => {
    const param = useParams()

    const navigate = useNavigate()

    const [numberProduct, setNumberProduct] = useState(1)

    let productDetail = null
    let alreadyInBasket = undefined
    let array = [];

    if((typeof param !== 'undefined') && (typeof allProducts !== 'undefined')) {
        allProducts.map(product => { 
            if(product.id == param.id){
                productDetail = product

                return productDetail;
            }
        });
        
    }

    if(productDetail){

        if (productDetail.quantity > 0){
            for (let i = 1; i <= productDetail.quantity; i++) {
                array.push(<option key={i} value={i}>{i}</option>)
            }
        }else{
            array = null;
        }

    }

    // if(productDetail && basket.length > 0){
    //     basket.map(product => {
    //         if(productDetail.id === product.product.id){
    //             alreadyInBasket = product.quantity
    //             break;
    //         }
    //     })

    if(productDetail && basket.length > 0){
        for (let i = 0; i < basket.length; i++) {
            if(productDetail.id === basket[i].product.id){
                alreadyInBasket = basket[i].quantity
                break;
            }
        }
    }

    // array = arrayQuantity()

    function tempFunc() {
        return;
    }

    return (
        <div className="detail">
            <Header lightMode={lightMode} emptyVariable={emptyVariable} />
            {productDetail &&
            <div className='detail-separator'>
                <p className="detail-back-previous" onClick={() => navigate("/article")}> ‹ Return to the previous page</p>
                <div className="detail-container">
                    {/* <a className="detail-link-image" href="https://google.com"> */}
                        <img className='detail-image' src={productDetail.image} />
                    {/* </a> */}
                    <div className="detail-text">
                        <h1>{productDetail.title}</h1>
                        <h2>Category : {productDetail.category}</h2>
                        <h3>{productDetail.rating.rate} <span className='detail-star-icon'>★</span> <span className='rating-text'>{productDetail.rating.count} ratings</span></h3>
                        <p>{productDetail.description}</p>
                        <br></br>
                        <div className="detail-buy">
                            <h2 className='detail-price'>{productDetail.price}€</h2>

                            {array && <select value={numberProduct} name="detail-purchase-quantity" id="detail-purchase-quantity" className='detail-purchase-quantity' onChange={
                                (e) => setNumberProduct(+e.target.value)
                            } >
                                {array}
                            </select>}

                            {array && <button className='detail-purchase-button' onClick={() => {
                                navigate("/");
                                handleChangeBasket(productDetail, numberProduct, 'ADD_PRODUCT_TO_BASKET');  
                            }}>Purchase <ShoppingCartSharpIcon /></button>} {alreadyInBasket && <i style={{paddingLeft: '20px'}}>Already {alreadyInBasket} in the basket</i>}

                            {!array && <button className='' disabled>Sold out <ShoppingCartSharpIcon /></button>}

                        </div>
                    </div>
                </div>
            </div>
            }
            {!productDetail && <div className='detail-load'>
                <CircularProgress size={50} />
            </div>}
        </div>

    )
}

export default Detail;