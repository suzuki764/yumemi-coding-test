import Head from "next/head";
import styles from "../styles/Home.module.css";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

// テストデータ
const data = [
  { name: "1980", aichi: 100, chiba: 200, tokyo: 300, osaka: 400 },
  { name: "1985", aichi: 200, chiba: 300, tokyo: 400, osaka: 500 },
  { name: "1990", aichi: 300, chiba: 400, tokyo: 500, osaka: 600 },
  { name: "1995", aichi: 400, chiba: 500, tokyo: 600, osaka: 700 },
  { name: "2000", aichi: 500, chiba: 600, tokyo: 700, osaka: 800 },
  { name: "2005", aichi: 600, chiba: 700, tokyo: 800, osaka: 900 },
  { name: "2010", aichi: 700, chiba: 800, tokyo: 900, osaka: 1000 },
  { name: "2015", aichi: 800, chiba: 900, tokyo: 1000, osaka: 1100 },
  { name: "2020", aichi: 900, chiba: 1000, tokyo: 1100, osaka: 1200 },
];

export default function Home() {
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
        <div className={styles.chart}>
          <LineChart width={800} height={400} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="aichi" stroke="#8884d8" />
            <Line type="monotone" dataKey="chiba" stroke="#82ca9d" />
            <Line type="monotone" dataKey="tokyo" stroke="#ffc658" />
            <Line type="monotone" dataKey="osaka" stroke="#ff0000" />
          </LineChart>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
