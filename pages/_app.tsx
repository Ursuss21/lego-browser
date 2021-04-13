import React from "react";
import "../styles/style.scss";

interface IProps {
  Component: any;
  pageProps: any;
}

function MyApp({ Component, pageProps }: IProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
