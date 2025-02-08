const express=require("express")
const dotenv=require("dotenv");
const connectDb = require("./lib/db");
const authRoute=require("./routers/auth.router")
const cookieParser=require("cookie-parser")

dotenv.config();

const app=express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth/",authRoute)


const PORT=process.env.PORT;
app.listen(PORT || 5000,()=>{
    console.log(`listening at port no. ${PORT}`);
    connectDb();
})