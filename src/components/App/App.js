import './style.css';
import Header from './../Header/Header';
import Marketplace from '../Marketplace/Marketplace';
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Detail from '../Detail/Detail';
import { nanoid } from 'nanoid';
import Basket from '../Basket/Basket';
import Home from '../Home/Home';

function App() {
  const [allProducts, setAllProducts] = useState(undefined);
  const [allCategories, setAllCategories] = useState(undefined);
  const [categoryProducts, setCategoryProducts] = useState(undefined);

  const [lightMode, setLightMode] = useState(false);
  const [userBasket, setUserBasket] = useState(JSON.parse(localStorage.getItem('userBasket')) || []);

  // const [numberProduct, setNumberProduct] = useState(undefined);

  // const [test, setTest] = useState(0);
  // if(test === 0){
  //   localStorage.clear();
  //   // localStorage.removeItem("userBasket")
  //   setTest(1);
  // }

  const localAllProducts = JSON.parse(localStorage.getItem('allProducts')) || allProducts;
  const localAllCategories = JSON.parse(localStorage.getItem('allCategories')) || allCategories;
  const localBasket = JSON.parse(localStorage.getItem('userBasket')) || userBasket;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data => affectData(data, "allProducts"))
            .catch(error => setAllProducts(error))
  }, [])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(data => affectData(data, "allCategories"))
            .catch(error => setAllCategories(error))
  }, [])

  const affectDataToLocalStorage = (localKey, data) => {
    localStorage.setItem(localKey, JSON.stringify(data))
  }

  const affectData = (data, localKey) => {
    switch(localKey){
      case 'allProducts': 
        let modifiedData = data.map(product => {
          return {
            ...product,
            quantity: 10,
            sold: true
        }})
        affectDataToLocalStorage(localKey, modifiedData)
        return setAllProducts(modifiedData)

      case 'allCategories':
        affectDataToLocalStorage(localKey, data)
        return setAllCategories(data)

      default:
        return;
    }
  }

  const showOneCategory = (e) => {
    let category = e.target.value.toLowerCase()
    setCategoryProducts((localAllProducts || allProducts).filter(product => product.category === category))
  }

  const categoryProductsEmpty = () => {
    setCategoryProducts(null)
  }

  const emptyVariable = (type) => {
    switch (type) {
      case 'DELETE_SEARCH_SPECIFIC_CATEGORY':
        setCategoryProducts(undefined)
        break;
      default:
        break;
    }
  }

  /*
  * Affect the basket of the user
  * [product] can be a item or a list of product objects
  */
  const handleChangeBasket = (product, quantity, type) => {
    switch(type){
      case 'ADD_PRODUCT_TO_BASKET':
        addProductBasket(product, quantity)
        // removeProductProposal(product, quantity)
        break
      case 'DELETE_PRODUCT_FROM_BASKET':
        deleteProductFromBasket(product)
        break
      case 'DELETE_BASKET':
        localStorage.removeItem("userBasket")
        setUserBasket([])
        break
      case 'VALIDATE_ORDER':
        removeProductSold(product)
      default:
          break;
    }
  }

  const addProductBasket = (product, quantity) => {

    let basket = []
    let changeDone = false;

    if((localBasket || userBasket).length > 0) {
      (localBasket || userBasket).map(element => {
        if(element.product.id === product.id) {
          changeDone = true
          basket.push({...element, quantity: quantity})
        }else{
          basket.push({...element})
        }
      })

    }else{
      changeDone = true
      basket.push({product, quantity: quantity})
    }

    if(changeDone === false){
      basket.push({product, quantity: quantity})
    }

    localStorage.setItem('userBasket', JSON.stringify(basket))
    return setUserBasket(basket)
  }

  const deleteProductFromBasket = (product) => {
    let basket = []
    basket = (localBasket || userBasket).filter(element => element.product.id !== product.id)
    localStorage.setItem('userBasket', JSON.stringify(basket))
    return setUserBasket(basket)
  }

  /*
  * Diminue le nombre de quantité des produits une fois l'achat / commande valider
  */
  const removeProductSold = (basket) => {

    // console.log(basket)
    // console.log(localAllProducts)

    let data = [] //List contain only the product who got a modification
    let dataFinal = (localAllProducts || allProducts) //Copy of localAllProducts Or allProducts


    //Get a list of item [product] with the base quantity - the quantity buy
    if((localAllProducts || allProducts).length > 0) {
      (localAllProducts || allProducts).map(element => {
        basket.map(product => {
          if (product.product.id === element.id){
            data.push({...element, quantity: element.quantity - product.quantity}) 
          }
        })
      })

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < dataFinal.length; j++){
          if(data[i].id === dataFinal[j].id){
            dataFinal[j] = data[i]
            break;
          }
        }
      }

      localStorage.setItem('allProducts', JSON.stringify(dataFinal))
      setAllProducts(dataFinal)
      return handleChangeBasket(null, null, 'DELETE_BASKET')
    }



  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home
            key={nanoid()}
            lightMode={ lightMode }
            allCategories={ localAllCategories }
            chooseCategory = {(e) => showOneCategory(e)}
            emptyVariable = {emptyVariable}
          />}
        />
        <Route path="/article" element={
          <Marketplace
            key={nanoid()}
            allProducts={ categoryProducts || localAllProducts || allProducts }
            lightMode={ lightMode }
            allCategories={ localAllCategories }
            chooseCategory = {(e) => showOneCategory(e)}
            emptyVariable = {emptyVariable}
          />}
        />
        <Route path="/article/:id" element={
          <Detail
            key={nanoid()}
            allProducts={ localAllProducts || allProducts }
            lightMode={ lightMode }
            emptyVariable = {emptyVariable}
            handleChangeBasket = {handleChangeBasket}
            basket = { localBasket || userBasket } />}
        />
        <Route path="/basket" element={
          <Basket
            key={nanoid()}
            basket = { localBasket || userBasket }
            handleChangeBasket = {handleChangeBasket}
            emptyVariable = {emptyVariable}
            lightMode={ lightMode } />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
