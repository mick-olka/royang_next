import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import MainLayout from "../../components/MainLayout";
import InfoPage from "../../components/info_page/InfoPage";
import {getAllLists} from "../../lib/fetch_data";

export async function getStaticProps({ params, locale }) {
    const lists = await getAllLists(locale);
    return {
        props: {
            lists
        },
        // revalidate: 5,
    }
}

export default function Main({lists}) {

  return (
      <MainLayout lists={lists} main>
      <Head>
        <title>Info</title>
      </Head>

      <main className={styles.main}>
          <InfoPage />
      </main>

      </MainLayout>
  )
}
