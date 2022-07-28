import React from 'react'
import "../dishes/dishes.css"
import { Link } from "react-router-dom"
import { getAreaMealDetails } from '../../features/veggieSlice/veggieDetails'
import { AiFillPlusCircle } from "react-icons/ai"
import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'

const Dishes = () => {
  const { meals, loading, error } = useSelector(state => state.meals)
  const dispatch = useDispatch()

  return (
    <div className='dishes'>
       {
        loading ? (
   
           <h3>Loading...</h3>

        ) : error != "" ? (

          <h3>{error}</h3>

        ) : (
          meals?.map(meal =>(
            <Link to={"/details"} key={meal.idMeal}>
              <div className="cards" onClick={()=> dispatch(getAreaMealDetails(meal.idMeal))}>
                <div className="card-image">
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                </div>
                <div className="card-body">
                  <h3>{meal.strMeal.length > 20 ? `${meal.strMeal.substr(0, 20)}...`  : meal.strMeal}</h3>
                  <p>{meal.strMeal.length > 20 ? `${meal.strMeal.substr(0, 20)}...`  : meal.strMeal}</p>
                </div>
                <div className="card-footer">
                  <span>${`${Math.ceil(Math.random() * 100 + 10).toFixed(2)}`}</span>
                  <AiFillPlusCircle/>
                </div>
              </div>
            </Link>
          ))
        )
       }
    </div>
  )
}

export default Dishes
