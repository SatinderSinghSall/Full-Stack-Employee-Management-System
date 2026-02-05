import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./pages/PrivateRoutes";
import RoleBaseRoutes from "./pages/RoleBaseRoutes";
import NotFound from "./pages/NotFound";

// Components
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";

import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";

//! To run the frontend for DEVELOPMENT -> npm run dev
//! To run the frontend for PRODUCTION -> npm start

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard with Protected + Role */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["Admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />

          {/* Department Routes */}
          <Route path="departments" element={<DepartmentList />} />
          <Route
            path="departments/add-department"
            element={<AddDepartment />}
          />
          <Route path="departments/edit/:id" element={<EditDepartment />} />

          {/* Employee Routes */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add-employee" element={<AddEmployee />} />
          <Route path="employees/:id" element={<ViewEmployee />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />

          {/* Catch all inside admin routes */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Employee Dashboard Route */}
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

        {/* Global 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
