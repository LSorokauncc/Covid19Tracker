import React, { useState } from 'react';

const Wiki = () => {
  const [expandedBox, setExpandedBox] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedBox(expandedBox === index ? null : index);
  };

  const infoData = [
    {
      title: 'What is COVID19?',
      short: '2019 Novel Coronavirus (2019-nCoV) is a virus (more specifically, a coronavirus)...',
      full: '2019 Novel Coronavirus (2019-nCoV) is a virus (more specifically, a coronavirus) identified as the cause of an outbreak of respiratory illness first detected in Wuhan, China. It has since spread worldwide, leading to an ongoing pandemic.',
    },
    {
      title: 'How do I get infected?',
      short: 'The virus spreads mainly when an infected person is in close contact...',
      full: 'The virus spreads mainly when an infected person is in close contact with another person. Small droplets and aerosols containing the virus can spread from an infected person\'s nose and mouth as they breathe, cough, sneeze, sing, or speak.',
    },
    {
      title: 'How do I get tested?',
      short: 'The best way to get a coronavirus test is to contact your health care provider...',
      full: 'The best way to get a coronavirus test is to contact your health care provider. You may also visit your state or local health department\'s website to look for the latest local information on testing.',
    },
    {
      title: 'How can I protect myself?',
      short: 'Handwashing is one of the most effective ways to protect yourself...',
      full: 'Handwashing: The CDC recommends that people wash hands often with soap and water for at least 20 seconds, especially after going to the toilet or when hands are visibly dirty.',
    },
  ];

  return (
    <div className="wiki-container">
      <h2>WIKI</h2>
      <div className="info-grid">
        {infoData.map((item, index) => (
          <div key={index} className="info-box">
            <h3>{item.title}</h3>
            <p>{expandedBox === index ? item.full : item.short}</p>
            <button onClick={() => toggleReadMore(index)}>
              {expandedBox === index ? 'Read Less' : 'Read more...'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wiki;
