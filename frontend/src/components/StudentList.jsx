import React, { useState, useEffect } from "react";
import StudentTable from "./StudentTable";
import { studentApi } from "../services/api";

const StudentList = ({ refreshTrigger, onStudentDeleted }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchStudents = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentApi.getAll({ page, limit: 10 });
      setStudents(response.data.data || []);
      setPagination(response.data.pagination);
    } catch (err) {
      setError("Failed to load student records");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setLoading(true);
      try {
        await studentApi.delete(id);
        await fetchStudents();
        if (onStudentDeleted) {
          onStudentDeleted();
        }
      } catch (err) {
        setError("Failed to delete student");
        console.error("Error deleting student:", err);
        setTimeout(() => setError(null), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchStudents(newPage);
    }
  };

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Student Records</h2>
        </div>
        <div className="card-body">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <StudentTable
        students={students}
        onDelete={handleDelete}
        loading={loading}
      />

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.pages} ({pagination.total}{" "}
            total)
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages || loading}
            className="btn btn-secondary"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default StudentList;
