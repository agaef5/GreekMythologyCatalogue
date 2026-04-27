import React from 'react';
import './GodTile.css';

const GodTile = ({ god, onClick }) => {
  const { name, category, attributes, description, image, id } = god;

   let imageUrl = image;
   // 2. If it's a relative path (starts with / or doesn't start with http), prepend the base URL
  // Note: You might need to pass the baseURL from App.jsx as a prop, or hardcode it here if consistent
  const API_BASE_URL = "https://thegreekmythapi.vercel.app/";
 
  if (imageUrl && !imageUrl.startsWith('http')) {
    // Ensure no double slashes if image starts with /
    imageUrl = API_BASE_URL + imageUrl.replace(/^\/+/, ''); 
  }

    const finalSrc = imageUrl ? imageUrl : `https://via.placeholder.com/150?text=${name?.charAt(0) || '?'}`;


//   // Handle missing images
//   const imageUrl = image 
//     ? image 
//     : `https://via.placeholder.com/150?text=${name.charAt(0)}`;

  const attributeList = Array.isArray(attributes) ? attributes : [];


    const handleCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e)}
    >
      <div className="god-image-wrapper">
        <img 
          src={finalSrc} 
          alt={`${name || 'Unknown'}, ${category || ''}`} 
          loading="lazy"
          onError={(e) => {
            // If the image fails to load (404), swap to placeholder
            e.target.src = `https://via.placeholder.com/150?text=${name?.charAt(0) || '?'}`;
            e.target.onerror = null; // Prevent infinite loop
          }}
        />
        {category && <span className="category-badge">{category}</span>}
      </div>

      <div className="god-content">
        <h3 className="god-name">{name}</h3>
        
        {attributes && Array.isArray(attributes) && attributes.length > 0 && (
          <div className="attributes-container">
            {attributes.map((attr, index) => (
              <span key={index} className="attribute-tag">{attr}</span>
            ))}
          </div>
        )}

        <p className="god-description">
          {description ? description.substring(0, 100) + "..." : "No description available."}
        </p>
      </div>
    </div>
  );


//   const handleCardClick = () => {
//     if (onClick) {
//       onClick(id);
//     }
//   };

//   return (
//     <div 
//       className="god-tile" 
//       onClick={handleCardClick} 
//       role="button" 
//       tabIndex={0}
//       onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
//     >
//       <div className="god-image-wrapper">
//         <img src={imageUrl} alt={`${name}, ${category}`} loading="lazy" />
//         <span className="category-badge">{category}</span>
//       </div>

//       <div className="god-content">
//         <h3 className="god-name">{name}</h3>
        
//         {/* Display attributes as tags */}
//         <div className="attributes-container">
//           {attributeList.length > 0 ? (
//             attributeList.map((attr, index) => (
//               <span key={index} className="attribute-tag">{attr}</span>
//             ))
//           ) : (
//             <span className="no-attributes">No specific domains listed</span>
//           )}
//         </div>

//         {/* Truncated description */}
//         <p className="god-description">
//           {description ? description.substring(0, 100) + "..." : "No description available."}
//         </p>
//       </div>
//     </div>
//   );
};

export default GodTile;