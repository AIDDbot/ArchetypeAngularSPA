/**
 * {
  "status": "success",
  "country": "Spain",
  "countryCode": "ES",
  "region": "GA",
  "regionName": "Galicia",
  "city": "Ordes",
  "zip": "15680",
  "lat": 43.069,
  "lon": -8.4056,
  "timezone": "Europe/Madrid",
  "isp": "RIMA (Red IP Multi Acceso)",
  "org": "",
  "as": "AS3352 TELEFONICA DE ESPANA S.A.U.",
  "query": "37.13.98.153"
}
 */

export type IpApi = {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};
