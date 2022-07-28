import {  doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../features/cartSlice/cartSlice'
import { db } from '../../firebase/firebase_Configue'
import "../Checkout/checkout.css"
import { ToastContainer, toast } from "react-toastify";

const Checkout = ({filteredCart}) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.users)
    const [price, setPrice ] = useState(0)

    const  totalPrice = () =>{
        const filters = filteredCart?.map(item =>  Number(item?.price) * Number(item?.quantity))
        const total = filters?.reduce((total, price) => price += total)
        setPrice(total)
    }

    const checkoutDish = async () =>{
        await setLoading(true)
        await updateDoc(doc(db, "users", user?.email), {
        cart : []
      })
      await dispatch(getCartItems())
      toast.success("Your Order has been placed !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme : "dark"
      });
      setLoading(false)
    }

    useEffect(()=>{
        totalPrice()
    }, [filteredCart])

  return (
    <div className="checkout">
        {loading ? <ToastContainer/> : ""}
      <div className="checkout-header">
        <h5>Total Price</h5>
        <p>${Math.ceil(price).toFixed(2)}</p>
      </div>
      <button className={loading ? `btn active` : `btn`}onClick={()=> checkoutDish()}>{loading ? "checking out..." : "checkout"}</button>
    </div>
  )
}

export default Checkout
