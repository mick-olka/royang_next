import React from 'react';
import s from "./InfoPage.module.css";
import {useRouter} from "next/router";
function createMarkup(text) {
    return {__html: text};
}
function Contacts({text}) {
    const {locale} = useRouter();
    return (
        <div>
            <h2 className={s.article_header} >{locale==="ua"? "Контакти:":"Contacts"} </h2>

                <div dangerouslySetInnerHTML={createMarkup(text)} />

        </div>
    );
}

export default Contacts;