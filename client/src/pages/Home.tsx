import { useRef } from "react"
import styled from "styled-components"

export const Home = () => {

    let usernameRef = useRef<any>()
    let roomnameRef = useRef<any>()

    const joinRoom = (e:any) => {
        e.preventDefault()
        window.location.href = (window.location.origin+`/chat?username=${usernameRef.current.value}&roomname=${roomnameRef.current.value}`);
    }

    return (
        <Centered>
        <JoinFormContainer>
        <form onSubmit={joinRoom}>
            <h1>PictoClone</h1>
            <p>Join a room</p>
        <label>username</label>
        <input type="text" ref={usernameRef} name="username" placeholder="Username" required></input>
        <label>room number</label>
        <input type="number" ref={roomnameRef} name="roomNumber" placeholder="Room Number" required></input>
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
width: 100%;
max-width: 650px;
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