import { useQuery } from "react-query";
import { fetchCoinToday } from "../api";
import styled from "styled-components";

interface CoinProps {
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

const PriceItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 6rem;
  gap: 1rem;
`;
const PriceItemFull = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  grid-area: 1 / 1 / 2 / 3;
  padding: 1.2rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background-color: rgba(0,0,0, .5);
  border-radius: 0.7rem;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
`;
const PriceItemHalf = styled.div`
  display: flex;
  align-items: flex-start;
  -webkit-box-pack: justify;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  background-color: rgba(0,0,0, .5);
  border-radius: 0.7rem;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
`;
const FullText = styled.div`
  font-size: 14px;
  display: grid;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: left;
  color: rgb(198, 204, 207);
  font-weight: 600;
`;
const FullItem = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  color: rgb(218, 81, 87);
  span {
    font-weight: 300;
  }
`;
const HalfText = styled.div`
  font-size: 13px;
  display: block;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  color: rgb(198, 204, 207);
  font-weight: 600;
`;
const HalfItem = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${props=>props.theme.accentColor};
`;

function Price({ coinId }: CoinProps) {
  const {
    isLoading: isLoadingToday,
    data: dataToday,
  } = useQuery<HistoryProps[]>(["ohlcvToday", coinId], () => fetchCoinToday(coinId));

  const todayPrice = dataToday?.[0];
  const yesterDayPrice = dataToday?.[1];

  const closeToday = parseFloat(todayPrice?.close ?? "0");
  const closeYesterday = parseFloat(yesterDayPrice?.close ?? "0");

  const changePrice = closeToday  - closeYesterday;
  const formattedPrice = changePrice.toFixed(2); // 소수점 2자리까지 표시
  const percentageChange = closeYesterday !== 0 ? ((changePrice / closeYesterday) * 100).toFixed(2) : "0";

  const charLoading = isLoadingToday;
  return (
    <>
      {charLoading ? 'loading' : (
        <PriceItemWrap>
          <PriceItemFull>
            <FullText>현재가격</FullText>
            <FullItem><span>${todayPrice?.close}</span></FullItem>
          </PriceItemFull>
          <PriceItemHalf>
            <HalfText>전날가격</HalfText>
            <HalfItem>{changePrice > 0 ? "▲" : "▼"} ${yesterDayPrice?.close}</HalfItem>
          </PriceItemHalf>
          <PriceItemHalf>
            <HalfText>가격변화</HalfText>
            <HalfItem>{changePrice > 0 ? "▲" : "▼"} ${formattedPrice}</HalfItem>
          </PriceItemHalf>
          <PriceItemHalf>
            <HalfText>변화율</HalfText>
            <HalfItem>${percentageChange}</HalfItem>
          </PriceItemHalf>
          <PriceItemHalf>
            <HalfText>거래량</HalfText>
            <HalfItem>${parseFloat(todayPrice?.volume ?? "0").toFixed(2)}</HalfItem>
          </PriceItemHalf>
          <PriceItemHalf>
            <HalfText>최저가</HalfText>
            <HalfItem>${todayPrice?.low}</HalfItem>
          </PriceItemHalf>
          <PriceItemHalf>
            <HalfText>최고가</HalfText>
            <HalfItem>${todayPrice?.high}</HalfItem>
          </PriceItemHalf>
        </PriceItemWrap>
      )}
    </>
  );
}

export default Price;