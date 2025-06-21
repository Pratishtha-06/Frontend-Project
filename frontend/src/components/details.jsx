import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const { index } = useParams();
  const navigate = useNavigate();

  
  const defaultItems = [
    {
      name: "T-Shirt",
      type: "Topwear",
      description: "Grey cotton T-shirt.",
      coverImage: "Grey_Tshirt.jpg",
      additionalImages:["Black_Tshirt.webp","ChrisCrossNavyBlueCottonT-Shirt.webp"]
    },
    {
      name: "Sneakers",
      type: "Footwear",
      description: "Running sneakers.",
      coverImage: "Shoe.jpg",
       additionalImages:["Black_Tshirt.webp","ChrisCrossNavyBlueCottonT-Shirt.webp"]
    },
    {
      name: "Pants",
      type: "Bottomwear",
      description: "Comfortable pants.",
      coverImage: "pants.jpeg",
       additionalImages:["Black_Tshirt.webp","ChrisCrossNavyBlueCottonT-Shirt.webp"]
    },
    {
      name: "Studs Football",
      type: "Sports Gear",
      description: "Football shoes with studs.",
      coverImage: "images.jpeg",
       additionalImages:["Black_Tshirt.webp","ChrisCrossNavyBlueCottonT-Shirt.webp"]
    }
  ];

  const savedItems = JSON.parse(localStorage.getItem("items")) || [];
  const allItems = [...defaultItems, ...savedItems];
  const item = allItems[index];

  if (!item) {
    return (
      <div className="container mt-4">
        <h4>Item not found.</h4>
        <button className="btn btn-secondary mt-2" onClick={() => navigate('/view-items')}>
          Back to List
        </button>
      </div>
    );
  }

  return (
  <div className="container mt-4">
    <h2>Item Detail</h2>
    <div className="card p-4 shadow-sm">
      <img
        src={`https://frontend-project-bdlh.onrender.com/uploads/${item.coverImage}`}
        alt={item.name}
        style={{ width: '300px', borderRadius: '10px', marginBottom: '1rem' }}
      />
      <h4><strong>Name:</strong> {item.name}</h4>
      <p><strong>Type:</strong> {item.type || "N/A"}</p>
      <p><strong>Description:</strong> {item.description || "N/A"}</p>

      
      {item.additionalImages && item.additionalImages.length > 0 && (
        <>
          <h5 className="mt-4"> Additional Images</h5>
          <div className="d-flex flex-wrap gap-2">
            {item.additionalImages.map((img, idx) => (
              <img
                key={idx}
                src={`https://frontend-project-bdlh.onrender.com/uploads/${img}`}
                alt={`additional-${idx}`}
                style={{ width: '120px', borderRadius: '8px' }}
              />
            ))}
          </div>
        </>
      )}

      <button
        className="btn btn-outline-primary mt-3"
        onClick={() => navigate('/view-items')}
      >
         Back to Items
      </button>
    </div>
  </div>
);
}

export default Details;