import Head from 'next/head'

import style from '../styles/index.module.scss'

import Link from 'next/link'
import CustomizedTablesMarket from "../UI/Table/TableMarket";
import CustomizedTablesBasket from "../UI/Table/TableBasket";
import {useAction} from "../hooks/useAction";
import {FormEvent, useState} from "react";
import CustomizedButtons from "../UI/Button/Button";

import {parseCookies} from "nookies";
import nookies from 'nookies'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {wrapper} from "../redux/store";
import {productSliceAction} from "../redux/beer/ProductsSlice";
import {ProductType} from "../redux/beer/ProductType";

const Index = () => {
  const {clearBasket, setProductBasket, setProductSale, setProductMarket} = useAction()
  const [card, setCard] = useState<ProductType>()
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false)
  const {basket, market, saleProduct} = useTypedSelector(state => state.products)

  const dragStartHandler = (product: ProductType) => {
    setCard(product)
  }

  const dragOverHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const dropHandler = (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className={style.wrapper}>
      <Head>
        <title>Beer market</title>
        <meta name="description" content="Generated by create next app"/>
      </Head>
      {isShowBtn &&
          <div className={style.wrapper_market_btn}>
            <Link href='/itemsSold'>
              <CustomizedButtons
                  backColorHover='#0a3d62'
                  backColor='#60a3bc'
                  title='Sales History'
              />
            </Link>
            <CustomizedButtons
                backColor='#079992'
                backColorHover='#78e08f'
                title='Sell'
                onClick={salesProduct}
            />
          </div>}
      <div className={style.wrapper_market}>
        <p className={style.wrapper_market_title}>Market</p>
        <CustomizedTablesMarket
          dragStartHandler={dragStartHandler}
        />

      </div>
      <div className={style.wrapper_basket}>
        <p className={style.wrapper_market_title}>Basket</p>
        <CustomizedTablesBasket
          setIsShowBtn={setIsShowBtn}
          dragOverHandler={dragOverHandler}
          dropHandler={dropHandler}
        />
      </div>
    </div>
  )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const response = await fetch('https://fakestoreapi.com/products?limit=6')
  const data = await response.json()
  const cookies = parseCookies(ctx)

  const dataBasketProduct = cookies.selectProduct ? await JSON.parse(cookies.selectProduct) : []
  const dataProduct = cookies.products ? await JSON.parse(cookies.products) : []
  const dataSaleProduct = cookies.saleProduct ? await JSON.parse(cookies.saleProduct) : []
  if (!dataProduct?.length && !dataBasketProduct?.length) {
    store.dispatch(productSliceAction.setProductMarket(data))
  } else {
    store.dispatch(productSliceAction.setProductMarket(dataProduct))
  }
  store.dispatch(productSliceAction.setProductBasket(dataBasketProduct))
  store.dispatch(productSliceAction.setProductSale(dataSaleProduct))

  return {props: {}}
})