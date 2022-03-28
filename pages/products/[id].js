import MainLayout from "../../components/MainLayout";
import {getAllProductsIds, getLayoutData, getProduct} from "../../lib/fetch_data";
import ProductPage from "../../components/products/product/ProductPage";
import Head from "next/head";
import {useRouter} from "next/router";

export async function getServerSideProps({ params, locale }) {
    const prodData = await getProduct(params.id, locale);
    const layoutData = await getLayoutData(locale);
    if (prodData.error) return {notFound: true}
    return {
        props: {
            prodData,
            layoutData,
            locale
        }
    }
}

export async function getServerSidePaths() {
    const paths = await getAllProductsIds();
    let pathsWithLocale = [];
    paths.forEach( p=> {
        pathsWithLocale.push({...p, locale: "ua"}, {...p, locale: "ru"});
    });
    return {
        paths: pathsWithLocale,
        fallback: true,
    }
}

export default function Product({prodData, orderPageProps, layoutData, locale}) {
    console.log(prodData.description);
    return <MainLayout layoutData={layoutData} >
        <Head>
            <title>{prodData.name}</title>
            <meta
                name="description"
                content={prodData.description}
            />
            <meta name="keywords" content={prodData.keywords.join(', ')} />
        </Head>
        <div>
            <ProductPage productData={prodData} addItemToCart={orderPageProps.addItemToCart} locale={locale} />
        </div>
    </MainLayout>
}