import React from 'react';
import styles from "../layout.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

function LocalesPane() {
    const {locale, locales, asPath} = useRouter();

    return (
        <div className={styles.locales_div}>
            <div className={locale==='ua' ? styles.active_locale : styles.locale} >
                <Link href={asPath} locale={'ua'} >UA</Link>
            </div>
            <hr/>
            <div className={locale==='en' ? styles.active_locale : styles.locale} >
                <Link href={asPath} locale={'en'} >EN</Link>
            </div>
        </div>
    );
}

export default LocalesPane;