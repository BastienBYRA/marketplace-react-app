import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import ProductInBasket from "../ProductInBasket/ProductInBasket";
import "./style.css";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Basket = ({ basket, emptyVariable, handleChangeBasket }) => {
  let navigate = useNavigate();

  let totalBasketPrice = 0;
  let basketElements = null;

  if (basket) {
    basket.map((product) => {
      totalBasketPrice =
        product.quantity * product.product.price + totalBasketPrice;
    });

    totalBasketPrice =
      Math.round((totalBasketPrice + Number.EPSILON) * 100) / 100;

    basketElements = basket.map((product) => (
      <ProductInBasket
        key={nanoid()}
        productDetail={product}
        handleChangeBasket={handleChangeBasket}
      />
    ));
  }

  return (
    <div className="basket">
      <Header emptyVariable={emptyVariable} />
      {basket.length > 0 && (
        <div className="basket-separator">
          <div className="basket-container">{basketElements}</div>
          {basket.length > 0 && (
            <aside className="basket-total">
              <div className="basket-fixed">
                <h2>Total price : {totalBasketPrice}€</h2>
                <div className="basket-total-buttons">
                  <button
                    className="basket-total-validate"
                    onClick={() =>
                      handleChangeBasket(basket, null, "VALIDATE_ORDER")
                    }
                  >
                    Validate
                  </button>
                  <button
                    className="basket-total-delete"
                    onClick={() =>
                      handleChangeBasket(null, null, "DELETE_BASKET")
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      )}

      {basket.length === 0 && (
        <div className="basket-empty-separator">
          <div className="basket-empty">
            <h1>Your basket is empty</h1>
            <button
              className="basket-empty-btn"
              onClick={() => {
                navigate("/article");
                emptyVariable("DELETE_SEARCH_SPECIFIC_CATEGORY");
              }}
            >
              Buy something ?
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
