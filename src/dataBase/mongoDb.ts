import mongoose from "mongoose";

const MongoDb = {
  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL as string;
    const username = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;

    mongoose.set("strictQuery", true);

    await mongoose.connect(url, { auth: { password, username } });
  },
};

export { MongoDb };
