import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { Email, itemId, action } = reqbody;
        console.log(action)
        const user = await User.findOne({ Email })
        if (!user) {
            return NextResponse.json(
                { message: "User Not Found" }
            )
        }
        if (action === 'increment') {
            console.log("Increment")
            return NextResponse.json({ message: "increment" })
        }
        else if (action == 'decrement') {
            console.log("Decrement")
            return NextResponse.json({ message: "decrement" })
        }

        return NextResponse.json(
            { message: "Cart count updated", success: true }, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error.message }, { status: 500 }
        )
    }
}