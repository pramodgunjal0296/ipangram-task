import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../App.css";
import { RiFileEditLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    title: "",
    description: "",
  });
  const [editingDepartment, setEditingDepartment] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = useCallback(() => {
    axios
      .get("http://localhost:5000/departments/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const addDepartment = useCallback(() => {
    axios
      .post("http://localhost:5000/departments/departments", newDepartment)
      .then((response) => {
        if (response.status === 400) {
          alert("Empty fields not allowed");
        } else {
          setDepartments([...departments, response.data]);
          setNewDepartment({ title: "", description: "" });
          alert("Department added Successfully");
        }
      });
  }, [departments, newDepartment]);

  const startEditing = useCallback((task) => {
    setEditingDepartment(task);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingDepartment(null);
  }, []);

  const saveDepartment = useCallback((department) => {
    axios
      .put(
        `http://localhost:5000/departments/departments/${department._id}`,
        department
      )
      .then(() => {
        setEditingDepartment(null);
        alert(
          "Department Saved Successfully ,Please Refresh to see updated task"
        );
      });
  }, []);

  const deleteDepartment = useCallback(
    (departmentId) => {
      axios
        .delete(`http://localhost:5000/departments/departments/${departmentId}`)
        .then(() => {
          setDepartments(
            departments.filter((department) => department._id !== departmentId)
          );
          alert("Department deleted Successfully");
        });
    },
    [departments]
  );

  const handleLogout = () => {
    Cookies.remove("task||userInfo");
    navigate("/login");
  };

  const memoizedDepartments = useMemo(() => departments, [departments]);

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
        Departments
      </h1>

      <div className="flex items-center justify-center flex-col gap-4">
        <h2 className="bold center">Add New Department</h2>
        <div>
          <div className="flex flex-row gap-2">
            <input
              title="Title of your Department"
              type="text"
              className="shadow appearance-none border  border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
              value={newDepartment.title}
              onChange={(e) =>
                setNewDepartment({ ...newDepartment, title: e.target.value })
              }
              required
            />
            <p className="text-red-600">*</p>
          </div>
          <textarea
            title="Add Description of Department"
            type="text"
            rows="4"
            className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            value={newDepartment.description}
            onChange={(e) =>
              setNewDepartment({
                ...newDepartment,
                description: e.target.value,
              })
            }
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addDepartment}
            title="Add Department"
          >
            Add
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto p-5  shadow-md sm:rounded-lg dark:bg-white flex items-center justify-center">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr>
              <th className="border py-2 ">Department</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {memoizedDepartments.map((department) => (
              <tr key={department._id}>
                {editingDepartment &&
                editingDepartment._id === department._id ? (
                  <>
                    <td className="desc">
                      <input
                        required
                        type="text"
                        value={editingDepartment.title}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setEditingDepartment({
                            ...editingDepartment,
                            title: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="desc">
                      <input
                        type="text"
                        value={editingDepartment.description}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setEditingDepartment({
                            ...editingDepartment,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="bg-blue-500 hover:bg-blue-700   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                        onClick={() => saveDepartment(editingDepartment)}
                        title="save your Department"
                      >
                        Save
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 hover:bg-blue-700   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                        onClick={() => cancelEditing()}
                        title="Cancle"
                      >
                        <ImCross />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="desc">
                      <span>{department.title}</span>
                    </td>
                    <td className="desc">
                      <span>{department.description}</span>
                    </td>
                    <td className="flex items-center justify-center">
                      <button
                        className="bg-yellow-600 hover:bg-yellow-500   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                        onClick={() => startEditing(department)}
                        title="Edit Department"
                      >
                        <RiFileEditLine />
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 mt-1 ml-4 rounded"
                        onClick={() => deleteDepartment(department._id)}
                        title="Delete Task"
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

export default Department;
