import React, {useEffect, useState} from 'react';
import s from "./Header.module.css";
import Link from 'next/link'
import global_data from "../../utils/global_data";
import Navbar from "../navbar/Navbar";
import Image from 'next/image';
import LocalesPane from "../locales/LocalesPane";

const Header = ({links, headerText, navShow, setNavShow}) => {

    const [headerBorder, setHeaderBorder] = useState(false);
    const [showPhones, setShowPhones] = useState(false);    //  for mobiles
    const handleScroll = () => {
        (window.scrollY > 20) ? setHeaderBorder(true) : setHeaderBorder(false);
        setShowPhones(false);
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [headerBorder]);
    let header_style = {
        transition: "all 300ms ease-in",
        boxShadow: headerBorder ? "2px 2px 3px 0 rgba(0,0,0,0.55)" : "none",
    }

    const phones_ul =()=> {return <ul>
        <li className={s.phone_li}><a href={"tel:" + global_data.phones[0]}>{global_data.phones[0]}</a>
        </li>
        <li className={s.phone_li}><a href={"tel:" + global_data.phones[1]}>{global_data.phones[1]}</a>
        </li>
        <li className={s.phone_li}><a href={"tel:" + global_data.phones[2]}>{global_data.phones[2]}</a>
        </li>
    </ul>};

    return (
        <div className={s.header_container} style={header_style}>
            <div className={s.header}>
                <div className={s.menu_btn} onClick={()=>setNavShow(!navShow)} >{navShow ? "×" : "≡" }</div>
                <div className={s.name_div}>
                    <div className={s.header_name} >
                    <Link href={'/'} passHref>
                        <a>
                            <h1>
                                <span className={s.or_l}>R</span>
                                <span className={s.bor_l}>O</span>
                                <span className={s.or_l}>T</span>
                                <span className={s.bor_l}>A</span>
                                <span className={s.or_l}>N</span>
                                <span className={s.bor_l}>G</span>
                                <span className={s.r_char}>®</span>
                            </h1>
                        </a>
                    </Link>
                    </div>
                    <div className={s.contacts_block_mobile} >
                        <p onClick={()=>setShowPhones(!showPhones)} className={s.phones_popup_btn} >+38 {global_data.phones[0]} {showPhones?'△':'▽'}</p>
                        <div className={s.phones_popup} style={showPhones?{display: "block"}:{display: "none"}} >
                        {phones_ul()}
                    </div></div>
                </div>
                <div className={s.header_text_div} >
                    <p style={{fontSize: "1.2rem"}}>{headerText}</p>
                </div>
                <div className={s.phones_div}>
                    {phones_ul()}
                </div>
                <div className={s.call_time_div}>
                    <p>9:00 - 20:00</p>
                </div>
                <div className={s.cart_div}>
                    <div style={{position: "relative", top: "-0.5rem", marginRight: "0.5rem"}} >
                    <LocalesPane />
                    </div>
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