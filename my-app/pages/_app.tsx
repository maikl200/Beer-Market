import React from "react";

import {Provider} from "react-redux";
import {NextPage} from "next";
import {store} from "../redux/store";

import '../styles/globals.css'

interface props {
  Component: React.FC
  pageProps: any
}

const MyApp: NextPage<props> = ({Component, pageProps}) => {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
export default MyApp