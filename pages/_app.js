import '../styles/basic.css';
import '../styles/globals.css';
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export const siteTitle = 'Rotang.ua';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [cartData, setCartData] = useState({
    cart: [],   //  for client
    name: "",
    phone: "",
    message: "",
    sum: 0,
    orderData: {
      _id: null,
    },
  });

  const addItemToCart = (data) => {
    let sameProd = cartData.cart.map(i => { return i.code }).indexOf(data.code);
    if (sameProd === -1) {
      setCartData({ ...cartData, cart: [...cartData.cart, data] });
    } else {
      let cartCopy = [...cartData.cart];
      cartCopy[sameProd].count = +cartCopy[sameProd].count + +data.count;
      setCartData({ ...cartData, cart: cartCopy });
    }
    router.push('/order');
  }

  const orderPageProps = {
    addItemToCart: addItemToCart,
    setCartData: setCartData,
    cartData: cartData
  }

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      <meta name="google-site-verification" content="s89xGRHI8UqR659S3K6FpdGAoCI-8IGVgNNf9TCMPPg" />
      <title>Rotang.ua</title>
    </Head>
    <Component orderPageProps={orderPageProps} {...pageProps} />
  </>
}

export default MyApp;
