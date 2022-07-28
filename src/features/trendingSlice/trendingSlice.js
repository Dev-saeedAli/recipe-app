import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = 
    {
        trending : [],
        loading: false,
        error : ""
    }


export const getTrending = createAsyncThunk("trending/getTrending", async () =>{
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");
        const data = await response.json()
        console.clear()
        return data.meals;
    })

const trendingSlice = createSlice({
    name:"trending",
    initialState,
    reducers:{},
    extraReducers:{
        [getTrending.pending] : (state, action) => {
            return {
                ...state,
                loading : true,
                trending : []
            }
        },
        [getTrending.fulfilled] : (state, action) =>{
            return {
                ...state,
                loading : false,
                trending : action.payload
            }
        },
        [getTrending.rejected] : (state, action) =>{
            return {
                ...state,
                loading : false,
                trending : [],
            }
        },
    }
})

export default trendingSlice.reducer