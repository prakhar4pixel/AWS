import { Hexagon, Trash2 } from "lucide-react";

interface DrawToolbarProps {
  activeMode: "polygon" | "delete" | "simple_select";
  onStartDraw: () => void;
  onClear: () => void;
  hasSelection: boolean;
}

export default function DrawToolbar({
  activeMode,
  onStartDraw,
  onClear,
  hasSelection,
}: DrawToolbarProps) {
  return (
    <div className="gis-draw-toolbar">
      <button
        type="button"
        className={`toolbar-btn ${activeMode === "polygon" ? "active" : ""}`}
        onClick={onStartDraw}
        title="Draw Polygon Area"
      >
        <Hexagon size={18} />
        <span>Draw Polygon</span>
      </button>

      {hasSelection && (
        <button
          type="button"
          className="toolbar-btn danger"
          onClick={onClear}
          title="Clear Selection"
        >
          <Trash2 size={18} />
          <span>Clear Area</span>
        </button>
      )}
    </div>
  );
}
