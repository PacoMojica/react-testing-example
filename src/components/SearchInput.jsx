import React from "react";

export default ({ initSearchTerm, onChange }) => {
  const [searchTerm, setSearchTerm] = React.useState(initSearchTerm);
  const [error, setError] = React.useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      triggerChange();
    }
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const triggerChange = () => {
    if (searchTerm) {
      onChange(searchTerm);
    } else {
      setError("Please, enter a pokemon name");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={triggerChange}>Search</button>
      {error && <p data-testid="error" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
