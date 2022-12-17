import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./styles/PrefectureSelector.module.css";
import { Prefecture } from "../models/Prefecture";
import { RESAS_BASE_URL, calcColor } from "./utils";

const PrefectureSelector = (props: {
  handleChange: (value: Prefecture) => void;
}) => {
  const [prefs, setPrefs] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchPrefs = async () => {
      const response = await axios.get(RESAS_BASE_URL + "/prefectures", {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      setPrefs(response.data.result as Prefecture[]);
    };
    fetchPrefs();
  }, []);

  return (
    <div className={styles.checkbox_group}>
      <ul>
        {prefs.map((pref) => (
          <li key={pref.prefCode}>
            <label>
              <input
                type="checkbox"
                onChange={() => props.handleChange(pref)}
                style={{
                  accentColor: calcColor(pref.prefCode),
                }}
              />
              {pref.prefName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrefectureSelector;
