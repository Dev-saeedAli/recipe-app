import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = 
    {
        nonveggies : [],
        loading: false,
        error : ""
    }


export const getNonVeggies = createAsyncThunk("nonveggie/getNonVeggies", async () =>{
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken");
        const data = await response.json()
        console.clear()
        return data.meals;
    })

const nonVeggieSlice = createSlice({
    name:"nonveggie",
    initialState,
    reducers:{},
    extraReducers:{
        [getNonVeggies.pending] : (state, action) => {
            return {
                ...state,
                loading : true,
                nonveggies : []
            }
        },
        [getNonVeggies.fulfilled] : (state, action) =>{
            return {
                ...state,
                loading : false,
                nonveggies : action.payload
            }
        },
        [getNonVeggies.rejected] : (state, action) =>{
            return {
                ...state,
                loading : false,
                nonveggies : [],
            }
        },
    }
})

export default nonVeggieSlice.reducer