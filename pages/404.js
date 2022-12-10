import MainLayout from "../components/MainLayout";
import { getLayoutData } from "../lib/fetch_data";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            locale,
            layoutData
        }
    }
}

export default function Custom404({ locale, layoutData }) {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 2000);
    }, []);
    return <MainLayout layoutData={layoutData} > <div className="page_404" >
        <h1>404</h1>
        <hr />
        <h2>{locale === 'ua' ? 'Сторінка не знайдена' : 'Page not Found'}</h2>
    </div>
    </MainLayout>
}