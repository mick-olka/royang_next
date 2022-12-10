import Head from 'next/head'
import MainLayout from "../../components/MainLayout";
import { getColorsPhotos, getLayoutData, getText } from "../../lib/fetch_data";
import Colors from "../../components/info_page/Colors";
import React from "react";


export async function getStaticProps({ locale }) {
    const colors = await getColorsPhotos();
    const layoutData = await getLayoutData(locale);
    const description = await getText('colors_page_description', locale);
    return {
        props: {
            colors,
            layoutData: layoutData,
            locale,
            description
        },
        revalidate: 5,
    }
}

export default function ColorsIndex({ colors, layoutData, locale, description }) {

    return (
        <MainLayout layoutData={layoutData} main>
            <Head>
                <title>{locale === 'ua' ? 'Вибір Кольору' : 'Color Selection'}</title>
                <meta
                    name="description"
                    content={description.text}
                />
            </Head>

            <Colors colors={colors} />

        </MainLayout>
    )
}
