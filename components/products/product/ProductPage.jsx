import React, {useEffect, useState} from 'react';
import s from "./ProductPage.module.css";
import ColorMenu from "./ColorMenu";
import SectionsPane from "../../SectionsPane/SectionsPane";
import Slider from "../../slider/Slider";

function ProductPage({productData, addItemToCart, locale}) {

    let [itemForCart, setItemForCart] = useState({
        product: productData._id,
        photo: productData.images[0]? productData.images[0].pathArr[0] : "/images/chair.png",
        name: productData.name,
        code: productData.code,
        mainColor: "не вибрано",
        pillColor: "не вибрано",
        count: 1,
        price: productData.price,   //  for sum
    });

    const [chosenPhotos, setChosenPhotos] = useState([]);
    const [descr, setDescr] = useState(null);
    const [descrOpen, setDescrOpen] = useState(false);
    const [similarOpen, setSimilarOpen] = useState(false);
    const [relatedOpen, setRelatedOpen] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);

    let colors = productData.images.map(i => {
        return {_id: i._id, mainColor: i.mainColor, pillColor: i.pillColor}
    });

    const setColorsAndPhotos = (photosId) => {
        let photos = productData.images.filter(p => p._id === photosId);
        setItemForCart({
            ...itemForCart,
            mainColor: photos[0].mainColor, //  need to get index 0 because filter returns an array
            pillColor: photos[0].pillColor,
            photo: photos[0].pathArr[0]
        });
        setChosenPhotos(photos[0].pathArr.map(p => {
            return {src: p}
        }));
    }

    const resetColorsAndPhotos = () => {
        setItemForCart({
            ...itemForCart,
            photo: productData.images[0].pathArr[0],
            mainColor: "не вибрано",
            pillColor: "не вибрано",
        });
        setChosenPhotos([]);
    }

    const setCount = (count) => {
        setItemForCart({...itemForCart, count: count});
    }
    const onClickAddItemToCart = () => {
        addItemToCart(itemForCart);
    }

    let allImgs = [];
    for (let i = 0; i < productData.images.length; i++) {
        for (let t = 0; t < productData.images[i].pathArr.length; t++) {
            allImgs.push({src: productData.images[i].pathArr[t]});
        }
    }

    useEffect(()=>{
        setDescr( new DOMParser().parseFromString(productData.description, 'text/html') );
    }, []);


    return (<div className={s.container} >

            <div className={s.main_box}>

                <div className={s.gallery}>
                    <Slider photos={chosenPhotos.length < 1 ? allImgs : chosenPhotos}/>
                </div>

                <div className={s.info_box}>
                    <div className={s.nameDiv}>
                        <h2 className={s.name}>{productData.name}</h2>
                    </div>
                    <div className={s.price_box}>

                        {productData.oldPrice>0 ? <span className={s.old_price}>{productData.oldPrice}</span> : null}
                        <span className={s.price} style={productData.oldPrice>0 ? {color: "red"}: null} >{productData.price} </span><span> грн</span>
                    </div>

                    <div className={s.colors_div}>
                        <ColorMenu colors={colors} setColors={setColorsAndPhotos} reset={resetColorsAndPhotos} locale={locale} />
                    </div>

                    <div className={s.orderInfo} >
                        <span>Кількість</span>
                        <input className={s.count_input} type="number" min="1" value={itemForCart.count} onChange={e => setCount(e.target.value)}/>
                        <p><span>Колір каркасу: </span>{itemForCart.mainColor[locale] || "не вибрано"}</p>
                        <p><span>Колір тканини: </span>{itemForCart.pillColor[locale] || "не вибрано"}</p>
                    </div>

                    {/*<button onClick={onClickAddItemToCart} className={s.toCart_btn} >Додати в кошик</button>*/}
                    <button onClick={()=>onClickAddItemToCart(itemForCart)} className={s.order_btn} >Замовити</button>
                    <p>Або подзвоніть менеджеру щоб замовити*</p>

                </div>

            </div>


            <div className={s.extra_box}>

                <div className={s.features_div}>
                    <h2 onClick={()=>setFeaturesOpen(!featuresOpen)} >Характеристики <span>{featuresOpen?"▲":"▼"}</span></h2>
                    <div className={s.features_list} style={featuresOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} >
                    {productData.features && productData.features.map(f => {
                        return <p key={f.key}>{f.key} : <span>{f.value}</span></p>
                    })}
                    </div>
                </div>

                { productData.description && <div className={s.description_div} >
                    <h2 style={{fontSize: "1.2rem", fontWeight: "bolder"}} onClick={()=>setDescrOpen(!descrOpen)} >Опис <span>{descrOpen?"▲":"▼"}</span> </h2>
                    <div className={s.description} style={descrOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} dangerouslySetInnerHTML={{ __html: productData.description }}>
                    </div>
                </div> }

                {productData.relatedProducts.length>0 &&
                <div className={s.related_products_div}>
                    <h2 onClick={()=>setRelatedOpen(!relatedOpen)} >Пов&apos;язані товари <span>{relatedOpen?"▲":"▼"}</span></h2>
                    <div className={s.features_list} style={relatedOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} >
                        <SectionsPane products={productData.relatedProducts}/>
                    </div>
                </div>
                }

                {productData.similarProducts.length>0 &&
                <div className={s.similar_products_div}>
                    <h2 onClick={()=>setSimilarOpen(!similarOpen)} >Схожі товари <span>{similarOpen?"▲":"▼"}</span></h2>
                    <div className={s.features_list} style={similarOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} >
                    <SectionsPane products={productData.similarProducts}/>
                    </div>
                </div>
                }

            </div>

        </div>
    );
}

export default ProductPage;