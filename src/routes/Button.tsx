import styled from "styled-components";
import React, { useState } from "react";

const ModeBtn = styled.button`
  position:fixed;
  top:15px;
  left:15px;
`;

function Button() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  return (
    <ModeBtn onClick={toggleTheme}>테마변경</ModeBtn>
  );
}
export default Button;