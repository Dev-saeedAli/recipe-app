import React, { useEffect } from 'react'
import "../../Container/homePage/home.css"
import { getVeggies } from '../../features/veggieSlice/VeggieSlice'
import { getVeggieDetails } from '../../features/veggieSlice/veggieDetails'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { useNavigate } from 'react-router'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const VeggiePicks = ({title}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { veggies, loading } = useSelector((state) => state.veggie)
  const { user } = useSelector(state => state.users)

  useEffect(()=>{
    dispatch(getVeggies())
  }, [dispatch])

  return (
    <div>
         <h2>{title}</h2>
      <div className="home-picks">
        <ToastContainer theme='dark'/>
            {
              loading ? ("Loading...") : (
                veggies?.map(veggie => (
                  <div key={veggie.idMeal}
                   className="home-image"
                    style={{background: `linear-gradient(rgba(255, 160, 58, 0.543), rgba(0,0,0,0.5)),url(${veggie.strMealThumb})center/cover no-repeat`}}
                    onClick={()=> {
                      user == null ? (toast.warn("Please login to get access!", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      }) && navigate("/home")) : dispatch(getVeggieDetails(veggie.idMeal)) && navigate("/details")
                    }}
                    >
                    <h4>{veggie.strMeal.length > 20 ? `${veggie.strMeal.substr(0, 20)}...`  : veggie.strMeal}</h4>
                  </div>
              ))
              )
            }
      </div>
    </div>
  )
}

export default VeggiePicks
