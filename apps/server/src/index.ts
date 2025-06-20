import Fastify from "fastify";
import { registerRoutes } from "./routes";

const app = Fastify();

registerRoutes(app);

app.listen({ port: 3001 }, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
