import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection,  getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase_Configue";


const initialState = 
    {
        cartItems : [],
        loading : false,
    }


export const getCartItems = createAsyncThunk("cart/getCartItems", async () =>{
    const userCollectionRef =await  collection(db, "users")
    const response = await getDocs(userCollectionRef)
    const data = await response.docs.map(doc => ({...doc.data(), id : doc.id}))
    return data
}) 

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {},
    extraReducers : {
        [getCartItems.pending] : (state) => {
            state.loading = true
        },
        [getCartItems.fulfilled] : (state, action) => {
            state.loading = false
            state.cartItems = action.payload
        },
        [getCartItems.pending] : (state) => {
            state.loading = false
        },
    }
})

export default cartSlice.reducer