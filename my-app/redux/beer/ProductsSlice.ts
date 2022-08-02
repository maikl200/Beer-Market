import {createSlice} from "@reduxjs/toolkit";
import {ProductType} from "./ProductType";
import {HYDRATE} from "next-redux-wrapper";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    basket: [] as ProductType[],
    market: [] as ProductType[],
    saleProduct: [] as ProductType[]
  },
  reducers: {
    setProductBasket: (state, action) => {
      console.log(action.payload)
      state.basket = action.payload
    },
    clearBasket: (state, action) => {
      console.log(action.payload)
      state.basket = action.payload
    },
    setProductMarket: (state, action) => {
      state.market = action.payload
    },
    setProductSale: (state, action) => {
      state.saleProduct = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.market = action.payload.products.market
      state.basket = action.payload.products.basket
      state.saleProduct = action.payload.products.saleProduct
    }
  }
})

export const productSliceReducer = productSlice.reducer
export const productSliceAction = productSlice.actions