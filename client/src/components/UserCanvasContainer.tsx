import { cleanup } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { BigBrushIcon, ClearIcon, EraserToolIcon, PenToolIcon, PullIcon, SendIcon, SmallBrushIcon } from '../icons/CanvasIcons';
import { Keys } from './Keys';
import { Canvas } from './UserCanvas';
import {isMobile} from 'react-device-detect';
import { ClipLoader, FadeLoader } from 'react-spinners';



export const UserCanvasContainer = () => {

  const [userInput,setUserInput] = useState("")
  const [penType, setPenType] = useState(true)
  const [penWidth, setPenWidth] = useState(true)
  const [messages, setMessages] = useState<any>([])
  const [socket] = useState(() => io('wss://picto-socket.onrender.com/'))
  const [userColor,setUserColor] = useState("gray")

  const userCanvas = useRef<any>();
  const messageContainerRef = useRef<any>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { username, roomname } = useParams()



  useEffect(()=>{

    if(searchParams.get('username') === null || searchParams.get('username') === "" || searchParams.get('roomname') === null || searchParams.get('roomname') === ""){
      window.location.href = window.location.origin
    }

    socket.emit('joinRoom',{username:searchParams.get("username"), roomname: searchParams.get("roomname")})

    return () => {
      // THIS NEEDS FIXED
      socket.emit('leave room')
    }
  },[])



  const sendMessage = async () => {
    let message = {
      text: userInput,
      svg: await userCanvas.current.grabSvg(),
      image: await userCanvas.current.grabImage()
    }
    userCanvas.current.clearCanvas()
    setUserInput("")

    await socket.emit("chat",message)
  }

  useEffect(()=>{
    socket.on('message', (recv:any) => {
      setMessages((om:any)=>[...om, recv])
    })
  },[])

  useEffect(()=>{
    socket.connected && messageContainerRef?.current.scrollIntoView({behavior: 'smooth'})
    console.log(messages)
    setUserColor(messages[0]?.currentUserColor)
    userCanvas.current.setColor(messages[0]?.currentUserColor)
  },[messages])
  
return(
  <>
   <Centered>
    <h1 style={{color:"white"}}>{searchParams.get('roomname')}</h1>
    <MessagesContainer>
      <MessageMiniMap>
      {messages.length < 24 ? messages.map((message:any)=><MessageBlip style={{background: message.type === "announcement" ? 'gray' :message.color}}/>) : messages.slice(-24).map((message:any) => <MessageBlip style={{background: message.type === "announcement" ? 'gray' :message.color}}/>)}
      </MessageMiniMap>
      <PreviousMessagesContainer>
        <>
        {socket.connected ?
        <>
        {messages.map((message:any)=>{
          return (
            <>
           <PreviousMessage className='canvas' style={{ backgroundImage: `url(${message.image})`, borderColor: message.type === "announcement" ? 'gray' :message.color, minHeight: message.type === "announcement" ? 25 : 165, height: message.type === "announcement" ? 25 : 165}}>
                <CanvasTextContainer style={{left:-3, top:-3}}>
                <p>
                  {message.type !== 'announcement' && <div style={{borderColor: message.color}}><h3>{message.username}</h3></div>}
              {message.text}</p>
            </CanvasTextContainer> 
            </PreviousMessage>
            </>
          )
        })}
        <div ref={messageContainerRef}/>
        </>
        :
        <div style={{width: '100%', height: '100%', display: 'flex',justifyContent: 'center',alignItems:'center'}}>
          <ClipLoader color='white'/>
        </div>
      }
        </>
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
            <UserColorBox style={{background: userColor}}/>
            <p>{searchParams.get('username')}</p>
          </UserBox>
        </UserContainer>
        <UserInputContainer>
          <CanvasContainer >
            <Canvas ref={userCanvas} color={messages.length>0 ? userColor : 'gray'}/>
            <CanvasTextContainer>
              <p><div style={{borderColor: userColor}}><h3>{searchParams.get('username')}</h3></div>
              {userInput}</p>
            </CanvasTextContainer>
          </CanvasContainer>
          <InputContainer>
            <KeyboardContainer>
            {!isMobile &&
              <Keys contentState={[userInput,setUserInput]}/>
            }
            </KeyboardContainer>
            <SendButtonsContainer>
              <SendButton className="send" onClick={sendMessage}><SendIcon/></SendButton>
              <SendButton className="pull" onClick={() => {userCanvas.current.fillSvg(messages.filter((msg:any)=>msg.type == "message").at(-1).svg); setUserInput(messages.filter((msg:any)=>msg.type == "message").at(-1).text)}}><PullIcon/></SendButton>
              <SendButton className="clear"  onClick={()=> {userCanvas.current.clearCanvas(); setUserInput("")}}><ClearIcon/></SendButton>
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
  cursor: pointer;

  & svg {
    height: 90%;
  }

  &:hover{
    filter: brightness(105%);
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
  height: 165px;
  background-color: white;
  border-radius: 8px;
  min-height: 165px;
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
  height: calc(100vh - 50px);
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
  cursor: pointer;

  &:hover{
    filter: brightness(105%);
  }

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
  overflow:hidden;

  margin-left: 10px;
  margin-top: 20px;
  margin-right:10px;
  border-radius: 15px;

  @media screen and (max-width: 600px){
    max-height:120.5px;

    & *{
      display: none;
    }
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