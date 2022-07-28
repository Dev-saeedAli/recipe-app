

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = 
   {
        veggieMeal : [],
        loading: false,
        error : ""
    }

    export const getNonVeggieDetails = createAsyncThunk("veggieDetail/getNonVeggieDetails", async (id) =>{
            const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
                console.clear()
            return data.meals
        }) 

        export const getVeggieDetails = createAsyncThunk("veggieDetail/getVeggieDetails", async (id) =>{
                const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = await response.json()
                    console.clear()
               return data.meals
            }) 
        export const getTrendingDetails = createAsyncThunk("veggieDetail/getTrendingDetails", async (id) =>{
                const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = await response.json()
                    console.clear()
               return data.meals
            }) 
        export const getAreaMealDetails = createAsyncThunk("veggieDetail/getAreaMealDetails", async (id) =>{
                const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = await response.json()
                    console.clear()
               return data.meals
            }) 
        export const getFavMeal = createAsyncThunk("veggieDetail/getFavMeal", async (id) =>{
                const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = await response.json()
                    console.clear()
               return data.meals
            }) 
       
    
const veggieDetail = createSlice({
    name:"veggieDetail",
    initialState,
    reducers:{},
     
        extraReducers:{
            [getVeggieDetails.pending] : (state, action) => {
                    state.loading =  true
            },
            [getVeggieDetails.fulfilled] : (state, action) =>{
                    state.loading = false
                    state.veggieMeal =  action.payload
            },
            [getVeggieDetails.rejected] : (state, action) =>{
                    state.loading =  false
            },
            [getNonVeggieDetails.pending] : (state, action) => {
                state.loading = true
             },
             [getNonVeggieDetails.fulfilled] : (state, action) =>{
                     state.loading = false
                     state.veggieMeal = action.payload
             },
             [getNonVeggieDetails.rejected] : (state, action) =>{
                     state.loading =  false
             },
            [getTrendingDetails.pending] : (state, action) => {
                state.loading = true
             },
             [getTrendingDetails.fulfilled] : (state, action) =>{
                     state.loading = false
                     state.veggieMeal = action.payload
             },
             [getTrendingDetails.rejected] : (state, action) =>{
                     state.loading =  false
             },
            [getAreaMealDetails.pending] : (state, action) => {
                state.loading = true
             },
             [getAreaMealDetails.fulfilled] : (state, action) =>{
                     state.loading = false
                     state.veggieMeal = action.payload
             },
             [getAreaMealDetails.rejected] : (state, action) =>{
                     state.loading =  false
             },
            [getFavMeal.pending] : (state, action) => {
                state.loading = true
             },
             [getFavMeal.fulfilled] : (state, action) =>{
                     state.loading = false
                     state.veggieMeal = action.payload
             },
             [getFavMeal.rejected] : (state, action) =>{
                     state.loading =  false
             },
            }

})

export default veggieDetail.reducer
        