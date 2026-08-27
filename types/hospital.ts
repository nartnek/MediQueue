export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  waitTime: number | null;
  lastUpdated: string;
  latitude: number;
  longitude: number;
}