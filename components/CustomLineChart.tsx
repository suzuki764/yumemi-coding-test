import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  Label,
  Legend,
} from "recharts";
import axios from "axios";

import styles from "./styles/CustomLineChart.module.css";
import { Prefecture, PrefecturePopulation } from "../models/Prefecture";
import { PopulationResponse } from "../models/Population";
import { RESAS_BASE_URL, calcColor } from "./utils";

const CustomLineChart = (props: { selected: Prefecture[] }) => {
  const [data, setData] = useState<PrefecturePopulation[]>([]);
  const [memo, setMemo] = useState<PrefecturePopulation[]>([]);

  useEffect(() => {
    const fetchPopulations = async (prefecture: Prefecture) => {
      if (memo.find((v) => v.prefecture.prefCode === prefecture.prefCode)) {
        return memo.find((v) => v.prefecture.prefCode === prefecture.prefCode)!;
      }
      const response = await axios.get(
        RESAS_BASE_URL + "/population/composition/perYear",
        {
          headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
          },
          params: {
            prefCode: prefecture.prefCode,
            cityCode: "-",
          },
        }
      );
      const totalPopulation = (
        response.data.result as PopulationResponse
      ).data.find((v) => v.label === "総人口")!;
      setMemo([...memo, { prefecture, totalPopulation }]);
      return { prefecture, totalPopulation };
    };

    const fetchAllPopulations = async () => {
      const promises = props.selected.map((pref) => fetchPopulations(pref));
      const results = await Promise.all(promises);
      setData(results);
    };

    fetchAllPopulations();
  }, [props.selected]);

  return (
    <div className={styles.main}>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart margin={{ top: 40, left: 5, right: 50 }}>
          <XAxis
            type="number"
            dataKey="year"
            allowDuplicatedCategory={false}
            angle={-45}
            allowDataOverflow
            domain={["dataMin", 2020]}
          >
            <Label value="年度" offset={15} position="right" />
          </XAxis>
          <YAxis
            tickFormatter={(v: number) => (v / 10000).toString()}
            unit="万"
          >
            <Label value="人口数" offset={20} position="top" />
          </YAxis>
          <Tooltip />
          <Legend />
          {data.map((v) => (
            <Line
              key={v.prefecture.prefCode}
              dataKey="value"
              data={v.totalPopulation.data}
              name={v.prefecture.prefName}
              stroke={calcColor(v.prefecture.prefCode)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
