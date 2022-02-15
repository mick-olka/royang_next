import Head from 'next/head'
import MainLayout from "../../components/MainLayout";
import {getAllLists, getColorsPhotos, getLayoutData} from "../../lib/fetch_data";
import Colors from "../../components/info_page/Colors";


export async function getStaticProps({ params, locale }) {
    const colors = await getColorsPhotos();
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            colors,
            layoutData: layoutData,
            locale
        },
        // revalidate: 5,
    }
}

export default function ColorsIndex({colors, layoutData}) {

  return (
      <MainLayout layoutData={layoutData} main>
      <Head>
        <title>Colors</title>
      </Head>

      <Colors colors={colors} />

      </MainLayout>
  )
}
