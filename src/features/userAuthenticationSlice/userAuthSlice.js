import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { db, auth ,  provider } from "../../firebase/firebase_Configue"
// import { setDoc, doc } from "firebase/firestore"
import { signInWithPopup } from "firebase/auth"
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const collectionRef = collection(db, "users")


const userInfo = localStorage.getItem("user") != "" ? JSON.parse(localStorage.getItem("user")) : [];
const initialState = {
    user : userInfo ,
    loading : false,
    error : ""
} 

export const getUserDetails = createAsyncThunk("user/getUserDetails",  async () => {
   try{
    const response = await  signInWithPopup(auth, provider)
    const data = response.user
    const firebaseDoc  = await getDocs(collectionRef)
    await firebaseDoc.docs.map(doc => doc.data().email).map(email => {
        if(email.includes(data?.email)){
             updateDoc(doc(db, "users", data?.email), {
                email :  data?.email
            })
        }else{
             setDoc(doc(db, "users", data?.email), {
                email :  data?.email
            })
        }
    })
    const userData = {
        email : data?.email, 
        name : data.displayName,
        image : data?.photoURL
    }
    await localStorage.setItem("user", JSON.stringify(userData))
    await window.location.reload()

   }catch (error){
    console.log(error.message);
   }
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
    },
})

export default userAuth.reducer

