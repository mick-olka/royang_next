import React from 'react';
import s from "./InfoPage.module.css";
import Image from "next/image";
import {useRouter} from "next/router";

function Colors({colors}) {
    const {locale} = useRouter();
    const getImageByName = (name) => {
        let src;
        let colors0 = colors || [];
        colors0.find(c => c.name===name) ? src = colors0.find(c => c.name===name).src : src = "/images/chair.png/";
        return <div><Image
            src={src}
            width={640}
            height={640}
            objectFit={'contain'}
            alt='color_photo'
        /></div>
    }

    return (
        <div className={s.colors_div}>

            <table >
                <tbody>
                <tr>
                    <td >
                        <h1 className={s.article_header} >{locale==='ua'?"Вибір кольору":"Выбор цвета"}</h1>
                        <span >
      <p><span><strong>{locale==='ua'?"1. Варіанти кольору меблів із натурального ротанга:":"1. Варианты цвета мебели из натурального ротанга:"}</strong></span></p>
                             <br/><br/>
<p>1.1. Коньяк</p>
<div>{getImageByName('коньяк')}</div>
<p>1.2. Шоколад</p>
<div>{getImageByName("шоколад")}</div>
<p>1.3. Олива</p>
<div>{getImageByName("олива")}</div>
<p>1.4. Мед</p>
<div>{getImageByName("мед")}</div>
<p>{locale==='ua'?"1.5. Кава":"1.5. Кофе"}</p>
<p>&nbsp;</p>
<div>{getImageByName("кава")}</div>
<p>&nbsp;</p>
<p><span><strong>{locale==='ua'?"2.Варіанти кольору плетіння для виробів із штучного ротанга:":"2.Варианты цвета плетения для изделий из исскуственного ротанга:"}</strong></span></p>
                            <br/><br/>
<h3>{locale==='ua'?"2.1. Білий":"2.1. Белый"}</h3>
<div>{getImageByName("білий")}</div>
<div>{getImageByName("білий_столик")}</div>
<h3>2.2. Крем</h3>
<div>{getImageByName("крем")}</div>
<div>{getImageByName("крем_крісло")}</div>
<p>&nbsp;</p>
<h3>{locale==='ua'?"2.3. Сірий":"2.3. Серый"}</h3>
<div>{getImageByName("сірий")}</div>
<div>{getImageByName("сірий_крісло")}</div>
<h3>{locale==='ua'?"2.4. Коричневий":"2.4. Коричневый"}</h3>
<div>{getImageByName("коричневий")}</div>
<div>{getImageByName("коричневий_крісло")}</div>
<h3>{locale==='ua'?"2.5. Графіт":"2.5. Графит"}</h3>
<div>{getImageByName("графіт")}</div>
<div>{getImageByName("графіт_крісло")}</div>
<h3>{locale==='ua'?"2.6. Чорний":"2.6. Чёрный"}</h3>
<div>{getImageByName("чорний")}</div>
<div>{getImageByName("чорний_крісло")}</div>
<p><span><strong>{locale==='ua'?"3.Варіанти кольору тканини для меблів зі штучного ротанга:":"3.Варианты цвета ткани для мебели из штучного ротанга:"}</strong></span></p>
                            <br/><br/>
<p><span><strong>{locale==='ua'?"Тканина":"Ткань"} №1</strong></span></p>
<div>{getImageByName("тканина_1")}</div>

<p><span><strong><strong>{locale==='ua'?"Тканина":"Ткань"} №2</strong></strong></span></p>
<div>{getImageByName("тканина_2")}</div>

<p><span><strong><strong>{locale==='ua'?"Тканина":"Ткань"} №3</strong></strong></span></p>
<div>{getImageByName("тканина_3")}</div>
<p><span><strong><strong><strong><strong>{locale==='ua'?"Тканина":"Ткань"} №4</strong></strong></strong></strong></span></p>
<div>{getImageByName("тканина_4")}</div>
<p><span><strong>{locale==='ua'?"Тканина":"Ткань"} №5</strong></span></p>
<div>{getImageByName("тканина_5")}</div>
<p><span
><strong><strong><strong><strong><strong><strong>{locale==='ua'?"Тканина №6 з":"Ткань №6 с"} пропиткою</strong></strong></strong></strong></strong></strong></span></p>
<div>{getImageByName("тканина_6_пропитка")}</div>
<p><span><strong>{locale==='ua'?"Тканина №7 з":"Ткань №7 с"} пропиткою</strong></span></p>
<div>{getImageByName("тканина_7_пропитка")}</div>
    </span>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default Colors;