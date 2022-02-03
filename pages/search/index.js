import {findProducts, getAllListUrls, getListProducts} from "../../lib/fetch_data";
import ProductsListPane from "../../components/products/ProductsListPane";

export async function getServerSideProps({query}) {
    const prodData = await findProducts(1, 999, query.search);
    return {
        props: {
            prodData: prodData,
            pattern: query.search
        }
    }
}

export default function SearchResults({prodData, myProps, paginator, pattern}) {
    return <ProductsListPane myProps={myProps}
                             prodList={prodData.result}
                             paginatorData={paginator}
                             headerText={`Результати пошуку по "${pattern}"`} />
}