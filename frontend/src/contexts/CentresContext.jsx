import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken, getCentre } from '../scripts/apiUtils';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useAuth } from './AuthContext';

const CentresContext = createContext();

export const CentresProvider = ({ children }) => {
  const [centres, setCentres] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchCentres = async () => {
    try {
      setError(null);
      setLoading(true);
  
      const response = await fetch('../../callCenters.json');
      if (!response.ok) {
        throw new Error('Failed to load centres');
      }
  
      const data = await response.json();
      setCentres(data.centers);
  
    } catch (err) {
      setError('Error fetching centres');
      console.error('Error fetching centres:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCentre = async (key) => {
   
    try {
      setError(null);
      const data = await getCentre(key);     
      setSelectedCentre(data);
    } catch (err) {
      setError('Error fetching centre');
      console.error('Error fetching centre:', err);
    } finally {
      setLoading(false);
    }
  }

  const init = async () => {
    const session = await fetchAuthSession();   
    setAuthToken(session.tokens.idToken.toString());
    fetchCentres();
  }

  useEffect(() => {
    if (user) {
      init();
    }
  }, [user]);

  return (
    <CentresContext.Provider 
      value={{ 
        centres, 
        setCentres, 
        selectedCentre, 
        setSelectedCentre, 
        loading,
        error,
        fetchCentres,
        fetchCentre
      }}
    >
      {children}
    </CentresContext.Provider>
  );
};

export const useCentres = () => {
  const context = useContext(CentresContext);
  if (!context) {
    throw new Error('useCentres must be used within a CentresProvider');
  }
  return context;
}; 