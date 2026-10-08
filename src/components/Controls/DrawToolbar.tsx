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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
        <span>Draw Polygon</span>
      </button>

      {hasSelection && (
        <button
          type="button"
          className="toolbar-btn danger"
          onClick={onClear}
          title="Clear Selection"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>Clear Area</span>
        </button>
      )}
    </div>
  );
}
