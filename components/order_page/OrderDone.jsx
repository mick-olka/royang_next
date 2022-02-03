import React from 'react';
import s from "./OrderPage.module.css";
import global_data from "../../utils/global_data";

function OrderDone() {
    return (
                <div className={s.order_done_div} >
                    <p>Ваше замовлення вже на розгляді</p>
                    <br/>
                    <p>З Вами зв&apos;яжеться співробітник</p>
                    <br/>
                    <p>Є питання? Подзвоніть нам!</p>
                    <br/><br/>
                    <ul>
                        <li><a href={"tel:"+ global_data.phones[0]}>{global_data.phones[0]}</a></li>
                        <li><br/></li>
                        <li><a href={"tel:"+ global_data.phones[1]}>{global_data.phones[1]}</a></li>
                        <li><br/></li>
                        <li><a href={"tel:"+ global_data.phones[2]}>{global_data.phones[2]}</a></li>
                    </ul>

                </div>

    );
}

export default OrderDone;