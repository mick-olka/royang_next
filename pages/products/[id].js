import MainLayout, { siteTitle } from "../../components/MainLayout";
import { getAllProductsIds, getLayoutData, getProduct } from "../../lib/fetch_data";
import ProductPage from "../../components/products/product/ProductPage";
import Head from "next/head";
import global_data from "../../utils/global_data";

export async function getServerSideProps({ params, locale }) {
    const prodData = await getProduct(params.id, locale);
    const layoutData = await getLayoutData(locale);
    if (prodData.error) return { notFound: true }
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
    paths.forEach(p => {
        pathsWithLocale.push({ ...p, locale: "ua" }, { ...p, locale: "en" });
    });
    return {
        paths: pathsWithLocale,
        fallback: true,
    }
}

export default function Product({ prodData, orderPageProps, layoutData, locale }) {
    let updatedLayoutData = { ...layoutData, og_title: prodData.name, og_description: prodData.description ? prodData.description.split('\n')[0] : null, og_image: prodData.thumbnail };
    return <MainLayout layoutData={updatedLayoutData} adminURL={global_data.adminURL + 'products/' + prodData.url_name} >
        <Head>
            <title>{prodData.name}</title>
            <meta name="description" content={prodData.description || layoutData.general_description.text} />
            <meta name="keywords" content={prodData.keywords.join(', ')} />
        </Head>
        <div>
            <ProductPage productData={prodData} addItemToCart={orderPageProps.addItemToCart} locale={locale} />
        </div>
    </MainLayout>
}
