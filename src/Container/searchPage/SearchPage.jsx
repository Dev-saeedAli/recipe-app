import React from 'react'
import "./searchpage.css"
import Profile from "../../components/profile/Profile"
import Search from "../../components/search/Search"
import Filters from "../../components/filters/Filters"
import Dishes from "../../components/dishes/Dishes"

const HomePage = ({setTab}) => {
  setTab(window.location.pathname)

  
  return (
    <div className='home-section'>
      {/* profile */}
      <Profile/>
      {/* search */}
      <Search/>
      {/* filters */}
      <Filters/>
      {/* dishes */}
      <Dishes/>
    </div>
  )
}

export default HomePage
