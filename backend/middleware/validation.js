const { body, validationResult } = require("express-validator");

const validateStudent = [
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("dateOfBirth")
    .isISO8601()
    .withMessage("Valid date of birth is required"),
  body("grade")
    .isIn([
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
    ])
    .withMessage("Valid grade is required"),
  body("section")
    .isIn(["A", "B", "C", "D"])
    .withMessage("Valid section is required"),
  body("address.street").notEmpty().withMessage("Street address is required"),
  body("address.city").notEmpty().withMessage("City is required"),
  body("address.state").notEmpty().withMessage("State is required"),
  body("address.zipCode").notEmpty().withMessage("Zip code is required"),
  body("phoneNumber")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Valid phone number is required"),
  body("emergencyContact.name")
    .notEmpty()
    .withMessage("Emergency contact name is required"),
  body("emergencyContact.relationship")
    .notEmpty()
    .withMessage("Emergency contact relationship is required"),
  body("emergencyContact.phoneNumber")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Valid emergency contact phone is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

const validateCourse = [
  body("courseCode").notEmpty().withMessage("Course code is required"),
  body("courseName").notEmpty().withMessage("Course name is required"),
  body("credits")
    .isInt({ min: 1, max: 6 })
    .withMessage("Credits must be between 1 and 6"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  validateStudent,
  validateCourse,
};
