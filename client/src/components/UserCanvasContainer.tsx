import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from './UserCanvas';

export const UserCanvasContainer = () => (
  <>
    <CanvasAndButtonContainer>
      <ButtonsContainer>
      <CircleButton/>
      <CircleButton/>
      <br/>
      <CircleButton/>
      <CircleButton/>
      <br/>
      <CircleButton/>
      <CircleButton/>
      <br/>
      <CircleButton/>
      <CircleButton/>
      <CircleButton/>
      <CircleButton/>
      <CircleButton/>
      
      </ButtonsContainer>
      <UserAreaContainer>
      <UserContainer>
        <p>callum</p>
        <p>rowan</p>
      </UserContainer>
        <UserInputContainer>
          <Canvas />
          <InputContainer>
            <KeyboardContainer></KeyboardContainer>
            <SendButtonsContainer></SendButtonsContainer>
          </InputContainer>
        </UserInputContainer>
      </UserAreaContainer>
    </CanvasAndButtonContainer>
  </>
)

const CircleButton = styled.div`
  width:28px;
  height:28px;
  margin-bottom: 3px;
  background:lightgray;
  border-radius: 50%;
`

const UserContainer = styled.div`
  height:30px; width:100%;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  gap:20px;
  margin-right:20px;
`

const UserAreaContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ButtonsContainer = styled.div`
  width: 35px;
  height: 415px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const CanvasAndButtonContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background:white;
  height: 415px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`

const  UserInputContainer = styled.div`
  background:#AAAAB3;
  width:100%;
  max-width:450px;
  height:380px;
  border-radius: 10px;
  display:flex;
  flex-direction: column;
`

const KeyboardContainer = styled.div`
  height:170px;
  width:100%;
  background:white;
  margin-left: 10px;
  margin-top: 20px;
  margin-right:10px;
  border-radius: 8px;
`

const InputContainer = styled.div`
  display:flex;
  width:100%;
  height:230px;
  flex-grow: 1;
`

const SendButtonsContainer = styled.div`
  height:164px;
  width:97px;
  background:#D9D9D9;
  border-left: 3px solid white;
  border-top: 3px solid white;
  border-bottom: 3px solid white;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-top: 20px;

`