import React from 'react';
import s from "./InfoPage.module.css";
import Sales from "./Sales";
import Contacts from "./Contacts";
import {useRouter} from "next/router";

function createMarkup(text) {
    return {__html: text};
}

function InfoPage({text_data}) {
    const {locale} = useRouter();
    return (
        <div className={s.info_page}>

            <div className={s.article}>
                <span style={{height: "1px"}} id={"discounts"}> </span>
                <Sales text = {text_data.about_discounts.text} />
            </div>

            <div className={s.article}>
                <span id={"delivery"}> </span>
                <h2 className={s.article_header}>Про Доставку</h2>
                <div dangerouslySetInnerHTML={createMarkup(text_data.about_delivery.text)} />
            </div>

            <div className={s.article}>
                <span id={"payment"}> </span>
                <h2 className={s.article_header}>Оплата</h2>
                <div dangerouslySetInnerHTML={createMarkup(text_data.about_payment.text)} />
            </div>

            <div className={s.article}>
                <span id={"contacts"}> </span>
                <Contacts text={text_data.about_contacts.text} />
            </div>

            <div className={s.article}>
                <span id={"rotang"}> </span>

                <h2 className={s.article_header}>Про Ротанг</h2>
                <div>
                    {text_data.about_rotang.text.split('\n').map((p, i)=>{
                        return <p key={'about_rotang_'+i} className={s.article_part}>{p}</p>
                    })}
                </div>
                <br/>
                <div>
                    {text_data.about_plastic_rotang.text.split('\n').map((p, i)=>{
                        return <p key={'about_p_rotang_'+i} className={s.article_part}>{p}</p>
                    })}
                </div>
            </div>

        </div>
    );
}

export default InfoPage;