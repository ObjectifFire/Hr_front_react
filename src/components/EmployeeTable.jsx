import React from 'react';

function EmployeeTable({
  employees = [],
  companies = [],
  employeeAssignments = {},
  employeeCompanyMap = {},
  handleAssignChange,
  assignEmployee,
  unassignEmployee
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>HR ID</th>
          <th>Entreprise (assignation)</th>
          <th>Lié à</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.employee_hr_id}>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.employee_hr_id}</td>

            {/* Choix entreprise à assigner */}
            <td>
              <select
                onChange={(e) =>
                  handleAssignChange(employee.employee_hr_id, e.target.value)
                }
                value={employeeAssignments[employee.employee_hr_id] || ''}
              >
                <option value="">-- Choisir une entreprise --</option>
                {companies.map(company => (
                  <option key={company.siret} value={company.siret}>
                    {company.name}
                  </option>
                ))}
              </select>
            </td>

            <td>
              {companies
                .filter(company =>
                  employeeCompanyMap[employee.employee_hr_id]?.includes(company.siret)
                )
                .map(company => (
                  <div
                    key={company.siret}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '6px',
                      marginBottom: '4px'
                    }}
                  >
                    <span>{company.name}</span>
                    <button
                      onClick={() => unassignEmployee(employee, company.siret)}
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))}

              {/* Si aucune entreprise liée */}
              {!(employeeCompanyMap[employee.employee_hr_id]?.length > 0) && '-'}
            </td>

            {/* Bouton assignation */}
            <td>
              <button
                onClick={() => assignEmployee(employee)}
                style={{
                  backgroundColor: '#1e88e5',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Assigner
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
