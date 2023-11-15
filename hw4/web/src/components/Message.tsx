import styled from 'styled-components';

type StyledMessageProps = {
  isMe: boolean;
}

const StyledMessage = styled.div<StyledMessageProps>`
  display: flex;
  align-items: center;
  margin: 8px 0px;
  flex-direction: ${({isMe}) => (isMe ? 'row-reverse': 'row')};
  
  & p:first-child{
      margin: 0 5px;
  }

  & p:last-child{
      padding: 2px 5px;
      border-radius: 5px;
      background: #eee;
      color: gray;
      margin: auto 0;
  }
`;

const AMessage = ({ isMe , message }: {isMe: boolean, message: string}) => {
  return (
    <StyledMessage isMe={isMe}>
      <p>{message}</p>
    </StyledMessage>
  );
};

export default AMessage;

// 增加 "isMe" attribute 來決定 message 要
// 靠左或是靠右呈現。"isMe" 由 caller, i.e.
// <ChatRoom> 的renderChat() 傳入