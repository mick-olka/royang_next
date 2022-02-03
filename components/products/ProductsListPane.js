import MainLayout from "../../components/MainLayout";
import {useEffect, useState} from "react";
import Router, { useRouter } from "next/router";
import SectionsPane from "../SectionsPane/SectionsPane";
import Paginator from "../paginator/Paginator";

export default function ProductsListPane ({prodList, paginatorData, headerText, lists}) {
    const [products, setProducts] = useState([])
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    useEffect(() => {
        // Router event handler
        Router.events.on("routeChangeStart", startLoading)
        Router.events.on("routeChangeComplete", stopLoading)
        return () => {
            Router.events.off("routeChangeStart", startLoading)
            Router.events.off("routeChangeComplete", stopLoading)
        }
    }, [])

    useEffect(() => {
        if (prodList) {
            setProducts(prodList);
        }
    }, [prodList])

    // Triggers fetch for new page
    const handlePagination = page => {
        if (page < 1) page = 1;
        const path = router.pathname
        const query = router.query
        query.page = page
        router.push({
            pathname: path,
            query: query,
        })
    }

    return (
        <MainLayout lists={lists} >
            {loading ? <h2>Loader...</h2> :
                <div>
                    <h2 style={{margin: "1rem 0",textAlign: "center", fontSize: "1.5rem"}} >{headerText && headerText}</h2>
                    <div>
                        <SectionsPane products={products} />
                    </div>
                    <Paginator handlePagination={handlePagination} paginatorData={paginatorData} />
                </div>
            }
        </MainLayout>
    );
}