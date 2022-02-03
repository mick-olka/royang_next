import '../styles/globals.css'
import {useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [color, setColor] = useState("blue");
  const [cartData, setCartData] = useState({
    cart: [],   //  for client
    sum: 0,
    orderData: {
      _id: null,
    },
  });

  const addItemToCart = (data) => {
    setCartData({...cartData, cart: [...cartData.cart, data]});
    router.push('/order');
  }

  const orderPageProps = {
    addItemToCart: addItemToCart,
    setCartData: setCartData,
    cartData: cartData
  }

  const myProps = {color, setColor,
    orderPageProps: {
      addItemToCart: addItemToCart,
      setCartData: setCartData,
      cartData: cartData
    }
  };

  return <>
    <Head>
      <meta name="viewport" content="width=960px, initial-scale=0" />
    </Head>
    <Component myProps={myProps} orderPageProps={orderPageProps} {...pageProps} />
  </>
}

export default MyApp;
