import React from 'react';

function EmployeeTable({
  employees,
  companies,
  employeeAssignments,
  employeeCompanyMap,
  handleAssignChange,
  assignEmployee
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.employee_hr_id}>
            <td>{employee.first_name}</td>
            <td>{employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.employee_hr_id}</td>
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
              {(employeeCompanyMap[employee.employee_hr_id] || []).join(', ') || '-'}
            </td>
            <td>
              <button onClick={() => assignEmployee(employee)}>Assigner</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
