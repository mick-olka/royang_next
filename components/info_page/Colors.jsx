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
                        <h1 className={s.article_header} >{locale==='ua'?"Вибір кольору":"Color"}</h1>
                        <span >
      <p><span><strong>{locale==='ua'?"1. Варіанти кольору меблів із натурального ротанга:":"1. Natural rotang colors:"}</strong></span></p>
                             <br/><br/>
<p>{locale==='ua'?"1.1. Коньяк":"1.1. Brandy"}</p>
<div>{getImageByName('коньяк')}</div>
<p>{locale==='ua'?"1.2. Шоколад":"1.2. Chocolate"}</p>
<div>{getImageByName("шоколад")}</div>
<p>{locale==='ua'?"1.3. Олива":"1.3. Oliva"}</p>
<div>{getImageByName("олива")}</div>
<p>{locale==='ua'?"1.4. Мед":"1.4. Honey"}</p>
<div>{getImageByName("мед")}</div>
<p>{locale==='ua'?"1.5. Кава":"1.5. Coffee"}</p>
<p>&nbsp;</p>
<div>{getImageByName("кава")}</div>
<p>&nbsp;</p>
<p><span><strong>{locale==='ua'?"2.Варіанти кольору плетіння для виробів із штучного ротанга:":"2. Plastic rotang colors:"}</strong></span></p>
                            <br/><br/>
<h3>{locale==='ua'?"2.1. Білий":"2.1. White"}</h3>
<div>{getImageByName("білий")}</div>
<div>{getImageByName("білий_столик")}</div>
<h3>{locale==='ua'?"2.2. Крем":"1.5. Cream"}</h3>
<div>{getImageByName("крем")}</div>
<div>{getImageByName("крем_крісло")}</div>
<p>&nbsp;</p>
<h3>{locale==='ua'?"2.3. Сірий":"2.3. Grey"}</h3>
<div>{getImageByName("сірий")}</div>
<div>{getImageByName("сірий_крісло")}</div>
<h3>{locale==='ua'?"2.4. Коричневий":"2.4. Brown"}</h3>
<div>{getImageByName("коричневий")}</div>
<div>{getImageByName("коричневий_крісло")}</div>
<h3>{locale==='ua'?"2.5. Графіт":"2.5. Graphite"}</h3>
<div>{getImageByName("графіт")}</div>
<div>{getImageByName("графіт_крісло")}</div>
<h3>{locale==='ua'?"2.6. Чорний":"2.6. Black"}</h3>
<div>{getImageByName("чорний")}</div>
<div>{getImageByName("чорний_крісло")}</div>
<p><span><strong>{locale==='ua'?"3.Варіанти кольору тканини для меблів зі штучного ротанга:":"3. Colors of fabric for plastic rotang:"}</strong></span></p>
                            <br/><br/>
<p><span><strong>{locale==='ua'?"Тканина":"Fabric"} №1</strong></span></p>
<div>{getImageByName("тканина_1")}</div>

<p><span><strong><strong>{locale==='ua'?"Тканина":"Fabric"} №2</strong></strong></span></p>
<div>{getImageByName("тканина_2")}</div>

<p><span><strong><strong>{locale==='ua'?"Тканина":"Fabric"} №3</strong></strong></span></p>
<div>{getImageByName("тканина_3")}</div>
<p><span><strong><strong><strong><strong>{locale==='ua'?"Тканина":"Fabric"} №4</strong></strong></strong></strong></span></p>
<div>{getImageByName("тканина_4")}</div>
<p><span><strong>{locale==='ua'?"Тканина":"Fabric"} №5</strong></span></p>
<div>{getImageByName("тканина_5")}</div>
<p><span
><strong><strong><strong><strong><strong><strong>{locale==='ua'?"Тканина №6 з":"Fabric №6 с"} пропиткою</strong></strong></strong></strong></strong></strong></span></p>
<div>{getImageByName("тканина_6_пропитка")}</div>
<p><span><strong>{locale==='ua'?"Тканина №7 з":"Fabric №7 с"} пропиткою</strong></span></p>
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