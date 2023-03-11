import { MongoDb } from "./dataBase/mongoDb";
import { server } from "./server/server";

MongoDb.connect()
  .then(() => {
    const PORT = process.env.PORT;

    server.listen(PORT, () => console.log(`starting server on port: ${PORT}`));
    console.log("connected to database");
  })
  .catch((error: Error) => {
    console.log(`Error: ${error.message}`);
  });
