import React, { useState } from "react";

const StudentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    grade: "1",
    section: "A",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      grade: "1",
      section: "A",
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA",
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phoneNumber: "",
      },
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Register New Student</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Grade *</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="Kindergarten">Kindergarten</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div className="form-group">
              <label>Section *</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>
          </div>

          <div className="section-header">Address Information</div>
          <div className="form-grid">
            <div className="form-group">
              <label>Street Address *</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="123 Main Street"
                required
              />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="New York"
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="NY"
                required
              />
            </div>
            <div className="form-group">
              <label>Zip Code *</label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                placeholder="10001"
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                placeholder="USA"
                readOnly
              />
            </div>
          </div>

          <div className="section-header">Emergency Contact</div>
          <div className="form-grid">
            <div className="form-group">
              <label>Contact Name *</label>
              <input
                type="text"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                placeholder="Emergency contact name"
                required
              />
            </div>
            <div className="form-group">
              <label>Relationship *</label>
              <input
                type="text"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleChange}
                placeholder="Parent, Guardian, etc."
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Phone *</label>
              <input
                type="tel"
                name="emergencyContact.phoneNumber"
                value={formData.emergencyContact.phoneNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                required
              />
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Processing..." : "Register Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
