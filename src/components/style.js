import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  height: 90vh;
  border: 5px solid gainsboro;
`;
export const ProgressBArBorder = styled.div`
  border: 3px solid #ccc;
`;
export const ProgressBAr = styled.div`
  color: #000 !important;
  background-color: #9e9e9e !important;
  height: 24px;
  width: ${(props) => props.width};
`;
export const AnswerBar = styled.div`
  color: #000 !important;
  background-color: black !important;
  position: absolute;
  height: 24px;
  width: ${(props) => props.width};
`;
export const AnswerBarTwo = styled.div`
  color: #000 !important;
  background-color: #9e9e9e !important;
  height: 24px;
  width: ${(props) => props.width};
`;
export const Content = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 5px;
  color: gray;
`;
export const Heading = styled.h1`
  font-weight: 500;
`;
export const Question = styled.h3`
  margin: 20px 0px;
  font-weight: 500;
  color: black;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const Button = styled.button`
  width: 45%;
  font-size: 20px;
  margin: 10px 0px;
`;

export const Status = styled.h1`
  font-weight: 500;
  text-align: center;
  ${({ correct }) =>
    correct === "Sorry!"
      ? `
    color: red;
  `
      : ` color: green;`}
`;
export const Pages = styled.div`
  display: flex;
  margin-top: 80px;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const Score = styled.div`
  display: flex;
  justify-content: space-between;
`;
