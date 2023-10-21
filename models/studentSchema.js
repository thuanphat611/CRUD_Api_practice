const mongoose = require('mongoose'); 

const studentSchema = mongoose.Schema({
    Name: {
      type: String,
      required: true
    },
    Class: {
      type: String,
      required: true
    },
    Mssv: {
      type: String,
      required: true,
      unique: true
    },
    Gender: {
      type: String,
      required: true,
    }
  },
  {timestamps: true}
)

const Student = mongoose.model('Students', studentSchema);

module.exports = Student;