import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json()
        const { product, Email } = reqbody;

        const user = await User.findOne({ Email })
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        let updateAction;
        const productId = product._id

        const isInWishlist = user.WishList.includes(productId);

        if (isInWishlist) {
            await User.updateOne({ Email }, { $pull: { WishList: productId } });
            return NextResponse.json(
                { message: "Removed from wishlist", success: true },
                { status: 200 });
        } else {
            await User.updateOne({ Email }, { $addToSet: { WishList: productId } });
            return NextResponse.json(
                { message: "Added to wishlist", success: true },
                { status: 200 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error.message }, { status: 500 }
        )
    }
}