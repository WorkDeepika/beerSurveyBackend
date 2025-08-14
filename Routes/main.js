const express = require('express');
const {welcome}=require("../controllers/wecomeController")
const { loginController,  }= require("../controllers/loginController")
const {putData, addUser, }= require("../controllers/addDataController")
const {exportDataToXLSX }=  require("../controllers/getCsvController")
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

const router = express.Router();

router.get('/', welcome)
router.post('/add-data',putData);
router.post('/login', loginController);
router.post('/add-user',addUser);
// router.post('/get-xlsx',filterData);
// router.post('/addOrUpdateProject',createOrUpdateProject);
router.get('/download-xlsx',exportDataToXLSX)

module.exports = router;