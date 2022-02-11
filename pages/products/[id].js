import MainLayout from "../../components/MainLayout";
import {getAllLists, getAllProductsIds, getProduct} from "../../lib/fetch_data";
import ProductPage from "../../components/products/product/ProductPage";
import Head from "next/head";

export async function getStaticProps({ params, locale }) {
    console.log(params.id);
    const prodData = await getProduct(params.id);
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
    const paths = await getAllProductsIds();
    let pathsWithLocale = [];
    paths.forEach( p=> {
        pathsWithLocale.push({...p, locale: "uk-UA"}, {...p, locale: "ru-RU"});
    });
    return {
        paths: pathsWithLocale,
        fallback: true
    }
}

export default function Product({prodData, orderPageProps, lists}) {
    return <MainLayout lists={lists} >
        <Head>
            <title>{prodData.name}</title>
            <meta
                name="description"
                content={prodData.description}
            />
        </Head>
        <div>
            <ProductPage productData={prodData} addItemToCart={orderPageProps.addItemToCart} />
        </div>
    </MainLayout>
}