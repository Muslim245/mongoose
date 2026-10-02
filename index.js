import express from "express"
import { bootstrap } from "./src/app.controller.js";
const app = express()

await bootstrap(app , express)

app.listen(process.env.port , ()=>{
    console.log(`server is running on 127.0.0.1:${process.env.port}`);
    
})