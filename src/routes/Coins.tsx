import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;

  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    color: ${props => props.theme.textColor}
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
`;

const Loading = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const ModeBtn = styled.button`

`;

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
};

interface IRouterProps {

}

function Coins({}: IRouterProps) {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  const setDartAtom = useSetRecoilState(isDarkAtom);
  const onClickAtom = () => {
    setDartAtom(prev => !prev);
  }
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <ModeBtn onClick={onClickAtom}>테마변경</ModeBtn>
      </Header>
      {isLoading ? <Loading>Loading...</Loading> : (
        <CoinsList>
          {data?.map(coin => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/coin/${coin.id}`, state: { name: coin.name } }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>

  );
}

export default Coins;