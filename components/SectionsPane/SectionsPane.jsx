import React from 'react';
import s from "./SectionsPane.module.css";
import ProductCard from "../ProductCard/ProductCard";

const SectionsPane=({products})=>{

    let productsList = [];
    if (products) productsList = products.map((p)=>{
        return <ProductCard
            key={p._id}
            _id={p._id}
            url_name={p.url_name}
            name={p.name}
            thumbnail={p.thumbnail}
            price={p.price}
            oldPrice={p.oldPrice}
        />
    });

    return (
        <div className={s.sectionsPane} >
            {productsList.length<1 ? <h2>Нічого немає :(</h2> : productsList}
        </div>
    );
}

export default SectionsPane;