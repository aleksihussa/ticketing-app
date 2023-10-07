import mongoose from "mongoose";
import { User } from "../utils/schemas";

interface UserModelExtended extends mongoose.Model<any> {
  build(user: User): any;
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
userSchema.statics.build = (user: User) => {
  return new UserModel(user);
};

export const UserModel = mongoose.model<any, UserModelExtended>(
  "User",
  userSchema
);

export default UserModel;
