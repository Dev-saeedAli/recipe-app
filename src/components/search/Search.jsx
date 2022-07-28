import React, { useEffect, useState } from 'react'
import "../search/search.css"
import { BsSearch } from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { getMealDetails } from '../../features/areaMealsSlice/areaMealsSlice'

const Search = () => {
  const [searchDish, setSearchDish] = useState("")
  const dispatch = useDispatch()

  const searchMeal = () => {
    dispatch(getMealDetails(searchDish))
  }
 useEffect(() => {
  searchMeal()
 }, [searchDish])


  return (
    <div className='search-section'>
      <div className="search">
        <form onSubmit={(e) => searchMeal(e.preventDefault())}>
          <BsSearch/>
          <input type="text" placeholder='search for food' value={searchDish} onChange={(e)=> setSearchDish(e.target.value)}/>
        </form>
      </div>
    </div>
  )
}

export default Search
