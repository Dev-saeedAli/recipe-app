import React, { useEffect, useState } from 'react'
import "../filters/filters.css"
import pizzaImage from "../../assets/pizza.webp"
import { getAreaMeals } from "../../features/areaMealsSlice/areaMealsSlice"
import { useDispatch } from 'react-redux'


const Filters = () => {
  const dispatch = useDispatch()

  const [filters, setFilters] = useState([
    "American","British", "Canadian", "Chinese","Croatian", "Dutch",
     "Egyptian", "French", "Indian", "Irish", "Italian", "Jamaican", 
     "Japanese", "Kenyan","Malaysian", "Mexican", "Moroccan", "Polish",
      "Portuguese", "Russian", "Spanish", "Thai", "Tunisian", "Turkish", "Vietnamese"
  ])
  const [list, setList] = useState("American")

  useEffect(()=>{
     dispatch(getAreaMeals(list))
  }, [list])

  return (
    <div className='filters-section'>
        {
          filters.map((filter, index) => (
            <div onClick={()=> setList(filter)} key={index} className={list === filter ? `filters active`: "filters"}>
              <img src={pizzaImage} alt="filters" />
              <span>{filter}</span>
           </div>
          ))
        }
    </div>
  )
}

export default Filters
