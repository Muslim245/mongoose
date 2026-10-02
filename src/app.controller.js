import { connectDB } from "./DB/connection.js"
import { noteRouter, userRouter } from "./modules/index.js"

export const bootstrap = async (app , express)=>{

app.use(express.json())
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/notes" , noteRouter)

await connectDB()
}