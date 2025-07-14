import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connectDB()

export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { itemId, Email } = reqbody;
        const user = await User.findOne({ Email })
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 402 }
            )
        }
        // const isInCartlist = user.CartList.includes(itemId);
        await User.updateOne({ Email }, { $pull: { CartList: { itemId } } })

        return NextResponse.json(
            {
                message: "removed from cart"
            }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "Error in remove item from cart" },
            { status: 500 }
        )
    }
}