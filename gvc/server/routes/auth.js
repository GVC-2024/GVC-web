const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// 아이디 중복 확인
router.post('/check-username', async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await User.findOne({ where: { uid } });
    if (user) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    res.status(200).json({ message: 'Username is available' });
  } catch (error) {
    res.status(500).json({ message: 'Error checking username', error });
  }
});

// 회원가입
router.post('/register', async (req, res) => {
  const { uid, uname, uemail, upassword, utel, ubirth } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(upassword, 10);
    const newUser = await User.create({
      uid,
      uname,
      uemail,
      upassword: hashedPassword,
      utel,
      ubirth,
    });
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

module.exports = router;
