import { PopulationData } from "./Population";

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PrefecturePopulation {
  prefecture: Prefecture;
  totalPopulation: PopulationData;
}
