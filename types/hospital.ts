export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  distance: number;
  waitTime: number | null;
  lastUpdated: string | null;
}