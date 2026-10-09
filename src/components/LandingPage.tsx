import { useState, useEffect } from "react";
import { Map, Search, Globe2, Activity, Wind, Thermometer, ArrowLeft, Loader2 } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import './LandingPage.css';

interface LandingPageProps {
  onChooseMap: () => void;
  onSearchCity: (lat: number, lon: number) => void;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function LandingPage({ onChooseMap, onSearchCity }: LandingPageProps) {
  const [mode, setMode] = useState<"cards" | "search">("cards");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Geocoding failed:", err);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="landing-page">
      <ParticleBackground />

      <div className="landing-content">
        <div className="brand">
          <Globe2 size={48} className="brand-icon" />
          <h1 className="brand-title">Urban Climate Intelligence</h1>
        </div>
        
        <p className="brand-subtitle">
          Advanced geospatial analytics to monitor and evaluate environmental risks, 
          heat anomalies, and urban vegetation across any city on Earth.
        </p>

        <div className="features-row">
          <div className="feature-pill"><Thermometer size={16} /> Heat Analysis</div>
          <div className="feature-pill"><Wind size={16} /> Air Pollution</div>
          <div className="feature-pill"><Activity size={16} /> Risk Scoring</div>
        </div>

        {mode === "cards" ? (
          <div className="action-cards">
            <button className="action-card primary" onClick={onChooseMap}>
              <div className="card-icon"><Map size={32} /></div>
              <h3>Choose on Map</h3>
              <p>Freely explore the global map and draw custom polygons to analyze specific urban zones.</p>
            </button>

            <button className="action-card secondary" onClick={() => setMode("search")}>
              <div className="card-icon"><Search size={32} /></div>
              <h3>Search City</h3>
              <p>Instantly jump to a specific city or region to begin your climate intelligence analysis.</p>
            </button>
          </div>
        ) : (
          <div className="search-container">
            <button className="back-btn" onClick={() => setMode("cards")}>
              <ArrowLeft size={20} /> Back
            </button>
            <div className="search-input-wrapper">
              <Search className="search-icon-inside" size={24} />
              <input 
                type="text" 
                className="city-search-input" 
                placeholder="Enter city name (e.g. Paris, Tokyo, New York)..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
              {loading && <Loader2 className="search-spinner" size={24} />}
            </div>
            
            {results.length > 0 && (
              <ul className="search-results">
                {results.map(r => (
                  <li key={r.place_id} onClick={() => onSearchCity(parseFloat(r.lat), parseFloat(r.lon))}>
                    <Map size={18} />
                    <span>{r.display_name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
