import * as React from "react";
import {useState} from "react";
import nookies from "nookies";

import {useAction} from "./useAction";
import {useTypedSelector} from "./useTypedSelector";

import {ProductType} from "../redux/product/ProductType";

export const useProductMarket = () => {
  const {clearBasket, setProductBasket, setProductSale, setProductMarket} = useAction()
  const [card, setCard] = useState<ProductType>()
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false)

  const {basket, market, saleProduct} = useTypedSelector(state => state.products)

  const dragStartHandler = (product: ProductType) => {
    setCard(product)
  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const filterProduct = market?.filter((item) => item.id !== card!.id)
    setProductMarket(filterProduct)
    nookies.set(null, 'products', JSON.stringify(filterProduct))
    nookies.set(null, 'selectProduct', JSON.stringify([...basket, card]))
    setProductBasket([...basket, card])
  }

  const salesProduct = () => {
    setProductSale([...saleProduct, ...basket])
    nookies.set(null, 'saleProduct', JSON.stringify([...saleProduct, ...basket]))
    nookies.set(null, 'selectProduct', JSON.stringify([]))
    clearBasket([])
    setIsShowBtn(false)
  }

  return {
    dragStartHandler,
    dragOverHandler,
    dropHandler,
    isShowBtn,
    setIsShowBtn,
    salesProduct,
  }
}