import React, { useEffect } from 'react'
import "../header/header.css"
import { AiFillHome } from "react-icons/ai"
import { BiDetail } from "react-icons/bi"
import { BsSearch } from "react-icons/bs"
import { MdFavorite } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import { getNonVeggieDetails } from '../../features/veggieSlice/veggieDetails'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Header = ({tab}) => {
  const { user } = useSelector(state => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='header'>
      <ToastContainer/>
      <AiFillHome className={tab === "/home" ? `active` : ""}  
      onClick={()=> {
        user == null ? (toast.warn("Please login to get access!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) && navigate("/home") ) :  navigate("/home")
      }} />

      <BiDetail className={tab === "/details" ? `active` : ""}   
      onClick={()=> { 
      dispatch(getNonVeggieDetails(52772))
      user == null ? (toast.warn("Please login to get access!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) && navigate("/home") ) :  navigate('/details')
      }}/>
      <BsSearch className={tab === "/search" ? `active` : ""}  
      onClick={()=> {
        user == null ? (toast.warn("Please login to get access!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) && navigate("/home") ) :  navigate("/search")
        }}/>

      <MdFavorite className={tab === "/favourites" ? `active` : ""}  
      onClick={()=> {
        user == null ? (toast.warn("Please login to get access!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) && navigate("/home") ) :  navigate("/favourites")
      }}/>

      <FaShoppingCart className={tab === "/cart" ? `active` : ""} 
      onClick={()=> {
        user == null ? (toast.warn("Please login to get access!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) && navigate("/home") ) :  navigate("/cart")
      }}/>
    </div>
  )
}

export default Header
