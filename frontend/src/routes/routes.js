import Signup from "../components/Signup.js";
import Employees from "../components/Employees.js";
import EmployeeDetails from "../components/EmployeeDetails.js";
import Login from "../components/Login.js";
import Department from "../components/Department.js";

const configureRoute = [
  {
    path: "/",
    element: <Login />,
    private: false,
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
    private: false,
  },
  {
    path: "/department",
    exact: true,
    element: <Department />,
    private: true,
  },
  {
    path: "/employee",
    exact: true,
    element: <Employees />,
    private: true,
  },
  {
    path: "/employeedetails",
    exact: true,
    element: <EmployeeDetails />,
    private: false,
  },
  {
    path: "/signup",
    exact: true,
    element: <Signup />,
    private: false,
  },
];

export default configureRoute;
