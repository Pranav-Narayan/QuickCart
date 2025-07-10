import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { Username, Email, Password } = reqbody;

        const user = await User.findOne({ Email });
        if (user) {
            console.log("Email already Exists")
            return NextResponse.json(
                { message: "Email already Exists" },
                { status: 404 }
            )
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(Password, salt)
        const newUser = new User({
            Username,
            Email,
            Password: hashedPassword
        })

        await newUser.save()
        return NextResponse.json(
            { message: "Signup Successfull..!", success: true },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { success: true }
        );
    }
}