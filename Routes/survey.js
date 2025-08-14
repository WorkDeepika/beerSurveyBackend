// routes/survey.js
const router = require('express').Router();
const Project = require('../models/Project');
const Survey = require('../models/Survey');
const { allocateRespondentId } = require('../services/respondentAllocator');
const { signImages } = require('../services/s3');

function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
}

// 1) Start survey for a project (allocates respondentId safely)
router.post('/start', async (req, res) => {
  try {
    const { projectName } = req.body; // or projectId
    const project = await Project.findOne({ name: projectName });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { respondentId, assignment, survey } =
      await allocateRespondentId(project._id, { maxAllowed: project.targetSurveys || 100 });

    // Prepare signed URLs per question; shuffle order server-side for consistency
    const questions = [];
    for (const q of assignment.questions) {
      const shuffled = shuffle(q.images);
      const urls = await signImages(shuffled);
      questions.push({
        qid: q.qid,
        images: urls,
        // Optionally also include the original S3 keys in same order (for validation on submit)
        // keys: shuffled
      });
    }

    res.json({
      projectId: project._id,
      respondentId,
      surveyId: survey._id,
      questions
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 2) Submit answer for a question (best/worst + what was shown)
router.post('/:surveyId/answer', async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { qid, imagesShownKeys, bestKey, worstKey } = req.body;
    // Validate inputs
    if (!qid || !Array.isArray(imagesShownKeys) || imagesShownKeys.length !== 4)
      return res.status(400).json({ error: 'Invalid payload' });
    if (!imagesShownKeys.includes(bestKey) || !imagesShownKeys.includes(worstKey) || bestKey === worstKey)
      return res.status(400).json({ error: 'Best/Worst must be distinct and inside imagesShown' });

    const survey = await Survey.findById(surveyId);
    if (!survey || survey.status !== 'in_progress')
      return res.status(404).json({ error: 'Survey not found or not in progress' });

    // OPTIONAL: Verify that imagesShownKeys are a permutation of the assigned set for that qid
    // by looking up Assignment for (projectId, respondentId)

    const existing = survey.answers.find(a => a.qid === qid);
    if (existing) return res.status(409).json({ error: 'Question already answered' });

    survey.answers.push({
      qid,
      imagesShown: imagesShownKeys,
      best: bestKey,
      worst: worstKey,
    });
    await survey.save();

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// 3) Complete survey
router.post('/:surveyId/complete', async (req, res) => {
  try {
    const { surveyId } = req.params;
    const survey = await Survey.findById(surveyId);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    if (survey.answers.length < 6) return res.status(400).json({ error: 'All questions not answered' });

    survey.status = 'completed';
    survey.completedAt = new Date();
    await survey.save();

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
