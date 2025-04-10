import { useEffect, useState } from 'react';
import api from '../api/axios';
import EmployeeTable from '../components/EmployeeTable';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [employeeAssignments, setEmployeeAssignments] = useState({});
  const [employeeCompanyMap, setEmployeeCompanyMap] = useState({});
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    fetchEmployees();
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      fetchEmployeeCompanyLinks();
    }
  }, [companies]);

  const fetchEmployees = () => {
    api.get('/employees')
      .then(res => setEmployees(res.data))
      .catch(err => setError(err.message));
  };

  const fetchCompanies = () => {
    api.get('/companies')
      .then(res => setCompanies(res.data))
      .catch(err => setError(err.message));
  };

  const fetchEmployeeCompanyLinks = async () => {
    const map = {};

    for (const company of companies) {
      try {
        const res = await api.get(`/companies/${company.siret}/employees`);
        for (const emp of res.data) {
          if (!map[emp.employee_hr_id]) {
            map[emp.employee_hr_id] = [];
          }
          map[emp.employee_hr_id].push(company.siret);
        }
      } catch (err) {
        console.error(`Erreur chargement employés de ${company.name}:`, err);
      }
    }

    setEmployeeCompanyMap(map);
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
        fetchEmployeeCompanyLinks();
      })
      .catch(err => setError(err.message));
  };

  const handleAssignChange = (employeeHrId, siret) => {
    setEmployeeAssignments(prev => ({ ...prev, [employeeHrId]: siret }));
  };

  const assignEmployee = (employee) => {
    const siret = employeeAssignments[employee.employee_hr_id];
    if (!siret) {
      alert("Veuillez sélectionner une entreprise");
      return;
    }

    api.post(`/companies/${siret}/employees/${employee.employee_hr_id}`)
      .then(() => {
        alert("Employé assigné !");
        fetchEmployees();
        fetchEmployeeCompanyLinks();
      })
      .catch(err => {
        console.error(err);
        alert("Erreur lors de l'assignation");
      });
  };

  const unassignEmployee = (employee, companySiret) => {
    const company = companies.find(c => c.siret === companySiret);
    if (!company) return alert("Entreprise introuvable");
  
    if (!confirm(`Retirer ${employee.first_name} de ${company.name} ?`)) return;
  
    api.delete(`/companies/${company.siret}/employees/${employee.employee_hr_id}`)
      .then(() => {
        alert("Désassigné !");
        fetchEmployees();
        fetchEmployeeCompanyLinks();
      })
      .catch(err => {
        console.error(err);
        alert("Erreur lors du désassignement");
      });
  };
  

  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des employés</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="first_name"
          placeholder="Prénom"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          name="last_name"
          placeholder="Nom"
          value={formData.last_name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Ajouter</button>
      </form>

      <EmployeeTable
        employees={employees}
        companies={companies}
        employeeAssignments={employeeAssignments}
        employeeCompanyMap={employeeCompanyMap}
        handleAssignChange={handleAssignChange}
        assignEmployee={assignEmployee}
        unassignEmployee={unassignEmployee}
      />
    </div>
  );
}

export default Employees;
