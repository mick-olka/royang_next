import ProductsListPane from "../../components/products/ProductsListPane";
import OrderPage from "../../components/order_page/OrderPage";
import MainLayout from "../../components/MainLayout";
import {fetchNewOrder} from "../../lib/fetch_data";
import {useEffect} from "react";

// export async function getServerSideProps({query}) {
//     let page = 1, limit = 3;
//     if (query.page && query.page>0) page = query.page;
//     const prodData = await getProductsList(page, limit);
//     console.log("Got Data");
//     return {
//         props: {
//             prodData,
//             paginator: {
//                 page: page,
//                 limit: limit,
//                 count: prodData.count
//             }
//         },
//         // revalidate: 5,
//     }
// }

export default function OrderIndexPage ({orderPageProps}) {
    const cartData = orderPageProps.cartData;

    useEffect(()=> {
        if (localStorage.cart) orderPageProps.setCartData({...cartData, cart: JSON.parse(localStorage.cart)});
    }, []);
    const deleteItemByIndex0 =(index)=> {
        let cartCopy = [...cartData.cart];
        cartCopy.splice(index, 1);
        orderPageProps.setCartData({...cartData, cart: cartCopy});
        if (cartData.cart.length<2) localStorage.cart=JSON.stringify([]);    //  save cart items to localStorage on cart change
    }

    const createOrder0 = (data) => {
        //  fetch order creation
        fetchNewOrder(data);
    };

    const updateItemCount0 = (index, count) => {
        let cartCopy = [...cartData.cart];
        cartCopy[index].count = count;
        orderPageProps.setCartData({...cartData, cart: cartCopy});
    }


    return (
        <MainLayout >
            <OrderPage
                cartData={cartData}
                createOrder={createOrder0}
                deleteItemByIndex={deleteItemByIndex0}
                updateItemCount={updateItemCount0}
            />
        </MainLayout>
    );
}