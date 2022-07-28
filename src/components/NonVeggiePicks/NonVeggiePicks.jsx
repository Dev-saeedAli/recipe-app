import React, { useEffect } from 'react'
import "../../Container/homePage/home.css"
import { getNonVeggies } from '../../features/nonveggieSlice/nonveggieSlice'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { getNonVeggieDetails } from '../../features/veggieSlice/veggieDetails'
import { useNavigate } from 'react-router'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const NonVeggiePicks = ({title}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { nonveggies, loading } = useSelector((state) => state.nonVeggie)
  const { user } = useSelector(state => state.users)

  useEffect(()=>{
    dispatch(getNonVeggies())
  }, [dispatch])

  return (
    <div>
         <h2>{title}</h2>
      <div className="home-picks">
           {
             loading ? ( "Loading...") : (
              nonveggies?.map(nonveggie => (
                <div
                 key={nonveggie.idMeal}
                  className="home-image"
                   style={{background: `linear-gradient(rgba(255, 160, 58, 0.543), rgba(0,0,0,0.5)),url(${nonveggie.strMealThumb})center/cover no-repeat`}}
                   onClick={()=> {
                    user == null ? (toast.warn("Please login to get access!", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }) && navigate("/home")) : 
                    dispatch(getNonVeggieDetails(nonveggie.idMeal)) &&
                    navigate("/details")
                   }}
                   >
                  <h4>{nonveggie.strMeal.length > 20 ? `${nonveggie.strMeal.substr(0, 20)}...`  : nonveggie.strMeal}</h4>
                </div>
            ))
             )
            }
      </div>
    </div>
  )
}

export default NonVeggiePicks
