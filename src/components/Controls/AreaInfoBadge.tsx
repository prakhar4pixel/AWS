import type { SelectionInfo } from "../../types/gis";

interface AreaInfoBadgeProps {
  selection: SelectionInfo | null;
}

export default function AreaInfoBadge({ selection }: AreaInfoBadgeProps) {
  if (!selection || !selection.geometry || selection.areaKm2 === 0) {
    return (
      <div className="area-info-badge hint">
        <span className="badge-icon">📍</span>
        <span>Draw a polygon on the map to select an urban area</span>
      </div>
    );
  }

  return (
    <div className="area-info-badge active">
      <div className="badge-header">
        <span className="badge-icon">📐</span>
        <span className="badge-title">Selected Area</span>
      </div>
      <div className="badge-values">
        <span className="primary-val">{selection.areaKm2} km²</span>
        <span className="secondary-val">({selection.areaHectares} ha)</span>
      </div>
    </div>
  );
}
