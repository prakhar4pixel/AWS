export interface EnvironmentalMetrics {
    temperature: number;
    pm25: number;
    ndvi: number;
    builtup_percentage: number;
    green_coverage: number;
    water_body_fraction: number;
}

export interface RiskBreakdown {
    heat: number;
    air_pollution: number;
    vegetation_deficiency: number;
    builtup_density: number;
}

export type RiskCategory = "Low" | "Moderate" | "High" | "Critical";

export interface AreaAnalyzeResponse {
    area_km2: number;
    area_hectares: number;
    metrics: EnvironmentalMetrics;
    data_source: string;
}

export interface RiskCalculateResponse {
    area_km2: number;
    area_hectares: number;
    metrics: EnvironmentalMetrics;
    risk_breakdown: RiskBreakdown;
    climate_risk: number;
    risk_category: RiskCategory;
    weights: Record<string, number>;
}
