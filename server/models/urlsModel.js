// userModel.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config({});

const secretKey = process.env.HASH_SECRET;

function sha256Hash(text) {
    return crypto.createHmac("sha256", secretKey).update(text).digest("hex");
}

const urlDataSchema = new mongoose.Schema({
    zones: {
        enum: ["EU", "FE", "NA", "AP", "SA", "AF", "WW"],
        required: true
    },
    urls:
    {
        type: String,
        required: true
    },

}, { timestamps: true });