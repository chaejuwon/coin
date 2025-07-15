import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface HistoryProps {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}


function Chart({ coinId }: ChartProps) {
  const {
    isLoading,
    data,
  } = useQuery<HistoryProps[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "...loading"
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "OHLCV DATA",
              data: data?.map((props) => ({
                x: new Date(props.time_close * 1000),
                y: [
                  parseFloat(props.open),
                  parseFloat(props.high),
                  parseFloat(props.low),
                  parseFloat(props.close),
                ],
              })) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: { show: false },
            },
            title: {
              text: "",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true, // ✅ y축 툴팁 활성화
              },
              labels: {
                show: true, // ✅ y축 값 표시
              },
            },
            grid: { show: false },
            tooltip: {
              enabled: true,
              shared: true,
              theme: isDark ? "dark" : "light",
              y: {
                formatter: (value) => value.toFixed(2),
              },
              style: {
                fontSize: "12px",
              },
            },
          }}
        />
      )}
      {/*{isLoading ? "...loading" :*/}
      {/*  <ApexChart*/}
      {/*    type="line"*/}
      {/*    series={[*/}
      {/*      {*/}
      {/*        name: "sales",*/}
      {/*        data: data?.map((props) => parseFloat(props.close)) ?? [],*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    options={{*/}
      {/*      chart: {*/}
      {/*        width: 500,*/}
      {/*        height: 300,*/}
      {/*        toolbar: {*/}
      {/*          show: false,*/}
      {/*        },*/}
      {/*        background: "transparent",*/}
      {/*      },*/}
      {/*      theme: {*/}
      {/*        mode: "dark",*/}
      {/*      },*/}
      {/*      stroke: {*/}
      {/*        curve: "smooth",*/}
      {/*        width: 5,*/}
      {/*      },*/}
      {/*      grid: {*/}
      {/*        show: false,*/}
      {/*      },*/}
      {/*      xaxis: {*/}
      {/*        labels: { show: false },*/}
      {/*        axisTicks: { show: false },*/}
      {/*        axisBorder: { show: false },*/}
      {/*        categories: data?.map((props) => {*/}
      {/*          return new Date(props.time_close * 1000).toISOString();*/}
      {/*        }),*/}
      {/*      },*/}
      {/*      yaxis: {*/}
      {/*        show: false,*/}
      {/*      },*/}
      {/*      fill: {*/}
      {/*        type: "gradient",*/}
      {/*        gradient: { gradientToColors: ["red"], stops: [0, 100] },*/}
      {/*      },*/}
      {/*      colors: ["yellow"],*/}
      {/*      tooltip: {*/}
      {/*        y: {*/}
      {/*          formatter: value => `$ ${value}`,*/}
      {/*        },*/}
      {/*      },*/}
      {/*    }} */}
      {/*  />}*/}
    </div>
  );
}

export default Chart;