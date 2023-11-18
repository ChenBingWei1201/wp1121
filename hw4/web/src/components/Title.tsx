import Image from "next/image";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;

export default function Title() {
  return (
    <Wrapper>
      <Image
        alt="Logo"
        height="33"
        width="33"
        className="mx-auto w-auto"
        src="/messenger.png"
      />
      <h1>Messenger</h1>
    </Wrapper>
  );
}
