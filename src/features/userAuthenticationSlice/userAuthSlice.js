import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { db, auth ,  provider } from "../../firebase/firebase_Configue"
// import { setDoc, doc } from "firebase/firestore"
import { signInWithPopup } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";


const userInfo = localStorage.getItem("user") != "" ? JSON.parse(localStorage.getItem("user")) : [];

const initialState = {
    user : userInfo ,
    loading : false,
    error : ""
} 

export const getUserDetails = createAsyncThunk("user/getUserDetails",  async () => {
    const response = await signInWithPopup(auth, provider)
    const data = await response.user
    const userList = await  {
        name : data.displayName,
        photo : data.photoURL,
        email : data.email
    }
    await localStorage.setItem("user", JSON.stringify(userList))
    await window.location.reload()

})

export const fetchData = createAsyncThunk("user/fetchData", async (user) => {
    await setDoc(doc(db, "users", user), {
       ...db,
        name : user
    })
})  


const userAuth = createSlice({
    name : "user",
    initialState,
    reducers : {},
    extraReducers:{
        [getUserDetails.pending] : (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled] : (state, action) => {
            state.loading = false
        },
        [getUserDetails.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [fetchData.pending] : (state) => {
            state.loading = true
        },
        [fetchData.fulfilled] : (state, action) => {
            state.loading = false
        },
        [fetchData.rejected] : (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export default userAuth.reducer

