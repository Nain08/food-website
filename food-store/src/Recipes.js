import React from 'react'
import Recipe from './Recipe'
import './recipes.css'
function Recipes() {
  return (
    <div className='recipes-container'>
        <div className='recipes-heading'>
             Our Recipes
        </div>
        <div className='recipes-list'>
            <Recipe />
        </div>
           
        </div>
  )
}

export default Recipes
