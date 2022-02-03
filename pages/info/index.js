import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import MainLayout from "../../components/MainLayout";
import InfoPage from "../../components/info_page/InfoPage";

export default function Main({myProps}) {

  return (
      <MainLayout main>
      <Head>
        <title>Info</title>
      </Head>

      <main className={styles.main}>
          <InfoPage />
      </main>

      </MainLayout>
  )
}
