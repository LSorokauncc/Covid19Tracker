import React from 'react';

const Wiki = () => {
  const infoData = [
    {
      title: 'What is COVID19?',
      short:
        '2019 Novel Coronavirus (2019-nCoV) is a virus (more specifically, a coronavirus) identified as the cause of an outbreak of respiratory illness first detected in Wuhan, China. It has since spread worldwide, leading to an ongoing pandemic.',
    },
    {
      title: 'How do I get infected?',
      short:
        'The virus spreads mainly when an infected person is in close contact with another person. Small droplets and aerosols containing the virus can spread from an infected person\'s nose and mouth as they breathe, cough, sneeze, sing, or speak.',
    },
    {
      title: 'How do I get tested?',
      short:
        'The best way to get a coronavirus test is to contact your health care provider. You may also visit your state or local health department\'s website to look for the latest local information on testing.',
    },
    {
      title: 'How can I protect myself?',
      short:
        '1. The CDC recommends that people wash hands often with soap and water for at least 20 seconds, especially after going to the toilet or when hands are visibly dirty.',
    },
  ];

  const handleReadMore = (item) => {
    localStorage.setItem('wikiDetail', JSON.stringify(item));
    window.location.href = '/detail';
  };

  const containerStyle = {
    padding: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'var(--color-light-inner-bg)',
    color: 'var(--body-text-color)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    flex: 1, // ✅ important to let it fill space so footer can go to the bottom
  };

  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '2.5rem',
    textAlign: 'center',
    fontFamily: 'var(--font-main)',
    color: 'var(--body-text-color)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const boxStyle = {
    borderRadius: '25px',
    padding: '1.5rem 2rem',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    border: '1px solid var(--box-border-color)',
    backgroundColor: 'var(--box-bg-color)',
    color: 'var(--box-text-color)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'background-color 0.3s ease',
  };

  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    color: 'inherit',
  };

  const textStyle = {
    fontSize: '1rem',
    color: 'inherit',
  };

  const buttonStyle = {
    marginTop: '1.5rem',
    backgroundColor: '#2f2f2f',
    color: 'white',
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '20px',
    fontStyle: 'italic',
    fontWeight: 600,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    alignSelf: 'center',
    transition: 'background-color 0.3s',
  };

  return (
    <div className="content-wrapper" style={containerStyle}>
      <h2 style={headingStyle}>WIKI</h2>
      <div style={gridStyle}>
        {infoData.map((item, index) => (
          <div key={index} style={boxStyle}>
            <h3 style={titleStyle}>{item.title}</h3>
            <p style={textStyle}>{item.short}</p>
            <button
              style={buttonStyle}
              onClick={() => handleReadMore(item)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d1d1d')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2f2f2f')}
            >
              Read more...
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wiki;
