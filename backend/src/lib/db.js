const mongoose=require("mongoose")

const connectDb=async ()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongodb connected: ${connect.connection.host}`)       
    } catch (error) {
        console.log("Error from db lib: ",error.message);
    }
}


module.exports=connectDb;
