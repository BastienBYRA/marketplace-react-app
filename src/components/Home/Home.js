import React from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import Header from "../Header/Header";
import "./style.css";

const Home = ({ allCategories, chooseCategory, emptyVariable }) => {
  const navigate = useNavigate();
  let presentationElements;

  // if(allCategories){
  //     presentationElements = allCategories.map((category) => (
  //         <div key={nanoid()} className="container-presentation">
  //             <img src={require(`../../assets/video/${category}.gif`)} alt={category}  width="100%" />
  //                 <input className={category !== "jewelery" ? "button-presentation": "button-presentation-white"} key={nanoid()} type="button" value={category.charAt(0).toUpperCase() + category.slice(1)} onClick={(e) => {
  //                     chooseCategory(e)
  //                     navigate("/article")
  //                     window.scrollTo(0, 0)
  //                 }}></input>

  //         </div>
  //     ))
  // }

  const buttonState = (e, state) => {
    // state == true
    //   ? (e.target.parentNode.children[1].style.display = "block")
    //   : (e.target.parentNode.children[1].style.display = "none");
    // if (state == true) {
    //   // e.target.parentNode.children[1].style.transition = "all 2s";
    //   e.target.parentNode.children[1].style.display = "block";
    // } else {
    //   e.target.parentNode.children[1].style.display = "none";
    // }
  };

  if (allCategories) {
    presentationElements = allCategories.map((category) => (
      <div key={nanoid()} className="div-presentation-categ">
        <img
          className="img-presentation-categ"
          src={require(`../../assets/presentation/${category}.jpg`)}
          alt={category.charAt(0).toUpperCase() + category.slice(1)}
          onClick={(e) => {
            chooseCategory(e.target.alt);
            navigate("/article");
            window.scrollTo(0, 0);
          }}
        />
        <input
          className="button-presentation"
          key={nanoid()}
          type="button"
          value={category.charAt(0).toUpperCase() + category.slice(1)}
          onClick={(e) => {
            chooseCategory(e.target.value);
            navigate("/article");
            window.scrollTo(0, 0);
          }}
        ></input>
      </div>
    ));
  }

  return (
    <>
      <Header emptyVariable={emptyVariable} />
      <div className="container-home">
        <div className="banderole-home">
          <img src={require(`../../assets/presentation/banner-img.jpg`)}></img>
        </div>

        <div className="category-presentation">{presentationElements}</div>
      </div>
    </>
  );
};

export default Home;
