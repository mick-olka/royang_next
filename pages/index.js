import {getLayoutData, getProductsList, getText} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";
import MainLayout from "../components/MainLayout";

export async function getServerSideProps({query, locale}) {
    let page = 1, limit = 36;
    if (query.page && query.page>0) page = query.page;
    const prodData = await getProductsList(page, limit, locale);
    const layoutData = await getLayoutData(locale);
    const main_text = await Promise.all([getText("main_page_text", locale), getText("main_page_lower_text", locale)]);
    return {
        props: {
            prodData,
            paginator: {
                page: page,
                limit: limit,
                count: prodData.count,
            },
            layoutData: layoutData,
            main_page_text: main_text[0].text,
            main_page_lower_text: main_text[1].text
        }
    }
}

export default function Products ({prodData, myProps, paginator, layoutData, main_page_text, main_page_lower_text}) {
    return (<MainLayout layoutData={layoutData} >
            <div className={"main_page_text"} >
                <p>{main_page_text}</p>
                <p>{main_page_lower_text}</p>
            </div>
        <ProductsListPane myProps={myProps} prodList={prodData.products} paginatorData={paginator} />
        </MainLayout>
    );
}