import React from 'react';
import s from "./Navbar.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({links, onLinkClick}) => {
    const router = useRouter();
    let links0 = links.map(l=> {
        let path = '/'+router.query.listUrl;
        // if you insert <a/> inside <Link/> you should include passHref
        // if the <a/> wraps anything other than a string,
        // otherwise site may take a hit on SEO.
        return (
                <div className={s.linkDiv} key={l.url}>
                    <Link href={l.url}><a className={path === l.url ? s.activeLink : ""} onClick={()=>{window.scrollTo(0, 0); onLinkClick();}} >{l.name}</a></Link>
                </div>
            )
        }
    );

    return (
        <div className={s.navbar_pane}>
            <nav>
                {links0}
            </nav>
        </div>
    );
}

export default Navbar;
