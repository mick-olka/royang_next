import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Image from 'next/image';
import MainLayout from "../../components/MainLayout";
import {getGallery} from "../../lib/fetch_data";
import s from "../../components/info_page/InfoPage.module.css";

export async function getStaticProps({ params }) {
    const gallery = await getGallery();
    return {
        props: {
            gallery
        },
        // revalidate: 5,
    }
}

export default function Main({gallery}) {

  return (
      <MainLayout main>
      <Head>
        <title>Gallery</title>
      </Head>

      <main className={styles.main}>
          <div className={s.gallery_div} >
              <h2 style={{fontSize: "2rem", fontWeight: "bolder", textAlign: "center"}} >Галерея Фото</h2>

              {gallery.map(p=>{
                  return <div className={s.gallery_img_div} ><Image key={p} width={1000} height={600} objectFit={'contain'} src={p} alt={p} /></div>
              })}

          </div>
      </main>

      </MainLayout>
  )
}
