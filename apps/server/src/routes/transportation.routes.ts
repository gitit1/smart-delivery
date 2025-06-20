import { FastifyInstance } from "fastify";
import { TransportationSystem } from "../services/transportationSystem.service";

export const transportationSystem = new TransportationSystem();

export async function transportationRoutes(app: FastifyInstance) {
  app.post("/check-in", async (req, res) => {
    const { id, stationName, time } = req.body as {
      id: number;
      stationName: string;
      time: number;
    };

    transportationSystem.checkIn(id, stationName, time);
    return { status: "checked in" };
  });

  app.post("/check-out", async (req, res) => {
    const { id, stationName, time } = req.body as {
      id: number;
      stationName: string;
      time: number;
    };

    transportationSystem.checkOut(id, stationName, time);
    return { status: "checked out" };
  });

  app.get("/average-time", async (req, res) => {
    const { startStation, endStation } = req.query as {
      startStation: string;
      endStation: string;
    };

    const avg = transportationSystem.getAverageTime(startStation, endStation);
    return { averageTime: avg };
  });
}
