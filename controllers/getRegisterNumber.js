const PanelCount = require('../models/panelCountModel');

const getRegisterNumber = async (req, res) => {
  try {
    const panelId = parseInt(req.params.panelId, 10);
    const { isTest } = req.body;

    // Panel-specific limits
    const panelLimits = {
      1: 148,
      2: 141,
      3: 132,
      4: 133,
      5: 123,
      6: 108,
    };

    if (!panelLimits.hasOwnProperty(panelId)) {
      return res.status(400).json({ error: "Invalid panel ID" });
    }

    const maxLimit = panelLimits[panelId];

    if (isTest === "true") {
      // Just return current number without incrementing
      const panel = await PanelCount.findOne({ panelId });
      if (!panel) {
        return res.status(404).json({ error: "Panel not found" });
      }
      return res.json({ registrationNumber: panel.count + 1 });
    }

    // Normal flow: atomic increment but only if count < maxLimit
    const panel = await PanelCount.findOneAndUpdate(
      { panelId, count: { $lt: maxLimit } },
      { $inc: { count: 1 } },
      { new: true }
    );

    if (!panel) {
      return res
        .status(400)
        .json({ error: "Maximum registrations reached for this panel" });
    }

    return res.json({ registrationNumber: panel.count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports={
    getRegisterNumber
}