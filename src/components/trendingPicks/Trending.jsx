import React, { useEffect } from 'react'
import "../../Container/homePage/home.css"
import { getTrending } from '../../features/trendingSlice/trendingSlice'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { getTrendingDetails } from '../../features/veggieSlice/veggieDetails'
import { useNavigate } from 'react-router'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const TrendingPicks = ({title}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { trending, loading } = useSelector((state) => state.trends)
  const { user } = useSelector(state => state.users)

  useEffect(()=>{
    dispatch(getTrending())
  }, [dispatch])

//   console.log(trending);

  return (
    <div>
         <h2>{title}</h2>
      <div className="home-picks">
        <ToastContainer theme='dark'/>
            {
              loading ? ("Loading...") : ( 
                trending?.map(trend => (
                    <div
                     key={trend.idMeal} className="home-image"
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
                      dispatch(getTrendingDetails(trend.idMeal)) &&
                      navigate("/details")
                     }}
                      style={{background: `linear-gradient(rgba(255, 160, 58, 0.543), rgba(0,0,0,0.5)),url(${trend.strMealThumb})center/cover no-repeat`}}>
                      <h4>{trend.strMeal.length > 20 ? `${trend.strMeal.substr(0, 20)}...`  : trend.strMeal}</h4>
                    </div>
                ))
              ) 
            }
      </div>
    </div>
  )
}

export default TrendingPicks
