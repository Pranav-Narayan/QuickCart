import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { Email, itemId, action } = reqbody;
        const user = await User.findOne({ Email })
        if (!user) {
            return NextResponse.json(
                { message: "User Not Found" }
            )
        }
        const cartItem = user.CartList.find((item) => item.itemId === itemId);

        if (!cartItem) {
            return NextResponse.json({ message: "Cart Item Not Found" }, { status: 404 });
        }

        if (action === "increment") {
            await User.updateOne(
                { Email, "CartList.itemId": itemId },
                { $inc: { "CartList.$.count": 1 } }
            );
            return NextResponse.json({ message: "Item Count Incremented", success: true }, { status: 200 });
        }
        if (action === "decrement") {
            if (cartItem.count > 1) {
                await User.updateOne(
                    { Email, "CartList.itemId": itemId },
                    { $inc: { "CartList.$.count": -1 } }
                );
                return NextResponse.json({ message: "Item Count Decremented", success: true }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Item count already at 0", success: false }, { status: 200 });
            }
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