import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebase_Configue"

const initialState = {
    myFav : [],
    loading:false,
    error : ""
}

export const getFavourites = createAsyncThunk("favourites/getFavourites", async () =>{
    const userCollectionRef = collection(db, "users")
    const response = await getDocs(userCollectionRef)
    const data = await response.docs.map(doc => ({...doc.data(), id : doc.id}))
    // console.clear()
    return data
}) 

const favouriteSlice = createSlice({
    name : "favourites",
    initialState,
    reducers : {},
    extraReducers:{
        [getFavourites.pending] : (state) => {
            state.loading = true
        },
        [getFavourites.fulfilled] : (state, action) => {
            state.loading = false
            state.myFav = action.payload
        },
        [getFavourites.rejected] : (state) => {
            state.loading = false
        },
    },
})

export default favouriteSlice.reducer
