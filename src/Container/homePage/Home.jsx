import React from 'react'
import "../homePage/home.css"
import Profile from '../../components/profile/Profile'
import VeggiePicks from '../../components/veggiePicks/VeggiePicks'
import NonVeggiePicks from '../../components/NonVeggiePicks/NonVeggiePicks'
import TrendingPicks from '../../components/trendingPicks/Trending'


const Home = () => {
  
  return (
    <div className='home-section'>
      <Profile/>
      <div className="picks-section">
        <VeggiePicks title="Our Vegetarian Picks"/>
        <NonVeggiePicks title="Our Non-Vegetarian Picks"/>
        <TrendingPicks title="Trending Now"/>
      </div>
    </div>
  )
}

export default Home
