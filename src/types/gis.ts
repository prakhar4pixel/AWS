import type { Feature, Polygon, MultiPolygon } from "geojson";

export interface SelectionInfo {
  geometry: Feature<Polygon | MultiPolygon> | null;
  areaKm2: number;
  areaHectares: number;
}
