import { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import axios from "axios";

import styles from "./styles/CustomLineChart.module.css";
import { Prefecture } from "../models/Prefecture";
import { PopulationData, PopulationResponse } from "../models/Population";
import { RESAS_BASE_URL } from "./utils";

const CustomLineChart = (props: { selected: Prefecture[] }) => {
  const [data, setData] = useState<PopulationData[]>([]);

  useEffect(() => {
    const fetchPopulations = async (prefecture: Prefecture) => {
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
      ).data.find((v) => v.label === "総人口") ?? { label: "", data: [] };
      return totalPopulation;
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
      <ResponsiveContainer width="100%" height={400}>
        <LineChart margin={{ left: 100, right: 100 }}>
          <XAxis dataKey="year" allowDuplicatedCategory={false} interval={1} />
          <YAxis />
          <Tooltip />
          {data.map((population, i) => (
            <Line
              key={i}
              dataKey="value"
              data={population.data}
              name={population.label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
