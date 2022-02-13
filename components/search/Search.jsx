
import React from 'react';
import {useFormik} from "formik";
import s from "./Search.module.css";
import Image from "next/image";
import {useRouter} from "next/router";

const Search = ({locale}) => {

    const router = useRouter();
    const onSubmit = (string) => {
        if (string.length>0) router.push(`search/?search=${string}&locale=${locale}`);
    }

    return (
        <div>
            <SearchForm onSubmit={onSubmit} />
        </div>
    );
};

export default Search;


let SearchForm = ({onSubmit}) => {

    const formik = useFormik({
        initialValues: {
            search_input: '',
        },
        onSubmit: values => {onSubmit(values.search_input)},
    });

    return (
        <form className={s.search_form} onSubmit={formik.handleSubmit}>
            <input
                id="search_input"
                name="search_input"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.search_input}
                className={s.search_input}
                placeholder="Пошук"
            />
            <button type="submit" className={s.search_btn} >
                <Image className={s.search_icon} width={25} height={25} src={"/images/icons/search.png"} alt="search"/>
            </button>
        </form>
    );
}
