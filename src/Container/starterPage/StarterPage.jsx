import React from 'react'
import "../starterPage/starterPage.css"
import starterImage from "../../assets/onboardImage.png"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../features/userAuthenticationSlice/userAuthSlice'

const StarterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)

  return (
    <div>
      <div className="starter">
        <div className="starter-image">
          <img src={starterImage} alt="starterImage" />
        </div>
        <div className="starter-info">
          <h2>Delicious Food</h2>
          <p>We help you find the best and delicious food.</p>
          <button className="starterBtn" onClick={()=> {
            dispatch(getUserDetails())
            navigate("/home")
          }}
        >Get started</button>
        </div>
      </div>
    </div>
  )
}

export default StarterPage
