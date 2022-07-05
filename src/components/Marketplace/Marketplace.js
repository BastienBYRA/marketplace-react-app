import {useEffect} from 'react';
import { nanoid } from 'nanoid';
import Card from './../Card/Card';
import './style.css';
import Header from '../Header/Header';
import CircularProgress from '@mui/material/CircularProgress';
// import menfashion from "../../assets/video/mensclothings.gif"
// import rrr from "../../assets/video/men's clothing.gif"

const Marketplace = ({allProducts, lightMode, allCategories, chooseCategory, emptyVariable}) => {
    let productElements = false;
    let categoryElements = false;

    if(allProducts){
        productElements = allProducts.map((product) => (
            <Card
                key={nanoid()}
                product={product}
            />
         ))
    }

    if(allCategories){
        categoryElements = allCategories.map((category) => (
            <input className='marketplace-category-button' key={nanoid()} type="button" value={category.charAt(0).toUpperCase() + category.slice(1)} onClick={chooseCategory}/>
        ))
    }

    return (
        <div className="content">
            <Header lightMode={lightMode} emptyVariable={emptyVariable}/>
            {productElements && <div className='marketplace-category'>
                {categoryElements}
            </div>}
            {productElements && <div className='marketplace'>
                {productElements}
            </div>}
            {!productElements && <div className='marketplace-load'>
                <CircularProgress className='marketplace-loading-symbol' size={50} />
                <p>Retreive data from the Fakestore API.</p>
                <p>Can be slow, take your time.</p>
            </div>}

            {/* <img src="../../assets/video/men's clothing.gif" alt="this slowpoke moves"  width="100%" /> */}


        </div>
    )
}

export default Marketplace;