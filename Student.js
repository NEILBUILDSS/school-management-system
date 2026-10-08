const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  houseNo: { type: String, trim: true, default: '' },
  streetNo: { type: String, trim: true, default: '' },
  barangay: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  province: { type: String, trim: true, default: '' },
  zipCode: { type: String, trim: true, default: '' }
}, { _id: false });

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: '' },
  occupation: { type: String, trim: true, default: '' },
  mobileNumber: { type: String, trim: true, default: '' }
}, { _id: false });

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: '' },
  relationship: { type: String, trim: true, default: '' },
  mobileNumber: { type: String, trim: true, default: '' }
}, { _id: false });

const educationRecordSchema = new mongoose.Schema({
  school: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: '' },
  schoolYear: { type: String, trim: true, default: '' }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },

  studentId: { type: String, trim: true, uppercase: true, unique: true, sparse: true },

  firstName: {
    type: String,
    required: true,
    trim: true
  },

  middleName: {
    type: String,
    trim: true,
    default: ''
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  contactNumber: {
    type: String,
    required: true,
    trim: true
  },

  telephoneNumber: {
    type: String,
    trim: true,
    default: ''
  },

  // SECONDARY INFORMATION
  birthPlace: {
    type: String,
    trim: true,
    default: ''
  },

  religion: {
    type: String,
    trim: true,
    default: ''
  },

  citizenship: {
    type: String,
    trim: true,
    default: ''
  },

  civilStatus: {
    type: String,
    trim: true,
    default: ''
  },

  // ADDRESS INFORMATION
  currentAddress: {
    type: addressSchema,
    default: () => ({})
  },

  permanentAddress: {
    type: addressSchema,
    default: () => ({})
  },

  // FAMILY INFORMATION
  father: {
    type: familyMemberSchema,
    default: () => ({})
  },

  mother: {
    type: familyMemberSchema,
    default: () => ({})
  },

  guardian: {
    type: familyMemberSchema,
    default: () => ({})
  },

  // EMERGENCY CONTACT
  emergencyContact: {
    type: emergencyContactSchema,
    default: () => ({})
  },

  // EDUCATIONAL BACKGROUND
  education: {
    primary: {
      type: educationRecordSchema,
      default: () => ({})
    },

    secondary: {
      type: educationRecordSchema,
      default: () => ({})
    },

    seniorHigh: {
      type: educationRecordSchema,
      default: () => ({})
    },

    lastAttended: {
      type: educationRecordSchema,
      default: () => ({})
    }
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },

  yearLevel: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
    index: true
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
    index: true
  }

}, {
  timestamps: true
});

studentSchema.index({
  yearLevel: 1,
  lastName: 1,
  firstName: 1
});

module.exports = mongoose.model('Student', studentSchema);
