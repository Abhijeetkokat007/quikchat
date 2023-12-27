import  Express  from "express";
// import core from "core";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = Express();
app.use(Express.json());
// app.use(cors());

const connectDB = async () => {
try{
    const response = await mongoose.connect(process.env.MONGODB_URI);
    if(response){
        console.log(" MongoBD Connected") 
    }
  }
  catch(e){
    console.log(e.message);
  }

}



const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
    connectDB()
})