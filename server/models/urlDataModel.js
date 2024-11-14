// // urlDataModel.js
// import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import crypto from "crypto";
// // dotenv.config({});

// // const secretKey = process.env.HASH_SECRET;

// // function sha256Hash(text) {
// //     return crypto.createHmac("sha256", secretKey).update(text).digest("hex");
// // }

// const urlDataSchema = new mongoose.Schema({
//     zones: {
//         enum: ["EU", "FE", "NA", "AP", "SA", "AF", "WW"],
//         required: true
//     },
//     urls: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "url",
//     }]

// }, { timestamps: true });

// // // Pre-save middleware to hash zones if not already hashed
// // urlDataSchema.pre("save", function (next) {
// //     if (this.isModified("zones")) {
// //         // Verify that zones matches one of the allowed values before hashing
// //         if (["EU", "FE", "NA", "AP", "SA", "AF", "WW"].includes(this.zones)) {
// //             this.zones = sha256Hash(this.zones);
// //         } else {
// //             return next(new Error("Invalid zones value"));
// //         }
// //     }
// //     next();
// // });


// export const urlData = mongoose.model("urlData", urlDataSchema);



// urlDataModel.js
import mongoose from "mongoose";
const urlDataSchema = new mongoose.Schema({
    zones: {
        enum: ["EU", "FE", "NA", "AP", "SA", "AF", "WW"],
        required: true
    },
    urls: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "url"
    }]

}, { timestamps: true });

export const urlData = mongoose.model("urlData", urlDataSchema);