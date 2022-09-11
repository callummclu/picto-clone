import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PictoLogo } from "../icons/CanvasIcons";

export const Home = () => {
  let usernameRef = useRef<any>();
  let roomnameRef = useRef<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomId, setRoomId] = useState(() => searchParams.get("room"));

  const joinRoom = (e: any) => {
    e.preventDefault();
    window.location.href =
      window.location.origin +
      `/chat?username=${usernameRef.current.value}&roomname=${roomnameRef.current.value}`;
  };

  return (
    <Centered>
      <JoinFormContainer>
        <form onSubmit={joinRoom}>
          <PictoLogo color="gray" />
          <p style={{ color: "gray" }}>Join a room</p>

          <PictoInput
            type="text"
            ref={usernameRef}
            name="username"
            placeholder="Username"
            required
          ></PictoInput>

          <PictoInput
            type="number"
            ref={roomnameRef}
            name="roomNumber"
            placeholder="Room Number"
            defaultValue={parseInt(roomId as string) || ""}
            required
          ></PictoInput>
          <SqaureButton type="submit" name="submit">
            Join
          </SqaureButton>
        </form>
      </JoinFormContainer>
    </Centered>
  );
};

const PictoInput = styled.input`
  width: 200px;
  border: 3px solid gray;
  border-radius: 8px;
  padding: 5px;
`;

const SqaureButton = styled.button`
  width: 100px;
  height: 30px;
  border: 3px solid gray;
  background: lightgray;
  border-radius: 8px;
  color: gray;
  font-size: 16px;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
`;

const JoinFormContainer = styled.div`
  border-radius: 10px;
  background: white;
  border: 3px solid gray;
  width: 100%;
  max-width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;

  & h1 {
    text-align: center;
  }

  & h3 {
    text-align: center;
  }

  & form {
    padding: 50px;
    display: flex;
    flex-direction: column;

    & input {
      margin-bottom: 10px;
    }

    & button {
      margin-top: 10px;
    }
  }
`;
