import React from 'react';
import {useFormik} from "formik";
import s from "./OrderPage.module.css";
import {myFormInput} from "../../utils/form_utils";

const validate = values => {
    const errors = {};
    const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

    if (!values.name) {
        errors.name = "Обов'язкове поле";
        document.getElementById("name").style.boxShadow="1px 1px 2px 2px rgb(161, 31, 31)";
    } else if (values.name.length < 2) {
        errors.name = "Ім'я повинно бути довшим :)";
        document.getElementById("name").style.boxShadow="1px 1px 2px 2px rgb(161, 31, 31)";
    } else {
        document.getElementById("name").style.boxShadow="1px 1px 2px 2px rgb(0, 161, 31)";
    }

    if (!values.phone) {
        errors.phone = "Обов'язкове поле";
        document.getElementById("phone").style.boxShadow="1px 1px 2px 2px rgb(161, 31, 31)";
    } else if (!phoneRegExp.test(values.phone)) {
        errors.phone = "Приклад: 0961234567";
        document.getElementById("phone").style.boxShadow="1px 1px 2px 2px rgb(161, 31, 31)";
    } else {
        document.getElementById("phone").style.boxShadow="1px 1px 2px 2px rgb(0, 161, 31)";
    }

    return errors;
};

function OrderForm({onSubmit, cartData, setCartData}) {
    const handleChange = (e) => {
        setCartData({...cartData, [e.target.name]: e.target.value});
        //console.log({key: e.target.name, value: e.target.value});
    }
    const formik = useFormik({
        initialValues: {
            name: cartData.name,
            phone: cartData.phone,
            message: cartData.message,
        },
        validate,
        onSubmit: values => {
            onSubmit(values);
        }
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form_input_item} >
                <label htmlFor="name">Ім&apos;я</label>
                {myFormInput("name", "text", cartData.name, (e)=>{handleChange(e); formik.handleChange(e)})}
                    {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                </div>

                <div className={s.form_input_item} >
                <label htmlFor="phone">Телефон</label>
                {myFormInput("phone", "text", cartData.phone, (e)=>{handleChange(e); formik.handleChange(e)})}
                    {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                </div>

                <div className={s.form_input_item} id={s.comment} >
                <label htmlFor="message">Коментарій</label>
                    <textarea
                        id={"message"}
                        name={"message"}
                        rows={5}
                        onChange={(e)=>{handleChange(e); formik.handleChange(e)}}
                        value={cartData.message}
                        placeholder={"Місце доставки, запитання"}
                    />
                </div>
                {formik.errors.message ? <div>{formik.errors.message}</div> : null}

                <div><button className={s.submit_btn} type="submit" >Підтвердити  Замовлення</button></div>
            </form>
        </div>
    );
}

export default OrderForm;