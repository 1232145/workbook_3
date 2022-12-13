const express = require('express');
const router = express.Router();

const student = require('./student');
const teacher = require('./teacher');
const subject = require('./subject');


router.use('/student', student);
router.use('/teacher', teacher);
router.use('/subject', subject)

module.exports = router;
