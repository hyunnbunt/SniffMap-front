// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../App';

// const useQuery = () => {
//     return new URLSearchParams(window.location.search);
// }

// const SigninRedirect = () => {
//     const query = useQuery();
//     const [queryParams, setQueryParams] = useState({});
//     const values = useContext(AppContext)

//     useEffect(() => {
//         const params = {}
//         for (const [key, value] of query.entries()) {
//             params[key] = value;
//         }
//         // setQueryParams(params);
    
//         // if (token) {
//         //     values.setCurrentMode('Neighbors')
//         //     // Redirect to home page or any other page
//         //     // window.location.href = '/';
//         // }
//     }, [query]);


//     return (
//         <ul>
//             {Object.keys(queryParams).map(key => (
//                 <li key={key}>
//                     {key}: {queryParams[key]}
//                 </li>
//             ))}
//         </ul>
//     )
// }

// export default SigninRedirect;
