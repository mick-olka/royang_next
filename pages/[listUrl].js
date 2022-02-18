import {getAllListUrls, getLayoutData, getListProducts} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";
import MainLayout from "../components/MainLayout";
import Head from "next/head";
import React from "react";

export async function getServerSideProps({ query, params, locale }) {   //  no query in getStaticProps
    let page = 1, limit = 50;
    if (query.page && query.page>0) page = query.page;
    const prodData = await getListProducts(params.listUrl, page, limit, locale);
    const layoutData = await getLayoutData(locale);
    if (prodData.error) return {notFound: true}
    return {
        props: {
            prodData,
            layoutData,
            paginator: {
                page,
                limit,
                count: prodData.count,
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
    return <MainLayout layoutData={layoutData} >
        <Head>
            <title>Rotang - {prodData.name}</title>
        </Head>
        <ProductsListPane headerText={prodData.name} prodList={prodData.items} paginatorData={paginator} />
    </MainLayout>
}