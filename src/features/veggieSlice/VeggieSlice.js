import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = 
    {
        veggies : [],
        areaMeals : [],
        loading: false,
        error : ""
    }

    export const getVeggies = createAsyncThunk("veggie/getVeggies", async () =>{
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian");
        const data = await response.json()
        console.clear()
        return data.meals;
    })

const veggieSlice = createSlice({
    name:"veggie",
    initialState,
    reducers:{},
    // geeting veggies from api
    extraReducers:{
        [getVeggies.pending] : (state, action) => {
            return {
                ...state,
                loading : true,
                veggies : []
            }
        },
        [getVeggies.fulfilled] : (state, action) =>{
            return {
                ...state,
                loading : false,
                veggies : action.payload
            }
        },
        [getVeggies.rejected] : (state, action) =>{
            return {
                ...state,
                loading : false,
                veggies : [],
            }
        },
    },
   
})

export default veggieSlice.reducer