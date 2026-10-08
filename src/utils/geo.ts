import area from "@turf/area";
import type { Feature, Polygon, MultiPolygon } from "geojson";

export function calculateAreaMetrics(feature: Feature<Polygon | MultiPolygon> | null) {
  if (!feature) {
    return { areaKm2: 0, areaHectares: 0 };
  }
  
  const squareMeters = area(feature);
  const areaKm2 = Number((squareMeters / 1_000_000).toFixed(2));
  const areaHectares = Number((squareMeters / 10_000).toFixed(2));

  return { areaKm2, areaHectares };
}
