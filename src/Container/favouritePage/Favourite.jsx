import React, { useEffect } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import "../favouritePage/favourite.css"
import {  AiOutlineClose } from 'react-icons/ai'
import {  BiCommentDetail } from 'react-icons/bi'
import { useNavigate } from 'react-router'
import { getFavourites } from '../../features/favourtieSlice/favouriteSlice'
import { useDispatch, useSelector } from 'react-redux'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase_Configue'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getFavMeal } from '../../features/veggieSlice/veggieDetails'

const Favourite = ({setTab}) => {
    setTab(window.location.pathname)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { myFav, loading} = useSelector(state => state.favourites)
    const { user } = useSelector(state => state.users)

    const userDoc = doc(db, "users", user?.email)

    useEffect(()=>{
        dispatch(getFavourites())
    }, [dispatch])
    
    const favourites = myFav?.filter(item => item?.id === user?.email)
    // console.log(favourites[0]?.favourites.map(item => item.id));
    
    const deleteFav = async (passedId) =>{
        const result = await favourites[0]?.favourites.map(fav => fav).filter(item => item.id != passedId)
        await updateDoc(userDoc, {
            favourites : result
        })
        await dispatch(getFavourites())
        toast.error("Item removed from your favourites", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme : "dark"
        })
    }


  return (
      <div className='favourites-section'>

        <div className="favourites-header" onClick={()=> navigate("/home")}>
            <MdKeyboardArrowLeft/>
            <h4>Favourites</h4>
        </div>
        <ToastContainer/>
           {
               favourites[0]?.favourites != "" ?  loading ? (
                <div className='favourite'>
                    <div className="favourite-container">
                        <h4>Loading...</h4>
                    </div>
                </div>
            ) : ( 
                favourites[0]?.favourites?.map((item, index) => ( 
                    <div key={index} className='favourite'>
                    <div className="favourite-container">
                     <div className="favourite-item">
                         <div className="favourite-image">
                             <img src={item.image} alt="favourite-image" /> 
                         </div>
                             <div className="favourite-item-name">
                                 <h3>{item.name}</h3> 
                                 <p>{item.name}</p> 
                                 {/* <span>${`${Math.ceil(item.price).toFixed(2)}`}</span>  */}
                                 <span>{`${new Date(item?.time)}`}</span>
                             </div>
                             <div className="favourite-svg">
                                 <BiCommentDetail onClick={()=> {
                                            dispatch(getFavMeal(item?.id))
                                            navigate("/saved")
                                            }}/>
                                 <AiOutlineClose onClick={() => deleteFav(item.id)}/>
                             </div>
                         </div>
                     </div>
                 </div>
                )) 
            ) : (
                <div className='favourite'>
                    <h5>No items is currently added to favourites...</h5>
                </div>
                    )
           } 
      </div>
  )
}

export default Favourite
