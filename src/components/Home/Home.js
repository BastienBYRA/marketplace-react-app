import React from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Header from '../Header/Header';
import "./style.css"

const Home = ({allCategories, chooseCategory, emptyVariable}) => {

    const navigate = useNavigate();
    let presentationElements

    if(allCategories){
        presentationElements = allCategories.map((category) => (
            <div key={nanoid()} className="container-presentation">
                <img src={require(`../../assets/video/${category}.gif`)} alt={category}  width="100%" />
                {/* <div className={category !== "jewelery" ? "title-container-presentation": "title-container-presentation-white"} onClick={(e) => {
                chooseCategory(e)
                navigate("/article")
            }}> */}
                    {/* <h1 className="title-presentation">{category.charAt(0).toUpperCase() + category.slice(1)}</h1> */}
                    <input className={category !== "jewelery" ? "button-presentation": "button-presentation-white"} key={nanoid()} type="button" value={category.charAt(0).toUpperCase() + category.slice(1)} onClick={(e) => {
                        chooseCategory(e)
                        navigate("/article")
                        window.scrollTo(0, 0)
                    }}></input>
                {/* </div> */}
            </div>
        ))
    }

    return (
        <div className='container-home'>
            <Header emptyVariable={emptyVariable}/>
            <div className='list-presentation-video'>
                {presentationElements}
            </div>
        </div>
    )

}

export default Home;