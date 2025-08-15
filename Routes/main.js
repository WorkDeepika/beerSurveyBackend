const express = require('express');
const {welcome}=require("../controllers/wecomeController")
const multer = require('multer');
const { getRegisterNumber } = require('../controllers/getRegisterNumber');
const { getImagesForRespondent } = require('../controllers/getImage');

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get('/', welcome)
router.post('/register/:panelId',getRegisterNumber);
router.post('/getImages',getImagesForRespondent);
module.exports = router;