import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import Navbar from "./navbar/Navbar";
import Header from "./header/Header";
import Search from "./search/Search";
import s from "./header/Header.module.css";
import React, {useEffect, useState} from "react";
import global_data from "../utils/global_data";
import {useRouter} from "next/router";
import LocalesPane from "./locales/LocalesPane";

export const siteTitle = 'Rotang.ua';

export default function MainLayout({ children, layoutData }) {

    const {locale, locales, asPath} = useRouter();
    const [navShow, setNavShow] = useState(false);
    useEffect(()=>{
        navShow ? document.getElementsByTagName('html')[0].style.overflow="hidden":document.getElementsByTagName('html')[0].style.overflow="auto";
    }, [navShow]);
    const header_links = [
        {url: '/gallery', name: locale==="ua" ? "Галерея Фото":"Галерея Фото"},
        {url: '/colors', name: locale==="ua" ? "Вибір Кольору" : "Выбор цвета"},
        {url: '/info#delivery', name: locale==="ua" ? "Про Доставку" : "Про доставку"},
        {url: '/info#contacts', name: locale==="ua" ? "Контакти" : "Контакты"},
        {url: '/info#discounts', name: locale==="ua" ? "Знижки" : "Скидки"},
        {url: '/info#plastic_rotang', name: locale==="ua" ? "Про Полі-Ротанг" : "Про Поли-ротанг"},
        {url: '/info#rotang', name: locale==="ua" ? "Про Ротанг" : "Про Ротанг"},
        {url: '/info#payment', name: locale==="ua" ? "Оплата" : "Оплата"},
    ];
    const types_list = layoutData.lists.map(l=>{
        return {...l, url: "/"+l.url};
    });
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico/" />
                <meta
                    name="description"
                    content={layoutData.general_description.text}
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <title>Rotang.ua</title>
            </Head>

            <Header links={header_links} headerText={layoutData.headerText.text} navShow={navShow} setNavShow={setNavShow} />

            <main className={styles.main_block} >
                <div className={styles.nav_pane} id="menu_pane" style={navShow ? {left: "0"}:{left: "-110%"}} >
                    <Search locale={locale} onSearch={()=>setNavShow(false)} />
                    <div className={styles.mobile_list} >
                        <div className={styles.menu_contacts} >
                            <ul>
                                <li className={s.phone_li}><a href={"tel:" + global_data.phones[0]}>{global_data.phones[0]}</a>
                                </li>
                                <li className={s.phone_li}><a href={"tel:" + global_data.phones[1]}>{global_data.phones[1]}</a>
                                </li>
                                <li className={s.phone_li}><a href={"tel:" + global_data.phones[2]}>{global_data.phones[2]}</a>
                                </li>
                            </ul>
                            <p>9:00 - 20:00</p>
                        </div>
                        <hr/>
                        <Navbar links={header_links} onLinkClick={()=>setNavShow(false)} />
                        <br/>
                        <hr/>
                    </div>
                <Navbar links={types_list || []} onLinkClick={()=>setNavShow(false)} />
                    <br/>
                </div>
            <div className={styles.content_pane} >{children}</div>
            </main>

            <footer className={styles.footer}>
                <pre>Rotang.ua          |         <a style={{display: "inline"}} href={global_data.adminURL} rel="noopener noreferrer" target="_blank" >admin</a>           |           2022</pre>
            </footer>
        </div>
    )
}
