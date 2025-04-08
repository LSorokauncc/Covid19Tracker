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


 if (!data) {
   return <p style={{ padding: '2rem', color: 'white' }}>No information available.</p>;
 }


 return (
   <div style={containerStyle}>
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


