import React, {useEffect, useState} from 'react';
import OrderForm from "./OrderForm";
import s from "./OrderPage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

function OrderPage({cartData, deleteItemByIndex, createOrder, updateItemCount}) {

    const router = useRouter();
    const [alert, setAlert] =useState(null);  //  in case user haven't chosen product and pressed confirm
    const [summ, setSumm] = useState(0);
    useEffect(()=>{
        if (cartData.cart.length>0) localStorage.cart=JSON.stringify(cartData.cart);    //  save cart items to localStorage on cart change
        let gSumm = 0;
        cartData.cart.forEach(i=>{
            gSumm+=i.price*i.count;
        });
        setSumm(gSumm);
    }, [cartData]);

    const onSubmit = (values) => {
        let orderData = {...values, sum: cartData.sum, cart: cartData.cart};
        if (orderData.cart.length>0) {
            setAlert(null);
            createOrder(orderData);
            for (let i=0; i<cartData.cart.length; i++) {
                deleteItemByIndex(cartData.cart[i].index);
            }
            router.push("/order_done");
        }
        else setAlert("Спочатку Оберіть Товар :)");
    }

    return (
        <div className={s.container} >
            <h1 className={s.heading_h} >Корзина</h1>
            <div className={s.cart_box}>
                {cartData.cart.length<1 && <p>Корзина пуста</p>}
                {cartData.cart.length>0 && cartData.cart.map((item, i)=>{
                    return <div key={item.code} className={s.cart_item} > {/*need more complex key*/}
                        <Image className={s.thumbnail} src={item.photo} alt="prod_img"/>
                        <p><Link href={"products/"+item.product} passHref ><a>{item.name}</a></Link></p>
                        <p>колір: {item.mainColor}/{item.pillColor}</p>
                        <span>к-ть: </span><input type="number" onChange={
                            (e) => {
                                updateItemCount(i, e.target.value)
                            }}
                            min="1" value={item.count} />
                        <p>вартість: {item.price*item.count}</p>
                        <button className={s.delete_btn} onClick={()=>deleteItemByIndex(item.index)} > </button>
                    </div>
                })}

            </div>
            <div style={{width: "fit-content", margin: "0 auto"}} >
            <Link href="/" passHref ><a><p className={s.go_choose} >Додати Товар</p></a></Link>
            </div>

            <div className={s.form_box}>
            <div><p className={s.sum_p} >Всього: {summ} грн</p></div>

            <OrderForm onSubmit={onSubmit} />
            <div className={s.alert} >{alert}</div>

            </div>
        </div>
    );
}

export default OrderPage;