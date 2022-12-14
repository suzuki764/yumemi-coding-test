import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface Population {
  year: number;
  value: number;
}

interface PopulationResponse {
  label: string;
  data: Population[];
}

export default function Home() {
  const [prefs, setPrefs] = useState<Prefecture[]>([]);
  const [population, setPopulation] = useState<PopulationResponse[]>([]);

  useEffect(() => {
    const fetchPrefs = async () => {
      const prefs = await axios.get(BASE_URL + "/prefectures", {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      setPrefs(prefs.data.result as Prefecture[]);
    };
    fetchPrefs();
  }, []);

  useEffect(() => {
    const fetchPopulations = async () => {
      const response = await axios.get(
        BASE_URL + "/population/composition/perYear",
        {
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
          },
          params: {
            prefCode: 1,
            cityCode: "-",
          },
        }
      );
      setPopulation(response.data.result.data as PopulationResponse[]);
    };
    fetchPopulations();
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
        <div className={styles.chart}>
          <div className={styles.checkbox_group}>
            <ul>
              {prefs.map((pref) => (
                <li key={pref.prefCode}>
                  <label>
                    <input type="checkbox" />
                    {pref.prefName}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart margin={{ left: 100, right: 100 }}>
              <XAxis
                dataKey="year"
                allowDuplicatedCategory={false}
                interval={1}
              />
              <YAxis />
              <Tooltip />
              <Line
                data={population[0]?.data ?? []}
                dataKey="value"
                stroke="#8884d8"
                isAnimationActive={false}
                key="key"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
