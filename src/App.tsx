import { useState } from "react";
import ClimateMap from "./components/Map/ClimateMap";
import AreaInfoBadge from "./components/Controls/AreaInfoBadge";
import DrawToolbar from "./components/Controls/DrawToolbar";
import type { SelectionInfo } from "./types/gis";

function App() {
  const [selection, setSelection] = useState<SelectionInfo | null>(null);
  const [drawMode, setDrawMode] = useState<"polygon" | "delete" | "simple_select">("polygon");

  const handleClear = () => {
    setDrawMode("delete");
  };

  return (
    <main className="app">
      <ClimateMap 
        drawMode={drawMode}
        onSelectionChange={setSelection} 
        onModeChange={setDrawMode}
      />
      <DrawToolbar 
        activeMode={drawMode}
        onStartDraw={() => setDrawMode("polygon")}
        onClear={handleClear}
        hasSelection={Boolean(selection && selection.areaKm2 > 0)}
      />
      <AreaInfoBadge selection={selection} />
    </main>
  );
}

export default App;