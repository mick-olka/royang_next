import MainLayout from "../../components/MainLayout";
import {getAllProductsIds, getProduct} from "../../lib/fetch_data";
import ProductPage from "../../components/products/product/ProductPage";
import Head from "next/head";

export async function getStaticProps({ params }) {
    const prodData = await getProduct(params.id);
    return {
        props: {
            prodData
        },
        revalidate: 5,
    }
}

export async function getStaticPaths() {
    const paths = await getAllProductsIds();
    return {
        paths,
        fallback: false
    }
}

export default function Product({prodData, orderPageProps}) {
    return <MainLayout>
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