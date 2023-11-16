import { Tabs } from "antd";
import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 500px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

export const FootRef = styled.div`
  height: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 600px;
  margin: auto;
`;
