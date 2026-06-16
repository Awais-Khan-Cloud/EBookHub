import mongoose from "mongoose";


function handleError(error) {
    console.error("Custom Error handler ", error.message)
    process.exit(1)
}


const connectDb =  async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI) 
        console.log("MongoDb is Connected");
        
    } catch(error){
      handleError(error);  
    }
} 
3

export default connectDb;