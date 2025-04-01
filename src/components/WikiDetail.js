import React from 'react';

const WikiDetail = () => {
  const data = JSON.parse(localStorage.getItem("wikiDetail"));

  if (!data) {
    return <p style={{ padding: "2rem" }}>No information available.</p>;
  }

  return (
    <div className="wiki-detail" style={{ padding: "2rem" }}>
      <h2>{data.title}</h2>
      <p>{data.full}</p>
      <button onClick={() => window.location.href = "/"}>← Back to Home</button>
    </div>
  );
};

export default WikiDetail;
