import {findProducts, getAllLists} from "../../lib/fetch_data";
import ProductsListPane from "../../components/products/ProductsListPane";

export async function getServerSideProps({query}) {
    const prodData = await findProducts(1, 999, query.search);
    const lists = await getAllLists();
    return {
        props: {
            prodData: prodData,
            pattern: query.search,
            lists
        }
    }
}

export default function SearchResults({prodData, myProps, paginator, pattern, lists}) {
    return <ProductsListPane myProps={myProps}
                             prodList={prodData.result}
                             paginatorData={paginator}
                             headerText={`Результати пошуку по "${pattern}"`}
                            lists={lists}/>
}