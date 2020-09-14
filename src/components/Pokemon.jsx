import React from "react";

const Pokemon = ({ name, image, types }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img style={{maxHeight: 150}} data-testid="image" src={image} alt={name} />
      <h3>Types</h3>
      <p>{types.join(", ")}</p>
    </div>
  );
};

export default Pokemon;
