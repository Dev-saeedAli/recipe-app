import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    meals:[],
    loading : false,
    error : "",
}

export const getAreaMeals = createAsyncThunk("areaMeals/getAreaMeals", async (name) => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
        const data = await response.json()
        console.clear()
        return data.meals
    }catch (error) {
        return error.message
    }
})
export const getMealDetails = createAsyncThunk("areaMeals/getMealDetails", async (name, {rejectWithValue}) =>{
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        const data = await response.json()
        console.clear()
       return data.meals

    }catch (error) {
        return error.message
    }
}) 

const areaMealsSlice = createSlice({
    name : "areaMeals",
    initialState,
    reducers:{},
    extraReducers:{
        [getAreaMeals.pending] : (state, action) => {
            state.loading = true
        },
        [getAreaMeals.fulfilled] : (state, action) => {
            state.loading = false
            state.meals = action.payload
        },
        [getAreaMeals.rejected] : (state, action) => {
            state.loading = false
            state.meals = []
            state.error = action.payload
        },
        [getMealDetails.pending] : (state, action) => {
            state.loading = true
         },
         [getMealDetails.fulfilled] : (state, action) =>{
                 state.loading = false
                 state.meals = action.payload
         },
         [getMealDetails.rejected] : (state, action) =>{
                 state.loading =  false
                 state.meals = []
                 state.error = action.payload
         },
    },
})

export default areaMealsSlice.reducer