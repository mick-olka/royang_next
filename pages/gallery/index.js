import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Image from 'next/image';
import MainLayout from "../../components/MainLayout";
import {getGallery, getLayoutData, getText} from "../../lib/fetch_data";
import s from "../../components/info_page/InfoPage.module.css";

export async function getStaticProps({ params, locale }) {
    const gallery = await getGallery();
    const layoutData = await getLayoutData(locale);
    const description = await getText('gallery_page_description', locale);
    return {
        props: {
            gallery,
            layoutData,
            description
        },
        revalidate: 5,
    }
}

export default function GalleryIndex({gallery, layoutData, description}) {

  return (
      <MainLayout layoutData={layoutData} main>
      <Head>
        <title>Галерея Фото</title>
          <meta
              name="description"
              content={description.text}
          />
      </Head>

      <main className={styles.main}>
          <div className={s.gallery_div} >
              <h2 style={{fontSize: "2rem", fontWeight: "bolder", textAlign: "center"}} >Галерея Фото</h2>

              {gallery.map(p=>{
                  return <div className={s.gallery_img_div} key={p} ><Image width={1000} height={600} objectFit={'contain'} src={p} alt={p} /></div>
              })}

          </div>
      </main>

      </MainLayout>
  )
}
