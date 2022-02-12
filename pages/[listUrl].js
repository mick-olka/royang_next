import {getAllLists, getAllListUrls, getListProducts} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";

export async function getStaticProps({ query, params, locale }) {
    let page = 1, limit = 50;
    if (query.page && query.page>0) page = query.page;
    const prodData = await getListProducts(params.listUrl, locale);
    const lists = await getAllLists(locale);
    return {
        props: {
            prodData,
            lists
        },
        paginator: {
            page: page,
            limit: limit,
            count: prodData.count,
        },
        revalidate: 5,
    }
}

export async function getStaticPaths() {
    const paths = await getAllListUrls();
    let pathsWithLocale = [];
    paths.forEach( p=> {
        pathsWithLocale.push({...p, locale: "ua"}, {...p, locale: "ru"});
    });
    return {
        paths: pathsWithLocale,
        fallback: false
    }
}

export default function ProductsOfList({prodData, myProps, paginator, lists}) {
    return <ProductsListPane myProps={myProps} prodList={prodData.items} paginatorData={paginator} lists={lists} />
}