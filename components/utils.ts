export const RESAS_BASE_URL = "https://opendata.resas-portal.go.jp/api/v1";

export const calcColor = (n: number) => {
  return `hsl(${270 - n * 12}, 100%, 40%)`;
};
