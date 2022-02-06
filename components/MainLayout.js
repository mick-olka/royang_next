import Head from 'next/head'
import styles from './layout.module.css'
import Navbar from "./navbar/Navbar";
import Header from "./header/Header";
import Search from "./search/Search";
import s from "./header/Header.module.css";
import React from "react";
import global_data from "../utils/global_data";

export const siteTitle = 'Rotang.ua';

export default function MainLayout({ children, lists }) {
    const header_links = [
        {url: '/gallery', name: "Галерея Фото"},
        {url: '/colors', name: "Вибір Кольору"},
        {url: '/info#delivery', name: "Про Доставку"},
        {url: '/info#contacts', name: "Контакти"},
        {url: '/info#discounts', name: "Знижки"},
        {url: '/info#plastic_rotang', name: "Про Полі-Ротанг"},
        {url: '/info#rotang', name: "Про Ротанг"},
        {url: '/info#payment', name: "Оплата"},
    ];

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico/" />
                <meta
                    name="description"
                    content="Ротангові меблі"
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

            <Header links={header_links} />

            <main className={styles.main_block} >
                <div className={styles.nav_pane} id="menu_pane" >
                    <Search />
                <Navbar links={lists || []} />
                    <div className={styles.mobile_list} >
                        <br/>
                        <Navbar links={header_links} />
                        <br/>
                        <h3 style={{fontSize: "1.3rem", fontWeight: "bolder"}} >Контакти</h3>
                        <div className={styles.menu_contacts} >
                            <ul>
                                <li className={s.phone_li}><a href={"tel:" + global_data.phones[0]}>📞 {global_data.phones[0]}</a>
                                </li>
                                <li className={s.phone_li}><a href={"tel:" + global_data.phones[1]}>📞 {global_data.phones[1]}</a>
                                </li>
                                <li className={s.phone_li}><a href={"tel:" + global_data.phones[2]}>📞 {global_data.phones[2]}</a>
                                </li>
                            </ul>
                            <p>з 9:00 по 20:00</p>
                        </div>
                    </div>
                </div>
            <div className={styles.content_pane} >{children}</div>
            </main>

            <footer className={styles.footer}>
                <pre>Rotang.ua          |         <a style={{display: "inline"}} href={'http://178.54.240.228:7878'} rel="noopener noreferrer" target="_blank" >admin</a>           |           2022</pre>
            </footer>
        </div>
    )
}
