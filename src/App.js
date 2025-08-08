import React, { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      // You'll need to replace YOUR_TOKEN_HERE with your actual ChemSpider API token
      const token = "YOUR_TOKEN_HERE"; // Replace with your actual token
      const searchUrl = `https://www.chemspider.com/api/Search.asmx/SimpleSearch?query=${encodeURIComponent(search)}&token=${token}`;

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Error searching ChemSpider. Please check your API token and try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="App-content">
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
          ChemSpider Search
        </h1>
        <br />
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for chemicals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
            Searching ChemSpider...
          </div>
        )}

        {results.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '40vh',
          }}>
            <div className="results-panel" style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '18px',
              boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
              padding: '32px 40px',
              maxWidth: '480px',
              width: '100%',
              margin: '0 auto',
              border: '1px solid #e1e4ea',
            }}>
              <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                Search Results ({results.length} compounds found)
              </h2>
              <div style={{ display: 'grid', gap: '15px' }}>
                {results.map((csid, index) => (
                  <div key={index} className="result-item">
                    <strong style={{ color: '#4a90e2' }}>CSID:</strong>
                    <span style={{ color: '#333', marginLeft: '8px' }}>{csid}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && results.length === 0 && search && (
          <div style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            No chemicals found for "{search}"
          </div>
        )}
      </div>
      <br />
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
        <span style={{ color: '#4a90e2', fontSize: '0.5em' }}>Search for chemicals for example: </span>
        <br />
        <span style={{ color: '#4a90e2', fontSize: '0.3em' }}>Thiamine Mononitrate (Vitamin B1)</span>
        <br />
        <span style={{ color: '#4a90e2', fontSize: '0.3em' }}>Riboflavin (Vitamin B2)</span>
        <br />
        <span style={{ color: '#4a90e2', fontSize: '0.3em' }}>Nicotinamide (Vitamin B3)</span>
        <br />
        <span style={{ color: '#4a90e2', fontSize: '0.3em' }}>Calcium Pantothenate (Vitamin B5)</span>
        <br />
        <span style={{ color: '#4a90e2', fontSize: '0.3em' }}>Pyridoxine Hydrochloride (Vitamin B6)</span>
        <br />
      </h1>

      <br />

      
    </div>
  );
}

export default App;
