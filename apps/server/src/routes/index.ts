import { FastifyInstance } from "fastify";
import { transportationRoutes } from "./transportation.routes";

export async function registerRoutes(app: FastifyInstance) {
  await transportationRoutes(app);
}
