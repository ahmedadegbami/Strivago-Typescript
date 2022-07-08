"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const accomodationsSchema = new Schema({
    name: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    location: { type: String, required: true }
}, { timestamps: true });
exports.default = model("Accomodation", accomodationsSchema);
