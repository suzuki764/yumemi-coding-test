import Head from "next/head";
import { useState } from "react";

import styles from "../styles/Home.module.css";
import { Prefecture } from "../models/Prefecture";
import CustomLineChart from "../components/CustomLineChart";
import PrefectureSelector from "../components/PrefectureSelector";

export default function Home() {
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  const handleChange = (value: Prefecture) => {
    if (selectedPrefs.includes(value)) {
      setSelectedPrefs(selectedPrefs.filter((pref) => pref !== value));
    } else {
      setSelectedPrefs([...selectedPrefs, value]);
    }
  };

  return (
    <div>
      <Head>
        <title>Population Chart</title>
        <meta
          name="description"
          content="都道府県別の総人口推移グラフを表示するアプリ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Population Chart</h1>
        <>
          <PrefectureSelector handleChange={handleChange} />
        </>
        <div className={styles.chart}>
          <CustomLineChart selected={selectedPrefs} />
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
