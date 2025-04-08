import React from 'react';


const Wiki = () => {
 const infoData = [
   {
     title: 'What is COVID19?',
     short:
       '2019 Novel Coronavirus (2019-nCoV) is a virus (more specifically, a coronavirus) identified as the cause of an outbreak of respiratory illness first detected in Wuhan, China. It has since spread worldwide, leading to an ongoing pandemic.',
     full: `
       What is COVID19?
2019 Novel Coronavirus (2019-nCoV) is a viråçus (more specifically, a coronavirus) identified as the cause of an outbreak of respiratory illness first detected in Wuhan, China. It has since spread worldwide, leading to an ongoing pandemic.


What are the symptoms?
Symptoms of COVID-19 often include fever, cough, fatigue, breathing difficulties, and loss of smell and taste.


Symptoms begin one to fourteen days after exposure to the virus. Most people (81%) develop mild to moderate symptoms (up to mild pneumonia), while 14% develop severe symptoms (dyspnea, hypoxia, or more than 50% lung involvement on imaging) and 5% of patients suffer critical symptoms (respiratory failure, shock, or multiorgan dysfunction).


At least a third of the people who are infected with the virus remain asymptomatic and do not develop noticeable symptoms at any point in time, but can spread the disease. Some patients continue to experience a range of effects—known as long COVID—for months after recovery and damage to organs has been observed. Multi-year studies are underway to further investigate the long term effects of the disease.
     `,
   },
   {
     title: 'How do I get infected?',
     short:
       'The virus spreads mainly when an infected person is in close contact with another person. Small droplets and aerosols containing the virus can spread from an infected persons nose and mouth as they breathe, cough, sneeze, sing, or speak. ',
     full: `
       The virus spreads mainly when an infected person is in close contact with another person.


Small droplets and aerosols containing the virus can spread from an infected person's nose and mouth as they breathe, cough, sneeze, sing, or speak. Other people are infected if the virus gets into their mouth, nose or eyes. The virus may also spread via contaminated surfaces, although this is not thought to be the main route of transmission.


A person who is infected can transmit the virus to others up to two days before they themselves show symptoms, as can an individual who does not experience symptoms. People remain infectious for up to ten days in moderate cases, and two weeks in severe cases.
     `,
   },
   {
     title: 'How do I get tested?',
     short:
       'The best way to get a coronavirus test is to contact your health care provider. You may also visit your state or local health departments website to look for the latest local information on testing.',
     full: `
       How do I get tested?
The best way to get a coronavirus test is to contact your health care provider. You may also visit your state or local health department's website to look for the latest local information on testing. Many pharmacies, urgent care centers, and community health clinics also offer COVID-19 testing, often with same-day results.


Is a vaccine available?
As of January 2021, nine vaccines have been authorized by at least one national regulatory authority for public use. Many countries have implemented phased distribution plans that prioritize those at highest risk of complications, such as the elderly, and those at high risk of exposure and transmission, such as healthcare workers. As of January 2021, 63.41 million doses of COVID‑19 vaccine had been administered worldwide based on official reports from national health agencies.


     `,
   },
   {
     title: 'How can I protect myself?',
     short:
       'Handwashing: 1. The CDC recommends that people wash hands often with soap and water for at least 20 seconds, especially after going to the toilet or when hands are visibly dirty. ',
     full: `
       How can I protect myself?
Handwashing
The CDC recommends that people wash hands often with soap and water for at least 20 seconds, especially after going to the toilet or when hands are visibly dirty.
It further recommended using an alcohol-based hand sanitiser with at least 60% alcohol by volume (or 120 proof) when soap and water are not readily available.
The WHO also advise people to avoid touching the eyes, nose, or mouth with unwashed hands.
Social distancing
Social distancing, also called “physical distancing,” means keeping a safe space between yourself and other people who are not from your household.
To practice social or physical distancing, stay at least 6 feet (about 2 arm lengths) from other people who are not from your household in both indoor and outdoor spaces.
It is safest to avoid crowded places and gatherings where it may be difficult to stay at least 6 feet away from others who are not from your household.
It is possible to stay socially connected with friends and family who don’t live in your home by calling, using video chat, or staying connected through social media.
Only visit stores selling household essentials in person when you absolutely need to, and stay at least 6 feet away from others who are not from your household while shopping and in lines. If possible, use drive-thru, curbside pick-up, or delivery services to limit face-to-face contact with others.
     `,
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
   flex: 1,
 };


 const headingStyle = {
   fontSize: '3rem',
   marginBottom: '2.5rem',
   textAlign: 'center',
   fontFamily: 'var(--font-main)',
   color: 'white',
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
   alignItems: 'center',
   textAlign: 'center',
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
