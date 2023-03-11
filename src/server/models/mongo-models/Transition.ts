import { model, Schema } from "mongoose";
import { ITransition } from "../protocols";

const Transition = model(
  "Transition",
  new Schema<Omit<ITransition, "id" | "destinationValue">>({
    acheat_at: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    originValue: {
      type: Number,
      min: 1,
      require: true,
    },
    conversionRate: {
      type: Number,
      require: true,
    },
    destinationCurrency: {
      type: String,
      enum: ["BRL", "USD", "JPY"],
    },
    origintionCurrency: {
      type: String,
      enum: ["EUR"],
    },
  })
);

export { Transition };
