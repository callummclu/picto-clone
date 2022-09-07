import express from 'express'
import {Server} from 'socket.io'
import color, { reset } from 'colors'
import http from 'http'
import cors from 'cors'
import { get_Current_User, user_Disconnect, join_User} from './helpers/dummyUser'
const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on("connect", (socket:any) => {
    socket.on("joinRoom", ({username, roomname}:{username:string, roomname:string}) =>{
        // CREATE USER
        const p_user = join_User(socket.id, username, roomname)
        console.log(socket.id, "=id")
        socket.join(p_user.room)

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`,
          });
      
          //displays a joined room message to all other room users except that particular user
          socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
          });
      
    } )

    socket.on("chat", ({text,svg}:{text:string, svg:any}) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);
    
        console.log(p_user.username,":",text)

        io.to(p_user.room).emit("message", {
          userId: p_user.id,
          username: p_user.username,
          text: text,
          svg
        });
      });

      socket.on("disconnect", () => {
        //the user is deleted from array of users and a left room message displayed
        const p_user = user_Disconnect(socket.id);
    
        if (p_user) {
          io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has left the room`,
          });
        }
      });
    
})


server.listen(5000, () =>{
    console.log("listening on port"+5000)
});
  