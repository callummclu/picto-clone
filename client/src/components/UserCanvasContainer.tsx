import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from './UserCanvas';

export const UserCanvasContainer = () => (
  <>
   <Centered>
    <MessagesContainer>
      <MessageMiniMap>
      <MessageBlip/><MessageBlip/><MessageBlip/><MessageBlip/>
      <MessageBlip/><MessageBlip/><MessageBlip/><MessageBlip/>
      <MessageBlip/><MessageBlip/><MessageBlip/><MessageBlip/>
      <MessageBlip/><MessageBlip/><MessageBlip/><MessageBlip/>
      <MessageBlip/><MessageBlip/><MessageBlip/><MessageBlip/>
      <MessageBlip/><MessageBlip/><MessageBlip/><MessageBlip/>
      </MessageMiniMap>
      <PreviousMessagesContainer>
      <PreviousMessage className="canvas"/>
      <PreviousMessage className="canvas"/>
      <PreviousMessage className="canvas"/>
      </PreviousMessagesContainer>
    </MessagesContainer>

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
        <UserBox>
            <UserColorBox/>
            <p>Callum</p>
          </UserBox>
          <UserBox>
            <UserColorBox/>
            <p>Rowan</p>
          </UserBox>
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
    </Centered>
  </>
)

const UserColorBox = styled.div`
  width:15px;
  height:15px;
  background: gray;
`

const UserBox = styled.div`
  border: 2px dotted gray;
  padding-left:5px;
  padding-right:5px;
  display: flex;
  height:20px;
  gap:10px;
  justify-content: center;
  align-items: center;
`

const PreviousMessage = styled.div`
  width: calc(100% - 20px);
  height: 200px;
  background-color: white;
  border-radius: 8px;
  min-height: 200px;
  margin-right: 5px;
  border:3px solid gray;
`

const PreviousMessagesContainer = styled.div`
padding-top: 10px;
padding-bottom:10px;

  width:100%;
  height:calc(100% - 20px);
  overflow-y:auto;
  display: flex;
  gap:10px;
  flex-direction: column;
  align-items:flex-end;

`

const MessageBlip = styled.div`
  width: 25px;
  height: 5px;
  background:gray;
  margin-bottom: 5px;
`

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

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
  gap:10px;
  margin-right:10px;
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

  @media screen and (max-width: 600px){
    height:442px;
  }

`

const CanvasAndButtonContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background:white;
  height: 415px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px){
    height:442px;
  }
`

const MessageMiniMap = styled.div`
  width: 35px;
  height: 250px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background:white;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

`

const MessagesContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background:#AAAAB3;
  border-radius: 8px;
  height: 250px;
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

  @media screen and (max-width: 600px){
    height:402px;
  }
`

const KeyboardContainer = styled.div`
  width:100%;
  max-height: 170px;
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