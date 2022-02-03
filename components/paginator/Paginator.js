import React from 'react';
import s from './Paginator.module.css';

function Paginator({paginatorData, handlePagination}) {
    let {page, limit, count} = {...paginatorData};
    let pagesCount = Math.ceil(count / limit);
    let pageIndexes = Array.from({length: pagesCount}, (_, i) => i + 1);
    return (
        <div className={s.container} >
            {page>1 && <div onClick={()=>handlePagination(--page)} >{"<<"}</div>}
            {pageIndexes.map(p => {
                return <div key={p} onClick={()=>handlePagination(p)} className={page == p ? s.active : null} >{p}</div>
            })}
            {page<pagesCount && <div onClick={()=>handlePagination(++page)} >{">>"}</div>}
        </div>
    );
}

export default Paginator;