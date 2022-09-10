import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

export const Home = () => {

    let usernameRef = useRef<any>()
    let roomnameRef = useRef<any>()
    const [searchParams, setSearchParams] = useSearchParams()
    const [roomId, setRoomId] = useState(()=> searchParams.get('room'))

    const joinRoom = (e:any) => {
        e.preventDefault()
        window.location.href = (window.location.origin+`/chat?username=${usernameRef.current.value}&roomname=${roomnameRef.current.value}`);
    }

    return (
        <Centered>
        <JoinFormContainer>
        <form onSubmit={joinRoom}>
            <h1>PictoClone</h1>
            <h3>Join a room</h3>
        <label>username</label>
        <input type="text" ref={usernameRef} name="username" placeholder="Username" required></input>
        <label>room number</label>
        <input type="number" ref={roomnameRef} name="roomNumber" placeholder="Room Number" defaultValue={parseInt(roomId as string) || ''} required></input>
        <button type="submit" name="submit">Join</button>
        </form>
        </JoinFormContainer>
        </Centered>
    )
}

const Centered = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
`

const JoinFormContainer = styled.div`
border-radius: 10px;
background:white;
border: 3px solid gray;
width: 100%;
max-width: 650px;

& h1 {
    text-align: center;
}

& h3{
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
`