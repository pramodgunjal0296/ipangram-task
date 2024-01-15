import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../App.css";
import { RiFileEditLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  const startEditing = useCallback((employee) => {
    setEditingEmployee(employee);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingEmployee(null);
  }, []);

  const saveEmployee = useCallback((employee) => {
    axios
      .put(
        `http://localhost:5000/employees/employees/${employee._id}`,
        employee
      )
      .then(() => {
        setEditingEmployee(null);
        alert(
          "Employee Saved Successfully. Please refresh to see the updated employee list."
        );
      });
  }, []);

  const deleteEmployee = useCallback(
    (employeeId) => {
      axios
        .delete(`http://localhost:5000/employees/employees/${employeeId}`)
        .then(() => {
          setEmployees(
            employees.filter((employee) => employee._id !== employeeId)
          );
          alert("Employee deleted successfully");
        });
    },
    [employees]
  );

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
      <div className="flex items-start justify-center gap-6">
        <button
          onClick={() => navigate("/employee")}
          className="bg-blue-500 hover:bg-blue-400 m-2 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Manage Employees
        </button>

        <button
          onClick={() => navigate("/department")}
          className="bg-blue-500 hover:bg-blue-400 m-2 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Manage Department
        </button>
      </div>
      <h1 className=" w-screen flex items-center justify-center text-3xl mt-2 font-bold">
        Employees
      </h1>

      <div className="relative overflow-x-auto p-5  shadow-md sm:rounded-lg dark:bg-white flex items-center justify-center">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr>
              <th className="border py-2 ">Employee Name</th>
              <th>Department</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {memoizedEmployees
              .filter((employee) => employee.role === "employee")
              .map((employee) => (
                <tr key={employee._id}>
                  {editingEmployee && editingEmployee._id === employee._id ? (
                    <>
                      <td className="desc">
                        <input
                          required
                          type="text"
                          value={editingEmployee.employee_id}
                          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              employee_id: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="desc">
                        <input
                          type="text"
                          value={editingEmployee.department}
                          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              department: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="bg-blue-500 hover:bg-blue-700   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                          onClick={() => saveEmployee(editingEmployee)}
                          title="Save your employee"
                        >
                          Save
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-red-500 hover:bg-blue-700   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                          onClick={() => cancelEditing()}
                          title="Cancel"
                        >
                          <ImCross />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="desc">
                        <span>{employee.employee_id}</span>
                      </td>
                      <td className="desc">
                        <span>{employee.department}</span>
                      </td>
                      <td className="flex items-center justify-center">
                        <button
                          className="bg-yellow-600 hover:bg-yellow-500   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                          onClick={() => startEditing(employee)}
                          title="Edit Employee"
                        >
                          <RiFileEditLine />
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 mt-1 ml-4 rounded"
                          onClick={() => deleteEmployee(employee._id)}
                          title="Delete Employee"
                        >
                          <AiTwotoneDelete />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
