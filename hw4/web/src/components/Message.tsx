import styled from "styled-components";

type StyledMessageProps = {
  isMe: boolean;
};

const StyledMessage = styled.div<StyledMessageProps>`
  display: flex;
  align-items: center;
  margin: 8px 0px;
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};

  & p:first-child {
    margin: 0 5px;
    background: ${({ isMe }) => (isMe ? "#097fed" : "#eee")};
  }

  & p:last-child {
    padding: 2px 5px;
    border-radius: 5px;
    background: "#eee";
    color: ${({ isMe }) => (isMe ? "white" : "gray")};
    margin: auto 0;
  }
`;

function Message({ isMe, message }: { isMe: boolean; message: string }) {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const links = message.match(linkRegex);

  return (
    <StyledMessage isMe={isMe}>
      {links ? (
        <a href={links[0]} target="_blank">
          <p>{message}</p>
        </a>
      ) : (
        <p>{message}</p>
      )}
    </StyledMessage>
  );
}

export default Message;
