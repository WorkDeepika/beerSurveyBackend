const express = require('express');
const {welcome}=require("../controllers/wecomeController")
const multer = require('multer');
const { getRegisterNumber } = require('../controllers/getRegisterNumber');
const { getImagesForRespondent } = require('../controllers/getImage');
const { putData } = require('../controllers/addDataController');
const { exportDataToXLSX } = require('../controllers/getCsvController');
const {  dashboredExtra } = require('../controllers/dataTableController');

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get('/', welcome)
// router.get('/dashbored', dashboredExtra)
// router.get("/panel/:panel", getDataTable)
router.get("/dashbored", dashboredExtra);
router.post('/register/:panelId',getRegisterNumber);
router.post('/getImages',getImagesForRespondent);
router.post('/add-data',putData);
router.get('/download-xlsx',exportDataToXLSX)
module.exports = router;