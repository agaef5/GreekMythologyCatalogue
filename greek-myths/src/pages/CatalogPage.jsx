import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GodTile from "../components/GodTile";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CATEGORIES = ["gods", "heroes", "monsters", "titans"];

function CatalogPage() {
  // const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allGods, setAllGods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const navigate = useNavigate();

  useEffect(() => {
    async function getAPI() {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          CATEGORIES.map((cat) =>
            fetch(`${BASE_URL}api/${cat}`).then((r) => {
              if (!r.ok) throw new Error(`${cat}: HTTP ${r.status}`);
              return r.json();
            }),
          ),
        );

        // FLATTEN THE DATA: Combine all categories into one array
        const combinedGods = results.flatMap((categoryData, index) => {
          const categoryName = CATEGORIES[index];

          return categoryData.map((god) => {
            // Create a unique ID string
            const uniqueId = `${categoryName}-${god.id}`;

            return {
              ...god,
              category: categoryName,
              // Use this unique ID for both the React key AND the click handler
              id: uniqueId,
              // Keep the original ID from API
              originalId: god.id,
            };
          });
        });

        setAllGods(combinedGods);

        console.log("Sample god data:", combinedGods[0]);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    getAPI();
  }, []);

  const totalPages = Math.ceil(allGods.length / ITEMS_PER_PAGE);
  const visibleGods = allGods.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <section id="center">
        <h1>Greek Mythos Dictionary</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div>
            <div class="god-catalog">
              {visibleGods.map((god) => (
                <GodTile
                  // Use the unique ID here
                  key={god.id}
                  god={god}
                  onClick={() =>
                    navigate(`/${god.category}/${god.originalId}`, {
                      state: { god },
                    })
                  }
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default CatalogPage;
