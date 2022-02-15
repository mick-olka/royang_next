import React, {useState} from 'react';
import s from "./ProductCard.module.css";
import Link from 'next/link';
import Image from 'next/image';
import {patchProduct} from "../../lib/fetch_data";
import {useRouter} from "next/router";

function ProductCard({name, thumbnail, price, oldPrice, _id, lessSpace, url_name}) {
    const {locale} = useRouter();
    const [imgError, setImgError] = useState(false);
    const onImgError = () => {
        setImgError(true);
        patchProduct(_id, {index: -1});
    }
    return (<div>
        <Link href={"/products/"+url_name} passHref >
            <a>
        <div className={s.section} style={lessSpace && {display: "block"}} >
            {oldPrice>0 && <div className={s.sale_icon_div} >
                    <Image src="/images/icons/coupon_color.png" width={50} height={50} alt="sale"/>
                </div>}
                <div className={s.imgPart} >
                    <Image className={s.thumbnail} layout={"fill"} objectFit={"contain"} src={imgError? '/images/chair.png' : thumbnail || '/images/chair.png'} alt={"product"} onError={()=>onImgError()} />
                </div>
                <div className={s.infoPart} >
                    <p>{name[locale] || name}</p>
                    {oldPrice>0 && <p style={{fontSize: "0.8rem"}} className={s.old_price} >{oldPrice} грн</p>}
                    <p style={oldPrice>0 ? {fontSize: "1.1rem"}:null} >{price} грн</p>
                </div>
        </div>
            </a>
        </Link>
        </div>
    );
}

export default ProductCard;
