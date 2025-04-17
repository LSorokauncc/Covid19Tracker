import React from 'react';

const WikiDetail = () => {
  const data = JSON.parse(localStorage.getItem('wikiDetail'));

  const containerStyle = {
    flex: 1,
    padding: '2rem',
    minHeight: '100vh',
    backgroundColor: 'var(--color-light-inner-bg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'var(--body-text-color)',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: 'white',
    textAlign: 'center',
  };

  const cardStyle = {
    backgroundColor: 'var(--box-bg-color)',
    color: 'var(--box-text-color)',
    padding: '2.5rem',
    borderRadius: '20px',
    maxWidth: '700px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    border: '1px solid var(--box-border-color)',
    zIndex: 1,
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '1.2rem',
    textAlign: 'center',
  };

  const buttonStyle = {
    margin: '2rem auto 0',
    backgroundColor: '#2f2f2f',
    color: 'white',
    padding: '0.6rem 1.4rem',
    border: 'none',
    borderRadius: '20px',
    fontStyle: 'italic',
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const imageStyle = {
    position: 'absolute',
    opacity: 1,
    filter: 'brightness(1.5)',
    mixBlendMode: 'screen',
    zIndex: 0,
  };

  if (!data) {
    return <p style={{ padding: '2rem', color: 'white' }}>No information available.</p>;
  }

  return (
    <div style={containerStyle}>
      {/* Background bacteria images */}
      <img src={`${process.env.PUBLIC_URL}/covidbacteria.jpg`} alt="bacteria" style={{ ...imageStyle, width: '120px', top: '5%', left: '-30px' }} />
      <img src={`${process.env.PUBLIC_URL}/covidbacteria.jpg`} alt="bacteria" style={{ ...imageStyle, width: '100px', top: '40%', left: '-30px' }} />
      <img src={`${process.env.PUBLIC_URL}/covidbacteria.jpg`} alt="bacteria" style={{ ...imageStyle, width: '140px', bottom: '5%', left: '-30px' }} />
      <img src={`${process.env.PUBLIC_URL}/covidbacteria.jpg`} alt="bacteria" style={{ ...imageStyle, width: '100px', top: '5%', right: '-20px' }} />
      <img src={`${process.env.PUBLIC_URL}/covidbacteria.jpg`} alt="bacteria" style={{ ...imageStyle, width: '180px', bottom: '5%', right: '-40px' }} />

      {/* Main content */}
      <h2 style={headingStyle}>{data.title}</h2>
      <div style={cardStyle}>
        {data.full.split('\n').map((line, index) =>
          line.trim() !== '' ? (
            <p key={index} style={paragraphStyle}>
              {line.trim()}
            </p>
          ) : null
        )}

        <button
          style={buttonStyle}
          onClick={() => {
            localStorage.setItem('activeTab', 'wiki');
            window.location.href = '/';
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d1d1d')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2f2f2f')}
        >
          Back to Wiki
        </button>
      </div>
    </div>
  );
};

export default WikiDetail;
