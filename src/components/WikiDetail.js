import React from 'react';
import Header from './Header';
import Footer from './Footer';

const WikiDetail = () => {
  const data = JSON.parse(localStorage.getItem("wikiDetail"));

  return (
    <div className="page-wrapper">
      <Header setActiveTab={() => {}} activeTab="wiki" />

      <main className="content-wrapper">
        {data ? (
          <div className="wiki-detail-container">
            <h2 className="detail-title">{data.title}</h2>

            <div className="detail-card">
              <h3>{data.title}</h3>
              <p>{data.full}</p>
              <button
                className="back-button"
                onClick={() => (window.location.href = "/")}
              >
                <em>Back to Wiki</em>
              </button>
            </div>
          </div>
        ) : (
          <p style={{ padding: "2rem", textAlign: "center" }}>
            No information available.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WikiDetail;
