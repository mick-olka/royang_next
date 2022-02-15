import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import MainLayout from "../../components/MainLayout";
import InfoPage from "../../components/info_page/InfoPage";
import {getLayoutData, getText} from "../../lib/fetch_data";

export async function getStaticProps({ params, locale }) {
    const text_names = ['about_rotang', 'about_plastic_rotang', 'about_payment', 'about_delivery', 'about_discounts', 'about_contacts'];
    const res = await Promise.all([
        getLayoutData(locale),
        getText('about_rotang', locale),
        getText('about_plastic_rotang', locale),
        getText('about_payment', locale),
        getText('about_delivery', locale),
        getText('about_discounts', locale),
        getText('about_contacts', locale),
    ]);
    let text_data = {};
    text_names.forEach((p, i)=>{text_data[p]=res[i+1]});
    return {
        props: {
            layoutData: res[0],
            text_data: text_data
        },
        // revalidate: 5,
    }
}

export default function MainInfo({layoutData, text_data}) {

  return (
      <MainLayout layoutData={layoutData} main>
      <Head>
        <title>Info</title>
      </Head>

      <main className={styles.main}>
          <InfoPage text_data={text_data} />
      </main>

      </MainLayout>
  )
}
