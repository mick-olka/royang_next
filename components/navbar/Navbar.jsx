import React from 'react';
import s from "./Navbar.module.css";
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({links}) => {
    const router = useRouter();
    let links0 = links.map(l=> {

        // if you insert <a/> inside <Link/> you should include passHref
        // if the <a/> wraps anything other than a string,
        // otherwise site may take a hit on SEO.
        return (
                <div className={s.linkDiv} key={l.url}>
                    <Link href={"/"+l.url}><a className={router.pathname === l.url ? s.activeLink : ""} >{l.name}</a></Link>
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
