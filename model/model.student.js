const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
  name: String,
  description: String,
  mobile: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);