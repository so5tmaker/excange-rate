import axios from "axios";

type typeHeader = {
  usd: number;
  eur: number;
};
// https://exchangeratesapi.io/
const instance = axios.create({
  baseURL: "https://api.coingate.com/v2/rates/merchant/",
});

export const getRate = async (from: string, to: string): Promise<never> =>
  instance.get(`${from}/${to}`);

export const getHeaderRate = async (): Promise<never[]> => {
  const { data: usd } = await getRate("usd", "uah");
  const { data: eur } = await getRate("eur", "uah");
  return [usd, eur];
};
