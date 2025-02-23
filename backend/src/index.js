const express=require("express")
const dotenv=require("dotenv");
const connectDb = require("./lib/db");
const authRoute=require("./routers/auth.router")
const postRoute=require("./routers/post.router")
const messageRoute=require("./routers/message.router")
const cookieParser=require("cookie-parser")
const cors=require("cors")

dotenv.config();

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend requests
    credentials: true, // Allow cookies & authentication headers
}));
app.use("/api/auth/",authRoute)
app.use("/api/post/",postRoute)
app.use("/api/message/",messageRoute)


const PORT=process.env.PORT;
app.listen(PORT || 5000,()=>{
    console.log(`listening at port no. ${PORT}`);
    connectDb();
})