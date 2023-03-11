import { server } from "./server/server";

const PORT = 8000;

server.listen(PORT, () => console.log(`starting server on port: ${PORT}`));
