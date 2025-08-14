// models/RespondentCounter.js
const mongoose = require('mongoose');

const RespondentCounterSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', unique: true },
  seq: { type: Number, default: 0 }, // last assigned respondentId
});

module.exports = mongoose.model('RespondentCounter', RespondentCounterSchema);
