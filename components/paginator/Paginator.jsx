import React from 'react';
import s from "./Paginator.module.css";
function Paginator({paginatorData, setPortionNum, onPageChanged}) {
    const {count, limit, portionNum, portion, page} = paginatorData;
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

    if (count>0)
    return ( <div className={s.paginator}>
        <button className={s.change_page} disabled={page===1} onClick={()=>{onPageChanged0(+page-1)}}> {'попередня'} </button>
        <div>
            {portionNum >1 && <button className={s.change_portion} onClick={()=>{setPortionNum(+portionNum-1)}}> {'<'} </button>}
            {pagesIndexes}
            {portionsCount > portionNum && <button className={s.change_portion} onClick={()=>{setPortionNum(portionNum+1)}}> {'>'} </button>}
        </div>
        <button className={s.change_page} disabled={page===pagesCount} onClick={()=>{onPageChanged0(+page+1)}}> {'наступна'} </button>
    </div>)
        else return <div>-----------------</div>;
}

export default Paginator;