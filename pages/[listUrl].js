import {getAllListUrls, getListProducts} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";

export async function getStaticProps({ params }) {
    const prodData = await getListProducts(params.listUrl);
    console.log(prodData);
    return {
        props: {
            prodData
        },
        revalidate: 5,
    }
}

export async function getStaticPaths() {
    const paths = await getAllListUrls();
    return {
        paths,
        fallback: false
    }
}

export default function ProductsOfList({prodData, myProps, paginator}) {
    return <ProductsListPane myProps={myProps} prodList={prodData.items} paginatorData={paginator} />
}