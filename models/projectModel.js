const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  targetSurveys: { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
