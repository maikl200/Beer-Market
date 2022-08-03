import React from "react";

import {NextPage} from "next";

import ResponsiveAppBar from "../UI/Header/Header";
import {wrapper} from "../redux/store";

import '../styles/globals.css'

interface props {
  Component: React.FC
  pageProps: {}
}

const MyApp: NextPage<props> = ({Component, pageProps}) => {
  return (
    <>
      <ResponsiveAppBar/>
      <Component {...pageProps}/>
    </>
  )
}

export default wrapper.withRedux(MyApp)