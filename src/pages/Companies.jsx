import { useEffect, useState } from 'react';
import api from '../api/axios';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/companies')
      .then(res => setCompanies(res.data))
      .catch(err => setError(err.message));
  }, []);
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des entreprises</h1>
      <ul>
        {companies.map(company => (
          <li key={company.siret}>
            {company.name} {company.country} {company.siret}</li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
