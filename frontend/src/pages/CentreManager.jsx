import React, {useEffect} from 'react';
import { useCentres } from '../contexts/CentresContext';
import { useNavigate } from 'react-router-dom';
import './CentreManager.css';

const CentreManager = () => {
  const { centres, loading, error, fetchCentres } = useCentres();
  const navigate = useNavigate();

  useEffect(()=>{
    fetchCentres();
  },[])

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='content-group'>
        <div className="table-title">
          <div>Tous les centres de contact</div>
        </div>
        <table className="centre-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Numéro</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {centres.map((centre, index) => (
              <tr key={index} onClick={() => navigate(`/centre/${centre.nom}`)}>
                <td>{centre.nom}</td>
                <td>{centre.numero}</td>
                <td>{centre.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CentreManager;
