import axios from "axios";

//
// export async function fetchCoins() {
//   const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");
//   return data.slice(0, 10);
// }

const baseUrl = "https://api.coinpaprika.com/v1";

export const fetchCoins = async () => {
  const { data } = await axios.get(`${baseUrl}/coins`);
  return data.slice(0, 20);
};

export const fetchCoinInfo = async (coinId: string) => {
  const { data } = await axios.get(`${baseUrl}/coins/${coinId}`);
  return data;
};

export const fetchCoinPrice = async (coinId: string) => {
  const { data } = await axios.get(`${baseUrl}/tickers/${coinId}`);
  return data;
}

export const fetchCoinHistory= async (coinId: string) => {
  const endDate = Math.floor(Date.now() /1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  const { data } = await axios.get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  return data.slice(0, 14);
}

export const fetchCoinToday = async (coinId: string) => {
  const { data } = await axios.get(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`);
  return data.slice(0, 2);
}