import express from "express"
import {createServer} from "node:http"

import {Server} from "socket.io"

import mongoose from "mongoose"
import { connectToSocket } from "./controllers/socketManger.js"

import cors from "cors"
import userRouters from "./routes/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT||8001))

app.use(cors());
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb",extended:true}))

app.use("/api/v1/users",userRouters);

const start =async()=>{
    app.set("mongo_user")
    const connectionDb=await mongoose.connect("mongodb+srv://kunaltailor5555:V7zDIpwoBMXrOLIV@cluster0.zgwcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`mongo connected DB host : ${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("listening")
    })
}

start();


