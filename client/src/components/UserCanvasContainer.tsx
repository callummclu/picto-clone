import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BigBrushIcon, ClearIcon, EraserToolIcon, PenToolIcon, PullIcon, SendIcon, SmallBrushIcon } from '../icons/CanvasIcons';
import { Keys } from './Keys';
import { Canvas } from './UserCanvas';

export const UserCanvasContainer = () => {

  const [userInput,setUserInput] = useState("")
  const [penType, setPenType] = useState(true)
  const [penWidth, setPenWidth] = useState(true)

  const userCanvas = useRef<any>();
  
return(
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
      <CircleButton style={{backgroundColor: `${penType ? 'lightblue' : 'lightgray'}`}} onClick={()=> {userCanvas.current.penMode(); setPenType(true)}}><PenToolIcon/></CircleButton>
      <CircleButton style={{backgroundColor: `${!penType ? 'lightblue': 'lightgray'}`}} onClick={()=> {userCanvas.current.eraseMode(); setPenType(false)}}><EraserToolIcon/></CircleButton>

      <br/>
      <CircleButton style={{backgroundColor: `${penWidth ? 'lightblue' : 'lightgray'}`}} onClick={()=> {userCanvas.current.smallPenMode(); setPenWidth(true)}}><SmallBrushIcon/></CircleButton>
      <CircleButton style={{backgroundColor: `${!penWidth ? 'lightblue': 'lightgray'}`}} onClick={()=> {userCanvas.current.bigPenMode(); setPenWidth(false)}}><BigBrushIcon/></CircleButton>
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
          <CanvasContainer>
            <Canvas ref={userCanvas}/>
            <CanvasTextContainer>
              <p><div><h3>callum</h3></div>
              {userInput}</p>
            </CanvasTextContainer>
          </CanvasContainer>
          <InputContainer>
            <KeyboardContainer>
              <Keys contentState={[userInput,setUserInput]}/>
            </KeyboardContainer>
            <SendButtonsContainer>
              <SendButton className="send"><SendIcon/></SendButton>
              <SendButton className="pull"><PullIcon/></SendButton>
              <SendButton className="clear"  onClick={()=> userCanvas.current.clearCanvas()}><ClearIcon/></SendButton>
            </SendButtonsContainer>
          </InputContainer>
        </UserInputContainer>
      </UserAreaContainer>
    </CanvasAndButtonContainer>
    </Centered>
  </>
)
}

const CanvasTextContainer = styled.div`
  position:absolute;
  top:0;
  width: calc(100% - 30px);
  left: 16px;
  height: calc(100%);
  user-select: none;
  pointer-events: none;
  display: flex;

  & div {
    min-width: 100px;
    height: 30px;
    border: 3px solid gray;
    border-top: 2px solid gray;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    display: inline-block;
    text-align: center;
    line-height: 0;
    background: white;
    margin-left: -5px;

    & h3 {
      margin-top: 15px;
      font-size: 20px;
    }
  }

  & p {
    margin-top: 1px;
    line-height: 30px;
    padding-left:5px;
    overflow-wrap: break-word;
    white-space: pre-line;
  }

`

const CanvasContainer = styled.div`
  position:relative;
  display:flex;
  width:100%;
  margin-top: 16px;
  margin-left: 10px;
  justify-content: flex-end;
`

const SendButton = styled.div`
  background-color: #D9D9D9;
  width:100%;
  height: 33%;
  display:flex;
  justify-content: center;
  align-items: center;

  & svg {
    height: 90%;
  }
`

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
position: relative;
bottom:0;

 &::-webkit-scrollbar {
    display: none;
}


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
  display: flex;
  align-items: center;
  justify-content: center;

  & svg{
    padding:5px;
  }
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
  height: 395px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px){
    height:390px;
  }

`

const CanvasAndButtonContainer = styled.div`
  width: 100%;
  max-width: 480px;
  background:white;
  height: 395px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px){
    height:390px;
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
  height:358px;
  border-radius: 10px;
  display:flex;
  flex-direction: column;
  align-items: flex-end;

  & div:first-child{
    margin-right: 5px;
  }

  @media screen and (max-width: 600px){
    height:352px;
  }
`

const KeyboardContainer = styled.div`
  width:100%;
  max-height: 148px;
  background:white;
  background-image: url("https://i.imgur.com/QkNhB5p.png");
  background-size: contain;

  margin-left: 10px;
  margin-top: 20px;
  margin-right:10px;
  border-radius: 15px;

  @media screen and (max-width: 600px){
    max-height:120.5px;
  }
`

const InputContainer = styled.div`
  display:flex;
  width:100%;
  height:230px;
  flex-grow: 1;
`

const SendButtonsContainer = styled.div`
  height:150px;
  width:80px;
  background:white;
  border-top-left-radius: 15px;
  overflow: hidden;
  border-bottom-left-radius: 15px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap:2px;

  & .clear {height:24%;padding-top: 7px;padding-bottom: 6px}
  & .send {height: 35%}
  & .pull {height: 24%;padding-top: 7px;padding-bottom: 6px}

  @media screen and (max-width: 600px){
    max-height:120.5px;

    & .clear {padding-top: 4px;padding-bottom: 3px}
  & .send {padding-top: 2px;padding-bottom: 1px}
  & .pull {padding-top: 4px;padding-bottom: 3px}
  }

`