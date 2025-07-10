import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { Email } = reqbody;
        const user = await User.findOne({ Email })
        if (!user) {
            return NextResponse.json(
                { message: "User not Found" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "User Found", Data: user }
        )

    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}