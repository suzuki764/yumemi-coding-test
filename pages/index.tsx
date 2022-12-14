import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "../styles/Home.module.css";
import { Prefecture } from "../models/Prefecture";
import CustomLineChart from "../components/CustomLineChart";

const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

export default function Home() {
  const [prefs, setPrefs] = useState<Prefecture[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  const handleChange = (value: Prefecture) => {
    if (selectedPrefs.includes(value)) {
      setSelectedPrefs(selectedPrefs.filter((pref) => pref !== value));
    } else {
      setSelectedPrefs([...selectedPrefs, value]);
    }
  };

  useEffect(() => {
    const fetchPrefs = async () => {
      const response = await axios.get(BASE_URL + "/prefectures", {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      console.log(response.data);
      setPrefs(response.data.result as Prefecture[]);
    };
    fetchPrefs();
  }, []);

  return (
    <div className={styles.container}>
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
        <div className={styles.checkbox_group}>
          <ul>
            {prefs.map((pref) => (
              <li key={pref.prefCode}>
                <label>
                  <input type="checkbox" onChange={() => handleChange(pref)} />
                  {pref.prefName}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.chart}>
          <CustomLineChart selected={selectedPrefs} />
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
