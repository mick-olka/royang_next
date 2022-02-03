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
  //
  // const delCartItemByIndex = (index) => {
  //   let cartCopy = [...cartData.cart];
  //   cartCopy.splice(index, 1);
  //   setCartData({...cartData, cart: cartCopy});
  // }
  //
  // const createOrder = (data) => {
  //   //  fetch order creation
  //   fetchNewOrder(data);
  // };
  //
  // const updateItemCount = (index, count) => {
  //   let cartCopy = [...cartData.cart];
  //   cartCopy[index].count = count;
  //   setCartData({...cartData, cart: cartCopy});
  // }

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
