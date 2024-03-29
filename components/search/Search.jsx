import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react';
import {useFormik} from "formik";
import s from "./Search.module.css";
import Image from "next/image";
import {useRouter} from "next/router";

const Search = ({locale, onSearch}) => {

    const router = useRouter();
    const onSubmit = (string) => {
        if (string.length>0) {
            onSearch();
            router.push(`/search/?search=${string}&locale=${locale}`);
        }
    }

    return (
        <div>
            <SearchForm onSubmit={onSubmit} locale={locale} />
        </div>
    );
};

export default Search;


let SearchForm = ({onSubmit, locale}) => {

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
                placeholder={locale==="ua" ? "Пошук" : "Search"}
            />
            <button type="submit" className={s.search_btn} >
                <SearchOutlinedIcon fontSize='medium' />
                {/* <Image className={s.search_icon} width={25} height={25} src={"/images/icons/search.png"} alt="search"/> */}
            </button>
        </form>
    );
}
