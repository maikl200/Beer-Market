import React, {FC} from 'react';

import {parseCookies} from "nookies";

import {wrapper} from "../redux/store";
import {productSliceAction} from "../redux/product/ProductsSlice";
import CustomizedTablesSalesHistory from "../UI/Table/TableSaleHistory";

import style from '../styles/itemsSold.module.scss'

const ItemsSold: FC = () => {
  return (
    <div className={style.main}>
      <div className={style.main_table}>
        <div className={style.main_table_title}>
          <p>Sell history</p>
          <CustomizedTablesSalesHistory/>
        </div>
      </div>
    </div>
  );
};

export default ItemsSold;

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const cookies = parseCookies(ctx)
  const dataSaleProduct = cookies.saleProduct ? await JSON.parse(cookies.saleProduct) : []
  store.dispatch(productSliceAction.setProductSale(dataSaleProduct))

  return {props: {}}
})