// models/Survey.js
const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  qid: { type: Number, required: true },                     // 1..6
  imagesShown: [{ type: String, required: true }],           // length 4 (post-shuffle if you want)
  best: { type: String, required: true },                    // must be in imagesShown
  worst: { type: String, required: true },                   // must be in imagesShown
  answeredAt: { type: Date, default: Date.now },
}, { _id: false });

const SurveySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  respondentId: { type: Number, required: true },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  answers: { type: [AnswerSchema], default: [] },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
}, { timestamps: true });

SurveySchema.index({ projectId: 1, respondentId: 1 }, { unique: true });

module.exports = mongoose.model('Survey', SurveySchema);
