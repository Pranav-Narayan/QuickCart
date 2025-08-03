import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { SignJWT } from "jose";

connectDB();

export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { Email, Password } = reqbody;

        // Email Validation
        const user = await User.findOne({ Email });
        if (!user) {
            console.log("User Not Found");
            return NextResponse.json({ error: "Invalid Email Address" });
        }

        // Password Validation
        const validPassword = await bcryptjs.compare(Password, user.Password);
        if (!validPassword) {
            console.log("Incorrect Password");
            return NextResponse.json({ error: "Invalid Password" });
        }

        // Token generation with jose
        const tokenData = {
            id: user._id,
            username: user.Username,
            email: user.Email,
        };

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1h")
            .sign(secret);

        const response = NextResponse.json(
            {
                message: "Login Successful",
                success: true,
            },
            { status: 200 }
        );

        // Adding token to cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600, // 1 hour
            path: "/",
        });

        console.log("Login Successful");
        return response;
    } catch (error) {
        console.log("Login API Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}