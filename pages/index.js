import {getAllLists, getProductsList} from "../lib/fetch_data";
import ProductsListPane from "../components/products/ProductsListPane";
import {useRouter} from "next/router";

export async function getServerSideProps({query}) {
    let page = 1, limit = 50;
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
    const {locale, locales, asPath} = useRouter();
    return (<>
            <div className={"main_page_text"} >
                <p>Великий вибір меблів із натурального та штучного ротангу для дому, террас та літніх майданчиків ресторанів.</p>
                <p>Виробництво меблів під замовлення.</p>
                <p>Вологостійкі меблі для басейнів, саун и банних комплексів.</p>
            </div>
        <ProductsListPane myProps={myProps} prodList={prodData.products} paginatorData={paginator} lists={lists} />
        </>
    );
}