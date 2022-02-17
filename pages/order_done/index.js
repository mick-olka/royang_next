
import OrderDone from "../../components/order_page/OrderDone";
import {getLayoutData, getText} from "../../lib/fetch_data";
import MainLayout from "../../components/MainLayout";
import {useRouter} from "next/router";
export async function getStaticProps({locale}) {
    const layoutData = await getLayoutData(locale);
    const order_done_text_block = await getText('order_done', locale);
    return {
        props: {
            layoutData,
            text: order_done_text_block.text
        },
        revalidate: 5,
    }
}
export default function SearchResults({layoutData, text}) {
    return <MainLayout layoutData={layoutData} > <OrderDone text={text} /> </MainLayout>;
}