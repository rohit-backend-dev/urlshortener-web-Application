// import React from 'react'
// import ShortenItem from './ShortenItem'

// const ShortenUrlList = ({ data }) => {
//   return (
//     <div className='my-6 space-y-4'>
//         {data.map((item) => (
//             <ShortenItem key={item.id} {...item} />
//         ))}
//     </div>
//   )
// }

// export default ShortenUrlList


import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data, refetch }) => {
  return (
    <div className="space-y-6">
      {data.map((item) => (
        <ShortenItem key={item.id} {...item} refetch={refetch} />
      ))}
    </div>
  );
};

export default ShortenUrlList;
