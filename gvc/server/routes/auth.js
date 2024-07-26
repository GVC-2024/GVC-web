const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 아이디 중복 확인 엔드포인트
router.post('/check-username', async (req, res) => {
    const { uid } = req.body;

    try {
        const user = await User.findOne({ where: { uid: uid } });
        if (user) {
            return res.status(409).json({ message: '아이디가 이미 존재합니다.' });
        }
        res.status(200).json({ message: '아이디를 사용할 수 있습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 이메일 중복 확인 엔드포인트
router.post('/check-email', async (req, res) => {
    const { uemail } = req.body;

    try {
        const user = await User.findOne({ where: { uemail: uemail } });
        if (user) {
            return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
        }
        res.status(200).json({ message: '이메일을 사용할 수 있습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 전화번호 중복 확인 엔드포인트
router.post('/check-phoneNumber', async (req, res) => {
    const { utel } = req.body;

    try {
        const user = await User.findOne({ where: { utel: utel } });
        if (user) {
            return res.status(409).json({ message: '이미 가입된 전화번호입니다.' });
        }
        res.status(200).json({ message: '전화번호를 사용할 수 있습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 로그인 엔드포인트
router.post('/login', async (req, res) => {
    const { uid, upassword } = req.body;

    try {
        const user = await User.findOne({ where: { uid: uid } });

        if (user) {
            if (user.upassword === upassword) {
                res.status(200).json({ message: '로그인에 성공했습니다.' });
            } else {
                res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            res.status(401).json({ message: '등록되지 않은 회원입니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

// 회원가입 엔드포인트
router.post('/register', async (req, res) => {
    const { uid, uname, uemail, upassword, utel, ubirth } = req.body;

    try {
        const user = await User.create({
            uid,
            uname,
            uemail,
            upassword,
            utel,
            ubirth,
        });
        res.status(201).json({ message: '회원가입에 성공했습니다.', user });
    } catch (error) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;
