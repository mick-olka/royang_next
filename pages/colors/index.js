import Head from 'next/head'
import MainLayout from "../../components/MainLayout";
import {getAllLists, getColorsPhotos} from "../../lib/fetch_data";
import Colors from "../../components/info_page/Colors";


export async function getStaticProps({ params, locale }) {
    const colors = await getColorsPhotos();
    const lists = await getAllLists(locale);
    return {
        props: {
            colors,
            lists
        },
        // revalidate: 5,
    }
}

export default function ColorsIndex({colors, lists}) {

  return (
      <MainLayout lists={lists} main>
      <Head>
        <title>Colors</title>
      </Head>

      <Colors colors={colors} />

      </MainLayout>
  )
}
