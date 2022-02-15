import MainLayout from "../../components/MainLayout";
import {getAllProductsIds, getLayoutData, getProduct} from "../../lib/fetch_data";
import ProductPage from "../../components/products/product/ProductPage";
import Head from "next/head";

export async function getStaticProps({ params, locale }) {
    const prodData = await getProduct(params.id, locale);
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            prodData,
            layoutData
        },
        revalidate: 5,
    }
}

export async function getStaticPaths() {
    const paths = await getAllProductsIds();
    let pathsWithLocale = [];
    paths.forEach( p=> {
        pathsWithLocale.push({...p, locale: "ua"}, {...p, locale: "ru"});
    });
    return {
        paths: pathsWithLocale,
        fallback: true
    }
}

export default function Product({prodData, orderPageProps, layoutData, locale}) {
    return <MainLayout layoutData={layoutData} >
        <Head>
            <title>{prodData.name}</title>
            <meta
                name="description"
                content={prodData.description}
            />
        </Head>
        <div>
            <ProductPage productData={prodData} addItemToCart={orderPageProps.addItemToCart} locale={locale} />
        </div>
    </MainLayout>
}