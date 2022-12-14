export interface PopulationByYear {
  year: number;
  value: number;
  rate?: number;
}

export interface PopulationData {
  label: string;
  data: PopulationByYear[];
}

export interface PopulationResponse {
  boundaryYear: number;
  data: PopulationData[];
}
