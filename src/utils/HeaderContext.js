import React from 'react';

export const HeaderContext = React.createContext();

// export const useHeader = () => {
//     return useContext(HeaderContext)
// }

// export const HeaderProvider = ({ children }) => {
//     const [isVisible, setIsVisible] = useState(false);
//     console.log('isVisible', isVisible);
//   const toggleIsVisible = () => setIsVisible(!isVisible)
//     return (
//         <HeaderContext.Provider value={isVisible}>
//             { children }
//         </HeaderContext.Provider>
//     )
// }
