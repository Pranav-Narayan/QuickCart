import mongoose from "mongoose";

export async function connectDB(params) {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const dbConnection = mongoose.connection;
        dbConnection.on('connected', () => {
            console.log('MongoDb connected Successfully.....')
        })

        dbConnection.on('error', (e) => {
            console.log('MongoDb Connection Error:' + e)
        })
    } catch (error) {
        console.log('Something Goes Wrong...')
        console.log(error)
    }
}