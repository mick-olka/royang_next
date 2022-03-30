import React from 'react';
import Carousel from "react-gallery-carousel";
import 'react-gallery-carousel/dist/index.css';
import s from "./Slider.module.css";

function Slider({photos, prodName}) {
    //  photos = [ {src}, {src} ]
    let images = [[900, 200], [200, 200], [500, 200], [500, 300]].map((size) => ({
        src: `https://placedog.net/${size[0]}/${size[1]}`,
        alt: "Loading..."
    }));
    if (photos) {
        images = photos.map(p=>({
            src: p.src,
            alt: `${prodName} ${p.mainColor} ${p.pillColor}`,
            title: `${prodName} ${p.mainColor} ${p.pillColor}`,
        }));
    }
    return (
        <div className={s.carousel}>
            <Carousel images={images} objectFit={"contain"} playIcon={false}
                      style={{height: "24rem", backgroundColor: "transparent", borderRadius: "0.3rem"}} shouldMaximizeOnClick={true} shouldMinimizeOnClick={true} />
        </div>
    );
}

export default Slider;