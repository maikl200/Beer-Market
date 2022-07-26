import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {beersType} from "./beersType";

export const selectedBeerSlice = createSlice({
  name: 'selectedBeer',
  initialState: {
    selectBeer: [] as beersType[]
  } ,
  reducers: {
    addBeer: (state, action: PayloadAction<beersType>) => {
      state.selectBeer.push(action.payload)
    }
  }
})

export const selectBeerReducer = selectedBeerSlice.reducer
export const selectBeerAction = selectedBeerSlice.actions