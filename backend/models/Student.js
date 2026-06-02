const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    studentId: {
      type: String,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    grade: {
      type: String,
      required: [true, "Grade is required"],
      enum: [
        "Kindergarten",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      enum: ["A", "B", "C", "D"],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true, default: "USA" },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Graduated", "Suspended"],
      default: "Active",
    },
    courses: [
      {
        courseCode: { type: String },
        courseName: { type: String },
        credits: { type: Number },
        grade: {
          type: String,
          enum: ["A", "B", "C", "D", "F", "IP", "W"],
        },
      },
    ],
    gpa: {
      type: Number,
      min: 0,
      max: 4.0,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.pre("save", async function (next) {
  if (this.isNew && !this.studentId) {
    const Student = mongoose.model("Student");
    const count = await Student.countDocuments();
    const year = new Date().getFullYear();
    this.studentId = `STU${year}${(count + 1).toString().padStart(5, "0")}`;
  }
});

studentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Student", studentSchema);
