import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Image from 'next/image';
import MainLayout from "../../components/MainLayout";
import { getGallery, getLayoutData} from "../../lib/fetch_data";
import s from "../../components/info_page/InfoPage.module.css";

export async function getStaticProps({ params, locale }) {
    const gallery = await getGallery();
    const layoutData = await getLayoutData(locale);
    return {
        props: {
            gallery,
            layoutData
        },
        // revalidate: 5,
    }
}

export default function GalleryIndex({gallery, layoutData}) {

  return (
      <MainLayout layoutData={layoutData} main>
      <Head>
        <title>Gallery</title>
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
