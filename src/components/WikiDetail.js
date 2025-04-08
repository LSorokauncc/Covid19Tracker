import React from 'react';

const WikiDetail = () => {
  const data = JSON.parse(localStorage.getItem('wikiDetail'));

  const containerStyle = {
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: 'var(--color-light-inner-bg)',
    color: 'var(--body-text-color)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    fontFamily: 'var(--font-main)',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: 'white',
  };

  const textStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: 'var(--box-text-color)',
  };

  const buttonStyle = {
    marginTop: '2rem',
    backgroundColor: '#2f2f2f',
    color: 'white',
    padding: '0.6rem 1.4rem',
    border: 'none',
    borderRadius: '20px',
    fontStyle: 'italic',
    fontWeight: 600,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <main style={containerStyle}>
      {data ? (
        <div>
          <h2 style={titleStyle}>{data.title}</h2>
          <p style={textStyle}>{data.short}</p>

          <button
            style={buttonStyle}
            onClick={() => {
              window.location.href = "/";
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d1d1d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2f2f2f")
            }
          >
            Back to Wiki
          </button>
        </div>
      ) : (
        <p>No information available.</p>
      )}
    </main>
  );
};

export default WikiDetail;
