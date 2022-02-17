import React from 'react';
import s from "./OrderPage.module.css";
import global_data from "../../utils/global_data";
import sh from "../header/Header.module.css";
import Link from "next/link";

function OrderDone({text}) {
    return (
                <div className={s.order_done_div} >
                    <br/><br/><br/><br/>
                    <div dangerouslySetInnerHTML={{ __html: text}} />
                    <br/><br/><br/><br/>
                    <ul>
                        <li><a href={"tel:"+ global_data.phones[0]}>{global_data.phones[0]}</a></li>
                        <li><br/></li>
                        <li><a href={"tel:"+ global_data.phones[1]}>{global_data.phones[1]}</a></li>
                        <li><br/></li>
                        <li><a href={"tel:"+ global_data.phones[2]}>{global_data.phones[2]}</a></li>
                    </ul>
                    <br/><br/>
                    <div className={sh.name_div}>
                        <Link href={'/'} passHref>
                            <a>
                                <h1>
                                    <span className={sh.or_l}>R</span>
                                    <span className={sh.bor_l}>O</span>
                                    <span className={sh.or_l}>T</span>
                                    <span className={sh.bor_l}>A</span>
                                    <span className={sh.or_l}>N</span>
                                    <span className={sh.bor_l}>G</span>
                                    <span className={sh.or_l}
                                          style={{fontSize: "2rem", position: "relative", top: "-15px"}}>®</span>
                                </h1>
                            </a>
                        </Link>
                    </div>
                </div>

    );
}

export default OrderDone;