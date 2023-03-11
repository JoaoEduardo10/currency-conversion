import { model, Schema } from "mongoose";
import { TOmitId } from "../../types/globals-types";
import { IUser } from "../protocols";

const User = model(
  "User",
  new Schema<TOmitId<IUser>>({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
    name: {
      type: String,
      required: true,
      min: 3,
    },
  })
);

export { User };
