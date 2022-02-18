import MainLayout from "../../components/MainLayout";
import {useEffect, useState} from "react";
import Router, { useRouter } from "next/router";
import SectionsPane from "../SectionsPane/SectionsPane";
import Paginator from "../paginator/Paginator";

export default function ProductsListPane ({prodList, paginatorData, headerText}) {
    const [products, setProducts] = useState([])
    const router = useRouter();
    const [portionNum, setPortionNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

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
        <div>
            {loading ? <h2>Loader...</h2> :
                <div>
                    { headerText && <><h2 className={'bread_cramps'} >Rotang \ {headerText && headerText}</h2> <hr/></>}
                    <div>
                        <SectionsPane products={products} />
                    </div>
                    <Paginator
                        setPortionNum={setPortionNum}
                        onPageChanged={handlePagination}
                        // handlePagination={handlePagination}
                        paginatorData={{...paginatorData, portion: 4, portionNum: portionNum}}
                    />
                </div>
            }
        </div>
    );
}