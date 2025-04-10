import { useEffect, useState } from 'react';
import api from '../api/axios';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    api.get('/employees')
      .then(res => setEmployees(res.data))
      .catch(err => setError(err.message));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/employees', formData)
      .then(() => {
        setFormData({ first_name: '', last_name: '', email: '' });
        fetchEmployees();
      })
      .catch(err => setError(err.message));
  };

  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des employés</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="first_name" placeholder="Prénom" value={formData.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Nom" value={formData.last_name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>HR ID</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(user => (
            <tr key={user.employee_hr_id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.employee_hr_id}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
