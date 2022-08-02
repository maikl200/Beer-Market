import React from "react";

import {NextPage} from "next";
import {wrapper} from "../redux/store";

import '../styles/globals.css'

interface props {
  Component: React.FC
  pageProps: {}
}

const MyApp: NextPage<props> = ({Component, pageProps}) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)