const mongoose = require('mongoose')
const connectDb = async() => {

    try{
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.DB_URL)
        console.log(`Database connected${connect.connection.host}`);
    }catch(error){
    console.log(error);
    }
}

module.exports = connectDb