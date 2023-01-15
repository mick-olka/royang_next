import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useEffect, useState} from 'react';
import s from "./ProductPage.module.css";
import ColorMenu from "./ColorMenu";
import SectionsPane from "../../SectionsPane/SectionsPane";
import MySlider from "../../slider/Slider";
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

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
    const [descrArr, setDescrArr] = useState(["Loading..."]);
    const [descrOpen, setDescrOpen] = useState(false);
    const [similarOpen, setSimilarOpen] = useState(false);
    const [relatedOpen, setRelatedOpen] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);

    let colors = productData.images.map(i => {
        return {_id: i._id, mainColor: i.mainColor, pillColor: i.pillColor}
    });

    const setColorsAndPhotos = (photosId) => {
        let photos = productData.images.filter(p => p._id === photosId);
        console.log(photos[0].mainColor);
        setItemForCart({
            ...itemForCart,
            mainColor: photos[0].mainColor, //  need to get index 0 because filter returns an array
            pillColor: photos[0].pillColor,
            photo: photos[0].pathArr[0]
        });
        setChosenPhotos(photos[0].pathArr.map(p => {
            return {src: p, mainColor: p.mainColor, pillColor: p.pillColor}
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
            allImgs.push({src: productData.images[i].pathArr[t], mainColor: productData.images[i].mainColor, pillColor: productData.images[i].pillColor});
        }
    }

    useEffect(()=>{
        // setDescr( new DOMParser().parseFromString(productData.description, 'text/html') );
        setDescrArr(productData.description.split('\n\n'));
    }, []);

    const prodType = productData.types[0] ? productData.types[0].name : null;
    return (<div className={s.container} >
            <p className={'bread_cramps'} >Rotang {prodType && ` / ${prodType[locale]} `}/ {productData.name}</p>
            <div className={s.main_box}>

                <div className={s.gallery}>
                    <MySlider photos={chosenPhotos.length < 1 ? allImgs : chosenPhotos} prodName={productData.name} />
                </div>

                <div className={s.info_box}>
                    <div className={s.nameDiv}>
                        <h1 className={s.name}>{productData.name}</h1>
                    </div>
                    <div className={s.price_box}>

                        {productData.oldPrice>0 ? <span className={s.old_price}>{productData.oldPrice}</span> : null}
                        <span className={s.price} style={productData.oldPrice>0 ? {color: "red"}: null} >{productData.price} </span><span> грн</span>
                    </div>

                    <div className={s.colors_div}>
                        {colors.length>1 &&
                        <ColorMenu colors={colors} setColors={setColorsAndPhotos} reset={resetColorsAndPhotos}
                                   locale={locale}/>
                        }
                    </div>

                    <div className={s.orderInfo} >
                        <div>{locale==='ua'?'Кількість':'Amount'}: {itemForCart.count}</div>
                        <Slider aria-label="Amount" value={itemForCart.count} step={1} min={1} max={10} style={{maxWidth: '15rem'}} onChange={(event, newValue) => setCount(newValue)} />
                        {/* <input className={s.count_input} type="number" min="1" value={itemForCart.count} onChange={e => setCount(e.target.value)}/> */}
                        {colors.length > 1 && <>
                        <p>{locale==='ua'?'Колір каркасу':'Rotang color'}: <span>{itemForCart.mainColor || "..."}</span></p>
                            <p>{locale==='ua'?'Колір тканини':'Fabric color'}: <span>{itemForCart.pillColor || "..."}</span></p></>
                        }
                    </div>

                    {/*<button onClick={onClickAddItemToCart} className={s.toCart_btn} >Додати в кошик</button>*/}
                    <Button variant="outlined" color="primary" onClick={()=>onClickAddItemToCart(itemForCart)} className={s.order_btn} >{locale==='ua'?'Замовити':'Order'}</Button>
                    <p>{locale==='ua'?'Або подзвоніть менеджеру щоб замовити':'Or call our manager to order'}*</p>

                </div>

            </div>


            <div className={s.extra_box}>

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                    <p style={{fontSize: '1.2rem', fontWeight: '700'}}>{locale==='ua' ? "Характеристики" : "Features"} </p>
                </AccordionSummary>
                <AccordionDetails>
                    {productData.features && productData.features.map(f => {
                        return <p key={f.key}>{f.key} : <span>{f.value}</span></p>
                    })}
                </AccordionDetails>
            </Accordion>
                {/* <div className={s.features_div}>
                    <b onClick={()=>setFeaturesOpen(!featuresOpen)} >{locale==='ua' ? "Характеристики" : "Features"} <span>{featuresOpen?"▲":"▼"}</span></b>
                    <div className={s.features_list} style={featuresOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} >
                    {productData.features && productData.features.map(f => {
                        return <p key={f.key}>{f.key} : <span>{f.value}</span></p>
                    })}
                    </div>
                </div> */}
                { productData.description && <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                    <p style={{fontSize: '1.2rem', fontWeight: '700'}}>{locale==='ua'?'Опис':'Description'}</p>
                </AccordionSummary>
                <AccordionDetails>
                    <h3 className={s.description} dangerouslySetInnerHTML={{__html: descrArr[0]}}/>
                    <div className={s.description} dangerouslySetInnerHTML={{ __html: descrArr[1] }} />
                </AccordionDetails>
            </Accordion> }
                {/* { productData.description && <div className={s.description_div} >
                    <b onClick={()=>setDescrOpen(!descrOpen)} >{locale==='ua'?'Опис':'Description'}<span>{descrOpen?"▲":"▼"}</span> </b>
                    {descrArr.length > 1 ? <><h3 className={s.description} style={{display: 'none'}} dangerouslySetInnerHTML={{__html: descrArr[0]}}/>
                    <div className={s.description} style={descrOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} dangerouslySetInnerHTML={{ __html: descrArr[1] }} /></> :
                        <h3 className={s.description} style={descrOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} dangerouslySetInnerHTML={{ __html: descrArr[0] }} />
                        }
                </div> } */}

            {productData.relatedProducts.length>0 && <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                    <p style={{fontSize: '1.2rem', fontWeight: '700'}}>{locale==='ua'?"Пов'язані товари":"Related products"}</p>
                </AccordionSummary>
                <AccordionDetails>
                <SectionsPane products={productData.relatedProducts}/>
                </AccordionDetails>
            </Accordion> }
                {/* {productData.relatedProducts.length>0 &&
                <div className={s.related_products_div}>
                    <b onClick={()=>setRelatedOpen(!relatedOpen)} >{locale==='ua'?"Пов'язані товари":"Related products"} <span>{relatedOpen?"▲":"▼"}</span></b>
                    <div className={s.features_list} style={relatedOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} >
                        <SectionsPane products={productData.relatedProducts}/>
                    </div>
                </div>
                } */}

            {productData.similarProducts.length>0 && <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                    <p style={{fontSize: '1.2rem', fontWeight: '700'}}>{locale==='ua'?"Схожі товари":"Similar products"}</p>
                </AccordionSummary>
                <AccordionDetails>
                <SectionsPane products={productData.similarProducts}/>
                </AccordionDetails>
            </Accordion> }
                {/* {productData.similarProducts.length>0 &&
                <div className={s.similar_products_div}>
                    <b onClick={()=>setSimilarOpen(!similarOpen)} >{locale==='ua'?"Схожі товари":'Similar products'} <span>{similarOpen?"▲":"▼"}</span></b>
                    <div className={s.features_list} style={similarOpen ? {maxHeight: "50rem"}:{maxHeight: "0"}} >
                    <SectionsPane products={productData.similarProducts}/>
                    </div>
                </div>
                } */}

            </div>

        </div>
    );
}

export default ProductPage;
