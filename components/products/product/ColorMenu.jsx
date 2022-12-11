import React, {useState} from 'react';
import s from "./ColorMenu.module.css";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';

function ColorMenu({colors, setColors, reset, locale}) {  //  colors = { name: Str, src: Url }

    let [isHidden, setIsHidden] = useState(true);
    const toggleMenu = () => {
        setIsHidden(!isHidden);
    }
    let [chosenId, setChosenId] = useState(null);

    const onSetColors =(id) => {
        setColors(id);
        setChosenId(id);
        //showPopup("Вибрано колір");
    }

    const onReset =()=> {
        reset();
        setChosenId(null);
        //showPopup("Колір скинуто");
    }

    let items = colors.map(i=> {
        return <div key={i._id} className={s.item} onClick={()=>onSetColors(i._id)}
        style={chosenId===i._id? {fontWeight: "bold"}:{fontWeight: "normal"}}>
            <span>{i.mainColor} </span>
            /
            <span> {i.pillColor}</span>
        </div>
    });

    return (<div className={s.container}  >
            <Button onClick={toggleMenu} className={s.open_btn} variant="outlined" >{locale==='ua' ? 'Обрати колір' : 'Colors'}</Button>
            {/* <button onClick={onReset} className={s.open_btn} >{locale==='ua' ? "Показати всі" : 'Show all' }</button> */}
        { isHidden ? null : 
        <ClickAwayListener onClickAway={toggleMenu} >
        <div className={s.menu_box}>
            <p style={{fontSize: '1.3rem', marginLeft: '1rem', fontWeight: '600'}}>{locale === 'ua' ? 'Каркас / Тканина' : 'Rotang / Fabric'}</p>
            {/*<button className={s.reset_btn} onClick={onReset} >скинути</button>*/}
            {/*<button className={s.x_btn} onClick={toggleMenu} > </button>*/}
            <div onClick={onReset} className={s.item} >{locale==='ua' ? "Показати всі" : 'Show all' }</div>

            {items}

        </div>
        </ClickAwayListener>
        }
        </div>
    );
}

export default ColorMenu;