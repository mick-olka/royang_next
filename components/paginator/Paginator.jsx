import React from 'react';
import s from "./Paginator.module.css";
import {useRouter} from "next/router";
import Link from "next/link";
function Paginator({paginatorData, setPortionNum, onPageChanged}) {
    const {count, limit, portionNum, portion, page} = paginatorData;
    const {locale} = useRouter();
    let pagesCount = Math.ceil(count / limit);
    let portionsCount = Math.ceil(pagesCount / portion);
    let leftPortionEdge = (portionNum -1 )*portion ;
    let rightPortionEdge = (portionNum * portion);

    const onPageChanged0 = (p) => {
        onPageChanged(p);
        let a = Math.ceil(p / portion);
        setPortionNum(a);
    };

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let pagesIndexes = pages
        .filter(p => (p>=leftPortionEdge && p<=rightPortionEdge))
        .map((p) => {
            return <span
                key={p}
                onClick={(e) => {onPageChanged(p)}}
                className={+page === +p ? s.selectedPage : undefined}>{p}</span>;
    });

    if (count>0 && count>limit) {
        return (<div className={s.paginator}>
            <button className={s.change_page} disabled={page === 1} onClick={() => {
                onPageChanged0(+page - 1)
            }}> {locale === 'ua' ? 'попередня' : 'предыдущая'} </button>
            <div>
                {portionNum > 1 && <button className={s.change_portion} onClick={() => {
                    setPortionNum(+portionNum - 1)
                }}> {'<'} </button>}
                {pagesIndexes}
                {portionsCount > portionNum && <button className={s.change_portion} onClick={() => {
                    setPortionNum(portionNum + 1)
                }}> {'>'} </button>}
            </div>
            <button className={s.change_page} disabled={page === pagesCount} onClick={() => {
                onPageChanged0(+page + 1)
            }}> {locale === 'ua' ? 'наступна' : 'следующая'} </button>
        </div>)
    } else return <div className={s.paginator}><Link href={'/'} ><a>{locale === 'ua' ? 'На головну' : 'На главную'}</a></Link></div>;
}

export default Paginator;