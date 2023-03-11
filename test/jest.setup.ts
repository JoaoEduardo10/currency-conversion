import mongoose from "mongoose";
import supertest from "supertest";
import { server } from "../src/server/server";
import "dotenv/config";

beforeAll(async () => {
  const url = process.env.MONGODB_URL as string;
  const username = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;

  mongoose.set("strictQuery", true);

  await mongoose.connect(url, { auth: { password, username } });
});

afterAll(async () => {
  await mongoose.connection.close();
});

export const serverTest = supertest(server);
