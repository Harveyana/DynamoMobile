// useLocation.js
// import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// const useLocation = () => {
//   const [location, setLocation] = useState<null|any>(null);
//   const [errorMsg, setErrorMsg] = useState<null|string>(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           setErrorMsg('Permission to access location was denied');
//           return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//       } catch (error) {
//         setErrorMsg('Error getting location');
//       }
//     };

//     getLocation();
//   }, []);

//   return { location, errorMsg };
// };

// export default useLocation;

const getLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (error) {
    throw new Error('Error getting location');
  }
};

export default getLocation;


