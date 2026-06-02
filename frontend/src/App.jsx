import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { studentApi } from "./services/api";
import "./styles/main.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateStudent = async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      await studentApi.create(studentData);
      setSuccess("Student registered successfully");
      setRefreshTrigger((prev) => prev + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create student");
      console.error("Error creating student:", err);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentDeleted = () => {
    setSuccess("Student deleted successfully");
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Student Management System</h1>
          <p>Register, track, and manage student academic records</p>
        </div>
      </header>

      <main className="main-content">
        {error && <div className="alert alert-error">{error}</div>}

        {success && <div className="alert alert-success">{success}</div>}

        <StudentForm onSubmit={handleCreateStudent} loading={loading} />
        <StudentList
          refreshTrigger={refreshTrigger}
          onStudentDeleted={handleStudentDeleted}
        />
      </main>
    </div>
  );
}

export default App;
