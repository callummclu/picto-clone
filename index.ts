import express from 'express'
import {Server} from 'socket.io'
import color, { reset } from 'colors'
import http from 'http'
import cors from 'cors'
import { get_Current_User, user_Disconnect, join_User, get_Users} from './helpers/dummyUser'
const app = express();

const server = http.createServer(app)

const randomColors = [
  "#1345bd",    
  "#a21e6d", 
  "#c9a602", 
  "#664261", 
  "#bd85c6", 
  "#f894ba", 
  "#0a01fe", 
  "#f9c059", 
  "#3f4f49", 
  "#ae9e81", 
  "#9dd7c3", 
  "#58bcd4", 
  "#f90e18", 
  "#cb4ce9", 
  "#588151", 
  "#7fd3a2", 
  "#ba67fc", 
  "#ddbbc0", 
  "#aec15c", 
  "#85eedf", 
  "#b95ecd"
]

const randomColor = () => randomColors[Math.floor(Math.random() * randomColors.length)]


const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on("connect", (socket:any) => {
    socket.on("joinRoom", ({username, roomname}:{username:string, roomname:string}) =>{
        // CREATE USER
        const p_user = join_User(socket.id, username, roomname,randomColor())
        socket.join(p_user.room)

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`,
            type:"announcement",
            users: get_Users(p_user.room),
            currentUserColor: get_Current_User(socket.id).color
          });
      
          //displays a joined room message to all other room users except that particular user
          socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
            color: p_user.color,
            type:"announcement",
            users: get_Users(p_user.room)


          });
      
    } )

    socket.on("chat", ({text,svg,image}:{text:string, svg:any,image:string}) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);
        io.to(p_user.room).emit("message", {
          userId: p_user.id,
          username: p_user.username,
          text: text,
          svg,
          color: p_user.color,
          image,
          type:"message"
        });
        console.log(text)
      });

      socket.on("disconnect", () => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);
    
        if (p_user) {
          io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has left the room`,
            type:"announcement",
            users: get_Users(p_user.room)
          });
        }
      });
    
})


server.listen(5000, () =>{
    console.log("listening on port"+5000)
});
  