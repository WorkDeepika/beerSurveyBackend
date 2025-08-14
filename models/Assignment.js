// models/Assignment.js
// One row per (projectId, respondentId) = all 6 questions’ 4 image keys each
const mongoose = require('mongoose');

const QSchema = new mongoose.Schema({
  qid: { type: Number, required: true },          // 1..6
  images: [{ type: String, required: true }],     // S3 keys or URLs, length 4
}, { _id: false });

const AssignmentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  respondentId: { type: Number, required: true }, // 1..100
  questions: { type: [QSchema], required: true }, // six entries
}, { timestamps: true });

AssignmentSchema.index({ projectId: 1, respondentId: 1 }, { unique: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
