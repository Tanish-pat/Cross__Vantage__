// // urlModel.js
// import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import crypto from "crypto";
// // dotenv.config({});

// // const secretKey = process.env.HASH_SECRET;

// // function sha256Hash(text) {
// //     return crypto.createHmac("sha256", secretKey).update(text).digest("hex");
// // }

// const urlSchema = new mongoose.Schema({
//     url:
//     {
//         type: String,
//         required: true
//     },

// }, { timestamps: true });

// // urlSchema.pre("save", function (next) {
// //     if (this.isModified("url")) {
// //         this.url = sha256Hash(this.url);
// //     } else {
// //         return next(new Error("Invalid url value"));
// //     }
// //     next();
// // });

// export const urlData = mongoose.model("urlData", urlSchema);


// urlModel.js
import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    endPoint:
    {
        type: String,
        required: true
    },

}, { timestamps: true });

export const url = mongoose.model("url", urlSchema);