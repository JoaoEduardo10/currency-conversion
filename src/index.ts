import { MongoDb } from "./dataBase/mongoDb";
import { server } from "./server/server";

MongoDb.connect()
  .then(() => {
    const PORT = process.env.PORT;

    server.listen(PORT, () => console.log(`starting server on port: ${PORT}`));
    console.log("connected to database");
    console.log(
      `Enter the documentation: http://localhost:${PORT}/api-currency-conversion/documentation`
    );
  })
  .catch((error: Error) => {
    console.log(`Error: ${error.message}`);
  });
