import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectDB()
export async function POST(request) {
    try {
        const reqbody = await request.json();
        const { Email, fullName, phoneNumber, pincode, area, city, state } = reqbody;

        const user = await User.findOne({ Email })
        const Address = {
            fullName,
            phoneNumber,
            pincode,
            area,
            city,
            state
        }
        user.ShippingAddress.push(Address)
        await user.save();

        return NextResponse.json(
            { message: "Shipping address updated", success: true },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error.message }, { status: 500 }
        )
    }
}