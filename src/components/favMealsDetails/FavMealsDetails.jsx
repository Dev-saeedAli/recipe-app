import { useNavigate } from 'react-router'
import "../../Container/detailsPage/detailpage.css"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { useSelector } from 'react-redux'
import { db } from '../../firebase/firebase_Configue'
import { arrayUnion, doc, updateDoc} from 'firebase/firestore'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const FavMealsDetails = () => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const { veggieMeal, loading } = useSelector(state => state.veggieDetail)
  const { user } = useSelector(state => state.users)
  const userDocs = doc(db, "users", user?.email)

      const addToCart = async (meal) => {
        if(user?.email){
           await updateDoc(userDocs, {
            cart : arrayUnion(
              {
                name : meal?.strMeal,
                image : meal?.strMealThumb,
                id : meal?.idMeal,
                price : `${Number(Math.ceil(Math.random() * 140 + 10)).toFixed(2)}`,
                quantity : 1,
              })
          })
          toast.success(`${meal?.strMeal} is added to your cart`, {
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
      }

  return (
    <>
      <div className="detail-header" onClick={()=> navigate("/search")}>
      <MdKeyboardArrowLeft/>
        <h4>Details</h4>
      </div>
            {
              loading ? (
                <div className='detail-section'>
                    <div className="detail-image">
                    <h1>Loading...</h1>
                  </div>
                </div>
              ):( 
                <div className='detail-section'>
                  <ToastContainer/> 
                <div key={veggieMeal[0]?.idMeal}>
                    <div className="detail-image">
                    <img src={veggieMeal[0]?.strMealThumb} alt="dish-image" />
                  </div>
                  <div className="detail-description">
                    <div className="detail-heading">
                        <h3>{veggieMeal[0]?.strMeal}</h3>
                    </div>
                    <div className="detail-para">
                      <p>{veggieMeal[0]?.strInstructions}</p>
                    </div>
                    <button className={checked ? `btn active` : "btn"} onClick={()=> {
                      addToCart(veggieMeal[0])
                      setChecked(true)
                    }}>{checked ? "Added to cart " : "Add to cart"}</button>
                  </div>
                  </div>
                </div>
              )
            }
    </>
  )
}

export default FavMealsDetails
