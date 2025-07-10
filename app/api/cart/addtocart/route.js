import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB();

export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { itemId, Email } = reqbody;
        const user = await User.findOne({ Email })
        if (!user) {
            return NextResponse.json(
                { message: "USER NOTFOUND" },
                { status: 500 }
            )
        }
        const isInCartlist = user.CartList.includes(itemId);
        if (!isInCartlist) {
            await User.updateOne({ Email }, { $addToSet: { CartList: itemId } });
        }

        return NextResponse.json(
            { message: "Add to cart done", success: true },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}