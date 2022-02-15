import {findProducts, getLayoutData} from "../../lib/fetch_data";
import ProductsListPane from "../../components/products/ProductsListPane";
import MainLayout from "../../components/MainLayout";

export async function getServerSideProps({query, locale}) {
    let page = 1, limit = 50;
    if (query.page && query.page>0) page = query.page;
    const prodData = await findProducts(1, 999, query.search, locale);
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            prodData: prodData,
            pattern: query.search,
            layoutData,
            paginator: {
                page: page,
                limit: limit,
                count: prodData.count,
            }
        }
    }
}

export default function SearchResults({prodData, myProps, paginator, pattern, layoutData}) {
    return <MainLayout layoutData={layoutData} >
        <ProductsListPane myProps={myProps}
                             prodList={prodData.result}
                             paginatorData={paginator}
                          headerText={`Результати пошуку по "${pattern}"`}
        />
    </MainLayout>
}