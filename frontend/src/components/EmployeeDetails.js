import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../App.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = useCallback(() => {
    axios
      .get("http://localhost:5000/employees/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const fetchSortedEmployees = useCallback((sortBy, sortOrder) => {
    axios
      .get(
        `http://localhost:5000/employees/employees?sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sorted employees:", error);
      });
  }, []);

  const handleSortByLocation = useCallback(() => {
    fetchSortedEmployees("location");
  }, [fetchSortedEmployees]);

  const handleSortByName = useCallback(() => {
    fetchSortedEmployees("employee_id");
  }, [fetchSortedEmployees]);

  const handleSortByNameDescending = useCallback(() => {
    fetchSortedEmployees("employee_id", "desc");
  }, [fetchSortedEmployees]);

  const handleLogout = () => {
    Cookies.remove("task||userInfo");
    navigate("/login");
  };

  const memoizedEmployees = useMemo(() => employees, [employees]);

  return (
    <div>
      <button
        onClick={handleLogout}
        title="Logout"
        className="bg-red-500 hover:bg-red-400 m-2 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        LogOut
      </button>
      <h1 className=" w-screen flex items-center justify-center text-3xl mt-2 font-bold">
        Employees
      </h1>
      <div className="flex items-center justify-center gap-4 mt-8 mb-4">
        <button
          onClick={handleSortByLocation}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ascending Order by Location
        </button>
        <button
          onClick={handleSortByName}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ascending Order by Employee Name
        </button>
        <button
          onClick={handleSortByNameDescending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Descending Order by Employee Name
        </button>
      </div>

      <div className="relative overflow-x-auto p-5 shadow-md sm:rounded-lg dark:bg-white flex items-center justify-center">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr>
              <th className="border py-2 ">Employee Name</th>
              <th>Department</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {memoizedEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="desc">
                  <label>{employee.employee_id}</label>
                </td>
                <td className="desc">
                  <label>{employee.department}</label>
                </td>
                <td className="desc">
                  <label>{employee.location}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDetails;
