import Head from "next/head";
import { useState } from "react";

import styles from "../styles/Home.module.css";
import { Prefecture } from "../models/Prefecture";
import CustomLineChart from "../components/CustomLineChart";
import PrefectureSelector from "../components/PrefectureSelector";
import Foldable from "../components/Foldable";

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
    <>
      <Head>
        <title>Population Chart</title>
        <meta
          name="description"
          content="都道府県別の総人口推移グラフを表示するアプリ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Population Chart</h1>
      </header>
      <main className={styles.main}>
        <Foldable
          closedText="都道府県一覧"
          openText="都道府県一覧を閉じる"
          defaultOpen
        >
          <PrefectureSelector handleChange={handleChange} />
        </Foldable>
        <div className={styles.chart}>
          <CustomLineChart selected={selectedPrefs} />
        </div>
      </main>

      <footer className={styles.footer}>
        出典：
        <a href="https://opendata.resas-portal.go.jp/">
          RESAS（地域経済分析システム）
        </a>
      </footer>
    </>
  );
}
