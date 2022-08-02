import React, {FC} from 'react';
import CustomizedTablesSalesHistory from "../UI/Table/TableSaleHistory";
import style from '../styles/itemsSold.module.scss'
import CustomizedButtons from "../UI/Button/Button";
import Link from "next/link";
import {wrapper} from "../redux/store";
import {parseCookies} from "nookies";
import {productSliceAction} from "../redux/beer/ProductsSlice";

const ItemsSold: FC = () => {
  return (
    <div className={style.main}>
      <div className={style.main_table}>
        <Link href='/'>
          <CustomizedButtons
            backColorHover='#0a3d62'
            backColor='#60a3bc'
            title='Home Page'
          />
        </Link>
        <div className={style.main_table_scroll}>
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