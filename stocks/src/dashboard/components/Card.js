// import React from 'react'

// const Card = ({children}) => {
//   return (
//     <div className='w-full h-full rounded-md relative p-8 border-2 bg-gray-300'>
//       {children}
//     </div>
//   )
// }

// export default Card





// import React from 'react';

// const Card = ({ children }) => {
//   return (
//     <div className='w-full h-full rounded-md relative p-8 bg-gradient-to-r from-gray-700 to-black overflow-hidden'>
//       {children}
//     </div>
//   );
// };

// export default Card;








import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="w-full h-full p-10 rounded-lg shadow-lg" style={{ background: 'radial-gradient(circle, #27272a, #000)' }}>
      {children}
    </div>
  );
};

export default Card;




