import {getAllLists, getProductsList} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";

export async function getServerSideProps({query}) {
    let page = 1, limit = 6;
    if (query.page && query.page>0) page = query.page;
    const prodData = await getProductsList(page, limit);
    const lists = await getAllLists();
    return {
        props: {
            prodData,
            paginator: {
                page: page,
                limit: limit,
                count: prodData.count
            },
            lists: lists
        },
        // revalidate: 5,
    }
}

export default function Products ({prodData, myProps, paginator, lists}) {

    return (
        <ProductsListPane myProps={myProps} prodList={prodData.products} paginatorData={paginator} lists={lists} />
    );
}