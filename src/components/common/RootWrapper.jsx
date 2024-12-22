import React from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`;

const Main = styled.div`
  width: 400px;
  height: 600px;
  background-color: #F4F4F4;
  overflow-y: auto;
  box-shadow: 16px 12px 54px 0 rgba(0,0,0,0.2);
  font-family: Inter;
  padding: 41px 38px 57px 38px;
  position: relative;
  color: #413F3F;
`;

const TopImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const RootWrapper = (props) => {                                 
  return (                              
    <Wrapper>                           
      <Main>
        <TopImage src={'/assets/images/png/todo-top.png'} />
        {props.children} 
      </Main>
    </Wrapper>
  );
}