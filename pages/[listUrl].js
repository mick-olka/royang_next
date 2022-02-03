import {getAllLists, getAllListUrls, getListProducts} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";

export async function getStaticProps({ params }) {
    const prodData = await getListProducts(params.listUrl);
    const lists = await getAllLists();
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
    return {
        paths,
        fallback: false
    }
}

export default function ProductsOfList({prodData, myProps, paginator, lists}) {
    return <ProductsListPane myProps={myProps} prodList={prodData.items} paginatorData={paginator} lists={lists} />
}