import {getAllListUrls, getLayoutData, getListProducts} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";
import MainLayout from "../components/MainLayout";
import Head from "next/head";
import React from "react";
import global_data from "../utils/global_data";

export async function getServerSideProps({ query, params, locale }) {   //  no query in getStaticProps
    let page = 1, limit = 50;
    if (query.page && query.page>0) page = query.page;
    const listProdsData = await getListProducts(params.listUrl, page, limit, locale);
    const layoutData = await getLayoutData(locale);
    if (listProdsData.error) return {notFound: true}
    return {
        props: {
            prodData: listProdsData,
            layoutData,
            paginator: {
                page,
                limit,
                count: listProdsData.count,
            },
            locale
        }
    }
}

export async function getServerSidePaths() {
    const paths = await getAllListUrls();
    let pathsWithLocale = [];
    paths.forEach( p=> {
        pathsWithLocale.push({...p, locale: "ua"}, {...p, locale: "ru"});
    });
    return {
        paths: pathsWithLocale,
        fallback: false,
    }
}

export default function ProductsOfList({prodData, paginator, layoutData}) {
    let updatedLayoutData = {...layoutData, og_title: prodData.name, og_description: prodData.description.split('\n')[0], og_image: prodData.items[0] ? prodData.items[0].thumbnail : global_data.og_def_img };
    return <MainLayout layoutData={updatedLayoutData} >
        <Head>
            <title>Rotang-{prodData.name}</title>
            <meta name="description" content={prodData.description || layoutData.general_description.text} />
            <meta name="keywords" content={prodData.keywords.join(', ')} />
        </Head>
        <ProductsListPane headerText={prodData.name} prodList={prodData.items} paginatorData={paginator} />
    </MainLayout>
}