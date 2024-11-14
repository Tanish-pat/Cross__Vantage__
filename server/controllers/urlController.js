import { Url } from "../models/urlModel.js";
import { urlData } from "../models/urlDataModel.js";

export const createUrl = async (req, res) => {
    try {
        const { zone , url } = req.body;
        if (!url || !zone) {
            console.log("All fields are required");
            return res.status(400).json({ message: "All fields are required" });
        }
        const urlData = await Url.findOne({ url });
        if (urlData) {
            console.log("Url already exists");
            return res.status(400).json({ message: "Url already exists" });
        }
        await Url.create({ url });

        console.log("Url created successfully");
        return res.status(201).json({ message: "Url created successfully", success: true });
    } catch (error) {
        console.log(error);
    }
}

export const getUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        console.log("Urls fetched successfully");
        return res.status(200).json({ urls });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUrl = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            console.log("Url id is required");
            return res.status(400).json({ message: "Url id is required" });
        }
        const url = await Url.findByIdAndDelete(id);
        if (!url) {
            console.log("Url not found");
            return res.status(404).json({ message: "Url not found" });
        }
        console.log("Url deleted successfully");
        return res.status(200).json({ message: "Url deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}