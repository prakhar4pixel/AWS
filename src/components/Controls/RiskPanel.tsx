import type { RiskCalculateResponse } from "../../types/api";
import { AlertTriangle, Thermometer, Wind, Leaf, Building2 } from "lucide-react";

interface RiskPanelProps {
    riskData: RiskCalculateResponse | null;
    loading: boolean;
}

export default function RiskPanel({ riskData, loading }: RiskPanelProps) {
    if (loading) {
        return (
            <div className="risk-panel loading">
                <div className="spinner"></div>
                <span>Analyzing environmental data...</span>
            </div>
        );
    }

    if (!riskData) return null;

    return (
        <div className="risk-panel active">
            <h3><AlertTriangle size={18} /> Climate Risk Assessment</h3>
            
            <div className={`risk-score-card risk-${riskData.risk_category.toLowerCase()}`}>
                <div className="score-value">{riskData.climate_risk}</div>
                <div className="score-label">{riskData.risk_category} Risk</div>
            </div>

            <div className="metrics-grid">
                <div className="metric-item">
                    <span className="metric-label"><Thermometer size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Temperature</span>
                    <span className="metric-value">{riskData.metrics.temperature}°C</span>
                </div>
                <div className="metric-item">
                    <span className="metric-label"><Wind size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> PM2.5</span>
                    <span className="metric-value">{riskData.metrics.pm25} µg/m³</span>
                </div>
                <div className="metric-item">
                    <span className="metric-label"><Leaf size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Vegetation (NDVI)</span>
                    <span className="metric-value">{riskData.metrics.ndvi}</span>
                </div>
                <div className="metric-item">
                    <span className="metric-label"><Building2 size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }}/> Built-up</span>
                    <span className="metric-value">{riskData.metrics.builtup_percentage}%</span>
                </div>
            </div>
        </div>
    );
}
