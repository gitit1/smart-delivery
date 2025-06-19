import Fastify from "fastify";

const app = Fastify();

app.get("/ping", async (request, reply) => {
  return { msg: "pong!" };
});

app.listen({ port: 3001 }, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
