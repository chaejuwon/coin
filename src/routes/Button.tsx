import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const ModeBtn = styled.button`
  position: fixed;
  top:15px;
  right:15px;
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${props => props.theme.textColor};
  background: transparent;
  padding: 7px 14px;
  border-radius: 5px;
  transition: all .3s ease-in-out;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.textColor};
    color: ${props => props.theme.bgColor};
  }
`;
const HomeBtn = styled(Link)`
  position: fixed;
  top:15px;
  left:15px;
  svg {
    color: ${(props) => props.theme.textColor};
  }
`;

function Button() {
  const setDartAtom = useSetRecoilState(isDarkAtom);
  const onClickAtom = () => {
    setDartAtom(prev => !prev);
  }
  return (
    <>
      <ModeBtn onClick={onClickAtom}>테마변경</ModeBtn>
      <HomeBtn to="/coin"><FaHouse fontSize={25} /></HomeBtn>
    </>
);
}
export default Button;