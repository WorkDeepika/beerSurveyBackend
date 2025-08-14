// services/respondentAllocator.js
const mongoose = require('mongoose');
const RespondentCounter = require('../models/RespondentCounter');
const Survey = require('../models/Survey');
const Assignment = require('../models/Assignment');

async function allocateRespondentId(projectId, { maxAllowed = 100 } = {}) {
  // Atomically increment the counter for the project
  const counter = await RespondentCounter.findOneAndUpdate(
    { projectId },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  const nextId = counter.seq; // starts at 1
  if (nextId > maxAllowed) {
    // Optional: roll back or block further starts
    throw new Error(`Target reached (${maxAllowed}) for this project`);
  }

  // Ensure we have an assignment for this respondentId
  const assignment = await Assignment.findOne({ projectId, respondentId: nextId });
  if (!assignment) {
    throw new Error(`No assignment found for respondentId ${nextId} (project ${projectId})`);
  }

  // Create a Survey shell to lock the pair (unique index prevents dupes)
  const survey = await Survey.create({ projectId, respondentId: nextId, status: 'in_progress' });

  return { respondentId: nextId, assignment, survey };
}

module.exports = { allocateRespondentId };
