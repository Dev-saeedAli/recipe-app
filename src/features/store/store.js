import { configureStore } from "@reduxjs/toolkit"
import veggieSliceReducer from "../veggieSlice/VeggieSlice"
import nonVeggieSliceReducer from "../nonveggieSlice/nonveggieSlice"
import trendingSliceReducer from "../trendingSlice/trendingSlice"
import veggieDetailReducer from "../veggieSlice/veggieDetails"
import areaMealsSliceReducer from "../areaMealsSlice/areaMealsSlice"
import favouriteSliceReducer from "../favourtieSlice/favouriteSlice"
import userAuthSliceReducer from "../userAuthenticationSlice/userAuthSlice"
import cartSliceReducer from "../cartSlice/cartSlice"

const store = configureStore({
    reducer:{
        veggie : veggieSliceReducer,
        veggieDetail:  veggieDetailReducer,
        nonVeggie : nonVeggieSliceReducer,
        trends : trendingSliceReducer,
        meals : areaMealsSliceReducer,
        favourites : favouriteSliceReducer,
        users : userAuthSliceReducer,
        cart : cartSliceReducer,
    }
})  

export default store