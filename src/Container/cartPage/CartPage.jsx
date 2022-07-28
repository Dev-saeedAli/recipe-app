import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import "../cartPage/cartpage.css"
import { FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../features/cartSlice/cartSlice'
import { db } from '../../firebase/firebase_Configue'
import { doc, updateDoc } from 'firebase/firestore'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Checkout from '../../components/Checkout/Checkout'



const CartPage = ({setTab}) => {
  setTab(window.location.pathname)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [qty, setQty ] = useState(1)
  const { cartItems, loading } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.users)
  let [cart, setCart ] = useState([])
  let [cartQty, setCartQty] = useState(1)
  
  console.clear()

  const filteredUser = cartItems.filter(item => item.id === user?.email);
  let filteredCart =  filteredUser[0]?.cart?.map(item => item)
  
  
  const incrementQty = async (id) => {
    if(!id || id == "") return 
    await setQty(prev => prev += 1)
    const docRef = doc(db, "users", user?.email)
    const newField = await cart?.map(item => item?.id === id ? ({...item , quantity : item.quantity + qty }) : ({...item}))
    await updateDoc(docRef,  { 
      cart : newField
    })
    toast.success("Increased the quantity !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    await setQty(1)
  }
  const decrementQty = async (id) => {
    if(!id || id == "") return 
    await setCartQty(cart?.map(item => item?.id === id ? item.quantity :item.quantity))
    await setQty(cartQty => cartQty -= 1)
    const docRef = doc(db, "users", user?.email)
    const newField = await cart?.map(item => item?.id === id ? ({...item , quantity : item.quantity < 2 ?  
      toast.warn("minimum of 1 item is needed !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme : "dark"

    }) && 1 : toast.success("Decreased the quantity !", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme : "dark"
    }) &&  item.quantity - +qty}) : ({...item}))
    await updateDoc(docRef,  { 
       cart : newField
      })
      await setQty(1)
    }


    const deleteCartItem = async (id) => {
      const result = cart?.filter(item => item?.id !== id)
      await updateDoc(doc(db, "users", user?.email), {
        cart : result
      })
      await dispatch(getCartItems())
      toast.error("Item has been deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme : "dark"
      });
    }


  useEffect(()=>{
    const unsub =  dispatch(getCartItems())
    return () => unsub
  }, [dispatch, qty])

  useEffect(()=> {
    setCart(filteredCart)
  }, [cartItems])

  return (
    <div className='cart-section'>
      <ToastContainer theme='dark'/>
      <div className="cart-header" onClick={()=> navigate("/home")}>
          <MdKeyboardArrowLeft/>
          <h4>Cart</h4>
        </div>
      <div className='carts'>
          {
            filteredUser[0]?.cart?.length > 0 ?  loading ? (
              <div  className='favourite'>
                  <div className="favourite-container">
                      <h4>Loading...</h4>
                  </div>
              </div>
          ) : (
            <div  className="cart-container">
                  {filteredUser[0]?.cart.map(item => (
                    <div key={item?.id} className="cart-item">
                  <div className="cart-image">
                    <img src={item?.image} alt="cart-image" />
                  </div>
                  <div className="cart-item-name">
                    <h3>{item?.name}</h3>
                    <p>{item?.name.length > 11 ? `${item?.name.substr(0, 11)}...` : item?.name}</p>
                    <span>${item?.price}</span>
                    <span><FaTrash onClick={() => deleteCartItem(item?.id)}/></span>

                  </div>
                  <div className="cart-quantity">
                    <p>{item?.quantity}</p>
                    <div className="cart-svg">
                      <AiOutlineMinus  onClick={()=> {
                        decrementQty( item?.id)
                      }}/>
                      <AiOutlinePlus onClick={()=> incrementQty( item?.id)}/>
                    </div>
                  </div>
              </div>
              )
              )}
              <Checkout filteredCart={filteredCart}/>
            </div>
            ) : (
              <div className="cart-container">
                <h3>No items in the basket</h3>
              </div>
            )
          }
      </div>

    </div>
  )
}

export default CartPage
