import React from "react";

const StudentTable = ({ students, onDelete, onEdit, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Student Records</h2>
        </div>
        <div className="card-body">
          <div className="loading">Loading student records...</div>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Student Records</h2>
        </div>
        <div className="card-body">
          <div className="empty-state">No student records found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Student Records</h2>
        <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Total: {students.length} students
        </span>
      </div>
      <div className="card-body">
        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <code style={{ fontSize: "0.75rem" }}>
                      {student.studentId}
                    </code>
                  </td>
                  <td>
                    <strong>{`${student.firstName} ${student.lastName}`}</strong>
                  </td>
                  <td>{student.email}</td>
                  <td>{student.grade}</td>
                  <td>{student.section}</td>
                  <td>{student.phoneNumber}</td>
                  <td>
                    <span
                      className={`status-badge ${student.status === "Active" ? "status-active" : "status-inactive"}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(student)}
                          className="btn btn-secondary"
                          style={{
                            padding: "0.375rem 0.75rem",
                            fontSize: "0.75rem",
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(student._id)}
                        className="btn btn-danger"
                        style={{
                          padding: "0.375rem 0.75rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
