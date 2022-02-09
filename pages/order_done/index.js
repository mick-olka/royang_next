
import OrderDone from "../../components/order_page/OrderDone";
import {getAllLists} from "../../lib/fetch_data";
import MainLayout from "../../components/MainLayout";
export async function getServerSideProps() {
    const lists = await getAllLists();
    return {
        props: {
            lists: lists
        },
        // revalidate: 5,
    }
}
export default function SearchResults({lists}) {
    return <MainLayout lists={lists} > <OrderDone /> </MainLayout>;
}