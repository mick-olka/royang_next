import React, {useEffect, useState} from 'react';
import s from "./Header.module.css";
import Link from 'next/link'
import global_data from "../../utils/global_data";
import Navbar from "../navbar/Navbar";
import Image from 'next/image';

const Header = ({links}) => {

    const [headerBorder, setHeaderBorder] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [headerBorder]);
    const handleScroll = () => {
        (window.scrollY > 20) ? setHeaderBorder(true) : setHeaderBorder(false);
    }

    let header_style = {
        transition: "all 300ms ease-in",
        boxShadow: headerBorder ? "2px 2px 3px 0 rgba(0,0,0,0.55)" : "none"
    }

    const [navShow, setNavShow] = useState(false);
    // useEffect(()=>{
    //     const menu = document.getElementById("menu_pane");
    //     if (navShow) {menu.style.left = "0"}
    //     else {menu.style.left = "-15rem"}
    // }, [navShow]);
    const toggleMenu = () => {
        setNavShow(!navShow);
        const menu = document.getElementById("menu_pane");
        if (!navShow) {menu.style.left = "0"}
        else {menu.style.left = "-110%"}
    }

    return (
        <div className={s.header_container} style={header_style}>
            <div className={s.header}>
                <div className={s.menu_btn} onClick={()=>toggleMenu()} >{navShow ? "×" : "≡" }</div>
                <div className={s.name_div}>
                    <Link href={'/'} passHref>
                        <a>
                            <h1>
                                <span className={s.or_l}>R</span>
                                <span className={s.bor_l}>O</span>
                                <span className={s.or_l}>T</span>
                                <span className={s.bor_l}>A</span>
                                <span className={s.or_l}>N</span>
                                <span className={s.bor_l}>G</span>
                                <span className={s.or_l}
                                      style={{fontSize: "2rem", position: "relative", top: "-15px"}}>®</span>
                            </h1>
                        </a>
                    </Link>
                </div>
                <div className={s.header_text_div}>
                    <p style={{fontSize: "1.2rem"}}>Доставка по Києву - безкоштовно !</p>
                </div>
                <div className={s.phones_div}>
                    <ul>

                        <li className={s.phone_li}><a href={"tel:" + global_data.phones[0]}>{global_data.phones[0]}</a>
                        </li>
                        <li className={s.phone_li}><a href={"tel:" + global_data.phones[1]}>{global_data.phones[1]}</a>
                        </li>
                        <li className={s.phone_li}><a href={"tel:" + global_data.phones[2]}>{global_data.phones[2]}</a>
                        </li>

                    </ul>
                </div>
                <div className={s.call_time_div}>
                    <p>з 9:00 по 20:00</p>
                </div>
                <div className={s.cart_div}>
                    <Link href="/order" passHref>
                        <a>
                            <Image className={s.cart_icon} width={40} height={40}
                                   src='/images/icons/laundry-basket_color.png' alt="cart_icon"/>
                        </a>
                    </Link>
                </div>
            </div>
            <div className={s.horizontal_navbar}>
                <Navbar links={links}/>
            </div>
        </div>
    );
}

export default Header;