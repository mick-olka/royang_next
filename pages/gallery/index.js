import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Image from 'next/image';
import MainLayout from "../../components/MainLayout";
import {getAllLists, getGallery} from "../../lib/fetch_data";
import s from "../../components/info_page/InfoPage.module.css";

export async function getStaticProps({ params }) {
    const gallery = await getGallery();
    const lists = await getAllLists();
    return {
        props: {
            gallery,
            lists
        },
        // revalidate: 5,
    }
}

export default function GalleryIndex({gallery, lists}) {

  return (
      <MainLayout lists={lists} main>
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
