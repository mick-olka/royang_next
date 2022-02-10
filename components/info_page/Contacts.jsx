import React from 'react';
import s from "./InfoPage.module.css";

function Contacts(props) {
    return (
        <div>
            <h2 className={s.article_header} > Контакти: </h2>

            <p style={{fontWeight: "bolder", margin: "1.5rem 0 0.5rem"}} >1. Київська область:</p>

            <p>м. Ірпінь, вул. Українська, 83Б (Офіс)</p>
            <p>м. Київ (виїзд кур&apos;єра)</p>
            <p>(044) 383-58-53</p>
            <p>(095) 595-98-03</p>
            <p>м. Біла Церква (виїзд кур&apos;єра)</p>
            <p>(096) 565-90-71</p>

            <p style={{fontWeight: "bolder", margin: "1.5rem 0 0.5rem"}} >Електронна пошта:</p>
            <p><a href="mailto:mail@rotang.ua"> mail@rotang.ua</a></p>

        </div>
    );
}

export default Contacts;