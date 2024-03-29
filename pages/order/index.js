import OrderPage from "../../components/order_page/OrderPage";
import MainLayout from "../../components/MainLayout";
import { fetchNewOrder, getLayoutData } from "../../lib/fetch_data";
import React, { useEffect } from "react";
import Head from "next/head";

export async function getStaticProps({ locale }) {
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            layoutData,
            locale
        },
        // revalidate: 5,
    }
}
export default function OrderIndexPage({ orderPageProps, layoutData, locale }) {
    const cartData = orderPageProps.cartData;

    useEffect(() => {
        if (localStorage.cart) orderPageProps.setCartData({ ...cartData, cart: JSON.parse(localStorage.cart) });
    }, []);
    const deleteItemByIndex0 = (index) => {
        let cartCopy = [...cartData.cart];
        cartCopy.splice(index, 1);
        orderPageProps.setCartData({ ...cartData, cart: cartCopy });
        if (cartData.cart.length < 2) localStorage.cart = JSON.stringify([]);    //  save cart items to localStorage on cart change
    }

    const createOrder0 = (orderData) => {
        //  fetch order creation
        fetchNewOrder(orderData);   //  {...formData, cart: cart}
    };

    const updateItemCount0 = (index, count) => {
        let cartCopy = [...cartData.cart];
        cartCopy[index].count = count;
        orderPageProps.setCartData({ ...cartData, cart: cartCopy });
    }


    return (
        <MainLayout layoutData={layoutData} >
            <Head>
                <title>Корзина</title>
            </Head>
            <OrderPage
                cartData={cartData}
                setCartData={orderPageProps.setCartData}
                createOrder={createOrder0}
                deleteItemByIndex={deleteItemByIndex0}
                updateItemCount={updateItemCount0}
                locale={locale}
            />
        </MainLayout>
    );
}