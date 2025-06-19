import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, "Please Provide A Username"],
        unique: false,
    },
    Email: {
        type: String,
        required: [true, "Please Provide A Email"],
        unique: false,
    },
    Password: {
        type: String,
        required: [true, "Please Provide A Password"],
        unique: false,
    },

})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User;