import type { SelectionInfo } from "../../types/gis";
import { MapPin, BoxSelect } from "lucide-react";

interface AreaInfoBadgeProps {
  selection: SelectionInfo | null;
}

export default function AreaInfoBadge({ selection }: AreaInfoBadgeProps) {
  if (!selection || !selection.geometry || selection.areaKm2 === 0) {
    return (
      <div className="area-info-badge hint">
        <MapPin size={18} className="badge-icon" />
        <span>Draw a polygon on the map to select an urban area</span>
      </div>
    );
  }

  return (
    <div className="area-info-badge active">
      <div className="badge-header">
        <BoxSelect size={14} className="badge-icon" />
        <span className="badge-title">Selected Area</span>
      </div>
      <div className="badge-values">
        <span className="primary-val">{selection.areaKm2} km²</span>
        <span className="secondary-val">({selection.areaHectares} ha)</span>
      </div>
    </div>
  );
}
