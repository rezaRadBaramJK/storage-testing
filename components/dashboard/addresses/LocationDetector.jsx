'use client';
import { useEffect, useState } from 'react';

function LocationDetector({onLocationAccess}) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationAccess(position.coords.latitude, position.coords.longitude);
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        let errorMessage = '';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          case err.UNKNOWN_ERROR:
            errorMessage = 'An unknown error occurred.';
            break;
          default:
            errorMessage = `Geolocation Error: ${err.message}`;
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return null;
}

export default LocationDetector;