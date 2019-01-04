export class Station {
  number: number;
  contract_name: string;
  name: string;
  address: string;
  position: {
    'lat': number,
    'lng': number
  };
  banking: boolean;
  bonus: boolean;
  status: string;
  bike_stands: number;
  available_bike_stands: number;
  available_bikes: number;
  last_update: number;

  private lat_rad: number;
  private lng_rad: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  static getDistanceFromStations(a: Station, b: Station): number {
    a.lat_rad = (a.position.lat * Math.PI) / 180;
    a.lng_rad = (a.position.lng * Math.PI) / 180;
    b.lat_rad = (b.position.lat * Math.PI) / 180;
    b.lng_rad = (b.position.lng * Math.PI) / 180;


    const dist: number = Math.acos(Math.sin(a.lat_rad) * Math.sin(b.lat_rad) + Math.cos(a.lat_rad) *
      Math.cos(b.lat_rad) * Math.cos(a.lng_rad - b.lng_rad)) * 60 * 1.852 * 180 / Math.PI;
    console.log('distance ' + this.name + ' à ' + a.name + ' : ' + dist);
    return dist;
  }

  static getStationsProche(a: Station[], b: Station): Station[] {
    const newList: Station[] = [];
    a.forEach(function (station) {
      if (Station.getDistanceFromStations(station, b) < 0.5) {
        newList.push(station);
      }
    });
    return newList;
  }
}
