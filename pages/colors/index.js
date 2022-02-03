import Head from 'next/head'
import MainLayout from "../../components/MainLayout";
import {useEffect, useState} from "react";
import {getColorsPhotos} from "../../lib/fetch_data";
import Colors from "../../components/info_page/Colors";


export async function getStaticProps({ params }) {
    const colors = await getColorsPhotos();
    return {
        props: {
            colors
        },
        // revalidate: 5,
    }
}

export default function ColorsIndex({colors}) {

    // const [gallery, setGallery] = useState([]);
    // useEffect(async () => {
    //     let colorsList = await getColorsPhotos();
    //     setGallery(colorsList);
    // }, []);

  return (
      <MainLayout main>
      <Head>
        <title>Colors</title>
      </Head>

      <Colors colors={colors} />

      </MainLayout>
  )
}
