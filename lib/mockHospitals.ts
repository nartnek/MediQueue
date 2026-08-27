import { Hospital } from "@/types/hospital";

export const mockHospitals: Hospital[] = [
  {
    id: "vgh",
    name: "Vancouver General Hospital",
    address: "899 W 12th Ave, Vancouver, BC",
    distance: 1.8,
    waitTime: 32,
    lastUpdated: "5 min ago",
    latitude: 49.261,
    longitude: -123.123,
  },
  {
    id: "stpauls",
    name: "St. Paul's Hospital",
    address: "1081 Burrard St, Vancouver, BC",
    distance: 3.2,
    waitTime: 51,
    lastUpdated: "8 min ago",
    latitude: 49.280,
    longitude: -123.130,
  },
  {
    id: "msj",
    name: "Mount Saint Joseph Hospital",
    address: "3080 Prince Edward St, Vancouver, BC",
    distance: 4.1,
    waitTime: 24,
    lastUpdated: "3 min ago",
    latitude: 49.256,
    longitude: -123.096,
  },
];