import mongoose from "mongoose";
import { User } from "../utils/schemas";
import { hashPassword, comparePasswords } from "../utils/authentication";

interface UserModelExtended extends mongoose.Model<UserDoc> {
  build(user: User): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await hashPassword(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (user: User) => {
  return new UserModel(user);
};

export const UserModel = mongoose.model<UserDoc, UserModelExtended>(
  "User",
  userSchema
);
export default UserModel;
