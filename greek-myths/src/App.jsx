import { useState, useEffect } from "react";
import GodTile from './components/GodTile';

import "./App.css";

const CATEGORIES = ["gods", "heroes", "monsters", "titans"];

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allGods, setAllGods] = useState([]);

  const baseURL = "https://thegreekmythapi.vercel.app/";
useEffect(() => {
    async function getAPI() {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          CATEGORIES.map((cat) =>
            fetch(`${baseURL}api/${cat}`).then((r) => r.json()),
          ),
        );

        const mapped = Object.fromEntries(
          CATEGORIES.map((cat, i) => [cat, results[i]]),
        );
        setData(mapped);

        // FLATTEN THE DATA: Combine all categories into one array
        const combinedGods = results.flatMap((categoryData, index) => {
          
          return categoryData.map((god) => ({
            ...god,
            category: CATEGORIES[index], 
            id: god.id || `${CATEGORIES[index]}-${Math.random()}` 
          }));
        });

        setAllGods(combinedGods);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    getAPI();
  }, []);

  const handleGodClick = (id) => {
    console.log("User clicked god with ID:", id);
  };

  return (
    <>
      <section id="center">
        <h1>Greek Gods Pokedex</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '1.5rem',
            padding: '1rem'
          }}>
            {allGods.map((god) => (
              <GodTile 
                key={god.id} 
                god={god} 
                onClick={handleGodClick} 
              />
            ))}
          </div>
        )}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;