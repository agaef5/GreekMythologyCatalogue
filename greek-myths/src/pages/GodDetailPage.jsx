import { useLocation } from "react-router-dom";
import "./GodDetailPage.css";

function GodDetailPage() {
  const { state } = useLocation();
  const god = state?.god;

  const { name, category, attributes, description, image } = god;

  let imageUrl = image;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  if (imageUrl && !imageUrl.startsWith("http")) {
    imageUrl = baseURL + imageUrl.replace(/^\/+/, "");
  }

  const finalSrc = imageUrl
    ? imageUrl
    : `https://via.placeholder.com/150?text=${name?.charAt(0) || "?"}`;

  const tags = [...(attributes.symbols || []), ...(attributes.powers || [])];

  const info = [
    attributes.origin && ["Origin", attributes.origin],
    attributes.abode && ["Abode", attributes.abode],
  ].filter(Boolean);

  const fam = attributes.family || {};
  const famEntries = [
    fam.parents?.length && ["Parents", fam.parents.join(", ")],
    fam.spouse?.length && ["Spouse", fam.spouse.join(", ")],
    fam.children?.length && ["Children", fam.children.join(", ")],
  ].filter(Boolean);

  const stories = attributes.stories || [];

  return (
    <>
      <section id="center">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <h1 className="god-name">{name}</h1>
              <p className="god-description">{description}</p>

              {tags.length > 0 && (
                <div className="section">
                  <div className="section-label">Symbols &amp; Powers</div>
                  <div className="tag-list">
                    {tags.map((t, i) => (
                      <span key={i} className="attribute-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {info.length > 0 && (
                <div className="section">
                  {info.map(([k, v]) => (
                    <div key={k} className="meta-row">
                      <span className="meta-key">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {famEntries.length > 0 && (
                <div className="section">
                  <div className="section-label">Family</div>
                  {famEntries.map(([k, v]) => (
                    <div key={k} className="meta-row">
                      <span className="meta-key">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {stories.length > 0 && (
                <div className="section">
                  <div className="section-label">Myths &amp; Stories</div>
                  {stories.map((s, i) => (
                    <div key={i} className="story-item">
                      <span className="story-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hero">
            <img
              src={finalSrc}
              alt={`${name || "Unknown"}, ${category || ""}`}
              loading="lazy"
              onError={(e) => {
                e.target.src = finalSrc;
                e.target.onerror = null;
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default GodDetailPage;
