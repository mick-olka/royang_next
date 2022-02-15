
import OrderDone from "../../components/order_page/OrderDone";
import {getLayoutData} from "../../lib/fetch_data";
import MainLayout from "../../components/MainLayout";
export async function getServerSideProps({locale}) {
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            layoutData
        },
        // revalidate: 5,
    }
}
export default function SearchResults({layoutData}) {
    return <MainLayout layoutData={layoutData} > <OrderDone /> </MainLayout>;
}