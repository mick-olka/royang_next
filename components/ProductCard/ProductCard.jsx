import React, {useState} from 'react';
import s from "./ProductCard.module.css";
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from "next/router";

function ProductCard({name, thumbnail, price, oldPrice, _id, lessSpace, url_name}) {
    const {locale} = useRouter();
    const loc = locale === 'en' ? 'ru' : 'ua'
    const [imgError, setImgError] = useState(false);
    const onImgError = () => {
        setImgError(true);
    }
    return (<div>
        <Link href={"/products/"+url_name} passHref >
            <a>
        <div className={s.section} style={lessSpace && {display: "block"}} >
            {oldPrice>0 && <div className={s.sale_icon_div} >
                    <Image src="/images/icons/coupon_color.png" width={50} height={50} alt="скидка" title="знижка" />
                </div>}
                <div className={s.imgPart} >
                    <Image className={s.thumbnail} layout={"fill"} objectFit={"contain"} src={imgError? '/images/chair.png' : thumbnail || '/images/chair.png'} alt={name + " photo"} title={name} onError={()=>onImgError()} />
                </div>
                <div className={s.infoPart} >
                    <p>{name[loc] || name}</p>
                    <p className={s.price} style={oldPrice>0 ? {fontSize: "1.1rem", color: "#ff4e4e"}:null} >
                        {oldPrice>0 && <span style={{fontSize: "0.8rem"}} className={s.old_price} >{oldPrice} грн</span>}
                        {price} грн</p>
                </div>
        </div>
            </a>
        </Link>
        </div>
    );
}

export default ProductCard;
