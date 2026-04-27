import React from 'react';
import './GodTile.css';

const GodTile = ({ god, onClick }) => {
  const { name, category, attributes, description, image, id } = god;

  // Handle missing images
  const imageUrl = image 
    ? image 
    : `https://via.placeholder.com/150?text=${name.charAt(0)}`;

  const attributeList = Array.isArray(attributes) ? attributes : [];

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className="god-tile" 
      onClick={handleCardClick} 
      role="button" 
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="god-image-wrapper">
        <img src={imageUrl} alt={`${name}, ${category}`} loading="lazy" />
        <span className="category-badge">{category}</span>
      </div>

      <div className="god-content">
        <h3 className="god-name">{name}</h3>
        
        {/* Display attributes as tags */}
        <div className="attributes-container">
          {attributeList.length > 0 ? (
            attributeList.map((attr, index) => (
              <span key={index} className="attribute-tag">{attr}</span>
            ))
          ) : (
            <span className="no-attributes">No specific domains listed</span>
          )}
        </div>

        {/* Truncated description */}
        <p className="god-description">
          {description ? description.substring(0, 100) + "..." : "No description available."}
        </p>
      </div>
    </div>
  );
};

export default GodTile;