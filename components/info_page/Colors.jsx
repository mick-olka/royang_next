import React from 'react';
import s from "./InfoPage.module.css";
import Image from "next/image";

function Colors({colors}) {

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
                        <h1 className={s.article_header} >Вибір кольору</h1>
                        <span >
      <p><span><strong>1. Варіанти кольору меблів із натурального ротанга:</strong></span></p>
                             <br/><br/>
<p>1.1. Коньяк</p>
<p>{getImageByName('коньяк')}</p>
<p>1.2. Шоколад</p>
<p>{getImageByName("шоколад")}</p>
<p>1.3. Олива</p>
<p>{getImageByName("олива")}</p>
<p>1.4. Мед</p>
<p>{getImageByName("мед")}</p>
<p>1.5. Кава</p>
<p>&nbsp;</p>
<p>{getImageByName("кава")}</p>
<p>&nbsp;</p>
<p><span><strong>2.Варіанти кольору плетіння для виробів із штучного ротанга:</strong></span></p>
<p><span><strong>Цех плетіння №1</strong></span></p>
                             <br/><br/>
<h3>2.1. Білий</h3>
<p>{getImageByName("білий")}</p>
<p>{getImageByName("білий_столик")}</p>
<h3>2.2. Крем</h3>
<p>{getImageByName("крем")}</p>
<p>{getImageByName("крем_крісло")}</p>
<p>&nbsp;</p>
<h3>2.3. Сірий</h3>
<p>{getImageByName("сірий")}</p>
<p>{getImageByName("сірий_крісло")}</p>
<h3>2.4. Коричневий</h3>
<p>{getImageByName("коричневий")}</p>
<p>{getImageByName("коричневий_крісло")}</p>
<h3>2.5. Графіт</h3>
<p>{getImageByName("графіт")}</p>
<p>{getImageByName("графіт_крісло")}</p>
<h3>2.6. Чорний</h3>
<p>{getImageByName("чорний")}</p>
<p>{getImageByName("чорний_крісло")}</p>
<p><span><strong>3.Варіанти кольору тканини для меблів зі штучного ротанга:</strong></span></p>
                            <br/><br/>
<p><span><strong>Тканина №1</strong></span></p>
<p><span><strong>&nbsp;</strong></span><span><strong>{getImageByName("тканина_1")}</strong></span></p>

<p><span><strong><strong>Тканина №2</strong></strong></span></p>
<p>{getImageByName("тканина_2")}</p>

<p><span><strong><strong>Тканина №3</strong></strong></span></p>
<p>{getImageByName("тканина_3")}</p>
<p><span><strong><strong><strong><strong>Тканина №4</strong></strong></strong></strong></span></p>
<p>{getImageByName("тканина_4")}</p>
<p><span><strong>Тканина №5</strong></span></p>
<p><span><strong>{getImageByName("тканина_5")}</strong></span></p>
<p><span
><strong><strong><strong><strong><strong><strong>Тканина №6 з пропиткою</strong></strong></strong></strong></strong></strong></span></p>
<p>{getImageByName("тканина_6_пропитка")}</p>
<p><span><strong>Тканина №7 з пропиткою</strong></span></p>
<p><span>{getImageByName("тканина_7_пропитка")}</span></p>
    </span>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default Colors;