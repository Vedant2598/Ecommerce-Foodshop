import React from 'react'
import './CategoryBtns.css'
import { Link } from 'react-router-dom'
// import {GiHamburger,GiFullPizza,GiChickenOven,GiFrenchFries} from "react-icons/gi"
// import {MdFastfood} from "react-icons/md"

export default function CategoryBtns() {
  return (
    <>
<div className='category_parent_div bg-dark'>

    <div className='category_div'>
      <Link to="/Category/Burger">
        <button to="/category">
          <img src={require('./Images/grilling-clipart-hamburger-grill-19.png')}/><br/>
          <b>Burger</b>
        </button>
      </Link>

      <Link to="/Category/Pizza">
        <button>
          <img src={require('./Images/clipart-frames-pizza-8.png')}/><br/>
          <b>Pizza</b>
        </button>
      </Link>

      <Link to="/Category/Cold drink">
        <button>
          <img src={require('./Images/drinkcan-removebg-preview.png')}/><br/>
          <b>Drinks</b>
        </button>
      </Link>

      {/* <Link to="/Category/Meals">
        <button>
          <img src={require('./Images/Hamburger_Fries_and_Cola_PNG_Clipart-511.png')}/><br/>
          <b>Meals</b>
        </button>
      </Link> */}
        
    </div>
</div>

  
    </>
  )
}
