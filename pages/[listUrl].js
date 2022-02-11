import {getAllLists, getAllListUrls, getListProducts} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";

export async function getStaticProps({ params, locale }) {
    const prodData = await getListProducts(params.listUrl, locale);
    const lists = await getAllLists(locale);
    return {
        props: {
            prodData,
            lists
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