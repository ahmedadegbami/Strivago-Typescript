import mongoose, { Model, Document } from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

interface User {
  email: string;
  password: string;
  role: string;
}

interface UserDocument extends User, Document {}

interface UserModel extends Model<UserDocument> {
  checkCredentials(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}

const usersSchema = new Schema(
  {
    email: { type: String, required: true },
    role: { type: String, enum: ["host", "guest"], default: "guest" },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 11);
  }
  next();
});

usersSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

usersSchema.static("checkCredentials", async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return user;
    } else {
      return null;
    }
  }
  return null;
});

export default model<UserDocument, UserModel>("User", usersSchema);
