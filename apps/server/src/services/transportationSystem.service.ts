export class TransportationSystem {
  private checkIns = new Map<number, { station: string; time: number }>();
  private tripStats = new Map<string, { totalTime: number; count: number }>();
  private trips: {
    driverId: number;
    from: string;
    to: string;
    startTime: number;
    endTime: number;
    duration: number;
  }[] = [];

  constructor() {
    // אפשר להכניס כאן אתחול בעתיד
  }

  checkIn(id: number, station: string, time: number): void {
    if (this.checkIns.has(id)) {
      console.warn(`Driver ${id} is already checked in.`);
      return;
    }

    this.checkIns.set(id, { station, time });
  }

  checkOut(id: number, endStation: string, time: number): void {
    const checkInData = this.checkIns.get(id);

    if (!checkInData) {
      console.warn(`Driver ${id} is not checked in.`);
      return;
    }

    const { station: startStation, time: startTime } = checkInData;
    const duration = time - startTime;
    const routeKey = `${startStation}->${endStation}`;

    // עדכון סטטיסטיקה
    const currentStats = this.tripStats.get(routeKey) || {
      totalTime: 0,
      count: 0,
    };

    this.tripStats.set(routeKey, {
      totalTime: currentStats.totalTime + duration,
      count: currentStats.count + 1,
    });

    // שמירה בהיסטוריית נסיעות
    this.trips.push({
      driverId: id,
      from: startStation,
      to: endStation,
      startTime,
      endTime: time,
      duration,
    });

    // מחיקה מה־checkIns
    this.checkIns.delete(id);
  }

  getAverageTime(from: string, to: string): number {
    const routeKey = `${from}->${to}`;
    const stats = this.tripStats.get(routeKey);

    if (!stats || stats.count === 0) {
      console.warn(`No trips found from ${from} to ${to}.`);
      return 0;
    }

    return stats.totalTime / stats.count;
  }

  getTrips(): typeof this.trips {
    return this.trips;
  }
}
